const KEY = "vx_attr";

export type Attribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  referrer?: string;
  landing_path?: string;
  landed_at?: number;
};

/** Records first touch only. A later visit never overwrites the first one. */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  if (window.localStorage.getItem(KEY)) return;

  const q = new URLSearchParams(window.location.search);
  const attr: Attribution = {
    utm_source: q.get("utm_source") ?? undefined,
    utm_medium: q.get("utm_medium") ?? undefined,
    utm_campaign: q.get("utm_campaign") ?? undefined,
    utm_content: q.get("utm_content") ?? undefined,
    referrer: document.referrer || undefined,
    landing_path: window.location.pathname,
    landed_at: Date.now(),
  };

  try {
    window.localStorage.setItem(KEY, JSON.stringify(attr));
  } catch {
    // Private mode with storage disabled. Attribution is best effort.
  }
}

export function readAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(KEY) ?? "{}") as Attribution;
  } catch {
    return {};
  }
}
