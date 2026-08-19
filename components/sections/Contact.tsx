"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { VIEWPORT, Y_COPY, revealTransition } from "@/lib/motion";

/**
 * Contact - One decisive CTA to collaborate, partner, or join the conversation.
 */
export function Contact() {
  const reduced = useReducedMotion();

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="section-padding section-rule scroll-mt-14"
    >
      <div className="site-shell">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: Y_COPY }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={revealTransition(reduced)}
          className="mx-auto max-w-xl text-center"
        >
          <p className="label-text mb-3">Get in touch</p>
          <h2 className="display-section text-balance mb-5">
            Let's build something together.
          </h2>
          <p className="body-text-large text-balance mb-8">
            Whether you're looking to collaborate, partner, or just have a conversation
            about the future of AI-native systems, we'd love to hear from you.
          </p>

          <a
            href="mailto:jmenzies722@gmail.com"
            className="btn-primary"
          >
            Start a conversation
          </a>

          <p className="body-text mt-6">
            Or reach out directly at{" "}
            <a
              href="mailto:jmenzies722@gmail.com"
              className="link-primary"
            >
              jmenzies722@gmail.com
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
