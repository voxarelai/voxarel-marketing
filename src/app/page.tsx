"use client";

import dynamic from "next/dynamic";
import {
  Navigation,
  Hero,
  TrustBar,
  Stats,
  Features,
  InteractiveDemo,
  Testimonial,
  FooterCTA,
  Footer,
} from "@/components";

const ContainerComparison = dynamic(
  () => import("@/components/ContainerComparison").then((m) => ({ default: m.ContainerComparison })),
  { ssr: false }
);

const RoleShowcase = dynamic(
  () => import("@/components/RoleShowcase").then((m) => ({ default: m.RoleShowcase })),
  { ssr: false }
);

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      {/* <TrustBar /> */}
      {/* <Stats /> */}
      <Features />
      <ContainerComparison />
      <RoleShowcase />
      <InteractiveDemo />
      <Testimonial />
      <FooterCTA />
      <Footer />
    </main>
  );
}
