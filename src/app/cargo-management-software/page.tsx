import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { LandingSections, faqPageSchema, type LandingData } from "@/components/landing/LandingSections";

export const metadata: Metadata = {
  alternates: { canonical: "/cargo-management-software" },
  title: "Cargo management software | Voxarel",
  description:
    "Cargo management software for consolidators and forwarders: quotes, bookings, warehouse, container manifests, finance and COD, tracking and Pulse AI, in one connected system.",
  openGraph: {
    title: "Cargo management software | Voxarel",
    description:
      "One connected system for cargo companies: quotes, bookings, warehouse and containers, finance and COD, tracking and Pulse AI. Proven in production.",
    type: "website",
    url: "/cargo-management-software",
    siteName: "Voxarel",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Voxarel cargo management software" }],
  },
};

const data: LandingData = {
  eyebrow: "Cargo management software",
  h1: "Cargo management software, built for how cargo companies actually run.",
  sub: "One system for quotes, bookings, warehouse, finance and field operations, so every branch and agent works off the same live data.",
  builtForHeading: "Built for cargo companies",
  builtFor: [
    "Cargo companies live between rate sheets, WhatsApp groups and spreadsheets. A booking starts on one, the warehouse tracks it on another, and finance reconciles it at month end. Voxarel replaces that patchwork with a single system where a shipment carries its rate, its documents, its warehouse movements and its money, from the first quote to the final settlement.",
    "Consolidation is the hard part, so Voxarel is built for it. Corridor rates that reflect how you actually price, container manifests and load planning, and cash on delivery and agent costs reconciled automatically. Your team stops re-keying and starts trusting the numbers.",
  ],
  capabilitiesHeading: "Everything a cargo operation needs",
  capabilities: [
    { title: "Quotes and bookings", desc: "Instant quotes off your corridor rates, then bookings and collection in the same flow." },
    { title: "Warehouse and containers", desc: "Scan in and out, build manifests, and optimize how containers are loaded." },
    { title: "Finance and COD", desc: "Invoicing, VAT, cash on delivery collection and settlement, and daily reconciliation." },
    { title: "Tracking and delivery", desc: "Public tracking, a live status timeline, and driver last mile with proof of delivery." },
    { title: "Complaints and control", desc: "Complaints, approvals, an immutable audit trail and roles for every job." },
    { title: "Pulse AI", desc: "Ask about shipments, stock or invoices in plain language, on web or WhatsApp." },
  ],
  faqs: [
    {
      q: "What is cargo management software?",
      a: "Cargo management software runs the operational side of a cargo business: quotes and bookings, warehouse and containers, finance and cash, tracking and delivery, in one system. Voxarel does all of this on one connected platform.",
    },
    {
      q: "Does Voxarel handle consolidation and groupage?",
      a: "Yes. Voxarel is built for consolidators: many shippers into one movement, container manifests and load planning, and rates that match how you actually price a corridor.",
    },
    {
      q: "Can it handle cash on delivery and agent costs?",
      a: "Yes. Cash on delivery is tracked from collection to settlement per driver and branch, reconciled against deposits, and related costs are recorded alongside.",
    },
    {
      q: "Is Voxarel proven in production?",
      a: "Yes. ST Courier, an international courier network, runs its entire operation on Voxarel across more than 12 branches and 200 field agents.",
    },
  ],
};

export default function CargoPage() {
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
