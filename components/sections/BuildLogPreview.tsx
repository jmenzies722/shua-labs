"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { buildLog } from "@/content/build-log";
import { formatDateStamp } from "@/lib/utils";
import { loadFade } from "@/lib/motion";

export function BuildLogPreview({ limit = 3 }: { limit?: number }) {
  const reduced = useReducedMotion();
  const entries = buildLog.slice(0, limit);

  return (
    <section id="build-log" className="section-pad border-b border-line" aria-labelledby="build-title">
      <div className="site-shell">
        <motion.p {...loadFade(reduced, 0)} className="label-text mb-4">
          Changelog
        </motion.p>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <motion.h2 {...loadFade(reduced, 0.05)} id="build-title" className="display-section">
            Build log
          </motion.h2>
          <Link href="/build" className="text-[13px] text-signal">
            Full log →
          </Link>
        </div>

        <ol className="divide-y divide-line border-y border-line">
          {entries.map((e) => (
            <li key={e.id} className="grid gap-3 py-7 md:grid-cols-[8rem_1fr] md:gap-10">
              <time dateTime={e.date} className="font-mono text-[12px] tracking-wide text-signal">
                {formatDateStamp(e.date)}
              </time>
              <div>
                <Link href={`/build/${e.slug}`} className="font-display text-xl font-bold tracking-tight hover:text-signal">
                  {e.title}
                </Link>
                <p className="mt-2 max-w-xl text-[14px] text-fg-muted">{e.summary}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
