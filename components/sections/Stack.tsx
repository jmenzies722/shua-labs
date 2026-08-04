import * as React from "react";
import { stackLayers } from "@/data/stack";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal, RevealGroup } from "@/components/Reveal";
import { Collapsible } from "@/components/Collapsible";
import { Topology } from "@/components/Topology";

/**
 * The stack, by layer — plus a live topology, folded behind a toggle.
 *
 * The heading and lead stay visible so scanning the page tells you this
 * section exists and roughly what it covers; the diagram and four layer
 * cards are the kind of depth someone opts into, not something everyone
 * scrolls past by default.
 */
export function Stack() {
  return (
    <section
      id="stack"
      aria-label="Stack and architecture"
      className="term-section scroll-mt-14 border-t border-line"
    >
      <div className="container max-w-[1180px]">
        <Reveal>
          <SectionHeading
            eyebrow="architecture"
            title={
              <>
                The AI platform engineering stack,{" "}
                <span className="text-fg-subtle">layer by layer.</span>
              </>
            }
            lead="Grouped by what each layer is responsible for rather than by logo. Everything listed is genuinely in use — a stack list is the cheapest thing to inflate and the easiest to catch."
          />
        </Reveal>

        <Reveal delay={0.06} className="mt-8">
          <Collapsible id="architecture-detail" label="the diagram and full stack">
            {/* Live topology of the service currently being built. */}
            <div className="mt-8">
              <div className="mb-4 flex flex-wrap items-baseline gap-x-3">
                <span className="term-label">topology</span>
                <span className="font-mono text-[12px] text-fg-muted">
                  shua-gateway — the trust boundary
                </span>
              </div>
              <Topology />
            </div>

            <RevealGroup
              className="mt-12 grid gap-px border border-line bg-line md:grid-cols-2"
              stagger={0.06}
            >
              {stackLayers.map((layer) => (
                <Reveal key={layer.id} y={16} className="h-full">
                  <div className="flex h-full flex-col bg-bg p-6 md:p-8">
                    <h3 className="font-mono text-[15px] font-semibold tracking-[-0.02em] text-fg">
                      {layer.name}
                    </h3>
                    <p className="term-prose mt-2 text-[13.5px]">{layer.role}</p>

                    <ul className="mt-6 flex flex-col gap-2.5 border-t border-line pt-5">
                      {layer.items.map((item) => (
                        <li
                          key={item.name}
                          className="flex flex-wrap items-baseline gap-x-2.5"
                        >
                          <span className="font-mono text-[13px] text-fg">
                            {item.name}
                          </span>
                          {item.note && (
                            <span className="font-mono text-[11.5px] text-fg-faint">
                              {item.note}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </RevealGroup>
          </Collapsible>
        </Reveal>
      </div>
    </section>
  );
}
