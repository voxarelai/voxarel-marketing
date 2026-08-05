import { Reveal } from "@/components/Reveal";

// Proof metrics, approved for launch (Aug 2026). Update if ST Courier figures change.
const stats = [
  { v: "12,000", accent: "+", l: "Shipments a month" },
  { v: "240", accent: "+", l: "Destinations · UAE → India" },
  { v: "99.9", accent: "%", l: "Platform uptime" },
  { v: "7", accent: "yr", l: "Audit trail" },
];

export function ProofBar() {
  return (
    <section className="border-y border-hair bg-ivory">
      <Reveal>
        <div className="mx-auto max-w-6xl px-5 py-9 sm:px-8">
          <div className="flex flex-wrap items-start justify-between gap-x-16 gap-y-5">
            <div>
              <div className="font-display text-[11px] font-medium uppercase tracking-[0.14em] text-faint">
                Live in production at
              </div>
              <div className="font-display mt-1.5 text-[20px] font-semibold tracking-tight text-petrol-deep">
                ST Courier
              </div>
            </div>
            <p className="max-w-[44ch] text-right text-[14.5px] leading-relaxed text-muted max-sm:text-left">
              An international courier network running its entire operation on Voxarel, every branch,
              every booking, every invoice, on one platform.
            </p>
          </div>
          <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-hair pt-6 sm:grid-cols-4 sm:gap-x-10">
            {stats.map((s) => (
              <div key={s.l}>
                <dt className="font-display text-[clamp(28px,3vw,38px)] font-semibold leading-none tracking-tight tabular-nums text-petrol-deep">
                  {s.v}
                  <span className="ml-1 text-[0.62em] font-medium text-mint-deep">{s.accent}</span>
                </dt>
                <dd className="font-display mt-3 text-[11.5px] font-medium uppercase tracking-[0.04em] text-faint">
                  {s.l}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </section>
  );
}
