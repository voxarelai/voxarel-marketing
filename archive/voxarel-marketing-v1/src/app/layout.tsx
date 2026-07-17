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
  title: "Voxarel — One platform for your entire logistics operation",
  description:
    "Connect every person, package and payment in your logistics operation. Real-time visibility and control across shipping, warehouse, finance, inventory and field operations.",
  keywords: [
    "logistics",
    "freight forwarding",
    "UAE",
    "logistics platform",
    "shipment tracking",
    "cargo",
    "GCC",
    "supply chain",
    "warehouse management",
    "operations management",
    "real-time visibility",
  ],
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Voxarel — One platform for your entire logistics operation",
    description:
      "One platform connecting shipping, warehouse, finance, inventory and field ops in real time. Every role gets what they need, nothing gets lost.",
    url: SITE_URL,
    siteName: "Voxarel",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Voxarel — One platform for your entire logistics operation",
    description:
      "Connect every person, package and payment in your logistics operation. One platform, every role, nothing lost.",
  },
};

// JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Voxarel",
  url: SITE_URL,
  description:
    "One platform connecting every person, package, and payment in logistics operations.",
  areaServed: {
    "@type": "GeoShape",
    name: "Gulf Cooperation Council (GCC)",
  },
  knowsAbout: [
    "Freight Forwarding",
    "Operations Management",
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
