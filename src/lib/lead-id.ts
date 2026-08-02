const KEY = "vx_lead_id";

/**
 * Minted on the client, once per browser, before the first POST to /api/lead.
 * Reused on repeat submits so one person is one lead, not three.
 */
export function getLeadId(): string {
  const existing = window.localStorage.getItem(KEY);
  if (existing) return existing;

  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now().toString(16)}-${Math.random().toString(16).slice(2, 14)}`;

  try {
    window.localStorage.setItem(KEY, id);
  } catch {
    // Storage blocked. The id still works for this submit.
  }
  return id;
}
