import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CtaBand } from "@/components/CtaBand";
import { AboutSections } from "@/components/about/AboutSections";
import { pageMeta } from "@/lib/metadata";

export const metadata: Metadata = pageMeta({
  path: "/about",
  title: { absolute: "About Voxarel | The operating system for logistics" },
  description: "Why Voxarel exists: one connected system for cargo and courier companies, proven in production at ST Courier across the Gulf and India. Built in Dubai.",
  ogDescription: "One connected system for cargo and courier companies, proven in production at ST Courier across the Gulf and India. Built by Azraq Ventures, Dubai.",
});

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
