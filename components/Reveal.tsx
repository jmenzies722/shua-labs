"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Apple-understated scroll reveal.
 * - opacity 0 → 1 + translateY(28px → 0)
 * - duration ~900ms, Apple easing cubic-bezier(0.28, 0.11, 0.32, 1)
 * - triggers once, with a gentle stagger when wrapped in <RevealGroup>
 * - fully disabled under prefers-reduced-motion
 */
export interface RevealProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "onAnimationStart" | "onDrag" | "onDragEnd" | "onDragStart"
  > {
  /** Delay in seconds. */
  delay?: number;
  /** Initial translateY in px (default 28 — Apple's signature distance). */
  y?: number;
  as?: "div" | "section" | "article" | "header" | "footer";
}

const APPLE_EASE: [number, number, number, number] = [0.28, 0.11, 0.32, 1];

export const Reveal = React.forwardRef<HTMLDivElement, RevealProps>(
  (
    { children, className, delay = 0, y = 28, as: _as = "div", ...rest },
    ref
  ) => {
    const reduced = useReducedMotion();

    const variants: Variants = {
      hidden: { opacity: 0, y: reduced ? 0 : y },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: reduced ? 0 : 0.9,
          delay: reduced ? 0 : delay,
          ease: APPLE_EASE,
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
 * Stagger container. Wrap a list of <Reveal/> children to choreograph them
 * with Apple's quiet cadence.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.1,
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
