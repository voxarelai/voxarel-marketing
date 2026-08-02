"use client";

import { useState } from "react";
import posthog from "posthog-js";
import { Search } from "@/components/icons";
import { Reveal } from "@/components/Reveal";

export function TrackSection() {
  const [awb, setAwb] = useState("");

  const track = () => {
    const v = awb.trim().toUpperCase();
    if (!v) return;
    posthog.capture("shipment_tracking_search", {
      entry_point: "homepage",
    });
    window.location.href = `/track?awb=${encodeURIComponent(v)}`;
  };

  return (
    <section id="track" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="mx-auto max-w-xl text-center">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-tint text-petrol">
              <Search className="h-7 w-7" />
            </div>
            <h2 className="font-display text-balance text-3xl font-extrabold tracking-tight text-petrol-deep sm:text-[2.4rem]">
              Track a shipment
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              No login needed — live status for any Voxarel shipment.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                value={awb}
                onChange={(e) => setAwb(e.target.value.toUpperCase())}
                onKeyDown={(e) => e.key === "Enter" && track()}
                placeholder="Enter tracking number"
                aria-label="Tracking number"
                className="h-[52px] flex-1 rounded-xl border border-hair bg-white px-5 text-[16px] text-ink placeholder:text-faint focus:border-mint focus:outline-none focus:ring-4 focus:ring-mint/15"
              />
              <button
                onClick={track}
                className="h-[52px] rounded-xl bg-petrol px-8 text-[16px] font-bold text-white transition-colors hover:bg-petrol-deep"
              >
                Track
              </button>
            </div>
            <p className="mt-3.5 text-[13px] text-faint">e.g. S-DXB-00001</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
