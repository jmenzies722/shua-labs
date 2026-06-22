"use client";

import * as React from "react";
import { Github, Shield, Sparkles, Wrench, Layers, Zap } from "lucide-react";
import { principles } from "@/data/principles";
import { Reveal, RevealGroup } from "@/components/Reveal";
import type { PrincipleEntry } from "@/lib/types";

const ICONS: Record<PrincipleEntry["icon"], React.ComponentType<{ className?: string }>> = {
  Github,
  Shield,
  Sparkles,
  Wrench,
  Layers,
  Zap,
};

/**
 * Editorial principles band. Lead line + three columns. Lots of space.
 */
export function Principles() {
  return (
    <section
      id="principles"
      aria-labelledby="principles-title"
      className="relative py-28 md:py-44"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-line-strong to-transparent"
      />

      <div className="container">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent-hi">
            The thesis
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <h2
            id="principles-title"
            className="mt-6 text-balance text-3xl md:text-5xl font-semibold leading-[1.1] tracking-tighter text-fg max-w-3xl"
          >
            Everything here is open,{" "}
            <span className="text-fg-muted">production-grade</span>, and{" "}
            <span className="text-fg-muted">built to enable</span>.
          </h2>
        </Reveal>

        <RevealGroup
          className="mt-20 md:mt-28 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10"
          stagger={0.1}
        >
          {principles.map((p) => {
            const Icon = ICONS[p.icon];
            return (
              <Reveal key={p.id} y={20}>
                <div className="flex flex-col gap-5">
                  <span
                    aria-hidden
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white/[0.03] text-accent-hi"
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <h3 className="text-xl md:text-[22px] font-semibold tracking-tight text-fg">
                    {p.id}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-fg-muted max-w-sm">
                    {p.definition}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
