import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { ProofBar } from "@/components/ProofBar";
import { Modules } from "@/components/Modules";
import { OldWay } from "@/components/OldWay";
import { Roles } from "@/components/Roles";
import { PulseSection } from "@/components/PulseSection";
import { TrackSection } from "@/components/TrackSection";
import { CtaBand } from "@/components/CtaBand";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <ProofBar />
        <Modules />
        <OldWay />
        <Roles />
        <PulseSection />
        <TrackSection />
      </main>
      <CtaBand />
      <Footer />
    </>
  );
}
