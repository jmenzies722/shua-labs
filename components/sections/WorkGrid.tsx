"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { projects } from "@/content/projects";
import { loadFade, sectionInView, staggerContainer, staggerItem } from "@/lib/motion";

export function WorkGrid({ limit }: { limit?: number }) {
  const reduced = useReducedMotion();
  const list = limit ? projects.slice(0, limit) : projects;

  return (
    <section id="work" className="section-pad border-b border-line" aria-labelledby="work-title">
      <div className="site-shell">
        <motion.p {...loadFade(reduced, 0)} className="label-text mb-4">
          Portfolio
        </motion.p>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <motion.h2 {...loadFade(reduced, 0.05)} id="work-title" className="display-section">
            Work / experiments
          </motion.h2>
          {limit ? (
            <Link href="/work" className="text-[13px] text-signal">
              All work →
            </Link>
          ) : null}
        </div>

        <motion.ul
          className="grid gap-px bg-line sm:grid-cols-2"
          {...sectionInView}
          variants={staggerContainer(reduced, 0.05)}
        >
          {list.map((p) => (
            <motion.li key={p.id} variants={staggerItem(reduced, 12)} className="bg-bg p-6 sm:p-7">
              <div className="flex flex-wrap gap-2 font-mono text-[10px] tracking-[0.14em] text-fg-subtle">
                <span className="text-signal">{p.category}</span>
                <span>·</span>
                <span>{p.status}</span>
                <span>·</span>
                <span>{p.year}</span>
                {p.placeholder ? (
                  <>
                    <span>·</span>
                    <span>PLACEHOLDER</span>
                  </>
                ) : null}
              </div>
              <h3 className="mt-4 font-display text-2xl font-bold tracking-tight">{p.name}</h3>
              <p className="mt-2 text-[14px] text-fg-muted">{p.description}</p>
              {p.technologies.length ? (
                <p className="mt-4 font-mono text-[11px] text-fg-subtle">
                  {p.technologies.join(" · ")}
                </p>
              ) : null}
              <div className="mt-5 flex flex-wrap gap-4 text-[13px]">
                {p.links.map((l) =>
                  l.href.startsWith("http") ? (
                    <a key={l.label} href={l.href} className="text-signal" rel="noreferrer" target="_blank">
                      {l.label} →
                    </a>
                  ) : (
                    <Link key={l.label} href={l.href} className="text-signal">
                      {l.label} →
                    </Link>
                  )
                )}
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
