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
        <motion.p {...loadFade(reduced, 0)} className="label-text mb-3">
          Media
        </motion.p>
        <motion.h2 {...loadFade(reduced, 0.05)} id="media-title" className="display-section mb-8">
          From the lab
        </motion.h2>

        <motion.ul
          className="grid gap-4 sm:grid-cols-2"
          {...sectionInView}
          variants={staggerContainer(reduced, 0.07)}
        >
          {items.map((m) => (
            <motion.li
              key={m.id}
              variants={staggerItem(reduced, 16)}
              className="surface-panel p-5 transition-[transform,border-color] duration-500 ease-smooth hover:-translate-y-0.5 hover:border-line-strong"
            >
              <p className="font-mono text-[11px] uppercase tracking-wider text-fg-subtle">{m.kind}</p>
              <p className="mt-3 font-display text-[16px] font-semibold tracking-tight text-fg">{m.title}</p>
              <p className="mt-1.5 text-[12px] text-fg-subtle">
                {m.meta}
                {!m.live ? " · not live" : ""}
              </p>
              {m.href && m.live ? (
                m.href.startsWith("http") ? (
                  <a
                    href={m.href}
                    className="mt-4 inline-block text-[13px] text-fg underline-offset-4 hover:underline"
                    rel="noreferrer"
                    target="_blank"
                  >
                    Open →
                  </a>
                ) : (
                  <Link
                    href={m.href}
                    className="mt-4 inline-block text-[13px] text-fg underline-offset-4 hover:underline"
                  >
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
