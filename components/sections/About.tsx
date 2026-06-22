"use client";

import * as React from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const LINKS: { label: string; href: string; icon: React.ComponentType<{ className?: string }> }[] =
  [
    {
      label: "GitHub",
      href: "https://github.com/jmenzies722/shua-labs",
      icon: Github,
    },
    // TODO: replace with real LinkedIn URL
    { label: "LinkedIn", href: "#", icon: Linkedin },
    // TODO: replace with real contact email
    { label: "Email", href: "mailto:hello@shualabs.com", icon: Mail },
  ];

/**
 * About — confident bio block. Premium and spacious.
 */
export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative py-28 md:py-44 scroll-mt-24"
    >
      <div className="container grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent-hi">
            About
          </p>
          <h2
            id="about-title"
            className="mt-6 text-balance text-3xl md:text-5xl font-semibold leading-[1.05] tracking-tighter text-fg"
          >
            Josh Menzies.
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-fg-muted max-w-md">
            Platform engineer turned AI agentic architect. Based in New York.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-7">
          <div className="flex flex-col gap-6 text-lg md:text-xl leading-relaxed text-fg/85">
            <p>
              I ship developer and AI enablement tools in the open, and I help
              businesses adopt them. The work here is the proof — small, sharp
              products that make engineers and teams measurably more capable.
            </p>
            <p className="text-fg-muted">
              Everything ships under MIT. Everything is built like it&apos;s going
              to production, because it is. If something you see solves a real
              problem at your company, we should talk.
            </p>
          </div>

          <ul className="mt-12 flex flex-wrap gap-3">
            {LINKS.map((l) => {
              const Icon = l.icon;
              const external = l.href.startsWith("http");
              return (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer noopener" : undefined}
                    className="group inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.02] px-4 py-2 text-sm text-fg-muted transition-colors duration-200 hover:text-fg hover:border-line-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ring"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {l.label}
                    <ArrowUpRight className="h-3.5 w-3.5 text-fg-subtle transition-colors group-hover:text-accent-hi" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
