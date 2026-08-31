import type { MetadataRoute } from "next";
import { buildLog } from "@/content/build-log";
import { research } from "@/content/research";
import { siteMeta } from "@/content/social";
import { allEntries } from "@/lib/registry";

const BASE = siteMeta.url;

export default function sitemap(): MetadataRoute.Sitemap {
  const registryPages = allEntries().map((e) => ({
    url: `${BASE}/registry/${e.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.4,
  }));

  const buildPages = buildLog.map((e) => ({
    url: `${BASE}/build/${e.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const researchPages = research.map((r) => ({
    url: `${BASE}/research/${r.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    { url: BASE, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/work`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/build`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/research`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/watch`, changeFrequency: "weekly", priority: 0.5 },
    { url: `${BASE}/lab`, changeFrequency: "weekly", priority: 0.5 },
    { url: `${BASE}/system`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE}/thesis`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE}/registry`, changeFrequency: "weekly", priority: 0.5 },
    ...buildPages,
    ...researchPages,
    ...registryPages,
  ];
}
