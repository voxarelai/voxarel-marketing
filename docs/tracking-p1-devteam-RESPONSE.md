# Public Tracking P1 — Dev-Team Response

**From:** Voxarel product/console team (`Voxarel-Inc/voxarel` monorepo)
**To:** Marketing site (voxarel.com · `voxarel-marketing` repo)
**Date:** 2026-07-19
**Status:** Decisions settled (§D). Awaiting marketing on the signup form + the product calls in §G.
**Re:** `docs/tracking-p1-devteam-brief.md`

---

## A. Headline — good news, and two things you didn't know

**Good news:** most of P1 already exists on our side. There is a **live, public, unauthenticated tracking API and page** in the console today — built originally for ST Courier's own domain:

- API: `GET /api/public/track/[awb]` (`apps/web/src/app/api/public/track/[awb]/route.ts`) — no auth, CORS-allowlisted, org-agnostic AWB lookup.
- Page: `app.voxarel.com/public/track/[awb]` (`apps/web/src/app/public/track/[awb]/page.tsx`).
- Service: `getTrackingByAwb(awb)` (`apps/web/src/lib/services/shipping/tracking-repository.ts`), running under `withSystemContext()`.

It already enforces most of your §5 non-negotiables: customer name is masked, driver/branch **holder** data is excluded (a build-failing guard test enforces this), internal-only statuses (`tracing`, `lost`) are substituted with the last public status, internal notes are nulled, and **amounts are never included** (only an invoice-PDF token).

**Thing you didn't know #1 — it currently leaks locations.** That same endpoint returns the **full checkpoint timeline *with* `location`** to anyone. That directly contradicts your §5 non-negotiable #1 ("never put checkpoint locations in the Tier-1 response"). So P1 is **not** "just point at the existing endpoint" — the real work is splitting it into a location-free Tier-1 and a location-carrying Tier-2 behind the unlock. That's a contained change, not a rebuild.

**Thing you didn't know #2 — there may be UI overlap.** We already ship a public tracking *page* (for ST Courier's domain). Your voxarel.com/track is a parallel, Voxarel-branded surface. Not a blocker, but someone on product should decide whether these converge or stay separate (per-tenant domain vs. one Voxarel tracker). Flagging so we don't ship two diverging trackers.

**Net:** your "small, well-scoped" framing is right. Below is the field-by-field contract check, answers to all 13 questions, the settled decisions (§D — including the email-OTP + phone-match unlock), and a build scope.

---

## B. §4 contract — field-by-field against real data

Your proposed shapes are close. Corrections, mapped to real columns (`packages/db/src/schema.ts`):

**Tier 1 — status, no locations**

| Your field | Reality | Note |
| --- | --- | --- |
| `awb` | ✅ `shipments.master_awb` / `packages.child_awb` | echoed back |
| `status` | ✅ derived from `shipments.status` | human label we format |
| `statusCategory` | ⚠️ needs mapping | We have **14** statuses, not 5 — see mapping below. Your 5 buckets work as a projection. |
| `origin` | ⚠️ partial | Origin city is **not denormalized**; it comes from a joined address, and **branch city is missing from the schema** (known gap, returns `""` today). Destination is fine. We can expose origin country reliably, city best-effort. |
| `destination` | ✅ `destination_country` + `destination_city` | |
| `service` | ✅ `service_type` (`sea` / `air` / `domestic`) | |
| `carrier` | ✅ static per tenant | "Shipped with ST Courier" |
| `etaLine` | ✅ computed | Not a column — we calculate it from service + collection date. We'll pre-format it. |
| `progressStep` (0–3) | ✅ derivable | From the status mapping below. |
| `events[]` (no location) | ⚠️ **this is the build** | Timeline lives in `status_updates` **with** `location`. Tier-1 must strip `location`. State (`done`/`current`/`pending`) we derive. |
| `contactHint` | ✅ reframed (D-3) | Not needed as designed — the unlock flow always asks the visitor for **email + phone** and verifies both. We don't pre-signal a contact kind. |

**`statusCategory` proposed mapping** (real → your enum):

- `collected` → **collected**
- `confirmed`, `received`, `in_transit`, `arrived`, `customs_clearance`, `shipped`, `handed_to_partner` → **in_transit**
- `out_for_delivery` → **out_for_delivery**
- `delivered` → **delivered**
- `cancelled` → **hold** (or a distinct `cancelled` — your call)
- `quote`, `tracing`, `lost` → never surfaced (pre-public / internal-only)

**Tier 2 — details, with locations (behind the email-OTP + phone-match unlock)**

| Your field | Reality | Note |
| --- | --- | --- |
| `sender { name, city }` | ✅ `customers` + joined address | |
| `receiver { name, address }` | ✅ `recipient_name` + `delivery_address` | |
| `pieces`, `weight`, `service` | ✅ `packages` + `shipments.total_weight` | |
| `documents[] { label, ref }` | ✅ `invoices.public_access_token` pattern exists | already behind separate signed links, no amounts — matches your §5 |
| `pod? { receivedBy, time }` | ✅ `packages.received_by` / `received_at`, `delivered_at` | present after delivery |
| `events[] { …, location }` | ✅ same timeline, now with `status_updates.location` | this is the only real difference from Tier-1 |

Amounts, holder/driver identity, and internal notes stay **out of both tiers** — already the case.

---

## C. §5 non-negotiables — feasibility

- **No locations in Tier-1** — feasible; requires the split described above (today it's violated).
- **Not-found ≡ found** — we'll harden this. The current endpoint wasn't built to a constant-time/constant-shape guarantee; we'll make the 404 shape and timing indistinguishable as part of P1. Flagging honestly rather than claiming it's already done.
- **Contact value never exposed** — satisfied by design (D-3): the visitor supplies their own email + phone; the on-file phone is only ever compared **server-side, pass/fail**, and is never returned. No stored contact value leaves the API.
- **Amounts never public** — already guaranteed; amounts live in the invoice PDF behind its own token.

---

## D. Decisions from the product owner (2026-07-19)

All three are settled. The verification model (D-3) is the product owner's design and is the strongest part of this plan.

### D-1 — OTP channel: EMAIL. **Decided.**

Booking captures an email — `CustomerForm.tsx` has an **"Email (Optional)"** field (`apps/web/src/components/forms/CustomerForm.tsx:748`) on `customers.email`. But it's **optional** and it's the **sender's**; the **recipient** form (`RecipientForm.tsx`) has name + phone, **no email**. So we don't rely on an on-file email — the visitor supplies their own email and we OTP it (see D-3). No phone/SMS/WhatsApp channel in P1.

### D-2 — Tenant hint in the URL: not needed. **Decided.**

No `?t=` param — the API resolves the tenant server-side (ST Courier is the only public-tracking tenant today), so even a non-unique legacy AWB resolves cleanly. Clean `/track?awb=…` URLs.

**Recommended follow-up:** ST Courier is on the **legacy** AWB format by default (`getOrgAwbFormat` returns `legacy` unless set — `awb-encoding-repository.ts:32`), which is **sequential/enumerable** (`S-DXB-00001`, `-00002`…). Move new shipments to the **encoded** 7-char format (`7MKX29T`): globally unique (never needs a hint) *and* non-enumerable. The phone-match in D-3 already gates the private details, so this is belt-and-suspenders — but it also stops Tier-1 status from being scraped by walking the numbers.

### D-3 — Verification model: **email OTP + phone-match.** (Product owner's design — this is the plan.)

This solves the no-email problem cleanly and safely. To unlock Tier-2 the visitor enters **email + phone** (+ a consent opt-in), and we require **both** proofs:

1. **Email OTP** — we email a 6-digit code to the address they entered; they enter it back. Proves they own that inbox, and gives us a **verified, consented email** for the Voxarel list.
2. **Phone-match (server-side)** — we compare the phone they entered against the phone **on the shipment** (`recipient_phone`, falling back to the customer phone). Proves they're actually the sender/recipient — a random person enumerating AWBs won't know the on-file phone.

Both pass → unlock Tier-2 **and** store the verified email + phone as a consented contact. This is why we don't need the recipient's email in advance: **the on-file phone is the identity anchor; the email is what we newly capture.**

Security properties we'll enforce:

- The phone check is **server-side, pass/fail only** — the on-file phone is never returned.
- **Phone formats are normalized** before comparison (`+9715…` vs `05…` vs spaces).
- **Hard attempt cap** on the phone/code check (≈5 tries per AWB per hour, then lock) so the on-file phone can't be brute-forced against a known AWB.
- Honest residual risk: someone who personally knows the recipient's phone could unlock — acceptable for parcel tracking, and far tighter than "any email unlocks."

**List-building falls out for free, and legally:** every successful unlock yields a consented, email-verified, phone-verified Voxarel contact. A standalone **"Register with Voxarel"** CTA can reuse the same capture (email + phone + consent) without a shipment, for people who just want to sign up.

### What marketing builds vs. what we build

- **Marketing:** the signup/verify form (email + phone + **consent checkbox**), the "enter the code" step, and the unlocked view.
- **We provide:**
  - `POST …/otp/request` — emails the 6-digit code to the entered address (masked echo back).
  - `POST …/otp/verify` — checks the **code AND the phone-match**, returns the unlock token, and stores the consented contact.
  - `GET …/details` — the Tier-2 payload the token opens.
  - `POST …/register` — standalone list signup (email + phone + consent), no shipment.
  - All rate-limited + CORS-allowed, on **staging first**.

---

## E. §6 — answers to all 13

**API & contract**

1. **Shapes match?** Mostly, with the §B corrections. `contactHint` is superseded by the D-3 flow (visitor always supplies email + phone; we verify both) — no pre-signalled contact kind. Everything else is exposable; holder/amounts/internal-notes stay out (already enforced).
2. **Base URL?** `https://app.voxarel.com/api/…` — the console host, where the existing public API already lives. We can front it with a stable path; happy to standardize on your `/api/v1/public/tracking/…` naming.
3. **CORS?** Yes. Per-route allowlist already exists (`getCorsHeaders()` in the tracking route). We add `https://voxarel.com` + `https://www.voxarel.com`. If we go cookie-based for unlock, we also set `Access-Control-Allow-Credentials` (see Q5).
4. **v1 stability?** Yes — we'll commit to a versioned `/api/v1/public/tracking/*` namespace you can code against.

**Auth, sessions, security**

5. **Cookie vs token?** Recommend **a short-lived opaque token, not a cookie.** voxarel.com → app.voxarel.com is cross-site; a third-party cookie there needs `SameSite=None; Secure` and is increasingly blocked by browsers (Safari/Firefox already, Chrome heading there). Cleaner: `/otp/verify` returns `{ ok: true, trackingToken }`, you hold it in `sessionStorage` and send it as `Authorization: Bearer …` to `/details`. No cross-site-cookie fragility. If you'd rather have the cookie, we can do it, but expect third-party-cookie breakage for some users.
6. **Rate limiting?** **We own it** at the API edge — Upstash sliding-window limiter is already wired (`apps/web/src/lib/auth/rate-limit.ts`), with graceful in-memory fallback. Proposed: ~10 Tier-1 lookups/min/IP; OTP send ~3/10 min per (email+IP); **code + phone-match verify capped at ~5 attempts per AWB per hour then lockout** (this is what stops the on-file phone being brute-forced). **You do nothing.**
7. **OTP sender identity?** Channel is email (D-1). It goes through **Resend** from `noreply@voxarel.com`, which works today. A dedicated `tracking@voxarel.com` is optional and would need a mailbox + SPF/DKIM in Resend first.
8. **Session length?** 30 min is fine; we'll set the unlock token TTL to 30 min. Confirm and it's locked.

**Data & scope**

9. **Tenant scoping?** See **D-2.** No hint — the API resolves the tenant server-side (one public-tracking tenant today). We recommend moving ST Courier to encoded, non-enumerable AWBs going forward.
10. **Delivered locks harder over time?** Not built today; a product decision. Proposal: Tier-1 status stays available indefinitely; Tier-2 details expire ~90 days post-delivery. Confirm.
11. **AWB format for pre-validation?** Two real regexes:
    - Encoded: `^[A-Z0-9]{7}$` (child = master + 1–3 digits, no separator, e.g. `7MKX29T1`).
    - Legacy: `^[SAD]-[A-Z][A-Z0-9]{2,4}-\d{5}$` (child appends `-\d{2}`, e.g. `S-DXB-00001-01`).
    You can pre-validate against both. Confirm which one ST Courier is on and you can validate to just that.
12. **Ownership & timeline?** **Needs product-owner assignment** (not ours to commit unilaterally). Build size to inform it: the Tier-1/Tier-2 split + email-OTP + phone-match verify + unlock token + register endpoint is a **small-to-medium** effort because email/rate-limit/CORS/token infra all already exist — the net-new is the location-stripping split, the OTP generate/verify + storage, and the phone-match check.
13. **Staging/sandbox first?** **Yes.** We expose it on **staging (dev.voxarel.com)** against staging data first; you wire and verify all states there before we flip production.

---

## F. Build scope on our side

1. Split the public payload: **Tier-1 strips `location`** from `events[]`; **Tier-2 (`/details`) includes it** — refactor in `getTrackingByAwb` / the route.
2. Add `statusCategory` + `progressStep` + `etaLine` to the public payload (mapping in §B; most already computed internally).
3. **Email OTP:** generator + storage (reuse Better Auth `verification` table → no migration, or a small `tracking_otp` table → 1 migration) + Resend template + rate limits. Emails the code to the **address the visitor entered**.
4. **Phone-match check:** server-side compare of the entered phone against the shipment's `recipient_phone` / customer phone, with format normalization and a hard per-AWB attempt cap. `/otp/verify` returns the unlock token only when the **code is valid AND the phone matches**, and stores the consented email + phone contact.
5. **Unlock token:** opaque, 30-min TTL, returned by `/otp/verify`, validated by `/details`.
6. **Registration endpoint:** standalone `POST /api/v1/public/register` (email + phone + consent) → the leads pipeline, for pure signup. Marketing builds the UI.
7. **CORS:** add voxarel.com + www to the allowlist (and `Allow-Credentials` only if we choose cookies).
8. **Harden not-found ≡ found** (constant shape + timing).
9. **Prerequisites:** Resend prod key + `noreply@voxarel.com` (or `tracking@voxarel.com`) SPF/DKIM; Upstash prod env vars. Optional but recommended: move ST Courier to encoded AWBs.

**Definition of done:** an ST Courier customer tracks a real parcel on voxarel.com — Tier-1 instantly; Tier-2 after entering their **email (code-verified)** and the **phone that matches the booking**. Every unlock also yields a consented Voxarel contact.

---

## G. What we need back

- **Marketing form:** build the email + phone + consent signup/verify UI (per D-3). Tell us the exact consent copy/fields you want stored.
- **Product calls:** session length (Q8, propose 30 min), delivered-lock policy (Q10, propose 90 days), and whether voxarel.com/track and our existing ST-Courier public page converge (§A #2).
- **Ownership + window** (Q12) — for the product owner to assign.
- **Optional:** approve moving ST Courier to encoded AWBs (D-2 follow-up).

D-1 (email), D-2 (no hint), and D-3 (email OTP + phone-match) are settled. On your go we stand up the Tier-1/Tier-2 split, the OTP + phone-match verify, and the register endpoint on **staging** for you to wire against.

---

## H. Round 2 — answers accepted, contracts finalized (2026-07-21)

Everything you sent is accepted. You're clear to build the signup/verify popup against the contracts below — no more open questions on our contract except the owner/timeline (product owner to assign).

### Confirmed
- **D-1 email · D-2 no hint · D-3 email OTP + phone-match** — locked.
- **Session:** 30-min token TTL (Q8).
- **Delivered-lock (Q10):** Tier-1 status stays available indefinitely; Tier-2 `/details` returns locked (404) after `delivered_at + 90 days`.
- **Auth (Q5):** opaque token, `Authorization: Bearer` — no cross-site cookie. `/otp/verify` returns `{ trackingToken }`; you hold it in `sessionStorage` and send it to `/details`.
- **Rate limiting (Q6):** we own it at the edge — you do nothing.
- **Encoded AWBs:** approved. We'll move ST Courier to the encoded (non-enumerable) format going forward; existing legacy AWBs keep working (the lookup accepts both), so your "validate both formats" plan is right.

### Converge vs separate (§A #2) — confirmed your lean
**Keep both pages, one shared backend.** voxarel.com/track is the canonical Voxarel-branded tracker (and the home of the future universal tracker + SEO pages); the ST Courier tenant page stays on their own domain. Both call the **same** public tracking service and the **same** endpoints below — so they can't diverge. We'll refactor the existing tenant page onto these endpoints so there's one code path.

### Consent + what we store
On a successful unlock (or a standalone register) we persist one **contact-consent record** so consent is provable later:
- `email`
- `phone` — the verified one (passed the phone-match), normalized to E.164
- `consentedAt` — timestamp
- `termsVersion` — the version string of the terms shown at the time
- `source` — `track_unlock` | `register` | `signup`
- (+ AWB / shipment context on a track-unlock, for provenance)

Your consent line is stored verbatim against `termsVersion`:
> "By continuing you create your Voxarel contact and agree to Voxarel's Terms. We'll send updates about your shipments and occasional Voxarel product news — unsubscribe anytime."

This is a new shape → one small migration on our side (a `public_contacts` table, or the leads table + these columns — we'll confirm the target and send you the exact field names with the endpoints).

### Endpoint contracts — build the UI to these
Base (staging): `https://dev.voxarel.com/api/v1/public/…`. **CORS:** `voxarel.com` + `www.voxarel.com` allowed on all five (+ OPTIONS preflight). All unauthenticated except `/details` (Bearer). Every call is a plain fetch — your verify-in-place popup works fully, no navigation.

1. **`GET /tracking/:awb`** — Tier-1, NO locations.
   → `{ awb, status, statusCategory, origin, destination, service, carrier, etaLine, progressStep(0–3), events: [{ title, time, state, note? }] (no location), contactHint: "email" | "none" }`
   `contactHint: "email"` ⇒ unlock is available (a sender email is on file); `"none"` ⇒ offer Register only.

2. **`POST /tracking/:awb/otp/request`** `{ email }`
   → `{ sentTo: "r•••@g•••.com", expiresInSec, resendInSec }` — emails a 6-digit code; masked echo only.

3. **`POST /tracking/:awb/otp/verify`** `{ email, code, phone, consent: true, termsVersion }`
   → verifies the code **and** that `phone` matches the shipment's on-file phone (server-side, normalized, pass/fail — never returned). Both pass ⇒ stores the consent contact + returns `{ ok: true, trackingToken }` (30-min TTL). Fail ⇒ `{ ok: false, error }`. Attempt-capped (~5 / AWB / hr).

4. **`GET /tracking/:awb/details`** — `Authorization: Bearer <trackingToken>`
   → Tier-2 WITH locations: `{ sender {name, city}, receiver {name, address}, pieces, weight, service, documents[] {label, ref}, pod? {receivedBy, time}, events: [{ title, location, time, state, note? }] }`. Locked (404) after delivered + 90 days.

5. **`POST /register`** `{ email, phone, consent: true, source: "register", termsVersion }`
   → `{ ok: true }`. Standalone signup (no shipment); stores the same consent contact. Your Customer-vs-Business gate: route "Business" to your demo-request path; "Customer" → this register (or the track-unlock).

### Owner + timeline (Q12) — with the product owner
Net-new work is small-to-medium: the Tier-1/Tier-2 split, OTP generate/verify + the phone-match, the consent-contact store (one migration), and `/register`. Email (Resend), rate-limiting (Upstash), CORS, and the token pattern already exist, so most of it is wiring. We stand it up on **staging first**; you wire + verify every state there, then flip production. **[Owner + rough window: to be confirmed by the product owner — see the ping below.]**

We'll ping you the moment the five endpoints are live on dev.voxarel.com with the final field names.
