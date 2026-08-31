"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { featuredBuild } from "@/content/projects";
import { formatDateStamp } from "@/lib/utils";
import { loadFade } from "@/lib/motion";

export function CurrentlyBuilding() {
  const reduced = useReducedMotion();
  const b = featuredBuild;

  return (
    <section id="currently-building" className="section-pad border-b border-line" aria-labelledby="building-title">
      <div className="site-shell">
        <motion.p {...loadFade(reduced, 0)} className="label-text mb-4">
          Live
        </motion.p>
        <motion.h2 {...loadFade(reduced, 0.05)} id="building-title" className="display-section mb-10">
          Currently building
        </motion.h2>

        <motion.article
          {...loadFade(reduced, 0.1)}
          className="border border-line bg-bg-panel/40 p-6 sm:p-8"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-signal">
              <span className="status-pulse h-1.5 w-1.5 rounded-full bg-signal" />
              {b.status.toUpperCase()}
            </span>
            <time className="font-mono text-[11px] text-fg-subtle" dateTime={b.lastUpdate}>
              UPDATED {formatDateStamp(b.lastUpdate)}
            </time>
          </div>
          <h3 className="mt-4 font-display text-3xl font-bold tracking-tight">{b.name}</h3>
          <p className="mt-3 max-w-2xl text-[15px] text-fg-muted">{b.description}</p>
          <p className="mt-4 text-[14px] text-fg">
            <span className="text-fg-subtle">Milestone · </span>
            {b.milestone}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {b.links.map((l) =>
              l.href.startsWith("http") ? (
                <a key={l.label} href={l.href} className="btn-secondary" rel="noreferrer" target="_blank">
                  {l.label}
                </a>
              ) : (
                <Link key={l.label} href={l.href} className="btn-secondary">
                  {l.label}
                </Link>
              )
            )}
          </div>
        </motion.article>
      </div>
    </section>
  );
}
