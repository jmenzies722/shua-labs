/**
 * The shared page opening.
 *
 * Every tab starts identically: eyebrow, title, one description line, then an optional row of
 * counts. That consistency is the point — a visitor moving between Catalog, Registry, and
 * Dashboard should never have to relearn where they are, and each page having its own bespoke
 * masthead is exactly how a site starts feeling assembled rather than designed.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  stats,
}: {
  eyebrow: string;
  title: string;
  description: string;
  stats?: { value: string | number; label: string }[];
}) {
  return (
    <header className="reveal mx-auto max-w-[760px] pb-14 pt-20 text-center sm:pt-24">
      <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-fg-subtle">
        {eyebrow}
      </p>
      <h1 className="mt-6 text-[clamp(34px,4.6vw,52px)] font-semibold leading-[1.08] tracking-[-0.03em] text-fg">
        {title}
      </h1>
      <p className="mx-auto mt-5 max-w-[56ch] text-[17px] leading-[1.6] text-fg-muted">
        {description}
      </p>

      {stats && stats.length > 0 ? (
        <dl className="mt-10 flex flex-wrap justify-center gap-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="min-w-[132px] rounded-2xl border border-line bg-bg-panel px-6 py-4"
            >
              <dd className="text-[24px] font-semibold tabular-nums tracking-[-0.02em] text-fg">
                {stat.value}
              </dd>
              <dt className="mt-1 text-[13px] text-fg-subtle">{stat.label}</dt>
            </div>
          ))}
        </dl>
      ) : null}
    </header>
  );
}

/** Section heading used down the body of every tab. Same rhythm everywhere. */
export function SectionHead({
  title,
  note,
}: {
  title: string;
  note?: string;
}) {
  return (
    <div className="mb-7 text-center">
      <h2 className="text-[26px] font-semibold tracking-[-0.025em] text-fg">{title}</h2>
      {note ? <p className="mt-2 text-[15px] text-fg-muted">{note}</p> : null}
    </div>
  );
}
