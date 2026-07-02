# Matching the User's Style

Bad-looking HTML is worse than good markdown. But "not bad" is not the bar — **intentional** is the bar. Most AI-generated artifacts fail not because they are ugly, but because they are *generic*: gradient cards, emoji headers, four shades of indigo, the default Tailwind aesthetic. A good artifact looks like someone with taste made it and someone real will read it. Use this reference when the user and workspace do not already provide a visual system; never let its fallback tokens override a higher-priority source.

## Four principles

1. **Restraint over decoration.** A calm typographic layout — real serif body, generous spacing, one or two restrained accent colors — beats a busy "dashboard" almost every time. If you're tempted to add a gradient, don't.
2. **Use real type.** Default the body to a real serif (Charter, Iowan, Source Serif, Tinos, system serif fallback) for documents and explainers. Sans-serif for tools and editors. 16–18px body, 60–75ch line length, 1.5–1.6 line height. These numbers are not negotiable; they're table stakes.
3. **Color carries meaning, not mood.** If a color appears in the artifact it should be doing work — severity, status, category, axis. If a color is there for vibe, remove it.
4. **No filler, no fake.** Never fabricate data, stats, testimonials, or logo walls. When an asset is missing, use a professional placeholder (`[icon]`, initial-letter circle, aspect-ratio image card with a label) rather than a poorly drawn SVG substitute or an emoji stand-in. A gap is more honest than a fake.

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

1. Point the agent at the user's codebase (Tailwind config, theme file, design tokens, CSS variables, any `theme.ts` / `colors.ts`).
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
  --accent:    #b97051;     /* accessible lighter terracotta for text and controls */
  --accent-2:  #d4916e;     /* large type, charts, and decoration only */
  --accent-soft:#f8ede5;     /* selected rows and small badges only */
  --warn:      #d97706;
  --danger:    #b91c1c;
  --ok:        #15803d;

  --serif: Charter, "Iowan Old Style", "Source Serif 4",
           ui-serif, Georgia, serif;
  --sans:  "Plus Jakarta Sans", "DM Sans", ui-sans-serif,
           system-ui, -apple-system, sans-serif;
  --mono:  ui-monospace, "JetBrains Mono", "SF Mono", Menlo, monospace;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg:       #0e0e12;
    --surface:  #16161c;
    --ink:      #f1f1f4;
    --ink-soft: #a8a8b3;
    --rule:     #2a2a32;
    --accent:   #e09e82;
    --accent-2: #ebb69e;
    --accent-soft:#44302c;
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

### Extending the palette with oklch

The baseline provides two accent tones. When an artifact needs more — chart data series, category tags, status badges — derive harmonious variants using `oklch()` rather than inventing new hex values:

```css
:root {
  --hue-base: 25;           /* terracotta hue ≈ 25 */
  --accent:      oklch(0.60 0.14 var(--hue-base));
  --accent-2:    oklch(0.70 0.14 var(--hue-base));
  /* Rotate hue for complementary tones, keeping L and C constant */
  --chart-a:     oklch(0.60 0.12 var(--hue-base));
  --chart-b:     oklch(0.60 0.12 calc(var(--hue-base) + 120));
  --chart-c:     oklch(0.60 0.12 calc(var(--hue-base) + 240));
}
```

The rule: **keep lightness (L) and chroma (C) constant, rotate hue (h)**. This guarantees perceptually even contrast across the set. Never invent new hues from scratch — derive them from the base.

## Typography: avoid the AI-overused stack

The fallback `--sans` variable deliberately avoids fonts that have become markers of AI-generated content. The following fonts are fine *if the user's brand already uses them*, but should never be the agent's *default* choice when no design system exists:

**Avoid as default:** Inter · Roboto · Arial · Helvetica · Fraunces · system-ui (alone)

**Preferred alternatives for sans-serif:**

| Font | Character | Use |
|---|---|---|
| Plus Jakarta Sans | Modern geometric, friendly | Headings and body |
| DM Sans | Clean humanist | General UI, body text |
| Space Grotesk | Technical, slightly quirky | Technical tools, dashboards |
| Outfit | Rounded geometric, approachable | Friendly product surfaces |
| Geist Sans | Neutral, Vercel's house font | Developer-facing tools |

**Preferred serif** (already in `--serif`): Charter · Iowan Old Style · Source Serif 4

If the user's codebase or brand already specifies Inter or Roboto, *use it* — brand consistency always beats font snobbery. The anti-overuse rule applies only when the agent is choosing a font with no external guidance.

Limit to **two font families** maximum in any artifact (one serif + one sans, or one sans + one mono). Three is the hard ceiling.

## Tools and editors get a different default

For editors and dashboards, switch the body to sans-serif and tighten the layout:

```css
body { font: 14px/1.4 var(--sans); max-width: none;
       margin: 0; padding: 1rem; }
```

Editors are tools. Tools should feel responsive and dense, not magazine-airy.

## Frontend-design plugin / skill

If the user has a `frontend-design` plugin or skill installed, defer to its conventions. It exists for exactly this purpose. Read it (likely `/mnt/skills/public/frontend-design/SKILL.md` or similar) before defaulting to the baseline above.

## 易混淆场景

**确定是本 reference 的信号：**
- 你要决定 HTML 制品的视觉风格——颜色、字体、间距、表面
- 用户没有提供设计系统，或提供了但需要你理解并应用
- 这是元层面的 guidance（怎么决定风格），不是具体某个制品的布局指导

**容易混淆的用法：**
- 把本 reference 当作唯一的"好样式"强制应用到所有制品 → 本 reference 是 fallback，排在用户要求和工作区设计系统之后
- 忽略本 reference 直接生成 → 这是最常见的问题——跳过视觉决议阶段，产出看起来是 AI 默认风格（渐变卡片 + emoji 标题 + 紫色）
- 在本 reference 的 fallback 基础上过度装饰 → 加阴影、渐变、emoji。fallback 的价值恰恰是克制

## Design red lines — the full anti-cliché blocklist

These are not suggestions. If the artifact exhibits any pattern from this list without an explicit user request, it is a defect.

### Layout traps

- Cards everywhere, with rounded corners and shadows, on a gray background.
- Repeating the same tinted card surface for comparisons, reports, diagrams, and reference entries.
- Centered everything.
- A header with a logo placeholder.
- Cookie-cutter gradient buttons paired with large-radius card combinations.
- Shadcn-shaped components when no shadcn library is needed.
- Rounded cards with a colored left-border accent as the only differentiator.

### Color & decoration traps

- A full-bleed gradient hero.
- Overuse of gradient backgrounds — especially purple-pink-blue.
- Four shades of indigo or violet doing nothing in particular.
- "Glass morphism," frosted blur, animated background gradients.
- Colors used for "vibe" rather than meaning.

### Content traps

- Emoji as section headers (📊 Analytics).
- Emoji as icon substitutes or decorative fillers — when the target brand does not use emoji.
- Meaningless stats, numbers, or icon spam ("data slop").
- Fabricated customer logo walls or fake testimonial counts.
- Drawing complex graphics with inline SVG when the asset does not exist — use a labeled placeholder instead.
- Filler paragraphs to fill space. Solve empty-page anxiety with layout (whitespace, proportion, type-size contrast), not by stuffing content.

### The restart rule

If the artifact has any **three** of the patterns above, restart from scratch. Isolated slips can be patched; systemic AI-default drift cannot.

## Visual quality gate

Before saving any HTML artifact, verify these items. They are the minimum bar, not the aspiration:

1. **No rogue colors.** Every color in the rendered output traces back to a declared CSS variable or the design system. No hardcoded hex that wasn't in the plan.
2. **No filler content.** Every heading, label, and paragraph says something the user asked for or genuinely needs. Placeholders are labeled as placeholders.
3. **No AI clichés.** Cross-check against the red-line list above.
4. **Semantic naming.** CSS classes and IDs describe function (`--chart-axis`, `.tier-card`), not appearance (`--blue-thing`, `.big-box`).
5. **All text readable.** No overflow, no truncation, no text on low-contrast backgrounds. `text-wrap: pretty` applied where available.
6. **Would you show this?** The visual quality should be at a level you'd share in a portfolio or design review — not "good enough for a prototype."

## What good looks like

Real publications, real product screenshots, real reference docs. Calm typography, restrained ink, two accent colors maximum, real diagrams instead of icon decoration. Things that look like *someone read them*, not like they were generated.

**Reference touchstones:**
- Stripe Press pages — editorial restraint at scale
- Bartosz Ciechanowski's interactive explainers — real diagrams, real interaction, no decoration
- The New York Times graphics desk — data carries meaning, not gradients
- Linear's changelog — clean product communication
- Vercel's documentation — dense information with good type
- Apple's product pages — photography-first, UI recedes
- Anthropic's claude.ai marketing — warm editorial voice, serif+sans pairing, cream canvas

None of these use emoji headers, purple gradients, or cards with left-border accents. Take the hint.
