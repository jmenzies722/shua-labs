"use client";

import * as React from "react";
import Link from "next/link";
import { Github } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AppleLink } from "@/components/AppleLink";
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
  Shipping: "bg-tier-free",
  Beta: "bg-tier-freemium",
  WIP: "bg-tier-wip",
  Planned: "bg-fg-subtle",
};

/**
 * Project detail view — Apple sheet on mobile, centered modal on md+.
 * Built on Radix Dialog: focus trap, Esc to close, focus restore on close.
 * Chevron text links for outbound URLs; primary pill for the live link.
 */
export function ProjectDetail({
  project,
  open,
  onOpenChange,
}: ProjectDetailProps) {
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
            <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.04] px-2.5 py-0.5 text-[11px] font-medium text-fg-muted">
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
            className="apple-sub text-balance"
          >
            {project.oneLiner}
          </DialogDescription>
        </DialogHeader>

        <DialogBody>
          <div className="grid gap-10">
            <section aria-label="Description">
              {project.detail.description.split("\n\n").map((para, i) => (
                <p
                  key={i}
                  className="text-[17px] leading-[1.47] text-fg/90 [&+p]:mt-4"
                >
                  {para}
                </p>
              ))}
            </section>

            <section aria-label="Who it's for">
              <h4 className="apple-eyebrow text-accent mb-2 text-[15px]">
                Who it&apos;s for
              </h4>
              <p className="text-[17px] leading-[1.47] text-fg-muted">
                {project.detail.forWho}
              </p>
            </section>

            {project.detail.snippet && (
              <section aria-label="Usage">
                <h4 className="apple-eyebrow text-accent mb-3 text-[15px]">
                  Usage
                </h4>
                <CodeBlock
                  code={project.detail.snippet.code}
                  language={project.detail.snippet.language}
                  caption={project.detail.snippet.caption}
                />
              </section>
            )}

            <section aria-label="Principles">
              <h4 className="apple-eyebrow text-accent mb-3 text-[15px]">
                Principles
              </h4>
              <ul className="flex flex-wrap gap-2">
                {project.principles.map((p) => (
                  <li
                    key={p}
                    className="rounded-full bg-white/[0.04] px-3 py-1 text-[12px] text-fg-muted"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </section>

            <section
              aria-label="Links"
              className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-2"
            >
              {project.links.map((l) => {
                if (l.label === "GitHub") {
                  return (
                    <AppleLink
                      key={l.label + l.href}
                      href={l.href}
                      external
                    >
                      View on GitHub
                    </AppleLink>
                  );
                }
                return (
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
                    <Button variant="primary" size="md">
                      {l.label}
                    </Button>
                  </Link>
                );
              })}
            </section>
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}
