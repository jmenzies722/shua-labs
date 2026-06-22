# Shua Labs — Claude Design Prompt (UI/UX) · v2 (Dark & Premium)

Paste everything below the line into Claude (Artifacts), v0, Cursor, or any AI builder to generate the Shua Labs web UI. Self-contained: positioning, brand, aesthetic, information architecture, every section, component, interaction, copy, tech stack, responsive rules, accessibility.

> This is a **redesign**. The previous version was a dark "terminal/IDE" look and was rejected for feeling like a hacker template. v2 is **premium and cinematic** — think Apple's Pro / Pro Display XDR product pages: rich near-black, dramatic whitespace, large refined typography, glowing accents, smooth scroll-driven reveals. Restrained, expensive, confident. NOT terminal, NOT mono-heavy, NOT a SaaS template.

---

## ROLE

You are a world-class product designer and front-end engineer with an Apple-grade eye for typography, spacing, motion, and restraint. Design and build the site for **Shua Labs**. Output production-quality code, not a mockup. Every spacing, type, and motion decision should feel deliberate and premium. Explain the key design decisions briefly.

## WHAT SHUA LABS IS (updated goal)

Shua Labs is **Josh Menzies' builder brand** — the home for everything he ships. It hosts his **open-source products and projects**, with a focus on **developer enablement and AI enablement** (AI is the center of gravity, but the site is not AI-only — any tool or product that makes developers and teams more capable belongs here). It also offers a **consulting practice** for businesses who want that expertise applied to their own use cases.

Three jobs at once:
1. **A portfolio of real, shipped work** — open-source products and tools, browsable by category, each with depth (what it is, how to use it, links).
2. **A credibility signal** — to hiring managers, the technical community, and conference organizers. The site itself is a portfolio artifact; it must look like something a senior engineer is proud of.
3. **A revenue funnel** — the open work proves the skill; the consulting practice monetizes it.

**Positioning line (hero):** "Build. In the open."
**Sub:** "Open-source products and tools for developer and AI enablement — and the expertise to put them to work."

**Through-line / brand principles** (the thesis, broadened from the old AI-only pillars):
- **Open by default** — shipped in the open, MIT, forkable.
- **Production-grade** — built to run in the real world, not demos (observability, guardrails, cost-awareness baked in).
- **Built to enable** — every project makes a developer or a team measurably more capable.

## AUDIENCE

- **Hiring managers / senior engineers** — credibility in 5 seconds. The polish *is* the message.
- **Developers** — discover and grab a tool, understand it fast, use it today.
- **Buyers** — businesses who'd pay for the consulting.

## AESTHETIC — DARK & PREMIUM (the core of this redesign)

**Reference points:** Apple Pro / Pro Display XDR / Vision Pro product pages, Linear's marketing site, Rivian, Arc browser's site. Cinematic, dark, spacious, confident.

**Color & surface:**
- Background: true rich near-black, layered. Base `#000000`–`#08080A`, with slightly lifted surface panels (`#0E0E11`–`#141418`) for cards and feature bands. Use **subtle vertical gradients** and **radial glows** behind hero/feature sections to create depth and atmosphere (very low opacity, never garish).
- Text: high-contrast off-white (`#F5F5F7`-ish, Apple's exact off-white) for headings; muted gray (`#86868B`) for secondary copy. Strong hierarchy through weight and size, not color noise.
- **One accent**, used as a glow and for key CTAs/active states — a refined luminous hue. Recommend a cool premium tone (electric blue/cyan `#0A84FF`-ish Apple blue, or a soft luminous teal). Use it sparingly as *light*, not fill — glows, thin underlines, focus rings, the primary button.
- Avoid the old rainbow tier colors as decoration; tier/category metadata stays muted and secondary.

**Typography:**
- A refined grotesk/sans as the primary face (Inter, Geist, or SF-like). Large, tight, confident headlines (think 56–96px hero). Generous line-height in body. Letter-spacing tightened on big display type.
- Use weight contrast (semibold display vs. regular body) for hierarchy.
- Monospace is allowed ONLY for genuinely code-like atoms (install snippets, type tags) and used sparingly — this is NOT a terminal aesthetic. Most labels are clean sans.

**Space & rhythm:**
- Dramatic vertical whitespace between sections (Apple-level — sections breathe, often 120–200px padding). Content max-width contained and centered; generous margins.
- Large, calm compositions. One idea per viewport where it makes sense.

**Depth & detail:**
- Soft, large-radius cards (~16–20px) with subtle 1px hairline borders (`rgba(255,255,255,0.08)`) and faint inner/outer glow on hover.
- Subtle layered shadows and background glows for atmosphere. Optional very-low-opacity grain/noise texture for a premium film feel.
- Glassmorphism only where tasteful (sticky nav backdrop blur).

**Motion (this is a big part of "premium"):**
- Scroll-driven reveals: content fades/translates up gently as it enters the viewport (Intersection Observer or Framer Motion). Staggered for grids. ~400–600ms, smooth easing (ease-out / cubic-bezier).
- Hero: a subtle entrance animation and a slow, living background glow.
- Card hover: gentle lift, border + glow bloom in the accent, ~200ms.
- Smooth in-page scrolling for nav anchors.
- Everything tasteful and slow-ish — premium motion is calm, never bouncy or fast. Respect `prefers-reduced-motion` (disable all of the above).
- Use **Framer Motion** for the reveal/stagger choreography (added to the stack for this version).

## INFORMATION ARCHITECTURE (more in-depth than v1)

Single-page scroll with **project detail views** (modal/drawer or routes — see Gallery). Sections in order:

1. **Nav (sticky, glassy)** — left: "Shua Labs" wordmark (clean sans, not mono). Right: anchor links (Work, Consulting, Journey, About) + GitHub icon + a refined primary button ("Let's talk" → consulting). On scroll, nav gains a blurred translucent dark backdrop and a hairline bottom border. Collapses to an elegant full-screen overlay menu on mobile.

2. **Hero (cinematic)** —
   - Full-viewport, rich black with a slow living radial glow in the accent behind the headline.
   - Eyebrow (small, refined, accent-tinted): `SHUA LABS`
   - H1 (huge, tight): "Build. In the open."
   - Sub (muted, generous): "Open-source products and tools for developer and AI enablement — and the expertise to put them to work."
   - Two CTAs: primary "Explore the work" (accent, glowing, → work), secondary "GitHub" (ghost/outline).
   - A quiet signal line low in the hero (mono, muted): `Open source · Developer & AI enablement · MIT`.
   - Subtle scroll-cue at the bottom.

3. **Principles band (the manifesto)** — an editorial, spacious statement of what Shua Labs is. Replace the old rigid 4-card grid with something more refined: a short lead sentence ("Everything here is open, production-grade, and built to enable.") followed by **three principles** (Open by default · Production-grade · Built to enable), each a clean column with a one-line definition and a minimal line-icon. Lots of space. Scroll-reveal staggered.

4. **The Work (gallery — CATEGORY SECTIONS, the core)** — this is the heart. Organize projects into **category bands**, each with its own heading and a short one-line category description, then a responsive card grid. Categories (data-driven, extensible — adding a category or moving a project is a data edit):
   - **AI Enablement**
   - **Developer Tools**
   - **Open Source** (room for future non-AI products/projects)
   Each **project card** (premium, not busy): category/type tag (small, muted), tier badge (Free/Freemium/Paid/WIP as subtle dot-pill), project **name** (prominent), a crisp one-liner, a couple of principle/skill tags, and links (GitHub, live). Hover: gentle lift + accent glow bloom. Card is **clickable → opens a project detail view** (a slide-in drawer or modal, premium, dark, with backdrop blur) containing: full description, what it does / who it's for, an install or usage snippet (mono code block with copy button), the principles it embodies, status, and links. This detail depth is the "more in-depth UI/UX." Make the detail content a field on each project object so it's easy to edit.
   Optional but encouraged: a **featured project spotlight** — one flagship build presented as a large full-bleed dark feature band above the category grids (Apple "lead with one thing"), with a bigger visual treatment.
   Seed data (typed `projects.ts`; categories assigned; trivially editable):
   - **AWS Read-Only MCP** — AI Enablement · `MCP` · Free — "Lets an agent query your AWS state (cost, resources, alarms) with zero write access." (flagship candidate for the spotlight)
   - **Agent Tracer** — AI Enablement · `AGENT` · Freemium — "Logs every tool call an agent makes with timing + cost. The 'why did it do that?' tool."
   - **Infra Reviewer** — AI Enablement · `AGENT` · Freemium — "Autonomous Terraform/Docker reviewer that comments on your PRs."
   - **/aws-cost** — Developer Tools · `SKILL` · Free — "Estimates monthly AWS cost from your Terraform before you apply."
   - **/threat-model** — Developer Tools · `SKILL` · Free — "Generates an OWASP-style threat model for any repo."
   - **PR Reviewer SaaS** — Developer Tools · `APP` · Paid — "Hosted agent that reviews every PR on your repo."
   - (Open Source category may start with a tasteful "More shipping soon" placeholder card if empty.)

5. **Consulting ("Work with me" — the revenue arm)** — premium dark section, framing line: "The work is open. The expertise is for hire." **Three offers as a value ladder** (low→high), the middle "build" visually elevated as the flagship (accent border, soft glow, slight scale). Each card: offer name, one-line who-it's-for, deliverable, price (clean, prominent), CTA. Use EXACTLY these — do not add a fourth:
   - **AI Readiness Audit** — *for businesses who know AI could help but don't know where to start.* "A fixed one-week audit that ranks your highest-ROI automation opportunities and hands you a build roadmap." **From $2,500** — note: *"Fee credits 100% toward a build booked within 60 days."* CTA "Book an audit."
   - **Production-Grade AI Agent** *(flagship — emphasize)* — *for a business with a manual, costly, repetitive process.* "I build and deploy a custom AI agent that does it — integrated into your stack, with logging, cost caps, fallbacks, and observability. Not a demo. Something that survives real traffic." **From $8,000.** CTA "Start a build."
   - **Fractional AI Engineer** — *for a team that needs ongoing AI capability but can't justify a full-time hire.* "Embedded, ongoing — I stand up, integrate, and maintain your AI systems. Your fractional AI lead." **From $5,000/mo** *(3-month minimum).* CTA "Talk retainer."
   - Reassurance line beneath (muted): "Production-grade by default — every build ships with observability, cost controls, and fallbacks."
   - Section primary CTA: "Book a call" (placeholder href for Calendly/email).

6. **Journey (building in the open)** — an elegant vertical timeline / changelog: dated entries with mono datestamps, accent nodes, scroll-reveal. The momentum narrative. Newest first.

7. **About** — refined, confident bio block: who Josh is (platform engineer → AI architect, builds in the open), the brand in one line ("I ship developer and AI enablement tools in the open, and help businesses adopt them"), links (GitHub, LinkedIn, email). Premium, spacious, not a generic portfolio bio.

8. **Footer** — wordmark, nav repeat, GitHub, MIT note, copyright. Minimal, dark, calm.

## COPY TONE

Confident, refined, technical-but-human. Short declarative lines. No marketing fluff. Banned words: "revolutionize", "supercharge", "unleash", "cutting-edge". Sounds like a senior engineer with taste. Apple-like economy of words — say less, mean more.

## TECH STACK (use exactly this)

- **Next.js (App Router) + TypeScript**
- **Tailwind CSS**
- **shadcn/ui** for primitives (button, badge, dialog/drawer for project detail, card)
- **Framer Motion** for scroll reveals + choreography
- **lucide-react** for minimal line icons
- Data layer: typed `data/projects.ts` (with `category` + a rich `detail` field), `data/offers.ts` (3 offers), `data/categories.ts`, `data/principles.ts`, `data/journey.ts`. Adding a project/category = a one-object edit.
- Component-driven: `<Nav>`, `<Hero>`, `<Principles>`, `<CategorySection>`, `<ProjectCard>`, `<ProjectDetail>` (drawer/modal), `<FeaturedProject>`, `<OfferCard>`, `<Consulting>`, `<Journey>`, `<About>`, `<Footer>`, plus `<TierBadge>`, `<TypeTag>`, `<SectionHeading>`, `<Reveal>` (motion wrapper).
- Deploys to **Vercel** zero-config.

## RESPONSIVE

- Mobile-first. Project grids: 1 → 2 → 3 cols. Principles: stacked → 3-up. Offers: stacked → 3-up. Hero type scales down gracefully (clamp). Nav → full-screen overlay menu. Tap targets ≥44px. No horizontal scroll. Project detail becomes a full-height bottom sheet on mobile.

## ACCESSIBILITY

- WCAG AA contrast on the dark theme (mind muted grays on near-black — keep secondary text ≥ AA).
- Full keyboard navigation; visible accent focus rings. Project detail drawer/modal must trap focus, close on Esc, and restore focus on close.
- Semantic HTML, correct heading hierarchy, alt text, ARIA on interactive controls and the modal.
- `prefers-reduced-motion`: disable all scroll reveals, glows-in-motion, and smooth scroll.

## DELIVERABLE

A complete, runnable Next.js + TypeScript + Tailwind + shadcn/ui + Framer Motion project for the Shua Labs site: every section above, category-organized gallery with clickable project detail drawers, the cinematic dark-premium aesthetic with tasteful scroll motion, the three consulting offers, responsive and accessible, deployable to Vercel as-is. It must `next build` clean. Make it look like an Apple product page for a developer's body of work — because that is exactly its job.
