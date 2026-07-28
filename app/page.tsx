import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { AmbientLight } from "@/components/site/AmbientLight";
import { TopNav } from "@/components/site/TopNav";
import { Reveal } from "@/components/Reveal";
import { Tag } from "@/components/hub/Tag";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { catalog } from "@/lib/catalog";

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.role}`,
  description: profile.positioning,
};

/**
 * The overview — the page an employer reads.
 *
 * Rhythm is the design here. A page where every section is one column at one width reads as
 * assembled rather than composed, so this alternates deliberately:
 *
 *   kinetic statement → narrow prose → two-column focus → evidence → CTA
 *
 * The motion budget is spent almost entirely on the headline. One deliberate moment at the top
 * is what lets everything below stay calm and still feel alive — an ambient light drifting
 * behind the whole page does the rest.
 */
export default function HomePage() {
  const items = catalog();
  const shipped = projects.filter(
    (p) => p.detail.status === "Shipping" || p.detail.status === "Beta",
  );
  const building = projects.filter((p) => p.detail.status === "WIP");

  return (
    <>
      <AmbientLight />
      <TopNav />
      <main className="relative z-10">
        {/* ── Statement ─────────────────────────────────────────────── */}
        <section className="mx-auto max-w-[940px] px-[clamp(24px,4vw,52px)] pb-[clamp(40px,6vw,64px)] pt-[clamp(52px,8vw,104px)]">
          <Reveal delay={0.05}>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-fg-subtle">
              {profile.name} · {profile.role} · {profile.location}
            </p>
            {/*
              Plain h1 on purpose. The gradient is painted on THIS element and clipped to its
              text; splitting the line into per-word spans (as a kinetic reveal must) leaves
              those children with an inherited transparent fill and no background of their own,
              so the words render invisible. Gradient text and per-word masking are mutually
              exclusive — the gradient is the system's one brand signal, so it wins.
              Motion comes from the surrounding Reveal.
            */}
            <h1 className="grad-brand-text mt-7 max-w-[19ch] text-balance font-display text-[clamp(40px,6.6vw,78px)] font-semibold leading-[1.01] tracking-[-0.04em]">
              I build the platforms AI agents actually run on.
            </h1>
            <p className="mt-7 max-w-[46ch] text-[18px] leading-[1.6] text-fg-muted">
              And I show my work — the reasoning as well as the code. If a design has a limit,
              the write-up says where it breaks.
            </p>
            {profile.openTo ? (
              <p className="mt-6">
                <Tag color="green">{profile.openTo}</Tag>
              </p>
            ) : null}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
              {profile.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="group inline-flex items-center gap-1.5 text-[15px] text-accent transition-colors hover:text-accent-hi"
                >
                  {link.display}
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                </a>
              ))}
            </div>
          </Reveal>
        </section>


        {/* ── Prose — narrow measure, deliberately ──────────────────── */}
        <section className="mx-auto max-w-[940px] px-[clamp(24px,4vw,52px)] pb-[clamp(48px,7vw,80px)]">
          <Reveal>
            <div className="flex max-w-[62ch] flex-col gap-5">
              {profile.about.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="text-[17px] leading-[1.7] text-fg-body">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ── Focus — two-column, wide again ────────────────────────── */}
        <section className="border-t border-line">
          <div className="mx-auto max-w-[940px] px-[clamp(24px,4vw,52px)] py-[clamp(48px,7vw,80px)]">
            <Reveal>
              <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-fg-subtle">
                What I work on
              </h2>
              <dl className="mt-8 flex flex-col divide-y divide-line border-y border-line">
                {profile.focus.map((area) => (
                  <div
                    key={area.title}
                    className="group flex flex-col gap-2 py-6 transition-all duration-300 md:flex-row md:gap-12 hover:pl-2"
                  >
                    <dt className="w-[240px] shrink-0 font-display text-[21px] font-semibold leading-tight tracking-[-0.02em] text-fg transition-colors duration-300 group-hover:text-accent-hi">
                      {area.title}
                    </dt>
                    <dd className="max-w-[54ch] text-[16px] leading-[1.65] text-fg-muted">
                      {area.detail}
                    </dd>
                  </div>
                ))}
              </dl>
              <ul className="mt-8 flex flex-wrap gap-1.5">
                {profile.stack.map((tool) => (
                  <li key={tool}>
                    <Tag color="gray">{tool}</Tag>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* ── Evidence ──────────────────────────────────────────────── */}
        <section className="border-t border-line bg-bg-deep">
          <div className="mx-auto max-w-[940px] px-[clamp(24px,4vw,52px)] py-[clamp(48px,7vw,80px)]">
            <Reveal>
              <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-fg-subtle">
                Selected work
              </h2>

              {shipped.length > 0 ? (
                <ul className="mt-8 divide-y divide-line border-y border-line">
                  {shipped.map((project) => (
                    <li key={project.slug} className="py-6">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
                        <h3 className="font-display text-[22px] font-semibold leading-tight tracking-[-0.02em] text-fg">
                          {project.name}
                        </h3>
                        <Tag color="green">{project.detail.status}</Tag>
                        {project.links[0] ? (
                          <a
                            href={project.links[0].href}
                            className="group ml-auto inline-flex items-center gap-1 text-[14px] text-accent"
                          >
                            {project.links[0].label}
                            <ArrowUpRight
                              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                              aria-hidden
                            />
                          </a>
                        ) : null}
                      </div>
                      <p className="mt-2 max-w-[62ch] text-[16px] leading-[1.65] text-fg-muted">
                        {project.oneLiner}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-6 max-w-[62ch] text-[16px] leading-[1.65] text-fg-muted">
                  Nothing marked as shipped yet. Projects appear here automatically once their
                  status is <span className="text-fg">Shipping</span> or{" "}
                  <span className="text-fg">Beta</span> — the same honesty rule the catalog uses,
                  so this list can never claim something that isn&apos;t real.
                </p>
              )}

              {building.length > 0 ? (
                <div className="mt-10">
                  <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-fg-subtle">
                    In progress
                  </p>
                  <ul className="mt-4 flex flex-col gap-2">
                    {building.map((project) => (
                      <li key={project.slug} className="flex flex-wrap items-baseline gap-x-3">
                        <span className="text-[16px] text-fg">{project.name}</span>
                        <span className="max-w-[52ch] text-[15px] text-fg-subtle">
                          {project.oneLiner}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </Reveal>
          </div>
        </section>

        {/* ── Close ─────────────────────────────────────────────────── */}
        <section className="border-t border-line">
          <div className="mx-auto max-w-[940px] px-[clamp(24px,4vw,52px)] pb-[clamp(48px,7vw,80px)]">
            <Reveal>
              <Link
                href="/catalog"
                className="group flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8 transition-colors hover:border-line-strong"
              >
                <span>
                  <span className="block font-display text-[clamp(1.75rem,3.4vw,2.5rem)] font-bold leading-[1.1] tracking-[-0.03em] text-fg">
                    See the catalog
                  </span>
                  <span className="mt-3 block text-[16px] text-fg-muted">
                    {items.length} things you can buy, use free, or hire me for
                  </span>
                </span>
                <ArrowRight
                  className="h-7 w-7 shrink-0 text-fg-subtle transition-transform group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
    </>
  );
}
