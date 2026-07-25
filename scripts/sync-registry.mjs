#!/usr/bin/env node
/**
 * sync-registry — generate the site's agent data from the machine's agent registry.
 *
 * WHY
 * The registry of record is ~/.claude/agents/registry.yaml. If this site kept its own
 * hand-written copy of the agent list, the two would drift — and a stale public page
 * claiming an agent runs on a model it no longer runs on is exactly the class of silent
 * rot the registry exists to prevent.
 *
 * So the site does not author agent data. It generates it, commits the output, and
 * verifies freshness in CI (see check-registry-fresh.mjs).
 *
 *   node scripts/sync-registry.mjs            write data/registry.generated.ts
 *   node scripts/sync-registry.mjs --check    exit 1 if the committed file is stale
 *
 * Source override: $AGENT_REGISTRY_YAML
 *
 * Zero dependencies — deliberately no YAML library. This reads the narrow subset the
 * registry actually uses, and the parser mirrors the one already proven in
 * ~/.claude/bin/agent-registry.sh against this exact file.
 */

import { createHash } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "data", "registry.generated.ts");
const SRC =
  process.env.AGENT_REGISTRY_YAML || join(homedir(), ".claude", "agents", "registry.yaml");

const CHECK = process.argv.includes("--check");

/** Scalar fields lifted from each agent block. */
const SCALARS = ["version", "status", "domain", "role", "model", "cost_class", "memory"];
/** Inline-list fields, e.g. `tools: [Bash, Read]`. */
const LISTS = ["tools", "capabilities", "hands_off_to", "consumes", "produces"];

function parseAgents(yaml) {
  // Isolate the `agents:` block: everything from the line `agents:` up to the next
  // top-level key (a non-indented `word:`). Prevents `gaps:` bleeding in.
  const lines = yaml.split("\n");
  const start = lines.findIndex((l) => /^agents:\s*$/.test(l));
  if (start === -1) throw new Error("no `agents:` block found in registry.yaml");

  let end = lines.length;
  for (let i = start + 1; i < lines.length; i++) {
    if (/^[A-Za-z_][\w-]*:/.test(lines[i])) {
      end = i;
      break;
    }
  }

  const agents = [];
  let cur = null;
  let block = null; // key currently absorbing a folded scalar (`notes: >`)
  let blockIndent = 0;

  for (const raw of lines.slice(start + 1, end)) {
    const line = raw.replace(/\s+$/, "");
    const trimmed = line.trim();
    const indent = line.length - line.trimStart().length;

    // Continue a folded scalar before anything else — a blank line inside one is a
    // paragraph break, not the end of it.
    if (block && cur) {
      if (!trimmed) continue;
      if (indent > blockIndent) {
        cur[block] = (cur[block] ? cur[block] + " " : "") + trimmed;
        continue;
      }
      block = null;
    }

    if (!trimmed || trimmed.startsWith("#")) continue;

    const idMatch = trimmed.match(/^-\s+id:\s*(.+)$/);
    if (idMatch) {
      cur = { id: idMatch[1].trim() };
      agents.push(cur);
      continue;
    }
    if (!cur) continue;

    const kv = trimmed.match(/^([a-z_]+):\s*(.*)$/);
    if (!kv) continue;
    const [, key, rawVal] = kv;
    const val = rawVal.trim();

    if (val === ">" || val === "|" || val === ">-" || val === "|-") {
      if (SCALARS.includes(key) || key === "notes") {
        cur[key] = "";
        block = key;
        blockIndent = indent;
      }
      continue;
    }

    if (LISTS.includes(key) && val.startsWith("[") && val.endsWith("]")) {
      cur[key] = val
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      continue;
    }

    if (SCALARS.includes(key) || key === "notes") {
      cur[key] = val.replace(/^["']|["']$/g, "");
    }
  }

  return agents;
}

const WRITE_TOOLS = new Set(["Edit", "Write", "NotebookEdit"]);

/**
 * PUBLICATION IS AN ALLOWLIST, NOT A COPY.
 *
 * The `notes:` field in registry.yaml is internal engineering commentary. It
 * legitimately contains things that must never reach a public page: employer
 * system names, local filesystem paths, personal career strategy, references to
 * internal guard mechanics. An earlier version of this script published `notes`
 * verbatim and would have leaked all four.
 *
 * So the generator does not copy the source object. It constructs a new one from
 * an explicit list of fields known to be safe, and `notes` is not on that list.
 * Anything added to registry.yaml in future is excluded by default rather than
 * published by default — the failure mode is omission, never disclosure.
 */
function toEntry(a) {
  const tools = a.tools || [];
  const readOnly = tools.length > 0 && !tools.some((t) => WRITE_TOOLS.has(t));
  const role = a.role || "";
  return {
    slug: a.id,
    name: a.id,
    kind: "agent",
    // The crew encodes personal context and is not distributed. Always private.
    availability: "private",
    summary: role,
    // `role` only. NEVER `notes` — see the comment above.
    description: role,
    version: a.version,
    domain: a.domain,
    model: a.model,
    costClass: a.cost_class,
    tools,
    capabilities: a.capabilities || [],
    handsOffTo: a.hands_off_to || [],
    readOnly,
  };
}

/**
 * Defence in depth. The allowlist above should make this unreachable — which is
 * exactly why it exists. Fails the generation rather than warning, because a
 * warning printed during a build is a warning nobody reads.
 *
 * Patterns are generic and structural (paths, credentials, personal-finance
 * language) so no sensitive term has to be written down here to be caught.
 */
const LEAK_PATTERNS = [
  [/\/Users\/[a-z0-9._-]+/i, "absolute home path"],
  [/~\/[A-Za-z0-9._\/-]+/, "tilde home path"],
  [/\b(gho_|ghp_|github_pat_|AKIA|sk-ant-)[A-Za-z0-9_-]{8,}/, "credential"],
  [/\bcomp case\b|\bsalary\b|\braise\b(?!\s+an?\s+(error|exception))/i, "personal compensation strategy"],
  [/\b(day.job|employer|work infra)\b/i, "employment reference"],
  [/\b\d{6,}\b/, "long numeric id (possible account number)"],
];

/** Fields whose contents are rendered on the public site. */
const PUBLISHED_TEXT_FIELDS = ["summary", "description", "domain", "name"];

function assertNoLeaks(entries) {
  const problems = [];
  for (const e of entries) {
    for (const field of PUBLISHED_TEXT_FIELDS) {
      const value = e[field];
      if (typeof value !== "string") continue;
      for (const [pattern, label] of LEAK_PATTERNS) {
        const m = value.match(pattern);
        if (m) problems.push(`${e.slug}.${field}: ${label} — ${JSON.stringify(m[0])}`);
      }
    }
    if ("notes" in e) problems.push(`${e.slug}: internal 'notes' field must not be published`);
  }
  if (problems.length) {
    console.error("sync-registry: REFUSING TO PUBLISH — sensitive content detected:\n");
    for (const p of problems) console.error(`  ${p}`);
    console.error("\nRegistry notes are internal. Only `role` is published for agents.");
    process.exit(1);
  }
}

function render(entries, hash) {
  return `// ─────────────────────────────────────────────────────────────────────────────
// GENERATED FILE — DO NOT EDIT BY HAND.
//
// Source:    ~/.claude/agents/registry.yaml
// Regenerate: npm run sync:registry
// Verify:     npm run check:registry   (CI fails if this file is stale)
//
// The agent crew is defined once, on the machine that runs it. This file is a
// build artifact of that definition so the public site cannot claim something
// the registry no longer says.
// ─────────────────────────────────────────────────────────────────────────────

import type { RegistryEntry } from "@/lib/types";

/** Hash of the source YAML this file was generated from. */
export const REGISTRY_SOURCE_HASH = ${JSON.stringify(hash)};

export const generatedAgents: RegistryEntry[] = ${JSON.stringify(entries, null, 2)};
`;
}

function main() {
  if (!existsSync(SRC)) {
    console.error(`sync-registry: source not found at ${SRC}`);
    console.error("Set $AGENT_REGISTRY_YAML if the registry lives elsewhere.");
    process.exit(1);
  }

  const yaml = readFileSync(SRC, "utf8");
  const agents = parseAgents(yaml);

  if (agents.length === 0) {
    console.error("sync-registry: parsed 0 agents — refusing to write an empty registry");
    process.exit(1);
  }

  for (const a of agents) {
    if (!a.version || !a.model) {
      console.error(`sync-registry: agent '${a.id}' is missing version or model`);
      process.exit(1);
    }
  }

  const hash = createHash("sha256").update(yaml).digest("hex").slice(0, 12);
  const entries = agents.map(toEntry);
  assertNoLeaks(entries);
  const output = render(entries, hash);

  if (CHECK) {
    const current = existsSync(OUT) ? readFileSync(OUT, "utf8") : "";
    if (current !== output) {
      console.error("sync-registry: data/registry.generated.ts is STALE.");
      console.error("The agent registry changed but the site was not regenerated.");
      console.error("Fix: npm run sync:registry && commit the result.");
      process.exit(1);
    }
    console.log(`sync-registry: fresh — ${agents.length} agents, source ${hash}`);
    return;
  }

  writeFileSync(OUT, output);
  console.log(`sync-registry: wrote ${agents.length} agents to data/registry.generated.ts`);
  for (const a of agents) {
    const ro = toEntry(a).readOnly ? "  read-only" : "";
    console.log(`  ${a.id.padEnd(10)} ${String(a.version).padEnd(7)} ${a.model}${ro}`);
  }
}

main();
