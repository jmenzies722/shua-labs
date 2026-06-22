"use client";

import * as React from "react";
import { journey } from "@/data/journey";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal, RevealGroup } from "@/components/Reveal";
import { formatDateStamp } from "@/lib/utils";

/**
 * Building-in-the-open changelog — Apple-quiet vertical timeline.
 * Newest first. Accent nodes are tiny dots without neon glow.
 */
export function Journey() {
  return (
    <section
      id="journey"
      aria-labelledby="journey-title"
      className="relative apple-section scroll-mt-16"
    >
      <div className="container max-w-[1100px]">
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
          <div
            aria-hidden
            className="absolute left-[7px] top-2 bottom-2 w-px bg-line"
          />

          <RevealGroup className="flex flex-col gap-12" stagger={0.08}>
            {journey.map((entry, i) => (
              <Reveal key={entry.date + i} y={20}>
                <article className="relative pl-10">
                  <span
                    aria-hidden
                    className="absolute left-0 top-2 inline-flex h-3.5 w-3.5 items-center justify-center"
                  >
                    <span className="relative h-2 w-2 rounded-full bg-accent" />
                  </span>

                  <time
                    dateTime={entry.date}
                    className="block font-mono text-[12px] tracking-[0.05em] text-fg-subtle"
                  >
                    {formatDateStamp(entry.date)}
                  </time>

                  <h3 className="mt-2 text-[22px] md:text-[24px] font-semibold tracking-apple-section leading-[1.15] text-fg">
                    {entry.title}
                  </h3>

                  {entry.detail && (
                    <p className="mt-2 text-[15px] leading-[1.47] text-fg-muted max-w-2xl">
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
