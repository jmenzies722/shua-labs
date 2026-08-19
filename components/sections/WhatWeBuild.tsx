"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Y_CARD,
  Y_COPY,
  sectionInView,
  staggerContainer,
  staggerItem,
} from "@/lib/motion";

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
      <motion.div
        className="site-shell"
        {...sectionInView}
        variants={staggerContainer(reduced)}
      >
        <motion.div
          variants={staggerItem(reduced, Y_COPY)}
          className="mb-10 max-w-2xl md:mb-12"
        >
          <p className="label-text mb-3">What we build</p>
          <h2 className="display-section text-balance">
            Three focus areas, high conviction.
          </h2>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 md:border-t md:border-line md:pt-10"
          variants={staggerContainer(reduced)}
        >
          {AREAS.map((area, index) => (
            <motion.article
              key={area.title}
              variants={staggerItem(reduced, Y_CARD)}
              className="border-t border-line py-7 md:border-l md:border-t-0 md:px-7 md:py-0 md:first:border-l-0 md:first:pl-0 md:last:pr-0"
            >
              <p className="index-text mb-4">0{index + 1}</p>
              <h3 className="heading-large mb-3">{area.title}</h3>
              <p className="body-text">{area.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
