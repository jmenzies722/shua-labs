"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { BuildFeedItem } from "@/content/types";
import { formatDateStamp } from "@/lib/utils";
import { loadFade, sectionInView, staggerContainer, staggerItem } from "@/lib/motion";

export function BuildLogPreview({
  entries,
  limit = 3,
}: {
  entries: BuildFeedItem[];
  limit?: number;
}) {
  const reduced = useReducedMotion();
  const list = entries.slice(0, limit);

  return (
    <section id="build-log" className="section-pad border-b border-line" aria-labelledby="build-title">
      <div className="site-shell">
        <motion.p {...loadFade(reduced, 0)} className="label-text mb-3">
          Changelog
        </motion.p>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <motion.h2 {...loadFade(reduced, 0.05)} id="build-title" className="display-section">
            Build log
          </motion.h2>
          <Link
            href="/build"
            className="text-[13px] text-fg-muted transition-colors duration-300 hover:text-fg"
          >
            Full log →
          </Link>
        </div>

        <motion.ol
          className="surface-list divide-y divide-line"
          {...sectionInView}
          variants={staggerContainer(reduced, 0.06)}
        >
          {list.map((e) => (
            <motion.li
              key={e.id}
              variants={staggerItem(reduced, 14)}
              className="surface-row grid gap-1 px-5 py-5 sm:grid-cols-[7.5rem_1fr] sm:gap-6 sm:px-6 sm:py-6"
            >
              <time dateTime={e.date} className="font-mono text-[12px] text-fg-subtle">
                {formatDateStamp(e.date)}
              </time>
              <div>
                <div className="mb-1.5 flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-fg-subtle">
                  <span>{e.source === "github" ? "GitHub" : "Lab note"}</span>
                  {e.sha ? <span>· {e.sha}</span> : null}
                </div>
                {e.source === "github" && e.commitUrl ? (
                  <a
                    href={e.commitUrl}
                    className="font-display text-[16px] font-semibold tracking-tight text-fg transition-opacity hover:opacity-80"
                    rel="noreferrer"
                    target="_blank"
                  >
                    {e.title}
                  </a>
                ) : (
                  <Link
                    href={`/build/${e.slug}`}
                    className="font-display text-[16px] font-semibold tracking-tight text-fg transition-opacity hover:opacity-80"
                  >
                    {e.title}
                  </Link>
                )}
                <p className="mt-1.5 max-w-xl text-[14px] leading-relaxed text-fg-muted">{e.summary}</p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
