"use client";

import * as React from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { EASE, VIEWPORT, Y_COPY, revealTransition } from "@/lib/motion";

/**
 * In formation - Visually engaging, deliberately non-specific signal.
 *
 * A visual indicator that new ventures are underway without premature
 * announcements or specifics.
 */
export function InFormation() {
  const reduced = useReducedMotion();
  const blockRef = React.useRef<HTMLDivElement>(null);
  const looping = useInView(blockRef, { margin: "-80px" });

  return (
    <section
      id="in-formation"
      aria-label="In formation"
      className="section-padding section-rule scroll-mt-14"
    >
      <div className="site-shell">
        <motion.div
          ref={blockRef}
          initial={reduced ? false : { opacity: 0, y: Y_COPY }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={revealTransition(reduced)}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="label-text mb-4">In formation</p>
          <h2 className="display-section text-balance mb-5">
            New ventures are underway.
          </h2>
          <p className="body-text-large text-balance">
            We&apos;re building the next generation of AI-native systems and companies.
            When there&apos;s something to show, we&apos;ll show it.
          </p>

          <div
            className="mt-12 flex h-10 items-end justify-center gap-3"
            aria-hidden
          >
            {[0, 1, 2].map((i) => {
              const staticScale = [0.375, 0.625, 0.875][i];
              return (
                <span
                  key={i}
                  className="relative flex h-8 w-px items-end justify-center"
                >
                  <motion.span
                    className="w-px origin-bottom bg-white"
                    style={{ height: 32 }}
                    initial={false}
                    animate={
                      reduced
                        ? { scaleY: staticScale, opacity: 0.55 }
                        : looping
                          ? { scaleY: [0.375, 1, 0.375], opacity: [0.28, 1, 0.28] }
                          : { scaleY: 0.375, opacity: 0.28 }
                    }
                    transition={
                      reduced
                        ? { duration: 0 }
                        : looping
                          ? {
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.22,
                              ease: "easeInOut",
                            }
                          : { duration: 0.2, ease: EASE }
                    }
                  />
                </span>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
