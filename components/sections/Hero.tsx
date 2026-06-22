"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Github, ChevronDown } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";

/**
 * Cinematic hero: rich black background, slow living radial glow behind
 * the headline, large tight display type, two CTAs, quiet signal line.
 */
export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section
      id="top"
      aria-label="Hero"
      className="relative isolate flex min-h-[100svh] w-full flex-col justify-center overflow-hidden pt-28 pb-24"
    >
      {/* Background: layered radial glows + faint top vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(10,132,255,0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(10,132,255,0.05),transparent_60%)]" />
        <motion.div
          initial={{ opacity: 0.55, scale: 1 }}
          animate={
            reduced
              ? { opacity: 0.55, scale: 1 }
              : { opacity: [0.55, 0.85, 0.55], scale: [1, 1.04, 1] }
          }
          transition={
            reduced
              ? { duration: 0 }
              : { duration: 12, ease: "easeInOut", repeat: Infinity }
          }
          className="absolute left-1/2 top-[42%] h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(10,132,255,0.28),transparent_70%)] blur-2xl"
        />
        {/* very faint grid noise via dotted radial */}
        <div className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:28px_28px] opacity-40" />
      </div>

      <div className="container relative">
        <motion.p
          initial={{ opacity: 0, y: reduced ? 0 : 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent-hi"
        >
          Shua Labs
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: reduced ? 0 : 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduced ? 0 : 0.7,
            delay: reduced ? 0 : 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mt-6 text-balance text-[clamp(2.75rem,8vw,6rem)] font-semibold leading-[1.02] tracking-tightest text-fg"
        >
          Build.{" "}
          <span className="text-fg-muted">In the open.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: reduced ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduced ? 0 : 0.7,
            delay: reduced ? 0 : 0.16,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mt-7 max-w-2xl text-balance text-lg md:text-xl text-fg-muted leading-relaxed"
        >
          Open-source products and tools for developer and AI enablement — and
          the expertise to put them to work.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduced ? 0 : 0.7,
            delay: reduced ? 0 : 0.24,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <Link href="#work">
            <Button size="lg" variant="primary">
              Explore the work
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </Link>
          <Link
            href="https://github.com/jmenzies722/shua-labs"
            target="_blank"
            rel="noreferrer noopener"
          >
            <Button size="lg" variant="outline">
              <Github className="h-4 w-4" aria-hidden="true" />
              GitHub
            </Button>
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: reduced ? 0 : 0.8,
            delay: reduced ? 0 : 0.4,
          }}
          className="mt-16 font-mono text-[11px] tracking-[0.18em] uppercase text-fg-subtle"
        >
          Open source · Developer &amp; AI enablement · MIT
        </motion.p>
      </div>

      {/* Scroll cue */}
      <div className="container relative mt-auto pt-16">
        <Link
          href="#principles"
          aria-label="Scroll to principles"
          className="inline-flex items-center gap-2 text-xs text-fg-subtle transition-colors duration-200 hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ring rounded-md"
        >
          <span className="font-mono tracking-[0.18em] uppercase">Scroll</span>
          <ChevronDown className="h-3.5 w-3.5 animate-bounce" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
