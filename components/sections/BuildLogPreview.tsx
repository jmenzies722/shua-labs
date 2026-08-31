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
        <motion.p {...loadFade(reduced, 0)} className="label-text mb-2">
          Changelog
        </motion.p>
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <motion.h2 {...loadFade(reduced, 0.04)} id="build-title" className="display-section">
            Build log
          </motion.h2>
          <Link href="/build" className="text-[13px] text-fg-muted hover:text-fg">
            Full log →
          </Link>
        </div>

        <ol className="divide-y divide-line overflow-hidden rounded-md border border-line">
          {entries.map((e) => (
            <li key={e.id} className="notion-row grid gap-1 px-4 py-4 sm:grid-cols-[7rem_1fr] sm:gap-6 sm:px-5 sm:py-5">
              <time dateTime={e.date} className="text-[12px] text-fg-subtle">
                {formatDateStamp(e.date)}
              </time>
              <div>
                <Link href={`/build/${e.slug}`} className="text-[16px] font-semibold tracking-tight text-fg hover:underline">
                  {e.title}
                </Link>
                <p className="mt-1 max-w-xl text-[14px] text-fg-muted">{e.summary}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
