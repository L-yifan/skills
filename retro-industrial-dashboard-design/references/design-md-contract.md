# DESIGN.md Contract

## Baseline

- Official specification: **Google Labs Code DESIGN.md Format**
- Official source: <https://github.com/google-labs-code/design.md/blob/main/docs/spec.md>
- Checked: **2026-07-28**
- Format status at check time: **alpha**

This is a concise offline baseline, not a replacement for the official specification. Use it for routine generation and review. Consult the official source only under the format-drift conditions in `SKILL.md`.

## Document model

A `DESIGN.md` is a self-contained plain-text design-system artifact with:

1. YAML frontmatter containing machine-readable normative tokens.
2. Markdown sections explaining design intent, use, and constraints.

Exact token values are authoritative. Prose explains why and when to apply them. Keep the document framework-independent and suitable for different agents and technology stacks.

## Supported frontmatter

Use only these top-level fields from the checked open specification:

```yaml
version: <string>                    # optional; alpha at baseline
name: <string>
description: <string>                # optional
omitted: <string[]|OmittedSection[]> # optional
colors:
  <token-name>: <valid-css-color>
typography:
  <token-name>:
    fontFamily: <string>
    fontSize: <dimension>
    fontWeight: <number|string>
    lineHeight: <dimension|number>
    letterSpacing: <dimension>
    fontFeature: <string>
    fontVariation: <string>
spacing:
  <scale-level>: <dimension|number>
rounded:
  <scale-level>: <dimension>
components:
  <component-name>:
    <token-name>: <string|token-reference>
```

Omit optional typography properties that are not needed. Valid dimensions use `px`, `em`, or `rem`. Prefer `#RRGGBB` colors for portability, though any valid CSS color is allowed. Reference tokens with `{path.to.token}`. A component token may reference a composite typography value.

Do not add private top-level groups such as `designSystem`, `motion`, `grid`, or `dataVisualization`. Map values by meaning:

- interface, state, and chart colors → `colors`;
- font roles, data sizes, weights, and tracking → `typography`;
- spacing, gutters, margins, breakpoint dimensions, and grid column counts → `spacing`;
- corner-radius scales → `rounded`;
- exact values tied directly to a component or component state → `components`.

Do not turn `components` into a miscellaneous container. Keep global motion, hierarchy, refresh, reflow, and accessibility rules in Markdown when they do not map naturally to a standard token group.

Use `omitted` only for intentionally irrelevant standard token groups, with a reason when useful. Never use it to hide an unfinished design decision.

## Canonical identity

For a conformant project, use these exact identity values:

```yaml
version: alpha
name: Retro Industrial Dot-Matrix
description: "Uses the retro-industrial-dot-matrix design system for a project-specific dashboard interface."
```

Identity recognition:

- Exact `name: Retro Industrial Dot-Matrix` is the primary canonical signal.
- The full `retro-industrial-dot-matrix` string in `description` is the machine-searchable cross-check.
- Overview must state that the project adopts this system and explain project-specific adaptation.
- Isolated terms such as `industrial`, `retro`, or `dot-matrix` do not declare identity.
- `version` describes the open DESIGN.md format, not the skill or visual-system version.

For a derivative:

- Use a project-specific `name`, never the canonical name.
- Include this exact sentence in `description`: `Derived from the retro-industrial-dot-matrix design system; not fully conformant with the canonical system.`
- List each replaced or unmet identity condition in Overview.

## Markdown section order

Use stable English `##` headings in this order:

1. `Overview`
2. `Colors`
3. `Typography`
4. `Layout`
5. `Elevation & Depth`
6. `Shapes`
7. `Components`
8. `Data Visualization`
9. `Information Hierarchy`
10. `Motion & Live Data`
11. `Interaction States`
12. `Responsive Dashboard Grid`
13. `Accessibility`
14. `Do's and Don'ts`

The first seven and final guardrail section follow the checked standard vocabulary; the dashboard sections are compatible unknown Markdown sections that consumers should preserve. Do not duplicate headings. An optional document-title `#` heading may precede them.

## Language and naming

- Keep YAML keys, token names, component IDs, state IDs, CSS variables, system identity, and all section headings in English.
- Write explanatory prose in the user's requested language; otherwise use the project's primary language, then English if unknown.
- Keep token and component references unchanged inside non-English prose.
- Localize user-facing interface copy independently from internal names; for example, keep `status-warning` internally while displaying “注意”.
- For bilingual documentation, retain one English identifier namespace rather than parallel translated tokens.

## Unknown content and updates

When an existing file contains fields, sections, or value types outside this baseline:

- Preserve them during reading and review.
- Mark them as not validated by this skill's current baseline.
- Do not infer semantics, delete them, or migrate them automatically.
- Check the official source only under the agreed format-drift triggers.
- If unknown content conflicts directly with the requested operation, pause and ask for direction.
