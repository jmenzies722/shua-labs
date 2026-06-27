import type { Project } from "@/lib/types";

/**
 * Project data. The gallery is driven entirely from this array.
 * Adding a new project is a one-object edit. Move between categories by
 * changing `category` (must match an id in data/categories.ts).
 *
 * `featured: true` elevates a project to the full-bleed spotlight band above the grids.
 *
 * HONESTY RULE: a card may only claim status "Shipping"/"Beta" when it is
 * actually public and installable. Anything not yet public is tier "WIP" and
 * status "WIP" or "Planned". No install command that 404s. No "Live" link to "#".
 */
export const projects: Project[] = [
  // ────────────────────────────────────────────────────────────────────────
  // AI ENABLEMENT
  // ────────────────────────────────────────────────────────────────────────
  {
    slug: "aws-architect-mcp",
    name: "AWS Architect MCP",
    type: "MCP",
    tier: "Free",
    category: "ai-enablement",
    principles: ["Production-grade", "Built to enable"],
    tags: ["MCP", "AWS", "Terraform", "IAM"],
    oneLiner:
      "Designs AWS architectures and generates the Terraform, IAM policies, and cost estimates to ship them.",
    featured: true,
    links: [
      { label: "GitHub", href: "https://github.com/jmenzies722/aws-architect-mcp" },
    ],
    detail: {
      description:
        "An MCP server that turns an AI agent into an AWS solutions architect. Give it a goal and it selects a reference pattern, designs the architecture, and emits the artifacts to build it — ready-to-apply Terraform, a least-privilege IAM policy, a monthly cost estimate, and a scaffolded project layout.\n\nReal, working TypeScript — live on GitHub. npm package coming once the tool surface is locked.",
      forWho:
        "Engineers who want an agent that can design AWS infrastructure and hand back the IaC, not just talk about it.",
      snippet: {
        language: "bash",
        caption: "MCP tools it exposes",
        code: `select-pattern         # pick an AWS reference architecture
design-architecture    # produce a full architecture design
generate-terraform     # emit ready-to-apply Terraform
generate-iam-policy    # least-privilege IAM for the design
estimate-cost          # monthly cost estimate
scaffold-project       # lay down the repo structure`,
      },
      status: "WIP",
    },
  },
  {
    slug: "agent-tracer",
    name: "Agent Tracer",
    type: "AGENT",
    tier: "WIP",
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
        caption: "Planned interface",
        code: `import { trace } from "@shua-labs/agent-tracer";

const tracedAgent = trace(myAgent, {
  service: "support-bot",
  costPerToken: { input: 0.000003, output: 0.000015 },
});

await tracedAgent.run({ message: "..." });`,
      },
      status: "Planned",
    },
  },
  {
    slug: "infra-reviewer",
    name: "Infra Reviewer",
    type: "AGENT",
    tier: "WIP",
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
        caption: "Planned interface (.github/workflows/review.yml)",
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
      status: "Planned",
    },
  },

  // ────────────────────────────────────────────────────────────────────────
  // DEVELOPER TOOLS
  // ────────────────────────────────────────────────────────────────────────
  {
    slug: "aws-cost",
    name: "/aws-cost",
    type: "SKILL",
    tier: "WIP",
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
        caption: "Planned interface",
        code: `# In Claude Code:
/aws-cost

# Or directly:
npx @shua-labs/aws-cost ./infra`,
      },
      status: "Planned",
    },
  },
  {
    slug: "threat-model",
    name: "/threat-model",
    type: "SKILL",
    tier: "WIP",
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
        caption: "Planned interface",
        code: `# In Claude Code:
/threat-model

# Output: THREAT_MODEL.md`,
      },
      status: "Planned",
    },
  },
  {
    slug: "pr-reviewer-saas",
    name: "PR Reviewer SaaS",
    type: "APP",
    tier: "WIP",
    category: "developer-tools",
    principles: ["Production-grade", "Built to enable"],
    tags: ["SaaS", "GitHub App", "Reviews"],
    oneLiner: "Hosted agent that reviews every PR on your repo.",
    links: [
      { label: "GitHub", href: "https://github.com/jmenzies722/shua-labs" },
    ],
    detail: {
      description:
        "A hosted version of Infra Reviewer extended to full code review — install the GitHub App, get senior-level review comments on every PR within minutes, with team-tunable strictness and a budget cap.\n\nFor teams that want the agent in place without standing up the workflow themselves.",
      forWho:
        "Engineering teams that want consistent, high-signal PR review without paying a senior salary for it.",
      status: "Planned",
    },
  },
];
