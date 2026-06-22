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
