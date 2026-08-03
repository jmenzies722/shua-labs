"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Terminal } from "@/components/Terminal";
import { platformStats } from "@/lib/platform-stats";
import { registryCounts } from "@/lib/registry";
import type { TypedLine } from "@/lib/useTypewriter";

/**
 * Hero.
 *
 * The headline states what the site is; the terminal states where the work
 * actually stands. The numbers in the boot sequence are derived from the same
 * data the platform renders, so the hero cannot drift into claiming more than the
 * ledger below it shows.
 */
export function Hero() {
  const reduced = useReducedMotion();
  const ease: [number, number, number, number] = [0.2, 0.7, 0.3, 1];

  const lines = React.useMemo<TypedLine[]>(() => {
    const s = platformStats();
    const c = registryCounts();
    return [
      { text: "shua status", prompt: true, pauseAfter: 220 },
      { text: "" },
      { text: `public        ${c.open} repos, servers and tools`, dim: true },
      { text: `agent crew    ${c.agents} agents, ${c.servers} MCP servers`, dim: true },
      {
        text: `building      ${s.open ? s.open.name : "nothing"}  (1 of ${s.total})`,
        dim: true,
      },
      {
        text: `ship gate     ${s.artifactsDone}/${s.artifactsTotal} artifacts public`,
        dim: true,
        pauseAfter: 300,
      },
      { text: "" },
      { text: "the unfinished boxes stay on the page." },
    ];
  }, []);

  return (
    <section
      id="top"
      aria-label="Hero"
      className="relative isolate flex min-h-[100svh] w-full flex-col justify-center overflow-hidden pb-20 pt-28"
    >
      <div className="container max-w-[1180px]">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          {/* Left — the claim */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: reduced ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.5, ease }}
              className="term-label"
            >
              shua labs
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: reduced ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.06, ease }}
              className="term-display mt-5 text-balance text-fg"
            >
              Infrastructure
              <br />
              for agents.
              <br />
              <span className="text-fg-subtle">In the open.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: reduced ? 0 : 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.13, ease }}
              className="term-prose mt-7 max-w-xl text-balance"
            >
              Gateways, sandboxes, controllers, and the harness work that makes
              a whole team faster with agents. I&apos;m Josh — a platform engineer in
              New York building the layer underneath AI agents, and publishing
              it as I go.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: reduced ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.17, ease }}
              className="mt-4 max-w-xl font-mono text-[13px] leading-[1.6] text-fg-subtle"
            >
              Everything here shows its real state. Shipped work is public and
              installable; unfinished work shows exactly which boxes are still
              empty.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: reduced ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.2, ease }}
              className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4"
            >
              <Link
                href="#shipped"
                className="border border-fg bg-fg px-5 py-2.5 font-mono text-[13px] font-semibold uppercase tracking-[0.1em] text-bg transition-colors duration-200 hover:bg-transparent hover:text-fg"
              >
                See the work
              </Link>
              <Link href="/registry" className="term-link font-mono text-[13px]">
                Browse the registry
                <span className="arrow" aria-hidden>
                  →
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Right — the state */}
          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : 0.24, ease }}
          >
            <Terminal lines={lines} title="shua@labs — status" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
