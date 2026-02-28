# Publication Figure Design Theory

This style guide is distilled from the figures4papers repository.

## Core style system

- Typography:
  - Preferred: `helvetica`-like sans-serif stacks.
  - Portable fallback: `['Arial', 'Helvetica', 'DejaVu Sans', 'sans-serif']`.
- Scale hierarchy:
  - Dense bar/comparison panels: `font.size=24`, `axes.linewidth=3`.
  - Compact analytical plots: `font.size=15-16`, `axes.linewidth=2`.
- Axis cleanup:
  - `axes.spines.right=False`
  - `axes.spines.top=False`
- Optional math typography:
  - `text.usetex=True` when TeX is needed and available.
- Vector text preservation:
  - `svg.fonttype='none'`.

## Export policy

- Default output: `dpi=300`.
- Dense bar panels: `dpi=600`.
- Layout finalization:
  - Prefer `tight_layout(pad=2)`.
- Keep white backgrounds and tight bounding boxes for publication exports.

## Palette semantics

- Blues:
  - `#0F4D92`, `#3775BA` for target/proposed methods.
- Greens:
  - `#DDF3DE`, `#AADCA9`, `#8BCF8B` for improvements.
- Reds:
  - `#F6CFCB`, `#E9A6A1`, `#B64342` for contrasts/ablations.
- Neutrals:
  - `#CFCECE`, `#767676`, `#4D4D4D`, `#272727` for baselines/support.
- Accents:
  - `#FFD700`, `#42949E`, `#9A4D8E` only for focused highlights.

## Composition logic

- Prefer ultra-wide canvases for multi-metric bars (`figsize` width around 3-4x height).
- Use dedicated legend panels for crowded multi-axis layouts.
- Hide dense category ticks when legend and titles already encode categories.
- Manually tighten y-limits to emphasize meaningful differences.
- Keep panel style consistent across multi-plot figures.

## Encoding conventions

- Bar charts:
  - Use black bar edges (`edgecolor='black'`, `linewidth=1.5-3`).
  - Annotate exact values above bars for key comparisons.
  - Use alpha ladders for ablation completeness.
  - Use hatch patterns for grayscale-safe separation.
- Trend charts:
  - Keep 2-4 curves per axis.
  - Use linewidth around `2-3`.
  - Add `fill_between` only when uncertainty needs to be shown.
- Scatter/illustration panels:
  - Reduce alpha for dense geometry.
  - Remove ticks for conceptual diagrams.

## Reproduction checklist

1. Disable top/right spines and keep legends frameless.
2. Use Helvetica/Arial-like sans fonts.
3. Apply semantic blue/green/red/neutral color mapping.
4. Finalize with tight layout and export at 300 dpi (or 600 for dense bars).
5. Prefer print-safe encodings (edge lines, hatches, direct value labels).
