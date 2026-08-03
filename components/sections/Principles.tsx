"use client";

import * as React from "react";
import { Github, Shield, Sparkles, Wrench, Layers, Zap } from "lucide-react";
import { principles } from "@/data/principles";
import { Reveal, RevealGroup } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import type { PrincipleEntry } from "@/lib/types";

const ICONS: Record<
  PrincipleEntry["icon"],
  React.ComponentType<{ className?: string }>
> = { Github, Shield, Sparkles, Wrench, Layers, Zap };

/**
 * The rules the platform runs on.
 *
 * Three equal panels separated by hairlines rather than a bento grid of
 * differently-sized tiles. These rules do not rank against each other — sizing
 * one larger would say the other two are optional, and the middle one is the
 * whole reason this site exists.
 */
export function Principles() {
  return (
    <section
      id="rules"
      aria-labelledby="rules-title"
      className="term-section"
    >
      <div className="container max-w-[1180px]">
        <Reveal>
          <SectionHeading
            id="rules-title"
            eyebrow="the rules"
            title={
              <>
                Constraints,{" "}
                <span className="text-fg-subtle">not values.</span>
              </>
            }
            lead="These are the operating rules from the CONTROL PLANE charter. They exist because the failure mode is not picking the wrong thing to build — it is starting the next thing before finishing this one."
          />
        </Reveal>

        <RevealGroup
          className="mt-14 grid gap-px border border-line bg-line md:grid-cols-3"
          stagger={0.08}
        >
          {principles.map((p, i) => {
            const Icon = ICONS[p.icon];
            return (
              <Reveal key={p.id} y={18} className="h-full">
                <article className="flex h-full flex-col bg-bg p-7 md:p-9">
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className="inline-flex h-8 w-8 items-center justify-center border border-line text-fg-muted"
                    >
                      <Icon className="h-[15px] w-[15px]" />
                    </span>
                    <span className="font-mono text-[11px] tabular-nums text-fg-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-7 font-mono text-[17px] font-semibold leading-[1.2] tracking-[-0.03em] text-fg md:text-[19px]">
                    {p.id}
                  </h3>
                  <p className="term-prose mt-3 text-[14.5px]">{p.definition}</p>
                </article>
              </Reveal>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
