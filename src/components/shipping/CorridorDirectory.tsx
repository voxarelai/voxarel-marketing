"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search, MapPin } from "@/components/icons";
import { lanes, type Lane } from "@/lib/lanes";

const originList = Array.from(new Set(lanes.map((l) => l.origin)));
const origins = [
  { name: "All", count: lanes.length },
  ...originList.map((o) => ({ name: o, count: lanes.filter((l) => l.origin === o).length })),
];

function Row({ l }: { l: Lane }) {
  const air = l.airTransit !== "n/a";
  return (
    <Link
      href={`/shipping/${l.slug}`}
      className="group flex items-center gap-4 border-b border-hair px-1 py-[18px] transition-colors hover:bg-tint"
    >
      <div className="min-w-0 flex-1">
        <div className="font-display flex items-center gap-2 text-[16px] font-medium tracking-tight text-ink">
          {l.origin}
          <ArrowRight className="h-3.5 w-3.5 text-faint" />
          {l.destination}
        </div>
        <div className="mt-1 truncate font-mono text-[12px] text-faint">
          {l.originCode} → {l.destCode} · {l.seaTransit} sea
          {air ? ` · ${l.airTransit} air` : ""} · {l.distanceKm.toLocaleString("en-US")} km
        </div>
      </div>
      <div className="hidden shrink-0 items-center gap-1.5 sm:flex">
        <span className="font-display rounded-md bg-tint2 px-2 py-1 text-[11px] font-medium text-petrol-soft">
          Sea
        </span>
        {air && (
          <span className="font-display rounded-md bg-mint/15 px-2 py-1 text-[11px] font-medium text-mint-deep">
            Air
          </span>
        )}
      </div>
      <ArrowRight className="h-4 w-4 shrink-0 text-faint transition-all group-hover:translate-x-0.5 group-hover:text-petrol" />
    </Link>
  );
}

export function CorridorDirectory() {
  const [q, setQ] = useState("");
  const [origin, setOrigin] = useState("All");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return lanes.filter((l) => {
      if (origin !== "All" && l.origin !== origin) return false;
      if (!query) return true;
      const hay = `${l.origin} ${l.destination} ${l.originCode} ${l.destCode}`.toLowerCase();
      return hay.includes(query);
    });
  }, [q, origin]);

  const reset = () => {
    setQ("");
    setOrigin("All");
  };

  return (
    <div>
      {/* controls */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="relative w-full max-w-md">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search a city, e.g. Chennai or Sharjah"
              aria-label="Search corridors"
              className="h-[46px] w-full rounded-lg border border-hair bg-white pl-10 pr-4 font-mono text-[14px] text-ink placeholder:text-faint focus:border-mint focus:outline-none focus:ring-4 focus:ring-mint/15"
            />
          </div>
          <div className="font-mono text-[13px] text-faint">
            {filtered.length} corridor{filtered.length === 1 ? "" : "s"}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {origins.map((o) => {
            const active = origin === o.name;
            return (
              <button
                key={o.name}
                onClick={() => setOrigin(o.name)}
                className={`font-display inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[13.5px] font-medium transition-colors ${
                  active
                    ? "bg-petrol text-white"
                    : "border border-hair text-muted hover:bg-tint"
                }`}
              >
                {o.name}
                <span className={`font-mono text-[11px] ${active ? "text-mint-bright" : "text-faint"}`}>
                  {o.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* results */}
      {filtered.length === 0 ? (
        <div className="mt-8 flex flex-col items-center gap-4 border-t border-hair py-16 text-center">
          <MapPin className="h-6 w-6 text-faint" />
          <p className="text-[15px] text-muted">
            No corridors match{q ? ` “${q}”` : " that filter"} yet.
          </p>
          <button
            onClick={reset}
            className="font-display inline-flex items-center gap-1.5 text-[14px] font-medium text-petrol"
          >
            Clear filters
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : (
        <div className="mt-8 border-t border-hair">
          {filtered.map((l) => (
            <Row key={l.slug} l={l} />
          ))}
        </div>
      )}
    </div>
  );
}
