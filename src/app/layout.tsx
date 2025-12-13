import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

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
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-[#09090b] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
