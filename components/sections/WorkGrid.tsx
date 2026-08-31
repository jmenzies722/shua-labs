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
        <motion.p {...loadFade(reduced, 0)} className="label-text mb-2">
          Portfolio
        </motion.p>
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <motion.h2 {...loadFade(reduced, 0.04)} id="work-title" className="display-section">
            Work / experiments
          </motion.h2>
          {limit ? (
            <Link href="/work" className="text-[13px] text-fg-muted hover:text-fg">
              All work →
            </Link>
          ) : null}
        </div>

        <motion.ul
          className="divide-y divide-line overflow-hidden rounded-md border border-line"
          {...sectionInView}
          variants={staggerContainer(reduced, 0.04)}
        >
          {list.map((p) => (
            <motion.li key={p.id} variants={staggerItem(reduced, 8)} className="notion-row px-4 py-5 sm:px-5">
              <div className="flex flex-wrap gap-x-2 gap-y-1 text-[12px] text-fg-subtle">
                <span>{p.category}</span>
                <span>·</span>
                <span>{p.status}</span>
                <span>·</span>
                <span>{p.year}</span>
                {p.placeholder ? (
                  <>
                    <span>·</span>
                    <span>Placeholder</span>
                  </>
                ) : null}
              </div>
              <h3 className="mt-2 text-[18px] font-semibold tracking-tight text-fg">{p.name}</h3>
              <p className="mt-1 max-w-2xl text-[14px] leading-relaxed text-fg-muted">{p.description}</p>
              {p.technologies.length ? (
                <p className="mt-2 text-[12px] text-fg-subtle">{p.technologies.join(" · ")}</p>
              ) : null}
              <div className="mt-3 flex flex-wrap gap-3 text-[13px]">
                {p.links.map((l) =>
                  l.href.startsWith("http") ? (
                    <a key={l.label} href={l.href} className="text-fg underline-offset-2 hover:underline" rel="noreferrer" target="_blank">
                      {l.label} →
                    </a>
                  ) : (
                    <Link key={l.label} href={l.href} className="text-fg underline-offset-2 hover:underline">
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
