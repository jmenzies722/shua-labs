"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { offers } from "@/data/offers";
import { OfferCard } from "@/components/OfferCard";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal, RevealGroup } from "@/components/Reveal";
import { Button } from "@/components/ui/button";

/**
 * Consulting section — value ladder, three offers (no fourth).
 * Restyled to the premium dark look; copy and pricing preserved exactly.
 */
export function Consulting() {
  return (
    <section
      id="consulting"
      aria-labelledby="consulting-title"
      className="relative py-28 md:py-44 scroll-mt-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-1/2 top-32 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(10,132,255,0.08),transparent_70%)] blur-3xl" />
      </div>

      <div className="container">
        <Reveal>
          <SectionHeading
            id="consulting-title"
            eyebrow="Work with me"
            title={
              <>
                The work is open.{" "}
                <span className="text-fg-muted">The expertise is for hire.</span>
              </>
            }
            lead="Three ways to put the work to use inside your business — audit, build, or stay embedded."
          />
        </Reveal>

        <RevealGroup
          className="mt-16 md:mt-20 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-7 items-stretch"
          stagger={0.08}
        >
          {offers.map((offer) => (
            <Reveal key={offer.id} y={20}>
              <OfferCard offer={offer} />
            </Reveal>
          ))}
        </RevealGroup>

        <Reveal delay={0.1} className="mt-10 text-center">
          <p className="text-sm text-fg-muted">
            Production-grade by default — every build ships with observability,
            cost controls, and fallbacks.
          </p>
        </Reveal>

        <Reveal delay={0.18} className="mt-12 flex justify-center">
          {/* TODO: replace href with Calendly / contact link */}
          <Link href="#contact">
            <Button size="lg" variant="primary">
              Book a call
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
