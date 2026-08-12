#!/usr/bin/env node
/**
 * sync-projects — generate the site's project data from the projects themselves.
 *
 * WHY
 * Same reasoning as sync-registry.mjs: the record of what a project is lives with
 * the project, not in a hand-kept copy on the site. A portfolio that is retyped
 * by hand drifts, and it drifts in the flattering direction — a phase marked done
 * that never finished, a repo described as public that was never opened.
 *
 * Each project owns a `portfolio.yaml` at its root. Evidence in that file is
 * appended by the /phase-done skill from a hook-captured log of commands that
 * actually ran, so a claim on this site traces back to a command, not a memory.
 *
 *   node scripts/sync-projects.mjs            write data/projects.generated.ts
 *   node scripts/sync-projects.mjs --check    exit 1 if the committed file is stale
 *
 * Source override: $PORTFOLIO_ROOTS (colon-separated directories to scan)
 *
 * Zero dependencies, hand-rolled parser for the narrow YAML subset portfolio.yaml
 * uses — matching sync-registry.mjs rather than diverging from it.
 */

import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "data", "projects.generated.ts");
const ROOTS = (
  process.env.PORTFOLIO_ROOTS ||
  [join(homedir(), "Code", "active"), join(homedir(), "Code", "labs")].join(":")
).split(":");

const CHECK = process.argv.includes("--check");

/** Keys that may hold a folded scalar (`key: >-`). */
const FOLDED = new Set(["summary", "claim", "how", "name"]);

/**
 * Parse the portfolio.yaml subset: top-level scalars, inline lists (`[a, b]`),
 * folded scalars, and lists of flat maps. Anything else is ignored rather than
 * guessed at — an unparsed key is a missing field, never a wrong one.
 */
function parsePortfolio(yaml) {
  const doc = {};
  let section = null; // name of the list currently being filled
  let item = null; // map inside that list
  let folded = null; // { target, key, indent }

  for (const raw of yaml.split("\n")) {
    const line = raw.replace(/\s+$/, "");
    const trimmed = line.trim();
    const indent = line.length - line.trimStart().length;

    // A folded scalar absorbs every more-indented line, including blank ones.
    if (folded) {
      if (!trimmed) continue;
      if (indent > folded.indent) {
        const prev = folded.target[folded.key];
        folded.target[folded.key] = prev ? `${prev} ${trimmed}` : trimmed;
        continue;
      }
      folded = null;
    }

    if (!trimmed || trimmed.startsWith("#")) continue;

    // `- key: value` opens a new map in the current list.
    const itemStart = trimmed.match(/^-\s+([a-z_]+):\s*(.*)$/);
    if (itemStart && section) {
      item = {};
      doc[section].push(item);
      const [, key, val] = itemStart;
      if (val === ">-" || val === ">" || val === "|" || val === "|-") {
        item[key] = "";
        // The key sits two columns right of the dash, so continuation lines
        // must clear THAT, not the dash. Measuring from the dash made a
        // sibling key (`how:`) look like more folded text and silently
        // appended a command — with its instance id — onto the claim.
        folded = { target: item, key, indent: indent + 2 };
      } else {
        item[key] = scalar(val);
      }
      continue;
    }

    const kv = trimmed.match(/^([a-z_]+):\s*(.*)$/);
    if (!kv) continue;
    const [, key, val] = kv;

    // Indented key/value lines belong to the open list item.
    const target = indent > 0 && item ? item : doc;
    if (target === doc) {
      section = null;
      item = null;
    }

    if (val === ">-" || val === ">" || val === "|" || val === "|-") {
      if (!FOLDED.has(key)) continue;
      target[key] = "";
      folded = { target, key, indent };
      continue;
    }

    if (val === "") {
      // Bare `key:` at top level opens a list section.
      doc[key] = [];
      section = key;
      item = null;
      continue;
    }

    if (val.startsWith("[") && val.endsWith("]")) {
      target[key] = val
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
      continue;
    }

    target[key] = scalar(val);
  }

  return doc;
}

function scalar(v) {
  const s = v.trim().replace(/^["']|["']$/g, "");
  if (/^-?\d+$/.test(s)) return Number(s);
  return s;
}

function findPortfolios() {
  const found = [];
  for (const root of ROOTS) {
    if (!existsSync(root)) continue;
    for (const dir of readdirSync(root, { withFileTypes: true })) {
      if (!dir.isDirectory()) continue;
      const path = join(root, dir.name, "portfolio.yaml");
      if (existsSync(path)) found.push(path);
    }
  }
  return found.sort();
}

/**
 * PUBLICATION IS AN ALLOWLIST, NOT A COPY — same rule as sync-registry.mjs.
 *
 * `evidence.how` holds the command that proved a claim, and commands carry
 * instance ids, account-specific ARNs, and local paths. It is verification
 * material, not publication material, so it stays out of the built object
 * entirely. Only the claim is published. A field added to portfolio.yaml later
 * is excluded by default rather than published by default.
 */
function toEntry(doc) {
  const isPublic = doc.availability === "public";
  return {
    slug: doc.slug,
    name: doc.name,
    kind: "project",
    availability: isPublic ? "public" : "private",
    summary: doc.summary || "",
    description: doc.summary || "",
    language: Array.isArray(doc.stack) ? doc.stack.join(" · ") : undefined,
    stack: doc.stack || [],
    phases: (doc.phases || []).map((p) => ({
      id: Number(p.id),
      name: p.name,
      status: p.status,
      stepsDone: Number(p.steps_done ?? 0),
      stepsTotal: Number(p.steps_total ?? 0),
    })),
    // The claim only. Never `how`.
    evidence: (doc.evidence || []).map((e) => e.claim).filter(Boolean),
    // Honesty rule, structurally enforced: a repo link is emitted only when the
    // repo is public, so a card can never offer a link that 404s for a visitor.
    links: isPublic && doc.repo ? [{ label: "GitHub", href: doc.repo }] : undefined,
  };
}

/** Same defence in depth as the registry generator. Fails, never warns. */
const LEAK_PATTERNS = [
  [/\/Users\/[a-z0-9._-]+/i, "absolute home path"],
  [/~\/[A-Za-z0-9._\/-]+/, "tilde home path"],
  [/\b(gho_|ghp_|github_pat_|AKIA|ASIA|sk-ant-)[A-Za-z0-9_-]{8,}/, "credential"],
  [/\b\d{12}\b/, "AWS account id"],
  [/\bi-[0-9a-f]{8,17}\b/, "EC2 instance id"],
  [/\barn:aws:/, "ARN"],
  [/\b(day.job|employer|work infra)\b/i, "employment reference"],
];

function assertNoLeaks(entries) {
  const problems = [];
  for (const e of entries) {
    const texts = [e.summary, e.description, e.name, ...(e.evidence || [])];
    for (const value of texts) {
      if (typeof value !== "string") continue;
      for (const [pattern, label] of LEAK_PATTERNS) {
        const m = value.match(pattern);
        if (m) problems.push(`${e.slug}: ${label} — ${JSON.stringify(m[0])}`);
      }
    }
    if ("how" in e) problems.push(`${e.slug}: internal 'how' field must not be published`);
  }
  if (problems.length) {
    console.error("sync-projects: REFUSING TO PUBLISH — sensitive content detected:\n");
    for (const p of problems) console.error(`  ${p}`);
    console.error("\nEvidence commands stay local. Only the claim is published.");
    process.exit(1);
  }
}

function render(entries, hash) {
  return `// ─────────────────────────────────────────────────────────────────────────────
// GENERATED FILE — DO NOT EDIT BY HAND.
//
// Source:     portfolio.yaml in each project repo
// Regenerate: npm run sync:projects
// Verify:     npm run check:projects   (CI fails if this file is stale)
//
// Evidence claims come from a hook-captured log of commands that actually ran,
// so nothing here is a remembered achievement. The command that proved each
// claim stays in the project repo and is deliberately not published.
// ─────────────────────────────────────────────────────────────────────────────

import type { RegistryEntry } from "@/lib/types";

/** Hash of the portfolio.yaml sources this file was generated from. */
export const PROJECTS_SOURCE_HASH = ${JSON.stringify(hash)};

export const generatedProjects: RegistryEntry[] = ${JSON.stringify(entries, null, 2)};
`;
}

function main() {
  const paths = findPortfolios();
  if (paths.length === 0) {
    console.error(`sync-projects: no portfolio.yaml found under ${ROOTS.join(", ")}`);
    console.error("Set $PORTFOLIO_ROOTS if projects live elsewhere.");
    process.exit(1);
  }

  const sources = paths.map((p) => readFileSync(p, "utf8"));
  const docs = sources.map(parsePortfolio);

  for (const [i, doc] of docs.entries()) {
    for (const required of ["slug", "name", "availability", "summary"]) {
      if (!doc[required]) {
        console.error(`sync-projects: ${paths[i]} is missing '${required}'`);
        process.exit(1);
      }
    }
  }

  const hash = createHash("sha256").update(sources.join("\0")).digest("hex").slice(0, 12);
  const entries = docs.map(toEntry);
  assertNoLeaks(entries);
  const output = render(entries, hash);

  if (CHECK) {
    const current = existsSync(OUT) ? readFileSync(OUT, "utf8") : "";
    if (current !== output) {
      console.error("sync-projects: data/projects.generated.ts is STALE.");
      console.error("A project's portfolio.yaml changed but the site was not regenerated.");
      console.error("Fix: npm run sync:projects && commit the result.");
      process.exit(1);
    }
    console.log(`sync-projects: fresh — ${entries.length} projects, source ${hash}`);
    return;
  }

  writeFileSync(OUT, output);
  console.log(`sync-projects: wrote ${entries.length} projects to data/projects.generated.ts`);
  for (const e of entries) {
    const phase = e.phases[0];
    const progress = phase ? `phase ${phase.id} ${phase.stepsDone}/${phase.stepsTotal}` : "—";
    console.log(
      `  ${e.slug.padEnd(14)} ${e.availability.padEnd(8)} ${String(progress).padEnd(16)} ${e.evidence.length} evidence`,
    );
  }
}

main();
