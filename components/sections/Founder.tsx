"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Founder - The operator behind the company.
 *
 * Josh Menzies, grounded in New York, building at the intersection of
 * AI, infrastructure, and developer experience.
 */
export function Founder() {
  const reduced = useReducedMotion();

  return (
    <section
      id="founder"
      aria-label="Founder"
      className="section-padding-sm section-rule scroll-mt-14"
    >
      <div className="site-shell">
        <div className="grid items-center gap-12 md:grid-cols-[1.15fr_0.85fr] md:gap-16">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: reduced ? 0 : 0.45 }}
          >
            <p className="label-text mb-3">Founder</p>
            <h2 className="display-section text-balance mb-5">
              Josh Menzies
            </h2>
            <p className="body-text-large mb-5">
              A platform engineer in New York building the infrastructure and
              developer experience layer for AI-assisted engineering teams.
            </p>
            <p className="body-text mb-7">
              I focus on the systems that make AI reliable at scale—gateways,
              governance, observability, and the tools that turn "the agent helped"
              into something you can actually measure. Previously worked on
              developer tooling and infrastructure across multiple organizations.
            </p>
            <div className="flex gap-6">
              <a
                href="https://github.com/jmenzies722"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/josh-m01/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                LinkedIn
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : 0.08 }}
            className="relative"
          >
            <div className="flex aspect-square items-center justify-center border border-line bg-bg-panel">
              <div className="text-center">
                <p className="text-[3.5rem] font-semibold leading-none tracking-[-0.06em] text-fg">
                  JM
                </p>
                <p className="label-text mt-5">New York</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
