"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Scroll-driven reveal wrapper.
 * - Fade + translate-up, 480ms, smooth ease-out.
 * - Optional `delay` for stagger.
 * - Fully disabled under `prefers-reduced-motion`.
 */
export interface RevealProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onAnimationStart" | "onDrag" | "onDragEnd" | "onDragStart"> {
  /** Delay in seconds. */
  delay?: number;
  /** Initial translateY in px (default 16). */
  y?: number;
  as?: "div" | "section" | "article" | "header" | "footer";
}

export const Reveal = React.forwardRef<HTMLDivElement, RevealProps>(
  ({ children, className, delay = 0, y = 16, as: _as = "div", ...rest }, ref) => {
    const reduced = useReducedMotion();

    const variants: Variants = {
      hidden: { opacity: 0, y: reduced ? 0 : y },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: reduced ? 0 : 0.5,
          delay: reduced ? 0 : delay,
          ease: [0.16, 1, 0.3, 1],
        },
      },
    };

    return (
      <motion.div
        ref={ref}
        className={cn(className)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px 0px -80px 0px" }}
        variants={variants}
        {...(rest as React.ComponentProps<typeof motion.div>)}
      >
        {children}
      </motion.div>
    );
  }
);
Reveal.displayName = "Reveal";

/**
 * Stagger container. Wrap a list of <Reveal/> children with this to choreograph them.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  const reduced = useReducedMotion();
  const variants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduced ? 0 : stagger,
        delayChildren: reduced ? 0 : 0.04,
      },
    },
  };
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px 0px -80px 0px" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
