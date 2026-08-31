import type { Metadata } from "next";
import Image from "next/image";
import { PageShell } from "@/components/layout/PageShell";
import { FollowTheBuild } from "@/components/sections/FollowTheBuild";
import { siteMeta } from "@/content/social";

export const metadata: Metadata = {
  title: "About",
  description:
    "Shua Labs is an independent AI lab building AI-native software, developer systems, and new ventures in public.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <PageShell>
      <section className="section-pad border-b border-line">
        <div className="site-shell max-w-3xl">
          <p className="label-text mb-4">About</p>
          <h1 className="display-section mb-6">An independent AI lab.</h1>
          <p className="body-lg mb-8">
            Shua Labs focuses on AI-native software, developer systems, and new ventures. It is not a
            single SaaS product — it is the umbrella under which we research, build, ship, and learn.
          </p>
          <div className="space-y-5 text-[15px] leading-relaxed text-fg-muted">
            <p>
              The company builds in public so people can follow the entire process: idea, research,
              architecture, engineering, launch, iteration.
            </p>
            <p>
              Social platforms distribute the work. GitHub proves the engineering. This website
              organizes the company, its ideas, projects, research, and evolution.
            </p>
            <p className="font-mono text-[12px] tracking-[0.12em] text-fg-subtle">
              {siteMeta.location.toUpperCase()} · EST. {siteMeta.established}
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad border-b border-line" aria-labelledby="founder-title">
        <div className="site-shell grid items-start gap-10 md:grid-cols-[200px_1fr]">
          <div className="relative aspect-[4/5] w-full max-w-[200px] overflow-hidden border border-line bg-bg-panel">
            <Image
              src={siteMeta.founder.photo}
              alt={siteMeta.founder.name}
              fill
              className="object-cover"
              sizes="200px"
            />
          </div>
          <div>
            <p className="label-text mb-3">Founder</p>
            <h2 id="founder-title" className="font-display text-3xl font-bold tracking-tight">
              {siteMeta.founder.name}
            </h2>
            <p className="mt-1 text-[13px] text-fg-subtle">{siteMeta.founder.role}</p>
            <p className="mt-5 max-w-xl text-[15px] text-fg-muted">{siteMeta.founder.blurb}</p>
            <p className="mt-6 text-[13px] text-fg-subtle">
              The company is the brand. The founder ships the process.
            </p>
          </div>
        </div>
      </section>

      <FollowTheBuild />
    </PageShell>
  );
}
