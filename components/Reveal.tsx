import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Entry animation — CSS only.
 *
 * This component hid the page three times: framer's `whileInView` never fired; then an
 * IntersectionObserver rewrite left `initial="hidden"` in the SSR HTML; then the observer state
 * failed to flip and it sat at `opacity: 0` anyway. Each fix added machinery and a new way to
 * fail.
 *
 * The machinery WAS the bug. There is no JavaScript here now — no state, no observer, no
 * hydration dependency, not even a client component. A CSS keyframe runs on paint. If the CSS
 * fails to load the content is simply visible, which is the correct failure.
 *
 * The tradeoff, stated honestly: this animates on load rather than on scroll, so content below
 * the fold has already finished animating by the time you reach it. That is a real loss and it
 * is worth it. A scroll-triggered reveal is a nice-to-have; a readable page is not.
 *
 * `delay` staggers siblings. Keep it under ~0.3s — anything longer reads as jank on a fast load.
 */
export interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number;
  as?: "div" | "section" | "article" | "header" | "footer";
  /**
   * Accepted and ignored. The old framer implementation took a translate distance; the CSS
   * keyframe owns that now. Kept so the legacy sections under components/sections/ still
   * compile — removing it would be a rename dressed as a refactor.
   */
  y?: number;
}

export const Reveal = React.forwardRef<HTMLDivElement, RevealProps>(
  ({ children, className, delay = 0, as: _as = "div", y: _y, style, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn("reveal", className)}
      style={delay ? { ...style, animationDelay: `${delay}s` } : style}
      {...rest}
    >
      {children}
    </div>
  ),
);
Reveal.displayName = "Reveal";

/**
 * Stagger container. Children space themselves via their own `delay` prop now, so this is just
 * a div. `stagger` is accepted and ignored for the same reason `y` is — legacy callers.
 */
export function RevealGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  return <div className={className}>{children}</div>;
}
