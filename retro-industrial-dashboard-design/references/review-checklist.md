# Review Checklist

Use this checklist before writing a formal `DESIGN.md` and when reviewing an existing design, screenshot, page, or implementation. Cite observable evidence for each conclusion. Do not modify artifacts during a review unless explicitly asked.

## 1. Evidence and decision readiness

- The inspected scope is limited to user references and target-page evidence.
- Product purpose and the page's primary task are known.
- Primary users and use context are known.
- Core data, states, and update behavior are known.
- Information density and viewing distance are known or safely constrained.
- Target devices, screen sizes, and responsive range are known.
- One dominant signature visual action is selected.
- Existing brand and interface constraints are recorded.
- Material unknowns are resolved; minor defaults are documented.

If a missing fact would change information architecture, visual direction, density, or target screens, stop formalization and ask one question.

## 2. Identity conformance

Evaluate every canonical condition in `style-dna.md`. Record a pass or failure with functional evidence, not stylistic assertion.

Confirm especially that:

- dot-matrix treatment carries core information rather than decoration;
- at least two instrument motif classes map to real data, state, time, threshold, or control behavior;
- technical-label typography is not misused for long-form reading;
- signal colors retain their operational meanings and have redundant non-color cues;
- a single action dominates the motion identity;
- light panels, dark text, density, grid, and material treatment form a coherent instrument system.

Classify the result:

- **Conformant:** every hard identity condition passes.
- **Derivative:** most DNA remains but one or more hard conditions are intentionally replaced.
- **Outside the system:** identity anchors are absent or merely decorative.

Do not use the canonical name for a derivative or outside design.

## 3. Information and data behavior

- The primary task is recognizable before secondary telemetry.
- Card size and grid span reflect information priority.
- Labels, values, units, timestamps, thresholds, and freshness are unambiguous.
- Precision matches the underlying data; no fake telemetry is presented as real.
- Charts use an appropriate encoding for comparison, trend, distribution, status, or progress.
- Scales, axes, baselines, legends, and empty/error states appear when needed.
- Live updates preserve reading position and do not cause layout shifts.
- Stale, loading, disconnected, partial, and unavailable data are distinguishable.

## 4. Interaction and motion

- Interactive regions look actionable without relying on hover alone.
- Default, hover, focus-visible, active, selected, disabled, loading, success, warning, and error states are defined where relevant.
- Keyboard order follows visual and task order.
- The signature action communicates meaningful system behavior.
- Supporting transitions remain subordinate and settle cleanly.
- Rapid values are smoothed without hiding meaningful spikes or thresholds.
- Reduced-motion behavior is specified.
- No critical information depends only on motion.

## 5. Responsive behavior

- Breakpoints follow content pressure, not device labels alone.
- Reflow preserves priority, reading order, units, and state context.
- Dense modules have defined compact alternatives rather than indiscriminate shrinking.
- Touch targets and spacing remain usable on compact screens.
- Charts define overflow, simplification, aggregation, or alternate views.
- The dominant visual action remains meaningful without consuming the viewport.

## 6. Accessibility

- Normal text, large text, controls, focus indicators, and essential graphics meet applicable WCAG contrast requirements.
- State is never communicated by green, orange, or red alone.
- Dot-matrix text remains legible at its rendered size and has an accessible text equivalent where necessary.
- Focus is visible against every relevant surface and state.
- Text resizing and zoom do not clip values, units, or controls.
- Screen-reader labels convey value, unit, status, freshness, and control purpose where relevant.
- Noise, scan effects, and animation do not reduce legibility or provoke discomfort.

## 7. DESIGN.md integrity

When a `DESIGN.md` is involved, verify against `design-md-contract.md`:

- only supported top-level YAML fields are introduced;
- required identity values match the conformance class;
- token values are precise and prose explains rationale and use;
- component tokens are genuinely component-specific;
- English headings appear once and in the required order;
- stable internal identifiers remain English;
- unknown existing content is preserved and marked unvalidated;
- formal and derivative identity are not conflated.

## Report format

Lead with one classification: **Conformant**, **Derivative**, **Outside the system**, or **Not ready for formalization**. Then report:

1. evidence supporting the classification;
2. hard identity or accessibility failures;
3. functional design issues;
4. optional polish;
5. unresolved decisions or format uncertainties.

For a brand conflict, present both “preserve canonical identity” and “adopt a named derivative” candidate directions, then wait for the user's decision.
