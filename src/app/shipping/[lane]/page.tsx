import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { CorridorSections, laneFaqs } from "@/components/shipping/CorridorSections";
import { faqPageSchema } from "@/components/landing/LandingSections";
import { lanes, getLane, laneTitle } from "@/lib/lanes";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/metadata";

export function generateStaticParams() {
  return lanes.map((l) => ({ lane: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lane: string }>;
}): Promise<Metadata> {
  const { lane } = await params;
  const l = getLane(lane);
  if (!l) return {};
  return pageMeta({
    path: `/shipping/${l.slug}`,
    title: `${l.origin} to ${l.destination} cargo & courier software`,
    description: `Ship ${l.origin} to ${l.destination} on one system: sea and air freight (${l.seaTransit} by sea), instant bookings, approval flows, customs docs and live tracking with Voxarel.`,
    ogImageAlt: `Voxarel ${laneTitle(l)} shipping software`,
  });
}

export default async function LanePage({ params }: { params: Promise<{ lane: string }> }) {
  const { lane } = await params;
  const l = getLane(lane);
  if (!l) notFound();
  return (
    <>
      <Navigation />
      <main>
        <CorridorSections lane={l} />
      </main>
      <CtaBand />
      <Footer />
      <JsonLd
        data={[
          faqPageSchema(laneFaqs(l)),
          breadcrumbSchema([
            { label: "Home", href: "/" },
            { label: "Corridors", href: "/shipping" },
            { label: laneTitle(l), href: `/shipping/${l.slug}` },
          ]),
        ]}
      />
    </>
  );
}
