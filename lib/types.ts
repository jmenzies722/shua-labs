/**
 * Shua Labs — typed data layer.
 *
 * HONESTY RULE: `install` may only be present when the thing is genuinely
 * public and the command genuinely works. The install block renders nothing
 * when `install` is absent, so a private entry cannot accidentally show a
 * command that 404s.
 *
 * Agent entries are GENERATED from ~/.claude/agents/registry.yaml
 * (see scripts/sync-registry.mjs). Servers and tools are hand-authored in
 * data/registry.ts. Both are merged by lib/registry.ts.
 */

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
