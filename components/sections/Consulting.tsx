"use client";

import * as React from "react";
import Link from "next/link";
import { offers } from "@/data/offers";
import { OfferCard } from "@/components/OfferCard";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal, RevealGroup } from "@/components/Reveal";
import { Button } from "@/components/ui/button";

/**
 * Consulting section — three Apple pricing tiles, value ladder (no fourth).
 * Pricing and copy preserved exactly. Neon background glow toned down.
 */
export function Consulting() {
  return (
    <section
      id="consulting"
      aria-labelledby="consulting-title"
      className="relative apple-section scroll-mt-16"
    >
      <div className="container max-w-[1100px]">
        <Reveal>
          <SectionHeading
            id="consulting-title"
            eyebrow="Work with me"
            title={
              <>
                The work is open.{" "}
                <span className="text-fg-muted">
                  The expertise is for hire.
                </span>
              </>
            }
            lead="Three ways to put the work to use inside your business — audit, build, or stay embedded."
          />
        </Reveal>

        <RevealGroup
          className="mt-16 md:mt-20 grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch"
          stagger={0.1}
        >
          {offers.map((offer) => (
            <Reveal key={offer.id} y={28}>
              <OfferCard offer={offer} />
            </Reveal>
          ))}
        </RevealGroup>

        <Reveal delay={0.1} className="mt-12 text-center">
          <p className="text-[15px] text-fg-muted leading-[1.47]">
            Production-grade by default — every build ships with observability,
            cost controls, and fallbacks.
          </p>
        </Reveal>

        <Reveal delay={0.18} className="mt-10 flex justify-center">
          {/* TODO: replace href with Calendly / contact link. */}
          <Link href="#contact">
            <Button size="lg" variant="primary">
              Book a call
            </Button>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
