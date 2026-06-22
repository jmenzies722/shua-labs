"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AppleLink } from "@/components/AppleLink";

/**
 * Apple-fidelity hero.
 *
 * - Centered, calm, vast vertical room.
 * - Eyebrow + huge SF semibold headline + gray sub + a primary pill and a
 *   chevron text-link as the secondary action.
 * - Very faint background gradient — toned down from v2's neon glow.
 * - Respects prefers-reduced-motion.
 */
export function Hero() {
  const reduced = useReducedMotion();
  const ease: [number, number, number, number] = [0.28, 0.11, 0.32, 1];

  return (
    <section
      id="top"
      aria-label="Hero"
      className="relative isolate flex min-h-[100svh] w-full flex-col justify-center overflow-hidden pt-24 pb-20"
    >
      {/* Background: faint, tasteful gradient. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(41,151,255,0.06),transparent_60%)]" />
      </div>

      <div className="container relative max-w-[1100px] text-center">
        <motion.p
          initial={{ opacity: 0, y: reduced ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.9, ease }}
          className="apple-eyebrow text-accent"
        >
          Shua Labs
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: reduced ? 0 : 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduced ? 0 : 0.95,
            delay: reduced ? 0 : 0.08,
            ease,
          }}
          className="apple-headline mt-5 text-balance text-fg"
        >
          Build. <span className="text-fg-muted">In the open.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: reduced ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduced ? 0 : 0.95,
            delay: reduced ? 0 : 0.16,
            ease,
          }}
          className="apple-sub mt-6 mx-auto max-w-3xl text-balance"
        >
          Open-source products and tools for developer and AI enablement — and
          the expertise to put them to work.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduced ? 0 : 0.95,
            delay: reduced ? 0 : 0.24,
            ease,
          }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-4"
        >
          <Link href="#work">
            <Button size="lg" variant="primary">
              Explore the work
            </Button>
          </Link>
          <AppleLink
            href="https://github.com/jmenzies722/shua-labs"
            external
          >
            View on GitHub
          </AppleLink>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduced ? 0 : 0.9, delay: reduced ? 0 : 0.4 }}
          className="mt-20 font-mono text-[12px] tracking-[0.05em] text-fg-subtle"
        >
          Open source &nbsp;·&nbsp; Developer &amp; AI enablement &nbsp;·&nbsp; MIT
        </motion.p>
      </div>
    </section>
  );
}
