"use client";

import * as React from "react";
import { motion } from "framer-motion";

/**
 * In formation - Visually engaging, deliberately non-specific signal.
 *
 * A visual indicator that new ventures are underway without premature
 * announcements or specifics.
 */
export function InFormation() {
  return (
    <section
      id="in-formation"
      aria-label="In formation"
      className="section-padding"
    >
      <div className="container max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <p className="label-text mb-6">In formation</p>
          <h2 className="display-section text-balance mb-8">
            New ventures are underway.
          </h2>
          <p className="body-text-large text-balance">
            We're building the next generation of AI-native systems and companies.
            When there's something to show, we'll show it.
          </p>

          {/* Animated visual indicator */}
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="mt-16 w-32 h-32 mx-auto relative"
          >
            <div className="absolute inset-0 border-2 border-white/20 rounded-full" />
            <div className="absolute inset-2 border border-white/30 rounded-full" />
            <motion.div
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-white/10 rounded-full blur-sm"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}