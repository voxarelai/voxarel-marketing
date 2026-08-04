import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { articles } from "@/content/resources";

// lastModified is set per page and bumped in the same change that edits a page's
// content. It is not auto-stamped with `new Date()` at build time, which would
// reset every URL on every deploy and teach Googlebot to ignore the signal.
// `priority` and `changeFrequency` are omitted: Google confirmed it ignores both.
// `/register` is intentionally excluded: it is a noindex sign-up gate.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, lastModified: new Date("2026-08-04") },
    { url: `${SITE_URL}/features`, lastModified: new Date("2026-08-04") },
    { url: `${SITE_URL}/about`, lastModified: new Date("2026-08-04") },
    { url: `${SITE_URL}/resources`, lastModified: new Date("2026-08-04") },
    ...articles.map((a) => ({
      url: `${SITE_URL}/resources/${a.slug}`,
      lastModified: new Date(a.date),
    })),
    { url: `${SITE_URL}/track`, lastModified: new Date("2026-08-04") },
    { url: `${SITE_URL}/demo`, lastModified: new Date("2026-08-04") },
    { url: `${SITE_URL}/cargo-management-software`, lastModified: new Date("2026-08-04") },
    { url: `${SITE_URL}/courier-management-software`, lastModified: new Date("2026-08-04") },
    { url: `${SITE_URL}/logistics-software-uae`, lastModified: new Date("2026-08-04") },
    { url: `${SITE_URL}/privacy`, lastModified: new Date("2026-07-16") },
    { url: `${SITE_URL}/terms`, lastModified: new Date("2026-07-16") },
  ];
}
