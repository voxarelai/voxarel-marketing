/* eslint-disable @next/next/no-img-element */
import { Reveal } from "@/components/Reveal";

const facts = [
  { n: "5+", l: "branches live" },
  { n: "Sea + air", l: "freight" },
  { n: "7 yr", l: "audit trail" },
];

export function ProofBar() {
  return (
    <section className="border-y border-hair bg-tint/60">
      <Reveal>
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-7 px-5 py-10 sm:flex-row sm:gap-10 sm:px-8">
          <div className="flex shrink-0 flex-col items-center gap-3 sm:items-start">
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-faint">
              Live in production at
            </span>
            <img
              src="/stcourier-logo.svg"
              alt="ST Courier"
              className="h-9 w-auto opacity-90"
            />
          </div>

          <div className="hidden h-14 w-px shrink-0 bg-hair sm:block" />

          <p className="max-w-sm text-center text-[15px] leading-relaxed text-muted sm:text-left">
            An international courier network running its entire operation on Voxarel.
            Every branch, every booking, every invoice, on one platform.
          </p>

          <dl className="flex shrink-0 gap-8 sm:ml-auto sm:gap-9">
            {facts.map((f) => (
              <div key={f.l} className="text-center sm:text-left">
                <dt className="font-display text-[26px] font-extrabold leading-none tracking-tight text-petrol-deep">
                  {f.n}
                </dt>
                <dd className="mt-1.5 text-[12.5px] font-bold uppercase tracking-wide text-faint">
                  {f.l}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </section>
  );
}
