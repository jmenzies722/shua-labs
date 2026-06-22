import * as React from "react";
import type { ProjectType } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Tiny mono type tag — one of the only places monospace appears.
 * SF Mono stack, calm tracking, no all-caps shouting.
 */
export function TypeTag({
  type,
  className,
}: {
  type: ProjectType;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-block font-mono text-[11px] tracking-[0.05em] text-fg-subtle",
        className
      )}
    >
      {type}
    </span>
  );
}
