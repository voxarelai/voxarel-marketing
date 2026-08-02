import posthog from "posthog-js";

const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

// Production only. Preview deploys and localhost must never reach the project.
const enabled =
  Boolean(key) &&
  Boolean(host) &&
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production";

if (enabled) {
  posthog.init(key as string, {
    api_host: host,
    ui_host: "https://eu.posthog.com",

    // Privacy posture. See ticket VXL-MKT-002 section 8.
    person_profiles: "identified_only",
    mask_all_text: true,
    mask_all_element_attributes: true,
    disable_session_recording: true,

    // We fire page_view ourselves so App Router client navigations are counted.
    capture_pageview: false,
    capture_pageleave: true,
  });
}
