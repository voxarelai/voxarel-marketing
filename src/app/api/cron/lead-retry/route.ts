import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { listUnfinished, markTargets, setAlarmed } from "@/lib/leads/store";
import type { TargetName, TargetResult } from "@/lib/leads/schema";
import { toHubSpot, toInternalAlert, toVisitorReceipt, toConsole, summarise } from "@/lib/leads/targets";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const ALARM_AFTER_MS = 15 * 60 * 1000;
const resend = new Resend(process.env.RESEND_API_KEY ?? "re_placeholder");

function authorised(req: Request): boolean {
  const secret = process.env.CRON_SECRET ?? "";
  const given = (req.headers.get("authorization") ?? "").replace("Bearer ", "");
  const a = Buffer.from(given);
  const b = Buffer.from(secret);
  return secret.length > 0 && a.length === b.length && timingSafeEqual(a, b);
}

export async function GET(req: Request) {
  if (!authorised(req)) return new NextResponse("Unauthorized", { status: 401 });

  const pending = await listUnfinished(50);
  let retried = 0;
  let alarmed = 0;

  for (const rec of pending) {
    const fns: Record<TargetName, () => Promise<{ ok: boolean; error?: string }>> = {
      hubspot: () => toHubSpot(rec),
      email_internal: () => toInternalAlert(rec),
      email_visitor: () => toVisitorReceipt(rec),
      console: () => toConsole(rec),
    };

    const failed = (Object.keys(fns) as TargetName[]).filter((t) => !rec.targets[t]?.ok);
    if (!failed.length) continue;

    const results = await Promise.all(
      failed.map(async (t) => {
        const r = await fns[t]();
        return [t, { ...r, at: Date.now() } as TargetResult] as const;
      })
    );
    await markTargets(rec.lead_id, Object.fromEntries(results));
    retried += 1;

    const stillFailing = results.some(([, r]) => !r.ok);
    const old = Date.now() - rec.received_at > ALARM_AFTER_MS;

    if (stillFailing && old && !rec.alarmed) {
      await resend.emails.send({
        from: process.env.LEAD_FROM ?? "partners@voxarel.com",
        to: process.env.LEAD_NOTIFY_TO ?? "partners@voxarel.com",
        subject: "LEAD NOT DELIVERED",
        text: [
          "A lead was captured but at least one delivery target is still failing.",
          "The full lead is below. Enter it by hand.",
          "",
          summarise(rec),
          "",
          `Targets: ${JSON.stringify(rec.targets)}`,
        ].join("\n"),
      });
      await setAlarmed(rec.lead_id);
      alarmed += 1;
    }
  }

  return NextResponse.json({ ok: true, scanned: pending.length, retried, alarmed });
}
