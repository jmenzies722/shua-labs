import Link from "next/link";

export default function ThesisPage() {
  return (
    <main className="section-padding min-h-[100svh]">
      <div className="site-shell max-w-2xl">
        <Link href="/" className="label-text">
          ← Shua Labs
        </Link>
        <p className="label-text mt-12">Our thesis</p>
        <h1 className="display-section text-balance mt-3 mb-8">
          Build things that make the next move possible.
        </h1>
        <div className="space-y-5">
          <p className="body-text-large">
            Shua Labs believes AI should give people more agency—not obscure
            judgment behind automation. We build ventures and systems that turn
            a new technical frontier into useful, durable leverage.
          </p>
          <p className="body-text-large">
            We stay close to a real problem, make the smallest honest thing that
            can help, and keep building only when the work earns its place.
          </p>
          <p className="body-text-large">
            We are interested in ambitious collaborators, difficult systems, and
            work that compounds.
          </p>
        </div>
        <a
          className="btn-primary mt-10"
          href="mailto:jmenzies722@gmail.com"
        >
          Start a conversation
        </a>
      </div>
    </main>
  );
}
