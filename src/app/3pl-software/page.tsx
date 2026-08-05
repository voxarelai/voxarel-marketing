import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { LandingSections, faqPageSchema, type LandingData } from "@/components/landing/LandingSections";

export const metadata: Metadata = {
  alternates: { canonical: "/3pl-software" },
  title: "3PL software | Voxarel",
  description:
    "3PL software to run a third party logistics operation: warehouse, shipping, finance, multi-branch and client visibility, in one connected system. Proven in production.",
  openGraph: {
    title: "3PL software | Voxarel",
    description:
      "One connected system for third party logistics: warehouse, shipping, finance, multi-branch and client visibility. Proven in production.",
    type: "website",
    url: "/3pl-software",
    siteName: "Voxarel",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Voxarel 3PL software" }],
  },
};

const data: LandingData = {
  eyebrow: "3PL software",
  h1: "3PL software to run the whole operation, not just the warehouse.",
  sub: "Warehouse, shipping, finance and field teams on one platform, so a third party logistics operation works off the same live data across every branch and client.",
  builtForHeading: "Built for third party logistics",
  builtFor: [
    "A 3PL runs other companies' logistics, which means the numbers have to be right for everyone at once: stock levels per client, shipments in flight, cash collected, and invoices that have to reconcile. When that lives across separate tools, a discrepancy for one client becomes a discrepancy you cannot explain.",
    "Voxarel puts the whole operation on one system. Warehouse scanning and stock, shipping and tracking, finance and cash on delivery, all connected, so every branch and every client sees the same truth, and month end closes in hours rather than a week.",
  ],
  capabilitiesHeading: "Everything a 3PL runs on",
  capabilities: [
    { title: "Warehouse and inventory", desc: "Scan in and out, bin locations, live stock across every branch." },
    { title: "Shipping and tracking", desc: "Bookings, corridor rates, public tracking and proof of delivery." },
    { title: "Finance and COD", desc: "Invoicing, VAT, cash on delivery and daily reconciliation, audit-ready." },
    { title: "Multi-branch and roles", desc: "Run every branch on one system, with a view built for each job." },
    { title: "Complaints and audit trail", desc: "Track complaints to resolution, with a record of who did what." },
    { title: "Pulse AI", desc: "Ask about stock, shipments or invoices in plain language." },
  ],
  faqs: [
    {
      q: "What is 3PL software?",
      a: "3PL software runs a third party logistics operation: warehouse and inventory, shipping and tracking, finance and cash, across multiple branches and clients. Voxarel does all of it on one connected platform.",
    },
    {
      q: "Can it track stock per client and branch?",
      a: "Yes. Inventory shows live stock across every branch, sharing the same data as shipping and warehouse, so levels are never a stale spreadsheet.",
    },
    {
      q: "Does it handle invoicing and cash on delivery?",
      a: "Yes. Invoicing, VAT, cash on delivery collection and settlement, and daily reconciliation are built in and audit-ready.",
    },
    {
      q: "Is Voxarel proven in production?",
      a: "Yes. ST Courier, an international courier network, runs its entire operation on Voxarel across more than 5 branches.",
    },
  ],
};

export default function ThreePlPage() {
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
