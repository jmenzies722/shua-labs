import type { MetadataRoute } from "next";
import { allEntries } from "@/lib/registry";

const BASE = "https://shua-labs.vercel.app";

/**
 * Generated from the same registry data everything else reads, so a new
 * entry gets indexed automatically instead of needing a second place to
 * remember to update.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const registryPages = allEntries().map((e) => ({
    url: `${BASE}/registry/${e.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [
    { url: BASE, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/registry`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/thesis`, changeFrequency: "monthly", priority: 0.6 },
    ...registryPages,
  ];
}
