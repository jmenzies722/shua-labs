import * as React from "react";
import Link from "next/link";
import { enablementPillars } from "@/data/enablement";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal, RevealGroup } from "@/components/Reveal";

/**
 * AI enablement — the "what I do for a team" section.
 *
 * Structured problem → approach → evidence rather than as capability bullets,
 * because the problem statement is what makes a reader recognise their own
 * situation. Deliberately carries no percentages: every claim here points at an
 * artifact someone can go open instead.
 */
export function Enablement() {
  return (
    <section
      id="enablement"
      aria-label="AI enablement"
      className="term-section scroll-mt-14 border-t border-line"
    >
      <div className="container max-w-[1180px]">
        <Reveal>
          <SectionHeading
            eyebrow="ai enablement"
            title={
              <>
                Making a team faster with agents,{" "}
                <span className="text-fg-subtle">at the platform layer.</span>
              </>
            }
            lead="Velocity from AI does not come from better prompts. It comes from the harness being identical for everyone, the agents being narrow enough to predict, and the spend being visible before the invoice. Three problems, and what actually fixes each."
          />
        </Reveal>

        <RevealGroup className="mt-14 flex flex-col" stagger={0.07}>
          {enablementPillars.map((p, i) => (
            <Reveal key={p.id} y={18}>
              <article className="grid gap-6 border-t border-line py-9 last:border-b lg:grid-cols-[220px_1fr] lg:gap-12">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[11px] tabular-nums text-fg-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-mono text-[16px] font-semibold leading-[1.25] tracking-[-0.02em] text-fg">
                    {p.name}
                  </h3>
                </div>

                <div className="max-w-2xl">
                  <p className="font-mono text-[12.5px] uppercase tracking-[0.14em] text-fg-faint">
                    the problem
                  </p>
                  <p className="term-prose mt-2 text-[14.5px]">{p.problem}</p>

                  <p className="mt-6 font-mono text-[12.5px] uppercase tracking-[0.14em] text-fg-faint">
                    what fixes it
                  </p>
                  <p className="term-prose mt-2 text-[14.5px] text-fg/90">
                    {p.approach}
                  </p>

                  <ul className="mt-6 flex flex-col gap-1.5">
                    {p.evidence.map((e) => (
                      <li
                        key={e.label}
                        className="flex items-baseline gap-2.5 font-mono text-[12.5px]"
                      >
                        <span aria-hidden className="text-fg-faint">
                          ▪
                        </span>
                        {e.slug ? (
                          <Link
                            href={`/registry/${e.slug}`}
                            className="term-link"
                          >
                            {e.label}
                            <span className="arrow" aria-hidden>
                              →
                            </span>
                          </Link>
                        ) : (
                          <span className="text-fg-muted">{e.label}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
