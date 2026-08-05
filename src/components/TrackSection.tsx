"use client";

import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { track as trackEvent } from "@/lib/analytics";

export function TrackSection() {
  const [awb, setAwb] = useState("");

  const track = () => {
    const v = awb.trim().toUpperCase();
    if (!v) return;
    trackEvent("track_search_submit", { source: "home" });
    window.location.href = `/track?awb=${encodeURIComponent(v)}`;
  };

  return (
    <section id="track" className="scroll-mt-20 border-b border-hair py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="grid items-center gap-8 sm:grid-cols-[1fr_auto]">
            <div>
              <p className="font-display inline-flex items-center gap-2.5 text-[12px] font-medium uppercase tracking-[0.15em] text-mint-deep">
                <span className="h-1.5 w-1.5 rounded-full bg-mint" />
                Track a shipment
              </p>
              <h2 className="font-display mt-3 text-2xl font-medium tracking-tight text-petrol-deep sm:text-[2rem]">
                Live status, no login needed.
              </h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                value={awb}
                onChange={(e) => setAwb(e.target.value.toUpperCase())}
                onKeyDown={(e) => e.key === "Enter" && track()}
                placeholder="S-DXB-00231"
                aria-label="Tracking number"
                className="h-[46px] w-full rounded-lg border border-hair bg-white px-4 font-mono text-[14px] text-ink placeholder:text-faint focus:border-mint focus:outline-none focus:ring-4 focus:ring-mint/15 sm:w-[300px]"
              />
              <button
                onClick={track}
                className="h-[46px] rounded-lg bg-petrol px-6 font-display text-[15px] font-medium text-white transition-colors hover:bg-petrol-deep"
              >
                Track
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
