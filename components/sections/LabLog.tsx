"use client";

import { motion, useReducedMotion } from "framer-motion";
import { copy, labLog } from "@/data/site";
import { formatDateStamp } from "@/lib/utils";
import { loadFade } from "@/lib/motion";

export function LabLog() {
  const reduced = useReducedMotion();

  return (
    <section id="lab" className="section-pad border-b border-line" aria-labelledby="lab-title">
      <div className="site-shell">
        <motion.p {...loadFade(reduced, 0)} className="label-text mb-4">Dated</motion.p>
        <motion.h2 {...loadFade(reduced, 0.05)} id="lab-title" className="display-section mb-4">{copy.logTitle}</motion.h2>
        <motion.p {...loadFade(reduced, 0.1)} className="body-lg mb-12">{copy.logBody}</motion.p>
        <ol className="divide-y divide-line border-y border-line">
          {labLog.map((entry) => (
            <li key={entry.date + entry.title} className="grid gap-3 py-8 md:grid-cols-[8rem_1fr] md:gap-10">
              <time dateTime={entry.date} className="font-mono text-[12px] tracking-wide text-signal">{formatDateStamp(entry.date)}</time>
              <div>
                <h3 className="font-display text-xl font-bold tracking-tight">{entry.title}</h3>
                <p className="mt-2 max-w-xl text-[15px] text-fg-muted">{entry.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
