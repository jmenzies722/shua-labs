# Handoff

Updated: 2026-08-19

## Current state

- Homepage motion pass on current master (live B/W venture-company page).
- Existing whileInView fades extended with one shared ease, one viewport, and one parent reveal per section so child triggers do not fight.
- Same words, same sections, same B/W palette, same founder photo.
- Prefers-reduced-motion: duration 0 / no transform; loops off; first paint is the final frame.
- Do not merge. Do not deploy. Do not touch PR #8.

## Repo

- https://github.com/jmenzies722/shua-labs
- Stack: Next.js App Router, TypeScript, Tailwind, Framer Motion.
- Live deploys from master. This PR is not shipped.

## Do not

- Rewrite homepage or live-site copy.
- Deploy.
- Create a Vercel project.
- Merge.
- Touch PR #8 (slash agents).

## Packet (this job)

- **Outcome:** Fluid homepage motion on the live venture-company page: shared motion tokens, staggered section reveals, calmer hero/scroll-tick/In formation loops, nav hairline + menu fade, CTA press easing. Copy, sections, palette, and founder photo unchanged.
- **Repo:** `jmenzies722/shua-labs`
- **Branch:** `cursor/homepage-fluid-motion-41b7`
- **Status:** in progress — tests/PR next
- **Tests:** pending
- **PR:** pending
- **Next:** Open PR to master. Do not merge. Do not deploy.
