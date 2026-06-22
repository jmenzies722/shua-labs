import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  id?: string;
}

/**
 * Section heading — Apple eyebrow + section headline + sub copy.
 *
 * - Eyebrow: 19px semibold, accent-blue. (Not micro-caps — Apple eyebrows are
 *   readable.)
 * - Title: clamp(32,5vw,56) / 600 / 1.08 / -0.01em.
 * - Sub: clamp(19,2.2vw,28) / 400 / 1.4 / #86868b.
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  className,
  id,
}: SectionHeadingProps) {
  return (
    <header
      id={id}
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow && (
        <span className="apple-eyebrow text-accent">{eyebrow}</span>
      )}
      <h2 className="apple-section-title text-balance text-fg">{title}</h2>
      {lead && (
        <p
          className={cn(
            "apple-sub text-balance",
            align === "center" ? "max-w-3xl mx-auto" : "max-w-3xl"
          )}
        >
          {lead}
        </p>
      )}
    </header>
  );
}
