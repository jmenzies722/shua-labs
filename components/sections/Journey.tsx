"use client";

import * as React from "react";
import { journey } from "@/data/journey";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal, RevealGroup } from "@/components/Reveal";
import { formatDateStamp } from "@/lib/utils";

/**
 * The changelog. Newest first.
 *
 * Nodes are hollow squares on a hairline rule rather than filled dots — the
 * filled square is reserved for a passed gate artifact, and reusing it here
 * would imply these entries are gates. They are not; they are just history.
 */
export function Journey() {
  return (
    <section
      id="journey"
      aria-labelledby="journey-title"
      className="term-section scroll-mt-14"
    >
      <div className="container max-w-[1180px]">
        <Reveal>
          <SectionHeading
            id="journey-title"
            eyebrow="changelog"
            title={
              <>
                What actually happened,{" "}
                <span className="text-fg-subtle">including the reversals.</span>
              </>
            }
            lead="Dates come from commits, not from memory. Superseded decisions stay on the record — a changelog that edits its own past is a brochure."
          />
        </Reveal>

        <div className="relative mt-14 max-w-3xl">
          <div
            aria-hidden
            className="absolute bottom-2 left-[4px] top-2 w-px bg-line"
          />

          <RevealGroup className="flex flex-col gap-10" stagger={0.06}>
            {journey.map((entry, i) => (
              <Reveal key={entry.date + i} y={16}>
                <article className="relative pl-9">
                  <span
                    aria-hidden
                    className="absolute left-0 top-[7px] block h-[9px] w-[9px] border border-line-hi bg-bg"
                  />

                  <time
                    dateTime={entry.date}
                    className="block font-mono text-[11px] tracking-[0.12em] text-fg-faint"
                  >
                    {formatDateStamp(entry.date)}
                  </time>

                  <h3 className="mt-2 font-mono text-[17px] font-semibold leading-[1.25] tracking-[-0.03em] text-fg sm:text-[19px]">
                    {entry.title}
                  </h3>

                  {entry.detail && (
                    <p className="term-prose mt-2.5 max-w-2xl text-[15px]">
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
