import { Reveal } from "@/components/Reveal";
import { Check } from "@/components/icons";
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

export function LandingSections({ data }: { data: LandingData }) {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pb-14 pt-36 sm:pb-16 sm:pt-44">
        <div
          aria-hidden
          className="absolute -top-48 left-1/2 -z-10 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-mint/20 blur-3xl"
        />
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal eager>
              <p className="font-display text-[12px] font-bold uppercase tracking-[0.22em] text-mint-deep">
                {data.eyebrow}
              </p>
            </Reveal>
            <Reveal eager delay={80}>
              <h1 className="font-display mt-5 text-balance text-[2.4rem] font-extrabold leading-[1.1] tracking-tight text-petrol-deep sm:text-[3.4rem]">
                {data.h1}
              </h1>
            </Reveal>
            <Reveal eager delay={160}>
              <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted sm:text-xl">
                {data.sub}
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

      {/* Built for */}
      <section className="pb-4">
        <div className="mx-auto max-w-2xl px-5 sm:px-8">
          <Reveal>
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-petrol-deep sm:text-[1.9rem]">
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
      </section>

      {/* Capabilities */}
      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <h2 className="font-display text-center text-3xl font-extrabold tracking-tight text-petrol-deep sm:text-[2.2rem]">
              {data.capabilitiesHeading}
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {data.capabilities.map((c, i) => (
              <Reveal key={c.title} delay={(i % 3) * 80}>
                <div className="h-full rounded-2xl border border-hair bg-white p-6">
                  <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-mint/15">
                    <Check className="h-4 w-4 text-mint-deep" strokeWidth={2.6} />
                  </div>
                  <h3 className="font-display text-[16px] font-bold text-ink">{c.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{c.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Proof */}
      <section className="border-y border-hair bg-tint/50 py-12">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <Reveal>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-faint">
              Proven in production
            </p>
            <p className="mt-3 text-pretty text-[16px] leading-relaxed text-muted">
              ST Courier, an international courier network, runs its entire operation on Voxarel
              across more than 5 branches, moving freight between the Gulf and India, with bookings,
              warehouse, finance and cash settlement on one platform.
            </p>
          </Reveal>
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
            {data.faqs.map((f, i) => (
              <Reveal key={f.q} delay={(i % 3) * 70}>
                <div className="rounded-2xl border border-hair bg-white p-6">
                  <h3 className="font-display text-[16px] font-bold text-ink">{f.q}</h3>
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
