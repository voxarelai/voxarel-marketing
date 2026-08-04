import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { RegisterHero } from "@/components/RegisterHero";

export const metadata: Metadata = {
  alternates: { canonical: "/register" },
  title: "Join Voxarel",
  description:
    "Register with Voxarel to track your shipments and get updates, or request a demo for your logistics business.",
  // A sign-up gate with no standalone content: keep it out of the index but
  // let crawlers follow its links.
  robots: { index: false, follow: true },
};

export default function RegisterPage() {
  return (
    <>
      <Navigation />
      <main>
        <RegisterHero />
      </main>
      <Footer />
    </>
  );
}
