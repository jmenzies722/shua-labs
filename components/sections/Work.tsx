"use client";

import * as React from "react";
import { projects } from "@/data/projects";
import { categories } from "@/data/categories";
import { CategorySection } from "@/components/CategorySection";
import { FeaturedProject } from "@/components/FeaturedProject";
import { ProjectDetail } from "@/components/ProjectDetail";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import type { Project } from "@/lib/types";

/**
 * The heart of the site — the work.
 *
 * - Optional featured spotlight band above the grids (`featured: true`).
 * - Category bands rendered in `categories` order.
 * - Project tiles open a shared detail drawer.
 *
 * Apple-fidelity pass: vast vertical rhythm, calm spacing, no neon glows.
 */
export function Work() {
  const [selected, setSelected] = React.useState<Project | null>(null);
  const [open, setOpen] = React.useState(false);

  const onOpen = React.useCallback((p: Project) => {
    setSelected(p);
    setOpen(true);
  }, []);

  const onOpenChange = React.useCallback((next: boolean) => {
    setOpen(next);
  }, []);

  const featured = React.useMemo(
    () => projects.find((p) => p.featured),
    []
  );

  const byCategory = React.useMemo(() => {
    const map = new Map<string, Project[]>();
    for (const c of categories) map.set(c.id, []);
    for (const p of projects) {
      if (!map.has(p.category)) map.set(p.category, []);
      map.get(p.category)!.push(p);
    }
    return map;
  }, []);

  return (
    <section
      id="work"
      aria-label="The work"
      className="relative apple-section scroll-mt-16"
    >
      <div className="container max-w-[1100px] flex flex-col gap-20 md:gap-28">
        <Reveal>
          <SectionHeading
            eyebrow="The work"
            title={
              <>
                Open-source products,{" "}
                <span className="text-fg-muted">grouped by what they do.</span>
              </>
            }
            lead="Every project here is shipped in the open. Open any tile for the full story — what it does, who it's for, how to use it."
          />
        </Reveal>

        {featured && (
          <Reveal y={28}>
            <FeaturedProject project={featured} onOpen={onOpen} />
          </Reveal>
        )}

        <div className="flex flex-col gap-24 md:gap-28">
          {categories.map((cat) => (
            <CategorySection
              key={cat.id}
              category={cat}
              projects={byCategory.get(cat.id) ?? []}
              onOpen={onOpen}
            />
          ))}
        </div>
      </div>

      <ProjectDetail
        project={selected}
        open={open}
        onOpenChange={onOpenChange}
      />
    </section>
  );
}
