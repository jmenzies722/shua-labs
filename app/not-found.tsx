import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";

export default function NotFound() {
  return (
    <PageShell>
      <section className="section-pad flex min-h-[70svh] items-center border-b border-line">
        <div className="site-shell max-w-2xl">
          <p className="label-text mb-4">404</p>
          <h1 className="display-section mb-5">Signal lost.</h1>
          <p className="body-lg mb-10">
            That route is not in the lab map. It may have moved, or it never shipped.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="btn-primary">
              Home
            </Link>
            <Link href="/build" className="btn-secondary">
              Build log
            </Link>
            <Link href="/work" className="btn-secondary">
              Work
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
