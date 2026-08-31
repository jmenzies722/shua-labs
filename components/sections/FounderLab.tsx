"use client";

import { motion, useReducedMotion } from "framer-motion";
import { copy, site } from "@/data/site";
import { loadFade } from "@/lib/motion";

export function FounderLab() {
  const reduced = useReducedMotion();

  return (
    <section id="founder" className="section-pad border-b border-line" aria-labelledby="founder-name">
      <div className="site-shell grid items-center gap-10 md:grid-cols-[minmax(0,16rem)_1fr]">
        <motion.div {...loadFade(reduced, 0)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={site.founder.photo} alt="Josh Menzies" className="aspect-[4/5] w-full max-w-xs object-cover grayscale" />
        </motion.div>
        <div>
          <motion.p {...loadFade(reduced, 0.05)} className="label-text mb-3">{site.founder.location}</motion.p>
          <motion.h2 {...loadFade(reduced, 0.08)} id="founder-name" className="display-section mb-5">{site.founder.name}</motion.h2>
          <motion.p {...loadFade(reduced, 0.12)} className="body-lg mb-8">{copy.founderBlurb}</motion.p>
          <motion.div {...loadFade(reduced, 0.16)} className="flex flex-wrap gap-3">
            <a href={`mailto:${site.founder.email}`} className="btn-primary">Get in touch</a>
            <a href={site.founder.github} className="btn-secondary" rel="noreferrer" target="_blank">GitHub</a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
