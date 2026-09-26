import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { AuthProvider } from "@/components/auth/AuthModals";
import { PageView } from "@/components/analytics/PageView";
import { JsonLd } from "@/components/JsonLd";
import { organizationSchema, softwareApplicationSchema, websiteSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import { OG_IMAGE } from "@/lib/metadata";

// Geist Mono is used only for small labels (codes, counts, breadcrumbs), so it
// is loaded from the geist package without a preload hint: 72 KB off the
// critical path on every page. The CSS variable name matches what the geist
// package exported so globals.css is unchanged.
const geistMono = localFont({
  src: "../../node_modules/geist/dist/fonts/geist-mono/GeistMono-Variable.woff2",
  weight: "100 900",
  variable: "--font-geist-mono",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
  fallback: [
    "ui-monospace",
    "SFMono-Regular",
    "Roboto Mono",
    "Menlo",
    "Monaco",
    "Liberation Mono",
    "DejaVu Sans Mono",
    "Courier New",
    "monospace",
  ],
});

const lato = localFont({
  src: [
    { path: "../fonts/lato-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/lato-latin-400-italic.woff2", weight: "400", style: "italic" },
    { path: "../fonts/lato-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  // Pages set a bare title; the template appends the brand. Pages that need a
  // custom brand line use { absolute }. See src/lib/metadata.ts for the rest of
  // the convention (openGraph without title, never a twitter block).
  title: {
    default: "Voxarel | The operating system for logistics",
    template: "%s | Voxarel",
  },
  description:
    "Voxarel is the platform modern logistics companies run on. Bookings, warehouse, finance and field operations, unified into one real-time system of record.",
  openGraph: {
    description:
      "Voxarel is the platform modern logistics companies run on. Bookings, warehouse, finance and field operations, unified into one real-time system of record.",
    type: "website",
    url: SITE_URL,
    siteName: "Voxarel",
    images: [OG_IMAGE],
  },
  // Card type only. Next fills twitter title, description and image from each
  // page's openGraph, so per-page cards stay correct without repetition.
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${geistMono.variable} ${lato.variable}`}>
      <body className="antialiased">
        <JsonLd data={[organizationSchema, websiteSchema, softwareApplicationSchema]} />
        <PageView />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
