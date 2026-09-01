"use client";

import { motion, useReducedMotion } from "framer-motion";
import { labLoop } from "@/content/social";
import { loadFade, sectionInView, staggerContainer, staggerItem } from "@/lib/motion";

export function LabLoop() {
  const reduced = useReducedMotion();

  return (
    <section id="lab" className="section-pad border-b border-line" aria-labelledby="lab-title">
      <div className="site-shell">
        <motion.p {...loadFade(reduced, 0)} className="label-text mb-3">
          Operating loop
        </motion.p>
        <motion.h2 {...loadFade(reduced, 0.05)} id="lab-title" className="display-section mb-3">
          The lab
        </motion.h2>
        <motion.p {...loadFade(reduced, 0.1)} className="body-lg mb-10">
          Research → Build → Ship → Learn → Repeat.
        </motion.p>

        <motion.ol
          className="surface-list divide-y divide-line"
          {...sectionInView}
          variants={staggerContainer(reduced, 0.06)}
        >
          {labLoop.map((step) => (
            <motion.li
              key={step.n}
              variants={staggerItem(reduced, 14)}
              className="surface-row grid gap-1 px-5 py-5 sm:grid-cols-[4.5rem_9rem_1fr] sm:items-baseline sm:gap-5 sm:px-6"
            >
              <p className="font-mono text-[12px] text-fg-subtle">{step.n}</p>
              <p className="font-display text-[16px] font-semibold tracking-tight text-fg">{step.title}</p>
              <p className="text-[14px] leading-relaxed text-fg-muted">{step.body}</p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
