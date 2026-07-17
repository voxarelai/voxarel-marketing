/**
 * API seam for Voxarel's live single-forwarder quote calculator.
 *
 * Endpoints (base = APP_URL, public, CORS *, rate-limited, no key — safe to call
 * directly from the browser), keyed by forwarder `orgSlug`:
 *   GET  /api/calculator/{orgSlug}/config  -> branding + offered service types
 *   POST /api/calculator/{orgSlug}/quote   -> instant price or pricingAvailable:false
 *   POST /api/calculator/{orgSlug}/lead    -> capture an enquiry as a lead
 *
 * Types below mirror the real, verified response shapes.
 */

import { APP_URL } from "./config";

export type ServiceType = "sea" | "air";
export type ShipmentCategory = "personal" | "commercial";

export interface PackageItem {
  weightKg: number;
  lengthCm?: number;
  widthCm?: number;
  heightCm?: number;
}

export interface QuoteParams {
  serviceType: ServiceType;
  shipmentCategory: ShipmentCategory;
  /** ISO-3166 alpha-2, destination only (origin = the forwarder's base). */
  destinationCountryCode: string;
  packages: PackageItem[];
}

export interface QuoteLineItem {
  label: string;
  amount: number;
}

export interface Quote {
  pricingAvailable: boolean;
  currency?: string;
  total?: number;
  chargeableWeightKg?: number;
  lineItems?: QuoteLineItem[];
}

export interface CalculatorConfig {
  orgSlug: string;
  companyName: string;
  enabled: boolean;
  headline: string | null;
  leadCaptureRequiredBeforeQuote: boolean;
  offeredServiceTypes: ServiceType[];
  branding: Record<string, unknown>;
}

export interface LeadInput {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  quoteParams?: QuoteParams;
}

const REQUEST_TIMEOUT_MS = 12_000;

async function postJson<T>(url: string, body: unknown): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    return (await res.json()) as T;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * A clearly-labelled sample, shown only when the live API is unreachable (e.g.
 * the demo org isn't provisioned yet) so the marketing hero never looks broken.
 */
export const SAMPLE_QUOTE: Quote = {
  pricingAvailable: true,
  currency: "AED",
  total: 114,
  chargeableWeightKg: 12,
  lineItems: [
    { label: "Freight", amount: 114 },
    { label: "VAT (0%)", amount: 0 },
  ],
};

export async function getConfig(
  orgSlug: string,
): Promise<CalculatorConfig | null> {
  try {
    const res = await fetch(`${APP_URL}/api/calculator/${orgSlug}/config`);
    if (!res.ok) return null;
    const data = (await res.json()) as {
      success: boolean;
      config: CalculatorConfig;
    };
    return data.success ? data.config : null;
  } catch {
    return null;
  }
}

export type QuoteOutcome =
  | { status: "priced"; quote: Quote; isSample?: boolean }
  | { status: "unpriced" }
  | { status: "error" };

/**
 * Fetch a live quote. `pricingAvailable:false` is a normal "request a quote"
 * outcome, not an error. Set `fallbackToSample` (hero demo) to surface a
 * labelled sample instead of an error when the endpoint is unreachable.
 */
export async function getQuote(
  orgSlug: string,
  params: QuoteParams,
  { fallbackToSample = false }: { fallbackToSample?: boolean } = {},
): Promise<QuoteOutcome> {
  try {
    const data = await postJson<{ success: boolean; quote: Quote }>(
      `${APP_URL}/api/calculator/${orgSlug}/quote`,
      params,
    );
    if (!data.success || !data.quote) {
      return fallbackToSample
        ? { status: "priced", quote: SAMPLE_QUOTE, isSample: true }
        : { status: "error" };
    }
    if (!data.quote.pricingAvailable) return { status: "unpriced" };
    return { status: "priced", quote: data.quote };
  } catch {
    return fallbackToSample
      ? { status: "priced", quote: SAMPLE_QUOTE, isSample: true }
      : { status: "error" };
  }
}

export async function submitLead(
  orgSlug: string,
  lead: LeadInput,
): Promise<boolean> {
  try {
    const data = await postJson<{ success: boolean }>(
      `${APP_URL}/api/calculator/${orgSlug}/lead`,
      lead,
    );
    return Boolean(data?.success);
  } catch {
    return false;
  }
}
