import { siteMeta, social } from "@/content/social";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line py-10">
      <div className="site-shell grid gap-8 md:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="text-[15px] font-semibold tracking-tight">Shua Labs</p>
          <p className="mt-1 text-[14px] text-fg-muted">Building what's next.</p>
          <p className="mt-3 text-[12px] text-fg-subtle">
            {siteMeta.location} · Est. {siteMeta.established}
          </p>
        </div>
        <nav
          className="flex flex-wrap content-start gap-x-5 gap-y-2 text-[13px] text-fg-muted"
          aria-label="Footer"
        >
          <a href="/work" className="hover:text-fg">
            Work
          </a>
          <a href="/build" className="hover:text-fg">
            Build Log
          </a>
          <a href="/research" className="hover:text-fg">
            Research
          </a>
          <a href="/about" className="hover:text-fg">
            About
          </a>
          {social.github.live && social.github.href ? (
            <a href={social.github.href} rel="noreferrer" target="_blank" className="hover:text-fg">
              GitHub
            </a>
          ) : null}
          {social.youtube.live && social.youtube.href ? (
            <a href={social.youtube.href} rel="noreferrer" target="_blank" className="hover:text-fg">
              YouTube
            </a>
          ) : (
            <span className="text-fg-subtle">YouTube (opening)</span>
          )}
          {social.instagram.live && social.instagram.href ? (
            <a href={social.instagram.href} rel="noreferrer" target="_blank" className="hover:text-fg">
              Instagram
            </a>
          ) : (
            <span className="text-fg-subtle">Instagram (opening)</span>
          )}
        </nav>
      </div>
      <div className="site-shell mt-8 text-[12px] text-fg-subtle">© {year} Shua Labs</div>
    </footer>
  );
}
