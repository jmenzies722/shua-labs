import * as React from "react";
import type { Tier } from "@/lib/types";
import { cn } from "@/lib/utils";

const tierDot: Record<Tier, string> = {
  Free: "bg-tier-free",
  Freemium: "bg-tier-freemium",
  Paid: "bg-tier-paid",
  WIP: "bg-tier-wip",
};

/**
 * Muted dot-pill. Tier color is a tiny accent dot — calm, no neon.
 */
export function TierBadge({
  tier,
  className,
}: {
  tier: Tier;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-white/[0.04] px-2.5 py-0.5 text-[11px] font-medium text-fg-muted",
        className
      )}
    >
      <span
        aria-hidden
        className={cn("h-1.5 w-1.5 rounded-full", tierDot[tier])}
      />
      {tier}
    </span>
  );
}
