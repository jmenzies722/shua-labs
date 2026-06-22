"use client";

import * as React from "react";
import type { Project } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { TypeTag } from "@/components/TypeTag";
import { TierBadge } from "@/components/TierBadge";
import { Reveal } from "@/components/Reveal";
import { AppleLink } from "@/components/AppleLink";

interface FeaturedProjectProps {
  project: Project;
  onOpen: (project: Project) => void;
}

/**
 * Apple flagship band — "lead with one thing" treatment.
 *
 * Toned down from v2's neon-heavy radial-glow look to a clean Apple bento
 * tile: #1d1d1f surface, generous padding, big SF semibold headline,
 * primary pill + chevron text link. A quiet "what's inside" panel sits
 * on the right.
 */
export function FeaturedProject({ project, onOpen }: FeaturedProjectProps) {
  const githubHref =
    project.links.find((l) => l.label === "GitHub")?.href ??
    "https://github.com/jmenzies722/shua-labs";

  return (
    <section
      aria-label="Featured project"
      className="relative isolate overflow-hidden rounded-3xl border border-line bg-bg-panel"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 p-10 md:p-16 lg:p-20">
        <div className="lg:col-span-7 flex flex-col gap-8">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <span className="apple-eyebrow text-accent">Featured</span>
              <span aria-hidden className="h-px w-8 bg-line-strong" />
              <TypeTag type={project.type} />
              <TierBadge tier={project.tier} />
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <h3 className="apple-section-title text-balance text-fg">
              {project.name}
            </h3>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="apple-sub text-balance max-w-xl">
              {project.oneLiner}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4 pt-2">
              <Button
                size="lg"
                variant="primary"
                onClick={() => onOpen(project)}
              >
                Open details
              </Button>
              <AppleLink href={githubHref} external>
                View on GitHub
              </AppleLink>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-5 flex">
          {/* Right-side panel — a quiet "what's inside" preview. */}
          <div className="flex w-full flex-col gap-5 rounded-2xl bg-bg-raised border border-line p-8">
            <p className="apple-eyebrow text-accent text-[17px]">
              What&apos;s inside
            </p>
            <ul className="grid gap-3 text-[15px] leading-[1.47] text-fg/85">
              <li className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-2 h-1 w-1 rounded-full bg-accent"
                />
                Curated read-only AWS surface — cost, resources, alarms, logs.
              </li>
              <li className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-2 h-1 w-1 rounded-full bg-accent"
                />
                Least-privilege IAM policy ships with the server.
              </li>
              <li className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-2 h-1 w-1 rounded-full bg-accent"
                />
                Structured per-call audit logs out of the box.
              </li>
              <li className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-2 h-1 w-1 rounded-full bg-accent"
                />
                Drops into Claude Desktop or any MCP-compatible host.
              </li>
            </ul>

            <div className="mt-2 flex flex-wrap gap-2 pt-4 border-t border-line">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-white/[0.04] px-2.5 py-0.5 text-[11px] text-fg-muted"
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
