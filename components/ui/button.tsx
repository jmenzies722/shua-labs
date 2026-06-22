import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium tracking-tight transition-all duration-200 ease-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-white hover:bg-accent-hi shadow-[0_0_0_1px_rgba(10,132,255,0.5),0_10px_40px_-12px_rgba(10,132,255,0.65)] hover:shadow-[0_0_0_1px_rgba(10,132,255,0.65),0_18px_56px_-12px_rgba(10,132,255,0.8)]",
        outline:
          "border border-line bg-white/[0.02] text-fg backdrop-blur-sm hover:border-line-strong hover:bg-white/[0.04]",
        ghost: "text-fg-muted hover:text-fg hover:bg-white/[0.04]",
        link: "text-accent hover:text-accent-hi underline-offset-4 hover:underline px-0 h-auto rounded-none",
      },
      size: {
        md: "h-10 px-5",
        sm: "h-8 px-4 text-xs",
        lg: "h-12 px-7 text-[15px]",
        icon: "h-10 w-10",
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
