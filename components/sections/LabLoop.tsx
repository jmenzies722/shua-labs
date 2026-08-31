"use client";

import { motion, useReducedMotion } from "framer-motion";
import { labLoop } from "@/content/social";
import { loadFade, sectionInView, staggerContainer, staggerItem } from "@/lib/motion";

export function LabLoop() {
  const reduced = useReducedMotion();

  return (
    <section id="lab" className="section-pad border-b border-line" aria-labelledby="lab-title">
      <div className="site-shell">
        <motion.p {...loadFade(reduced, 0)} className="label-text mb-2">
          Operating loop
        </motion.p>
        <motion.h2 {...loadFade(reduced, 0.04)} id="lab-title" className="display-section mb-2">
          The lab
        </motion.h2>
        <motion.p {...loadFade(reduced, 0.08)} className="body-lg mb-8">
          Research → Build → Ship → Learn → Repeat.
        </motion.p>

        <motion.ol
          className="divide-y divide-line overflow-hidden rounded-md border border-line"
          {...sectionInView}
          variants={staggerContainer(reduced, 0.04)}
        >
          {labLoop.map((step) => (
            <motion.li
              key={step.n}
              variants={staggerItem(reduced, 8)}
              className="notion-row grid gap-1 px-4 py-4 sm:grid-cols-[4rem_8rem_1fr] sm:items-baseline sm:gap-4 sm:px-5"
            >
              <p className="font-mono text-[12px] text-fg-subtle">{step.n}</p>
              <p className="text-[15px] font-semibold text-fg">{step.title}</p>
              <p className="text-[14px] text-fg-muted">{step.body}</p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
