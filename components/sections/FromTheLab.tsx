"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { media } from "@/content/social";
import { loadFade, sectionInView, staggerContainer, staggerItem } from "@/lib/motion";

export function FromTheLab() {
  const reduced = useReducedMotion();
  const items = media.slice(0, 6);

  return (
    <section id="from-the-lab" className="section-pad border-b border-line" aria-labelledby="media-title">
      <div className="site-shell">
        <motion.p {...loadFade(reduced, 0)} className="label-text mb-4">
          Media
        </motion.p>
        <motion.h2 {...loadFade(reduced, 0.05)} id="media-title" className="display-section mb-10">
          From the lab
        </motion.h2>

        <motion.ul
          className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3"
          {...sectionInView}
          variants={staggerContainer(reduced, 0.04)}
        >
          {items.map((m) => (
            <motion.li key={m.id} variants={staggerItem(reduced, 12)} className="bg-bg p-5 sm:p-6">
              <p className="font-mono text-[10px] tracking-[0.14em] text-signal">{m.kind.toUpperCase()}</p>
              <p className="mt-3 font-display text-lg font-bold tracking-tight">{m.title}</p>
              <p className="mt-2 font-mono text-[11px] text-fg-subtle">
                {m.meta}
                {!m.live ? " · not live" : ""}
              </p>
              {m.href && m.live ? (
                m.href.startsWith("http") ? (
                  <a href={m.href} className="mt-4 inline-block text-[13px] text-signal" rel="noreferrer" target="_blank">
                    Open →
                  </a>
                ) : (
                  <Link href={m.href} className="mt-4 inline-block text-[13px] text-signal">
                    Open →
                  </Link>
                )
              ) : (
                <p className="mt-4 text-[12px] text-fg-subtle">Draft</p>
              )}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
