import "server-only";
import { Resend } from "resend";
import type { LeadRecord } from "./schema";

type Result = { ok: boolean; error?: string };

// Placeholder key keeps construction from throwing before RESEND_API_KEY is set.
// Sends fail gracefully until the real key is in place.
const resend = new Resend(process.env.RESEND_API_KEY ?? "re_placeholder");
const FROM = process.env.LEAD_FROM ?? "partners@voxarel.com";
const NOTIFY = process.env.LEAD_NOTIFY_TO ?? "partners@voxarel.com";
const BOOK_URL = "https://www.voxarel.com/demo/book";

export function summarise(rec: LeadRecord): string {
  return [
    `Name: ${rec.name}`,
    `Company: ${rec.company}`,
    `Email: ${rec.email}`,
    rec.phone && `Phone / WhatsApp: ${rec.phone}`,
    rec.branches && `Branches: ${rec.branches}`,
    `Source: website-demo (${rec.placement})`,
    `Channel: ${rec.attr.utm_source ?? "direct"} / ${rec.attr.utm_medium ?? "none"}`,
    `Campaign: ${rec.attr.utm_campaign ?? "none"}`,
    `Lead id: ${rec.lead_id}`,
    rec.message && `\n${rec.message}`,
  ]
    .filter(Boolean)
    .join("\n");
}

/**
 * HubSpot Forms v3. Portal id and form GUID only, no API key, which keeps the
 * secret surface small. Property internal names are created in VXL-MKT-005.
 */
export async function toHubSpot(rec: LeadRecord, hutk?: string): Promise<Result> {
  const portal = process.env.HUBSPOT_PORTAL_ID;
  const guid = process.env.HUBSPOT_FORM_GUID;
  if (!portal || !guid) return { ok: false, error: "hubspot_env_missing" };

  const fields = [
    { objectTypeId: "0-1", name: "email", value: rec.email },
    { objectTypeId: "0-1", name: "firstname", value: rec.name },
    { objectTypeId: "0-1", name: "company", value: rec.company },
    { objectTypeId: "0-1", name: "phone", value: rec.phone },
    { objectTypeId: "0-1", name: "voxarel_lead_id", value: rec.lead_id },
    { objectTypeId: "0-1", name: "source", value: "website-demo" },
    { objectTypeId: "0-1", name: "branch_count", value: rec.branches },
    {
      objectTypeId: "0-1",
      name: "first_touch_channel",
      value: rec.attr.utm_source ?? "direct",
    },
    { objectTypeId: "0-1", name: "message", value: rec.message },
  ].filter((f) => f.value !== "");

  try {
    const res = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${portal}/${guid}`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          submittedAt: rec.received_at,
          fields,
          context: {
            hutk,
            pageUri: `https://www.voxarel.com/${rec.placement === "tour_end" ? "tour" : "demo"}`,
            pageName: "Book a demo",
          },
        }),
      }
    );
    if (!res.ok) return { ok: false, error: `hubspot_${res.status}` };
    return { ok: true };
  } catch (e) {
    return { ok: false, error: `hubspot_throw_${String(e).slice(0, 80)}` };
  }
}

export async function toInternalAlert(rec: LeadRecord): Promise<Result> {
  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: NOTIFY,
      replyTo: rec.email,
      subject: `Demo request: ${rec.company}`,
      text: summarise(rec),
    });
    return error ? { ok: false, error: `resend_${error.name}` } : { ok: true };
  } catch (e) {
    return { ok: false, error: `resend_throw_${String(e).slice(0, 80)}` };
  }
}

export async function toVisitorReceipt(rec: LeadRecord): Promise<Result> {
  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: rec.email,
      subject: "Your Voxarel demo request",
      text: [
        `Hello ${rec.name},`,
        "",
        "We have your demo request. Someone will reply within one business day.",
        "",
        `Want to pick a time now? ${BOOK_URL}`,
        "",
        "The demo is thirty minutes on your own workflow. Bring the WhatsApp",
        "groups and the spreadsheets.",
        "",
        "Voxarel",
        "partners@voxarel.com",
      ].join("\n"),
    });
    return error ? { ok: false, error: `resend_${error.name}` } : { ok: true };
  } catch (e) {
    return { ok: false, error: `resend_throw_${String(e).slice(0, 80)}` };
  }
}

/** Skipped until the console team ships the endpoint. No code change needed then. */
export async function toConsole(rec: LeadRecord): Promise<Result> {
  const url = process.env.CONSOLE_LEADS_URL;
  if (!url) return { ok: true };
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ source: "website-demo", ...rec }),
    });
    return res.ok ? { ok: true } : { ok: false, error: `console_${res.status}` };
  } catch (e) {
    return { ok: false, error: `console_throw_${String(e).slice(0, 80)}` };
  }
}
