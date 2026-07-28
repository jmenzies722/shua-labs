import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { SiteNav } from "@/components/site/SiteNav";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { catalog } from "@/lib/catalog";

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.role}`,
  description: profile.positioning,
};

/**
 * Overview — centred and calm.
 *
 * Earlier versions were dense, left-aligned and hairline-heavy. This is the opposite on
 * purpose: one centred column, large type, and grouped cards with real corner radius. Structure
 * comes from surfaces sitting slightly above the page rather than from rules drawn between
 * things, which is what makes a page read as "clean" rather than as a document.
 *
 * Monochrome. Whitespace and weight do all the work.
 */
export default function HomePage() {
  const items = catalog();
  const shipped = projects.filter(
    (p) => p.detail.status === "Shipping" || p.detail.status === "Beta",
  );
  const building = projects.filter(
    (p) => p.detail.status === "WIP" || p.detail.status === "Planned",
  );

  return (
    <>
      <SiteNav />

      <main className="mx-auto max-w-[1120px] px-6">
        {/* Hero — centred, generous, one idea. */}
        <section className="reveal mx-auto max-w-[760px] pb-20 pt-24 text-center sm:pt-32">
          <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-fg-subtle">
            {profile.name} · {profile.location}
          </p>
          <h1 className="mt-7 text-[clamp(38px,5.6vw,64px)] font-semibold leading-[1.08] tracking-[-0.035em] text-fg">
            {profile.positioning}
          </h1>
          <p className="mx-auto mt-6 max-w-[52ch] text-[18px] leading-[1.6] text-fg-muted">
            {profile.role}. Most AI agent demos fall over the moment they meet real traffic — no
            cost ceiling, no way to see what the agent did. That gap is the work I care about.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 rounded-pill bg-fg px-6 py-3 text-[15px] font-medium text-bg transition-opacity hover:opacity-90"
            >
              See the catalog
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <a
              href={profile.links[1]?.href ?? "#"}
              className="inline-flex items-center gap-2 rounded-pill border border-line px-6 py-3 text-[15px] text-fg-body transition-colors hover:border-line-strong hover:bg-bg-panel"
            >
              Get in touch
            </a>
          </div>
        </section>

        {/* What I work on — three cards. */}
        <section className="reveal pb-20">
          <div className="grid gap-4 md:grid-cols-3">
            {profile.focus.map((area) => (
              <article
                key={area.title}
                className="rounded-2xl border border-line bg-bg-panel p-7 transition-colors hover:border-line-strong"
              >
                <h2 className="text-[18px] font-semibold tracking-[-0.02em] text-fg">
                  {area.title}
                </h2>
                <p className="mt-3 text-[15px] leading-[1.6] text-fg-muted">{area.detail}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Work. */}
        <section className="reveal pb-20">
          <div className="mb-7 text-center">
            <h2 className="text-[28px] font-semibold tracking-[-0.025em] text-fg">Work</h2>
            <p className="mt-2 text-[15px] text-fg-muted">
              Shipped things first. Nothing appears here until it&apos;s real.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {shipped.map((project) => (
              <a
                key={project.slug}
                href={project.links[0]?.href ?? "#"}
                className="group rounded-2xl border border-line bg-bg-panel p-7 transition-colors hover:border-line-strong hover:bg-bg-raised"
              >
                <div className="flex items-center gap-3">
                  <h3 className="text-[18px] font-semibold tracking-[-0.02em] text-fg">
                    {project.name}
                  </h3>
                  <span className="rounded-pill bg-bg-raised px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-fg-muted">
                    {project.detail.status}
                  </span>
                  <ArrowUpRight
                    className="ml-auto h-4 w-4 text-fg-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </div>
                <p className="mt-3 text-[15px] leading-[1.6] text-fg-muted">{project.oneLiner}</p>
              </a>
            ))}

            {building.map((project) => (
              <div
                key={project.slug}
                className="rounded-2xl border border-line border-dashed p-7"
              >
                <div className="flex items-center gap-3">
                  <h3 className="text-[18px] font-medium tracking-[-0.02em] text-fg-body">
                    {project.name}
                  </h3>
                  <span className="rounded-pill px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-fg-subtle">
                    {project.detail.status}
                  </span>
                </div>
                <p className="mt-3 text-[15px] leading-[1.6] text-fg-subtle">
                  {project.oneLiner}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Stack + contact, one calm band. */}
        <section className="reveal pb-28">
          <div className="rounded-3xl border border-line bg-bg-panel p-10 text-center">
            <h2 className="text-[13px] font-medium uppercase tracking-[0.14em] text-fg-subtle">
              Stack
            </h2>
            <ul className="mt-5 flex flex-wrap justify-center gap-2">
              {profile.stack.map((tool) => (
                <li
                  key={tool}
                  className="rounded-pill border border-line px-3.5 py-1.5 text-[13px] text-fg-muted"
                >
                  {tool}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
              {profile.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[15px] text-fg-body underline decoration-line-strong underline-offset-4 transition-colors hover:text-fg hover:decoration-fg"
                >
                  {link.display}
                </a>
              ))}
            </div>
            <p className="mt-6 text-[14px] text-fg-subtle">
              {items.length} things in the catalog — buy, use free, or hire me.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
