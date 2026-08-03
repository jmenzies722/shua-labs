import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  AvailabilityBadge,
  ChipList,
  ReadOnlyBadge,
} from "@/components/registry/RegistryBadges";
import { cn } from "@/lib/utils";
import type { RegistryEntry } from "@/lib/types";

/**
 * One registry entry as a tile.
 *
 * Meta line differs by kind because the useful facts differ: an agent is defined
 * by its model and cost tier, a server by how many tools it exposes and in what
 * language. Showing a blank "—" for the inapplicable field would be noise.
 */
export function RegistryCard({ entry }: { entry: RegistryEntry }) {
  const meta =
    entry.kind === "agent"
      ? [entry.model, entry.costClass && `${entry.costClass} cost`]
      : [entry.language, entry.toolCount && `${entry.toolCount} tools`];

  const chips =
    entry.kind === "agent" ? entry.capabilities ?? [] : [];

  return (
    <Card className="group h-full rounded-none border-0 bg-transparent hover:bg-white/[0.02]">
      <Link
        href={`/registry/${entry.slug}`}
        className="flex h-full flex-col gap-3 p-5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-fg"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate font-mono text-[15px] font-semibold tracking-tight text-fg">
              {entry.name}
            </h3>
            {entry.domain && (
              <p className="mt-0.5 font-mono text-[11px] text-fg-subtle">
                {entry.domain}
              </p>
            )}
          </div>
          <ArrowUpRight
            aria-hidden="true"
            className="h-4 w-4 shrink-0 text-fg-subtle transition-colors duration-200 group-hover:text-fg-muted"
          />
        </div>

        <p className="text-[13.5px] leading-[1.5] text-fg-muted">
          {entry.summary}
        </p>

        {chips.length > 0 && <ChipList items={chips} max={3} className="mt-auto" />}

        <div
          className={cn(
            "flex flex-wrap items-center gap-1.5",
            chips.length === 0 && "mt-auto"
          )}
        >
          <AvailabilityBadge availability={entry.availability} />
          {entry.readOnly && <ReadOnlyBadge />}
          {meta.filter(Boolean).map((m) => (
            <span key={String(m)} className="font-mono text-[11px] text-fg-subtle">
              {m}
            </span>
          ))}
        </div>
      </Link>
    </Card>
  );
}
