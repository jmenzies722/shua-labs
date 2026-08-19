"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  Y_CARD,
  Y_COPY,
  sectionInView,
  staggerContainer,
  staggerItem,
} from "@/lib/motion";

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
      <motion.div
        className="site-shell"
        {...sectionInView}
        variants={staggerContainer(reduced)}
      >
        <motion.div
          variants={staggerItem(reduced, Y_COPY)}
          className="mb-10 max-w-2xl md:mb-12"
        >
          <p className="label-text mb-3">Signals</p>
          <h2 className="display-section text-balance">
            What we&apos;re thinking about.
          </h2>
        </motion.div>

        <motion.div
          className="grid gap-0 md:grid-cols-3 md:border-t md:border-line md:pt-10"
          variants={staggerContainer(reduced)}
        >
          {signals.map((signal, index) => (
            <motion.article
              key={signal}
              variants={staggerItem(reduced, Y_CARD)}
              className="border-t border-line py-7 md:border-l md:border-t-0 md:px-7 md:py-0 md:first:border-l-0 md:first:pl-0 md:last:pr-0"
            >
              <p className="index-text mb-4">0{index + 1} · 2026</p>
              <p className="body-text">{signal}</p>
            </motion.article>
          ))}
          <motion.div
            variants={staggerItem(reduced, Y_COPY)}
            className="mt-10 md:col-span-3"
          >
            <Link href="/thesis" className="link-primary">
              Read the thesis
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
