import "server-only";
import { Resend } from "resend";
import type { LeadRecord } from "./schema";

type Result = { ok: boolean; error?: string };

// Placeholder key keeps construction from throwing before RESEND_API_KEY is set.
// Sends fail gracefully until the real key is in place.
const resend = new Resend(process.env.RESEND_API_KEY ?? "re_placeholder");
const FROM = process.env.LEAD_FROM ?? "partners@voxarel.com";
const NOTIFY = process.env.LEAD_NOTIFY_TO ?? "partners@voxarel.com";
const WHATSAPP_URL =
  "https://wa.me/971585898696?text=Hi%20Voxarel%2C%20I%20just%20requested%20a%20demo";

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
  // HubSpot deferred: with no portal/guid set, skip cleanly (like the console
  // target) so a lead still clears the retry queue on the two emails alone.
  // Setting the env vars later activates real CRM delivery with no code change.
  if (!portal || !guid) return { ok: true };

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

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const SEE_LIST = [
  "What every agent is holding in cash at 6pm, without a single phone call",
  "A booking become an invoice, with VAT, and COD settled per driver with the card fee already deducted",
  "Four branches quoting off one rate card, compared side by side",
  "A voided invoice with the reason, the approval, and the before and after your auditor asks for",
  "A tracking page and an invoice your customer opens on their phone, no login",
];

/**
 * Branded, email-safe HTML receipt. Table layout + inline styles survive Gmail,
 * Outlook and Apple Mail; color-scheme meta + a prefers-color-scheme block give
 * a proper dark-mode render; the max-width media query reflows on phones. The
 * plain-text version is the fallback.
 */
function receiptHtml(rec: LeadRecord): string {
  const name = escapeHtml(rec.name.split(" ")[0] || rec.name);
  const bullets = SEE_LIST.map(
    (b) =>
      `<tr><td width="24" valign="top" style="padding:6px 0;"><span style="color:#2e8c7a;font-weight:700;">&#10003;</span></td><td class="t-body" style="padding:6px 0;font-size:14.5px;line-height:1.55;color:#5b6b6f;">${b}</td></tr>`
  ).join("");
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><meta name="color-scheme" content="light dark"/><meta name="supported-color-schemes" content="light dark"/><style>:root{color-scheme:light dark;supported-color-schemes:light dark}.h{font-family:'Poppins','Segoe UI',Helvetica,Arial,sans-serif}@media (max-width:620px){.card{width:100%!important}.px{padding-left:22px!important;padding-right:22px!important}.stat{display:block!important;width:100%!important;padding:0 0 12px 0!important}.hero{font-size:23px!important}}@media (prefers-color-scheme:dark){.email-bg{background:#04161c!important}.card{background:#0f2a33!important}.t-title{color:#f4f8f6!important}.t-ink{color:#eaf4f1!important}.t-body{color:#aebcbe!important}.t-faint{color:#8fa0a2!important}.t-num{color:#eaf4f1!important}.box{background:#12333d!important;border-color:#204652!important}.divider{background:#204652!important}.btn{background:#2e8c7a!important}.lk{color:#86d8c4!important}}</style></head><body class="email-bg" style="margin:0;background:#e8eeec;font-family:Lato,Arial,sans-serif;"><table role="presentation" class="email-bg" width="100%" cellpadding="0" cellspacing="0" style="background:#e8eeec;padding:24px 12px;"><tr><td align="center"><table role="presentation" class="card" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;"><tr><td class="px" style="background:#0b2c36;padding:24px 40px;"><img src="https://www.voxarel.com/voxarel-logo-white.png" alt="Voxarel" height="24" style="height:24px;width:auto;display:block;border:0;"/></td></tr><tr><td style="height:3px;background:#5fb5a2;line-height:3px;font-size:0;">&nbsp;</td></tr><tr><td class="px" style="padding:34px 40px 0;"><div class="h" style="font-size:12px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#2e8c7a;">Demo request received</div><h1 class="h hero t-title" style="margin:12px 0 0;font-size:26px;line-height:1.22;font-weight:700;letter-spacing:-.02em;color:#0b2c36;">Let&rsquo;s get you a look at Voxarel.</h1><p class="t-body" style="margin:16px 0 0;font-size:16px;line-height:1.65;color:#5b6b6f;">Hi ${name}, we&rsquo;ll reply within <strong class="t-ink" style="color:#16282e;">one business day</strong>. Want it sooner? Message us on WhatsApp and we&rsquo;ll lock a time today.</p></td></tr><tr><td class="px" style="padding:22px 40px 0;"><table role="presentation" cellpadding="0" cellspacing="0"><tr><td class="btn" style="background:#104050;border-radius:12px;"><a href="${WHATSAPP_URL}" style="display:inline-block;padding:15px 30px;font-family:'Poppins',Helvetica,Arial,sans-serif;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;">Book faster on WhatsApp &rarr;</a></td></tr></table><p class="t-faint" style="margin:12px 0 0;font-size:13px;line-height:1.5;color:#93a2a4;">Prefer email? Just reply with a couple of times that work.</p></td></tr><tr><td class="px" style="padding:28px 40px 0;"><p class="t-ink" style="margin:0;font-size:15.5px;line-height:1.7;color:#16282e;">Most delivery software stops at the door. That is the easy half. Voxarel runs the hard half: rates, invoices and VAT, <strong>COD settlement</strong>, agent commissions, warehouse stock, and keeping every branch honest with each other. One platform for the booking, the box, the paperwork and the money.</p></td></tr><tr><td class="px" style="padding:24px 40px 0;"><table role="presentation" class="box" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f8f7;border:1px solid #e6edeb;border-radius:12px;"><tr><td style="padding:18px 22px;"><div class="h t-faint" style="font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#93a2a4;">Live in production &middot; a courier network moving Gulf to India</div><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:12px;"><tr><td class="stat" width="33%" valign="top" style="padding-right:8px;"><div class="h t-num" style="font-size:22px;font-weight:700;color:#0b2c36;line-height:1;">5+</div><div class="t-body" style="font-size:12px;color:#5b6b6f;margin-top:4px;">branches live</div></td><td class="stat" width="33%" valign="top" style="padding-right:8px;"><div class="h t-num" style="font-size:22px;font-weight:700;color:#0b2c36;line-height:1;">7 yr</div><div class="t-body" style="font-size:12px;color:#5b6b6f;margin-top:4px;">audit trail</div></td><td class="stat" width="34%" valign="top"><div class="h t-num" style="font-size:22px;font-weight:700;color:#0b2c36;line-height:1;">1 week &rarr; hours</div><div class="t-body" style="font-size:12px;color:#5b6b6f;margin-top:4px;">month-end reconciliation</div></td></tr></table></td></tr></table></td></tr><tr><td class="px" style="padding:26px 40px 0;"><div class="h t-ink" style="font-size:13px;font-weight:700;color:#16282e;">What you&rsquo;ll see in 30 minutes, on your own shipments</div><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:10px;">${bullets}</table><p class="t-body" style="margin:16px 0 0;font-size:14.5px;line-height:1.6;color:#5b6b6f;">Bring the WhatsApp groups and the spreadsheets. We run it on <strong class="t-ink" style="color:#16282e;">your</strong> workflow and your corridor, not a slide deck.</p></td></tr><tr><td class="px" style="padding:24px 40px 0;"><p class="t-body" style="margin:0;font-size:16px;line-height:1.6;color:#5b6b6f;">Talk soon,<br/><strong class="t-ink" style="color:#16282e;">The Voxarel team</strong></p></td></tr><tr><td class="px" style="padding:22px 40px 0;"><div class="divider" style="height:1px;background:#e6edeb;line-height:1px;font-size:0;">&nbsp;</div></td></tr><tr><td class="px" style="padding:16px 40px 30px;"><p class="t-faint" style="margin:0;font-size:12px;line-height:1.6;color:#a9b6b8;">Voxarel &middot; the operating infrastructure of Gulf trade<br/>Operated by Azraq Ventures LLC, Dubai &middot; <a class="lk" href="https://www.voxarel.com" style="color:#93a2a4;text-decoration:none;">voxarel.com</a></p></td></tr></table></td></tr></table></body></html>`;
}

export async function toVisitorReceipt(rec: LeadRecord): Promise<Result> {
  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: rec.email,
      subject: "Let's get you a look at Voxarel",
      html: receiptHtml(rec),
      text: [
        `Hi ${rec.name},`,
        "",
        "We have your demo request. Someone will reply within one business day.",
        "Want it sooner? Message us on WhatsApp: https://wa.me/971585898696",
        "",
        "In 30 minutes, on your own shipments, we will show you the parts most",
        "delivery software skips: your agents' cash position, COD settled per",
        "driver, invoices with VAT, four branches on one rate card, and a void",
        "an auditor can follow.",
        "",
        "Bring the WhatsApp groups and the spreadsheets. Not a slide deck.",
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
