"use client";

import { motion, useReducedMotion } from "framer-motion";
import { social } from "@/content/social";
import { loadFade } from "@/lib/motion";

export function FollowTheBuild() {
  const reduced = useReducedMotion();

  return (
    <section id="follow" className="section-pad border-b border-line" aria-labelledby="follow-title">
      <div className="site-shell max-w-[640px]">
        <motion.p {...loadFade(reduced, 0)} className="label-text mb-2">
          Distribution
        </motion.p>
        <motion.h2 {...loadFade(reduced, 0.04)} id="follow-title" className="display-section mb-3">
          Follow the build.
        </motion.h2>
        <motion.p {...loadFade(reduced, 0.08)} className="body-lg mb-6">
          Research, experiments, architecture, launches, failures, and everything learned along the way.
        </motion.p>
        <motion.div {...loadFade(reduced, 0.12)} className="flex flex-wrap gap-2">
          <a href={social.github.href} className="btn-primary" rel="noreferrer" target="_blank">
            GitHub
          </a>
          <span className="btn-secondary cursor-default opacity-60" title="Opening — founder creates account">
            YouTube {social.youtube.handle}
          </span>
          <span className="btn-secondary cursor-default opacity-60" title="Opening — founder creates account">
            Instagram {social.instagram.handle}
          </span>
        </motion.div>
        <motion.p {...loadFade(reduced, 0.16)} className="mt-4 text-[13px] text-fg-subtle">
          YouTube and Instagram open when the first episode and stills ship. Until then, GitHub is the public record.
        </motion.p>
      </div>
    </section>
  );
}
