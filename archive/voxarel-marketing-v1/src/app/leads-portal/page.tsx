import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { LeadsPortalHero } from "@/components/LeadsPortal/LeadsPortalHero";
import { HowItWorks } from "@/components/LeadsPortal/HowItWorks";
import { PortalAppShowcase } from "@/components/LeadsPortal/PortalAppShowcase";
import { EmbedShowcase } from "@/components/LeadsPortal/EmbedShowcase";
import { Benefits } from "@/components/LeadsPortal/Benefits";
import { LeadsPortalCTA } from "@/components/LeadsPortal/LeadsPortalCTA";

const SITE_URL = "https://voxarel.com";

export const metadata: Metadata = {
  title:
    "Leads Portal — Embeddable freight quote calculator & lead capture | Voxarel",
  description:
    "Add an instant-quote freight calculator to your website with one line of code. Your rates, your branding — every quote request becomes a lead in your portal.",
  keywords: [
    "freight quote calculator",
    "embeddable shipping calculator",
    "freight lead capture",
    "freight forwarder website",
    "instant freight quote",
    "shipping rate widget",
  ],
  alternates: {
    canonical: "/leads-portal",
  },
  openGraph: {
    title: "Voxarel Leads Portal — Embeddable freight quote calculator",
    description:
      "Add an instant-quote freight calculator to your website. Your rates, your branding, every visitor a lead.",
    url: `${SITE_URL}/leads-portal`,
    siteName: "Voxarel",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Voxarel Leads Portal — Embeddable freight quote calculator",
    description:
      "Add an instant-quote freight calculator to your website. Your rates, your branding, every visitor a lead.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Voxarel Leads Portal",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: `${SITE_URL}/leads-portal`,
  description:
    "Embeddable instant-quote freight calculator and lead capture for freight forwarders.",
  provider: {
    "@type": "Organization",
    name: "Voxarel",
    url: SITE_URL,
  },
};

export default function LeadsPortalPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />
      <LeadsPortalHero />
      <HowItWorks />
      <PortalAppShowcase />
      <EmbedShowcase />
      <Benefits />
      <LeadsPortalCTA />
      <Footer />
    </main>
  );
}
