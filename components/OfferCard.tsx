"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Offer } from "@/lib/types";
import { cn } from "@/lib/utils";

interface OfferCardProps {
  offer: Offer;
}

/**
 * Consulting offer card. Flagship offer (middle) gets a subtle accent border,
 * soft glow, and a slight scale lift.
 */
export function OfferCard({ offer }: OfferCardProps) {
  const flagship = !!offer.flagship;

  return (
    <Card
      className={cn(
        "relative flex h-full flex-col p-7 md:p-8",
        flagship
          ? "border-accent-ring shadow-glow lg:scale-[1.03] bg-bg-raised"
          : "hover:border-line-strong hover:shadow-glow-sm hover:-translate-y-0.5"
      )}
    >
      {flagship && (
        <span className="absolute -top-3 left-7 inline-flex items-center gap-2 rounded-full border border-accent-ring bg-bg-panel px-3 py-1 text-[11px] font-mono uppercase tracking-[0.16em] text-accent-hi shadow-[0_8px_24px_-12px_rgba(10,132,255,0.6)]">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(10,132,255,0.8)]" />
          Flagship
        </span>
      )}

      <header className="flex flex-col gap-3">
        <h3 className="text-2xl md:text-[26px] font-semibold tracking-tight text-fg">
          {offer.name}
        </h3>
        <p className="text-[15px] leading-relaxed text-fg-muted">{offer.forWho}</p>
      </header>

      <p className="mt-6 text-[15px] leading-relaxed text-fg/85">
        {offer.deliverable}
      </p>

      <div className="mt-8 pt-6 border-t border-line">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl md:text-[32px] font-semibold tracking-tight text-fg">
            {offer.price}
          </span>
        </div>
        {offer.priceNote && (
          <p className="mt-2 text-[13px] text-fg-muted">{offer.priceNote}</p>
        )}
      </div>

      <div className="mt-auto pt-6">
        <Link href={offer.cta.href}>
          <Button
            variant={flagship ? "primary" : "outline"}
            size="md"
            className="w-full"
          >
            {offer.cta.label}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </Link>
      </div>
    </Card>
  );
}
