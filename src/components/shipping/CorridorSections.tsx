import { ArrowRight } from "@/components/icons";
import { BrandRings } from "@/components/BrandRings";
import { Reveal } from "@/components/Reveal";
import { DEMO_URL, TRACK_URL } from "@/lib/site";
import type { Lane } from "@/lib/lanes";

export function laneFaqs(l: Lane): { q: string; a: string }[] {
  const air = l.airTransit === "n/a" ? null : l.airTransit;
  return [
    {
      q: `How long does cargo take from ${l.origin} to ${l.destination}?`,
      a: `By sea, cargo on the ${l.origin} to ${l.destination} lane typically takes ${l.seaTransit} door to door${
        air ? `; by air, ${air}` : ""
      }. Customs clearance at ${l.destination} adds time when paperwork is incomplete, which is why Voxarel tracks every document against the shipment.`,
    },
    {
      q: `What documents are needed to ship from ${l.origin} to India?`,
      a: "Usually a commercial invoice, packing list, airway bill or bill of lading, and any commodity-specific certificates. Voxarel keeps each document attached to the shipment and flags what is missing before dispatch.",
    },
    {
      q: `Can I collect cash on delivery in ${l.destination}?`,
      a: `Yes. Voxarel collects and reconciles cash on delivery in INR at ${l.destination}, settled per driver and branch, and matched back to your AED accounts.`,
    },
    {
      q: `Does Voxarel handle consolidation on the ${l.origin} to ${l.destination} lane?`,
      a: `Yes. Consolidate many shippers into one ${l.origin} to ${l.destination} movement, build the container manifest, and split costs and cash back to each customer automatically.`,
    },
  ];
}

export function CorridorSections({ lane: l }: { lane: Lane }) {
  const air = l.airTransit === "n/a" ? null : l.airTransit;
  const facts = [
    { big: l.seaTransit, unit: "", label: "Sea transit" },
    air
      ? { big: air, unit: "", label: "Air transit" }
      : { big: "Sea only", unit: "", label: "Mode" },
    { big: `~${l.distanceKm.toLocaleString("en-US")}`, unit: "km", label: "Distance" },
    { big: "AED · INR", unit: "", label: "Dual-currency COD" },
  ];
  const capabilities = [
    {
      h: "Corridor rates",
      p: `Price the ${l.origin} to ${l.destination} lane the way you actually quote it, sea and air, per kg and per CBM, with surcharges and exchange built in.`,
    },
    {
      h: "Customs and documents",
      p: `AWB, commercial invoice, packing list and Indian import paperwork tracked against each shipment, with approvals before anything moves.`,
    },
    {
      h: "Cash on delivery in rupees",
      p: `Collect and reconcile COD in INR at ${l.destination}, settled per driver and per branch, matched back to your AED books.`,
    },
    {
      h: "Live tracking, pickup to last mile",
      p: `Public tracking by AWB from ${l.origin} pickup to ${l.destination} delivery, with alerts the moment a shipment sits too long in customs.`,
    },
  ];
  const faqs = laneFaqs(l);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-clip pt-28 pb-14 sm:pt-36 sm:pb-16">
        <BrandRings className="pointer-events-none absolute -top-40 right-[-120px] -z-10 w-[min(720px,68vw)]" />
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <p className="mb-5 font-mono text-[12.5px] text-faint">
            Corridors / UAE → India / {l.origin} to {l.destination}
          </p>
          <Reveal eager>
            <p className="font-display inline-flex items-center gap-2.5 text-[12px] font-medium uppercase tracking-[0.15em] text-mint-deep">
              <span className="h-1.5 w-1.5 rounded-full bg-mint" />
              Gulf → India corridor
            </p>
          </Reveal>
          <Reveal eager delay={80}>
            <h1 className="font-display mt-5 max-w-[20ch] text-balance text-[2.3rem] font-medium leading-[1.04] tracking-tight text-petrol-deep sm:text-[3.3rem]">
              {l.origin} to {l.destination} cargo and courier, on one system.
            </h1>
          </Reveal>
          <Reveal eager delay={160}>
            <p className="mt-6 max-w-[56ch] text-pretty text-lg leading-relaxed text-muted sm:text-xl">
              {l.blurb} Book, track, clear and settle every shipment on Voxarel, with cash on
              delivery in rupees, customs docs and reconciliation in one place.
            </p>
          </Reveal>

          {/* route visual */}
          <Reveal eager delay={220}>
            <div className="mt-8 flex max-w-[620px] items-center gap-4">
              <div>
                <div className="font-display text-[15px] font-semibold text-petrol-deep">
                  {l.origin}
                </div>
                <div className="mt-1 font-mono text-[11.5px] text-faint">{l.originCode} · UAE</div>
              </div>
              <div className="relative h-px flex-1 bg-gradient-to-r from-hair via-mint to-hair">
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#fcfcfb] px-2.5 font-mono text-[11px] text-mint-deep">
                  {air ? "sea + air" : "sea"}
                </span>
              </div>
              <div className="text-right">
                <div className="font-display text-[15px] font-semibold text-petrol-deep">
                  {l.destination}
                </div>
                <div className="mt-1 font-mono text-[11.5px] text-faint">{l.destCode} · India</div>
              </div>
            </div>
          </Reveal>

          <Reveal eager delay={280}>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <a
                href={DEMO_URL}
                className="group inline-flex h-[46px] items-center justify-center gap-2 rounded-lg bg-petrol px-5 font-display text-[15px] font-medium text-white transition-colors hover:bg-petrol-deep"
              >
                Book a demo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href={TRACK_URL}
                className="group inline-flex items-center gap-1.5 font-display text-[15px] font-medium text-petrol"
              >
                Track a shipment
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Corridor facts */}
      <section className="pb-2">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-hair bg-hair sm:grid-cols-4">
              {facts.map((f) => (
                <div key={f.label} className="bg-white px-5 py-4">
                  <div className="font-display text-[clamp(20px,2.4vw,26px)] font-semibold leading-none tracking-tight text-petrol-deep">
                    {f.big}
                    {f.unit && (
                      <span className="ml-1 text-[0.6em] font-medium text-mint-deep">{f.unit}</span>
                    )}
                  </div>
                  <div className="mt-2.5 font-display text-[11px] font-medium uppercase tracking-[0.05em] text-faint">
                    {f.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          <p className="mt-3.5 max-w-[70ch] text-[13.5px] text-faint">
            Typical door-to-door times for the {l.origin} to {l.destination} lane via{" "}
            {l.originPort} and {l.destPort}. Common commodities: {l.commodities.join(", ")}.
          </p>
        </div>
      </section>

      {/* How Voxarel runs this lane */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <div className="max-w-[60ch]">
              <p className="font-display inline-flex items-center gap-2.5 text-[12px] font-medium uppercase tracking-[0.15em] text-mint-deep">
                <span className="h-1.5 w-1.5 rounded-full bg-mint" />
                Built for this lane
              </p>
              <h2 className="font-display mt-4 text-3xl font-medium tracking-tight text-petrol-deep sm:text-[2.2rem]">
                Everything the {l.origin} to {l.destination} lane needs.
              </h2>
            </div>
          </Reveal>
          <Reveal>
            <div className="mt-10 border-t border-hair">
              {capabilities.map((c, i) => (
                <div
                  key={c.h}
                  className="grid grid-cols-[42px_1fr] gap-3.5 border-b border-hair py-7"
                >
                  <div className="font-mono text-[12.5px] tabular-nums text-mint-deep">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h3 className="font-display text-[19px] font-medium tracking-tight text-ink">
                      {c.h}
                    </h3>
                    <p className="mt-2 max-w-[52ch] text-[14.5px] leading-relaxed text-muted">
                      {c.p}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-hair py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <h2 className="font-display text-3xl font-medium tracking-tight text-petrol-deep sm:text-[2.2rem]">
              {l.origin} to {l.destination} shipping, answered.
            </h2>
          </Reveal>
          <div className="mt-10 max-w-[74ch] border-t border-hair">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={(i % 3) * 70}>
                <div className="border-b border-hair py-6">
                  <h3 className="font-display text-[17px] font-medium tracking-tight text-ink">
                    {f.q}
                  </h3>
                  <p className="mt-2.5 max-w-[68ch] text-[15px] leading-relaxed text-muted">{f.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
