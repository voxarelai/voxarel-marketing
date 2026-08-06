import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CtaBand } from "@/components/CtaBand";
import { BrandRings } from "@/components/BrandRings";
import { ArrowRight } from "@/components/icons";
import { Reveal } from "@/components/Reveal";
import { lanes } from "@/lib/lanes";

export const metadata: Metadata = {
  title: "Gulf to India shipping corridors | Voxarel",
  description:
    "Run every Gulf to India cargo and courier lane on one system: Dubai to Chennai, Sharjah to Mumbai, Abu Dhabi to Cochin and more, with rates, customs, cash on delivery and tracking in one place.",
  alternates: { canonical: "/shipping" },
};

export default function ShippingHub() {
  return (
    <>
      <Navigation />
      <main>
        <section className="relative overflow-clip pt-28 pb-10 sm:pt-36 sm:pb-12">
          <BrandRings className="pointer-events-none absolute -top-40 right-[-120px] -z-10 w-[min(720px,68vw)]" />
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <Reveal eager>
              <p className="font-display inline-flex items-center gap-2.5 text-[12px] font-medium uppercase tracking-[0.15em] text-mint-deep">
                <span className="h-1.5 w-1.5 rounded-full bg-mint" />
                Corridors
              </p>
            </Reveal>
            <Reveal eager delay={80}>
              <h1 className="font-display mt-5 max-w-[18ch] text-balance text-[2.4rem] font-medium leading-[1.04] tracking-tight text-petrol-deep sm:text-[3.4rem]">
                Gulf to India shipping, lane by lane.
              </h1>
            </Reveal>
            <Reveal eager delay={160}>
              <p className="mt-6 max-w-[54ch] text-pretty text-lg leading-relaxed text-muted sm:text-xl">
                Every corridor Voxarel runs, on one system: rates, customs, cash on delivery and
                tracking from the first quote to the final settlement.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="pb-24 sm:pb-32">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="border-t border-hair">
              {lanes.map((l) => (
                <Link
                  key={l.slug}
                  href={`/shipping/${l.slug}`}
                  className="group grid grid-cols-[1fr_auto] items-center gap-4 border-b border-hair py-5 transition-colors hover:bg-tint sm:grid-cols-[1.4fr_1fr_auto]"
                >
                  <span className="font-display text-[17px] font-medium tracking-tight text-ink">
                    {l.origin} to {l.destination}
                  </span>
                  <span className="hidden font-mono text-[13px] text-faint sm:block">
                    {l.seaTransit} sea · {l.distanceKm.toLocaleString("en-US")} km
                  </span>
                  <ArrowRight className="h-4 w-4 justify-self-end text-faint transition-all group-hover:translate-x-0.5 group-hover:text-petrol" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <CtaBand />
      <Footer />
    </>
  );
}
