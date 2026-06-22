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
 * Premium project card. The whole surface is a button — opens the detail drawer.
 * Hover: gentle lift + accent glow bloom + border brighten.
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
        "hover:-translate-y-0.5 hover:border-line-strong",
        "hover:shadow-glow-sm",
        className
      )}
    >
      <button
        type="button"
        onClick={() => onOpen(project)}
        onKeyDown={handleKey}
        aria-label={`Open details for ${project.name}`}
        className="flex h-full w-full flex-col items-start gap-6 p-7 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg-card rounded-2xl"
      >
        {/* Top meta row */}
        <div className="flex w-full items-center justify-between">
          <TypeTag type={project.type} />
          <TierBadge tier={project.tier} />
        </div>

        {/* Name + one-liner */}
        <div className="flex w-full flex-col gap-3">
          <h3 className="text-[22px] md:text-2xl font-semibold leading-tight tracking-tight text-fg">
            {project.name}
          </h3>
          <p className="text-[15px] leading-relaxed text-fg-muted">
            {project.oneLiner}
          </p>
        </div>

        {/* Tags */}
        {project.tags.length > 0 && (
          <ul className="mt-auto flex flex-wrap items-center gap-2 pt-2" aria-label="Tags">
            {project.tags.map((t) => (
              <li
                key={t}
                className="rounded-full border border-line bg-white/[0.02] px-2.5 py-0.5 text-[11px] text-fg-muted"
              >
                {t}
              </li>
            ))}
          </ul>
        )}

        {/* Affordance arrow */}
        <span
          aria-hidden
          className="absolute right-6 bottom-6 inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white/[0.02] text-fg-muted transition-all duration-300 ease-premium group-hover:text-accent-hi group-hover:border-accent-ring group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        >
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </button>

      {/* Hover glow ring */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(600px circle at 20% -10%, rgba(10,132,255,0.10), transparent 50%)",
        }}
      />
    </Card>
  );
}
