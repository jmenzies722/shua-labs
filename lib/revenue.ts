import type { RevenueEntry, RevenueStream } from "@/lib/types";

/**
 * Revenue analytics. Pure functions over the flat log in data/revenue.ts.
 *
 * The metrics are chosen to answer the questions that change behaviour: is it growing, where is
 * it coming from, how badly would it hurt if the biggest source stopped, and how much recurs.
 * A running total answers none of those.
 */

export const STREAMS: RevenueStream[] = ["products", "consulting", "content", "apps"];

export const STREAM_LABELS: Record<RevenueStream, string> = {
  products: "Products",
  consulting: "Consulting",
  content: "Content",
  apps: "Apps",
};

export interface MonthTotal {
  month: string;
  total: number;
  byStream: Record<RevenueStream, number>;
  recurring: number;
}

function emptyStreams(): Record<RevenueStream, number> {
  return { products: 0, consulting: 0, content: 0, apps: 0 };
}

/** Months with data, oldest first. Gaps are absent rather than zero-filled — a month with no
 *  revenue and a month you forgot to log are different facts. */
export function monthlyTotals(entries: RevenueEntry[]): MonthTotal[] {
  const buckets = new Map<string, MonthTotal>();

  for (const entry of entries) {
    let bucket = buckets.get(entry.month);
    if (!bucket) {
      bucket = { month: entry.month, total: 0, byStream: emptyStreams(), recurring: 0 };
      buckets.set(entry.month, bucket);
    }
    bucket.total += entry.amount;
    bucket.byStream[entry.stream] += entry.amount;
    if (entry.recurring) bucket.recurring += entry.amount;
  }

  return [...buckets.values()].sort((a, b) => a.month.localeCompare(b.month));
}

export function total(entries: RevenueEntry[]): number {
  return entries.reduce((sum, e) => sum + e.amount, 0);
}

export function totalsByStream(entries: RevenueEntry[]): Record<RevenueStream, number> {
  const totals = emptyStreams();
  for (const entry of entries) totals[entry.stream] += entry.amount;
  return totals;
}

/** MoM growth against the previous month with data. null when there's nothing to compare —
 *  an honest "no answer yet" beats a fabricated 0%. */
export function momGrowth(entries: RevenueEntry[]): number | null {
  const months = monthlyTotals(entries);
  if (months.length < 2) return null;
  const previous = months[months.length - 2].total;
  const latest = months[months.length - 1].total;
  if (previous === 0) return null;
  return (latest - previous) / previous;
}

/**
 * Share of all-time revenue held by the largest single stream, 0–1.
 *
 * The exposure number. One source at 100% is not a business, it's a job with worse benefits.
 * Under ~0.7 across three live streams is a reasonable target.
 */
export function concentration(entries: RevenueEntry[]): number | null {
  const grand = total(entries);
  if (grand === 0) return null;
  return Math.max(...Object.values(totalsByStream(entries))) / grand;
}

/** Share of all-time revenue that recurs. A recurring dollar is worth more than the same
 *  dollar once, because you don't have to go and win it again. */
export function recurringShare(entries: RevenueEntry[]): number | null {
  const grand = total(entries);
  if (grand === 0) return null;
  const recurring = entries.filter((e) => e.recurring).reduce((sum, e) => sum + e.amount, 0);
  return recurring / grand;
}

/** Consecutive most-recent months with revenue. Consistency beats any single spike. */
export function earningStreak(entries: RevenueEntry[]): number {
  const months = monthlyTotals(entries).filter((m) => m.total > 0);
  if (months.length === 0) return 0;

  let streak = 1;
  for (let i = months.length - 1; i > 0; i--) {
    if (isPreviousMonth(months[i - 1].month, months[i].month)) streak++;
    else break;
  }
  return streak;
}

function isPreviousMonth(earlier: string, later: string): boolean {
  const [ey, em] = earlier.split("-").map(Number);
  const [ly, lm] = later.split("-").map(Number);
  return ey * 12 + em + 1 === ly * 12 + lm;
}

/** Distinct streams that have ever earned. The diversification counter. */
export function activeStreams(entries: RevenueEntry[]): number {
  return Object.values(totalsByStream(entries)).filter((v) => v > 0).length;
}

export function formatUSD(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPercent(value: number | null): string {
  if (value === null) return "—";
  return `${value >= 0 ? "" : "−"}${Math.abs(Math.round(value * 100))}%`;
}

export function formatMonth(month: string): string {
  const [year, m] = month.split("-").map(Number);
  return new Date(Date.UTC(year, m - 1, 1)).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
