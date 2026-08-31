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
      className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden border-b border-line pt-[calc(5rem+env(safe-area-inset-top))] pb-20"
    >
      <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden>
        <div className="absolute right-[12%] top-1/4 h-64 w-64 rounded-full bg-signal/10 blur-3xl" />
        <svg className="absolute bottom-16 right-8 hidden h-40 w-40 text-signal/30 lg:block" viewBox="0 0 120 120" fill="none">
          <circle cx="20" cy="60" r="3" fill="currentColor" />
          <circle cx="60" cy="30" r="3" fill="currentColor" />
          <circle cx="100" cy="70" r="3" fill="currentColor" />
          <circle cx="70" cy="95" r="3" fill="currentColor" />
          <path d="M20 60 L60 30 L100 70 L70 95 Z" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      <div className="site-shell relative">
        <motion.div {...loadFade(reduced, 0)} className="mb-6 flex flex-wrap items-center gap-4">
          <p className="label-text">{siteMeta.name}</p>
          <span className="inline-flex items-center gap-2 border border-line px-2.5 py-1 font-mono text-[10px] tracking-[0.16em] text-signal">
            <span className="status-pulse h-1.5 w-1.5 rounded-full bg-signal" />
            LAB STATUS · ACTIVE
          </span>
        </motion.div>

        <motion.h1 {...loadFade(reduced, 0.06)} className="display-hero text-balance max-w-[14ch] mb-6">
          {siteMeta.tagline}
        </motion.h1>

        <motion.p {...loadFade(reduced, 0.12)} className="body-lg mb-4">
          {siteMeta.supporting}
        </motion.p>

        <motion.p
          {...loadFade(reduced, 0.14)}
          className="mb-10 font-mono text-[11px] tracking-[0.16em] text-fg-subtle"
        >
          {siteMeta.location.toUpperCase()} · EST. {siteMeta.established}
        </motion.p>

        <motion.div {...loadFade(reduced, 0.18)} className="flex flex-wrap gap-3">
          <Link href="/work" className="btn-primary">
            Explore the Lab
          </Link>
          <Link href="/#follow" className="btn-secondary">
            Follow the Build
          </Link>
          <a
            href={social.github.href}
            className="btn-secondary"
            rel="noreferrer"
            target="_blank"
          >
            GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
