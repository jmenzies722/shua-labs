"use client";

import { motion, useReducedMotion } from "framer-motion";
import { copy, specialists } from "@/data/site";
import { loadFade, sectionInView, staggerContainer, staggerItem } from "@/lib/motion";

export function SystemBoard() {
  const reduced = useReducedMotion();

  return (
    <section id="system" className="section-pad border-b border-line" aria-labelledby="system-title">
      <div className="site-shell">
        <motion.p {...loadFade(reduced, 0)} className="label-text mb-4">
          00–10
        </motion.p>
        <motion.h2 {...loadFade(reduced, 0.05)} id="system-title" className="display-section text-balance mb-4">
          {copy.systemTitle}
        </motion.h2>
        <motion.p {...loadFade(reduced, 0.1)} className="body-lg mb-12">
          {copy.systemBody}
        </motion.p>
        <motion.ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" {...sectionInView} variants={staggerContainer(reduced, 0.04)}>
          {specialists.map((s) => (
            <motion.li key={s.code} variants={staggerItem(reduced, 12)} className="border border-line p-5 sm:p-6">
              <p className="font-mono text-[11px] tracking-[0.14em] text-signal">{s.code}</p>
              <p className="mt-3 font-display text-2xl font-bold tracking-tight">{s.name}</p>
              <p className="mt-1 text-sm text-fg-muted">{s.title}</p>
              <p className="mt-4 text-[13px] text-fg-subtle">{s.owns}</p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
