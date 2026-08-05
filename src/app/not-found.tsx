import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ArrowRight } from "@/components/icons";
import { TRACK_URL } from "@/lib/site";

export default function NotFound() {
  return (
    <>
      <Navigation />
      <main className="relative overflow-hidden pb-28 pt-44 sm:pt-52">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(226,236,233,0.7) 1px, transparent 1px), linear-gradient(to bottom, rgba(226,236,233,0.7) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse 90% 60% at 50% 0%, black 30%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 90% 60% at 50% 0%, black 30%, transparent 100%)",
          }}
        />
        <div className="mx-auto max-w-6xl px-5 text-center sm:px-8">
          <p className="font-display text-[12px] font-bold uppercase tracking-[0.22em] text-mint-deep">
            404: Lost in transit
          </p>
          <h1 className="font-display mt-5 text-balance text-4xl font-medium tracking-tight text-petrol-deep sm:text-6xl">
            This page went missing.
          </h1>
          <p className="mx-auto mt-5 max-w-md text-pretty text-lg leading-relaxed text-muted">
            The address exists, the page doesn&apos;t, like a parcel with no shipment attached.
            Let&apos;s get you back on route.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="group inline-flex h-[52px] items-center justify-center gap-2 rounded-xl bg-petrol px-8 text-[16px] font-bold text-white transition-colors hover:bg-petrol-deep"
            >
              Back to home
              <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href={TRACK_URL}
              className="inline-flex h-[52px] items-center justify-center rounded-xl border border-hair bg-white px-8 text-[16px] font-bold text-petrol transition-colors hover:bg-tint"
            >
              Track a shipment
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
