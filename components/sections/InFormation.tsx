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
      className="section-padding relative overflow-hidden"
    >
      {/* Dynamic background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-3xl"
        />
      </div>

      <div className="container max-w-[1400px] relative z-10">
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
            <div className="absolute inset-0 border-2 border-blue-500/20 rounded-full" />
            <div className="absolute inset-2 border border-blue-400/30 rounded-full" />
            <motion.div
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-blue-500/10 rounded-full blur-sm"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}