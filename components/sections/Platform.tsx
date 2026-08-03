import * as React from "react";
import { services } from "@/data/platform";
import { phases } from "@/data/phases";
import { platformStats } from "@/lib/platform-stats";
import { ServiceRow } from "@/components/ServiceRow";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";

/**
 * The platform — seven services in order.
 *
 * Rendered as a flat ordered list rather than grouped by phase, because the
 * order IS the content: service N+1 does not start until service N passes its gate.
 * Grouping by phase would imply you could pick one, which is the exact habit
 * the charter exists to prevent. Phase is shown per row instead.
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
                <span className="text-fg-subtle">Seven services, one at a time.</span>
              </>
            }
            lead="Each service is a deployed artifact that teaches one named concept, and each carries a visible ship gate: public repo, architecture diagram, working demo, written post. Open any row to see what's done and what is honestly still missing."
          />
        </Reveal>

        {/* Ledger summary — the honest headline number. */}
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

        <Reveal delay={0.1}>
          <ol className="mt-14">
            {services.map((r) => (
              <ServiceRow key={r.slug} service={r} />
            ))}
          </ol>
        </Reveal>

        {/* Phase legend */}
        <Reveal delay={0.12}>
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
        </Reveal>
      </div>
    </section>
  );
}
