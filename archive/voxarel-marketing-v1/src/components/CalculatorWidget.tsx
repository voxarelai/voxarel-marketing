"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowRight, Loader2, Plane, Plus, Search, Ship } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CountrySelect } from "./CalculatorWidget/CountrySelect";
import { PackageInput } from "./CalculatorWidget/PackageInput";
import { QuoteResult } from "./CalculatorWidget/QuoteResult";
import {
  getConfig,
  getQuote,
  type CalculatorConfig,
  type PackageItem,
  type Quote,
  type ServiceType,
  type ShipmentCategory,
} from "@/lib/calculator";
import { DEMO_ORG_SLUG, SIGNUP_URL } from "@/lib/config";

type Status = "idle" | "loading" | "priced" | "unpriced" | "error";
type Variant = "panel" | "embedded" | "compact";

interface CalculatorWidgetProps {
  orgSlug?: string;
  variant?: Variant;
  /** Auto-run a prefilled search on mount (used by the hero panel). */
  autoRun?: boolean;
  className?: string;
}

const DEFAULT_PACKAGE: PackageItem = { weightKg: 12 };

// Color shows up only as a restrained accent on the active label over a neutral
// frosted surface — distinct, but classy on the dark glass.
const categoryColors: Record<ShipmentCategory, string> = {
  personal: "border-white/15 bg-white/10 text-emerald-300",
  commercial: "border-white/15 bg-white/10 text-amber-300",
};

export function CalculatorWidget({
  orgSlug = DEMO_ORG_SLUG,
  variant = "panel",
  autoRun = variant === "panel",
  className,
}: CalculatorWidgetProps) {
  const reduceMotion = useReducedMotion();
  const [config, setConfig] = useState<CalculatorConfig | null>(null);
  const [serviceType, setServiceType] = useState<ServiceType>("sea");
  const [category, setCategory] = useState<ShipmentCategory>("personal");
  const [destination, setDestination] = useState("IN");
  const [packages, setPackages] = useState<PackageItem[]>([DEFAULT_PACKAGE]);
  const [status, setStatus] = useState<Status>("idle");
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isSample, setIsSample] = useState(false);
  const didAutoRun = useRef(false);

  const offered = config?.offeredServiceTypes ?? ["sea", "air"];

  // Best-effort config fetch for branding + which modes this forwarder offers.
  useEffect(() => {
    let active = true;
    void getConfig(orgSlug).then((c) => {
      if (!active || !c) return;
      setConfig(c);
      if (c.offeredServiceTypes?.length && !c.offeredServiceTypes.includes("sea")) {
        setServiceType(c.offeredServiceTypes[0]);
      }
    });
    return () => {
      active = false;
    };
  }, [orgSlug]);

  const runQuote = useCallback(async () => {
    setStatus("loading");
    const outcome = await getQuote(
      orgSlug,
      {
        serviceType,
        shipmentCategory: category,
        destinationCountryCode: destination,
        packages: packages.filter((p) => p.weightKg > 0),
      },
      { fallbackToSample: variant === "panel" },
    );
    if (outcome.status === "priced") {
      setQuote(outcome.quote);
      setIsSample(Boolean(outcome.isSample));
      setStatus("priced");
    } else if (outcome.status === "unpriced") {
      setQuote(null);
      setStatus("unpriced");
    } else {
      setStatus("error");
    }
  }, [orgSlug, serviceType, category, destination, packages, variant]);

  // Auto-run a single prefilled search so the hero shows a real result.
  useEffect(() => {
    if (!autoRun || didAutoRun.current) return;
    didAutoRun.current = true;
    const t = setTimeout(() => void runQuote(), reduceMotion ? 0 : 600);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoRun]);

  const onRequestQuote = () => {
    if (typeof window !== "undefined") window.location.href = "/#contact";
  };

  const canSubmit =
    Boolean(destination) &&
    packages.some((p) => p.weightKg > 0) &&
    status !== "loading";

  const compact = variant === "compact";

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "rounded-2xl border border-white/10",
          compact ? "bg-white/[0.02] p-4" : "p-5",
          variant === "panel" && "glass-strong glass-highlight",
          variant === "embedded" && "glass-card",
        )}
      >
        {!compact && (
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-500 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
              </span>
              <span className="text-sm font-medium text-white">
                Instant quote
              </span>
            </div>
            {variant === "panel" && (
              <span className="text-xs text-white/40">Try it — it&apos;s live</span>
            )}
          </div>
        )}

        {/* Mode */}
        <Tabs
          value={serviceType}
          onValueChange={(v) => setServiceType(v as ServiceType)}
        >
          <TabsList className="w-full border border-white/10 bg-white/5">
            {offered.includes("sea") && (
              <TabsTrigger
                value="sea"
                className="flex-1 text-white/50 transition-colors data-[state=active]:bg-white/10 data-[state=active]:text-cyan-300 data-[state=active]:shadow-none"
              >
                <Ship className="mr-1.5 h-4 w-4" /> Sea
              </TabsTrigger>
            )}
            {offered.includes("air") && (
              <TabsTrigger
                value="air"
                className="flex-1 text-white/50 transition-colors data-[state=active]:bg-white/10 data-[state=active]:text-violet-300 data-[state=active]:shadow-none"
              >
                <Plane className="mr-1.5 h-4 w-4" /> Air
              </TabsTrigger>
            )}
          </TabsList>
        </Tabs>

        {/* Category */}
        <div className="mt-3 grid grid-cols-2 gap-2">
          {(["personal", "commercial"] as const).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={cn(
                "rounded-lg border px-3 py-2 text-sm capitalize transition-colors",
                category === c
                  ? categoryColors[c]
                  : "border-white/10 bg-white/5 text-white/60 hover:text-white",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Destination */}
        <div className="mt-3">
          <label className="mb-1.5 block text-xs font-medium text-white/50">
            Destination
          </label>
          <CountrySelect
            value={destination}
            onChange={setDestination}
            disabled={status === "loading"}
          />
        </div>

        {/* Packages */}
        <div className="mt-3">
          <label className="mb-1.5 block text-xs font-medium text-white/50">
            Packages
          </label>
          <div className="space-y-2">
            {packages.map((p, i) => (
              <PackageInput
                key={i}
                index={i}
                value={p}
                disabled={status === "loading"}
                onChange={(next) =>
                  setPackages((arr) => arr.map((x, j) => (j === i ? next : x)))
                }
                onRemove={
                  packages.length > 1
                    ? () => setPackages((arr) => arr.filter((_, j) => j !== i))
                    : undefined
                }
              />
            ))}
          </div>
          {packages.length < 20 && (
            <button
              type="button"
              onClick={() => setPackages((arr) => [...arr, { weightKg: 0 }])}
              className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-white/50 hover:text-white"
            >
              <Plus className="h-3.5 w-3.5" /> Add item
            </button>
          )}
        </div>

        {/* Submit */}
        <button
          type="button"
          disabled={!canSubmit}
          onClick={() => void runQuote()}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Getting quote…
            </>
          ) : (
            <>
              <Search className="h-4 w-4" /> Get instant quote
            </>
          )}
        </button>

        {/* Result */}
        {status !== "idle" && (
          <div className="mt-4 min-h-[120px]">
            <QuoteResult
              status={status}
              quote={quote}
              isSample={isSample}
              companyName={config?.companyName}
              onRequestQuote={onRequestQuote}
              onRetry={() => void runQuote()}
            />
          </div>
        )}
      </div>

      {/* Conversion */}
      {variant === "panel" && (
        <a
          href={SIGNUP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm transition-colors hover:bg-white/[0.06]"
        >
          <span className="text-white/70">
            Put this calculator on <span className="text-white">your</span>{" "}
            website
          </span>
          <span className="inline-flex shrink-0 items-center gap-1 font-medium text-orange-400">
            Get started <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </a>
      )}
    </div>
  );
}
