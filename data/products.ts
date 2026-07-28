import type { Product } from "@/lib/types";

/**
 * Products — everything in the pipeline, at every stage.
 *
 * This file is written by the `/pipeline` skill, but it is plain data and hand-editing it is
 * fine. Adding a product is a one-object edit.
 *
 * Only `priced` and `live` reach the public shelf (see lib/catalog.ts). Earlier stages render
 * on the private pipeline view, which is the point: the hub shows you what is stuck, not just
 * what is finished.
 *
 * HONESTY RULE: status "live" means buyable today, and `checkout` may only be present when that
 * URL genuinely resolves. Absence renders an interest capture, never a dead buy button.
 */
export const products: Product[] = [
  // Empty on purpose. The first product comes out of running `/pipeline new`.
];

/** Anything not retired. Retired records stay in the file for revenue history. */
export const visibleProducts = products.filter((p) => p.status !== "retired");

export function productBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
