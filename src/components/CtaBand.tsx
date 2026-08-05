"use client";

import { ArrowRight } from "@/components/icons";
import { BrandRings } from "@/components/BrandRings";
import { Reveal } from "@/components/Reveal";
import { CONTACT_EMAIL, DEMO_URL } from "@/lib/site";
import { track } from "@/lib/analytics";

export function CtaBand() {
  return (
    <section className="relative overflow-clip bg-petrol-deep">
      <BrandRings
        className="pointer-events-none absolute -right-40 -top-40 w-[min(680px,60vw)]"
        opacity={[0.2, 0.13, 0.08]}
      />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="max-w-[680px] py-24 sm:py-32">
            <h2 className="font-display text-balance text-3xl font-medium leading-[1.08] tracking-tight text-white sm:text-[2.6rem]">
              See your entire operation on one screen.
            </h2>
            <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-[#cfe6df]">
              Book a demo and we&apos;ll walk you through Voxarel on your own workflow: branches,
              corridors, cash and all.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <a
                href={DEMO_URL}
                onClick={() => track("cta_demo_click", { placement: "cta_band" })}
                className="group inline-flex h-[46px] items-center justify-center gap-2 rounded-lg bg-white px-5 font-display text-[15px] font-medium text-petrol transition-colors hover:bg-tint"
              >
                Book a demo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                onClick={() => track("contact_email_click", { placement: "cta_band" })}
                className="font-display text-[14.5px] font-medium text-mint-bright underline-offset-4 hover:underline"
              >
                or write to {CONTACT_EMAIL}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
