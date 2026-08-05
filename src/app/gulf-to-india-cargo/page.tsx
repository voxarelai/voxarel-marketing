import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { LandingSections, faqPageSchema, type LandingData } from "@/components/landing/LandingSections";

export const metadata: Metadata = {
  alternates: { canonical: "/gulf-to-india-cargo" },
  title: "Gulf to India cargo software | Voxarel",
  description:
    "Software built for cargo moving Gulf to India: corridor rates, consolidation, cash on delivery and tracking, in one connected system. Proven in production on the lane.",
  openGraph: {
    title: "Gulf to India cargo software | Voxarel",
    description:
      "One connected system for the Gulf to India lane: corridor rates, consolidation, cash on delivery and tracking. Proven in production.",
    type: "website",
    url: "/gulf-to-india-cargo",
    siteName: "Voxarel",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Voxarel Gulf to India cargo software" }],
  },
};

const data: LandingData = {
  eyebrow: "Gulf to India cargo software",
  h1: "Software built for cargo moving Gulf to India.",
  sub: "One connected system for the busiest lane in the region: corridor rates, consolidation, cash on delivery and tracking, from the Gulf to India.",
  builtForHeading: "Made for the Gulf to India corridor",
  builtFor: [
    "The Gulf to India lane has its own rhythm: heavy consolidation, personal and commercial cargo side by side, cash on delivery, and customers who track obsessively. Generic logistics software does not know this lane. Voxarel was built on it.",
    "ST Courier, an international courier network, runs its entire business on Voxarel across more than 5 branches, moving freight between the Gulf and India every day. The corridor rates, the consolidation and the settlement are shaped by how this lane actually works.",
  ],
  capabilitiesHeading: "What the corridor needs",
  capabilities: [
    { title: "Corridor rates", desc: "Gulf to India lanes for personal and commercial cargo, priced the way you price." },
    { title: "Consolidation", desc: "Many shippers into one movement, costed on chargeable weight." },
    { title: "Cash on delivery", desc: "Collection to settlement per driver and branch, reconciled automatically." },
    { title: "Tracking", desc: "Public tracking by number, with one-time-code verification for private details." },
    { title: "Warehouse and containers", desc: "Scan, manifest and load, built for consolidation on the lane." },
    { title: "Pulse AI", desc: "Ask about shipments on the corridor in plain language, on web or WhatsApp." },
  ],
  faqs: [
    {
      q: "Does Voxarel handle Gulf to India cargo?",
      a: "Yes. Voxarel runs a real Gulf to India operation today: ST Courier uses it across more than 5 branches, moving freight between the Gulf and India.",
    },
    {
      q: "Does it support consolidation on the corridor?",
      a: "Yes. Voxarel combines many shippers into one movement and prices each on chargeable weight, which is how consolidation on this lane works.",
    },
    {
      q: "Can customers track shipments to India?",
      a: "Yes. Every shipment has public tracking by number and a live status timeline, with one-time-code verification for private details.",
    },
    {
      q: "Does it handle cash on delivery?",
      a: "Yes. Cash on delivery is tracked per driver and branch from collection to settlement and reconciled against deposits.",
    },
  ],
};

export default function GulfToIndiaPage() {
  return (
    <>
      <Navigation />
      <main>
        <LandingSections data={data} />
      </main>
      <CtaBand />
      <Footer />
      <JsonLd data={faqPageSchema(data.faqs)} />
    </>
  );
}
