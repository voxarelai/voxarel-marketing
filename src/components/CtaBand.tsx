"use client";

import Image from "next/image";
import { ArrowRight } from "@/components/icons";
import { Reveal } from "@/components/Reveal";
import { CONTACT_EMAIL, DEMO_URL } from "@/lib/site";
import { track } from "@/lib/analytics";

export function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-petrol-deep py-20 sm:py-28">
      <div
        aria-hidden
        className="absolute -top-32 left-1/2 h-[360px] w-[640px] -translate-x-1/2 rounded-full bg-mint/15 blur-3xl"
      />
      {/* Brand device: rings (04-Elements) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-64 -left-48 h-[680px] w-[680px]"
        style={{
          backgroundImage: "url(/elements/rings.svg)",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-5 text-center sm:px-8">
        <Reveal>
          <Image
            src="/voxarel-logo-white.png"
            alt="Voxarel"
            width={720}
            height={124}
            className="mx-auto mb-8 h-7 w-auto"
          />
          <h2 className="font-display mx-auto max-w-2xl text-balance text-3xl font-extrabold tracking-tight text-white sm:text-[2.6rem] sm:leading-[1.15]">
            See your entire operation on one screen.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-lg leading-relaxed text-[#cfe6df]">
            Book a demo and we&apos;ll walk you through Voxarel on your own workflow — branches,
            corridors, cash and all.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={DEMO_URL}
              onClick={() => track("cta_demo_click", { placement: "cta_band" })}
              className="group inline-flex h-[52px] items-center justify-center gap-2 rounded-xl bg-white px-8 text-[16px] font-bold text-petrol transition-colors hover:bg-tint"
            >
              Book a demo
              <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              onClick={() => track("contact_email_click", { placement: "cta_band" })}
              className="text-[15px] font-bold text-mint-bright underline-offset-4 hover:underline"
            >
              or write to {CONTACT_EMAIL}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
