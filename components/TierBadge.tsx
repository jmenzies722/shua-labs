import * as React from "react";
import type { Tier } from "@/lib/types";
import { cn } from "@/lib/utils";

const tierDot: Record<Tier, string> = {
  Free: "bg-tier-free shadow-[0_0_8px_rgba(52,211,153,0.55)]",
  Freemium: "bg-tier-freemium shadow-[0_0_8px_rgba(96,165,250,0.55)]",
  Paid: "bg-tier-paid shadow-[0_0_8px_rgba(167,139,250,0.55)]",
  WIP: "bg-tier-wip shadow-[0_0_8px_rgba(245,158,11,0.55)]",
};

/**
 * Muted dot-pill. Tier color is a tiny accent dot — not a fill.
 */
export function TierBadge({ tier, className }: { tier: Tier; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-2.5 py-0.5 text-[11px] font-medium text-fg-muted",
        className
      )}
    >
      <span aria-hidden className={cn("h-1.5 w-1.5 rounded-full", tierDot[tier])} />
      {tier}
    </span>
  );
}
