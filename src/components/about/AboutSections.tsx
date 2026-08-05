import { ArrowRight } from "@/components/icons";
import { BrandRings } from "@/components/BrandRings";
import { Reveal } from "@/components/Reveal";
import { DEMO_URL } from "@/lib/site";

const sections: { h: string; p: string }[] = [
  {
    h: "Logistics still runs on group chats and spreadsheets.",
    p: "A booking starts in one place, the warehouse tracks it in another, and finance stitches it together at month end. Every handoff is a chance to lose money, time or a customer. Cargo and courier companies deserve better than a patchwork of apps that do not talk to each other.",
  },
  {
    h: "So we built one connected system.",
    p: "In Voxarel, a quote becomes an invoice, an invoice becomes a shipment, and that shipment moves through the warehouse to delivery and settlement, all the same record. Bookings, warehouse, finance, tracking, complaints and field teams finally work off the same live data, in real time.",
  },
  {
    h: "Proven in production, not a prototype.",
    p: "Voxarel runs a real, demanding operation today. ST Courier, an international courier network, runs its entire business on Voxarel across more than 5 branches, moving freight between the Gulf and India: bookings, warehouse, finance and cash settlement, all on one platform. Real shipments, real cash, real month ends.",
  },
  {
    h: "Who we are.",
    p: "Voxarel is built and operated by Azraq Ventures LLC, based in Dubai, United Arab Emirates. We are a small team with an unfashionable obsession: the reconciliation, the audit trail, and the cash that has to add up at the end of every day.",
  },
  {
    h: "Where we are going.",
    p: "We start where the pain is sharpest, with cargo and courier operators, and we are building toward the operating system for logistics: one platform any logistics company can run its entire business on.",
  },
];

export function AboutSections() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-clip pb-14 pt-32 sm:pb-16 sm:pt-40">
        <BrandRings className="pointer-events-none absolute -top-40 right-[-120px] -z-10 w-[min(740px,68vw)]" />
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal eager>
            <p className="font-display inline-flex items-center gap-2.5 text-[12px] font-medium uppercase tracking-[0.15em] text-mint-deep">
              <span className="h-1.5 w-1.5 rounded-full bg-mint" />
              About
            </p>
          </Reveal>
          <Reveal eager delay={80}>
            <h1 className="font-display mt-5 max-w-[16ch] text-balance text-[2.5rem] font-medium leading-[1.03] tracking-tight text-petrol-deep sm:text-[3.6rem]">
              Why Voxarel exists.
            </h1>
          </Reveal>
          <Reveal eager delay={160}>
            <p className="mt-6 max-w-[52ch] text-pretty text-lg leading-relaxed text-muted sm:text-xl">
              Cargo moves faster than the tools that run it. We are building the system that keeps up.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="pb-20 sm:pb-24">
        <div className="mx-auto max-w-[68ch] space-y-12 px-5 sm:px-8">
          {sections.map((s) => (
            <Reveal key={s.h}>
              <div>
                <h2 className="font-display text-2xl font-medium tracking-tight text-petrol-deep sm:text-[1.8rem] sm:leading-[1.15]">
                  {s.h}
                </h2>
                <p className="mt-3.5 text-pretty text-[16.5px] leading-relaxed text-muted">{s.p}</p>
              </div>
            </Reveal>
          ))}

          <Reveal>
            <div className="pt-2">
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
    </>
  );
}
