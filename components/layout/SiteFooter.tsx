import { siteMeta, social } from "@/content/social";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line py-12">
      <div className="site-shell grid gap-8 md:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="font-display text-lg font-bold">
            Shua<span className="text-signal">Labs</span>
          </p>
          <p className="mt-2 max-w-sm font-display text-xl font-bold tracking-tight text-fg-muted">
            Building what’s next.
          </p>
          <p className="mt-4 font-mono text-[11px] tracking-[0.14em] text-fg-subtle">
            {siteMeta.location.toUpperCase()} · EST. {siteMeta.established}
          </p>
        </div>
        <nav
          className="flex flex-wrap content-start gap-x-6 gap-y-3 text-[13px] text-fg-muted"
          aria-label="Footer"
        >
          <a href="/work">Work</a>
          <a href="/build">Build Log</a>
          <a href="/research">Research</a>
          <a href="/about">About</a>
          <a href={social.github.href} rel="noreferrer" target="_blank">
            GitHub
          </a>
          <span className="text-fg-subtle">
            YouTube {social.youtube.live ? "" : "(opening)"}
          </span>
          <span className="text-fg-subtle">
            Instagram {social.instagram.live ? "" : "(opening)"}
          </span>
        </nav>
      </div>
      <div className="site-shell mt-10 font-mono text-[11px] text-fg-subtle">
        © {year} Shua Labs
      </div>
    </footer>
  );
}
