import type { Project } from "@/lib/types";

/**
 * Project data. The gallery is driven entirely from this array.
 * Adding a new project is a one-object edit. Move between categories by
 * changing `category` (must match an id in data/categories.ts).
 *
 * `featured: true` elevates a project to the full-bleed spotlight band above the grids.
 */
export const projects: Project[] = [
  // ────────────────────────────────────────────────────────────────────────
  // AI ENABLEMENT
  // ────────────────────────────────────────────────────────────────────────
  {
    slug: "aws-read-only-mcp",
    name: "AWS Read-Only MCP",
    type: "MCP",
    tier: "Free",
    category: "ai-enablement",
    principles: ["Open by default", "Production-grade"],
    tags: ["MCP", "AWS", "TypeScript"],
    oneLiner:
      "Lets an agent query your AWS state (cost, resources, alarms) with zero write access.",
    featured: true,
    links: [
      { label: "GitHub", href: "https://github.com/jmenzies722/shua-labs" },
    ],
    detail: {
      description:
        "An MCP server that exposes a curated, read-only slice of your AWS account to an AI agent — cost, resources, alarms, logs — and refuses anything that could mutate state. Designed so you can let an agent investigate your infrastructure without ever giving it a write key.\n\nShips with a least-privilege IAM policy, structured tool definitions, and per-call audit logs. Drop it into Claude Desktop or any MCP-compatible host.",
      forWho:
        "Platform and SRE teams who want agents to help triage AWS without holding the master key.",
      snippet: {
        language: "bash",
        caption: "Install (npm)",
        code: `npm i -g @shua-labs/aws-readonly-mcp

# Then add to your MCP host config:
{
  "mcpServers": {
    "aws-readonly": {
      "command": "aws-readonly-mcp",
      "env": { "AWS_PROFILE": "shua-labs-ro" }
    }
  }
}`,
      },
      status: "Shipping",
    },
  },
  {
    slug: "agent-tracer",
    name: "Agent Tracer",
    type: "AGENT",
    tier: "Freemium",
    category: "ai-enablement",
    principles: ["Production-grade", "Built to enable"],
    tags: ["Observability", "Tracing", "OpenTelemetry"],
    oneLiner:
      "Logs every tool call an agent makes with timing and cost. The 'why did it do that?' tool.",
    links: [
      { label: "GitHub", href: "https://github.com/jmenzies722/shua-labs" },
    ],
    detail: {
      description:
        "A tracing layer that wraps your agent's tool calls and records every step — inputs, outputs, latency, token cost, and the reasoning that led there. OpenTelemetry-compatible so it lands in whatever observability stack you already run.\n\nThe goal: when an agent does something surprising in production, you can replay exactly what happened in under a minute.",
      forWho:
        "Anyone running agents in production who is tired of guessing what they did and why.",
      snippet: {
        language: "ts",
        caption: "Wrap your agent",
        code: `import { trace } from "@shua-labs/agent-tracer";

const tracedAgent = trace(myAgent, {
  service: "support-bot",
  costPerToken: { input: 0.000003, output: 0.000015 },
});

await tracedAgent.run({ message: "..." });`,
      },
      status: "Beta",
    },
  },
  {
    slug: "infra-reviewer",
    name: "Infra Reviewer",
    type: "AGENT",
    tier: "Freemium",
    category: "ai-enablement",
    principles: ["Open by default", "Production-grade"],
    tags: ["Terraform", "Docker", "GitHub Actions"],
    oneLiner:
      "Autonomous Terraform and Docker reviewer that comments on your PRs.",
    links: [
      { label: "GitHub", href: "https://github.com/jmenzies722/shua-labs" },
    ],
    detail: {
      description:
        "A GitHub Action that reads every Terraform plan and Dockerfile on a PR and leaves precise, actionable review comments — security gaps, cost surprises, drift risks, image bloat. It writes the comments a senior platform engineer would.\n\nNo write access to your infra. Just structured opinions, in the right place, before merge.",
      forWho:
        "Teams shipping infra-as-code who want a competent extra reviewer that never sleeps.",
      snippet: {
        language: "yaml",
        caption: ".github/workflows/review.yml",
        code: `name: Infra Review
on: [pull_request]
jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: shua-labs/infra-reviewer@v1
        with:
          anthropic-api-key: \${{ secrets.ANTHROPIC_API_KEY }}`,
      },
      status: "Beta",
    },
  },

  // ────────────────────────────────────────────────────────────────────────
  // DEVELOPER TOOLS
  // ────────────────────────────────────────────────────────────────────────
  {
    slug: "aws-cost",
    name: "/aws-cost",
    type: "SKILL",
    tier: "Free",
    category: "developer-tools",
    principles: ["Open by default", "Built to enable"],
    tags: ["Terraform", "FinOps", "CLI"],
    oneLiner:
      "Estimates monthly AWS cost from your Terraform before you apply.",
    links: [
      { label: "GitHub", href: "https://github.com/jmenzies722/shua-labs" },
    ],
    detail: {
      description:
        "A Claude Code skill that parses your Terraform plan and gives you an honest monthly cost estimate before you hit apply — broken down by service, with the assumptions visible so you can argue with them.\n\nFast, local, no account access required.",
      forWho:
        "Engineers who don't want to find out about a five-figure mistake from the bill.",
      snippet: {
        language: "bash",
        caption: "Run in any Terraform repo",
        code: `# In Claude Code:
/aws-cost

# Or directly:
npx @shua-labs/aws-cost ./infra`,
      },
      status: "Shipping",
    },
  },
  {
    slug: "threat-model",
    name: "/threat-model",
    type: "SKILL",
    tier: "Free",
    category: "developer-tools",
    principles: ["Open by default", "Built to enable"],
    tags: ["Security", "OWASP", "CLI"],
    oneLiner: "Generates an OWASP-style threat model for any repo.",
    links: [
      { label: "GitHub", href: "https://github.com/jmenzies722/shua-labs" },
    ],
    detail: {
      description:
        "Point it at a repo and get a structured OWASP-style threat model back: assets, trust boundaries, likely attack paths, and the controls you should add. Markdown out, ready to drop into a design doc or a security review.",
      forWho:
        "Engineers who need a credible first-draft threat model in minutes, not an afternoon.",
      snippet: {
        language: "bash",
        caption: "Run in any repo",
        code: `# In Claude Code:
/threat-model

# Output: THREAT_MODEL.md`,
      },
      status: "Shipping",
    },
  },
  {
    slug: "pr-reviewer-saas",
    name: "PR Reviewer SaaS",
    type: "APP",
    tier: "Paid",
    category: "developer-tools",
    principles: ["Production-grade", "Built to enable"],
    tags: ["SaaS", "GitHub App", "Reviews"],
    oneLiner: "Hosted agent that reviews every PR on your repo.",
    links: [
      { label: "GitHub", href: "https://github.com/jmenzies722/shua-labs" },
      // TODO: replace with live product URL when deployed
      { label: "Live", href: "#" },
    ],
    detail: {
      description:
        "A hosted version of Infra Reviewer extended to full code review — install the GitHub App, get senior-level review comments on every PR within minutes, with team-tunable strictness and a budget cap.\n\nFor teams that want the agent in place without standing up the workflow themselves.",
      forWho:
        "Engineering teams that want consistent, high-signal PR review without paying a senior salary for it.",
      status: "WIP",
    },
  },
];
