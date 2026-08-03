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
 * About. Deliberately short — the ledger above is the argument, and a long bio
 * under an empty ledger is the exact substitution this site is designed to
 * avoid.
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
            Platform engineer moving into AI infrastructure. New York.
          </p>
        </Reveal>

        <Reveal delay={0.06} className="lg:col-span-7">
          <div className="flex flex-col gap-5">
            <p className="term-prose text-[17px] text-fg/90">
              I build infrastructure for systems where a model is load-bearing
              rather than decorative — gateways, sandboxes, controllers, and the
              measurement that tells you whether any of it is working.
            </p>
            <p className="term-prose">
              This site exists to stop me from starting an eighth thing. Every
              service on the platform has to reach four public artifacts before the
              next one begins, and the gaps stay visible here until they close.
            </p>
          </div>

          <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
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
