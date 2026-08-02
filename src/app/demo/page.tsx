import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { DemoExperience } from "@/components/demo/DemoExperience";

export const metadata: Metadata = {
  alternates: { canonical: "/demo" },
  title: "Book a demo — Voxarel",
  description:
    "Thirty minutes, on your own workflow. See your logistics operation — shipping, warehouse, finance, field — running as one system.",
};

export default function DemoPage() {
  return (
    <>
      <Navigation />
      <main>
        <DemoExperience />
      </main>
      <Footer />
    </>
  );
}
