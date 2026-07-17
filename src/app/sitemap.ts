import type { MetadataRoute } from "next";

const BASE = "https://voxarel.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/track`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/demo`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE}/terms`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
