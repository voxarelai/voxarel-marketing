import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "@/components/auth/AuthModals";
import { PageView } from "@/components/analytics/PageView";

const poppins = localFont({
  src: [
    { path: "../fonts/poppins-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../fonts/poppins-latin-700-normal.woff2", weight: "700", style: "normal" },
    { path: "../fonts/poppins-latin-800-normal.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-poppins",
  display: "swap",
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
  metadataBase: new URL("https://voxarel.com"),
  title: "Voxarel — Connect every person, package and payment",
  description:
    "Real-time visibility and control across shipping, warehouse, finance, inventory and field operations. One platform, every role, nothing lost.",
  openGraph: {
    title: "Voxarel — Connect every person, package and payment",
    description:
      "Real-time visibility and control across shipping, warehouse, finance, inventory and field operations. One platform, every role, nothing lost.",
    type: "website",
    url: "https://voxarel.com",
    siteName: "Voxarel",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Voxarel" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Voxarel — Connect every person, package and payment",
    description:
      "Real-time visibility and control across shipping, warehouse, finance, inventory and field operations.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${lato.variable}`}>
      <body className="antialiased">
        <PageView />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
