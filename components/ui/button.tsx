import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Apple-fidelity button system.
 *
 * - Primary: filled Apple-blue pill (#0071e3 → #0077ed hover). No glow, no bounce.
 * - Secondary/outline: ghost pill on #1d1d1f or hairline border.
 * - Ghost: text-only.
 * - Link: chevron text link is implemented as <AppleLink> for the right glyph behavior.
 *
 * Radius is the Apple capsule (980px). Type is SF at 17px (lg = 19px).
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-pill font-normal tracking-apple-body transition-colors duration-200 ease-apple focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-accent-fill text-white hover:bg-accent-fillHover",
        outline:
          "bg-bg-panel text-fg hover:bg-[#2a2a2c] border-0",
        ghost: "text-fg-muted hover:text-fg",
        link: "text-accent hover:underline underline-offset-4 px-0 h-auto rounded-none",
      },
      size: {
        md: "h-9 px-[18px] text-[17px]",
        sm: "h-8 px-4 text-[14px]",
        lg: "h-12 px-6 text-[19px]",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type, ...props }, ref) => (
    <button
      ref={ref}
      type={type ?? "button"}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { buttonVariants };
