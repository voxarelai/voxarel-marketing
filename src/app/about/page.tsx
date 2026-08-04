import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CtaBand } from "@/components/CtaBand";
import { AboutSections } from "@/components/about/AboutSections";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "About Voxarel | The operating system for logistics",
  description:
    "Why Voxarel exists: one connected system for cargo and courier companies, proven in production at ST Courier across the Gulf and India. Built by Azraq Ventures, Dubai.",
  openGraph: {
    title: "About Voxarel | The operating system for logistics",
    description:
      "One connected system for cargo and courier companies, proven in production at ST Courier across the Gulf and India. Built by Azraq Ventures, Dubai.",
    type: "website",
    url: "/about",
    siteName: "Voxarel",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Voxarel: the operating system for logistics",
      },
    ],
  },
};

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main>
        <AboutSections />
      </main>
      <CtaBand />
      <Footer />
    </>
  );
}
