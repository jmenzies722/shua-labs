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
        <motion.p {...loadFade(reduced, 0)} className="label-text mb-2">
          Live
        </motion.p>
        <motion.h2 {...loadFade(reduced, 0.04)} id="building-title" className="display-section mb-6">
          Currently building
        </motion.h2>

        <motion.article {...loadFade(reduced, 0.08)} className="notion-panel p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-2 text-[12px] text-fg-subtle">
            <span className="inline-flex items-center gap-1.5 rounded bg-bg px-1.5 py-0.5 text-fg-muted">
              <span className="status-pulse h-1.5 w-1.5 rounded-full bg-fg" />
              {b.status}
            </span>
            <span>·</span>
            <time dateTime={b.lastUpdate}>Updated {formatDateStamp(b.lastUpdate)}</time>
          </div>
          <h3 className="mt-3 text-[22px] font-semibold tracking-tight text-fg">{b.name}</h3>
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-fg-muted">{b.description}</p>
          <p className="mt-3 text-[14px] text-fg">
            <span className="text-fg-subtle">Milestone · </span>
            {b.milestone}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
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
