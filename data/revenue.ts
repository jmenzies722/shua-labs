import type { RevenueEntry } from "@/lib/types";

/**
 * Revenue log. Hand-maintained, one line per stream per month.
 *
 * Deliberately a flat file and not a sync pipeline. Two minutes at the end of the month is
 * cheaper than a webhook you have to maintain, and it means the dashboard has zero moving
 * parts. When entering it by hand becomes annoying, that is a good problem and the right
 * moment to automate — not before.
 *
 * Amounts are NET — what actually landed after platform fees. Gross flatters you and makes
 * the growth rate a lie.
 *
 * Salary is deliberately NOT tracked here. This is the side-income ledger; a paycheck would
 * swamp every trend and hide the only numbers the dashboard exists to show.
 *
 * PRIVATE. Never rendered at record level on a public route — see app/dashboard.
 */
export const revenue: RevenueEntry[] = [
  // No side income yet. First entry goes here:
  // { month: "2026-08", stream: "consulting", amount: 2500, note: "AI Readiness Audit" },
];
