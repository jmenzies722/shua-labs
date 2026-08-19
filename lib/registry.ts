import { generatedAgents, REGISTRY_SOURCE_HASH } from "@/data/registry.generated";
import { generatedProjects, PROJECTS_SOURCE_HASH } from "@/data/projects.generated";
import { authoredEntries } from "@/data/registry";
import type { RegistryEntry, RegistryKind } from "@/lib/types";

/**
 * The registry, assembled.
 *
 * Three sources, one list:
 *   - agents        GENERATED from ~/.claude/agents/registry.yaml
 *   - projects      GENERATED from each project's portfolio.yaml
 *   - servers/tools hand-authored in data/registry.ts
 *
 * Everything downstream reads from here, so there is exactly one place that
 * knows how the parts combine.
 */

export { REGISTRY_SOURCE_HASH, PROJECTS_SOURCE_HASH };

export const KIND_ORDER: RegistryKind[] = ["project", "agent", "server", "tool"];

export const KIND_META: Record<
  RegistryKind,
  { label: string; plural: string; blurb: string }
> = {
  project: {
    label: "Project",
    plural: "Projects",
    blurb:
      "Built to learn the stack, not to demo it. Each claim below is backed by a command that actually ran — captured while building, not written up afterwards.",
  },
  agent: {
    label: "Agent",
    plural: "Agents",
    blurb:
      "Specialists that do the work. Each declares its tools, model tier, and who it hands off to. Three hold no write tools at all.",
  },
  server: {
    label: "MCP Server",
    plural: "MCP Servers",
    blurb:
      "What the agents can actually reach. Without one, a model cannot touch that system at all.",
  },
  tool: {
    label: "Harness Tool",
    plural: "Harness Tools",
    blurb:
      "Never in the path when work happens. They exist only to notice when everything above breaks.",
  },
};

export function allEntries(): RegistryEntry[] {
  return [...generatedProjects, ...generatedAgents, ...authoredEntries];
}

export function byKind(kind: RegistryKind): RegistryEntry[] {
  return allEntries().filter((e) => e.kind === kind);
}

export function bySlug(slug: string): RegistryEntry | undefined {
  return allEntries().find((e) => e.slug === slug);
}

export function publicEntries(): RegistryEntry[] {
  return allEntries().filter((e) => e.availability === "public");
}

export function registryCounts() {
  const all = allEntries();
  return {
    total: all.length,
    agents: all.filter((e) => e.kind === "agent").length,
    servers: all.filter((e) => e.kind === "server").length,
    tools: all.filter((e) => e.kind === "tool").length,
    open: all.filter((e) => e.availability === "public").length,
  };
}

/** Split a description on blank lines into paragraphs. */
export function paragraphs(text: string): string[] {
  return text
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean);
}
