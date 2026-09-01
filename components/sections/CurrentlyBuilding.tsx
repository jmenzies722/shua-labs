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
        <motion.p {...loadFade(reduced, 0)} className="label-text mb-3">
          Live
        </motion.p>
        <motion.h2 {...loadFade(reduced, 0.05)} id="building-title" className="display-section mb-8">
          Currently building
        </motion.h2>

        <motion.article {...loadFade(reduced, 0.1)} className="surface-panel p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2 text-[12px] text-fg-subtle">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-bg/40 px-2.5 py-1 text-fg-muted">
              <span className="status-pulse h-1.5 w-1.5 rounded-full bg-fg" />
              {b.status}
            </span>
            <span aria-hidden>·</span>
            <time dateTime={b.lastUpdate}>Updated {formatDateStamp(b.lastUpdate)}</time>
          </div>
          <h3 className="mt-4 font-display text-[clamp(1.35rem,2.5vw,1.75rem)] font-bold tracking-tight text-fg">
            {b.name}
          </h3>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-fg-muted">{b.description}</p>
          <p className="mt-4 text-[14px] text-fg">
            <span className="text-fg-subtle">Milestone · </span>
            {b.milestone}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
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
