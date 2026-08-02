import "server-only";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import type { LeadRecord, TargetName, TargetResult } from "./schema";

/**
 * Reads UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN (injected by the
 * Vercel Marketplace integration). Constructed defensively rather than with
 * Redis.fromEnv() so the build and the rest of the site survive before the
 * Upstash database is provisioned. Calls fail until the env vars are real, and
 * the route turns that into a 503 + mailto fallback instead of a lost lead.
 */
// The Vercel Upstash Marketplace integration injects these under KV_* names.
// Accept both so the store works whichever way the database was connected.
export const redis = new Redis({
  url:
    process.env.UPSTASH_REDIS_REST_URL ??
    process.env.KV_REST_API_URL ??
    "https://disabled.upstash.io",
  token:
    process.env.UPSTASH_REDIS_REST_TOKEN ??
    process.env.KV_REST_API_TOKEN ??
    "disabled",
});

export const limiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "1 h"),
  prefix: "vx:rl:lead",
  analytics: false,
});

const RECORD_TTL_SEC = 60 * 60 * 24 * 180; // 180 days
const key = (id: string) => `vx:lead:${id}`;
const PENDING = "vx:lead:pending";

/** The durable write. Nothing else happens until this resolves. */
export async function putLead(rec: LeadRecord): Promise<void> {
  await redis.set(key(rec.lead_id), rec, { ex: RECORD_TTL_SEC });
  await redis.zadd(PENDING, { score: rec.received_at, member: rec.lead_id });
}

export async function getLead(id: string): Promise<LeadRecord | null> {
  return redis.get<LeadRecord>(key(id));
}

/**
 * One read-modify-write for the whole fan-out. Writing each target separately
 * races with the others and loses results, which makes the sweep run forever.
 */
export async function markTargets(
  id: string,
  results: Partial<Record<TargetName, TargetResult>>
): Promise<void> {
  const rec = await getLead(id);
  if (!rec) return;
  rec.targets = { ...rec.targets, ...results };
  await redis.set(key(id), rec, { ex: RECORD_TTL_SEC });

  const required: TargetName[] = ["hubspot", "email_internal", "email_visitor"];
  if (required.every((t) => rec.targets[t]?.ok)) {
    await redis.zrem(PENDING, id);
  }
}

export async function setAlarmed(id: string): Promise<void> {
  const rec = await getLead(id);
  if (!rec) return;
  rec.alarmed = true;
  await redis.set(key(id), rec, { ex: RECORD_TTL_SEC });
}

/** Oldest first, so the longest-failing lead is retried before a fresh one. */
export async function listUnfinished(limit = 50): Promise<LeadRecord[]> {
  const ids = await redis.zrange<string[]>(PENDING, 0, limit - 1);
  if (!ids.length) return [];
  const recs = await Promise.all(ids.map((id) => getLead(id)));
  return recs.filter((r): r is LeadRecord => r !== null);
}
