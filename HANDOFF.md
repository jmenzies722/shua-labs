# Handoff

Updated: 2026-08-19

## Current state

- Master is current prod (`822430a` palette pass). This job is a homepage UI/UX pass on top of that.
- Same copy as current master. Same routes. Same URL. Same sections.
- Tighter black / white / gray site: sharper type, narrower measure, hairline rules, numbered areas.
- Formation glow orb / blur removed. Founder gradient removed.
- Do not rewrite copy. Do not deploy. Do not merge.
- Do not create a Vercel project.
- Parallel “AI agent department” work is out of scope. This branch stays in homepage UI only.

## Repo

- https://github.com/jmenzies722/shua-labs
- Stack: Next.js App Router, TypeScript, Tailwind. Site content is data-driven (`data/`).
- Live deploys from master. This PR is not shipped.

## Do not

- Rewrite homepage or live-site copy.
- Deploy.
- Create a Vercel project.
- Merge.
- Touch registry, data, or kit files for this job.

## Packet (this job)

- **Outcome:** Homepage UI/UX tighten. Black / white / gray. Type, spacing, and layout refined. Copy unchanged vs master. Glow orb removed. No deploy.
- **Repo:** `jmenzies722/shua-labs`
- **Branch:** `cursor/bw-site-ux-18a6`
- **Status:** done
- **Tests:** `tsc --noEmit` pass. `next build` pass, same routes. Homepage section sentences unchanged vs master. No blue / glow / gradient classes in touched homepage files. `prefer-reduced-motion` kept. Lint not configured in repo (`next lint` prompts to create config — left untouched).
- **PR:** https://github.com/jmenzies722/shua-labs/pull/5 — open, not merged
- **Next:** Shua reviews. No deploy. No merge. Ivy stays out.
