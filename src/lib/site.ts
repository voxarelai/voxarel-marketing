/** The canonical origin. Use www; the bare apex host 307s to this. */
export const SITE_URL = "https://www.voxarel.com";

/** Confirm the slug on the live LinkedIn page before merge. If the page does
 *  not exist, delete this and drop sameAs rather than emitting a 404 URL. */
export const LINKEDIN_URL = "https://www.linkedin.com/company/voxarel";

export const CONSOLE_URL = "https://console.voxarel.com";
export const SIGN_IN_URL = CONSOLE_URL;

/** The site's own tracking page (see src/app/track + docs/SHIPMENT_TRACKING_PLAN.md). */
export const TRACK_URL = "/track";

/** The site's own demo-request page. */
export const DEMO_URL = "/demo";

export const CONTACT_EMAIL = "partners@voxarel.com";
export const DEMO_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
  "Voxarel demo request"
)}`;

export const LEGAL_LINE = "Operated by Azraq Ventures LLC, Dubai";
