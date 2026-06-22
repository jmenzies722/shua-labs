import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Premium dark card. Large radius, hairline border, soft gradient sheen.
 */
export const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative rounded-2xl border border-line bg-bg-card bg-card-grad transition-[transform,box-shadow,border-color] duration-300 ease-premium",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";
