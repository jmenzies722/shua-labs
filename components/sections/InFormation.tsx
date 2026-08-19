"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * In formation - Visually engaging, deliberately non-specific signal.
 *
 * A visual indicator that new ventures are underway without premature
 * announcements or specifics.
 */
export function InFormation() {
  const reduced = useReducedMotion();

  return (
    <section
      id="in-formation"
      aria-label="In formation"
      className="section-padding section-rule scroll-mt-14"
    >
      <div className="site-shell">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: reduced ? 0 : 0.45 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="label-text mb-4">In formation</p>
          <h2 className="display-section text-balance mb-5">
            New ventures are underway.
          </h2>
          <p className="body-text-large text-balance">
            We're building the next generation of AI-native systems and companies.
            When there's something to show, we'll show it.
          </p>

          <div
            className="mt-12 flex h-10 items-end justify-center gap-3"
            aria-hidden
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="w-px bg-white"
                initial={{ height: 12, opacity: 0.35 }}
                animate={
                  reduced
                    ? { height: 12 + i * 8, opacity: 0.55 }
                    : { height: [12, 32, 12], opacity: [0.28, 1, 0.28] }
                }
                transition={
                  reduced
                    ? { duration: 0 }
                    : {
                        duration: 1.7,
                        repeat: Infinity,
                        delay: i * 0.22,
                        ease: "easeInOut",
                      }
                }
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
