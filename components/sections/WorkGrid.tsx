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
        <motion.p {...loadFade(reduced, 0)} className="label-text mb-3">
          Portfolio
        </motion.p>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <motion.h2 {...loadFade(reduced, 0.05)} id="work-title" className="display-section">
            Work / experiments
          </motion.h2>
          {limit ? (
            <Link
              href="/work"
              className="text-[13px] text-fg-muted transition-colors duration-300 hover:text-fg"
            >
              All work →
            </Link>
          ) : null}
        </div>

        <motion.ul
          className="surface-list divide-y divide-line"
          {...sectionInView}
          variants={staggerContainer(reduced, 0.06)}
        >
          {list.map((p) => (
            <motion.li key={p.id} variants={staggerItem(reduced, 14)} className="surface-row px-5 py-6 sm:px-6">
              <div className="flex flex-wrap gap-x-2 gap-y-1 text-[12px] text-fg-subtle">
                <span>{p.category}</span>
                <span aria-hidden>·</span>
                <span>{p.status}</span>
                <span aria-hidden>·</span>
                <span>{p.year}</span>
                {p.placeholder ? (
                  <>
                    <span aria-hidden>·</span>
                    <span>Placeholder</span>
                  </>
                ) : null}
              </div>
              <h3 className="mt-2.5 font-display text-[18px] font-semibold tracking-tight text-fg">
                {p.name}
              </h3>
              <p className="mt-1.5 max-w-2xl text-[14px] leading-relaxed text-fg-muted">{p.description}</p>
              {p.technologies.length ? (
                <p className="mt-2.5 font-mono text-[11px] text-fg-subtle">{p.technologies.join(" · ")}</p>
              ) : null}
              <div className="mt-4 flex flex-wrap gap-4 text-[13px]">
                {p.links.map((l) =>
                  l.href.startsWith("http") ? (
                    <a
                      key={l.label}
                      href={l.href}
                      className="text-fg underline-offset-4 transition-opacity hover:underline"
                      rel="noreferrer"
                      target="_blank"
                    >
                      {l.label} →
                    </a>
                  ) : (
                    <Link
                      key={l.label}
                      href={l.href}
                      className="text-fg underline-offset-4 transition-opacity hover:underline"
                    >
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
