"use client";

import * as React from "react";
import { journey } from "@/data/journey";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal, RevealGroup } from "@/components/Reveal";
import { Collapsible } from "@/components/Collapsible";
import { formatDateStamp } from "@/lib/utils";

/**
 * The changelog. Newest first, folded behind a toggle with the latest entry
 * always visible as a preview — enough to show the site is actively worked
 * on without asking a first-time visitor to read seven dated entries.
 */
export function Journey() {
  const latest = journey[0];

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

        {latest && (
          <Reveal delay={0.06}>
            <div className="mt-10 flex flex-wrap items-baseline gap-x-3 border-l-2 border-line-hi py-1 pl-4">
              <time
                dateTime={latest.date}
                className="font-mono text-[11px] tracking-[0.12em] text-fg-faint"
              >
                {formatDateStamp(latest.date)}
              </time>
              <span className="font-mono text-[13px] font-semibold text-fg">
                {latest.title}
              </span>
            </div>
          </Reveal>
        )}

        <Reveal delay={0.1} className="mt-8">
          <Collapsible id="journey-detail" label={`${journey.length} entries`}>
            <div className="relative mt-8 max-w-3xl">
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
          </Collapsible>
        </Reveal>
      </div>
    </section>
  );
}
