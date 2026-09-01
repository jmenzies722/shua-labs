import { siteMeta, social } from "@/content/social";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line py-12">
      <div className="site-shell grid gap-10 md:grid-cols-[1.3fr_1fr]">
        <div>
          <p className="font-display text-[17px] font-semibold tracking-tight">Shua Labs</p>
          <p className="mt-1.5 text-[14px] text-fg-muted">Building what’s next.</p>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-wider text-fg-subtle">
            {siteMeta.location} · Est. {siteMeta.established}
          </p>
        </div>
        <nav
          className="flex flex-wrap content-start gap-x-6 gap-y-2.5 text-[13px] text-fg-muted"
          aria-label="Footer"
        >
          <a href="/work" className="transition-colors duration-300 hover:text-fg">
            Work
          </a>
          <a href="/build" className="transition-colors duration-300 hover:text-fg">
            Build Log
          </a>
          <a href="/research" className="transition-colors duration-300 hover:text-fg">
            Research
          </a>
          <a href="/about" className="transition-colors duration-300 hover:text-fg">
            About
          </a>
          {social.github.live && social.github.href ? (
            <a
              href={social.github.href}
              rel="noreferrer"
              target="_blank"
              className="transition-colors duration-300 hover:text-fg"
            >
              GitHub
            </a>
          ) : null}
          {social.instagram.live && social.instagram.href ? (
            <a
              href={social.instagram.href}
              rel="noreferrer"
              target="_blank"
              className="transition-colors duration-300 hover:text-fg"
            >
              Instagram
            </a>
          ) : (
            <span className="text-fg-subtle">Instagram (opening)</span>
          )}
          {social.youtube.live && social.youtube.href ? (
            <a
              href={social.youtube.href}
              rel="noreferrer"
              target="_blank"
              className="transition-colors duration-300 hover:text-fg"
            >
              YouTube
            </a>
          ) : (
            <span className="text-fg-subtle">YouTube (later)</span>
          )}
        </nav>
      </div>
      <div className="site-shell mt-10 font-mono text-[11px] uppercase tracking-wider text-fg-subtle">
        © {year} Shua Labs
      </div>
    </footer>
  );
}
