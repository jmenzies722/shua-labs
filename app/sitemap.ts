import type { MetadataRoute } from "next";
import { allEntries } from "@/lib/registry";

const BASE = "https://shua-labs.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const registryPages = allEntries().map((e) => ({
    url: `${BASE}/registry/${e.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.4,
  }));

  return [
    { url: BASE, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/watch`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/lab`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/system`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/thesis`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/registry`, changeFrequency: "weekly", priority: 0.5 },
    ...registryPages,
  ];
}
