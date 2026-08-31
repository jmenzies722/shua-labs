# Shua Labs brand system

Source of truth for agents and humans designing Shua Labs surfaces.

## Philosophy

Shua Labs is an independent AI lab, not a single SaaS product. The brand communicates:

**RESEARCH → BUILD → SHIP → LEARN → REPEAT**

Feel: calm, intelligent, document-like, concise, transparent, builder-oriented.

Avoid: neon accents, dark “AI lab” grids, purple gradients, fake traction.

## Positioning

Primary: **Shua Labs — Building what’s next with AI.**

Supporting: An independent AI lab building software, systems, and companies in public.

## Visual direction

**Notion-like monochrome.** Light canvas. Soft hierarchy. Content reads like a living company document.

| Token | Value | Use |
| --- | --- | --- |
| `--bg` | `#ffffff` | Page canvas |
| `--bg-panel` | `#f7f6f3` | Callouts / panels |
| `--fg` | `#37352f` | Primary ink |
| `fg-muted` | `#6f6e69` | Body secondary |
| `fg-subtle` | `#9b9a97` | Labels / metadata |
| `line` | `#e9e9e7` | Hairlines |
| `--hover` | `#efeee9` | Row / nav hover |

No chroma accents. Hierarchy from type weight, opacity, and space.

## Typography

| Role | Family | Notes |
| --- | --- | --- |
| UI / display | DM Sans | Same family — Notion-like calm |
| Mono | IBM Plex Mono | Sparse: dates, codes |

Headlines are document titles, not billboard ads. Site measure ~960px.

## Components

- Soft 6–8px radii
- Black primary buttons, outlined secondary
- List rows with hover wash (`.notion-row`)
- Soft panels (`.notion-panel`) instead of dark grid cards
- No background grid, no wireframe hero art

## Motion

Fast, subtle, restrained. Respect `prefers-reduced-motion`.

## Voice

Competent founder to competent builder. Empty is honest. Mark placeholders.

## Anti-patterns

- Dark neon lab skins
- Colored accents
- Fake logos / testimonials / stats
- Overcrowded heroes
- Invented live social links
