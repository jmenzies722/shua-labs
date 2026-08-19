import type { MetadataRoute } from "next";
const BASE = "https://shua-labs.vercel.app";

/**
 * Generated from the same registry data everything else reads, so a new
 * entry gets indexed automatically instead of needing a second place to
 * remember to update.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: BASE, changeFrequency: "weekly", priority: 1 }];
}
