import type { ComponentType, SVGProps } from "react";
import {
  Layers,
  Package,
  Warehouse,
  Receipt,
  MapPin,
  AlertTriangle,
  Shield,
  Pulse,
  Route,
  Phone,
  Check,
} from "@/components/icons";
import { Reveal } from "@/components/Reveal";
import { DEMO_URL } from "@/lib/site";

type Feature = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  points: string[];
};

const connected: Feature = {
  icon: Layers,
  title: "One connected system",
  description:
    "Every record is linked. A quote becomes an invoice, an invoice becomes a shipment, and that shipment moves through the warehouse to delivery and settlement, all the same object. One shipment journey, with its documents, status history and comments, live for the whole team.",
  points: [
    "Quote to settlement in one thread",
    "Live updates across every role",
    "No exports, no re-keying",
  ],
};

const features: Feature[] = [
  {
    icon: Package,
    title: "Shipping and bookings",
    description: "The full shipping cycle for cargo and courier companies.",
    points: [
      "International sea and air, plus domestic",
      "Instant quotes from your corridor rates",
      "Booking and collection workflow",
      "AWB labels: stage 1 at booking, stage 2 after reweigh",
      "Proof of delivery with signature and photo",
    ],
  },
  {
    icon: Warehouse,
    title: "Warehouse and containers",
    description: "A live, accurate warehouse from receipt to departure.",
    points: [
      "Scan receive, bin, queue, load and verify",
      "Container manifests and load planning",
      "Container optimization",
      "Priority queue with approvals",
      "Discrepancy and variance handling",
      "Utilization and ROI analytics",
    ],
  },
  {
    icon: Receipt,
    title: "Finance",
    description: "Every shipment connected to its money, reconciled automatically.",
    points: [
      "Invoicing and VAT",
      "COD collection and settlement",
      "Deposits and daily reconciliation",
      "Expenses, debit and credit notes, corrections",
      "Accounting sync",
      "Destination currencies for 22 countries",
    ],
  },
  {
    icon: MapPin,
    title: "Tracking and delivery",
    description: "Know where every shipment is, and when it is running late.",
    points: [
      "Public tracking by AWB number",
      "One-time-code verification for private details",
      "Live status timeline",
      "Tracking-time alerts when a shipment sits too long",
      "Holder tracking",
      "Driver last mile and delivery partners",
    ],
  },
  {
    icon: AlertTriangle,
    title: "Complaints and resolution",
    description: "Turn complaints into a tracked, resolvable workflow.",
    points: [
      "Log complaints against a shipment",
      "Priority, assignment and escalation",
      "Resolution tracking",
      "Internal notes, kept separate from customer-facing ones",
    ],
  },
  {
    icon: Shield,
    title: "Collaboration and control",
    description: "Everyone works together, with the right guardrails.",
    points: [
      "Comments scoped to staff, finance or the customer",
      "Approvals for prices, edits, surcharges, upgrades and voids",
      "Immutable audit trail of who did what",
      "Roles and permissions for every job",
      "Multi-branch and announcements",
    ],
  },
  {
    icon: Pulse,
    title: "Analytics and Pulse AI",
    description: "See the whole business, and just ask it questions.",
    points: [
      "Executive dashboards: revenue, volume, branches, live ops",
      "Container utilization and daily sales report",
      "Pulse AI answers in plain language",
      "On the web or over WhatsApp",
    ],
  },
  {
    icon: Route,
    title: "Rates and pricing",
    description: "Price the way your business actually prices.",
    points: [
      "Corridors and lanes",
      "Commodity types",
      "Exchange rates",
      "Surcharges and general rate increases",
      "Package add-ons",
    ],
  },
  {
    icon: Phone,
    title: "Mobile, WhatsApp, embed and API",
    description: "Meet your team and customers where they are.",
    points: [
      "Driver and field mobile app, including offline",
      "WhatsApp notifications",
      "Embeddable quote calculator for your website",
      "Public API and integrations",
    ],
  },
];

export const featuresFaqs: { q: string; a: string }[] = [
  {
    q: "What is Voxarel?",
    a: "Voxarel is logistics operations software for cargo and courier companies. It runs bookings and shipping quotes, warehouse, finance, tracking, complaints and field operations in one connected system, with a built-in AI assistant called Pulse.",
  },
  {
    q: "Who is Voxarel for?",
    a: "Cargo companies, courier companies, freight forwarders and consolidators that want one system instead of WhatsApp groups and spreadsheets. Every role, from the field agent to the CEO, gets a view built for their job.",
  },
  {
    q: "Does Voxarel handle cash on delivery?",
    a: "Yes. Voxarel tracks cash on delivery from collection to settlement, per driver and per branch, and reconciles it against your deposits.",
  },
  {
    q: "Can customers track their shipments?",
    a: "Yes. Every shipment has public tracking by AWB number, a live status timeline, and one-time-code verification to reveal private details to the sender or receiver.",
  },
  {
    q: "Does Voxarel work on mobile?",
    a: "Yes. Drivers and field agents run collections, deliveries, cash on delivery and proof of delivery from a mobile app that keeps working offline.",
  },
];

export function FeaturesSections() {
  const Connected = connected.icon;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-36 sm:pb-20 sm:pt-44">
        <div
          aria-hidden
          className="absolute -top-48 left-1/2 -z-10 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-mint/20 blur-3xl"
        />
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal eager>
              <p className="font-display text-[12px] font-bold uppercase tracking-[0.22em] text-mint-deep">
                The platform
              </p>
            </Reveal>
            <Reveal eager delay={80}>
              <h1 className="font-display mt-5 text-balance text-[2.5rem] font-extrabold leading-[1.08] tracking-tight text-petrol-deep sm:text-6xl">
                One platform for every part of your operation.
              </h1>
            </Reveal>
            <Reveal eager delay={160}>
              <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted sm:text-xl">
                From the first quote to the final settlement, every module works off the same live
                data. Here is everything Voxarel does.
              </p>
            </Reveal>
            <Reveal eager delay={240}>
              <div className="mt-9">
                <a
                  href={DEMO_URL}
                  className="inline-flex h-[52px] items-center justify-center rounded-xl bg-petrol px-8 text-[16px] font-bold text-white shadow-[0_8px_24px_-8px_rgba(16,64,80,0.5)] transition-colors hover:bg-petrol-deep"
                >
                  Book a demo
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="pb-4">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          {/* Connected system, featured */}
          <Reveal>
            <div className="rounded-2xl border border-mint/40 bg-tint/60 p-8 sm:p-10">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-mint/20 text-petrol">
                  <Connected className="h-7 w-7" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-extrabold tracking-tight text-petrol-deep sm:text-[1.75rem]">
                    {connected.title}
                  </h2>
                  <p className="mt-3 max-w-3xl text-pretty text-[16px] leading-relaxed text-muted">
                    {connected.description}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                    {connected.points.map((p) => (
                      <li
                        key={p}
                        className="flex items-center gap-2 text-[14px] font-bold text-petrol"
                      >
                        <Check className="h-4 w-4 shrink-0 text-mint-deep" strokeWidth={2.6} />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Grid */}
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <Reveal key={f.title} delay={(i % 3) * 80}>
                  <div className="group flex h-full flex-col rounded-2xl border border-hair bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-mint/60 hover:shadow-[0_16px_40px_-16px_rgba(16,64,80,0.25)]">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tint text-petrol transition-colors group-hover:bg-mint/20">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h2 className="font-display text-[17px] font-bold text-ink">{f.title}</h2>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted">{f.description}</p>
                    <ul className="mt-4 space-y-2">
                      {f.points.map((p) => (
                        <li
                          key={p}
                          className="flex gap-2 text-[14px] leading-snug text-muted"
                        >
                          <Check
                            className="mt-[3px] h-3.5 w-3.5 shrink-0 text-mint-deep"
                            strokeWidth={2.6}
                          />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal>
            <h2 className="font-display text-center text-3xl font-extrabold tracking-tight text-petrol-deep sm:text-[2.2rem]">
              Questions, answered.
            </h2>
          </Reveal>
          <div className="mt-10 space-y-4">
            {featuresFaqs.map((f, i) => (
              <Reveal key={f.q} delay={(i % 3) * 70}>
                <div className="rounded-2xl border border-hair bg-white p-6">
                  <h3 className="font-display text-[17px] font-bold text-ink">{f.q}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{f.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
