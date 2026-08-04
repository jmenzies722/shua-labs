import type { RegistryEntry } from "@/lib/types";

/**
 * MCP servers and harness tools — hand-authored.
 *
 * Agents are NOT here. They are generated from ~/.claude/agents/registry.yaml into
 * data/registry.generated.ts, because a hand-written copy would drift from the machine
 * that actually runs them. See scripts/sync-registry.mjs.
 *
 * HONESTY RULE (inherited from data/projects.ts):
 * `install` may only be present when the thing is genuinely public and the command
 * genuinely works. Private entries omit `install` entirely — InstallBlock renders
 * nothing without it, so the rule is enforced by structure rather than by discipline.
 * No install command that 404s. No "public" badge on a private repo.
 */
export const servers: RegistryEntry[] = [
  {
    slug: "mcp-sync",
    name: "mcp-sync",
    kind: "tool",
    availability: "public",
    summary:
      "One MCP server set across Claude Code, Cursor, Warp, and Claude Desktop — with drift detection.",
    description:
      "Four AI tools, four separate MCP config files, no awareness of each other. You add a server to one and forget the rest. The configs drift, and the drift is silent: a broken server reports only \"Failed to connect\", never that the path is stale or that the environment variable you referenced was never exported.\n\nmcp-sync defines the servers once and generates the rest. `check` reports drift and exits non-zero; `sync` reconciles every tool; `diff` shows exactly what would change. It also catches the most common silent killer — an `${env:VAR}` reference pointing at a variable nobody ever exported.\n\nZero third-party dependencies, single file, Python 3.8+. 21 tests, green on Linux, macOS, and Windows.",
    language: "Python",
    install: {
      label: "Install",
      code: `curl -o ~/.local/bin/mcp-sync \\
  https://raw.githubusercontent.com/jmenzies722/mcp-sync/main/mcp_sync.py
chmod +x ~/.local/bin/mcp-sync

mcp-sync init     # build one canonical list from configs you already have
mcp-sync check    # what drifted — exit 1 if anything did
mcp-sync sync     # reconcile every tool to the canonical list`,
    },
    links: [
      { label: "GitHub", href: "https://github.com/jmenzies722/mcp-sync" },
      { label: "MIT licence", href: "https://github.com/jmenzies722/mcp-sync/blob/main/LICENSE" },
    ],
    notes:
      "Zero dependencies on purpose. A tool that repairs broken configs should not itself break because of a dependency tree.",
  },
  {
    slug: "aws-architect",
    name: "AWS Architect MCP",
    kind: "server",
    availability: "public",
    summary:
      "Turns an agent into an AWS solutions architect — patterns, Terraform, IAM, and cost estimates.",
    description:
      "An MCP server that designs AWS architectures and emits the artifacts to build them: ready-to-apply Terraform, a least-privilege IAM policy, a monthly cost estimate, and a scaffolded project layout. Eight tools over twelve serverless reference patterns.\n\nIt now starts behind a self-healing launcher. The server died twice in one night — first from a gitignored `node_modules` that was never reinstalled, then from a directory reorganisation that wiped it again. Both failures were silent. The launcher checks its own dependencies and repairs them before starting.",
    toolCount: 8,
    language: "TypeScript",
    links: [
      { label: "GitHub", href: "https://github.com/jmenzies722/aws-architect-mcp" },
    ],
    notes:
      "The permanent fix is publishing to npm so `npx` resolves it — the package is already staged for that.",
  },
  {
    slug: "github-broker",
    name: "github (keyring broker)",
    kind: "server",
    availability: "public",
    summary:
      "The upstream GitHub MCP server, wrapped so no token is ever written to a config file.",
    description:
      "The GitHub server itself is upstream and unmodified. What's notable is how it's launched: a small wrapper fetches the token from the OS keyring at spawn time rather than reading it from configuration.\n\nThis replaced a live OAuth token sitting in plaintext in a local config file. The config now holds a path, never a credential — and rotating the token needs no config edit at all. Same broker pattern as aws-vault for AWS.",
    language: "Shell",
    install: {
      label: "The whole wrapper",
      code: `#!/bin/bash
GITHUB_TOKEN="$(gh auth token)" \\
  exec npx -y @modelcontextprotocol/server-github`,
    },
    links: [
      {
        label: "Upstream server",
        href: "https://github.com/modelcontextprotocol/servers/tree/main/src/github",
      },
    ],
    notes:
      "Credentials should be fetched, never stored. Nine lines is the whole idea.",
  },
  {
    slug: "shua-brain",
    name: "shua-brain",
    kind: "server",
    availability: "private",
    summary:
      "Semantic search over a personal notes vault, available to every MCP client at once.",
    description:
      "Exposes a personal knowledge vault as MCP tools — semantic search, read, list, and an index-health check. Retrieval is by meaning, so a question about compensation surfaces the monetisation notes even with no shared keywords.\n\nIt wraps an existing embedding index rather than building its own. Two indexes over one corpus drift, and the stale one wins roughly half the time, silently. There is exactly one index and this is a reader of it. When the embedding backend is unavailable it degrades to literal search and says so — a quietly degraded result is worse than a stated one.",
    toolCount: 4,
    language: "Python",
    notes:
      "Private: it reads one person's notes and would be useless to anyone else.",
  },
  {
    slug: "shua-registry",
    name: "shua-registry",
    kind: "server",
    availability: "private",
    summary:
      "Serves the agent catalogue to any MCP client, so every tool agrees on who does what.",
    description:
      "The agent registry is readable by one tool by default. This server exposes it to all of them — list agents, query the capability index, validate for drift, and read any single agent's full definition.\n\nRead-only by design. Mutating a registry from a chat surface would let an agent quietly grant itself tools or downgrade its own model. Edits go through the file and the validator, where version control records them.",
    toolCount: 5,
    language: "Python",
    notes:
      "This site's agent pages are generated from the same registry this server reads.",
  },
  {
    slug: "shua-awscost",
    name: "shua-awscost",
    kind: "server",
    availability: "private",
    summary:
      "AWS spend and budget headroom, surfaced where provisioning decisions actually happen.",
    description:
      "Month-to-date spend by service, daily spend with trend detection, and budget headroom — in front of the agent that is about to provision something, rather than in a billing alarm after the fact.\n\nEvery result is cached on disk for six hours. The Cost Explorer API bills one cent per request, so an agent polling it would spend real money against the cap it exists to protect. Six hours is deliberate: the underlying data lags a day anyway, so a fresher call buys nothing and charges a cent. Every response states whether it was cached or billed.",
    toolCount: 4,
    language: "Python",
    notes:
      "Credentials via aws-vault only. Read-only — it cannot provision, modify, or delete.",
  },
];

export const tools: RegistryEntry[] = [
  {
    slug: "claude-max",
    name: "claude-max",
    kind: "tool",
    availability: "public",
    summary:
      "Audits your entire Claude setup — Code, Desktop, Warp, Cursor — against a 9-dimension rubric and hands back a ranked fix plan.",
    description:
      "`/claude-max` scores Skills, Subagents, Hooks, settings.json, MCP, Registry portability, CLAUDE.md/memory, output style, and cross-tool unification — each 0–10 with a one-line justification and the single highest-leverage fix, rolled into an overall grade. It reads your actual files rather than assuming, and a version-dependent claim gets marked ⚠️verify instead of stated as fact.\n\nAUDIT is read-only by default. FIX applies approved items with a backup first and re-scores what it touched. REGISTRY turns a `~/.claude` directory into a versioned, installable plugin — the same mechanism this site's own agent registry runs on.",
    install: {
      label: "Install",
      code: `/plugin marketplace add jmenzies722/claude-max
/plugin install claude-max@claude-max

# then, in any project:
/claude-max`,
    },
    links: [
      { label: "GitHub", href: "https://github.com/jmenzies722/claude-max" },
      { label: "MIT licence", href: "https://github.com/jmenzies722/claude-max/blob/main/LICENSE" },
    ],
    notes:
      "No theater rule: a hook only counts toward the score if it uses exit code 2 — the only thing that actually blocks under bypassPermissions.",
  },
  {
    slug: "claude-setup",
    name: "claude-setup",
    kind: "tool",
    availability: "public",
    summary:
      "Scores a Claude Code environment 0–100, detects your engineering profile, and generates a tailored CLAUDE.md.",
    description:
      "`/setup` checks six layers — CLAUDE.md, settings and hooks, MCP servers (including OAuth MCPs it detects from live session context, since those never show up in settings.json), skills, credentials, and memory — and grades the result S through D. First run detects an engineering profile from installed tools (DevOps/Platform, AI Builder, Full-stack, Researcher, Enterprise) and tailors its recommendations to it.\n\nEvery fix shows a diff before it applies, merges into existing config rather than overwriting it, and re-runs the layer scan afterward to confirm it actually worked. A 10-step onboarding mode walks a fresh machine through setup with a verification gate at each step.",
    install: {
      label: "Install",
      code: `curl -fsSL https://raw.githubusercontent.com/jmenzies722/claude-setup/main/install.sh | bash

# then, in any Claude Code session:
/setup`,
    },
    links: [
      { label: "GitHub", href: "https://github.com/jmenzies722/claude-setup" },
    ],
    notes:
      "Honest scoring by design — the README states it plainly: a 60 is better feedback than a fake 90.",
  },
  {
    slug: "agent-registry",
    name: "agent-registry",
    kind: "tool",
    availability: "private",
    summary:
      "Validates every agent against the manifest — model pins, tool scope, handoffs.",
    description:
      "A registry is only worth keeping if it can be checked. This validates that every agent on disk has a manifest entry and vice versa, that declared tools match reality, that handoffs resolve to real agents, and that no agent holds a restricted tool without a waiver.\n\nThe load-bearing check is model policy. An audit found all eight agents and every skill pinned to a previous model generation — twenty-four stale pins that nothing caught, because nothing was watching. A single allow-list is now the chokepoint: adding the next generation is one line, and the validator names everything that needs migrating.\n\nExits non-zero, so it gates a hook or a CI job.",
    language: "Bash + Python",
    notes:
      "Machine-specific paths and personal agent definitions — not distributed.",
  },
  {
    slug: "harness-doctor",
    name: "harness-doctor",
    kind: "tool",
    availability: "private",
    summary:
      "Fourteen checks across the whole harness, and safe auto-repair for what has drifted.",
    description:
      "One command that checks everything: registry drift, MCP config drift across four tools, a live handshake against every server, a credential scan, plugin validity, and backup status. The handshake is the check that would have caught a server being dead for weeks.\n\n`--fix` repairs only what is idempotent and non-destructive — resyncing config from the canonical file, reinstalling a missing dependency. It never deletes, never rewrites an agent, and never touches credentials. Those need a human.",
    language: "Bash + Python",
    notes:
      "Every failure it checks for was a real, silent failure found in a single audit.",
  },
];

/** Hand-authored entries, in display order. */
export const authoredEntries: RegistryEntry[] = [...servers, ...tools];
