import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { RegisterHero } from "@/components/RegisterHero";
import { pageMeta } from "@/lib/metadata";

export const metadata: Metadata = pageMeta({
  path: "/register",
  title: { absolute: "Join Voxarel" },
  description: "Register with Voxarel to track your shipments and get updates, or request a demo for your logistics business.",
  // A sign-up gate with no standalone content: keep it out of the index but
  // let crawlers follow its links. Also excluded from the sitemap.
  noindex: true,
});

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
