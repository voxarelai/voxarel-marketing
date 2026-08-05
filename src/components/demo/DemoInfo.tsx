import { Reveal } from "@/components/Reveal";

const steps: { n: string; h: string; p: string }[] = [
  {
    n: "1",
    h: "Tell us about your operation",
    p: "Your branches, corridors and rough volumes. A few minutes is enough to get started.",
  },
  {
    n: "2",
    h: "We tailor the demo",
    p: "Thirty minutes on your actual workflow, not a generic slideshow. We come prepared.",
  },
  {
    n: "3",
    h: "See it on your numbers",
    p: "Quotes, cash, tracking and the parts that matter most to you, running as one system.",
  },
];

export function DemoInfo() {
  return (
    <section className="border-t border-hair bg-tint/40 py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-medium tracking-tight text-petrol-deep sm:text-[2.2rem]">
              What to expect.
            </h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted">
              Built for cargo and courier companies, freight forwarders and consolidators. No sales
              script, just your operation on one screen.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 80}>
              <div className="h-full rounded-2xl border border-hair bg-white p-7">
                <div className="font-display flex h-10 w-10 items-center justify-center rounded-full bg-mint/15 text-[16px] font-medium text-mint-deep">
                  {s.n}
                </div>
                <h3 className="font-display mt-4 text-[17px] font-bold text-ink">{s.h}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
