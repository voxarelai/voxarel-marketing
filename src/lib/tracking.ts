/**
 * Public tracking client: talks to our own Next.js proxy (/api/track/*),
 * which forwards to the console's public tracking API server-side (no CORS).
 * Contract: docs/tracking-p1-devteam-DELIVERED.md
 */

/** Exact consent version string the console records against each contact. */
export const TERMS_VERSION = "tracking-consent-2026-07";

export type StatusCategory =
  | "collected"
  | "in_transit"
  | "out_for_delivery"
  | "delivered"
  | "hold";

export type Tier1Event = {
  title: string;
  time: string;
  state: "done" | "current" | "pending";
  note?: string | null;
};

export type Tier1 = {
  awb: string;
  status: string;
  statusCategory: StatusCategory;
  origin: string;
  destination: string;
  service: string;
  carrier: string;
  etaLine: string;
  progressStep: 0 | 1 | 2 | 3;
  events: Tier1Event[];
  contactHint: "email" | "none";
};

export type DetailsEvent = {
  title: string;
  location: string;
  time: string;
  note?: string | null;
};

export type UnlockedDetails = {
  locked: false;
  sender: { name: string; city: string };
  receiver: { name: string; address: string };
  pieces: number;
  weight: string;
  service: string;
  events: DetailsEvent[];
};

export type Details = UnlockedDetails | { locked: true };

export type Ok<T> = { ok: true; data: T };
export type Err = { ok: false; status: number; error: string };
export type Result<T> = Ok<T> | Err;

const BASE = "/api/track";

async function call<T>(
  path: string,
  init?: RequestInit,
  pick: (json: Record<string, unknown>) => T = (j) => j.data as T
): Promise<Result<T>> {
  try {
    const res = await fetch(`${BASE}/${path}`, { ...init, cache: "no-store" });
    let json: Record<string, unknown> = {};
    try {
      json = await res.json();
    } catch {
      /* non-JSON body */
    }
    if (!res.ok || json.ok === false) {
      return {
        ok: false,
        status: res.status,
        error:
          (json.error as string) ||
          "Something went wrong. Please try again in a moment.",
      };
    }
    return { ok: true, data: pick(json) };
  } catch {
    return {
      ok: false,
      status: 0,
      error: "We couldn't reach tracking just now. Check your connection and retry.",
    };
  }
}

/** Tier-1: open status + timeline, no locations. */
export function getTier1(awb: string) {
  return call<Tier1>(encodeURIComponent(awb));
}

/** OTP request: always resolves ok-shaped (anti-enumeration). */
export function requestOtp(awb: string, email: string) {
  return call<{ sentTo: string; expiresInSec: number; resendInSec: number }>(
    "otp/request",
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ awb, email }),
    },
    (j) => j as { sentTo: string; expiresInSec: number; resendInSec: number }
  );
}

/** OTP verify: one opaque error for any miss; returns a 30-min bearer token. */
export function verifyOtp(input: {
  awb: string;
  email: string;
  code: string;
  phone: string;
}) {
  return call<{ trackingToken: string; expiresInSec: number }>(
    "otp/verify",
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...input, termsVersion: TERMS_VERSION }),
    },
    (j) => j as { trackingToken: string; expiresInSec: number }
  );
}

/** Tier-2 details: requires the bearer token from verify. */
export function getDetails(awb: string, token: string) {
  return call<Details>(`${encodeURIComponent(awb)}/details`, {
    headers: { authorization: `Bearer ${token}` },
  });
}

/** Standalone consented-contact capture (no OTP). Phone optional. */
export function register(input: { email: string; phone?: string }) {
  return call<Record<string, never>>(
    "register",
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...input, termsVersion: TERMS_VERSION }),
    },
    () => ({})
  );
}

/** Loose client-side pre-validation (encoded 7-10 char OR legacy S/A/D-XXX-#####). */
export function isValidAwb(raw: string): boolean {
  const v = raw.trim().toUpperCase();
  return /^[A-Z0-9]{7,10}$/.test(v) || /^[SAD]-[A-Z][A-Z0-9]{2,4}-\d{5}(-\d{2})?$/.test(v);
}
