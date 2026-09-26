import type { Metadata } from "next";

export const OG_IMAGE = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "Voxarel: the operating system for logistics",
};

type PageMeta = {
  /** Path-only URL such as "/demo". Becomes canonical and og:url via metadataBase. */
  path: string;
  /** Bare title; the root template appends " | Voxarel". Pass { absolute } to opt out. */
  title: string | { absolute: string };
  description: string;
  ogDescription?: string;
  ogType?: "website" | "article";
  ogImageAlt?: string;
  noindex?: boolean;
};

/**
 * One convention for every page: title as a bare string (the root template adds
 * the brand), openGraph WITHOUT a title so og:title inherits the resolved page
 * title, and never a twitter block (Next fills it from openGraph). See layout.tsx.
 */
export function pageMeta(o: PageMeta): Metadata {
  return {
    title: o.title,
    description: o.description,
    alternates: { canonical: o.path },
    openGraph: {
      description: o.ogDescription ?? o.description,
      type: o.ogType ?? "website",
      url: o.path,
      siteName: "Voxarel",
      images: [o.ogImageAlt ? { ...OG_IMAGE, alt: o.ogImageAlt } : OG_IMAGE],
    },
    ...(o.noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
