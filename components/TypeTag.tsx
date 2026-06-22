import * as React from "react";
import type { ProjectType } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Tiny mono type tag — one of the only places monospace appears.
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
        "inline-block font-mono text-[10px] tracking-[0.2em] text-fg-subtle uppercase",
        className
      )}
    >
      {type}
    </span>
  );
}
