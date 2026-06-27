"use client";

import * as React from "react";
import { Reveal } from "@/components/Reveal";
import { AppleLink } from "@/components/AppleLink";

/**
 * About — Apple-quiet bio block. SF type at calm sizes, chevron links
 * for the contact surface (GitHub, LinkedIn, email).
 */
const LINKS: { label: string; href: string; external: boolean }[] = [
  {
    label: "GitHub",
    href: "https://github.com/jmenzies722/shua-labs",
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/josh-m01/",
    external: true,
  },
  { label: "Email", href: "mailto:jmenzies722@gmail.com", external: false },
];

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative apple-section scroll-mt-16"
    >
      <div className="container max-w-[1100px] grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <p className="apple-eyebrow text-accent">About</p>
          <h2
            id="about-title"
            className="apple-section-title mt-5 text-balance text-fg"
          >
            Josh Menzies.
          </h2>
          <p className="mt-5 text-[17px] leading-[1.47] text-fg-muted max-w-md">
            Platform engineer turned AI agentic architect. Based in New York.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-7">
          <div className="flex flex-col gap-6 text-[19px] md:text-[21px] leading-[1.47] text-fg/90">
            <p>
              I ship developer and AI enablement tools in the open, and I help
              businesses adopt them. The work here is the proof — small, sharp
              products that make engineers and teams measurably more capable.
            </p>
            <p className="text-fg-muted">
              Everything ships under MIT. Everything is built like it&apos;s
              going to production, because it is. If something you see solves a
              real problem at your company, we should talk.
            </p>
          </div>

          <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
            {LINKS.map((l) => (
              <li key={l.label}>
                <AppleLink href={l.href} external={l.external}>
                  {l.label}
                </AppleLink>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
