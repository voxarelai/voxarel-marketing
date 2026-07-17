import type { ReactNode } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export type LegalSection = {
  title: string;
  paragraphs: ReactNode[];
  bullets?: ReactNode[];
};

export function LegalPage({
  kicker,
  title,
  intro,
  effective,
  sections,
}: {
  kicker: string;
  title: string;
  intro: string;
  effective: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <Navigation />
      <main className="pb-24 pt-36 sm:pt-44">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <p className="font-display text-[12px] font-bold uppercase tracking-[0.22em] text-mint-deep">
            {kicker}
          </p>
          <div className="mt-3.5 h-[6px] w-[86px] rounded-[3px] bg-mint" />
          <h1 className="font-display mt-5 text-balance text-4xl font-extrabold tracking-tight text-petrol-deep sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-muted">{intro}</p>
          <p className="mt-4 text-[13.5px] font-bold uppercase tracking-wide text-faint">
            Effective {effective}
          </p>

          <div className="mt-12 space-y-10 border-t border-hair pt-10">
            {sections.map((s, i) => (
              <section key={s.title}>
                <h2 className="font-display flex items-baseline gap-3 text-[19px] font-bold text-petrol-deep">
                  <span className="text-[13px] font-extrabold tabular-nums text-mint-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.title}
                </h2>
                <div className="mt-3 space-y-3">
                  {s.paragraphs.map((p, j) => (
                    <p key={j} className="text-[15.5px] leading-relaxed text-muted">
                      {p}
                    </p>
                  ))}
                </div>
                {s.bullets && (
                  <ul className="mt-3 space-y-2.5">
                    {s.bullets.map((b, j) => (
                      <li key={j} className="flex gap-3 text-[15.5px] leading-relaxed text-muted">
                        <span className="mt-[8px] h-[7px] w-[7px] shrink-0 rounded-[2px] bg-mint" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
