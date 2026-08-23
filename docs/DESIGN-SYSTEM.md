# BestAIAgent.in discovery design system

Source reference: the supplied five-page BestAIAgent website concept PDF. The visual system is adopted selectively; its unsupported scale, rating, traffic, funding, marketplace and verification claims are not part of the production content model.

## Design principles

1. **Dense discovery, quiet evidence.** The interface can feel rich and premium while factual claims remain conservative.
2. **Dark authority canvas.** Near-black navy backgrounds keep agent/category cards readable and let evidence-state colors carry meaning.
3. **One primary accent family.** Violet → blue → cyan is used for navigation focus, calls to action, icons and controlled glow.
4. **Cards are navigation objects.** Category, entity, guide and comparison cards share border/radius/hover behavior.
5. **Counts must be graph-derived.** Metric strips may only display values computed from the current public catalog/evidence graph.
6. **India is a first-class discovery surface.** India/Indic content receives dedicated visual hierarchy without inferring sovereignty, DPDP or data-residency status.

## Core color tokens

| Token | Value | Use |
|---|---|---|
| `--bg` | `#060812` | Primary page canvas |
| `--bg-deep` | `#04060d` | Browser/footer depth |
| `--bg2` | `#090d1c` | Alternate dark surface |
| `--panel` | `#0d1325` | Cards and evidence blocks |
| `--panel2` | `#10182d` | Elevated panels/buttons |
| `--panel3` | `#121b34` | Optional stronger elevation |
| `--line` | `#202b4d` | Primary 1px card/divider border |
| `--ink` | `#f7f8ff` | Main text |
| `--muted` | `#8e9abc` | Secondary/meta text |
| `--violet` | `#7c5cff` | Primary accent |
| `--violet2` | `#9b6cff` | Accent highlight |
| `--blue` | `#536dff` | CTA gradient |
| `--cyan` | `#37c7ff` | Secondary accent |
| `--green` | `#47d79a` | Verified/evidence-ready state |
| `--amber` | `#f2b85d` | Refreshing/pending state |
| `--rose` | `#fb7185` | Error/destructive state |

## Spacing rhythm

Use a compact 4/8-based rhythm:

- 3–5px: metadata/tag internals
- 7–10px: nav items, chip gaps, small card gaps
- 11–16px: card padding and input padding
- 18–24px: local section spacing
- 38–48px: main vertical section spacing
- 62–70px: header/hero scale

The interface should feel denser than a marketing landing page but less crowded than an admin dashboard.

## Radius and borders

- Small control radius: 8–11px
- Standard card radius: 16px
- Hero/premium panel radius: 18–20px
- Pills/tags: 999px
- Standard border: `1px solid var(--line)`
- Hover border: violet/blue at roughly 40–50% opacity

## Typography

- System/Inter-style sans serif stack.
- H1: responsive ~42–70px on discovery hero; 34–50px on directories/details.
- H2: ~27–40px.
- H3: ~18px.
- Body: 14px; lead: 16px.
- Eyebrows: 10px uppercase, ~0.13em letter spacing.
- Metadata/tags: 9–11px.

## Layout patterns

### Global header

- Sticky translucent dark header with blur.
- Compact two-line brand lockup.
- Centered desktop navigation.
- Search control plus one primary CTA.
- Mobile collapses primary nav before changing content hierarchy.

### Discovery hero

Two-column desktop layout:

- Left: India badge, kicker, H1, lead, trust chips, CTAs, live search.
- Right: CSS-rendered evidence/agent orbit graph. No decorative asset is required for correctness.
- Beneath: four-column metric strip sourced from the public graph.

### Category grid

- Desktop: five columns when content allows.
- Tablet: three columns.
- Mobile: two → one columns.
- Each card begins with a compact icon tile, then name and concise evidence-safe description.
- Do not display synthetic agent counts per category.

### Entity cards

- Shared dark gradient panel.
- 40px identity glyph.
- Entity type eyebrow.
- Canonical name and publisher/developer.
- Source-derived summary.
- Verification state and categories as pills.
- Hover may lift 2px and brighten border; do not use aggressive animation.

### Directory hero

Reusable for Agents, Models, Frameworks, Providers, Categories, Compare and Research:

- Eyebrow
- H1
- direct descriptive lead
- small metadata pills derived from real current data/policy

### India hub

- Premium two-column hero with violet/cyan radial glow.
- Real model/publisher counts only.
- Explicit trust copy clarifying that India relevance is not a compliance badge.
- Reuse normal entity cards for the actual model inventory.

### Authority-guide cards

Used for pricing, MCP, benchmark and glossary entry points:

- Guide type on left
- compact symbol on right
- H3 title
- short factual description
- canonical link

### CTA band

- Violet/navy gradient with restrained cyan radial highlight.
- One primary and at most one secondary action.
- Appropriate for methodology, comparison and discovery transitions.

### Footer

Four columns:

1. Brand + evidence doctrine
2. Platform navigation
3. Authority/editorial navigation
4. Machine-readable + legal surfaces

Footer claims must remain operationally true; no invented user/community/marketplace metrics.

## Evidence-state colors

- `verified`, `evidence-ready` → green
- `source-linked` → cyan
- `refreshing`, `pending` → amber
- `unknown` → muted gray-blue

Color never upgrades evidence state by itself; the catalog policy remains authoritative.

## Responsive rules

- `<1020px`: hide desktop nav; hero and India hub become one column; category grid becomes three columns.
- `<760px`: hide decorative orbit visual; entity grids become two columns; metric strip becomes 2×2; footer 2×2.
- `<520px`: single-column cards/footer; keep metric strip 2×2; hide secondary nav CTA where needed.

## Explicit non-migration from the concept PDF

Do **not** reproduce concept-only claims such as:

- 10,000+ AI agents
- 100+ categories unless the real graph reaches it
- 1M+ monthly searches
- 99.9% uptime unless independently measured and relevant
- 100% verified
- 50,000+ users/developers
- funding/GMV/revenue numbers
- ₹ marketplace pricing invented for sample agents
- star ratings/review counts without real review records
- marketplace hosting/security guarantees before those systems exist

The production design may look as polished as the concept while the content remains evidence-first.
