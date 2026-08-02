"use client";

import { useAuthModals } from "@/components/auth/AuthModals";
import { Package, Warehouse } from "@/components/icons";

export function RegisterHero() {
  const { openSignUp } = useAuthModals();

  return (
    <section className="relative pb-24 pt-28 sm:pt-32">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-[420px]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(230,237,235,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(230,237,235,0.6) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 90% 55% at 50% 0%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 55% at 50% 0%, black 30%, transparent 100%)",
        }}
      />
      <div className="mx-auto max-w-lg px-5 text-center sm:px-8">
        <p className="font-display text-[12px] font-semibold uppercase tracking-[0.24em] text-mint-deep">
          Get started
        </p>
        <h1 className="font-display mt-4 text-[2.6rem] font-semibold leading-[1.05] tracking-tight text-petrol-deep">
          Join Voxarel.
        </h1>
        <p className="mt-4 text-[16px] leading-relaxed text-muted">
          Tell us who you are and we&apos;ll take it from there.
        </p>
        <div className="mt-8 grid gap-4 text-left sm:grid-cols-2">
          <button
            onClick={() => openSignUp("customer")}
            className="card group rounded-2xl border border-hair bg-white p-6 text-left transition-all hover:border-mint"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-tint text-petrol ring-1 ring-hair">
              <Package className="h-5 w-5" />
            </span>
            <div className="font-display mt-4 text-[16.5px] font-semibold text-petrol-deep">
              I&apos;m tracking a shipment
            </div>
            <p className="mt-1 text-[14px] text-muted">
              See full details and get updates on your parcels.
            </p>
          </button>
          <button
            onClick={() => openSignUp("business")}
            className="card group rounded-2xl border border-hair bg-white p-6 text-left transition-all hover:border-mint"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-tint text-petrol ring-1 ring-hair">
              <Warehouse className="h-5 w-5" />
            </span>
            <div className="font-display mt-4 text-[16.5px] font-semibold text-petrol-deep">
              I run a logistics business
            </div>
            <p className="mt-1 text-[14px] text-muted">
              See how Voxarel can run your whole operation.
            </p>
          </button>
        </div>
      </div>
    </section>
  );
}
