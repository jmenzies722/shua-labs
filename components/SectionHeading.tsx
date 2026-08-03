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
 * Section heading. Eyebrow is a mono micro-label with a rule running off it —
 * the eyebrow doubles as the section's ruled divider so the layout needs one
 * fewer element to establish hierarchy.
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
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow && (
        <div className="flex items-center gap-4">
          <span className="term-label">{eyebrow}</span>
          {align === "left" && (
            <span aria-hidden className="h-px flex-1 bg-line" />
          )}
        </div>
      )}
      <h2 className="term-title text-balance text-fg">{title}</h2>
      {lead && (
        <p
          className={cn(
            "term-prose text-balance",
            align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl"
          )}
        >
          {lead}
        </p>
      )}
    </header>
  );
}
