# Shua Labs brand system

Source of truth for agents and humans designing Shua Labs surfaces.

## Philosophy

Shua Labs is an independent AI lab, not a single SaaS product. The brand communicates:

**RESEARCH → BUILD → SHIP → LEARN → REPEAT**

Feel: intelligent, ambitious, technical, concise, confident, curious, transparent, builder-oriented.

Avoid: corporate jargon, fake enterprise language, exaggerated claims, purple AI clichés, invented traction.

## Positioning

Primary: **Shua Labs — Building what’s next with AI.**

Supporting: An independent AI lab building software, systems, and companies in public.

## Colors (tokens)

| Token | Value | Use |
| --- | --- | --- |
| `--bg` / `bg` | `#050505` | Near-black canvas |
| `--fg` / `fg` | `#f4f4f0` | Warm off-white |
| `fg-muted` | `#9a9a92` | Secondary body |
| `fg-subtle` | `#6a6a64` | Metadata |
| `--signal` / `signal` | `#c6ff3a` | Phosphor accent — sparse |
| `line` | `rgba(198, 255, 58, 0.12)` | Hairlines / grid |

Accent appears on status, labels, CTAs, and key metadata. Never flood backgrounds with phosphor.

## Typography

| Role | Family | Notes |
| --- | --- | --- |
| Display | Syne | Editorial headlines |
| Body | DM Sans | Primary UI copy |
| Mono | IBM Plex Mono | Timestamps, status, tags, technical labels |

Large headlines should feel editorial, not generic SaaS hero copy.

## Spacing & grid

- Site measure: `1120px` (`.site-shell`)
- Section padding: `.section-pad`
- Thin borders + generous whitespace
- Background grid (72px) is part of the visual language — keep it subtle

## Logo / wordmark

`Shua` + `Labs` with Labs in signal green when compact. Company is the brand; founder is secondary.

## Motion

- Fast, subtle, purposeful (Framer Motion)
- Respect `prefers-reduced-motion` — duration 0, no transforms
- Allowed: hero entrance, section reveal, status pulse, restrained hovers
- Forbidden: WebGL spectacle, endless loops for decoration

## Voice

Write like a competent founder explaining to another competent builder. Lead with the fact. No hype. Mark placeholders clearly (`PLACEHOLDER`, `not live`, `draft`).

## Social adaptation

Same type, grid, accent, and metadata system across web, YouTube, and Instagram.

### YouTube thumbnails

- Large 3–6 word headline
- Shua Labs mark
- Phosphor accent sparingly
- Episode/build number in mono
- Dark near-black field
- No glowing orbs, no stock faces by default

### Instagram formats

Reuse these labels:

- BUILD UPDATE
- ARCHITECTURE
- WHAT I LEARNED
- SHIPPED
- RESEARCH NOTE
- BEHIND THE BUILD

9:16 and 1:1 crops should still read as Shua Labs after removing surrounding UI.

## Anti-patterns (do not ship)

- Purple gradients / glassmorphism cards
- Fake logos, testimonials, or stats
- Generic SaaS pricing blocks
- Overcrowded heroes
- Cards for decoration (only for interaction when needed)
- Invented social follower counts or live channel links
