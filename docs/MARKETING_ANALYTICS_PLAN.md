# Marketing analytics plan (living event registry)

The single record of every marketing event the site sends. Add an event to the
`VoxarelEvent` union in `src/lib/analytics.ts` first, add its row here second,
then wire it in code. Source: ticket VXL-MKT-002. Provider: PostHog, EU cloud
(`eu.i.posthog.com`), production only.

Naming: lower snake case, `object_action`, present tense, no gerunds.

## Stage 1. Land

| Event | Fired from | Properties | Added |
|---|---|---|---|
| `page_view` | `PageView.tsx`, every route change | `path`, `referrer`, utm fields | 2026-08-02 |
| `cta_demo_click` | `Hero`, `CtaBand`, `Footer` | `placement` | 2026-08-02 |
| `cta_tour_click` | `Hero`, `Modules`, `Navigation` (wired in VXL-MKT-014) | `placement` | 2026-08-02 |
| `cta_track_click` | `Navigation`, `Hero`, `Footer` | `placement` | 2026-08-02 |
| `cta_signin_click` | `Navigation`, `Footer` | `placement` | 2026-08-02 |
| `contact_email_click` | `CtaBand`, `Footer`, `DemoExperience` | `placement` | 2026-08-02 |
| `track_search_submit` | `TrackSection`, `/track` | `source`: `home` \| `track_page` | 2026-08-02 |

## Stage 2. See it without asking (wired in VXL-MKT-014)

| Event | Fired from | Properties | Added |
|---|---|---|---|
| `tour_start` | `/tour` | `tour_id`, `entry` | 2026-08-02 (declared) |
| `tour_step_view` | `/tour` | `tour_id`, `step_index`, `step_id` | 2026-08-02 (declared) |
| `tour_complete` | `/tour` final step | `tour_id`, `duration_ms`, `steps_viewed` | 2026-08-02 (declared) |
| `tour_abandon` | `/tour` route change / `visibilitychange` | `tour_id`, `last_step_index`, `duration_ms` | 2026-08-02 (declared) |

## Stage 3. Book instantly

| Event | Fired from | Properties | Added |
|---|---|---|---|
| `demo_form_start` | `DemoExperience`, first field change | `placement` | 2026-08-02 |
| `demo_form_error` | `DemoExperience`, `validate()` | `field`, `reason` | 2026-08-02 |
| `demo_form_submit` | `DemoExperience`, on submit | `branches`, `has_phone`, `has_message` | 2026-08-02 |
| `lead_captured` | `api/lead/route.ts` (VXL-MKT-003), server | `lead_id`, `source`, `branches`, utm fields | 2026-08-02 (declared) |
| `lead_capture_failed` | `api/lead/route.ts` (VXL-MKT-003), server | `lead_id`, `stage`, `error_code` | 2026-08-02 (declared) |
| `lead_fallback_mailto` | `DemoExperience` (VXL-MKT-003) | `reason` | 2026-08-02 (declared) |
| `booking_calendar_view` | Cal embed mount (VXL-MKT-011) | `lead_id` | 2026-08-02 (declared) |
| `booking_confirmed` | `api/cal/webhook` (VXL-MKT-011), server | `lead_id`, `slot_at`, `booked_within_sec` | 2026-08-02 (declared) |
| `booking_rescheduled` | `api/cal/webhook` (VXL-MKT-011) | `lead_id`, `old_slot_at`, `new_slot_at` | 2026-08-02 (declared) |
| `booking_cancelled` | `api/cal/webhook` (VXL-MKT-011) | `lead_id`, `cancelled_by` | 2026-08-02 (declared) |

## Stages 4, 5, 6. Demo, pilot, paid (server-side, VXL-MKT-005)

| Event | Fired from | Properties | Added |
|---|---|---|---|
| `demo_delivered` | Vercel cron polls HubSpot | `lead_id` | 2026-08-02 (declared) |
| `demo_no_show` | same | `lead_id` | 2026-08-02 (declared) |
| `pilot_started` | same | `lead_id`, `corridor`, `branch_count` | 2026-08-02 (declared) |
| `deal_won` | same | `lead_id`, `mrr_usd` | 2026-08-02 (declared) |
| `deal_lost` | same | `lead_id`, `lost_reason` | 2026-08-02 (declared) |

## Open item filed

**PDPL / GDPR consent banner** (VXL-MKT-002 section 15): legal must answer whether
UAE Federal Decree-Law 45/2021 requires prior consent for first-party analytics
cookies, and whether EU visitor volume brings GDPR/ePrivacy into scope. Owner:
the founder with counsel. Due: before the first paid traffic. If either answer is
yes, PostHog init moves behind `opt_out_capturing_by_default: true` and a banner
becomes a follow-on ticket. Until then the defensible posture is: identified-only
person profiles, all text and attributes masked, no session replay, every
processor named on `/privacy`.

## Not yet instrumented (follow-up)

The register / sign-up modal and the `/track` shipment unlock flow (added by the
tracking work, outside VXL-MKT-002 scope) do not yet emit marketing events. Decide
event names and wire in a follow-up.
