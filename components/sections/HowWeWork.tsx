"use client";

import * as React from "react";
import { motion } from "framer-motion";

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
  return (
    <section
      id="how-we-work"
      aria-label="How we work"
      className="section-padding-sm"
      style={{ backgroundColor: "rgba(10, 10, 10, 0.5)" }}
    >
      <div className="container max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="label-text mb-4">How we work</p>
          <h2 className="display-section text-balance">
            Our operating thesis.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {PRINCIPLES.map((principle, index) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-8 border border-line rounded-lg hover:border-line-hi transition-colors duration-300"
            >
              <h3 className="heading-medium mb-3">{principle.title}</h3>
              <p className="body-text">{principle.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}