import { site, social } from "@/data/site";

export function FooterSite() {
  return (
    <footer className="border-t border-line py-10">
      <div className="site-shell flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-lg font-bold">
            Shua<span className="text-fg-muted">Labs</span>
          </p>
          <p className="mt-2 max-w-sm text-[13px] text-fg-subtle">
            Building in the open. No invented traction. {site.founder.location}.
          </p>
        </div>
        <nav className="flex flex-wrap gap-5 text-[13px] text-fg-muted" aria-label="Footer">
          <a href="/watch">Watch</a>
          <a href="/lab">Lab</a>
          <a href="/registry">Registry</a>
          <a href={social.github.href} rel="noreferrer" target="_blank">GitHub</a>
          <a href={`mailto:${site.founder.email}`}>Email</a>
        </nav>
      </div>
    </footer>
  );
}
