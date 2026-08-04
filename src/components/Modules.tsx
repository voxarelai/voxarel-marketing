import type { ComponentType, SVGProps } from "react";
import { Package, Warehouse, Receipt, Layers, Route, Pulse, ArrowRight } from "@/components/icons";
import { Reveal } from "@/components/Reveal";

type Module = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  badge?: string;
};

const modules: Module[] = [
  {
    icon: Package,
    title: "Shipping",
    description:
      "Quotes, bookings, corridor rates, invoices and proof of delivery. Every shipment tracked from first call to final signature.",
  },
  {
    icon: Warehouse,
    title: "Warehouse",
    description:
      "Scan in, scan out. Bin locations, expiry flags and variance checks, so nothing sits forgotten in a corner.",
  },
  {
    icon: Receipt,
    title: "Finance",
    description:
      "Every transaction tracked from invoice to payment to reconciliation. Month-end in hours, audit-ready records on demand.",
  },
  {
    icon: Layers,
    title: "Inventory",
    description:
      "Live stock levels across every branch: what's in, what's moving, and what needs attention before it becomes a problem.",
  },
  {
    icon: Route,
    title: "Field operations",
    description:
      "Collections, routes and cash settlement on a phone. Faster for your agents and drivers than pen and paper.",
  },
  {
    icon: Pulse,
    title: "Pulse, built-in AI",
    badge: "New",
    description:
      "Ask about shipments, stock or approvals in plain language (on the web or WhatsApp) and get answers from your live data.",
  },
];

export function Modules() {
  return (
    <section id="platform" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-display text-[12px] font-bold uppercase tracking-[0.22em] text-mint-deep">
              The platform
            </p>
            <div className="mx-auto mt-3.5 h-[6px] w-[86px] rounded-[3px] bg-mint" />
            <h2 className="font-display mt-5 text-balance text-3xl font-extrabold tracking-tight text-petrol-deep sm:text-[2.6rem] sm:leading-[1.15]">
              One connected system.
            </h2>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted">
              Today it lives in WhatsApp groups, Excel sheets and someone&apos;s memory. Voxarel
              puts it in one connected system, where a quote, its shipment, its money and its
              paperwork are all the same thread.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((m, i) => {
            const Icon = m.icon;
            return (
              <Reveal key={m.title} delay={(i % 3) * 80}>
                <div className="group h-full rounded-2xl border border-hair bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-mint/60 hover:shadow-[0_16px_40px_-16px_rgba(16,64,80,0.25)]">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tint text-petrol transition-colors group-hover:bg-mint/20">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display flex items-center gap-2 text-[17px] font-bold text-ink">
                    {m.title}
                    {m.badge && (
                      <span className="rounded-full bg-mint/15 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-mint-deep">
                        {m.badge}
                      </span>
                    )}
                  </h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{m.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <div className="mt-12 text-center">
            <a
              href="/features"
              className="group inline-flex items-center gap-1.5 font-display text-[15px] font-bold text-petrol transition-colors hover:text-petrol-deep"
            >
              See everything Voxarel does
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
