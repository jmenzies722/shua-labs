"use client";

import * as React from "react";
import type { Category, Project } from "@/lib/types";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal, RevealGroup } from "@/components/Reveal";

interface CategorySectionProps {
  category: Category;
  projects: Project[];
  onOpen: (project: Project) => void;
}

/**
 * One category band: heading + one-line description + responsive card grid.
 * Empty categories render a tasteful "more shipping soon" placeholder card.
 */
export function CategorySection({
  category,
  projects,
  onOpen,
}: CategorySectionProps) {
  return (
    <section aria-labelledby={`cat-${category.id}-title`} className="scroll-mt-24">
      <Reveal>
        <header className="flex flex-col gap-3 mb-10 md:mb-14">
          <div className="flex items-baseline gap-4">
            <h3
              id={`cat-${category.id}-title`}
              className="text-2xl md:text-4xl font-semibold tracking-tighter text-fg"
            >
              {category.name}
            </h3>
            <span aria-hidden className="h-px flex-1 bg-line" />
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-subtle">
              {projects.length.toString().padStart(2, "0")}
            </span>
          </div>
          <p className="max-w-2xl text-base text-fg-muted leading-relaxed">
            {category.description}
          </p>
        </header>
      </Reveal>

      {projects.length === 0 ? (
        <Reveal>
          <EmptyCategoryCard />
        </Reveal>
      ) : (
        <RevealGroup
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6"
          stagger={0.07}
        >
          {projects.map((p) => (
            <Reveal key={p.slug} y={20}>
              <ProjectCard project={p} onOpen={onOpen} />
            </Reveal>
          ))}
        </RevealGroup>
      )}
    </section>
  );
}

function EmptyCategoryCard() {
  return (
    <div className="rounded-2xl border border-dashed border-line bg-white/[0.015] p-10 md:p-14 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent-hi mb-3">
        On the bench
      </p>
      <p className="text-lg text-fg leading-relaxed">More shipping soon.</p>
      <p className="mt-2 text-sm text-fg-muted">
        Open work lands here as it leaves the workshop.
      </p>
    </div>
  );
}
