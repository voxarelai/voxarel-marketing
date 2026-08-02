import { NextRequest } from "next/server";

/**
 * Same-origin proxy for the console's public tracking API.
 * The browser only ever calls voxarel.com/api/track/*; we forward server-side
 * to the console (no browser CORS, works on localhost / preview / prod).
 * Point at prod by setting TRACKING_API_BASE=https://app.voxarel.com.
 */
const BASE = process.env.TRACKING_API_BASE ?? "https://app.voxarel.com";

export const dynamic = "force-dynamic";

async function forward(req: NextRequest, path: string[]) {
  const target = `${BASE}/api/v1/public/tracking/${path
    .map(encodeURIComponent)
    .join("/")}${req.nextUrl.search}`;

  const headers: Record<string, string> = { accept: "application/json" };
  const auth = req.headers.get("authorization");
  if (auth) headers.authorization = auth;

  const init: RequestInit = { method: req.method, headers, cache: "no-store" };
  if (req.method !== "GET" && req.method !== "HEAD") {
    headers["content-type"] = "application/json";
    init.body = await req.text();
  }

  try {
    const res = await fetch(target, init);
    const body = await res.text();
    const retryAfter = res.headers.get("retry-after");
    return new Response(body, {
      status: res.status,
      headers: {
        "content-type": "application/json",
        "cache-control": "no-store",
        ...(retryAfter ? { "retry-after": retryAfter } : {}),
      },
    });
  } catch {
    return Response.json(
      { ok: false, error: "Tracking is unreachable right now. Please try again shortly." },
      { status: 502 }
    );
  }
}

export async function GET(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  const { path } = await ctx.params;
  return forward(req, path);
}

export async function POST(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  const { path } = await ctx.params;
  return forward(req, path);
}
