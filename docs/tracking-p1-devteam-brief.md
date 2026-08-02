# Voxarel Public Tracking — P1 Integration Brief (for the Voxarel dev team)

**From:** Marketing site (voxarel.com · `voxarel-marketing` repo)
**To:** Voxarel product/console dev team (`Voxarel-Inc/voxarel` monorepo)
**Date:** 2026-07-19
**Status:** Awaiting dev-team brief before any wiring begins
**Related:** `docs/TRACKING_PLAN.md` (full feature plan — this doc is the P1 hand-off)

---

## 1. Why you're getting this

The public tracking page at **voxarel.com/track** is **design-complete and live on mock data** (P0). The UI for every state exists and works. What it does *not* have is real data — because the shipment data, OTP delivery, and verification all live in the console/monorepo, which your team owns.

We (marketing) cannot wire P1 until you brief us on the API. **This document is our ask:** it states exactly what the UI consumes, proposes the contract from the plan, and lists the decisions only your team can make. Please review, correct anything wrong, answer the open questions in §6, and confirm ownership/timeline in §7.

We change **nothing** on our side until we have your answers.

---

## 2. What's already built on the marketing side

- `/track` full experience — search, not-found, Tier 1 result (status + timeline, locations hidden), locked panel, OTP send + verify, unlocked details, claim flow, claim-sent.
- Deep-link support: `/track?awb=XXXX` auto-runs the lookup (the homepage tracking box links straight into it).
- All data currently comes from **one file** — `src/components/track/mock.ts` — with 4 fake shipments and a hardcoded OTP (`246810`).

**Our P1 job is small and well-scoped:** replace `mock.ts` with an API client, delete the demo chips and demo-code hint. The UI itself does not change. That is the entire marketing-side change — *once your API exists.*

---

## 3. What we need from you (P1 scope)

1. A **public, read-only Tier-1 endpoint** (no auth) returning status + timeline **without checkpoint locations**.
2. An **OTP request + verify pair** that sends a 6-digit code to the contact **on the booking** (email first).
3. An authenticated **details endpoint** (session cookie from verify) returning the full Tier-2 payload **including** locations.
4. A stable **base URL / host** we call, with **CORS** allowing `https://voxarel.com` and `https://www.voxarel.com`.
5. Confirmation of **tenant scoping** — how the API knows an AWB belongs to ST Courier (today) vs. future tenants.

(WhatsApp/SMS OTP and the claim queue are **P2** — see `TRACKING_PLAN.md`. Not needed for P1, but the API shapes below leave room for them.)

---

## 4. Exactly what our UI binds to (so your payload matches on the first try)

This is the shape our components already consume (from `mock.ts`). If your API returns this, the swap is nearly mechanical. Field names are negotiable — but every piece of data below is *rendered somewhere*, so we need a source for each.

**Tier 1 — `GET /api/v1/public/tracking/{awb}`** (no auth)

| UI needs | Type | Notes |
| --- | --- | --- |
| `awb` | string | echoed back |
| `status` | string | human label, e.g. "Out for delivery" |
| `statusCategory` | enum | drives the status-pill color; propose: `in_transit \| out_for_delivery \| delivered \| hold \| collected` |
| `origin`, `destination` | string | city, country — header only |
| `service` | string | e.g. "Air cargo" |
| `carrier` | string | shown as text ("Shipped with ST Courier") |
| `etaLine` | string | pre-formatted ETA/delivered line |
| `progressStep` | 0–3 | Collected · In transit · Out for delivery · Delivered |
| `events[]` | array | `{ title, time, state: done\|current\|pending, note? }` — **NO `location`** in this tier |
| `contactHint` | enum | `email \| phone \| none` — **kind only, never the value** (decides OTP vs. claim path) |

**OTP request — `POST /api/v1/public/tracking/{awb}/otp/request`** `{ channel?: "email" \| "phone" }`
→ `{ sentTo: "r•••••a@g•••••.com", expiresInSec, resendInSec }` — masked contact only.

**OTP verify — `POST /api/v1/public/tracking/{awb}/otp/verify`** `{ code }`
→ sets an httpOnly session cookie scoped to that one AWB (≈30 min). Body can be `{ ok: true }`.

**Tier 2 details — `GET /api/v1/public/tracking/{awb}/details`** (requires cookie)

| UI needs | Notes |
| --- | --- |
| `sender { name, city }` | |
| `receiver { name, address }` | |
| `pieces`, `weight`, `service` | strings as displayed |
| `documents[] { label, ref }` | invoice/receipt refs — **links behind separate signed URLs, not raw amounts** |
| `pod? { receivedBy, time }` | present only after delivery |
| `events[] { title, location, time, state, note? }` | **same timeline, now WITH `location`** |

**Claim (P2) — `POST /api/v1/public/tracking/{awb}/claim`** `{ role, name, email, phone }` → always `{ ok: true }`-shaped.

---

## 5. Non-negotiables from the plan (so we build to the same contract)

- **Never** put checkpoint locations, names, addresses, or amounts in the Tier-1 response — only in `/details` behind the cookie.
- **Not-found and found responses must be indistinguishable** in timing/shape beyond the visible result (no data leaked in errors).
- **`contactHint` returns the kind, never the value.** The value only ever appears masked, from the OTP-request response.
- **Amounts/charges never appear on the public page**, even after unlock — they live inside the invoice PDF behind its own signed link.

---

## 6. Open questions — we need your answers to proceed

**API & contract**
1. Do the proposed endpoints/shapes in §4 match how you'd build them, or should we adapt? Any fields you *can't* expose publicly?
2. What's the **base URL**? (e.g. `https://console.voxarel.com/api/v1/public/...` — same host we already use, or a separate one?)
3. **CORS**: can you allow `voxarel.com` + `www.voxarel.com` origins on these routes?
4. **API versioning / stability** — is `v1` a commitment we can code against?

**Auth, sessions, security**
5. Is the unlock session a **cookie** (as planned) — and if so, does the cross-subdomain setup (voxarel.com calling console.voxarel.com) need a shared cookie domain, or will you return a token we hold instead?
6. Who owns **rate limiting** — you at the API edge, or do you expect anything from us? (Plan: ~10 lookups/min/IP, OTP caps.)
7. **OTP sender identity** — is `tracking@voxarel.com` set up (mailbox + DNS/SPF/DKIM), or another sender? (Plan open decision #1.)
8. Confirmed **session length** — plan proposes 30 min. (Open decision #2.)

**Data & scope**
9. **Tenant scoping** — how does a public AWB resolve to the right tenant (ST Courier today)? Is the AWB format globally unique, or do we need a tenant hint in the URL?
10. Do **delivered shipments lock harder over time** (e.g. details unavailable 90 days post-delivery)? (Open decision #3.)
11. **AWB format** — confirm the canonical format/validation so we can pre-validate input and (later, V2) detect non-Voxarel numbers.

**Ownership & timeline**
12. Who on your side **owns this API**, and what's a realistic **delivery window**?
13. Will you deliver it against a **staging/sandbox** first that we can wire against before production?

---

## 7. What happens once you answer

- We swap `src/components/track/mock.ts` for a thin API client, add the base URL as an env var, and delete the demo chips + demo-code hint. **No UI redesign** — the states are already built to the plan.
- We wire against your **staging** first, verify all states end-to-end (found/not-found, email-OTP, details, error/expiry), then flip to production.
- **Definition of done for P1:** an ST Courier customer tracks a real parcel end-to-end on voxarel.com — Tier 1 instantly, Tier 2 after an email code.
- P2 (WhatsApp/SMS OTP + claim queue in the console Approvals inbox) follows once P1 is live.

---

## 8. TL;DR for the dev team

The website is done and waiting. We need a small public tracking API on the console — a no-auth Tier-1 status endpoint (no locations), an email-OTP pair, and a cookie-gated details endpoint (with locations) — plus answers to §6. Give us that on staging and we'll have real tracking live on voxarel.com within days, no UI changes needed.
