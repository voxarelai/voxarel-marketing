import { ArrowRight } from "@/components/icons";
import { Reveal } from "@/components/Reveal";

type Module = { title: string; description: string; badge?: string };

const modules: Module[] = [
  {
    title: "Shipping",
    description:
      "Quotes, bookings, corridor rates, invoices and proof of delivery. Every shipment tracked from first call to final signature.",
  },
  {
    title: "Warehouse",
    description:
      "Scan in, scan out. Bin locations, expiry flags and variance checks, so nothing sits forgotten in a corner.",
  },
  {
    title: "Finance",
    description:
      "Every transaction tracked from invoice to payment to reconciliation. Month-end in hours, audit-ready records on demand.",
  },
  {
    title: "Inventory",
    description:
      "Live stock levels across every branch: what's in, what's moving, and what needs attention before it becomes a problem.",
  },
  {
    title: "Field operations",
    description:
      "Collections, routes and cash settlement on a phone. Faster for your agents and drivers than pen and paper.",
  },
  {
    title: "Pulse, built-in AI",
    badge: "New",
    description:
      "Ask about shipments, stock or approvals in plain language (on the web or WhatsApp) and get answers from your live data.",
  },
];

function IndexRow({ m, n, side }: { m: Module; n: number; side: "left" | "right" }) {
  return (
    <div
      className={`group relative grid grid-cols-[42px_1fr] gap-3.5 border-b border-hair py-7 ${
        side === "left" ? "md:border-r md:pr-11" : "md:pl-11"
      }`}
    >
      <div className="font-mono text-[12.5px] tabular-nums text-mint-deep">
        {String(n).padStart(2, "0")}
      </div>
      <div>
        <h3 className="font-display flex items-center gap-2.5 text-[19px] font-medium tracking-tight text-ink">
          {m.title}
          {m.badge && (
            <span className="rounded-full border border-hair px-1.5 py-0.5 font-display text-[9.5px] font-medium uppercase tracking-[0.06em] text-petrol-soft">
              {m.badge}
            </span>
          )}
        </h3>
        <p className="mt-2 max-w-[44ch] text-[14.5px] leading-relaxed text-muted">{m.description}</p>
      </div>
      <ArrowRight
        className={`absolute top-7 h-4 w-4 text-faint opacity-0 transition-opacity duration-200 group-hover:opacity-100 ${
          side === "left" ? "right-0 md:right-11" : "right-0"
        }`}
      />
    </div>
  );
}

export function Modules() {
  const left = modules.slice(0, 3);
  const right = modules.slice(3);
  return (
    <section id="platform" className="scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="max-w-[62ch]">
            <p className="font-display inline-flex items-center gap-2.5 text-[12px] font-medium uppercase tracking-[0.15em] text-mint-deep">
              <span className="h-1.5 w-1.5 rounded-full bg-mint" />
              The platform
            </p>
            <h2 className="font-display mt-4 text-balance text-3xl font-medium tracking-tight text-petrol-deep sm:text-[2.6rem] sm:leading-[1.08]">
              One connected system.
            </h2>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted">
              Today it lives in WhatsApp groups, Excel sheets and someone&apos;s memory. Voxarel puts
              it in one connected system, where a quote, its shipment, its money and its paperwork are
              all the same thread.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-12 border-t border-hair sm:mt-14">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div>
                {left.map((m, i) => (
                  <IndexRow key={m.title} m={m} n={i + 1} side="left" />
                ))}
              </div>
              <div>
                {right.map((m, i) => (
                  <IndexRow key={m.title} m={m} n={i + 4} side="right" />
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-12">
            <a
              href="/features"
              className="group inline-flex items-center gap-1.5 font-display text-[15px] font-medium text-petrol transition-colors hover:text-petrol-deep"
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
