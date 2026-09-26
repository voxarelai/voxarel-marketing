import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { TrackExperience } from "@/components/track/TrackExperience";
import { TrackInfo, trackFaqs } from "@/components/track/TrackInfo";
import { JsonLd } from "@/components/JsonLd";
import { pageMeta } from "@/lib/metadata";

export const metadata: Metadata = pageMeta({
  path: "/track",
  title: "Track a shipment",
  description: "Live tracking for shipments moving on Voxarel. Check status instantly. Verify with a one-time code to see full details.",
  ogDescription: "Live tracking for shipments moving on Voxarel. Check status instantly, verify to see full details.",
  ogImageAlt: "Voxarel: track a shipment",
});

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: trackFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function TrackPage() {
  return (
    <>
      <Navigation />
      <main>
        <TrackExperience />
        <TrackInfo />
      </main>
      <Footer />
      <JsonLd data={faqSchema} />
    </>
  );
}
