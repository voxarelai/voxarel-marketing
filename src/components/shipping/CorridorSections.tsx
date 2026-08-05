import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "@/components/icons";
import { BrandRings } from "@/components/BrandRings";
import { Reveal } from "@/components/Reveal";
import { DEMO_URL, TRACK_URL } from "@/lib/site";
import { lanes, type Lane } from "@/lib/lanes";

// Standard India import documents (direction-agnostic across Gulf to India lanes).
const importDocs = [
  "Commercial invoice",
  "Packing list",
  "Certificate of origin (for CEPA duty benefit)",
  "Bill of lading (sea) or airway bill (air)",
  "Payment terms or letter of credit, where applicable",
];

export function laneFaqs(l: Lane): { q: string; a: string }[] {
  const air = l.airTransit === "n/a" ? null : l.airTransit;
  return [
    {
      q: `How long does cargo take from ${l.origin} to ${l.destination}?`,
      a: `By sea, cargo on the ${l.origin} to ${l.destination} lane typically takes ${l.seaTransit} port to port, and longer door to door once customs and inland delivery are added${
        air ? `. By air, it moves in ${air}` : ""
      }. Voxarel tracks every document against the shipment so customs delays are caught early.`,
    },
    {
      q: `How are ${l.origin} to ${l.destination} shipping rates calculated?`,
      a: `Rates are quoted per kg for air, and per CBM or per container for sea, on chargeable weight (the greater of actual weight or volume), plus surcharges and destination handling. Voxarel prices the lane from your own corridor rates and returns an instant quote.`,
    },
    {
      q: `What is the cheapest way to ship from ${l.origin} to ${l.destination}?`,
      a: `Sea freight is cheapest for anything that is not urgent, especially as a full container (FCL) or a shared consolidation (LCL). Air is faster but costs more per kg, so it suits urgent, high-value or perishable cargo.`,
    },
    {
      q: `What documents are needed to ship from ${l.origin} to India?`,
      a: `Usually a commercial invoice, packing list, certificate of origin, and a bill of lading (sea) or airway bill (air), plus payment terms where applicable. Under the India-UAE CEPA, a valid certificate of origin can reduce or remove customs duty. Voxarel keeps each document attached to the shipment and flags what is missing before dispatch.`,
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

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="border-b border-hair py-8" id={id}>
      <h3 className="font-display text-[19px] font-medium tracking-tight text-ink">{title}</h3>
      <div className="mt-3 max-w-[70ch] space-y-3 text-[15.5px] leading-relaxed text-muted">
        {children}
      </div>
    </div>
  );
}

export function CorridorSections({ lane: l }: { lane: Lane }) {
  const air = l.airTransit === "n/a" ? null : l.airTransit;
  const facts = [
    { big: l.seaTransit, unit: "", label: "Sea transit" },
    air ? { big: air, unit: "", label: "Air transit" } : { big: "Sea only", unit: "", label: "Mode" },
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
  const related = lanes
    .filter((x) => x.slug !== l.slug && (x.origin === l.origin || x.destination === l.destination))
    .slice(0, 5);

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
              {l.origin} to {l.destination}: sea &amp; air cargo, on one system.
            </h1>
          </Reveal>
          <Reveal eager delay={160}>
            <p className="mt-6 max-w-[56ch] text-pretty text-lg leading-relaxed text-muted sm:text-xl">
              {l.blurb} Sea freight in {l.seaTransit}
              {air ? `, air cargo in ${air}` : ""}. Book, track, clear and settle every shipment on
              Voxarel, with cash on delivery in rupees, customs docs and reconciliation in one place.
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
            Via {l.originPort} and {l.destPort}. Common commodities: {l.commodities.join(", ")}.
          </p>
        </div>
      </section>

      {/* Informational content (earns the high-intent ranking) */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <div className="max-w-[70ch]">
              <h2 className="font-display text-3xl font-medium tracking-tight text-petrol-deep sm:text-[2.2rem]">
                Shipping from {l.origin} to {l.destination}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted">
                Whether you move a full container, a consolidated LCL shipment or urgent air cargo,
                here is how the {l.origin} to {l.destination} lane works, and how Voxarel runs it end
                to end.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="mt-10 border-t border-hair">
              <Section id="sea" title={`Sea freight from ${l.origin} to ${l.destination}`}>
                <p>
                  Ocean cargo sails from {l.originPort} to {l.destPort}, typically {l.seaTransit}{" "}
                  port to port. Move a full container (FCL) or share space in a consolidation (LCL);
                  LCL is billed on chargeable weight, the greater of actual weight or volume. The
                  great-circle distance on this lane is about{" "}
                  {l.distanceKm.toLocaleString("en-US")} km.
                </p>
              </Section>

              <Section id="air" title={`Air cargo from ${l.origin} to ${l.destination}`}>
                {air ? (
                  <p>
                    Air freight from {l.origin} ({l.originCode}) to {l.destination} ({l.destCode})
                    moves in {air}, best for urgent, high-value or perishable cargo. Air is billed on
                    chargeable weight, the greater of actual kilos or volumetric weight.
                  </p>
                ) : (
                  <p>
                    This lane is served as an ocean port-to-port route. For time-critical cargo, pair
                    it with an air leg from a nearby Gulf gateway; Voxarel books and tracks both legs
                    on the same shipment.
                  </p>
                )}
              </Section>

              <Section id="transit" title={`${l.origin} to ${l.destination} transit time`}>
                <p>
                  By sea: {l.seaTransit} port to port, longer door to door once customs and inland
                  delivery are added{air ? `. By air: ${air}` : ""}. Customs clearance at{" "}
                  {l.destination} adds time when documents are incomplete, which is why Voxarel tracks
                  every document against the shipment.
                </p>
              </Section>

              <Section
                id="rates"
                title={`${l.origin} to ${l.destination} shipping rates and customs duty`}
              >
                <p>
                  Rates are quoted per kg for air, and per CBM or per container for sea, on
                  chargeable weight, plus surcharges and destination handling. Under the India-UAE
                  CEPA (in force since May 2022), many goods qualify for reduced or zero customs duty
                  with a valid certificate of origin. Voxarel prices the lane from your own corridor
                  rates and returns an instant quote, no rate sheets to dig through.
                </p>
              </Section>

              <Section
                id="customs"
                title={`Customs and documents for ${l.origin} to ${l.destination}`}
              >
                <p>Clearing cargo into India from the UAE usually needs:</p>
                <ul className="space-y-2">
                  {importDocs.map((d) => (
                    <li key={d} className="flex gap-2.5 text-[15px] text-muted">
                      <Check className="mt-[5px] h-3.5 w-3.5 shrink-0 text-mint-deep" strokeWidth={2.6} />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
                <p>
                  Voxarel keeps each document attached to the shipment and flags what is missing
                  before dispatch, so a shipment never leaves incomplete.
                </p>
              </Section>
            </div>
          </Reveal>
        </div>
      </section>

      {/* How Voxarel runs this lane (software / conversion) */}
      <section className="border-t border-hair bg-ivory py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <div className="max-w-[60ch]">
              <p className="font-display inline-flex items-center gap-2.5 text-[12px] font-medium uppercase tracking-[0.15em] text-mint-deep">
                <span className="h-1.5 w-1.5 rounded-full bg-mint" />
                Built for this lane
              </p>
              <h2 className="font-display mt-4 text-3xl font-medium tracking-tight text-petrol-deep sm:text-[2.2rem]">
                Run the {l.origin} to {l.destination} lane on Voxarel.
              </h2>
            </div>
          </Reveal>
          <Reveal>
            <div className="mt-10 border-t border-hair">
              {capabilities.map((c, i) => (
                <div key={c.h} className="grid grid-cols-[42px_1fr] gap-3.5 border-b border-hair py-7">
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
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <h2 className="font-display text-3xl font-medium tracking-tight text-petrol-deep sm:text-[2.2rem]">
              {l.origin} to {l.destination} shipping, answered.
            </h2>
          </Reveal>
          <div className="mt-10 max-w-[74ch] border-t border-hair">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={(i % 3) * 60}>
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

      {/* Related corridors (internal linking) */}
      {related.length > 0 && (
        <section className="border-t border-hair pb-20 pt-16 sm:pb-28">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <p className="font-display text-[12px] font-medium uppercase tracking-[0.15em] text-faint">
              Related corridors
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/shipping/${r.slug}`}
                  className="font-display rounded-lg border border-hair bg-white px-4 py-2.5 text-[14px] font-medium text-petrol transition-colors hover:bg-tint"
                >
                  {r.origin} to {r.destination}
                </Link>
              ))}
              <Link
                href="/shipping"
                className="font-display inline-flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-[14px] font-medium text-muted transition-colors hover:text-petrol"
              >
                All corridors
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
