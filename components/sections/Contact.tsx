"use client";

import * as React from "react";
import { motion } from "framer-motion";

/**
 * Contact - One decisive CTA to collaborate, partner, or join the conversation.
 */
export function Contact() {
  return (
    <section
      id="contact"
      aria-label="Contact"
      className="section-padding relative"
    >
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container max-w-[1400px] relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <p className="label-text mb-4">Get in touch</p>
          <h2 className="display-section text-balance mb-8">
            Let's build something together.
          </h2>
          <p className="body-text-large text-balance mb-12">
            Whether you're looking to collaborate, partner, or just have a conversation
            about the future of AI-native systems, we'd love to hear from you.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="mailto:jmenzies722@gmail.com"
              className="btn-primary text-lg px-10 py-5"
            >
              Start a conversation
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="body-text mt-8"
          >
            Or reach out directly at{" "}
            <a
              href="mailto:jmenzies722@gmail.com"
              className="link-primary"
            >
              jmenzies722@gmail.com
            </a>
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}