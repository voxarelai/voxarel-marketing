/** The canonical origin. Use www; the bare apex host redirects to this. */
export const SITE_URL = "https://www.voxarel.com";

export const LINKEDIN_URL = "https://www.linkedin.com/company/voxarel";
export const INSTAGRAM_URL = "https://www.instagram.com/voxarel";

/** WhatsApp business line: digits only for wa.me, E.164 for schema, spaced for display. */
export const WHATSAPP_NUMBER = "971585041204";
export const WHATSAPP_E164 = `+${WHATSAPP_NUMBER}`;
export const WHATSAPP_DISPLAY = "+971 58 504 1204";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

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
