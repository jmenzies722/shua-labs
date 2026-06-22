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
 * Section heading — eyebrow (small, accent-tinted), display title, lead copy.
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
        <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-accent-hi">
          {eyebrow}
        </span>
      )}
      <h2 className="text-balance text-3xl md:text-5xl font-semibold tracking-tighter text-fg leading-[1.05]">
        {title}
      </h2>
      {lead && (
        <p
          className={cn(
            "text-balance text-base md:text-lg text-fg-muted leading-relaxed",
            align === "center" ? "max-w-2xl" : "max-w-2xl"
          )}
        >
          {lead}
        </p>
      )}
    </header>
  );
}
