"use client";

import { motion, useReducedMotion } from "framer-motion";
import { copy, social } from "@/data/site";
import { loadFade } from "@/lib/motion";

export function HeroLab() {
  const reduced = useReducedMotion();

  return (
    <section
      id="top"
      aria-label="Hero"
      className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden border-b border-line pt-[calc(5rem+env(safe-area-inset-top))] pb-20"
    >
      <div
        className="pointer-events-none absolute inset-y-0 right-[8%] hidden w-px bg-signal/20 lg:block"
        aria-hidden
      />
      <div className="site-shell">
        <motion.p {...loadFade(reduced, 0)} className="label-text mb-6">
          {copy.eyebrow}
        </motion.p>
        <motion.h1
          {...loadFade(reduced, 0.06)}
          className="display-hero text-balance max-w-[16ch] mb-7"
        >
          {copy.hero}
        </motion.h1>
        <motion.p {...loadFade(reduced, 0.12)} className="body-lg mb-10">
          {copy.heroSub}
        </motion.p>
        <motion.div {...loadFade(reduced, 0.18)} className="flex flex-wrap gap-3">
          <a href="/watch" className="btn-primary">
            Watch the build
          </a>
          <a href={social.github.href} className="btn-secondary" rel="noreferrer" target="_blank">
            GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
