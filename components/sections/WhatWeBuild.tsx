"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

const AREAS = [
  {
    title: "AI-native ventures",
    description: "Building companies and products that are native to the AI era—systems that leverage AI as a core capability rather than an add-on.",
  },
  {
    title: "Developer systems",
    description: "Creating tools and infrastructure that make AI-assisted engineering safer, more observable, and more productive for teams.",
  },
  {
    title: "Digital infrastructure",
    description: "Designing the foundational systems and platforms that enable the next generation of AI-native applications and services.",
  },
];

/**
 * What we build - Three anonymous, high-conviction areas.
 *
 * No retired product names or repository gallery—just the core focus areas
 * that drive our work.
 */
export function WhatWeBuild() {
  const reduced = useReducedMotion();

  return (
    <section
      id="what-we-build"
      aria-label="What we build"
      className="section-padding relative scroll-mt-14"
    >
      <div className="site-shell">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: reduced ? 0 : 0.45 }}
          className="mb-10 max-w-2xl md:mb-12"
        >
          <p className="label-text mb-3">What we build</p>
          <h2 className="display-section text-balance">
            Three focus areas, high conviction.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 md:border-t md:border-line md:pt-10">
          {AREAS.map((area, index) => (
            <motion.article
              key={area.title}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : index * 0.06 }}
              className="border-t border-line py-7 md:border-l md:border-t-0 md:px-7 md:py-0 md:first:border-l-0 md:first:pl-0 md:last:pr-0"
            >
              <p className="index-text mb-4">0{index + 1}</p>
              <h3 className="heading-large mb-3">{area.title}</h3>
              <p className="body-text">{area.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
