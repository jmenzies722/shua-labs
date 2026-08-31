"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { siteMeta, social } from "@/content/social";
import { loadFade } from "@/lib/motion";

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section
      id="top"
      aria-label="Hero"
      className="border-b border-line pt-[calc(5.5rem+env(safe-area-inset-top))] pb-16 sm:pb-20"
    >
      <div className="site-shell max-w-[720px]">
        <motion.div {...loadFade(reduced, 0)} className="mb-5 flex flex-wrap items-center gap-2.5">
          <p className="label-text">{siteMeta.name}</p>
          <span className="inline-flex items-center gap-1.5 rounded-md bg-bg-panel px-2 py-0.5 text-[12px] text-fg-muted">
            <span className="status-pulse h-1.5 w-1.5 rounded-full bg-fg" />
            Active
          </span>
        </motion.div>

        <motion.h1 {...loadFade(reduced, 0.05)} className="display-hero text-balance mb-4">
          {siteMeta.tagline}
        </motion.h1>

        <motion.p {...loadFade(reduced, 0.1)} className="body-lg mb-3">
          {siteMeta.supporting}
        </motion.p>

        <motion.p {...loadFade(reduced, 0.12)} className="mb-8 text-[13px] text-fg-subtle">
          {siteMeta.location} · Est. {siteMeta.established}
        </motion.p>

        <motion.div {...loadFade(reduced, 0.15)} className="flex flex-wrap gap-2">
          <Link href="/work" className="btn-primary">
            Explore the Lab
          </Link>
          <Link href="/#follow" className="btn-secondary">
            Follow the Build
          </Link>
          <a href={social.github.href} className="btn-secondary" rel="noreferrer" target="_blank">
            GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
