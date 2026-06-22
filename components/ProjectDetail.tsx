"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TierBadge } from "@/components/TierBadge";
import { TypeTag } from "@/components/TypeTag";
import { CodeBlock } from "@/components/CodeBlock";
import type { Project } from "@/lib/types";

interface ProjectDetailProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const STATUS_DOT: Record<Project["detail"]["status"], string> = {
  Shipping: "bg-tier-free shadow-[0_0_8px_rgba(52,211,153,0.55)]",
  Beta: "bg-tier-freemium shadow-[0_0_8px_rgba(96,165,250,0.55)]",
  WIP: "bg-tier-wip shadow-[0_0_8px_rgba(245,158,11,0.55)]",
  Planned: "bg-fg-subtle",
};

/**
 * Project detail view. Built on Radix Dialog (focus trap, Esc to close,
 * focus restore on close). Centered modal on md+, full-height bottom sheet on mobile.
 */
export function ProjectDetail({ project, open, onOpenChange }: ProjectDetailProps) {
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        aria-labelledby={`project-${project.slug}-title`}
        aria-describedby={`project-${project.slug}-desc`}
      >
        <DialogHeader>
          <div className="flex flex-wrap items-center gap-3">
            <TypeTag type={project.type} />
            <TierBadge tier={project.tier} />
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-2.5 py-0.5 text-[11px] font-medium text-fg-muted">
              <span
                aria-hidden
                className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[project.detail.status]}`}
              />
              {project.detail.status}
            </span>
          </div>

          <DialogTitle id={`project-${project.slug}-title`}>
            {project.name}
          </DialogTitle>

          <DialogDescription
            id={`project-${project.slug}-desc`}
            className="text-base text-fg-muted leading-relaxed max-w-2xl"
          >
            {project.oneLiner}
          </DialogDescription>
        </DialogHeader>

        <DialogBody>
          <div className="grid gap-8">
            {/* Full description */}
            <section aria-label="Description">
              {project.detail.description.split("\n\n").map((para, i) => (
                <p
                  key={i}
                  className="text-[15px] leading-relaxed text-fg/85 [&+p]:mt-4"
                >
                  {para}
                </p>
              ))}
            </section>

            {/* Who it's for */}
            <section aria-label="Who it's for">
              <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-hi mb-2">
                Who it&apos;s for
              </h4>
              <p className="text-[15px] leading-relaxed text-fg-muted">
                {project.detail.forWho}
              </p>
            </section>

            {/* Snippet */}
            {project.detail.snippet && (
              <section aria-label="Usage">
                <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-hi mb-3">
                  Usage
                </h4>
                <CodeBlock
                  code={project.detail.snippet.code}
                  language={project.detail.snippet.language}
                  caption={project.detail.snippet.caption}
                />
              </section>
            )}

            {/* Principles + tags */}
            <section aria-label="Principles">
              <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-hi mb-3">
                Principles
              </h4>
              <ul className="flex flex-wrap gap-2">
                {project.principles.map((p) => (
                  <li
                    key={p}
                    className="rounded-full border border-line bg-white/[0.03] px-3 py-1 text-xs text-fg-muted"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </section>

            {/* Links */}
            <section aria-label="Links" className="flex flex-wrap gap-3 pt-2">
              {project.links.map((l) => (
                <Link
                  key={l.label + l.href}
                  href={l.href}
                  target={l.href.startsWith("#") ? undefined : "_blank"}
                  rel={
                    l.href.startsWith("#")
                      ? undefined
                      : "noreferrer noopener"
                  }
                >
                  <Button
                    variant={l.label === "GitHub" ? "outline" : "primary"}
                    size="md"
                  >
                    {l.label === "GitHub" ? (
                      <Github className="h-4 w-4" aria-hidden="true" />
                    ) : null}
                    {l.label}
                    {l.label !== "GitHub" && (
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    )}
                  </Button>
                </Link>
              ))}
            </section>
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}
