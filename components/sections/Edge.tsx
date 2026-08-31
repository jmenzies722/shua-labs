"use client";

import { motion, useReducedMotion } from "framer-motion";
import { copy } from "@/data/site";
import { loadFade } from "@/lib/motion";

export function Edge() {
  const reduced = useReducedMotion();

  return (
    <section id="edge" className="section-pad border-b border-line" aria-labelledby="edge-title">
      <div className="site-shell grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-end">
        <motion.p {...loadFade(reduced, 0)} className="label-text">
          Positioning
        </motion.p>
        <div>
          <motion.h2 {...loadFade(reduced, 0.05)} id="edge-title" className="display-section text-balance mb-5">
            {copy.edgeTitle}
          </motion.h2>
          <motion.p {...loadFade(reduced, 0.1)} className="body-lg">
            {copy.edgeBody}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
