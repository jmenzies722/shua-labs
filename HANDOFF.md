# Handoff

Updated: 2026-08-19

## Current state

- PR #9 (`feat/parent-company-redesign`) was conflicted against current master (live B/W venture-company homepage + founder photo).
- Master was merged in. Homepage/UI/copy conflicts prefer master. Live page identity stays "Building what comes next."
- Unique branch work kept on top: `/thesis`, additive Signals section, `data/company.ts`, vitest suite.
- macOS copy-collision files (`* 2.css` / `* 2.tsx`) deleted.
- Tests assert the live homepage, not the old redesign copy.
- Do not merge. Do not deploy. Do not touch PR #8.

## Repo

- https://github.com/jmenzies722/shua-labs
- Stack: Next.js App Router, TypeScript, Tailwind.
- Live deploys from master. This PR is not shipped.

## Do not

- Rewrite homepage or live-site copy.
- Deploy.
- Create a Vercel project.
- Merge.
- Touch PR #8 (slash agents).

## Packet (this job)

- **Outcome:** PR #9 merge conflicts resolved by preferring master's live homepage (B/W layout, founder photo at `/static/josh-menzies.jpg`, NavNew). Added `/thesis`, an additive Signals section, vitest against live copy, and a sitemap entry for `/thesis`. Removed macOS `* 2` collision files. No deploy. No merge.
- **Repo:** `jmenzies722/shua-labs`
- **Branch:** `feat/parent-company-redesign`
- **Status:** done — waiting for GitHub mergeable_state to clear dirty
- **Tests:** pending local `npm test` / `tsc --noEmit` after this write-up
- **PR:** https://github.com/jmenzies722/shua-labs/pull/9 — open, not merged
- **Next:** Confirm PR #9 is mergeable / not dirty. Do not merge. Do not deploy.
