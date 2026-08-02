# Voxarel Public Tracking — Feature Plan

**Status:** P0 (design) shipped on the website at `/track` with mock data · 2026-07-16
**Owner:** Zahid · Prepared by Nudge
**Decisions locked:** design-first with mock data · two-tier access with OTP · Voxarel-branded only (carrier shown as text) · V2 = universal tracker via aggregator

---

## 1. What we're building

Customers of Voxarel's clients (ST Courier today) track their shipments directly on
voxarel.com — instantly for basic status, and with a one-time code when they want the
private details. In V2 the same page also tracks any courier in the world through a
tracking aggregator, making voxarel.com a tool anyone can use — and a steady source of
courier-owner leads.

## 2. The two tiers

**Tier 1 — anyone with the tracking number.**
Status, route (origin/destination cities in the header only), service type, ETA, and the
journey timeline as **steps + times — checkpoint locations are hidden** until verified.
No names, no addresses, no locations, no documents, no amounts. Someone who finds a
tracking number learns only that a parcel is moving and how far along it is — not where
it is or whose it is.

**Tier 2 — verified sender or receiver.**
Everything: sender/receiver names, delivery address, exact pieces and weights, invoice
and receipt documents, proof of delivery. Unlocked by proving you own a contact that is
**on the booking** — via a 6-digit one-time code.

## 3. Verification — and the "no email on file" case

The unlock ladder, in order:

1. **Email on the booking** → code by email. (Primary path.)
2. **No email, but phone on the booking** → code by WhatsApp/SMS to the masked number.
   Most Gulf→India bookings have a phone even when they lack an email, so this catches
   the majority of the gap.
3. **No email AND no phone** → the **claim flow**:
   - The visitor says who they are (sender or receiver), gives name + email + the phone
     used at booking (to help matching).
   - The claim lands in the carrier's console — same Approvals inbox pattern as
     overrides and upgrades. One tap to approve if it matches the booking; approving
     attaches the email to the shipment.
   - The claimant gets an email on approval and can then unlock normally with a code.

**Why not "just register"?** Registering an account only proves you own an email — not
that you own the shipment. If registration alone unlocked details, anyone could register
and read any parcel's addresses. So: registration is welcome (it saves shipments,
enables notifications), but **binding an email to a shipment always goes through either
a contact already on the booking or the carrier's approval.** That's the rule that keeps
the whole system safe.

## 4. Page states (all built in the P0 design)

| State | What the visitor sees |
| --- | --- |
| Search | AWB input, demo chips (removed at wiring) |
| Found — Tier 1 | Header card (AWB, status pill, route cities, ETA, progress bar) + Journey timeline (steps + times only; "Locations unlock with verification" hint) |
| Locked details | Private rows masked, "Unlock full details" |
| OTP — send | Masked contact (email or WhatsApp), "Send code", 10-minute expiry note |
| OTP — code | 6-digit input, error state, resend with 45s cooldown |
| Unlocked | Verified banner, sender/receiver, address, pieces/weights, documents, POD |
| Claim | Sender/receiver toggle, name + email + booking phone, safety explanation |
| Claim sent | Confirmation + what happens next |
| Not found | Friendly guidance, no information leaked |

## 5. Security & abuse rules (V1 requirements)

- **Lookups:** rate-limit ~10/min per IP; identical response timing/shape for found vs
  not-found beyond the visible result (no data in errors); AWBs are not enumerable
  (random-ish sequence within branch prefix already helps; add per-IP daily caps).
- **OTP:** 6 digits; expires in 10 minutes; max 5 wrong attempts then a 15-minute lock
  on that AWB; resend cooldown 60s; max 5 sends per AWB per day; codes hashed at rest.
- **Unlock session:** on verify, issue a signed short-lived token (30 min) scoped to
  that one AWB, httpOnly cookie; no account created, nothing stored on the device
  beyond the cookie.
- **Claims:** rate-limited (3 open claims per email); carrier sees claim + booking side
  by side; approval is audited (who, when) in the existing immutable audit log.
- **Never expose** amounts/charges on the public page even after unlock — documents
  (invoice PDF) carry them behind their own signed links.
- **Log everything:** lookups, OTP sends/verifies, unlocks, claims → auditable trail
  per shipment.

## 6. What the main app (console) must expose — V1 wiring spec

Small public API, all rate-limited, no auth for Tier 1:

```
GET  /api/v1/public/tracking/{awb}
     → { awb, status, statusCategory, origin, destination, service,
         etaLine, progressStep, events[ {title, time, state} ],   // NO locations here
         contactHint: "email" | "phone" | "none" }   // kind only, never the value

POST /api/v1/public/tracking/{awb}/otp/request      { channel?: "email" | "phone" }
     → { sentTo: "r•••••a@g•••••.com", expiresInSec, resendInSec }

POST /api/v1/public/tracking/{awb}/otp/verify       { code }
     → sets httpOnly session cookie scoped to {awb} · 30 min

GET  /api/v1/public/tracking/{awb}/details          (requires cookie)
     → { sender, receiver, address, pieces, weight, documents[], pod?,
         events[ {title, location, time, state} ] }   // locations live here

POST /api/v1/public/tracking/{awb}/claim            { role, name, email, phone }
     → { ok: true }   // always ok-shaped; carrier reviews in console
```

Console additions: a **Tracking claims** queue inside the existing Approvals inbox
(approve = attach email to shipment + notify claimant). Email OTP goes out through the
existing transactional email path; WhatsApp OTP reuses the Pulse WhatsApp channel
infrastructure.

Website change at wiring time: swap `src/components/track/mock.ts` for an API client;
delete the demo chips and demo-code hint. The UI doesn't change.

## 7. V2 — universal tracker ("track anything")

- **What:** if the number entered isn't a Voxarel AWB format, query a tracking
  aggregator (17TRACK / AfterShip Tracking API / TrackingMore class — pick on pricing
  and India+GCC carrier coverage at build time) and render the same timeline UI with a
  "Tracked via partner network" note.
- **Why:** voxarel.com becomes a tool people use weekly without being customers — the
  SEO/lead-gen play. Courier owners searching "track Aramex shipment" land on the
  platform that could run their whole operation.
- **Rules:** OTP/details tier applies only to Voxarel shipments — aggregator results
  are Tier 1 only, exactly as the source courier exposes them. Cache results ~10 min to
  control API cost; cap free lookups per IP per day.
- **Later (V2.1):** per-carrier SEO pages (`/track/aramex`, `/track/india-post`, …)
  generated from the aggregator's carrier list, each with the same tracker embedded.

## 8. Rollout

| Phase | Scope | Done when |
| --- | --- | --- |
| **P0 — Design** ✅ | This page, all states, mock data | Zahid approves the design |
| **P1 — Wire Voxarel tracking** | Public API in console + email OTP + details + swap mock for API | ST Courier customer tracks a real parcel end-to-end on voxarel.com |
| **P2 — Fallbacks** | WhatsApp/SMS OTP + claim queue in console approvals | A no-email booking gets claimed, approved, unlocked |
| **P3 — Universal tracker** | Aggregator integration + non-Voxarel formats + caching/caps | Any DHL/Aramex number tracks on voxarel.com |
| **P3.1 — SEO pages** | Per-carrier landing pages | First organic courier-owner lead |

P1 and P2 are main-app work — when you're ready, I'll convert them into PCTSET briefs
(one for the public API + OTP, one for the claims queue) following the locked
conventions (raw SQL migrations, Money wrapper, tenant scoping).

## 9. Open decisions

1. OTP email sender identity — `tracking@voxarel.com`? (needs mailbox/DNS)
2. Unlock session length — 30 min proposed; longer feels convenient, leaks longer on shared devices.
3. Do delivered shipments lock harder over time (e.g. details unavailable 90 days after delivery)?
4. V2 aggregator budget ceiling per month once live (drives the free-lookup cap).
