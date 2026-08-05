import { ArrowRight, Check } from "@/components/icons";
import { BrandRings } from "@/components/BrandRings";
import { Reveal } from "@/components/Reveal";
import { DEMO_URL } from "@/lib/site";

type Feature = { title: string; description: string; points: string[] };

const connected: Feature = {
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

function FeatureRow({ f, n, side }: { f: Feature; n: number; side: "left" | "right" }) {
  return (
    <div
      className={`grid grid-cols-[42px_1fr] gap-3.5 border-b border-hair py-8 ${
        side === "left" ? "md:border-r md:pr-11" : "md:pl-11"
      }`}
    >
      <div className="font-mono text-[12.5px] tabular-nums text-mint-deep">
        {String(n).padStart(2, "0")}
      </div>
      <div>
        <h3 className="font-display text-[18px] font-medium tracking-tight text-ink">{f.title}</h3>
        <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{f.description}</p>
        <ul className="mt-4 space-y-2">
          {f.points.map((p) => (
            <li key={p} className="flex gap-2 text-[14px] leading-snug text-muted">
              <Check className="mt-[3px] h-3.5 w-3.5 shrink-0 text-mint-deep" strokeWidth={2.6} />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function FeaturesSections() {
  const mid = Math.ceil(features.length / 2);
  const left = features.slice(0, mid);
  const right = features.slice(mid);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-clip pb-16 pt-32 sm:pb-20 sm:pt-40">
        <BrandRings className="pointer-events-none absolute -top-40 right-[-120px] -z-10 w-[min(760px,70vw)]" />
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal eager>
            <p className="font-display inline-flex items-center gap-2.5 text-[12px] font-medium uppercase tracking-[0.15em] text-mint-deep">
              <span className="h-1.5 w-1.5 rounded-full bg-mint" />
              The platform
            </p>
          </Reveal>
          <Reveal eager delay={80}>
            <h1 className="font-display mt-5 max-w-[18ch] text-balance text-[2.4rem] font-medium leading-[1.04] tracking-tight text-petrol-deep sm:text-[3.6rem]">
              One platform for every part of your operation.
            </h1>
          </Reveal>
          <Reveal eager delay={160}>
            <p className="mt-6 max-w-[54ch] text-pretty text-lg leading-relaxed text-muted sm:text-xl">
              From the first quote to the final settlement, every module works off the same live
              data. Here is everything Voxarel does.
            </p>
          </Reveal>
          <Reveal eager delay={240}>
            <div className="mt-8">
              <a
                href={DEMO_URL}
                className="group inline-flex h-[46px] items-center justify-center gap-2 rounded-lg bg-petrol px-5 font-display text-[15px] font-medium text-white transition-colors hover:bg-petrol-deep"
              >
                Book a demo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Connected lead + feature index */}
      <section className="pb-20 sm:pb-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <div className="max-w-[64ch]">
              <h2 className="font-display text-2xl font-medium tracking-tight text-petrol-deep sm:text-[2rem]">
                {connected.title}
              </h2>
              <p className="mt-4 text-pretty text-lg leading-relaxed text-muted">
                {connected.description}
              </p>
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                {connected.points.map((p) => (
                  <li
                    key={p}
                    className="font-display flex items-center gap-2 text-[14px] font-medium text-petrol"
                  >
                    <Check className="h-4 w-4 shrink-0 text-mint-deep" strokeWidth={2.6} />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal>
            <div className="mt-14 border-t border-hair">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div>
                  {left.map((f, i) => (
                    <FeatureRow key={f.title} f={f} n={i + 1} side="left" />
                  ))}
                </div>
                <div>
                  {right.map((f, i) => (
                    <FeatureRow key={f.title} f={f} n={i + 1 + left.length} side="right" />
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-hair py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal>
            <h2 className="font-display text-3xl font-medium tracking-tight text-petrol-deep sm:text-[2.2rem]">
              Questions, answered.
            </h2>
          </Reveal>
          <div className="mt-10 border-t border-hair">
            {featuresFaqs.map((f, i) => (
              <Reveal key={f.q} delay={(i % 3) * 70}>
                <div className="border-b border-hair py-6">
                  <h3 className="font-display text-[17px] font-medium tracking-tight text-ink">
                    {f.q}
                  </h3>
                  <p className="mt-2.5 max-w-[68ch] text-[15px] leading-relaxed text-muted">{f.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
