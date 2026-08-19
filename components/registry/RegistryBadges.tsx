import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Availability, RegistryKind } from "@/lib/types";

/**
 * Availability is the load-bearing badge on this site.
 *
 * "Public" means the source is genuinely reachable and, where an install command
 * is shown, it genuinely works. "Private" means catalogued but not distributed —
 * shown so the depth of the system is visible without implying anyone can
 * download it. Same honesty rule the project gallery runs on.
 */
export function AvailabilityBadge({
  availability,
  className,
}: {
  availability: Availability;
  className?: string;
}) {
  const isPublic = availability === "public";
  return (
    <Badge
      className={cn(
        "rounded-none font-mono uppercase tracking-[0.08em]",
        // Inversion is the only emphasis this palette has, and public is the
        // state worth emphasising — it is the one that means "you can have it".
        isPublic
          ? "border-fg bg-fg text-bg"
          : "border-line text-fg-subtle",
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "h-1.5 w-1.5",
          isPublic ? "bg-bg" : "bg-fg-faint"
        )}
      />
      {isPublic ? "Public" : "Private"}
    </Badge>
  );
}

const KIND_LABEL: Record<RegistryKind, string> = {
  project: "Project",
  agent: "Agent",
  server: "MCP Server",
  tool: "Tool",
};

export function KindBadge({
  kind,
  className,
}: {
  kind: RegistryKind;
  className?: string;
}) {
  return (
    <Badge
      className={cn(
        "rounded-none font-mono uppercase tracking-[0.08em]",
        className
      )}
    >
      {KIND_LABEL[kind]}
    </Badge>
  );
}

/**
 * Read-only is a design guarantee, not a limitation — a verifier that can rewrite
 * what it verifies isn't a verifier. Worth calling out wherever it's true.
 */
export function ReadOnlyBadge({ className }: { className?: string }) {
  return (
    <Badge
      className={cn(
        "rounded-none border-line-hi font-mono uppercase tracking-[0.08em] text-fg",
        className
      )}
      title="Holds no Edit or Write tools — enforced by the registry validator"
    >
      Read-only
    </Badge>
  );
}

export function ChipList({
  items,
  max,
  className,
}: {
  items: string[];
  max?: number;
  className?: string;
}) {
  if (items.length === 0) return null;
  const shown = typeof max === "number" ? items.slice(0, max) : items;
  const rest = items.length - shown.length;

  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)}>
      {shown.map((item) => (
        <li
          key={item}
          className="border border-line bg-white/[0.03] px-2 py-0.5 font-mono text-[11px] text-fg-subtle"
        >
          {item}
        </li>
      ))}
      {rest > 0 && (
        <li className="px-1 py-0.5 font-mono text-[11px] text-fg-subtle">
          +{rest}
        </li>
      )}
    </ul>
  );
}
