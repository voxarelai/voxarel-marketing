import { ArrowRight } from "@/components/icons";
import { BrandRings } from "@/components/BrandRings";
import { Reveal } from "@/components/Reveal";
import { DEMO_URL } from "@/lib/site";

export type LandingData = {
  eyebrow: string;
  h1: string;
  sub: string;
  builtForHeading: string;
  builtFor: string[];
  capabilitiesHeading: string;
  capabilities: { title: string; desc: string }[];
  faqs: { q: string; a: string }[];
};

export function faqPageSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

function CapRow({
  cap,
  n,
  side,
}: {
  cap: { title: string; desc: string };
  n: number;
  side: "left" | "right";
}) {
  return (
    <div
      className={`grid grid-cols-[42px_1fr] gap-3.5 border-b border-hair py-7 ${
        side === "left" ? "md:border-r md:pr-11" : "md:pl-11"
      }`}
    >
      <div className="font-mono text-[12.5px] tabular-nums text-mint-deep">
        {String(n).padStart(2, "0")}
      </div>
      <div>
        <h3 className="font-display text-[18px] font-medium tracking-tight text-ink">{cap.title}</h3>
        <p className="mt-2 max-w-[44ch] text-[14.5px] leading-relaxed text-muted">{cap.desc}</p>
      </div>
    </div>
  );
}

export function LandingSections({ data }: { data: LandingData }) {
  const mid = Math.ceil(data.capabilities.length / 2);
  const capsLeft = data.capabilities.slice(0, mid);
  const capsRight = data.capabilities.slice(mid);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-clip pb-16 pt-32 sm:pb-20 sm:pt-40">
        <BrandRings className="pointer-events-none absolute -top-40 right-[-120px] -z-10 w-[min(760px,70vw)]" />
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal eager>
            <p className="font-display inline-flex items-center gap-2.5 text-[12px] font-medium uppercase tracking-[0.15em] text-mint-deep">
              <span className="h-1.5 w-1.5 rounded-full bg-mint" />
              {data.eyebrow}
            </p>
          </Reveal>
          <Reveal eager delay={80}>
            <h1 className="font-display mt-5 max-w-[18ch] text-balance text-[2.4rem] font-medium leading-[1.04] tracking-tight text-petrol-deep sm:text-[3.4rem]">
              {data.h1}
            </h1>
          </Reveal>
          <Reveal eager delay={160}>
            <p className="mt-6 max-w-[54ch] text-pretty text-lg leading-relaxed text-muted sm:text-xl">
              {data.sub}
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

      {/* Built for */}
      <section className="py-6">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="max-w-[62ch]">
            <Reveal>
              <h2 className="font-display text-2xl font-medium tracking-tight text-petrol-deep sm:text-[1.9rem]">
                {data.builtForHeading}
              </h2>
            </Reveal>
            <div className="mt-5 space-y-5">
              {data.builtFor.map((p, i) => (
                <Reveal key={p.slice(0, 28)} delay={i * 70}>
                  <p className="text-pretty text-[16.5px] leading-relaxed text-muted">{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <h2 className="font-display max-w-[62ch] text-3xl font-medium tracking-tight text-petrol-deep sm:text-[2.2rem]">
              {data.capabilitiesHeading}
            </h2>
          </Reveal>
          <Reveal>
            <div className="mt-10 border-t border-hair">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div>
                  {capsLeft.map((c, i) => (
                    <CapRow key={c.title} cap={c} n={i + 1} side="left" />
                  ))}
                </div>
                <div>
                  {capsRight.map((c, i) => (
                    <CapRow key={c.title} cap={c} n={i + 1 + capsLeft.length} side="right" />
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Proof */}
      <section className="border-y border-hair bg-ivory py-14">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal>
            <p className="font-display text-[11px] font-medium uppercase tracking-[0.14em] text-faint">
              Proven in production
            </p>
            <p className="mt-3 text-pretty text-[17px] leading-relaxed text-muted">
              ST Courier, an international courier network, runs its entire operation on Voxarel
              across more than 5 branches, moving freight between the Gulf and India, with bookings,
              warehouse, finance and cash settlement on one platform.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal>
            <h2 className="font-display text-3xl font-medium tracking-tight text-petrol-deep sm:text-[2.2rem]">
              Questions, answered.
            </h2>
          </Reveal>
          <div className="mt-10 border-t border-hair">
            {data.faqs.map((f, i) => (
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
