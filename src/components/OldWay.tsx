import { ArrowRight } from "@/components/icons";
import { BrandRings } from "@/components/BrandRings";
import { Reveal } from "@/components/Reveal";

const pairs = [
  {
    before: "Escalations relayed through 14 WhatsApp groups",
    after: "Requests have workflows and route themselves",
  },
  {
    before: "The weekly report is a best guess, compiled by hand",
    after: "Your numbers are live, no compiling, no guessing",
  },
  {
    before: "Month-end takes a week of late nights",
    after: "Month-end closes in hours, audit-ready",
  },
];

export function OldWay() {
  return (
    <section className="relative overflow-clip border-y border-hair bg-petrol-deep py-24 sm:py-28">
      <BrandRings
        className="pointer-events-none absolute -bottom-56 -left-40 w-[min(700px,64vw)]"
        opacity={[0.22, 0.15, 0.09]}
      />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <h2 className="font-display max-w-[640px] text-balance text-3xl font-medium leading-[1.1] tracking-tight text-white sm:text-[2.6rem]">
            We don&apos;t compete with software.
            <br />
            <span className="text-mint-bright">We replace the chaos.</span>
          </h2>
        </Reveal>

        <div className="mt-12 max-w-[940px] border-t border-white/[0.12]">
          {pairs.map((p, i) => (
            <Reveal key={p.before} delay={i * 70}>
              <div className="grid items-center gap-2 border-b border-white/[0.12] py-5 sm:grid-cols-[1fr_40px_1fr]">
                <p className="text-[15px] leading-snug text-white/50 line-through decoration-white/25">
                  {p.before}
                </p>
                <ArrowRight className="hidden h-4 w-4 justify-self-center text-mint sm:block" />
                <p className="font-display text-[15.5px] font-medium leading-snug tracking-tight text-white">
                  {p.after}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
