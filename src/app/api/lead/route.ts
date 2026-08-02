import { after, NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { leadSchema, type LeadRecord, type TargetName, type TargetResult } from "@/lib/leads/schema";
import { putLead, markTargets, limiter } from "@/lib/leads/store";
import { toHubSpot, toInternalAlert, toVisitorReceipt, toConsole } from "@/lib/leads/targets";
import { trackServer } from "@/lib/analytics.server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MIN_FILL_MS = 2000;

function hashIp(ip: string): string {
  return createHash("sha256")
    .update(ip + (process.env.IP_HASH_SALT ?? ""))
    .digest("hex")
    .slice(0, 32);
}

export async function POST(req: Request) {
  const ip = (req.headers.get("x-forwarded-for") ?? "0.0.0.0").split(",")[0].trim();
  const ipHash = hashIp(ip);

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    await trackServer("lead_capture_failed", "anonymous", {
      stage: "validate",
      error_code: first?.path.join(".") ?? "unknown",
    });
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }
  const input = parsed.data;

  // Honeypot. A real person never fills a field they cannot see.
  // Return 200 so the bot stops trying, and store nothing.
  if (input.company_website !== "") {
    return NextResponse.json({ ok: true, lead_id: input.lead_id });
  }

  // Nobody types five fields in under two seconds.
  if (Date.now() - input.started_at < MIN_FILL_MS) {
    return NextResponse.json({ ok: true, lead_id: input.lead_id });
  }

  const { success } = await limiter.limit(ipHash);
  if (!success) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  const rec: LeadRecord = {
    ...input,
    received_at: Date.now(),
    ip_hash: ipHash,
    user_agent: (req.headers.get("user-agent") ?? "").slice(0, 300),
    targets: {},
  };

  // THE DURABLE WRITE. Nothing above this line reached a third party, and
  // nothing below it can lose the lead.
  try {
    await putLead(rec);
  } catch (e) {
    await trackServer("lead_capture_failed", rec.lead_id, {
      stage: "store",
      error_code: String(e).slice(0, 120),
    });
    // The only case where the visitor gets an error, so the client can fall
    // back to mailto and the lead survives in their outbox instead of nowhere.
    return NextResponse.json({ ok: false, error: "store_failed" }, { status: 503 });
  }

  const hutk = req.headers.get("cookie")?.match(/hubspotutk=([^;]+)/)?.[1];

  after(async () => {
    const runners: Array<[TargetName, () => Promise<{ ok: boolean; error?: string }>]> = [
      ["hubspot", () => toHubSpot(rec, hutk)],
      ["email_internal", () => toInternalAlert(rec)],
      ["email_visitor", () => toVisitorReceipt(rec)],
      ["console", () => toConsole(rec)],
    ];

    const settled = await Promise.all(
      runners.map(async ([name, fn]) => {
        const r = await fn();
        return [name, { ...r, at: Date.now() } as TargetResult] as const;
      })
    );

    await markTargets(rec.lead_id, Object.fromEntries(settled));

    await trackServer("lead_captured", rec.lead_id, {
      lead_id: rec.lead_id,
      source: "website-demo",
      placement: rec.placement,
      branches: rec.branches,
      ...rec.attr,
    });

    for (const [name, r] of settled) {
      if (!r.ok) {
        await trackServer("lead_capture_failed", rec.lead_id, {
          lead_id: rec.lead_id,
          stage: name === "hubspot" ? "hubspot" : "email",
          error_code: r.error ?? "unknown",
        });
      }
    }
  });

  return NextResponse.json({ ok: true, lead_id: rec.lead_id });
}
