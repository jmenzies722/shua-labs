"use client";

import * as React from "react";
import { Github, Shield, Sparkles, Wrench, Layers, Zap } from "lucide-react";
import { principles } from "@/data/principles";
import { Reveal, RevealGroup } from "@/components/Reveal";
import type { PrincipleEntry } from "@/lib/types";
import { cn } from "@/lib/utils";

const ICONS: Record<
  PrincipleEntry["icon"],
  React.ComponentType<{ className?: string }>
> = {
  Github,
  Shield,
  Sparkles,
  Wrench,
  Layers,
  Zap,
};

/**
 * Apple bento grid of brand principles.
 *
 * - Rounded #1d1d1f tiles, radius 24px, generous padding (32-48px).
 * - Varied tile sizes via a 6-column grid: the first tile spans 4 cols ×
 *   2 rows (the lead tile), the other two each span 2 cols.
 * - Each tile: minimal line icon + headline + one definition line.
 * - On mobile collapses to a single column with equal-height tiles.
 */
export function Principles() {
  // Tile sizing — first principle is the "hero" bento, others are equal companions.
  const tileSpans = [
    "md:col-span-4 md:row-span-2", // lead tile (tall)
    "md:col-span-2",
    "md:col-span-2",
  ];
  // Make the smaller two stack under the lead on the right column on md.
  const fallback = "md:col-span-2";

  return (
    <section
      id="principles"
      aria-labelledby="principles-title"
      className="relative apple-section"
    >
      <div className="container max-w-[1100px]">
        <Reveal>
          <p className="apple-eyebrow text-accent">The thesis</p>
        </Reveal>

        <Reveal delay={0.06}>
          <h2
            id="principles-title"
            className="apple-section-title mt-5 text-balance text-fg max-w-3xl"
          >
            Everything here is open,{" "}
            <span className="text-fg-muted">production-grade</span>, and{" "}
            <span className="text-fg-muted">built to enable</span>.
          </h2>
        </Reveal>

        <RevealGroup
          className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-5 auto-rows-[minmax(220px,auto)]"
          stagger={0.1}
        >
          {principles.map((p, i) => {
            const Icon = ICONS[p.icon];
            const span = tileSpans[i] ?? fallback;
            const isLead = i === 0;
            return (
              <Reveal key={p.id} y={28} className={cn(span)}>
                <article
                  className={cn(
                    "h-full flex flex-col justify-between",
                    "rounded-3xl bg-bg-panel border border-line",
                    "transition-[border-color] duration-[250ms] ease-apple",
                    "hover:border-line-strong",
                    isLead ? "p-10 md:p-12" : "p-8 md:p-10"
                  )}
                >
                  <span
                    aria-hidden
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.04] text-accent"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </span>

                  <div className="mt-8 flex flex-col gap-3">
                    <h3
                      className={cn(
                        "font-semibold tracking-apple-section text-fg",
                        isLead
                          ? "text-[28px] md:text-[36px] leading-[1.1]"
                          : "text-[22px] md:text-[24px] leading-[1.15]"
                      )}
                    >
                      {p.id}
                    </h3>
                    <p
                      className={cn(
                        "text-fg-muted leading-relaxed",
                        isLead
                          ? "text-[17px] md:text-[19px] max-w-md"
                          : "text-[15px] max-w-sm"
                      )}
                    >
                      {p.definition}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
