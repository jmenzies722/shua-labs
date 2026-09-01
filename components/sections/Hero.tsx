"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { siteMeta, social } from "@/content/social";
import { loadFade } from "@/lib/motion";

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section id="top" aria-label="Hero" className="hero-plane">
      {!reduced ? (
        <>
          <span
            aria-hidden
            className="ambient-orb"
            style={{
              top: "8%",
              right: "12%",
              width: "42vw",
              height: "42vw",
              maxWidth: 520,
              maxHeight: 520,
              background: "rgba(232, 220, 190, 0.12)",
            }}
          />
          <span
            aria-hidden
            className="ambient-orb"
            style={{
              bottom: "10%",
              left: "4%",
              width: "28vw",
              height: "28vw",
              maxWidth: 340,
              maxHeight: 340,
              background: "rgba(140, 130, 110, 0.1)",
              animationDelay: "-5s",
            }}
          />
        </>
      ) : null}

      <div className="site-shell relative z-10 w-full pb-16 pt-[calc(7rem+env(safe-area-inset-top))] sm:pb-24">
        <motion.p
          {...loadFade(reduced, 0, 12)}
          className="mb-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle"
        >
          <span className="status-pulse h-1.5 w-1.5 rounded-full bg-fg" />
          Independent AI lab · {siteMeta.location}
        </motion.p>

        <motion.h1 {...loadFade(reduced, 0.06, 28)} className="display-brand text-balance">
          {siteMeta.name}
        </motion.h1>

        <motion.p
          {...loadFade(reduced, 0.14, 20)}
          className="mt-5 max-w-xl font-display text-[clamp(1.35rem,3vw,1.85rem)] font-semibold leading-snug tracking-tight text-fg"
        >
          {siteMeta.tagline}
        </motion.p>

        <motion.p {...loadFade(reduced, 0.2, 16)} className="body-lg mt-4">
          {siteMeta.supporting}
        </motion.p>

        <motion.div {...loadFade(reduced, 0.28, 14)} className="mt-10 flex flex-wrap gap-3">
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
