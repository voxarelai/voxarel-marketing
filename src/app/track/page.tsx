import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { TrackExperience } from "@/components/track/TrackExperience";

export const metadata: Metadata = {
  alternates: { canonical: "/track" },
  title: "Track a shipment | Voxarel",
  description:
    "Live tracking for shipments moving on Voxarel. Check status instantly. Verify with a one-time code to see full details.",
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
