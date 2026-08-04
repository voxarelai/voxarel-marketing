"use client";

import { ArrowRight } from "@/components/icons";
import { ProductMock } from "@/components/ProductMock";
import { Reveal } from "@/components/Reveal";
import { DEMO_URL } from "@/lib/site";
import { track } from "@/lib/analytics";

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-36 sm:pb-24 sm:pt-44">
      {/* Background: faint grid + mint glow */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(226,236,233,0.7) 1px, transparent 1px), linear-gradient(to bottom, rgba(226,236,233,0.7) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 90% 70% at 50% 0%, black 35%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 70% at 50% 0%, black 35%, transparent 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -top-48 left-1/2 -z-10 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-mint/20 blur-3xl"
      />

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="font-display text-[12px] font-bold uppercase tracking-[0.22em] text-mint-deep">
              The logistics platform
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="font-display mt-5 text-balance text-[2.5rem] font-extrabold leading-[1.08] tracking-tight text-petrol-deep sm:text-6xl">
              The operating system for logistics.
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted sm:text-xl">
              Bookings, warehouse, finance and field teams, unified into one real-time system of
              record, from the first quote to the final settlement.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={DEMO_URL}
                onClick={() => track("cta_demo_click", { placement: "hero" })}
                className="group inline-flex h-[52px] items-center justify-center gap-2 rounded-xl bg-petrol px-8 text-[16px] font-bold text-white shadow-[0_8px_24px_-8px_rgba(16,64,80,0.5)] transition-all hover:bg-petrol-deep"
              >
                Book a demo
                <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#product"
                onClick={() => track("cta_tour_click", { placement: "hero" })}
                className="inline-flex h-[52px] items-center justify-center rounded-xl border border-hair bg-white px-8 text-[16px] font-bold text-petrol transition-colors hover:bg-tint"
              >
                See it live
              </a>
            </div>
          </Reveal>
        </div>

        <div id="product" className="scroll-mt-24">
          <Reveal delay={200} className="mt-16 sm:mt-20">
            <ProductMock />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
