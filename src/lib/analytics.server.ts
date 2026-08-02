import "server-only";
import { PostHog } from "posthog-node";
import type { VoxarelEvent } from "@/lib/analytics";

/**
 * One client per call. Serverless functions freeze between invocations, so a
 * long-lived client loses buffered events. flushAt 1 plus shutdown() sends now.
 */
export async function trackServer(
  event: VoxarelEvent,
  distinctId: string,
  props: Record<string, unknown> = {}
): Promise<void> {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key || process.env.NEXT_PUBLIC_VERCEL_ENV !== "production") return;

  const ph = new PostHog(key, {
    host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    flushAt: 1,
    flushInterval: 0,
  });
  ph.capture({ distinctId, event, properties: props });
  await ph.shutdown();
}
