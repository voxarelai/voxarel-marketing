import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { LandingSections, faqPageSchema, type LandingData } from "@/components/landing/LandingSections";

export const metadata: Metadata = {
  alternates: { canonical: "/logistics-software-uae" },
  title: "Logistics software UAE | Voxarel",
  description:
    "Logistics software for cargo and courier companies in the UAE: VAT, cash on delivery, multi-branch and the Gulf-to-India corridor, in one connected system. Proven in production.",
  openGraph: {
    title: "Logistics software UAE | Voxarel",
    description:
      "One connected system for UAE cargo and courier operators: VAT, cash on delivery, multi-branch and the Gulf-to-India corridor. Proven in production.",
    type: "website",
    url: "/logistics-software-uae",
    siteName: "Voxarel",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Voxarel logistics software for the UAE" }],
  },
};

const data: LandingData = {
  eyebrow: "Logistics software in the UAE",
  h1: "Logistics software built for operators in the UAE.",
  sub: "One connected system for cargo and courier companies running out of the UAE, with VAT, cash on delivery and the Gulf-to-India corridor built in.",
  builtForHeading: "Made for how the UAE moves cargo",
  builtFor: [
    "Logistics in the UAE has its own shape: multi-branch operations, cash on delivery, VAT to account for, and busy corridors to India and across the Gulf. Voxarel is built for exactly this, and it already runs a real UAE operation today.",
    "ST Courier, an international courier network, runs its entire business on Voxarel across more than 12 branches and 200 field agents, moving freight between the Gulf and India. Invoicing, VAT, cash on delivery settlement and daily reconciliation are handled the way a UAE operator actually needs them.",
  ],
  capabilitiesHeading: "What UAE operators get",
  capabilities: [
    { title: "VAT and finance", desc: "Invoicing with UAE VAT, expenses, deposits and daily reconciliation, audit-ready." },
    { title: "Cash on delivery", desc: "COD collection and settlement per driver and branch, reconciled automatically." },
    { title: "Multi-branch", desc: "Run every branch on one system, with roles and dashboards for each." },
    { title: "Gulf and India corridors", desc: "Corridor rates and tracking for freight moving between the Gulf and India." },
    { title: "Warehouse and containers", desc: "Scanning, manifests and container optimization for consolidation." },
    { title: "Pulse AI and tracking", desc: "Public tracking, a live status timeline, and an AI assistant on web or WhatsApp." },
  ],
  faqs: [
    {
      q: "Is Voxarel used in the UAE?",
      a: "Yes. Voxarel runs a real UAE operation today: ST Courier uses it across more than 12 branches and 200 field agents, moving freight between the Gulf and India.",
    },
    {
      q: "Does Voxarel handle UAE VAT?",
      a: "Yes. Invoicing accounts for VAT on international shipments, and finance, expenses and reconciliation are built for how a UAE operator works.",
    },
    {
      q: "Does it support cash on delivery?",
      a: "Yes. Cash on delivery is tracked per driver and branch from collection to settlement and reconciled against deposits.",
    },
    {
      q: "Can it handle shipments between the Gulf and India?",
      a: "Yes. Corridor rates, tracking and settlement are built for freight moving between the Gulf and India, the busiest lane for many UAE operators.",
    },
  ],
};

export default function LogisticsUaePage() {
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
