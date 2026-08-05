"use client";

import { ArrowRight } from "@/components/icons";
import { ProductMock } from "@/components/ProductMock";
import { BrandRings } from "@/components/BrandRings";
import { Reveal } from "@/components/Reveal";
import { DEMO_URL } from "@/lib/site";
import { track } from "@/lib/analytics";

export function Hero() {
  return (
    <section className="relative overflow-clip pb-12 pt-32 sm:pb-16 sm:pt-40">
      <BrandRings className="pointer-events-none absolute -top-40 right-[-120px] -z-10 w-[min(780px,72vw)]" />

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal eager>
          <p className="font-display inline-flex items-center gap-2.5 text-[12px] font-medium uppercase tracking-[0.15em] text-mint-deep">
            <span className="h-1.5 w-1.5 rounded-full bg-mint" />
            The logistics platform
          </p>
        </Reveal>

        <Reveal eager delay={80}>
          <h1 className="font-display mt-5 max-w-[16ch] text-balance text-[2.6rem] font-medium leading-[1.02] tracking-tight text-petrol-deep sm:text-[4rem]">
            The operating system for logistics.
          </h1>
        </Reveal>

        <Reveal eager delay={160}>
          <p className="mt-6 max-w-[52ch] text-pretty text-lg leading-relaxed text-muted sm:text-xl">
            Bookings, warehouse, finance and field teams, unified into one real-time system of
            record, from the first quote to the final settlement.
          </p>
        </Reveal>

        <Reveal eager delay={240}>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <a
              href={DEMO_URL}
              onClick={() => track("cta_demo_click", { placement: "hero" })}
              className="group inline-flex h-[46px] items-center justify-center gap-2 rounded-lg bg-petrol px-5 font-display text-[15px] font-medium text-white transition-colors hover:bg-petrol-deep"
            >
              Book a demo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#product"
              onClick={() => track("cta_tour_click", { placement: "hero" })}
              className="group inline-flex items-center gap-1.5 font-display text-[15px] font-medium text-petrol"
            >
              See it live
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </Reveal>
      </div>

      <div id="product" className="mx-auto mt-14 max-w-[80rem] scroll-mt-24 px-5 sm:mt-16 sm:px-8">
        <Reveal delay={120}>
          <ProductMock />
        </Reveal>
      </div>
    </section>
  );
}
