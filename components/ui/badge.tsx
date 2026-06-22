import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {}

/**
 * Small muted pill. Used for tier/status meta — calm, never loud.
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-line bg-white/[0.03] px-2.5 py-0.5 text-[11px] font-medium text-fg-muted",
        className
      )}
      {...props}
    />
  )
);
Badge.displayName = "Badge";
