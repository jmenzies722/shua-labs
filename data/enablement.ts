/**
 * AI enablement — what actually makes a team faster with agents.
 *
 * HONESTY RULE: no percentages. Adoption and velocity numbers require a
 * deployed system with real users measured over time, and inventing them is the
 * fastest way to lose a technical reader who asks one follow-up question.
 * Each pillar cites a real artifact instead — the mechanism, not a statistic.
 */

export interface EnablementPillar {
  id: string;
  name: string;
  /** The problem, stated as the thing that actually goes wrong. */
  problem: string;
  /** What fixes it, structurally. */
  approach: string;
  /** Real, checkable evidence. Slug links to a registry entry when present. */
  evidence: { label: string; slug?: string }[];
}

export const enablementPillars: EnablementPillar[] = [
  {
    id: "harness",
    name: "Harness engineering",
    problem:
      "Every engineer configures their own agent setup, so nobody's behaves the same way, and the config silently drifts apart across Claude Code, Cursor, Warp, and Desktop.",
    approach:
      "One server set defined once and synced everywhere, with drift detection that fails loudly. Rules that must hold become hooks — the harness enforces them at a fixed moment rather than trusting the model to remember.",
    evidence: [
      { label: "mcp-sync — one server set, drift detected", slug: "mcp-sync" },
      { label: "harness-doctor — notices when it breaks", slug: "harness-doctor" },
    ],
  },
  {
    id: "agents",
    name: "Agent design & governance",
    problem:
      "A general-purpose agent given every tool is unpredictable and expensive, and nobody can say afterwards what it was allowed to touch.",
    approach:
      "Narrow specialists with declared tools, model tier, and handoff targets. Verifiers hold no write tools at all — a reviewer that can rewrite what it reviews is not a reviewer. The crew is defined in one file and the public catalogue is generated from it, so the docs cannot drift from reality.",
    evidence: [
      { label: "8-agent crew, generated from source" },
      { label: "read-only enforced by the registry validator" },
    ],
  },
  {
    id: "guardrails",
    name: "Guardrails, cost & observability",
    problem:
      "Agent spend is invisible until the bill arrives, and when one does something surprising in production there is no way to replay what happened.",
    approach:
      "A gateway as the trust boundary: keys you issue and revoke, the provider credential never leaving the container, token accounting measured on bytes in flight, and budgets that can actually refuse a request.",
    evidence: [
      { label: "shua-gateway — trust boundary, M0 running" },
      { label: "aws-architect — IAM and cost estimates before apply", slug: "aws-architect" },
    ],
  },
];
