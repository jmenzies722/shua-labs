"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ShipGateMeter, ShipGateDetail } from "@/components/ShipGate";
import { CodeBlock } from "@/components/CodeBlock";
import { cn } from "@/lib/utils";
import type { PlatformService, ServiceStatus } from "@/lib/types";

const STATUS_TEXT: Record<ServiceStatus, string> = {
  shipped: "shipped",
  building: "building",
  queued: "queued",
  parked: "parked",
};

/**
 * One platform service, expandable in place.
 *
 * An accordion rather than a modal: the platform is a list you read top to
 * bottom, and a dialog would break that reading by hiding the services on either
 * side of the one you opened.
 */
export function ServiceRow({ service }: { service: PlatformService }) {
  const [open, setOpen] = React.useState(false);
  const reduced = useReducedMotion();
  const panelId = `service-${service.slug}-panel`;

  return (
    <li className="border-t border-line last:border-b">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="group flex w-full flex-col gap-3 px-1 py-6 text-left transition-colors duration-200 hover:bg-white/[0.02] sm:px-3"
      >
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <span className="font-mono text-[11px] tabular-nums text-fg-faint">
            {String(service.n).padStart(2, "0")}
          </span>

          <h3 className="font-mono text-[19px] font-semibold tracking-[-0.03em] text-fg sm:text-[22px]">
            {service.name}
          </h3>

          <span
            className={cn(
              service.status === "building" ? "term-chip-invert" : "term-chip"
            )}
          >
            {STATUS_TEXT[service.status]}
          </span>

          <span className="ml-auto hidden sm:block">
            <ShipGateMeter gate={service.gate} />
          </span>
        </div>

        <p className="max-w-2xl pl-0 text-[14px] leading-[1.6] text-fg-muted sm:pl-[38px]">
          {service.oneLiner}
        </p>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 sm:pl-[38px]">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-faint">
            {service.phase}
          </span>
          <span className="text-fg-faint" aria-hidden>
            ·
          </span>
          <span className="font-mono text-[11px] text-fg-faint">
            {service.tags.join("  ")}
          </span>
          <span className="ml-auto font-mono text-[11px] text-fg-subtle transition-colors group-hover:text-fg">
            {open ? "[ − close ]" : "[ + open ]"}
          </span>
        </div>

        <div className="sm:hidden">
          <ShipGateMeter gate={service.gate} />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduced ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.28, ease: [0.2, 0.7, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="grid gap-10 px-1 pb-10 pt-2 sm:grid-cols-[1fr_auto] sm:gap-14 sm:px-3 sm:pl-[41px]">
              <div className="min-w-0 max-w-2xl">
                {service.description.split("\n\n").map((para, i) => (
                  <p key={i} className="term-prose mb-4 last:mb-0">
                    {para}
                  </p>
                ))}

                <dl className="mt-8 flex flex-col gap-5 border-t border-line pt-6">
                  <div>
                    <dt className="term-label mb-1.5">teaches</dt>
                    <dd className="text-[13.5px] leading-[1.6] text-fg">
                      {service.teaches}
                    </dd>
                  </div>
                  <div>
                    <dt className="term-label mb-1.5">why here</dt>
                    <dd className="text-[13.5px] leading-[1.6] text-fg-muted">
                      {service.whyHere}
                    </dd>
                  </div>
                  <div>
                    <dt className="term-label mb-1.5">moves</dt>
                    <dd className="flex flex-wrap gap-1.5">
                      {service.moves.map((m) => (
                        <span key={m} className="term-chip normal-case tracking-normal">
                          {m}
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>

                {service.snippet && (
                  <CodeBlock
                    className="mt-8"
                    code={service.snippet.code}
                    language={service.snippet.language}
                    caption={service.snippet.caption}
                  />
                )}
              </div>

              <div className="sm:w-[300px] sm:shrink-0">
                <div className="term-label mb-4">ship gate</div>
                <ShipGateDetail gate={service.gate} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
