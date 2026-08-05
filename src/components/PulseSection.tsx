import { Check } from "@/components/icons";
import { Reveal } from "@/components/Reveal";

const points = [
  "Plain-language answers, pulled from your live data",
  "Flags approvals the moment they need sign-off",
  "Works where your team already is: web and WhatsApp",
];

export function PulseSection() {
  return (
    <section id="pulse" className="scroll-mt-20 border-y border-hair bg-ivory py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div>
              <p className="font-display inline-flex items-center gap-2.5 text-[12px] font-medium uppercase tracking-[0.15em] text-mint-deep">
                <span className="h-1.5 w-1.5 rounded-full bg-mint" />
                Pulse · built-in AI
              </p>
              <h2 className="font-display mt-4 text-balance text-3xl font-medium tracking-tight text-petrol-deep sm:text-[2.6rem] sm:leading-[1.08]">
                Ask your operation anything.
              </h2>
              <p className="mt-5 text-pretty text-lg leading-relaxed text-muted">
                Pulse answers from your live data (shipments, approvals, stock, cash), so your team
                stops digging through reports and starts asking questions.
              </p>
              <ul className="mt-8 border-t border-hair">
                {points.map((p) => (
                  <li
                    key={p}
                    className="font-display flex items-start gap-3 border-b border-hair py-4 text-[15px] font-medium text-ink"
                  >
                    <span className="mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full bg-tint-2 text-petrol">
                      <Check className="h-3 w-3" strokeWidth={2.6} />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="frame-elevate overflow-hidden rounded-xl border border-hair bg-white">
              <div className="flex items-center gap-3 border-b border-hair px-5 py-3.5">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-petrol font-display text-[13px] font-semibold text-mint-bright">
                  P
                </span>
                <div>
                  <div className="font-display text-[14px] font-semibold text-ink">Pulse</div>
                  <div className="mt-0.5 flex items-center gap-1.5 text-[11.5px] text-mint-deep">
                    <span className="h-1.5 w-1.5 rounded-full bg-mint" />
                    Connected to your live data
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 px-5 py-5 text-[13.5px] leading-relaxed">
                <div className="ml-auto max-w-[86%] rounded-2xl rounded-br-[5px] bg-petrol px-3.5 py-2.5 text-white">
                  Anything stuck this week?
                </div>
                <div className="max-w-[90%] rounded-2xl rounded-bl-[5px] border border-hair bg-tint px-3.5 py-2.5 text-ink">
                  Two shipments haven&apos;t moved in 3 days:{" "}
                  <b className="font-mono text-[12.5px] font-medium text-petrol-deep">S-DXB-00226</b>{" "}
                  (customs hold) and{" "}
                  <b className="font-mono text-[12.5px] font-medium text-petrol-deep">S-DXB-00219</b>{" "}
                  (awaiting payment).
                </div>
                <div className="ml-auto max-w-[86%] rounded-2xl rounded-br-[5px] bg-petrol px-3.5 py-2.5 text-white">
                  And what&apos;s waiting on me?
                </div>
                <div className="max-w-[90%] rounded-2xl rounded-bl-[5px] border border-hair bg-tint px-3.5 py-2.5 text-ink">
                  3 surcharges and 1 sea-to-air upgrade are pending your approval. The upgrade has
                  been waiting 2 days.
                </div>
              </div>
              <div className="border-t border-hair px-5 py-3.5">
                <div className="flex items-center justify-between rounded-lg border border-hair bg-tint px-3.5 py-2.5 text-[13px] text-faint">
                  Ask Pulse anything…
                  <span className="font-semibold text-petrol">→</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
