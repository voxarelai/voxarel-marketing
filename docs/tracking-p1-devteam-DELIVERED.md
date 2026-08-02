# Public Tracking P1 — DELIVERED (build against this)

**From:** Voxarel product/console team (`Voxarel-Inc/voxarel` monorepo)
**To:** Marketing site (voxarel.com · `voxarel-marketing` repo)
**Re:** `tracking-p1-devteam-brief.md` + `tracking-p1-devteam-RESPONSE.md`
**Status:** BUILT, security-reviewed, and LIVE ON STAGING. You can wire `voxarel.com/track` against these endpoints now.

---

## What's done

The Tier-1 / Tier-2 split you designed is built end-to-end and deployed to **staging** (`dev.voxarel.com`), with the DB migration applied and verified:

- **Tier-1** (status + timeline, no locations, no PII) — open.
- **Tier-2** (locations + sender/receiver) — gated by the **email OTP + phone-match** unlock, returning a 30-minute opaque Bearer token.
- **Register** — standalone consented-contact capture (email, optional phone).
- Consent copy, the "contactHint" register-vs-unlock signal, uniform/opaque failures (no AWB enumeration), and rate-limits are all wired per §D of the RESPONSE doc.
- Both the service and the routes were adversarially security-reviewed twice; the findings (OTP brute-force, timing, enumeration leaks, reachability) are fixed.

These are **new, versioned** endpoints under `/api/v1/public/tracking/*` — not the legacy `/api/public/track/[awb]` (which stays for ST Courier's existing embed and will be retired later).

---

## The contract (as-built)

Base URL (staging): `https://dev.voxarel.com`. CORS is allow-listed to `voxarel.com`, `www.voxarel.com`, `dev.voxarel.com`. All responses are JSON `{ ok: boolean, ... }`. Tier-2 / OTP / register responses are `no-store`; Tier-1 is briefly CDN-cached.

### 1. Tier-1 — `GET /api/v1/public/tracking/{awb}`  (open)

```jsonc
// 200
{ "ok": true, "data": {
  "awb": "S-DXB-00001",
  "status": "in_transit",
  "statusCategory": "in_transit",        // one of: collected | in_transit | out_for_delivery | delivered | hold
  "origin": "Dubai",                     // city best-effort; may be ""
  "destination": "Mumbai, India",
  "service": "air",
  "carrier": "",                         // per-tenant, populated in a follow-up
  "etaLine": "Estimated 24–26 Jul",      // pre-formatted, or "Delivered"
  "progressStep": 1,                     // 0=collected 1=in_transit/hold 2=out_for_delivery 3=delivered
  "events": [                            // NO location field in Tier-1
    { "title": "in_transit", "time": "2026-07-22T10:00:00.000Z", "state": "done", "note": null }
  ],
  "contactHint": "email"                 // "email" => offer the unlock; "none" => register-only
}}
// 404 { "ok": false, "error": "No shipment found for this AWB." }
// 400 { "ok": false, "error": "Invalid AWB format." }
```

### 2. OTP request — `POST /api/v1/public/tracking/otp/request`

```jsonc
// body
{ "awb": "S-DXB-00001", "email": "user@example.com" }
// 200 — ALWAYS this shape, even if the AWB doesn't exist (anti-enumeration; a code
// is only actually emailed when the shipment + an on-file phone exist)
{ "ok": true, "sentTo": "u•••r@e•••e.com", "expiresInSec": 600, "resendInSec": 60 }
// 429 { "ok": false, "error": "Too many requests. Please slow down and try again shortly." }  (+ Retry-After header)
```

### 3. OTP verify — `POST /api/v1/public/tracking/otp/verify`

```jsonc
// body — code is 6 digits; phone is what the visitor enters; termsVersion is the exact string below
{ "awb": "S-DXB-00001", "email": "user@example.com", "code": "123456",
  "phone": "0501234567", "termsVersion": "tracking-consent-2026-07" }
// 200
{ "ok": true, "trackingToken": "<opaque-bearer-token>", "expiresInSec": 1800 }
// 400 — ONE opaque error for any miss (bad code OR wrong phone OR expired). Do not
// try to distinguish; that's deliberate.
{ "ok": false, "error": "That code or phone number isn't right. Check both and try again." }
// 400 (stale page) { "ok": false, "error": "This page is out of date. Please reload and try again." }
```

### 4. Tier-2 details — `GET /api/v1/public/tracking/{awb}/details`  (Bearer)

Send `Authorization: Bearer <trackingToken>` from step 3.

```jsonc
// 200 — unlocked
{ "ok": true, "data": {
  "locked": false,
  "sender":   { "name": "Acme Trading", "city": "Dubai" },
  "receiver": { "name": "R. Sharma", "address": "Mumbai" },
  "pieces": 3, "weight": "12.5", "service": "air",
  "events": [ { "title": "arrived", "location": "Mumbai Hub", "time": "2026-07-22T10:00:00.000Z", "note": null } ]
}}
// 200 — details locked (~90 days after delivery)
{ "ok": true, "data": { "locked": true } }
// 401 (missing/expired/mismatched token) { "ok": false, "error": "This unlock has expired. Verify again to view details." }
```

### 5. Register — `POST /api/v1/public/tracking/register`

```jsonc
// body — phone optional; email-only is a valid consented contact
{ "email": "user@example.com", "phone": "0501234567", "termsVersion": "tracking-consent-2026-07" }
// 200 { "ok": true }
```

---

## Two things you need to send us / hardcode

1. **`termsVersion` = `"tracking-consent-2026-07"`** — send this exact string on `otp/verify` and `register`. It records which consent copy the visitor agreed to (provable consent / PDPL). If you change the on-page consent wording, tell us and we publish a new version string.
2. Your consent line renders under the email field, unchanged from §D: *"By continuing you create your Voxarel contact and agree to Voxarel's Terms. We'll send updates about your shipments and occasional Voxarel product news — unsubscribe anytime."*

## What you own on the page

- The `/track` UI: AWB entry, the Tier-1 timeline, the unlock modal (email → code → phone), the Tier-2 detail view, and the register form.
- The empty/`404`, `locked`, `401`-re-verify, and `429`-slow-down states (all shapes above).
- Use `contactHint` to decide whether to show "Unlock full details" vs a plain "Keep me updated" register prompt.

## Pending (not blockers for building)

- **Production**: these go live on `app.voxarel.com` at the next `staging → main` promote (the migration runs on prod then). Build + test against **staging** now.
- **Encoded AWBs**: we'll move ST Courier to non-enumerable 7-char AWBs going forward; the API already accepts both formats, so no change on your side.
- Optional `tracking@voxarel.com` sender + CAPTCHA on `otp/request` are later hardening, not P1 blockers.

Ping us with the staging origin you'll call from if it's anything other than `voxarel.com` / `www` so we add it to CORS.
