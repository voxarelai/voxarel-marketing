import { ArrowRight } from "@/components/icons";
import { Reveal } from "@/components/Reveal";

const pairs = [
  {
    before: "Escalations relayed through 14 WhatsApp groups",
    after: "Requests have workflows and route themselves",
  },
  {
    before: "The weekly report is a best guess, compiled by hand",
    after: "Your numbers are live — no compiling, no guessing",
  },
  {
    before: "Month-end takes a week of late nights",
    after: "Month-end closes in hours, audit-ready",
  },
];

export function OldWay() {
  return (
    <section className="relative overflow-hidden border-y border-hair bg-petrol-deep py-20 sm:py-24">
      {/* Brand device: node mesh (04-Elements) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-28 -top-40 h-[640px] w-[640px] opacity-[0.22]"
        style={{
          backgroundImage: "url(/elements/mesh.svg)",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-balance text-3xl font-extrabold tracking-tight text-white sm:text-[2.4rem] sm:leading-[1.15]">
              We don&apos;t compete with software.
              <br />
              <span className="text-mint-bright">We replace the chaos.</span>
            </h2>
          </div>
        </Reveal>

        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {pairs.map((p, i) => (
            <Reveal key={p.before} delay={i * 90}>
              <div className="flex flex-col items-stretch gap-2 rounded-2xl border border-white/10 bg-white/[0.06] p-5 sm:flex-row sm:items-center sm:gap-5 sm:p-6">
                <p className="flex-1 text-[15px] leading-snug text-white/55 line-through decoration-white/25">
                  {p.before}
                </p>
                <ArrowRight className="hidden h-4 w-4 shrink-0 text-mint sm:block" />
                <p className="flex-1 text-[15px] font-bold leading-snug text-white">{p.after}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
