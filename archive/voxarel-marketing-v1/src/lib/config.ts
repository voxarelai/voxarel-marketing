/**
 * Centralized Voxarel app URLs for the marketing site.
 *
 * The product is a single-forwarder embeddable quote calculator (NOT a
 * marketplace). The live app + API are served from `app.voxarel.com`. The host
 * and the demo org slug are env-overridable so the final hostname is a one-line
 * change — and so the marketing calculator never points at a real customer org.
 */

const stripTrailingSlash = (url: string) => url.replace(/\/+$/, "");

/** Base host for the app + calculator/quote/lead/embed API. */
export const APP_URL = stripTrailingSlash(
  process.env.NEXT_PUBLIC_APP_URL ?? "https://app.voxarel.com",
);

/**
 * Forwarder slug the marketing-site calculator demo points at.
 * NOTE: must be a dedicated demo org provisioned by the team — never a real
 * customer slug. Falls back to a labelled sample quote if unreachable.
 */
export const DEMO_ORG_SLUG = process.env.NEXT_PUBLIC_DEMO_ORG_SLUG ?? "demo";

/** Self-serve forwarder onboarding (the app is otherwise invite-only). */
export const SIGNUP_URL =
  process.env.NEXT_PUBLIC_SIGNUP_URL ?? `${APP_URL}/calculator/signup`;
export const SIGNIN_URL = `${APP_URL}/sign-in`;
export const PORTAL_URL = `${APP_URL}/portal`;

/** Embed loader script served by the app. */
export const EMBED_SCRIPT_URL = `${APP_URL}/calculator/embed.js`;

/** The sandboxed iframe URL the embed loader injects. */
export const embedIframeUrl = (slug: string) =>
  `${APP_URL}/embed/calculator/${slug}`;

/** The real <script> snippet a forwarder pastes on their site. */
export const embedScriptSnippet = (slug: string) =>
  `<div id="voxarel-calculator"></div>\n<script src="${EMBED_SCRIPT_URL}" data-org="${slug}"></script>`;

/** Alternative direct-iframe snippet. */
export const embedIframeSnippet = (slug: string) =>
  `<iframe\n  src="${embedIframeUrl(slug)}"\n  title="Voxarel instant quote"\n  width="100%"\n  height="640"\n  style="border:0;border-radius:12px"\n  loading="lazy"\n></iframe>`;
