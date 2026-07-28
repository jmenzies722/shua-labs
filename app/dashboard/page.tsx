import type { Metadata } from "next";

import { BarChart3 } from "lucide-react";

import { PageIcon } from "@/components/hub/PageIcon";
import { Pipeline } from "@/components/hub/Pipeline";
import { Sidebar } from "@/components/hub/Sidebar";
import { offers } from "@/data/offers";
import { products } from "@/data/products";
import { revenue } from "@/data/revenue";
import {
  STREAMS,
  STREAM_LABELS,
  activeStreams,
  concentration,
  earningStreak,
  formatMonth,
  formatPercent,
  formatUSD,
  momGrowth,
  monthlyTotals,
  total,
  totalsByStream,
  recurringShare,
} from "@/lib/revenue";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

/**
 * Private. Gated by middleware.ts, noindex, linked from nowhere.
 *
 * Shows the four things that change behaviour: is it growing, where is it coming from, how
 * exposed am I if the biggest source stops, and how much of it recurs. Deliberately not a
 * vanity total.
 */
export default function DashboardPage() {
  const months = monthlyTotals(revenue);
  const allTime = total(revenue);
  const byStream = totalsByStream(revenue);
  const growth = momGrowth(revenue);
  const concentrationRatio = concentration(revenue);
  const recurring = recurringShare(revenue);
  const latest = months.at(-1);
  const peak = months.reduce((max, m) => Math.max(max, m.total), 0);

  const liveProducts = products.filter((p) => p.status === "live").length;
  const inPipeline = products.filter(
    (p) => p.status !== "live" && p.status !== "retired",
  ).length;

  return (
    <>
    <Sidebar />
    <div className="lg:pl-[240px]">
    <main className="mx-auto max-w-[900px] px-6 pb-32 pt-16 lg:px-16">
      <header className="border-b border-line pb-6">
        <PageIcon icon={BarChart3} label="Dashboard" />
        <h1 className="mt-5 text-[40px] font-bold leading-[1.15] tracking-[-0.025em] text-fg">
          Dashboard
        </h1>
        <p className="mt-2 text-[13px] text-fg-subtle">Private · side income only</p>
        <p className="max-w-[26rem] text-[13px] leading-snug text-fg-subtle">
          Salary is not tracked here. Mixing a paycheck in would swamp every trend and hide the
          only numbers this page exists to show.
        </p>
      </header>

      {/* ── Pipeline ─────────────────────────────────────────────────── */}
      <section className="mt-10">
        <h2 className="mb-5 border-b border-line pb-3 text-[20px] font-semibold tracking-[-0.02em] text-fg">
          Pipeline
        </h2>
        <Pipeline products={products} />
      </section>

      {/* ── KPIs ─────────────────────────────────────────────────────── */}
      <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-5">
        <Kpi label="All time" value={formatUSD(allTime)} />
        <Kpi
          label={latest ? formatMonth(latest.month) : "Latest month"}
          value={latest ? formatUSD(latest.total) : "—"}
        />
        <Kpi
          label="MoM growth"
          value={formatPercent(growth)}
          tone={growth === null ? "muted" : growth >= 0 ? "good" : "warn"}
        />
        <Kpi
          label="Concentration"
          value={formatPercent(concentrationRatio)}
          tone={
            concentrationRatio === null ? "muted" : concentrationRatio > 0.7 ? "warn" : "good"
          }
          note={concentrationRatio !== null && concentrationRatio > 0.7 ? "one stream dominates" : undefined}
        />
        <Kpi label="Recurring" value={formatPercent(recurring)} />
      </dl>

      {allTime === 0 ? (
        <section className="mt-10 rounded-2xl border border-line bg-bg-panel p-8">
          <h2 className="text-[19px] font-semibold tracking-[-0.02em] text-fg">
            No side income logged yet
          </h2>
          <p className="mt-3 max-w-[42rem] text-[15px] leading-relaxed text-fg-muted">
            That is the accurate state, not a broken page. Every metric above turns on the moment
            the first entry lands in <code className="font-mono text-[13px] text-fg">data/revenue.ts</code>.
          </p>
          <div className="mt-6 rounded-xl border border-line bg-bg p-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-fg-subtle">
              First entry looks like
            </p>
            <pre className="mt-3 overflow-x-auto font-mono text-[13px] leading-relaxed text-fg-muted">
{`{ month: "2026-08", stream: "consulting", amount: 2500, note: "AI Readiness Audit" }`}
            </pre>
          </div>
          <p className="mt-5 text-[13px] text-fg-subtle">
            {liveProducts} product{liveProducts === 1 ? "" : "s"} available ·{" "}
            {inPipeline} in the pipeline · {offers.length} engagements listed. The path to a
            first entry runs through one of those.
          </p>
        </section>
      ) : (
        <>
          {/* ── Trend ────────────────────────────────────────────────── */}
          <section className="mt-12">
            <h2 className="border-b border-line pb-3 text-[20px] font-semibold tracking-[-0.02em] text-fg">
              Monthly
            </h2>
            <ul className="mt-5 flex flex-col gap-2.5">
              {months.map((month) => (
                <li key={month.month} className="flex items-center gap-4">
                  <span className="w-20 shrink-0 font-mono text-[12px] text-fg-subtle">
                    {formatMonth(month.month)}
                  </span>
                  <span className="h-6 flex-1 overflow-hidden rounded bg-bg-panel">
                    <span
                      className="block h-full rounded bg-accent-fill"
                      style={{ width: peak > 0 ? `${(month.total / peak) * 100}%` : "0%" }}
                    />
                  </span>
                  <span className="w-24 shrink-0 text-right font-mono text-[13px] tabular-nums text-fg">
                    {formatUSD(month.total)}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* ── By stream ────────────────────────────────────────────── */}
          <section className="mt-12">
            <h2 className="border-b border-line pb-3 text-[20px] font-semibold tracking-[-0.02em] text-fg">
              By stream
            </h2>
            <div className="mt-5 overflow-hidden rounded-2xl border border-line">
              <table className="w-full text-[14px]">
                <thead>
                  <tr className="bg-bg-panel">
                    <th className="px-5 py-3 text-left font-mono text-[10px] uppercase tracking-[0.1em] text-fg-subtle">
                      Stream
                    </th>
                    <th className="px-5 py-3 text-right font-mono text-[10px] uppercase tracking-[0.1em] text-fg-subtle">
                      All time
                    </th>
                    <th className="px-5 py-3 text-right font-mono text-[10px] uppercase tracking-[0.1em] text-fg-subtle">
                      Share
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {STREAMS.map((stream) => (
                    <tr key={stream} className="bg-bg-panel/50">
                      <td className="px-5 py-3 text-fg">{STREAM_LABELS[stream]}</td>
                      <td className="px-5 py-3 text-right font-mono tabular-nums text-fg-muted">
                        {formatUSD(byStream[stream])}
                      </td>
                      <td className="px-5 py-3 text-right font-mono tabular-nums text-fg-subtle">
                        {allTime > 0 ? formatPercent(byStream[stream] / allTime) : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-[13px] text-fg-subtle">
              {activeStreams(revenue)} of {STREAMS.length} streams active ·{" "}
              {earningStreak(revenue)}-month earning streak
            </p>
          </section>
        </>
      )}
    </main>
    </div>
    </>
  );
}

function Kpi({
  label,
  value,
  tone = "default",
  note,
}: {
  label: string;
  value: string;
  tone?: "default" | "good" | "warn" | "muted";
  note?: string;
}) {
  const toneClass =
    tone === "good"
      ? "text-tier-free"
      : tone === "warn"
        ? "text-amber-400"
        : tone === "muted"
          ? "text-fg-subtle"
          : "text-fg";
  return (
    <div className="bg-bg-panel px-5 py-5">
      <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-fg-subtle">{label}</dt>
      <dd
        className={`mt-1.5 font-mono text-[26px] font-semibold tabular-nums tracking-tight ${toneClass}`}
      >
        {value}
      </dd>
      {note ? <p className="mt-1 text-[11px] text-amber-400/80">{note}</p> : null}
    </div>
  );
}
