import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { TrackExperience } from "@/components/track/TrackExperience";

export const metadata: Metadata = {
  alternates: { canonical: "/track" },
  title: "Track a shipment | Voxarel",
  description:
    "Live tracking for shipments moving on Voxarel. Check status instantly. Verify with a one-time code to see full details.",
  openGraph: {
    title: "Track a shipment | Voxarel",
    description:
      "Live tracking for shipments moving on Voxarel. Check status instantly, verify to see full details.",
    type: "website",
    url: "/track",
    siteName: "Voxarel",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Voxarel: track a shipment",
      },
    ],
  },
};

export default function TrackPage() {
  return (
    <>
      <Navigation />
      <main>
        <TrackExperience />
      </main>
      <Footer />
    </>
  );
}
