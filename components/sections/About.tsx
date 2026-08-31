"use client";

import * as React from "react";
import { Reveal } from "@/components/Reveal";
import { TermLink } from "@/components/TermLink";

const LINKS: { label: string; href: string; external: boolean }[] = [
  { label: "github", href: "https://github.com/jmenzies722", external: true },
  {
    label: "linkedin",
    href: "https://www.linkedin.com/in/josh-m01/",
    external: true,
  },
  { label: "email", href: "mailto:jmenzies722@gmail.com", external: false },
];

/**
 * What "AI platform engineering" means here, condensed to one clause each.
 * This replaced a full problem/approach/evidence section per pillar — three
 * short lines say the same thing a hiring manager scans for in five seconds
 * instead of three paragraphs they have to read to find it.
 */
const FOCUS: { label: string; detail: string }[] = [
  {
    label: "Developer experience",
    detail: "one harness config synced across every tool, drift checked rather than trusted.",
  },
  {
    label: "Platform governance",
    detail: "narrow agents with declared tools and handoffs; verifiers hold no write access.",
  },
  {
    label: "Cost & reliability",
    detail: "a trust-boundary gateway, budgets that can refuse a request, and IAM checked before apply.",
  },
];

/**
 * About. Moved up to sit right after the shipped work — a hiring manager
 * wants "who is this" early, not after scrolling past the roadmap.
 */
export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="term-section scroll-mt-14"
    >
      <div className="container grid max-w-[1180px] grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <div className="flex items-center gap-4">
            <span className="term-label">who</span>
            <span aria-hidden className="h-px flex-1 bg-line" />
          </div>
          <h2
            id="about-title"
            className="term-title mt-5 text-balance text-fg"
          >
            Josh Menzies
          </h2>
          <p className="mt-4 max-w-md font-mono text-[13px] text-fg-subtle">
            AI platform engineer. New York.
          </p>
        </Reveal>

        <Reveal delay={0.06} className="lg:col-span-7">
          <p className="term-prose text-[17px] text-fg/90">
            I build the platform and developer-experience layer underneath
            AI-assisted engineering teams — the harness every engineer shares,
            the gateway their agents run through, and the evals and
            observability that turn &quot;the agent helped&quot; into something you can
            actually measure.
          </p>

          <dl className="mt-10 flex flex-col gap-4 border-t border-line pt-8">
            {FOCUS.map((f) => (
              <div key={f.label} className="flex flex-wrap gap-x-2.5 gap-y-1">
                <dt className="font-mono text-[13px] font-semibold text-fg">
                  {f.label}
                </dt>
                <dd className="text-[13.5px] text-fg-muted">— {f.detail}</dd>
              </div>
            ))}
          </dl>

          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            {LINKS.map((l) => (
              <li key={l.label}>
                <TermLink
                  href={l.href}
                  external={l.external}
                  className="font-mono text-[13px]"
                >
                  {l.label}
                </TermLink>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
