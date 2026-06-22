"use client";

import * as React from "react";
import { ArrowUpRight, Github } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { TypeTag } from "@/components/TypeTag";
import { TierBadge } from "@/components/TierBadge";
import { Reveal } from "@/components/Reveal";

interface FeaturedProjectProps {
  project: Project;
  onOpen: (project: Project) => void;
}

/**
 * Full-bleed dark feature band — the "lead with one thing" Apple move.
 * Sits above the category grids. Pulls eye on entry; clicking the
 * primary CTA opens the same detail drawer as the cards.
 */
export function FeaturedProject({ project, onOpen }: FeaturedProjectProps) {
  const githubHref =
    project.links.find((l) => l.label === "GitHub")?.href ??
    "https://github.com/jmenzies722/shua-labs";

  return (
    <section
      aria-label="Featured project"
      className="relative isolate overflow-hidden rounded-2xl border border-line bg-bg-panel"
    >
      {/* Atmospheric glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/3 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(10,132,255,0.22),transparent_65%)] blur-2xl" />
        <div className="absolute -bottom-32 right-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(10,132,255,0.10),transparent_70%)] blur-3xl" />
        <div className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:28px_28px] opacity-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 p-8 md:p-14 lg:p-20">
        <div className="lg:col-span-7 flex flex-col gap-8">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent-hi">
                Featured
              </span>
              <span aria-hidden className="h-px w-8 bg-line-strong" />
              <TypeTag type={project.type} />
              <TierBadge tier={project.tier} />
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <h3 className="text-balance text-4xl md:text-6xl font-semibold leading-[1.02] tracking-tighter text-fg">
              {project.name}
            </h3>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="text-balance text-lg md:text-xl text-fg-muted leading-relaxed max-w-xl">
              {project.oneLiner}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button size="lg" variant="primary" onClick={() => onOpen(project)}>
                Open details
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Link href={githubHref} target="_blank" rel="noreferrer noopener">
                <Button size="lg" variant="outline">
                  <Github className="h-4 w-4" aria-hidden="true" />
                  GitHub
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal
          delay={0.1}
          className="lg:col-span-5 flex"
        >
          {/* Right-side panel: a quiet "what's inside" preview */}
          <div className="flex w-full flex-col gap-5 rounded-xl border border-line bg-black/40 p-6 md:p-8 backdrop-blur-sm">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-hi">
              What&apos;s inside
            </p>
            <ul className="grid gap-3 text-[15px] leading-relaxed text-fg/85">
              <li className="flex items-start gap-3">
                <span aria-hidden className="mt-2 h-1 w-1 rounded-full bg-accent shadow-[0_0_6px_rgba(10,132,255,0.7)]" />
                Curated read-only AWS surface — cost, resources, alarms, logs.
              </li>
              <li className="flex items-start gap-3">
                <span aria-hidden className="mt-2 h-1 w-1 rounded-full bg-accent shadow-[0_0_6px_rgba(10,132,255,0.7)]" />
                Least-privilege IAM policy ships with the server.
              </li>
              <li className="flex items-start gap-3">
                <span aria-hidden className="mt-2 h-1 w-1 rounded-full bg-accent shadow-[0_0_6px_rgba(10,132,255,0.7)]" />
                Structured per-call audit logs out of the box.
              </li>
              <li className="flex items-start gap-3">
                <span aria-hidden className="mt-2 h-1 w-1 rounded-full bg-accent shadow-[0_0_6px_rgba(10,132,255,0.7)]" />
                Drops into Claude Desktop or any MCP-compatible host.
              </li>
            </ul>

            <div className="mt-2 flex flex-wrap gap-2 pt-4 border-t border-line">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-line bg-white/[0.02] px-2.5 py-0.5 text-[11px] text-fg-muted"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
