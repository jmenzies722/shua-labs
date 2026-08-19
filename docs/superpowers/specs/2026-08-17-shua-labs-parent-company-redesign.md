# Shua Labs parent-company redesign

## Purpose

Rebuild the Shua Labs website as the public home of a parent venture company. It must explain the company's enduring point of view, create confidence in Josh Menzies as its founder, and give prospective collaborators a direct way to get in touch.

The site is not a gallery of developer tools, an agency site, or a launch page for one product. It must not feature the retired named product catalogue, repository install commands, tool counts, or claims of venture traction that cannot be substantiated.

## Positioning and voice

**Primary headline:** Building what comes next.

**Supporting message:** Shua Labs creates ventures, products, and systems for an AI-native world.

**Operating thesis:** The company starts close to consequential problems, builds useful systems, compounds what works, and shares selectively.

The tone is concise, calm, ambitious, and specific. It should sound like an independent company with a long horizon—not an individual freelancer, generic studio, or hype-driven AI startup.

## Audience and conversion

The primary audience is potential collaborators: founders, teams, technical partners, and people interested in working with Shua Labs. Secondary audiences are technically credible peers and future talent.

The one conversion path is a clear invitation to begin a conversation. The contact link uses the established contact destination already present in the project; it must never imply that employment, investment, or partnership is open unless its copy says so.

## Information architecture

The site remains a responsive single-page experience with these sections:

1. **Navigation.** A compact wordmark, anchor links, and an always-visible contact action. It becomes a simple accessible mobile menu on narrow screens.
2. **Hero.** Full-viewport opening statement with a subtle living blue-light field and one primary action to learn how the company works. It states the parent-company role immediately.
3. **What we build.** Three anonymous venture areas: AI-native ventures, developer systems, and digital infrastructure. Each describes the human or organisational outcome rather than naming retired projects or promising unannounced products.
4. **How we work.** A short operating-principles section: start close to the problem, build real things, compound what works, and share selectively.
5. **In formation.** A visual, forward-looking section that says the company is actively building without presenting placeholder logos, fake roadmap dates, or incomplete product cards.
6. **Founder.** A grounded introduction to Josh Menzies, centered on building AI-first products and reliable systems across product, engineering, and infrastructure.
7. **Contact.** A high-contrast final invitation to collaborate, partner, or connect, plus low-emphasis external links that are only retained if they work.

## Visual system

Use the selected **Systems Studio** direction, made editorial rather than terminal-like:

- Near-black layered surfaces with generous negative space; do not use code windows, terminal copy, grids that imitate IDEs, or rainbow category colors.
- One restrained electric-blue light accent, used for depth, focus, and the primary action rather than as a decorative fill.
- Large, tight sans-serif display typography and readable neutral body text; monospace only where it conveys real metadata.
- Full-bleed compositions broken by editorial bands and architectural linework. Cards are few, purposeful, and content-led.
- Slow fades, subtle light movement, and small hover lifts. Respect `prefers-reduced-motion`, keep keyboard focus obvious, and never make motion necessary to understand content.

## Content and data changes

Remove all registry/project-gallery navigation and detail-drawer paths from the public home experience. Replace tool-centric data structures with a small, explicit source of truth for the three venture areas and the operating principles. Keep copy in data records where the existing architecture benefits from it, but do not maintain a schema for products that are no longer displayed.

Update metadata, Open Graph content, sitemap, robots policy where needed, page title, and Vercel-facing project description so search and shared links describe Shua Labs as a parent venture company. Preserve existing working repository and contact links only when they support the new narrative; remove links that lead to retired product-focused material.

## Responsive and accessibility behavior

At desktop width, the hero and sectional compositions are spacious and intentional. At mobile width, text remains the priority: no clipped headlines, floating decorative layers that obstruct content, or interaction that depends on hover. Navigation, anchors, and the contact action work by keyboard. All decorative effects are ignored by screen readers and sufficient text contrast is maintained.

## Validation

Run the project’s type check, lint (if configured), and production build. Verify the homepage at desktop and mobile widths, including reduced-motion behavior, working internal anchors, contact action, metadata, and the absence of retired product names from rendered public sections. Verify the Vercel deployment after it is linked or redeployed; deployment needs the user’s existing Vercel authorization and does not include a Git commit or push without a separate instruction.
