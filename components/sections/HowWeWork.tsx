"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

const PRINCIPLES = [
  {
    title: "Start close to the problem",
    description: "We begin with real problems, not abstract opportunities. Understanding the actual pain points and constraints comes before any solution.",
  },
  {
    title: "Build real things",
    description: "We ship working software and systems, not slide decks. Code running in production is the only proof that matters.",
  },
  {
    title: "Compound what works",
    description: "When something works, we double down. We build systems that get stronger with use, not weaker.",
  },
  {
    title: "Share selectively",
    description: "We publish what's useful and keep what's sensitive. Not everything needs to be public, but nothing should be hidden without reason.",
  },
];

/**
 * How we work - Simple operating thesis.
 *
 * The principles that guide how we approach problems and build solutions.
 */
export function HowWeWork() {
  const reduced = useReducedMotion();

  return (
    <section
      id="how-we-work"
      aria-label="How we work"
      className="section-padding-sm section-rule scroll-mt-14"
    >
      <div className="site-shell">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: reduced ? 0 : 0.45 }}
          className="mb-10 max-w-2xl md:mb-12"
        >
          <p className="label-text mb-3">How we work</p>
          <h2 className="display-section text-balance">
            Our operating thesis.
          </h2>
        </motion.div>

        <ol className="grid gap-0 md:grid-cols-2">
          {PRINCIPLES.map((principle, index) => (
            <motion.li
              key={principle.title}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : index * 0.05 }}
              className="border-t border-line py-7 md:px-7 md:odd:border-r md:odd:pl-0 md:even:pr-0"
            >
              <p className="index-text mb-3">0{index + 1}</p>
              <h3 className="heading-medium mb-2">{principle.title}</h3>
              <p className="body-text">{principle.description}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
