import { offers } from "@/data/offers";
import { visibleProducts } from "@/data/products";
import { projects } from "@/data/projects";
import { PUBLIC_STAGES } from "@/lib/types";
import type { CatalogItem, CatalogKind } from "@/lib/types";

/**
 * The shelf.
 *
 * Three different things are for sale here — packaged products, open-source projects, and
 * engagements — and a visitor should not have to learn three layouts to compare them. This
 * normalises all of them into one row type so the catalog reads like a catalog.
 *
 * The honesty rule survives the normalisation: `checkoutUrl` is only ever populated from a
 * product that is genuinely live with a genuinely working checkout, so a dead buy button
 * cannot be produced by this layer even by mistake.
 */

export const KIND_LABELS: Record<CatalogKind, string> = {
  product: "Product",
  project: "Open source",
  engagement: "Engagement",
};

function fromProducts(): CatalogItem[] {
  // Pre-`priced` stages are work in progress, not shelf stock. The pipeline view shows those.
  return visibleProducts
    .filter((product) => PUBLIC_STAGES.includes(product.status))
    .map((product) => {
    const buyable = product.status === "live" && Boolean(product.checkout);
    return {
      id: `product:${product.slug}`,
      kind: "product" as const,
      name: product.name,
      oneLiner: product.tagline,
      priceLabel:
        product.price === null
          ? "Pricing TBD"
          : new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: product.currency,
              maximumFractionDigits: 0,
            }).format(product.price),
      priceValue: product.price,
      status: product.status === "live" ? "Available" : "Pre-order",
      available: buyable,
      tags: product.projectSlug ? [product.projectSlug] : [],
      checkoutUrl: buyable ? product.checkout!.url : undefined,
    };
  });
}

function fromProjects(): CatalogItem[] {
  // Only things a visitor can actually go and use. A WIP repo is not shelf stock.
  return projects
    .filter((p) => p.detail.status === "Shipping" || p.detail.status === "Beta")
    .map((project) => ({
      id: `project:${project.slug}`,
      kind: "project" as const,
      name: project.name,
      oneLiner: project.oneLiner,
      priceLabel: project.tier === "Paid" ? "Paid" : "Free",
      priceValue: null,
      status: project.detail.status,
      available: true,
      tags: project.tags.slice(0, 3),
      href: project.links[0]?.href,
    }));
}

function fromOffers(): CatalogItem[] {
  return offers.map((offer) => ({
    id: `engagement:${offer.id}`,
    kind: "engagement" as const,
    name: offer.name,
    oneLiner: offer.deliverable,
    priceLabel: offer.price,
    priceValue: parsePrice(offer.price),
    status: "Booking",
    available: true,
    tags: [],
    href: offer.cta.href,
  }));
}

/** "From $8,000" → 8000. Used for sorting only; the label is what renders. */
function parsePrice(label: string): number | null {
  const match = label.replace(/,/g, "").match(/\d+/);
  return match ? Number(match[0]) : null;
}

/** Everything, grouped by kind in a deliberate reading order: buy now, use free, hire me. */
export function catalog(): CatalogItem[] {
  return [...fromProducts(), ...fromProjects(), ...fromOffers()];
}

export function catalogByKind(kind: CatalogKind): CatalogItem[] {
  return catalog().filter((item) => item.kind === kind);
}

export interface CatalogSection {
  kind: CatalogKind;
  label: string;
  /** Why this group exists, in one line. Shown under the heading. */
  blurb: string;
  items: CatalogItem[];
}

export function catalogSections(): CatalogSection[] {
  return [
    {
      kind: "product" as const,
      label: "Products",
      blurb: "Packaged so you can use them without me.",
      items: catalogByKind("product"),
    },
    {
      kind: "project" as const,
      label: "Open source",
      blurb: "Free, public, and the proof the rest of this page is real.",
      items: catalogByKind("project"),
    },
    {
      kind: "engagement" as const,
      label: "Engagements",
      blurb: "The same work, done for you. Fixed scope, fixed price.",
      items: catalogByKind("engagement"),
    },
  ].filter((section) => section.items.length > 0);
}
