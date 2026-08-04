"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Terminal } from "@/components/Terminal";
import { registryCounts } from "@/lib/registry";
import { openConsole } from "@/lib/consoleBus";
import type { TypedLine } from "@/lib/useTypewriter";

/**
 * Hero.
 *
 * Only real, shipped state gets a line here — no roadmap, no "building X."
 * If it isn't public, it doesn't get a place in the first thing someone sees.
 */
export function Hero() {
  const reduced = useReducedMotion();
  const ease: [number, number, number, number] = [0.2, 0.7, 0.3, 1];

  const lines = React.useMemo<TypedLine[]>(() => {
    const c = registryCounts();
    return [
      { text: "shua status", prompt: true, pauseAfter: 200 },
      { text: "" },
      { text: `public       ${c.open} repos, servers and tools`, dim: true },
      { text: `agent crew   ${c.agents} agents, ${c.servers} MCP servers`, dim: true },
      { text: `install      /plugin install claude-max@claude-max`, dim: true },
    ];
  }, []);

  return (
    <section
      id="top"
      aria-label="Hero"
      className="relative isolate flex min-h-[100svh] w-full flex-col justify-center overflow-hidden pb-20 pt-[calc(7rem+env(safe-area-inset-top))]"
    >
      <div className="container max-w-[1180px]">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          {/* Left — the claim */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: reduced ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.45, ease }}
              className="term-label"
            >
              shua labs
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: reduced ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.05, ease }}
              className="term-display mt-5 text-balance text-fg"
            >
              AI platform
              <br />
              engineering.
              <br />
              <span className="text-fg-subtle">In the open.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: reduced ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.11, ease }}
              className="term-prose mt-7 max-w-xl text-balance"
            >
              I&apos;m Josh — a platform engineer in New York building
              developer tools and AI infrastructure. Everything below is
              public, real, and installable today.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: reduced ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.17, ease }}
              className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4"
            >
              <Link
                href="#work"
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

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.24 }}
              className="mt-6"
            >
              <button
                type="button"
                onClick={openConsole}
                className="font-mono text-[11.5px] text-fg-faint transition-colors hover:text-fg-muted"
              >
                or press <span className="text-fg-subtle">~</span> for a live console
              </button>
            </motion.div>
          </div>

          {/* Right — the state */}
          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : 0.2, ease }}
          >
            <Terminal lines={lines} title="shua@labs — status" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
