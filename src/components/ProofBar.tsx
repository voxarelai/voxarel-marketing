/* eslint-disable @next/next/no-img-element */
import { Reveal } from "@/components/Reveal";

export function ProofBar() {
  return (
    <section className="border-y border-hair bg-tint/60">
      <Reveal>
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-4 px-5 py-10 sm:flex-row sm:gap-8 sm:px-8">
          <p className="text-center text-[15px] leading-relaxed text-muted sm:text-left">
            <span className="font-bold text-ink">Running real operations today.</span> Voxarel is
            live in production at ST&nbsp;Courier — an international courier network moving
            shipments between the Gulf and India.
          </p>
          <img
            src="/stcourier-logo.svg"
            alt="ST Courier"
            className="h-9 w-auto shrink-0 opacity-90"
          />
        </div>
      </Reveal>
    </section>
  );
}
