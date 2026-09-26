import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { DemoExperience } from "@/components/demo/DemoExperience";
import { DemoInfo } from "@/components/demo/DemoInfo";
import { pageMeta } from "@/lib/metadata";

export const metadata: Metadata = pageMeta({
  path: "/demo",
  title: "Book a demo",
  description: "Thirty minutes, on your own workflow. See your logistics operation (shipping, warehouse, finance, field) running as one system.",
  ogDescription: "Thirty minutes, on your own workflow. See your cargo and courier operation running as one system.",
  ogImageAlt: "Voxarel: book a demo",
});

export default function DemoPage() {
  return (
    <>
      <Navigation />
      <main>
        <DemoExperience />
        <DemoInfo />
      </main>
      <Footer />
    </>
  );
}
