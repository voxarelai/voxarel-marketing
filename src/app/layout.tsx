import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const SITE_URL = "https://voxarel.com";
const GA4_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;

export const metadata: Metadata = {
  title: "Voxarel - Eliminate Delays. Maximize Every Container.",
  description:
    "AI-powered logistics platform for UAE freight forwarding. Predictive container optimization, real-time tracking, and 95%+ utilization rates.",
  keywords: [
    "logistics",
    "freight forwarding",
    "UAE",
    "container optimization",
    "shipment tracking",
    "cargo",
    "GCC",
    "supply chain",
    "warehouse management",
  ],
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Voxarel - Eliminate Delays. Maximize Every Container.",
    description:
      "AI-powered logistics platform for UAE freight forwarding. 95%+ container utilization, 75% faster processing.",
    url: SITE_URL,
    siteName: "Voxarel",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Voxarel - Eliminate Delays. Maximize Every Container.",
    description:
      "AI-powered logistics platform for UAE freight forwarding. 95%+ container utilization.",
  },
};

// JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Voxarel",
  url: SITE_URL,
  description:
    "AI-powered logistics platform for UAE freight forwarding operations.",
  areaServed: {
    "@type": "GeoShape",
    name: "Gulf Cooperation Council (GCC)",
  },
  knowsAbout: [
    "Freight Forwarding",
    "Container Optimization",
    "Logistics Management",
    "Supply Chain",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-[#09090b] text-white`}
      >
        {children}

        {/* GA4 */}
        {GA4_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA4_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
