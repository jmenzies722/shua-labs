"use client";

import * as React from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { EASE, loadFade } from "@/lib/motion";

/**
 * Hero - Building what comes next.
 *
 * A future-facing venture company creating ventures, products, and systems
 * for an AI-native world.
 */
export function HeroNew() {
  const reduced = useReducedMotion();
  const tickRef = React.useRef<HTMLSpanElement>(null);
  const tickInView = useInView(tickRef, { amount: 0.35 });

  return (
    <section
      id="top"
      aria-label="Hero"
      className="relative isolate flex min-h-[100svh] w-full flex-col justify-center overflow-hidden border-b border-line pt-[calc(5.5rem+env(safe-area-inset-top))] pb-20"
    >
      <div className="site-shell">
        <div className="max-w-[40rem] border-l border-line pl-5 sm:max-w-[46rem] sm:pl-7">
          <motion.div {...loadFade(reduced, 0)}>
            <p className="label-text mb-5">Shua Labs</p>
          </motion.div>

          <motion.h1 {...loadFade(reduced, 0.06)} className="display-hero text-balance mb-6">
            Building what comes next.
          </motion.h1>

          <motion.p
            {...loadFade(reduced, 0.12)}
            className="body-text-large max-w-xl text-balance mb-9"
          >
            Shua Labs creates ventures, products, and systems for an AI-native world.
          </motion.p>

          <motion.div {...loadFade(reduced, 0.18)} className="flex flex-wrap gap-3">
            <a href="#contact" className="btn-primary">
              Get in touch
            </a>
            <a href="#what-we-build" className="btn-secondary">
              What we build
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.4, ease: EASE }}
        className="pointer-events-none absolute bottom-7 left-1/2 -translate-x-1/2"
        aria-hidden
      >
        <span ref={tickRef} className="relative block h-8 w-px bg-line">
          {!reduced && (
            <motion.span
              className="absolute inset-x-0 top-0 mx-auto h-2 w-px bg-white"
              animate={
                tickInView
                  ? { y: [0, 16, 0], opacity: [0.9, 0.2, 0.9] }
                  : { y: 0, opacity: 0.9 }
              }
              transition={
                tickInView
                  ? { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 0.2, ease: EASE }
              }
            />
          )}
        </span>
      </motion.div>
    </section>
  );
}
