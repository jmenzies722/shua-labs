"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Scroll reveal — opacity 0 → 1 with a short rise.
 *
 * FAILS VISIBLE, deliberately. The previous version drove this off framer's `whileInView`, and
 * when that observer didn't fire the whole page rendered blank: elements present, borders drawn,
 * every word at opacity 0. No console error, HTTP 200, nothing to grep for. It only showed up in
 * a screenshot.
 *
 * An animation wrapper must never be able to permanently hide content. So:
 *   · our own IntersectionObserver, so the trigger is ours to reason about
 *   · if IO is unavailable, content shows immediately
 *   · a mount-time safety timer shows content regardless after 700ms
 *   · reduced motion renders visible with no transition at all
 *
 * The effect is an enhancement. The content is not.
 */
export interface RevealProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "onAnimationStart" | "onDrag" | "onDragEnd" | "onDragStart"
  > {
  delay?: number;
  y?: number;
  as?: "div" | "section" | "article" | "header" | "footer";
}

const EASE: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

export const Reveal = React.forwardRef<HTMLDivElement, RevealProps>(
  ({ children, className, delay = 0, y = 24, as: _as = "div", ...rest }, ref) => {
    const reduced = useReducedMotion();
    const innerRef = React.useRef<HTMLDivElement | null>(null);
    const [shown, setShown] = React.useState(false);

    React.useEffect(() => {
      if (shown) return;

      // Safety net: whatever the observer does, the content appears.
      const failsafe = window.setTimeout(() => setShown(true), 700);

      const node = innerRef.current;
      if (!node || typeof IntersectionObserver === "undefined") {
        setShown(true);
        return () => window.clearTimeout(failsafe);
      }

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            setShown(true);
            observer.disconnect();
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.01 },
      );
      observer.observe(node);

      return () => {
        window.clearTimeout(failsafe);
        observer.disconnect();
      };
    }, [shown]);

    const variants: Variants = {
      hidden: { opacity: 0, y: reduced ? 0 : y },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: reduced ? 0 : 0.55,
          delay: reduced ? 0 : delay,
          ease: EASE,
        },
      },
    };

    return (
      <motion.div
        ref={(node) => {
          innerRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        className={cn(className)}
        initial={reduced ? "visible" : "hidden"}
        animate={shown || reduced ? "visible" : "hidden"}
        variants={variants}
        {...(rest as React.ComponentProps<typeof motion.div>)}
      >
        {children}
      </motion.div>
    );
  },
);
Reveal.displayName = "Reveal";

/** Stagger container. Animates on mount for the same fail-visible reason. */
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
        delayChildren: reduced ? 0 : 0.03,
      },
    },
  };

  return (
    <motion.div className={className} initial="hidden" animate="visible" variants={variants}>
      {children}
    </motion.div>
  );
}
