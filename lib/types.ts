/**
 * Shua Labs — typed data layer.
 *
 * Shua Labs is a publishing surface, not a business. It exists to turn finished
 * CONTROL PLANE work into visible evidence. There are no offers, prices, or
 * service lines in this file, and adding one is a charter violation.
 */

/* ───────────────────────────────────────────────────────────────────────────
 * THE PLATFORM — the services being built.
 *
 * A service is not finished until it passes its ship gate: a PUBLIC repo, a README
 * with an architecture diagram, a working demo someone else can see, and one
 * written post explaining the hard part. Four things, all public.
 *
 * HONESTY RULE: a gate artifact is `done` only when a stranger can open it
 * without credentials. Work that exists on disk but is not public does not
 * count, and the UI renders the empty box on purpose — the gaps are the point.
 * ─────────────────────────────────────────────────────────────────────────── */

export type ServiceStatus = "shipped" | "building" | "queued" | "parked";

/** The four architectural phases the platform is built across. */
export type Phase =
  | "1 Foundation"
  | "2 AI Core"
  | "3 Platform"
  | "4 Architecture";

/** The four artifacts that constitute a ship gate. Order is render order. */
export const GATE_ARTIFACTS = ["repo", "diagram", "demo", "writeup"] as const;
export type GateArtifact = (typeof GATE_ARTIFACTS)[number];

export interface GateItem {
  /** True only when a stranger can open it with no credentials. */
  done: boolean;
  /** Public URL. Present only when `done` — a link that 404s is worse than none. */
  href?: string;
  /** Shown when not done: what is actually blocking this artifact. */
  blocker?: string;
}

export type ShipGate = Record<GateArtifact, GateItem>;

export interface PlatformService {
  /** 1-indexed position on the platform. Render order. */
  n: number;
  slug: string;
  name: string;
  phase: Phase;
  status: ServiceStatus;
  /** One line: what the thing is. */
  oneLiner: string;
  /** The named concept this service exists to teach. */
  teaches: string;
  /** Why this service sits at this position and not another. */
  whyHere: string;
  /** Skills Matrix rows this service is designed to move. */
  moves: string[];
  tags: string[];
  gate: ShipGate;
  /** Long form for the detail view. Paragraphs separated by "\n\n". */
  description: string;
  /** Optional terminal-style snippet shown in the detail view. */
  snippet?: {
    language: string;
    caption?: string;
    code: string;
  };
}

export interface PhaseGroup {
  id: Phase;
  /** One line under the phase heading. */
  description: string;
}

export interface PrincipleEntry {
  id: string;
  definition: string;
  icon: "Github" | "Shield" | "Sparkles" | "Wrench" | "Layers" | "Zap";
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
 * HONESTY RULE: `install` may only be present when the thing is genuinely
 * public and the command genuinely works. The install block renders nothing
 * when `install` is absent, so a private entry cannot accidentally show a
 * command that 404s.
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
