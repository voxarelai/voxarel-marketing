"use client";

import { motion } from "framer-motion";
import { ArrowRight, FileText, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Quote } from "@/lib/calculator";

function formatMoney(amount: number, currency: string) {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toLocaleString()}`;
  }
}

interface QuoteResultProps {
  status: "loading" | "priced" | "unpriced" | "error";
  quote: Quote | null;
  isSample?: boolean;
  companyName?: string;
  onRequestQuote: () => void;
  onRetry: () => void;
}

export function QuoteResult({
  status,
  quote,
  isSample,
  companyName,
  onRequestQuote,
  onRetry,
}: QuoteResultProps) {
  if (status === "loading") {
    return (
      <div className="space-y-3" aria-busy="true" aria-label="Fetching quote">
        <div className="h-12 w-40 animate-pulse rounded-lg bg-white/10" />
        <div className="h-4 w-full animate-pulse rounded bg-white/5" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-white/5" />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <p className="text-sm text-white/70">
          We couldn&apos;t reach the calculator just now.
        </p>
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-orange-400 hover:text-orange-300"
        >
          <RefreshCw className="h-3.5 w-3.5" /> Try again
        </button>
      </div>
    );
  }

  if (status === "unpriced") {
    return (
      <div className="flex flex-col items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <Badge variant="secondary">No instant rate for this lane</Badge>
        <p className="text-sm text-white/70">
          This forwarder doesn&apos;t have an instant rate for this destination —
          but they can quote you directly.
        </p>
        <button
          type="button"
          onClick={onRequestQuote}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-orange-400 hover:text-orange-300"
        >
          Request a quote <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    );
  }

  if (status === "priced" && quote) {
    const currency = quote.currency ?? "AED";
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="rounded-xl border border-orange-500/20 bg-gradient-to-br from-orange-500/[0.08] to-transparent p-4"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-white/50">
              Estimated total
            </p>
            <p className="mt-1 text-3xl font-semibold text-white">
              {formatMoney(quote.total ?? 0, currency)}
            </p>
            {typeof quote.chargeableWeightKg === "number" && (
              <p className="mt-1 text-xs text-white/50">
                Chargeable weight {quote.chargeableWeightKg} kg
              </p>
            )}
          </div>
          {isSample ? (
            <Badge variant="warning">Sample</Badge>
          ) : (
            <Badge variant="success">Live rate</Badge>
          )}
        </div>

        {quote.lineItems && quote.lineItems.length > 0 && (
          <ul className="mt-3 space-y-1.5 border-t border-white/10 pt-3">
            {quote.lineItems.map((li) => (
              <li
                key={li.label}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-white/60">{li.label}</span>
                <span className="text-white/90">
                  {formatMoney(li.amount, currency)}
                </span>
              </li>
            ))}
          </ul>
        )}

        <p className="mt-3 flex items-center gap-1.5 text-xs text-white/40">
          <FileText className="h-3 w-3" />
          {isSample
            ? "Example quote — connect a demo org for live pricing"
            : `Instant estimate${companyName ? ` from ${companyName}` : ""}`}
        </p>
      </motion.div>
    );
  }

  return null;
}
