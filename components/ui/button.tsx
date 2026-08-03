import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Monochrome button system.
 *
 * There is no accent colour, so "primary" is inversion: white ground, black
 * ink, and hovering hands the ground back. That is the loudest control this
 * palette can produce, which is why it appears at most once per view.
 *
 * Square corners throughout — a capsule button reads as a consumer app, and
 * this is a terminal.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none border font-mono font-semibold uppercase tracking-[0.1em] transition-colors duration-200 ease-term focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-fg disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        primary:
          "border-fg bg-fg text-bg hover:bg-transparent hover:text-fg",
        outline:
          "border-line bg-transparent text-fg hover:border-line-hi hover:bg-white/[0.04]",
        ghost:
          "border-transparent bg-transparent text-fg-muted hover:text-fg",
        link: "h-auto rounded-none border-transparent px-0 normal-case tracking-normal text-fg underline underline-offset-4",
      },
      size: {
        md: "h-10 px-5 text-[12.5px]",
        sm: "h-8 px-3.5 text-[11.5px]",
        lg: "h-12 px-6 text-[13.5px]",
        icon: "h-9 w-9 px-0",
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
