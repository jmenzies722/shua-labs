import * as React from "react";
import { allEntries } from "@/lib/registry";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal, RevealGroup } from "@/components/Reveal";
import { TermLink } from "@/components/TermLink";

/**
 * Shipped — the things that are genuinely public right now.
 *
 * Derived from `availability === "public"` rather than a hand-kept list, so
 * this section cannot drift into showing something that was never opened. If a
 * card is here, a stranger can go get it.
 */
export function Shipped() {
  const shipped = allEntries().filter((e) => e.availability === "public");

  return (
    <section
      id="shipped"
      aria-label="Shipped work"
      className="term-section scroll-mt-14"
    >
      <div className="container max-w-[1180px]">
        <Reveal>
          <SectionHeading
            eyebrow="shipped"
            title={
              <>
                Out in the open,{" "}
                <span className="text-fg-subtle">and usable today.</span>
              </>
            }
            lead="Public source, working install commands, MIT. This list is generated from the availability flag on each entry, so nothing can appear here that is not genuinely open."
          />
        </Reveal>

        <RevealGroup
          className="mt-12 grid gap-px border border-line bg-line md:grid-cols-2 lg:grid-cols-3"
          stagger={0.07}
        >
          {shipped.map((e) => (
            <Reveal key={e.slug} y={16} className="h-full">
              <article className="group flex h-full flex-col bg-bg p-6 transition-colors duration-200 hover:bg-bg-raised">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-mono text-[16px] font-semibold tracking-[-0.02em] text-fg">
                    {e.name}
                  </h3>
                  <span className="term-chip-invert shrink-0">public</span>
                </div>

                <p className="term-prose mt-3 flex-1 text-[14px]">{e.summary}</p>

                <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[11px] text-fg-faint">
                  <span className="uppercase tracking-[0.12em]">{e.kind}</span>
                  {e.language && <span>{e.language}</span>}
                  {typeof e.toolCount === "number" && (
                    <span>{e.toolCount} tools</span>
                  )}
                </div>

                <TermLink
                  href={`/registry/${e.slug}`}
                  className="mt-5 font-mono text-[12.5px]"
                >
                  details
                </TermLink>
              </article>
            </Reveal>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
