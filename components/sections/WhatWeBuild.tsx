"use client";

import * as React from "react";
import { motion } from "framer-motion";

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
  return (
    <section
      id="what-we-build"
      aria-label="What we build"
      className="section-padding relative"
    >
      <div className="container max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="label-text mb-4">What we build</p>
          <h2 className="display-section text-balance">
            Three focus areas, high conviction.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {AREAS.map((area, index) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="venture-card h-full">
                <div className="venture-card-inner">
                  <h3 className="heading-large mb-4">{area.title}</h3>
                  <p className="body-text">{area.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}