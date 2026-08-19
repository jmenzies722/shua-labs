# Shua Labs Parent-Company Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the public Shua Labs site as an engaging parent-company home for future ventures, removing the retired product catalogue and terminal aesthetic.

**Architecture:** Replace the home page's registry-driven sections with small static content modules: the hero, venture areas, operating principles, formation signal, founder, and contact. The visual system lives in the global stylesheet and uses Framer Motion only for calm, accessible reveal behavior. The `/registry` implementation is removed from public routes and discovery metadata so the old catalogue is not reachable through the new site.

**Tech Stack:** Next.js 14 App Router, React 18, TypeScript, Tailwind CSS, Framer Motion, Vitest, Testing Library.

## Global Constraints

- Do not render retired product names, repository install commands, public-tool counts, or unsubstantiated traction claims on any public route.
- The primary homepage copy is exactly “Building what comes next.” with the support line “Shua Labs creates ventures, products, and systems for an AI-native world.”
- Use a near-black editorial system with a restrained blue accent; no terminal, IDE, code-window, mono-dominant, or rainbow category treatment.
- Preserve one clear contact action, keyboard-accessible anchors, sufficient contrast, and `prefers-reduced-motion` support.
- Do not commit or push as part of this work.

---

## File Structure

- `data/company.ts` — the sole source of truth for the venture-area, operating-principle, and founder copy displayed on the homepage.
- `components/sections/VentureAreas.tsx` — renders the three anonymous venture areas.
- `components/sections/Principles.tsx` — renders the operating thesis and formation signal.
- `components/sections/Founder.tsx` — renders the founder and contact conversion section.
- `components/sections/Hero.tsx` — replaces terminal status content with the parent-company opening.
- `components/Nav.tsx` — removes registry and console controls; supplies parent-company anchors and contact access.
- `components/sections/Footer.tsx` — removes catalogue counts and retired product links.
- `app/page.tsx`, `app/layout.tsx`, `app/globals.css`, `app/opengraph-image.tsx`, `app/sitemap.ts`, `app/robots.ts` — compose and describe only the new public experience.
- `tests/homepage.test.tsx` and test configuration — regression coverage for the public message, contact action, and absence of the retired catalogue.
- Remove `app/registry/`, `components/registry/`, `components/Console*.tsx`, `components/Terminal.tsx`, `components/CodeBlock.tsx`, `components/TermLink.tsx`, `components/SectionHeading.tsx`, `lib/console*`, `lib/registry.ts`, `lib/types.ts`, `lib/useTypewriter.ts`, `data/registry*.ts`, `data/stack.ts`, and `scripts/sync-registry.mjs` when no remaining import needs them.

### Task 1: Establish homepage regression coverage

**Files:**
- Modify: `package.json`
- Create: `vitest.config.mts`
- Create: `tests/setup.ts`
- Create: `tests/homepage.test.tsx`

**Interfaces:**
- Consumes: `app/page.tsx` default React component.
- Produces: `npm test` command that runs DOM tests under jsdom.

- [ ] **Step 1: Write the failing homepage behavior tests**

```tsx
import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

test("states Shua Labs' parent-company purpose", () => {
  render(<HomePage />);
  expect(screen.getByRole("heading", { name: /building what comes next/i })).toBeInTheDocument();
  expect(screen.getByText(/creates ventures, products, and systems for an ai-native world/i)).toBeInTheDocument();
});

test("offers a contact path and does not publish the retired catalogue", () => {
  render(<HomePage />);
  expect(screen.getAllByRole("link", { name: /start a conversation|contact/i }).length).toBeGreaterThan(0);
  expect(screen.queryByText(/browse the registry|public repos|mcp-sync|claude-max/i)).not.toBeInTheDocument();
});
```

- [ ] **Step 2: Configure Vitest and verify the test fails for the intended missing behavior**

Add `test: "vitest run"` to `package.json`, install `vitest`, `jsdom`, `@testing-library/react`, and `@testing-library/jest-dom` as development dependencies, and configure jsdom with the `@/` alias:

```ts
// vitest.config.mts
import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: { environment: "jsdom", setupFiles: ["./tests/setup.ts"] },
  resolve: { alias: { "@": path.resolve(__dirname, ".") } },
});
```

```ts
// tests/setup.ts
import "@testing-library/jest-dom/vitest";
```

Run: `npm test -- tests/homepage.test.tsx`

Expected: FAIL because the existing homepage does not contain the new heading or contact path.

- [ ] **Step 3: Commit**

Do not commit. The user has not authorized a commit.

### Task 2: Build the parent-company homepage

**Files:**
- Create: `data/company.ts`
- Create: `components/sections/VentureAreas.tsx`
- Create: `components/sections/Principles.tsx`
- Create: `components/sections/Founder.tsx`
- Modify: `components/sections/Hero.tsx`
- Modify: `components/Nav.tsx`
- Modify: `components/sections/Footer.tsx`
- Modify: `app/page.tsx`
- Test: `tests/homepage.test.tsx`

**Interfaces:**
- Consumes: `ventureAreas`, `principles`, and `founder` exported from `data/company.ts`.
- Produces: home anchors `#focus`, `#approach`, `#founder`, and `#contact`; the hero owns `id="top"`.

- [ ] **Step 1: Add the minimal parent-company content source**

```ts
export const ventureAreas = [
  { number: "01", title: "AI-native ventures", description: "Products that turn a new technical frontier into practical leverage." },
  { number: "02", title: "Developer systems", description: "Tools and platforms that help people build, reason, and move with more confidence." },
  { number: "03", title: "Digital infrastructure", description: "The durable technical foundations that let ambitious work survive contact with reality." },
] as const;

export const principles = ["Start close to the problem.", "Build real things.", "Compound what works.", "Share selectively."] as const;

export const founder = {
  name: "Josh Menzies",
  location: "New York",
  description: "Founder and builder working across product, engineering, and infrastructure to turn ambitious ideas into useful systems.",
  email: "mailto:jmenzies722@gmail.com",
} as const;
```

- [ ] **Step 2: Replace the current terminal-driven components with the required homepage sections**

Use semantic `section`, heading, link, and list elements. The hero must render the required headline/support line and a `#focus` primary anchor. `VentureAreas` maps `ventureAreas` as descriptive cards, without links to projects. `Principles` maps `principles`, then renders a plain “In formation” message. `Founder` renders the founder copy and an email contact link whose accessible name includes “Start a conversation.” Nav and footer must only link to the new anchors and contact URL; remove every registry count, console control, GitHub repository callout, and old `#work` link.

- [ ] **Step 3: Run the test to verify the implementation passes**

Run: `npm test -- tests/homepage.test.tsx`

Expected: PASS with both heading/purpose and contact/no-catalogue assertions green.

- [ ] **Step 4: Run static validation**

Run: `npm run typecheck && npm run build`

Expected: both commands exit 0.

- [ ] **Step 5: Commit**

Do not commit. The user has not authorized a commit.

### Task 3: Replace the visual system and public discovery artifacts

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`
- Modify: `app/opengraph-image.tsx`
- Modify: `app/sitemap.ts`
- Modify: `app/robots.ts`
- Delete: `app/registry/`
- Delete: legacy registry/terminal implementation files listed in File Structure
- Test: `tests/homepage.test.tsx`

**Interfaces:**
- Consumes: the completed homepage sections and the `metadataBase` deployment URL.
- Produces: a public route surface containing only `/`, with matching page, sitemap, robots, and OG language.

- [ ] **Step 1: Extend the failing test to cover discovery copy**

```tsx
import { metadata } from "@/app/layout";

test("publishes parent-company metadata", () => {
  expect(metadata.title).toContain("Building what comes next");
  expect(metadata.description).toMatch(/ventures, products, and systems/i);
});
```

- [ ] **Step 2: Verify it fails for the existing platform-engineering metadata**

Run: `npm test -- tests/homepage.test.tsx`

Expected: FAIL because the current title and description describe AI platform engineering and public installs.

- [ ] **Step 3: Implement the editorial visual system and matching discovery metadata**

Replace `app/globals.css` rather than retaining terminal utilities. Define reusable classes for the blue light field, display/sans typography, rounded content surfaces, and reduced-motion-safe reveal animation. Update page metadata and OG image copy to “Shua Labs — Building what comes next” and the approved support line. Make `sitemap.ts` return only the root URL; make `robots.ts` point to the same root deployment sitemap. Delete the old registry route and every now-unused registry/terminal module so neither build output nor sitemap exposes retired content.

- [ ] **Step 4: Run the complete verification cycle**

Run: `npm test && npm run typecheck && npm run build && rg -n -i 'mcp-sync|claude-max|browse the registry|public repos|installable today|AI platform engineering' app components data lib --glob '!data/registry.generated.ts'`

Expected: tests, type check, and build pass; `rg` returns no matches in the remaining public source directories.

- [ ] **Step 5: Commit**

Do not commit. The user has not authorized a commit.

### Task 4: Verify the deployed experience and update the Vercel project

**Files:**
- Modify only if the Vercel CLI reports an existing project-link configuration is required: `.vercel/project.json`

**Interfaces:**
- Consumes: a production build and the existing Vercel account/project authorization.
- Produces: the Vercel deployment URL serving the parent-company experience.

- [ ] **Step 1: Confirm the local production build exists**

Run: `test -d .next && npm run build`

Expected: `.next` exists and build exits 0.

- [ ] **Step 2: Inspect deployment linkage without changing remote state**

Run: `npx vercel whoami && npx vercel project ls`

Expected: the user’s Vercel identity and available project names are listed. If not authenticated or the intended project cannot be resolved, stop and ask the user to authenticate or name the project.

- [ ] **Step 3: Link and deploy only after the project is unambiguous**

Run: `npx vercel link --yes --project shua-labs && npx vercel --prod --yes`

Expected: Vercel reports one production URL. Do not run this command if it would create a new project instead of updating the existing one.

- [ ] **Step 4: Verify the deployed page and links**

Run: `curl -fsSI <production-url> && curl -fsS <production-url> | rg -i 'Building what comes next|ventures, products, and systems'`

Expected: HTTP 200 and both approved messages present in rendered response.

- [ ] **Step 5: Commit**

Do not commit. The user has not authorized a commit.

## Plan self-review

- **Spec coverage:** Tasks 2–3 cover every content, visual, responsive, accessibility, removal, metadata, sitemap, robots, and social-preview requirement. Task 4 covers Vercel linking and deploy verification.
- **Placeholder scan:** No TBD/TODO or deferred implementation statements are present; deployment explicitly stops on ambiguous Vercel linkage.
- **Type consistency:** `ventureAreas`, `principles`, and `founder` are defined once in `data/company.ts` and consumed only by the named section components.
