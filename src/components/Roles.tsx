import { Reveal } from "@/components/Reveal";

const roles = [
  {
    role: "CEO / Owner",
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
    <section id="roles" className="scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.55fr] lg:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-24">
              <p className="font-display inline-flex items-center gap-2.5 text-[12px] font-medium uppercase tracking-[0.15em] text-mint-deep">
                <span className="h-1.5 w-1.5 rounded-full bg-mint" />
                Built for the whole team
              </p>
              <h2 className="font-display mt-4 text-balance text-3xl font-medium tracking-tight text-petrol-deep sm:text-[2.6rem] sm:leading-[1.08]">
                Every role gets exactly what they need.
              </h2>
              <p className="mt-5 text-pretty text-lg leading-relaxed text-muted">
                One platform, seven very different jobs. Each person sees their own work, not
                everyone else&apos;s.
              </p>
            </div>
          </Reveal>

          <div className="border-t border-hair">
            {roles.map((r, i) => (
              <Reveal key={r.role} delay={i * 40}>
                <div className="grid gap-1 border-b border-hair px-1 py-5 transition-colors hover:bg-tint sm:grid-cols-[180px_1fr] sm:items-baseline sm:gap-5">
                  <span className="font-display text-[13px] font-medium uppercase tracking-wide text-petrol">
                    {r.role}
                  </span>
                  <span className="text-[15px] leading-relaxed text-muted">{r.prop}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
