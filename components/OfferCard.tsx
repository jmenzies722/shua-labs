"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Offer } from "@/lib/types";
import { cn } from "@/lib/utils";

interface OfferCardProps {
  offer: Offer;
}

/**
 * Apple pricing tile.
 *
 * - #1d1d1f surface (#161617 lifted for the flagship), 20px radius,
 *   hairline border, generous padding.
 * - Flagship gets a subtle 1px accent ring (NOT a neon glow explosion)
 *   and the slightly lighter surface — Apple's quiet "this is the one"
 *   treatment.
 * - Price uses big SF semibold.
 */
export function OfferCard({ offer }: OfferCardProps) {
  const flagship = !!offer.flagship;

  return (
    <article
      className={cn(
        "relative flex h-full flex-col rounded-2xl border bg-bg-panel p-8 md:p-10",
        "transition-colors duration-[250ms] ease-apple",
        flagship
          ? "border-transparent bg-bg-raised shadow-ring"
          : "border-line hover:border-line-strong"
      )}
    >
      {flagship && (
        <span className="absolute -top-3 left-7 inline-flex items-center gap-2 rounded-full bg-bg-panel border border-line px-3 py-1 text-[12px] font-medium text-accent">
          <span
            aria-hidden
            className="h-1.5 w-1.5 rounded-full bg-accent"
          />
          Flagship
        </span>
      )}

      <header className="flex flex-col gap-3">
        <h3 className="text-[24px] md:text-[28px] font-semibold tracking-apple-section leading-[1.15] text-fg">
          {offer.name}
        </h3>
        <p className="text-[15px] leading-[1.47] text-fg-muted">
          {offer.forWho}
        </p>
      </header>

      <p className="mt-6 text-[15px] leading-[1.47] text-fg/85">
        {offer.deliverable}
      </p>

      <div className="mt-8 pt-6 border-t border-line">
        <div className="flex items-baseline gap-2">
          <span className="text-[32px] md:text-[40px] font-semibold tracking-apple-tight leading-none text-fg">
            {offer.price}
          </span>
        </div>
        {offer.priceNote && (
          <p className="mt-3 text-[13px] text-fg-muted leading-[1.47]">
            {offer.priceNote}
          </p>
        )}
      </div>

      <div className="mt-auto pt-8">
        <Link href={offer.cta.href}>
          <Button
            variant={flagship ? "primary" : "outline"}
            size="md"
            className="w-full"
          >
            {offer.cta.label}
          </Button>
        </Link>
      </div>
    </article>
  );
}
