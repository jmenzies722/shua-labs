/**
 * The stack, grouped by architectural layer rather than by logo.
 *
 * HONESTY RULE: only tools genuinely in use. A stack list is the cheapest thing
 * on a portfolio to inflate and the easiest to catch — an interviewer picks the
 * least likely item and asks a second question about it. Nothing is listed here
 * that could not survive that.
 */

export interface StackLayer {
  id: string;
  name: string;
  /** What this layer is responsible for, in one line. */
  role: string;
  items: { name: string; note?: string }[];
}

export const stackLayers: StackLayer[] = [
  {
    id: "orchestration",
    name: "Orchestration & harnesses",
    role: "Deciding which model does what, with which tools, under whose budget.",
    items: [
      { name: "Claude API", note: "Messages, streaming, tool use" },
      { name: "Claude Code", note: "agents, hooks, skills, MCP" },
      { name: "MCP", note: "5 servers written, 3 public" },
      { name: "Custom agent crew", note: "8 agents, declared tools and handoffs" },
      { name: "Codex", note: "second harness for cross-checking" },
    ],
  },
  {
    id: "context",
    name: "Context & source of truth",
    role: "Defining a thing once, then generating everything downstream from it.",
    items: [
      { name: "YAML registry", note: "agent crew defined on the machine that runs it" },
      { name: "Generated build artifacts", note: "CI fails if the site drifts from source" },
      { name: "SQLite", note: "local ingestion and indexing" },
      { name: "Notion", note: "system of record for what is being built" },
    ],
  },
  {
    id: "observability",
    name: "Observability & measurement",
    role: "Knowing what an agent did, what it cost, and whether it worked.",
    items: [
      { name: "Token & cost accounting", note: "measured on streaming bytes in flight" },
      { name: "OpenTelemetry", note: "planned for agentscope" },
      { name: "Ship gates", note: "four public artifacts or it does not count" },
      { name: "Structured logging", note: "per-tenant, per-request" },
    ],
  },
  {
    id: "infrastructure",
    name: "Language & infrastructure",
    role: "Where it actually runs, and how it gets there repeatably.",
    items: [
      { name: "Python", note: "FastAPI, uv, ruff, pytest" },
      { name: "TypeScript", note: "Next.js App Router, strict mode" },
      { name: "Terraform", note: "module design, remote state, multi-account" },
      { name: "Docker", note: "multi-stage, compose for local" },
      { name: "GitHub Actions", note: "build, test, drift checks" },
      { name: "AWS", note: "dedicated account, CloudTrail, billing alarms" },
      { name: "Kubernetes", note: "k3d homelab; controllers next" },
    ],
  },
];
