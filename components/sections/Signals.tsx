"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const signals = [
  "Technology should increase human agency.",
  "Useful systems earn trust through use, not theater.",
  "The next company starts with a problem worth staying close to.",
];

/**
 * Signals — additive thinking notes. Does not replace the live homepage sections.
 */
export function Signals() {
  const reduced = useReducedMotion();

  return (
    <section
      id="signals"
      aria-label="Signals"
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
          <p className="label-text mb-3">Signals</p>
          <h2 className="display-section text-balance">
            What we&apos;re thinking about.
          </h2>
        </motion.div>

        <div className="grid gap-0 md:grid-cols-3 md:border-t md:border-line md:pt-10">
          {signals.map((signal, index) => (
            <motion.article
              key={signal}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: reduced ? 0 : 0.45,
                delay: reduced ? 0 : index * 0.06,
              }}
              className="border-t border-line py-7 md:border-l md:border-t-0 md:px-7 md:py-0 md:first:border-l-0 md:first:pl-0 md:last:pr-0"
            >
              <p className="index-text mb-4">0{index + 1} · 2026</p>
              <p className="body-text">{signal}</p>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : 0.12 }}
          className="mt-10"
        >
          <Link href="/thesis" className="link-primary">
            Read the thesis
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
