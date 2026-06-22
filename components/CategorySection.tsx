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
 * One category band: Apple-fidelity heading + description + tile grid.
 * Empty categories render a tasteful "more shipping soon" placeholder tile.
 */
export function CategorySection({
  category,
  projects,
  onOpen,
}: CategorySectionProps) {
  return (
    <section
      aria-labelledby={`cat-${category.id}-title`}
      className="scroll-mt-24"
    >
      <Reveal>
        <header className="flex flex-col gap-3 mb-10 md:mb-12">
          <div className="flex items-baseline gap-4">
            <h3
              id={`cat-${category.id}-title`}
              className="text-[28px] md:text-[36px] font-semibold tracking-apple-section leading-[1.1] text-fg"
            >
              {category.name}
            </h3>
            <span aria-hidden className="h-px flex-1 bg-line" />
            <span className="font-mono text-[12px] tracking-[0.05em] text-fg-subtle">
              {projects.length.toString().padStart(2, "0")}
            </span>
          </div>
          <p className="max-w-2xl text-[17px] text-fg-muted leading-[1.47]">
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
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
          stagger={0.08}
        >
          {projects.map((p) => (
            <Reveal key={p.slug} y={28}>
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
    <div className="rounded-2xl border border-dashed border-line bg-bg-panel/40 p-10 md:p-14 text-center">
      <p className="apple-eyebrow text-accent mb-3">On the bench</p>
      <p className="text-[19px] text-fg leading-relaxed">
        More shipping soon.
      </p>
      <p className="mt-2 text-[15px] text-fg-muted">
        Open work lands here as it leaves the workshop.
      </p>
    </div>
  );
}
