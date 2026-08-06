import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { CorridorSections, laneFaqs } from "@/components/shipping/CorridorSections";
import { faqPageSchema } from "@/components/landing/LandingSections";
import { lanes, getLane, laneTitle, type Lane } from "@/lib/lanes";
import { SITE_URL } from "@/lib/site";

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
  const url = `/shipping/${l.slug}`;
  const title = `${l.origin} to ${l.destination} cargo & courier software | Voxarel`;
  const description = `Ship ${l.origin} to ${l.destination} on one system: sea and air freight (${l.seaTransit} by sea), instant bookings, approval flows, customs docs and live tracking with Voxarel.`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      type: "website",
      url,
      siteName: "Voxarel",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: `Voxarel ${laneTitle(l)} shipping software` }],
    },
  };
}

function breadcrumbSchema(l: Lane) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Corridors", item: `${SITE_URL}/shipping` },
      {
        "@type": "ListItem",
        position: 2,
        name: `${l.origin} to ${l.destination}`,
        item: `${SITE_URL}/shipping/${l.slug}`,
      },
    ],
  };
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
      <JsonLd data={[faqPageSchema(laneFaqs(l)), breadcrumbSchema(l)]} />
    </>
  );
}
