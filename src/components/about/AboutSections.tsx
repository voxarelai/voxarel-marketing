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
      <section className="relative overflow-hidden pb-14 pt-36 sm:pb-16 sm:pt-44">
        <div
          aria-hidden
          className="absolute -top-48 left-1/2 -z-10 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-mint/20 blur-3xl"
        />
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <Reveal eager>
            <p className="font-display text-[12px] font-bold uppercase tracking-[0.22em] text-mint-deep">
              About
            </p>
          </Reveal>
          <Reveal eager delay={80}>
            <h1 className="font-display mt-5 text-balance text-[2.5rem] font-extrabold leading-[1.08] tracking-tight text-petrol-deep sm:text-6xl">
              Why Voxarel exists.
            </h1>
          </Reveal>
          <Reveal eager delay={160}>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted sm:text-xl">
              Cargo moves faster than the tools that run it. We are building the system that keeps
              up.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="pb-4">
        <div className="mx-auto max-w-2xl space-y-10 px-5 sm:px-8">
          {sections.map((s) => (
            <Reveal key={s.h}>
              <div>
                <h2 className="font-display text-2xl font-extrabold tracking-tight text-petrol-deep sm:text-[1.7rem] sm:leading-[1.2]">
                  {s.h}
                </h2>
                <p className="mt-3 text-pretty text-[16.5px] leading-relaxed text-muted">{s.p}</p>
              </div>
            </Reveal>
          ))}

          <Reveal>
            <div className="pt-2">
              <a
                href={DEMO_URL}
                className="inline-flex h-[52px] items-center justify-center rounded-xl bg-petrol px-8 text-[16px] font-bold text-white shadow-[0_8px_24px_-8px_rgba(16,64,80,0.5)] transition-colors hover:bg-petrol-deep"
              >
                Book a demo
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
