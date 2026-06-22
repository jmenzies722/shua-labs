"use client";

import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { TierBadge } from "@/components/TierBadge";
import { TypeTag } from "@/components/TypeTag";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  /** Triggered when the card surface is activated (click/Enter/Space). */
  onOpen: (project: Project) => void;
  className?: string;
}

/**
 * Apple project tile. Whole surface is the trigger — opens the detail drawer.
 * Hover: very subtle 1px lift + border brighten. No neon glow.
 */
export function ProjectCard({ project, onOpen, className }: ProjectCardProps) {
  const handleKey = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen(project);
    }
  };

  return (
    <Card
      className={cn(
        "group relative h-full overflow-hidden",
        "hover:-translate-y-px hover:border-line-strong",
        className
      )}
    >
      <button
        type="button"
        onClick={() => onOpen(project)}
        onKeyDown={handleKey}
        aria-label={`Open details for ${project.name}`}
        className="flex h-full w-full flex-col items-start gap-6 p-8 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-2xl"
      >
        {/* Top meta row. */}
        <div className="flex w-full items-center justify-between">
          <TypeTag type={project.type} />
          <TierBadge tier={project.tier} />
        </div>

        {/* Name + one-liner. */}
        <div className="flex w-full flex-col gap-3">
          <h3 className="text-[24px] font-semibold leading-tight tracking-apple-section text-fg">
            {project.name}
          </h3>
          <p className="text-[15px] leading-[1.47] text-fg-muted">
            {project.oneLiner}
          </p>
        </div>

        {/* Tags. */}
        {project.tags.length > 0 && (
          <ul
            className="mt-auto flex flex-wrap items-center gap-2 pt-2"
            aria-label="Tags"
          >
            {project.tags.map((t) => (
              <li
                key={t}
                className="rounded-full bg-white/[0.04] px-2.5 py-0.5 text-[11px] text-fg-muted"
              >
                {t}
              </li>
            ))}
          </ul>
        )}

        {/* Affordance arrow — quiet, slides on hover. */}
        <span
          aria-hidden
          className="absolute right-6 bottom-6 inline-flex h-8 w-8 items-center justify-center rounded-full text-fg-subtle transition-all duration-[250ms] ease-apple group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        >
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </button>
    </Card>
  );
}
