import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Everything is allowed. The AI crawlers are listed explicitly so the policy is
// a deliberate, machine-readable "yes" (some engines treat a named Allow as a
// stronger signal than inheriting the wildcard). Remove a line to opt out later.
export default function robots(): MetadataRoute.Robots {
  const allow = ["/"];
  return {
    rules: [
      { userAgent: "*", allow },
      { userAgent: "GPTBot", allow }, // ChatGPT search/index
      { userAgent: "OAI-SearchBot", allow }, // ChatGPT search
      { userAgent: "ChatGPT-User", allow }, // ChatGPT user-triggered fetch
      { userAgent: "ClaudeBot", allow }, // Claude index
      { userAgent: "Claude-Web", allow }, // Claude user-triggered fetch
      { userAgent: "PerplexityBot", allow }, // Perplexity
      { userAgent: "Google-Extended", allow }, // Gemini / AI Overviews
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
