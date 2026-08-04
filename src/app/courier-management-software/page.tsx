import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { LandingSections, faqPageSchema, type LandingData } from "@/components/landing/LandingSections";

export const metadata: Metadata = {
  alternates: { canonical: "/courier-management-software" },
  title: "Courier management software | Voxarel",
  description:
    "Courier management software for bookings, dispatch, a mobile driver app, tracking, cash on delivery and finance, in one connected system. Proven in production.",
  openGraph: {
    title: "Courier management software | Voxarel",
    description:
      "One connected system for courier companies: bookings, a mobile driver app, tracking, cash on delivery and finance. Proven in production.",
    type: "website",
    url: "/courier-management-software",
    siteName: "Voxarel",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Voxarel courier management software" }],
  },
};

const data: LandingData = {
  eyebrow: "Courier management software",
  h1: "Courier management software for the whole operation, not just the parcels.",
  sub: "Bookings, warehouse, finance, tracking and field teams on one platform, so every branch, agent and driver works off the same live data.",
  builtForHeading: "Built for courier companies",
  builtFor: [
    "Courier work is fast and unforgiving. Parcels move between branches, drivers collect cash, and customers expect to know exactly where their shipment is. When that runs on group chats and paper, something slips every day. Voxarel puts the whole operation on one system, from the counter to the last mile.",
    "Drivers and field agents work from a mobile app, including offline: collections, deliveries, cash on delivery and proof of delivery with a signature and photo. Every update flows straight back to the office, so a pickup or a payment shows up the moment it happens, not hours later.",
  ],
  capabilitiesHeading: "From booking to the last mile",
  capabilities: [
    { title: "Bookings and quotes", desc: "Instant quotes and bookings for domestic and international parcels." },
    { title: "Mobile for the field", desc: "Drivers and agents run jobs, deliveries, COD and proof of delivery from a phone, even offline." },
    { title: "Tracking customers trust", desc: "Public tracking by number, a live status timeline, and one-time-code verification." },
    { title: "Cash on delivery", desc: "COD tracked per driver and branch, settled and reconciled without the spreadsheet." },
    { title: "Complaints and resolution", desc: "Log, assign, escalate and resolve complaints against the shipment they belong to." },
    { title: "Finance and reconciliation", desc: "Invoicing, VAT, deposits and daily reconciliation, audit-ready." },
  ],
  faqs: [
    {
      q: "What is courier management software?",
      a: "Courier management software runs a courier company end to end: bookings, dispatch and the mobile field app, tracking, cash on delivery, and the finance behind it. Voxarel does all of this in one connected system.",
    },
    {
      q: "Does Voxarel have a driver app?",
      a: "Yes. Drivers and field agents use a mobile app for collections, deliveries, cash on delivery and proof of delivery with signature and photo. It keeps working offline and syncs when back online.",
    },
    {
      q: "Can customers track their parcels?",
      a: "Yes. Every shipment has public tracking by number and a live status timeline, with one-time-code verification to reveal private details to the sender or receiver.",
    },
    {
      q: "Does it handle cash on delivery?",
      a: "Yes. Cash on delivery is tracked per driver and branch from collection to settlement and reconciled against deposits.",
    },
  ],
};

export default function CourierPage() {
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
