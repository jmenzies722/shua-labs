# Handoff

Updated: 2026-08-19

## Current state

- Live == git. https://shua-labs.vercel.app matches master `99fccb8` (Devin venture-company page).
- Palette pass only. Same copy as current master. Same layout. Same routes. Same URL.
- Black / white / gray. Background `#000`. Surfaces near-black. Text `#fff` / `#a1a1a1`. Hairline gray borders.
- Blue, glow, glow orbs, and blue tint removed.
- Do not rewrite copy. Do not deploy. Do not merge.
- Do not create a Vercel project.
- No second product until Josh names the outcome and the repo.
- One build at a time.

## Repo

- https://github.com/jmenzies722/shua-labs
- Stack: Next.js App Router, TypeScript, Tailwind. Site content is data-driven (`data/`).
- Live deploys from this git tree (master `99fccb8`).

## Do not

- Rewrite homepage or live-site copy.
- Deploy.
- Create a Vercel project.
- Merge.
- Start a second product until Josh names it.

## Packet (this job)

- **Outcome:** Palette pass. Black / white / gray. Glow orbs removed. Same copy as current master. No deploy.
- **Repo:** `jmenzies722/shua-labs`
- **Branch:** `feat/bw-palette`
- **Status:** done
- **Tests:** no `blur-3xl` / ambient `bg-white/5` orbs in HeroNew, Contact, InFormation. `prefer-reduced-motion` kept. Homepage sentences unchanged vs master. Routes unchanged.
- **PR:** https://github.com/jmenzies722/shua-labs/pull/4 — open, not merged
- **Next:** Shua reviews. No deploy. No merge. Ivy stays out.
