"use client";

import { motion, useReducedMotion } from "framer-motion";
import { labLoop } from "@/content/social";
import { loadFade, sectionInView, staggerContainer, staggerItem } from "@/lib/motion";

export function LabLoop() {
  const reduced = useReducedMotion();

  return (
    <section id="lab" className="section-pad border-b border-line" aria-labelledby="lab-title">
      <div className="site-shell">
        <motion.p {...loadFade(reduced, 0)} className="label-text mb-4">
          Operating loop
        </motion.p>
        <motion.h2 {...loadFade(reduced, 0.05)} id="lab-title" className="display-section mb-4">
          The lab
        </motion.h2>
        <motion.p {...loadFade(reduced, 0.1)} className="body-lg mb-12">
          Research → Build → Ship → Learn → Repeat. Continuously exploring and shipping.
        </motion.p>

        <motion.ol
          className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-5"
          {...sectionInView}
          variants={staggerContainer(reduced, 0.05)}
        >
          {labLoop.map((step) => (
            <motion.li
              key={step.n}
              variants={staggerItem(reduced, 12)}
              className="bg-bg p-5 sm:p-6"
            >
              <p className="font-mono text-[11px] tracking-[0.16em] text-signal">{step.n}</p>
              <p className="mt-3 font-display text-xl font-bold tracking-tight">{step.title}</p>
              <p className="mt-2 text-[13px] text-fg-muted">{step.body}</p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
