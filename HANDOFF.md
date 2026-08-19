# Handoff

Updated: 2026-08-19

## Current state

- Master is current prod (`f49694b` B/W homepage pass). This job is founder photo only.
- Same copy as current master. Same routes. Same URL. Same sections.
- Founder frame now points at `/static/josh-menzies.jpg` (grayscale, object-cover, crops the bottom-right edge). Copy, type, hairline frame, and reduced-motion stay as they are.
- The attached booth headshot was not available as a committable file in this workspace (no image on disk, in git, in mail, or on public profiles). No substitute was generated. Until that file is committed, the panel falls back to the JM monogram.
- Do not rewrite copy. Do not deploy. Do not merge.
- Do not create a Vercel project.
- Parallel “AI agent department” work is out of scope.

## Repo

- https://github.com/jmenzies722/shua-labs
- Stack: Next.js App Router, TypeScript, Tailwind. Site content is data-driven (`data/`).
- Live deploys from master. This PR is not shipped.

## Do not

- Rewrite homepage or live-site copy.
- Deploy.
- Create a Vercel project.
- Merge.
- Generate or invent a different founder picture.
- Touch registry, data, kit files, or the parallel AI-agent-department work.

## Packet (this job)

- **Outcome:** Founder panel wired to `/static/josh-menzies.jpg` inside the existing hairline frame. Homepage sentences unchanged. Exact attached headshot not committed — file was not in the workspace. No deploy.
- **Repo:** `jmenzies722/shua-labs`
- **Branch:** `cursor/founder-photo-dca5`
- **Status:** blocked
- **Tests:** pending build after this commit. Founder photo cannot render until `public/static/josh-menzies.jpg` is the attached booth photo.
- **PR:** pending
- **Next:** Drop the attached booth headshot into `public/static/josh-menzies.jpg` (crop the bottom-right sliver if needed), then re-run build. No deploy. No merge. Ivy stays out.
