import { Check } from "@/components/icons";
import { Reveal } from "@/components/Reveal";

const points = [
  "Plain-language answers, pulled from your live data",
  "Flags approvals the moment they need sign-off",
  "Works where your team already is: web and WhatsApp",
];

export function PulseSection() {
  return (
    <section id="pulse" className="scroll-mt-20 border-y border-hair bg-tint/60 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div>
              <p className="font-display text-[12px] font-bold uppercase tracking-[0.22em] text-mint-deep">
                Pulse, built-in AI
              </p>
              <div className="mt-3.5 h-[6px] w-[86px] rounded-[3px] bg-mint" />
              <h2 className="font-display mt-5 text-balance text-3xl font-extrabold tracking-tight text-petrol-deep sm:text-[2.6rem] sm:leading-[1.15]">
                Ask your operation anything.
              </h2>
              <p className="mt-5 text-pretty text-lg leading-relaxed text-muted">
                Pulse answers from your live data (shipments, approvals, stock, cash), so your
                team stops digging through reports and starts asking questions.
              </p>
              <ul className="mt-8 space-y-3.5">
                {points.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-[15.5px] font-bold text-ink">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mint/20">
                      <Check className="h-3 w-3 text-mint-deep" strokeWidth={2.6} />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Chat mock */}
          <Reveal delay={120}>
            <div className="mx-auto w-full max-w-md rounded-2xl border border-hair bg-white shadow-[0_24px_64px_-24px_rgba(16,64,80,0.3)]">
              <div className="flex items-center gap-3 border-b border-hair px-5 py-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-petrol font-display text-[13px] font-bold text-mint-bright">
                  P
                </span>
                <div>
                  <div className="text-[14px] font-bold text-ink">Pulse</div>
                  <div className="flex items-center gap-1.5 text-[11px] text-mint-deep">
                    <span className="h-1.5 w-1.5 rounded-full bg-mint" />
                    Connected to your live data
                  </div>
                </div>
              </div>
              <div className="space-y-3 px-5 py-6 text-[13.5px] leading-relaxed">
                <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-petrol px-4 py-2.5 text-white">
                  Anything stuck this week?
                </div>
                <div className="w-fit max-w-[90%] rounded-2xl rounded-bl-md border border-hair bg-tint/70 px-4 py-2.5 text-ink">
                  Two shipments haven&apos;t moved in 3 days: <b>S-DXB-00226</b> (customs hold) and{" "}
                  <b>S-DXB-00219</b> (awaiting payment).
                </div>
                <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-petrol px-4 py-2.5 text-white">
                  And what&apos;s waiting on me?
                </div>
                <div className="w-fit max-w-[90%] rounded-2xl rounded-bl-md border border-hair bg-tint/70 px-4 py-2.5 text-ink">
                  3 surcharges and 1 sea-to-air upgrade are pending your approval. The upgrade has
                  been waiting 2 days.
                </div>
              </div>
              <div className="border-t border-hair px-5 py-3.5">
                <div className="flex items-center justify-between rounded-xl border border-hair bg-tint/50 px-4 py-2.5 text-[13px] text-faint">
                  Ask Pulse anything…
                  <span className="font-bold text-mint-deep">→</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
