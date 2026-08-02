import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { RegisterHero } from "@/components/RegisterHero";

export const metadata: Metadata = {
  title: "Join Voxarel",
  description:
    "Register with Voxarel to track your shipments and get updates — or request a demo for your logistics business.",
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
