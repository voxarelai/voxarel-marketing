import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { FeaturesSections, featuresFaqs } from "@/components/features/FeaturesSections";
import { pageMeta } from "@/lib/metadata";

export const metadata: Metadata = pageMeta({
  path: "/features",
  title: { absolute: "Voxarel features | One connected logistics platform" },
  description: "Everything Voxarel does: bookings, warehouse, finance, tracking, complaints, approvals, analytics and Pulse AI, in one system for cargo and courier companies.",
  ogDescription: "Everything Voxarel does: shipping, warehouse, finance, tracking, complaints, analytics and Pulse AI, in one connected system.",
  ogImageAlt: "Voxarel: one connected logistics platform",
});

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: featuresFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FeaturesPage() {
  return (
    <>
      <Navigation />
      <main>
        <FeaturesSections />
      </main>
      <CtaBand />
      <Footer />
      <JsonLd data={faqSchema} />
    </>
  );
}
