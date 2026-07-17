import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { TrackExperience } from "@/components/track/TrackExperience";

export const metadata: Metadata = {
  title: "Track a shipment — Voxarel",
  description:
    "Live tracking for shipments moving on Voxarel. Check status instantly — verify with a one-time code to see full details.",
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
