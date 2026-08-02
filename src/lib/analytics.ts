import posthog from "posthog-js";
import { readAttribution } from "@/lib/attribution";

/** Every event the site is allowed to send. Add here first, in code second. */
export type VoxarelEvent =
  // Stage 1. Land
  | "page_view"
  | "cta_demo_click"
  | "cta_tour_click"
  | "cta_track_click"
  | "cta_signin_click"
  | "contact_email_click"
  | "track_search_submit"
  // Stage 2. See it without asking
  | "tour_start"
  | "tour_step_view"
  | "tour_complete"
  | "tour_abandon"
  // Stage 3. Book instantly
  | "demo_form_start"
  | "demo_form_error"
  | "demo_form_submit"
  | "lead_captured"
  | "lead_capture_failed"
  | "lead_fallback_mailto"
  | "booking_calendar_view"
  | "booking_confirmed"
  | "booking_rescheduled"
  | "booking_cancelled"
  // Stages 4, 5 and 6. Demo, pilot, paid. Server-side only.
  | "demo_delivered"
  | "demo_no_show"
  | "pilot_started"
  | "deal_won"
  | "deal_lost";

export function track(
  event: VoxarelEvent,
  props: Record<string, unknown> = {}
): void {
  if (typeof window === "undefined") return;
  posthog.capture(event, { ...readAttribution(), ...props });
}

export function identifyLead(
  leadId: string,
  props: { email: string; company: string; branches?: string }
): void {
  if (typeof window === "undefined") return;
  posthog.identify(leadId, props);
}
