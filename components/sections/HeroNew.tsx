"use client";

import * as React from "react";
import { motion } from "framer-motion";

/**
 * Hero - Building what comes next.
 *
 * A future-facing venture company creating ventures, products, and systems
 * for an AI-native world.
 */
export function HeroNew() {
  return (
    <section
      id="top"
      aria-label="Hero"
      className="relative isolate flex min-h-[100svh] w-full flex-col justify-center overflow-hidden pt-[calc(6rem+env(safe-area-inset-top))]"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/[0.03] rounded-full blur-3xl animate-pulse-slow delay-200" />
      </div>

      <div className="container max-w-[1400px] relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="label-text mb-6">Shua Labs</p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="display-hero text-balance mb-8"
          >
            Building what comes next.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="body-text-large max-w-2xl text-balance mb-12"
          >
            Shua Labs creates ventures, products, and systems for an AI-native world.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#contact"
              className="btn-primary"
            >
              Get in touch
            </a>
            <a
              href="#what-we-build"
              className="btn-secondary"
            >
              What we build
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-line/50 rounded-full flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 bg-white rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}