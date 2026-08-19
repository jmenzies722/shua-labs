"use client";

import * as React from "react";
import { motion } from "framer-motion";

/**
 * Founder - The operator behind the company.
 *
 * Josh Menzies, grounded in New York, building at the intersection of
 * AI, infrastructure, and developer experience.
 */
export function Founder() {
  return (
    <section
      id="founder"
      aria-label="Founder"
      className="section-padding-sm"
      style={{ backgroundColor: "rgba(10, 10, 10, 0.3)" }}
    >
      <div className="container max-w-[1400px]">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="label-text mb-4">Founder</p>
            <h2 className="display-section text-balance mb-6">
              Josh Menzies
            </h2>
            <p className="body-text-large mb-6">
              A platform engineer in New York building the infrastructure and
              developer experience layer for AI-assisted engineering teams.
            </p>
            <p className="body-text mb-8">
              I focus on the systems that make AI reliable at scale—gateways,
              governance, observability, and the tools that turn "the agent helped"
              into something you can actually measure. Previously worked on
              developer tooling and infrastructure across multiple organizations.
            </p>
            <div className="flex gap-4">
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
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Founder visual placeholder */}
            <div className="aspect-square bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-line flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
                  <span className="text-4xl font-bold text-fg">JM</span>
                </div>
                <p className="label-text">New York</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}