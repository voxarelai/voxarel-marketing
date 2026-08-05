import type { Metadata } from "next";
import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { AuthProvider } from "@/components/auth/AuthModals";
import { PageView } from "@/components/analytics/PageView";
import { JsonLd } from "@/components/JsonLd";
import { organizationSchema, softwareApplicationSchema, websiteSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";

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
  title: "Voxarel | The operating system for logistics",
  description:
    "Voxarel is the platform modern logistics companies run on. Bookings, warehouse, finance and field operations, unified into one real-time system of record.",
  openGraph: {
    title: "Voxarel. The operating system for logistics",
    description:
      "Voxarel is the platform modern logistics companies run on. Bookings, warehouse, finance and field operations, unified into one real-time system of record.",
    type: "website",
    url: SITE_URL,
    siteName: "Voxarel",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Voxarel: logistics operations software for cargo and courier companies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Voxarel. The operating system for logistics",
    description:
      "The platform modern logistics companies run on. Bookings, warehouse, finance and field operations in one real-time system of record.",
    images: [
      {
        url: "/og.png",
        alt: "Voxarel: logistics operations software for cargo and courier companies",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} ${lato.variable}`}>
      <body className="antialiased">
        <JsonLd data={[organizationSchema, websiteSchema, softwareApplicationSchema]} />
        <PageView />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
