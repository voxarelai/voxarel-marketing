import { Reveal } from "@/components/Reveal";

const roles = [
  {
    role: "CEO / Business owner",
    prop: "See your entire operation in real time, from anywhere, on one screen.",
  },
  {
    role: "Operations manager",
    prop: "Every branch, every request, every escalation, managed from one live dashboard.",
  },
  {
    role: "Branch manager",
    prop: "See your branch performance, spot problems early, and never compile a report again.",
  },
  {
    role: "Warehouse manager",
    prop: "Scan, track, and move stock faster, with nothing falling through the cracks.",
  },
  {
    role: "Finance manager",
    prop: "From invoice to reconciliation, every transaction tracked, every audit ready.",
  },
  {
    role: "Field agent",
    prop: "Capture orders, check rates, and close your day faster than pen and paper.",
  },
  {
    role: "Driver",
    prop: "Know your route, prove your delivery, settle your cash, all in one app.",
  },
];

export function Roles() {
  return (
    <section id="roles" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <p className="font-display text-[12px] font-bold uppercase tracking-[0.22em] text-mint-deep">
                Built for the whole team
              </p>
              <div className="mt-3.5 h-[6px] w-[86px] rounded-[3px] bg-mint" />
              <h2 className="font-display mt-5 text-balance text-3xl font-extrabold tracking-tight text-petrol-deep sm:text-[2.6rem] sm:leading-[1.15]">
                Every role gets exactly what they need.
              </h2>
              <p className="mt-5 text-pretty text-lg leading-relaxed text-muted">
                One platform, seven very different jobs. Each person sees their own work, not
                everyone else&apos;s.
              </p>
            </div>
          </Reveal>

          <div className="overflow-hidden rounded-2xl border border-hair bg-white">
            {roles.map((r, i) => (
              <Reveal key={r.role} delay={i * 50}>
                <div
                  className={`flex flex-col gap-1 px-6 py-5 transition-colors hover:bg-tint/70 sm:flex-row sm:items-baseline sm:gap-6 sm:px-8 ${
                    i !== 0 ? "border-t border-hair" : ""
                  }`}
                >
                  <span className="font-display w-full shrink-0 text-[13px] font-bold uppercase tracking-wide text-petrol sm:w-48">
                    {r.role}
                  </span>
                  <span className="text-[15.5px] leading-relaxed text-muted">{r.prop}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
