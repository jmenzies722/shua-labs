"use client";

import * as React from "react";
import { journey } from "@/data/journey";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal, RevealGroup } from "@/components/Reveal";
import { formatDateStamp } from "@/lib/utils";

/**
 * Building-in-the-open changelog. Vertical timeline with accent nodes.
 * Newest first. Scroll-reveals staggered.
 */
export function Journey() {
  return (
    <section
      id="journey"
      aria-labelledby="journey-title"
      className="relative py-28 md:py-44 scroll-mt-24"
    >
      <div className="container">
        <Reveal>
          <SectionHeading
            id="journey-title"
            eyebrow="Journey"
            title={
              <>
                Building in the open,{" "}
                <span className="text-fg-muted">one entry at a time.</span>
              </>
            }
            lead="The momentum log. Public, dated, honest."
          />
        </Reveal>

        <div className="mt-16 md:mt-20 relative max-w-3xl">
          {/* Spine */}
          <div
            aria-hidden
            className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-line-strong to-transparent"
          />

          <RevealGroup className="flex flex-col gap-12" stagger={0.08}>
            {journey.map((entry, i) => (
              <Reveal key={entry.date + i} y={16}>
                <article className="relative pl-10">
                  {/* Node */}
                  <span
                    aria-hidden
                    className="absolute left-0 top-2 inline-flex h-3.5 w-3.5 items-center justify-center"
                  >
                    <span className="absolute inset-0 rounded-full bg-accent/30 blur-[6px]" />
                    <span className="relative h-2 w-2 rounded-full bg-accent shadow-[0_0_10px_rgba(10,132,255,0.8)]" />
                  </span>

                  <time
                    dateTime={entry.date}
                    className="block font-mono text-[11px] uppercase tracking-[0.18em] text-fg-subtle"
                  >
                    {formatDateStamp(entry.date)}
                  </time>

                  <h3 className="mt-2 text-xl md:text-2xl font-semibold tracking-tight text-fg">
                    {entry.title}
                  </h3>

                  {entry.detail && (
                    <p className="mt-2 text-[15px] leading-relaxed text-fg-muted max-w-2xl">
                      {entry.detail}
                    </p>
                  )}
                </article>
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
