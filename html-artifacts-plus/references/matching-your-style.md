# Matching the User's Style

Bad-looking HTML is worse than good markdown. Most of the harm an HTML-artifact skill can do is producing generic-looking output: gradient cards, emoji headers, four shades of indigo, the default Tailwind aesthetic. Avoid that. Use this reference when the user and workspace do not already provide a visual system; never let its fallback tokens override a higher-priority source.

## Three rules of thumb

1. **Restraint over decoration.** A calm typographic layout — system serif body, generous spacing, one or two restrained accent colors — beats a busy "dashboard" almost every time. If you're tempted to add a gradient, don't.
2. **Use real type.** Default the body to a real serif (Charter, Iowan, Source Serif, Tinos, system serif fallback) for documents and explainers. Sans-serif (Inter, system-ui) for tools and editors. 16–18px body, 60–75ch line length, 1.5–1.6 line height. These numbers are not negotiable; they're table stakes.
3. **Color carries meaning, not mood.** If a color appears in the artifact it should be doing work — severity, status, category, axis. If a color is there for vibe, remove it.

## Resolve style before drawing

Use the first available source in this order:

1. The user's explicit visual request.
2. The product or workspace design system.
3. The content's semantic needs.
4. The neutral warm fallback below.

Treat any sample artifact as evidence about structure, not as a visual theme. Learn its comparison grammar, navigation, diagrams, or export behavior without copying its palette or repeating the same card treatment across unrelated artifacts.

## The design-system-from-codebase trick

When the user has an existing visual identity (a deployed product, a brand, a codebase), don't invent one. Build a one-time **design system reference HTML file** by reading the codebase, then have it sit alongside future artifacts as input.

The flow:

1. Point Claude at the user's codebase (Tailwind config, theme file, design tokens, CSS variables, any `theme.ts` / `colors.ts`).
2. Generate `design-system.html` — color swatches with hex/token name, type scale specimens, spacing/radius/shadow examples. (See `design-and-prototypes.md` for the layout.)
3. Save it somewhere it can be reused: project root, `.claude/` folder, wherever fits.
4. For every subsequent HTML artifact, read `design-system.html` first, then use those tokens as the artifact's CSS variables.

This is one-time work that pays off across every future artifact. Suggest it the first time the user asks for an HTML artifact in a project that has a real design system.

## When there's no existing system: the safe default

Use this baseline if the user hasn't specified anything and there's no codebase to read:

```css
:root {
  /* Neutral, calm, works in light and dark */
  --bg:        #fafaf7;
  --surface:   #ffffff;
  --ink:       #1a1a1f;
  --ink-soft:  #555560;
  --rule:      #e7e5df;
  --accent:    #a9583e;     /* accessible terracotta for text and controls */
  --accent-2:  #cc785c;     /* large type, charts, and decoration only */
  --accent-soft:#f5e4dc;     /* selected rows and small badges only */
  --warn:      #d97706;
  --danger:    #b91c1c;
  --ok:        #15803d;

  --serif: Charter, "Iowan Old Style", "Source Serif 4",
           ui-serif, Georgia, serif;
  --sans:  Inter, ui-sans-serif, system-ui, -apple-system, sans-serif;
  --mono:  ui-monospace, "JetBrains Mono", "SF Mono", Menlo, monospace;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg:       #0e0e12;
    --surface:  #16161c;
    --ink:      #f1f1f4;
    --ink-soft: #a8a8b3;
    --rule:     #2a2a32;
    --accent:   #d98a6e;
    --accent-2: #e6a088;
    --accent-soft:#3a2722;
  }
}

html { background: var(--bg); color: var(--ink); }
body { font: 17px/1.55 var(--serif); max-width: 70ch;
       margin: 4rem auto; padding: 0 1.25rem; }
h1 { font-size: 2.2rem; line-height: 1.15; letter-spacing: -.01em; }
h2 { font-size: 1.4rem; margin-top: 2.4em; }
code, pre { font-family: var(--mono); font-size: .92em; }
pre { background: var(--surface); border: 1px solid var(--rule);
      padding: 1rem; border-radius: 4px; overflow-x: auto; }
table { border-collapse: collapse; width: 100%; }
th, td { padding: .5rem .75rem; border-bottom: 1px solid var(--rule);
         text-align: left; vertical-align: top; }
```

That's enough to make a document that looks deliberate. Add complexity only when the artifact actually needs it — sliders, color swatches, charts, etc.

This fallback borrows the upstream project's whitespace, typographic hierarchy, white surfaces, and hairline rules, but intentionally replaces the upstream purple `#7c3aed` with a warm terracotta family. Do not reintroduce purple as a default theme.

### Surface discipline

- Keep the page on `--bg` and reserve `--surface` for regions that genuinely need containment.
- Prefer whitespace, alignment, indentation, and `--rule` separators over filled cards.
- Do not place two consecutive bands of tinted cards on a document page.
- `--accent` is safe for links, focus rings, key paths, recommendations, and primary buttons.
- `--accent-2` is not small body text; use it for larger marks, chart emphasis, or decoration.
- `--accent-soft` is a local state treatment, never a full section background.
- Success, warning, and danger retain their own semantic colors. Terracotta is not a warning color.

## Tools and editors get a different default

For editors and dashboards, switch the body to sans-serif and tighten the layout:

```css
body { font: 14px/1.4 var(--sans); max-width: none;
       margin: 0; padding: 1rem; }
```

Editors are tools. Tools should feel responsive and dense, not magazine-airy.

## Frontend-design plugin / skill

If the user has a `frontend-design` plugin or skill installed, defer to its conventions. It exists for exactly this purpose. Read it (likely `/mnt/skills/public/frontend-design/SKILL.md` or similar) before defaulting to the baseline above.

## What "AI default look" feels like — avoid

A shorthand list of the things to *not* default to:

- Cards everywhere, with rounded corners and shadows, on a gray background.
- Repeating the same tinted card surface for comparisons, reports, diagrams, and reference entries.
- A full-bleed gradient hero.
- Emoji as section headers (📊 Analytics).
- Four shades of indigo or violet doing nothing in particular.
- Shadcn-shaped components when no shadcn library is needed.
- "Glass morphism," frosted blur, animated background gradients.
- Centered everything.
- A header with a logo placeholder.

If the artifact has any three of those, restart.

## What good looks like

Real publications, real product screenshots, real reference docs. Calm typography, restrained ink, two accent colors maximum, real diagrams instead of icon decoration. Stripe Press pages. Ben Frain's writing. Bartosz Ciechanowski's explainers. The New York Times graphics desk. The OEIS. Things that look like *someone read them*, not like they were generated.
