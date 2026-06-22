import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Apple bento tile. #1d1d1f surface, ~20px radius, hairline border.
 * Hover: very subtle border brighten + 1px lift. No neon bloom.
 */
export const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative rounded-2xl border border-line bg-bg-panel transition-[transform,border-color] duration-[250ms] ease-apple",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";
