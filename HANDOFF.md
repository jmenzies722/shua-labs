# Handoff

Updated: 2026-08-19

## Current state

- Palette pass only. Same copy. Same layout. Same routes. Same URL.
- Black / white / gray. Background `#000`. Surfaces near-black. Text `#fff` / `#a1a1a1`. Hairline gray borders.
- Blue, glow, and blue tint removed from theme, CSS, and component classes.
- Live ≠ git. `master` is not the live studio site. Do not ship from `master` to prod.
- Do not rewrite copy. Do not deploy. Do not merge.
- Do not create a Vercel project.
- No second product until Josh names the outcome and the repo.
- One build at a time.

## Repo

- https://github.com/jmenzies722/shua-labs
- Stack: Next.js App Router, TypeScript, Tailwind. Site content is data-driven (`data/`).
- Live is a dirty CLI deploy. This branch is git only.

## Do not

- Rewrite homepage or live-site copy.
- Deploy.
- Create a Vercel project.
- Merge.
- Start a second product until Josh names it.

## Packet (this job)

- **Outcome:** Black / white / gray palette pass. Blue tokens, glow shadows, glow-pulse, and blue component classes removed. Copy, layout, and routes unchanged.
- **Repo:** `jmenzies722/shua-labs`
- **Branch:** `feat/bw-palette`
- **Status:** done
- **Tests:** grep for `#3b82f6`, `rgba(59, 130, 246`, `blue-glow`, `text-blue-`, `bg-blue-`, `ring-blue-` in theme/CSS/components — none. `git diff` does not change homepage sentences. Routes unchanged. `prefer-reduced-motion` kept.
- **PR:** https://github.com/jmenzies722/shua-labs/pull/4 — open, not merged
- **Next:** Shua reviews. No deploy. No merge. Ivy stays out.
