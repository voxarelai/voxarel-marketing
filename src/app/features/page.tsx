import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { FeaturesSections, featuresFaqs } from "@/components/features/FeaturesSections";

export const metadata: Metadata = {
  alternates: { canonical: "/features" },
  title: "Voxarel features | One connected logistics platform",
  description:
    "Everything Voxarel does: shipping and bookings, warehouse, finance, tracking, complaints, approvals, analytics and Pulse AI, in one connected system for cargo and courier companies.",
  openGraph: {
    title: "Voxarel features | One connected logistics platform",
    description:
      "Everything Voxarel does: shipping, warehouse, finance, tracking, complaints, analytics and Pulse AI, in one connected system.",
    type: "website",
    url: "/features",
    siteName: "Voxarel",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Voxarel: one connected logistics platform",
      },
    ],
  },
};

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
