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
        <motion.p {...loadFade(reduced, 0)} className="label-text mb-2">
          Media
        </motion.p>
        <motion.h2 {...loadFade(reduced, 0.04)} id="media-title" className="display-section mb-6">
          From the lab
        </motion.h2>

        <motion.ul
          className="grid gap-3 sm:grid-cols-2"
          {...sectionInView}
          variants={staggerContainer(reduced, 0.04)}
        >
          {items.map((m) => (
            <motion.li key={m.id} variants={staggerItem(reduced, 8)} className="notion-panel p-4 transition-colors hover:bg-bg-raised">
              <p className="text-[12px] text-fg-subtle">{m.kind}</p>
              <p className="mt-2 text-[15px] font-semibold tracking-tight text-fg">{m.title}</p>
              <p className="mt-1 text-[12px] text-fg-subtle">
                {m.meta}
                {!m.live ? " · not live" : ""}
              </p>
              {m.href && m.live ? (
                m.href.startsWith("http") ? (
                  <a href={m.href} className="mt-3 inline-block text-[13px] text-fg hover:underline" rel="noreferrer" target="_blank">
                    Open →
                  </a>
                ) : (
                  <Link href={m.href} className="mt-3 inline-block text-[13px] text-fg hover:underline">
                    Open →
                  </Link>
                )
              ) : (
                <p className="mt-3 text-[12px] text-fg-subtle">Draft</p>
              )}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
