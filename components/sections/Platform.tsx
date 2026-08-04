import * as React from "react";
import { services } from "@/data/platform";
import { phases } from "@/data/phases";
import { platformStats } from "@/lib/platform-stats";
import { ServiceRow } from "@/components/ServiceRow";
import { SectionHeading } from "@/components/SectionHeading";
import { Collapsible } from "@/components/Collapsible";
import { Reveal } from "@/components/Reveal";

/**
 * The platform roadmap — seven services in order, folded behind a toggle.
 *
 * The summary stats stay visible outside the fold: "7 services · 0 shipped ·
 * building shua-gateway · 0/28" is the whole story at a glance. The seven
 * detailed rows, each with its own ship-gate breakdown, are the kind of
 * depth someone chooses to open, not something that should push the rest of
 * the page down by default.
 */
export function Platform() {
  const stats = platformStats();

  return (
    <section
      id="roadmap"
      aria-label="Roadmap"
      className="term-section scroll-mt-14"
    >
      <div className="container max-w-[1180px]">
        <Reveal>
          <SectionHeading
            eyebrow="roadmap"
            title={
              <>
                What&apos;s next.{" "}
                <span className="text-fg-subtle">One service at a time.</span>
              </>
            }
            lead="The AI platform engineer path: seven services, each a deployed artifact behind a visible ship gate — public repo, architecture diagram, working demo, written post. The next one does not start until the current one clears its gate; three out of four artifacts is still zero."
          />
        </Reveal>

        {/* Ledger summary — the honest headline number, always visible. */}
        <Reveal delay={0.06}>
          <dl className="mt-12 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4">
            {[
              { k: "services", v: String(stats.total) },
              { k: "shipped", v: String(stats.shipped) },
              {
                k: "open",
                v: stats.open ? stats.open.name : "none",
              },
              {
                k: "artifacts public",
                v: `${stats.artifactsDone}/${stats.artifactsTotal}`,
              },
            ].map((s) => (
              <div key={s.k} className="bg-bg px-4 py-5">
                <dt className="term-label">{s.k}</dt>
                <dd className="mt-2 truncate font-mono text-[17px] font-semibold tracking-[-0.03em] text-fg sm:text-[19px]">
                  {s.v}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <Collapsible id="roadmap-detail" label={`all ${stats.total} services`}>
            <ol className="mt-8">
              {services.map((r) => (
                <ServiceRow key={r.slug} service={r} />
              ))}
            </ol>

            {/* Phase legend */}
            <div className="mt-16 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              {phases.map((p) => (
                <div key={p.id} className="bg-bg px-4 py-5">
                  <div className="term-label mb-2">{p.id}</div>
                  <p className="text-[12.5px] leading-[1.6] text-fg-subtle">
                    {p.description}
                  </p>
                </div>
              ))}
            </div>
          </Collapsible>
        </Reveal>
      </div>
    </section>
  );
}
