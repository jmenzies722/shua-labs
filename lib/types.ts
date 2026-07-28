/**
 * Shua Labs v2 — typed data layer.
 * Adding a project, category, principle, offer, or journey entry is a one-object edit.
 */

export type ProjectType = "MCP" | "SKILL" | "AGENT" | "APP" | "LIB";
export type Tier = "Free" | "Freemium" | "Paid" | "WIP";
export type Principle = "Open by default" | "Production-grade" | "Built to enable";

export interface ProjectLink {
  label: string;
  href: string;
}

export interface ProjectDetail {
  /** Long-form description shown in the detail drawer. 2–4 short paragraphs. */
  description: string;
  /** Who it's for (audience). */
  forWho: string;
  /** Optional: code/install/usage snippet shown in a mono code block. */
  snippet?: {
    language: string;
    code: string;
    /** Optional caption shown above the snippet. */
    caption?: string;
  };
  /** Status shown as a small dot-pill. */
  status: "Shipping" | "Beta" | "WIP" | "Planned";
}

export interface Project {
  slug: string;
  name: string;
  type: ProjectType;
  tier: Tier;
  /** Category id — must match an entry in data/categories.ts. */
  category: string;
  /** Brand principles this project embodies. */
  principles: Principle[];
  /** A few short skill/tech tags (rendered as quiet meta). */
  tags: string[];
  oneLiner: string;
  links: ProjectLink[];
  /** Set true to elevate this project as the featured flagship spotlight. */
  featured?: boolean;
  detail: ProjectDetail;
}

export interface Category {
  id: string;
  name: string;
  /** One-line description shown under the category heading. */
  description: string;
}

export interface PrincipleEntry {
  id: Principle;
  /** Single short definition line. */
  definition: string;
  /** lucide-react icon name. */
  icon: "Github" | "Shield" | "Sparkles" | "Wrench" | "Layers" | "Zap";
}

export interface Offer {
  id: string;
  name: string;
  forWho: string;
  deliverable: string;
  price: string;
  priceNote?: string;
  cta: { label: string; href: string };
  /** Middle / flagship offer gets visual elevation. */
  flagship?: boolean;
}

export interface JourneyEntry {
  /** ISO date YYYY-MM-DD. */
  date: string;
  title: string;
  detail?: string;
}

/* ───────────────────────────────────────────────────────────────────────────
 * REGISTRY — agents, MCP servers, and harness tooling.
 *
 * Agent entries are GENERATED from ~/.claude/agents/registry.yaml
 * (see scripts/sync-registry.mjs). Servers and tools are hand-authored in
 * data/registry.ts. Both are merged by lib/registry.ts.
 *
 * HONESTY RULE (same as data/projects.ts): `install` may only be present when
 * the thing is genuinely public and the command genuinely works. The install
 * block renders nothing when `install` is absent, so a private entry cannot
 * accidentally show a command that 404s.
 * ─────────────────────────────────────────────────────────────────────────── */

export type RegistryKind = "agent" | "server" | "tool";
export type Availability = "public" | "private";
export type CostClass = "high" | "mid" | "low";

export interface RegistryLink {
  label: string;
  href: string;
}

export interface RegistryEntry {
  slug: string;
  name: string;
  kind: RegistryKind;
  availability: Availability;
  /** One line. Used on the card and as the page meta description. */
  summary: string;
  /** Long form for the detail page. Paragraphs separated by "\n\n". */
  description: string;

  // ── agent-only (populated by the generator) ──
  version?: string;
  domain?: string;
  model?: string;
  costClass?: CostClass;
  tools?: string[];
  capabilities?: string[];
  handsOffTo?: string[];
  /** Derived: holds no Edit/Write tools. Verifiers and debuggers must stay read-only. */
  readOnly?: boolean;

  // ── server / tool ──
  /** Number of MCP tools the server exposes. */
  toolCount?: number;
  language?: string;
  /** PRESENT ONLY WHEN PUBLIC AND WORKING. Absence hides the install block entirely. */
  install?: { label: string; code: string };
  links?: RegistryLink[];
  /** The "why it's built this way" line — surfaced as a callout. */
  notes?: string;
}

/* ───────────────────────────────────────────────────────────────────────────
 * HUB — products you sell, and the money they make.
 *
 * Product-led services: one asset, two price points. Someone buys the kit and runs it
 * themselves (`Product`), or pays to have it built (`Offer`). `Product.offerId` is that link,
 * and it is why the catalog and the engagements are one business rather than two.
 *
 * HONESTY RULE (same as data/projects.ts): status "live" means buyable today, and `checkout`
 * may only be present when that URL genuinely resolves. Absence renders an interest capture,
 * never a dead buy button.
 * ─────────────────────────────────────────────────────────────────────────── */

/**
 * The pipeline. A product moves left to right and never skips a stage.
 *
 * idea       captured, nothing decided
 * validated  survived gauntlet — GO or GO-WITH-CONDITIONS
 * building   code exists and is being written
 * packaged   a stranger could install it: README, license, install path
 * priced     price set and checkout created, not yet announced
 * live       buyable today
 * retired    was live, no longer sold — kept for revenue history
 *
 * Only `priced` and `live` ever appear on the public shelf. Everything earlier is yours.
 */
export type ProductStatus =
  | "idea"
  | "validated"
  | "building"
  | "packaged"
  | "priced"
  | "live"
  | "retired";

/** Left-to-right order. The pipeline view and the "next stage" logic both read this. */
export const PRODUCT_STAGES: ProductStatus[] = [
  "idea",
  "validated",
  "building",
  "packaged",
  "priced",
  "live",
];

/** Stages a visitor may see. Anything earlier is work in progress, not shelf stock. */
export const PUBLIC_STAGES: ProductStatus[] = ["priced", "live"];

export interface ProductCheckout {
  /** Merchant of record — remits EU VAT so you don't file returns on a $79 sale. */
  provider: "lemonsqueezy";
  url: string;
}

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  status: ProductStatus;
  /** Whole units of `currency`. null when not yet priced. */
  price: number | null;
  currency: "USD";
  checkout?: ProductCheckout;
  includes: string[];
  forWho: string;
  /** Ties to data/projects.ts — the public proof this came out of. */
  projectSlug?: string;
  /** Ties to data/offers.ts — "or have me build it". */
  offerId?: string;

  /** ISO date the record entered its current stage. Drives "stuck for N days". */
  stageSince?: string;
  /** What has to be true to reach the next stage. One line. Written by /pipeline. */
  nextAction?: string;
  /** Gauntlet verdict, when it has one. Only set after the idea actually ran the funnel. */
  verdict?: "GO" | "GO-WITH-CONDITIONS" | "NO-GO";
}

/* ── Revenue ──────────────────────────────────────────────────────────────
 * Hand-maintained. Two minutes a month beats a sync pipeline that rots.
 * PRIVATE — never rendered at record level on a public route.
 * ─────────────────────────────────────────────────────────────────────── */

export type RevenueStream = "products" | "consulting" | "content" | "apps";

export interface RevenueEntry {
  /** YYYY-MM. */
  month: string;
  stream: RevenueStream;
  /** Whole USD, NET of platform fees. Gross numbers flatter you and make growth a lie. */
  amount: number;
  recurring?: boolean;
  note?: string;
}

/* ── Catalog ──────────────────────────────────────────────────────────────
 * The shelf. Products, open-source projects, and engagements are different things to buy
 * (or take for free), so the catalog normalises them into one browsable row type rather than
 * making a visitor learn three layouts.
 * ─────────────────────────────────────────────────────────────────────── */

export type CatalogKind = "product" | "project" | "engagement";

export interface CatalogItem {
  id: string;
  kind: CatalogKind;
  name: string;
  oneLiner: string;
  /** Rendered price: "$149", "Free", "From $8,000". Never a bare number. */
  priceLabel: string;
  /** Sort key. Free/open-source sorts last within its group, not as $0. */
  priceValue: number | null;
  /** Short status word shown as a dot-pill. */
  status: string;
  available: boolean;
  tags: string[];
  href?: string;
  /** Present only when genuinely buyable right now. */
  checkoutUrl?: string;
}
