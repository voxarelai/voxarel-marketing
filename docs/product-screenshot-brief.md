# Product screenshot brief (hand-off 009)

Nine screenshots that unblock the commercial pages (012), company pages (013)
and the product tour (014). Filenames match what those tickets already import.

## Hard rules (spine §4, governance rule 3)
- **Seeded demo tenant with invented data only.** Never ST Courier's live
  system, never their branded subdomain, with or without consent.
- No real customer names, real AWBs, real money figures, or the wireframe
  placeholder numbers on the do-not-use list (AED 1,245,000 revenue, 47
  shipments today, 82% utilisation, etc. — spine §4 / messaging §6.6).
- Invent a demo org, e.g. "Meridian Cargo" or "Gulf Line Logistics", with
  plausible-but-fake data. Its own demo subdomain is fine to show.
- Light theme, brand chrome, no dev banners, no console errors, clean viewport.

## The nine shots

| File | Screen | What must be visible | Frame |
|---|---|---|---|
| `01-executive-dashboard.png` | Owner/exec dashboard | Branch comparison, today's COD position, one clear KPI row | Desktop, 1440px |
| `02b-shipment-tracking-mobile.png` | Public tracking page | Status pill, timeline (no locations), one demo AWB | Mobile, 390px |
| `03-warehouse-barcode-scanning.png` | Warehouse scan flow | The 4-stage flow (receive, bin, queue, load) and a chargeable-weight readout | Desktop or tablet |
| `04-container-load-planning-3d.png` | 3D container load plan | The 3D load view + a stuffing list panel | Desktop, 1440px |
| `05-invoice-and-finance.png` | Invoice detail | Line items, VAT line, totals (fake amounts), a void/reason affordance | Desktop |
| `06-notification-feed.png` | Notification feed | One of each alert trigger visible (status change, approval, threshold) | Desktop or mobile |
| `08a-quote.png` | Quote screen | A quote with a rate and a price the tour references later | Desktop |
| `08c-booking.png` | Booking screen | The quote converted to a booking, same corridor | Desktop |
| `09-cod-settlement.png` | Driver COD settlement | A settlement batch: total collected, card fee deducted, net per driver | Desktop |

(Optional composite `08-quote-to-booking-composite.png` = 08a + 08c side by side,
used on the courier commercial page.)

## Capture method (once a demo tenant is reachable)
Log into the demo tenant, navigate each screen above, capture at the stated
width with brand chrome, crop tight, export PNG (WebP acceptable), drop into
`public/` (marketing repo) or `Voxarel_Brand/06-Product-Shots/2026-08/`. The
pages/tour then reference them by the filenames above with no code change.

## What is needed to start
Either a **demo-tenant URL + a login** (invented-data org), or a booted local
app instance with a **demo org seeded** (not the ST Courier QA fork). Without a
demo tenant, seeding one is the actual blocker and belongs to the product side.
