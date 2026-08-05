import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { LandingSections, faqPageSchema, type LandingData } from "@/components/landing/LandingSections";

export const metadata: Metadata = {
  alternates: { canonical: "/freight-forwarding-software" },
  title: "Freight forwarding software | Voxarel",
  description:
    "Freight forwarding software that runs the whole file: quotes, bookings, documents, warehouse, finance and tracking on one connected platform. Proven in production.",
  openGraph: {
    title: "Freight forwarding software | Voxarel",
    description:
      "One connected system for forwarders: quotes, documents, warehouse, finance and tracking, with real margin per shipment. Proven in production.",
    type: "website",
    url: "/freight-forwarding-software",
    siteName: "Voxarel",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Voxarel freight forwarding software" }],
  },
};

const data: LandingData = {
  eyebrow: "Freight forwarding software",
  h1: "Freight forwarding software that runs the whole file, not just the booking.",
  sub: "Quotes, bookings, documents, warehouse, finance and tracking on one platform, so every shipment file stays complete from enquiry to settlement.",
  builtForHeading: "Built for freight forwarders",
  builtFor: [
    "A forwarder lives and dies by the file. Rates, the booking, the documents, the invoice, the proof of delivery: if any piece lives in a separate app or a colleague's inbox, the file is never really closed. Voxarel keeps the whole file in one place, so nothing is missing when a customer or a customs officer asks.",
    "Because forwarding is a margin business, the money has to be as tight as the operations. Voxarel ties every shipment to its invoice, its VAT, its cash on delivery and its costs, and reconciles them automatically, so you know the real margin on a file, not an estimate at month end.",
  ],
  capabilitiesHeading: "One file, from enquiry to settlement",
  capabilities: [
    { title: "Quotes and rates", desc: "Instant quotes off your corridor rates, then bookings in the same flow." },
    { title: "Documents", desc: "Attach paperwork to the shipment, with an audit trail of who added what." },
    { title: "Warehouse and containers", desc: "Scan in and out, build manifests, and consolidate for the corridor." },
    { title: "Finance and margin", desc: "Invoicing, VAT, cash on delivery and costs, reconciled per shipment." },
    { title: "Tracking and delivery", desc: "Public tracking, a live status timeline, and proof of delivery." },
    { title: "Pulse AI", desc: "Ask about any file in plain language, on web or WhatsApp." },
  ],
  faqs: [
    {
      q: "What is freight forwarding software?",
      a: "Freight forwarding software runs a forwarder's operations end to end: quotes, bookings, documents, warehouse, finance and tracking. Voxarel does all of it on one connected platform.",
    },
    {
      q: "Does it keep shipment documents?",
      a: "Yes. You attach documents to the shipment they belong to, with an audit trail of who uploaded what and when.",
    },
    {
      q: "Can I see margin per shipment?",
      a: "Yes. Every shipment is tied to its invoice, VAT, cash on delivery and costs, reconciled automatically, so the margin on a file is real rather than a guess.",
    },
    {
      q: "Is Voxarel proven in production?",
      a: "Yes. ST Courier, an international courier network, runs its entire operation on Voxarel across more than 5 branches.",
    },
  ],
};

export default function FreightForwardingPage() {
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
