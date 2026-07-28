# Retro Industrial Dot-Matrix Style DNA

This reference defines the canonical visual identity, its project-variable range, and the conformance boundary. Apply every visual device functionally rather than as a decorative checklist.

## Canonical identity

A conformant design must satisfy all of these conditions:

1. **Instrument semantics:** Make the interface read as a retro-industrial instrument, laboratory console, vintage radio, or telemetry terminal rather than a generic card dashboard with retro decoration.
2. **Core dot-matrix role:** Use dot-matrix rendering for at least one core information role: key data, time, state, or a primary data graphic. Background texture or ornament alone does not qualify.
3. **Light panel structure:** Build the primary surface from near-white instrument panels with near-black text. Adjust exact values for accessibility and display conditions without losing the light-panel identity.
4. **Technical label system:** Use monospaced, uppercase, generously tracked typography for technical labels, states, units, and short headings. Do not apply it to long prose, error explanations, or frequent reading.
5. **Controlled signal semantics:** Reserve green for normal or operational states, orange for attention or transitional states, and red for abnormal or critical states. Never rely on color alone; pair it with text, icon, shape, or pattern.
6. **Scannable density:** Present dense information through clear priority, alignment, grouping, units, and stable positions. Density must not become visual noise.
7. **Modular Bento grid:** Compose differently sized instrument modules on a coherent grid. Card spans must reflect information priority, not random visual variety.
8. **Restrained material:** Use fine borders, shallow shadows, and optional low-opacity noise to suggest physical panels without skeuomorphic excess.
9. **Functional instrument motifs:** Connect at least two motif classes to real data, state, or control behavior: waveform, calibrated scale, segmented bar, needle, dot matrix, dial, focus ring, or similar instrument language.
10. **Quiet live feedback:** Make live values continuous, smooth, and restrained. Communicate change without causing constant competition for attention.
11. **One signature action:** Select only one dominant dynamic memory point. Supporting hover, focus, value-update, and state-feedback micro-motion remains allowed when subordinate.

## Project-variable ranges

Choose exact values per project and record them in `DESIGN.md`.

### Color and material

- Keep primary backgrounds and panels perceptually near white, normally within light neutral or subtly tinted neutral families. Avoid pure glare when long monitoring sessions are expected.
- Keep primary text perceptually near black. Meet at least WCAG AA contrast for text and essential graphical objects; prefer stronger contrast for small telemetry labels.
- Use green, orange, and red sparsely and semantically. A signal color may highlight a reading, indicator, boundary, or state control, but must not flood large surfaces without operational meaning.
- Use 1px borders by default; use 2px only for selected, focused, critical, or structurally important boundaries.
- Keep ambient noise subtle, normally around 1–4% effective opacity, and exclude it from dense text and precision graphics.
- Keep shadows shallow and low contrast. Prefer border, tonal separation, and spacing over floating-card depth.

### Typography

- Use a legible monospaced face for labels, telemetry, units, and compact controls. Use a dot-matrix face or rendering method only where the content size and role preserve legibility.
- Keep compact technical labels typically within 10–14px and tracking around `0.08em–0.18em`; raise size or reduce tracking when accessibility requires it.
- Allow key data displays to scale broadly, commonly 24–96px, according to panel priority and viewing distance.
- Use readable sentence case for explanatory copy, alerts, and help text, typically 14–18px with comfortable line height.
- Limit a screen to a disciplined type hierarchy. Font names may vary, but the role separation must remain visible.

### Spacing, shapes, and grid

- Base spacing on a 4px micro-step with an 8px primary rhythm, unless an existing brand system supplies a compatible scale.
- Keep dashboard gaps commonly within 8–24px and card padding within 12–32px. Select denser values only when the target screen and viewing distance support them.
- Keep ordinary panel radii within 0–16px. Prefer a restrained 2–12px range for engineered surfaces; reserve full rounding for toggles, indicators, pills, or circular instruments.
- Use a responsive Bento grid appropriate to content: commonly 4–12 columns on large screens, 4–8 on intermediate screens, and 1–4 on compact screens. Preserve priority and reading order when spans collapse.
- Align labels, values, units, baselines, and calibration marks rigorously. Controlled asymmetry may add character but must not disturb scanning.

### Motion and live data

- Choose a single dominant action such as a tuner needle settling, a dot-matrix sequence, a waveform sweep, a countdown ring, or a segmented meter response.
- Keep ordinary interaction transitions generally within 120–300ms and use easing that settles cleanly.
- Smooth live updates enough to remain readable; choose the exact sampling and interpolation from the data meaning rather than inventing universal timing.
- Pause, reduce, or replace nonessential motion for `prefers-reduced-motion`. Never encode a critical state only through animation.

## Combination rules

- Pair expressive dot-matrix content with quieter surrounding typography; do not set the whole interface in a novelty display face.
- If the grid is very dense, reduce material texture, shadow, and motion intensity.
- If the signature action is visually large, keep live micro-animation elsewhere nearly static.
- If the panel radius is soft, keep borders, typography, and instrumentation precise enough to retain the engineered character.
- If brand colors appear, keep the operational green/orange/red roles distinct and documented. Do not reuse those signal colors decoratively.
- Pair every instrument motif with a value, threshold, trend, timebase, state, or direct manipulation. Remove motifs that cannot explain their function.
- Pair every color-coded state with a redundant label, icon, geometry, or pattern.

## Anti-patterns

- A generic SaaS dashboard with a dot texture pasted behind it.
- Every card using a different dial, waveform, matrix, and animation.
- Fake telemetry or arbitrary fluctuating numbers presented as real data.
- Full uppercase monospaced paragraphs.
- Neon green, orange, or red used as decoration without status meaning.
- Heavy glassmorphism, deep shadows, or glossy 3D surfaces that displace the light instrument-panel identity.
- Motion that constantly resets, flashes, jitters, or competes with reading.
- Random Bento spans unrelated to task priority.

## Conformance classes

### Conformant

All canonical identity conditions are met, functional, and accessible. Use the canonical DESIGN.md identity.

### Derivative

Most style DNA remains, but one or more hard conditions are replaced because of brand or product constraints. Use a project-specific design-system name, declare derivation in `description`, and enumerate replaced or unmet conditions in Overview.

### Outside the system

Classify a design outside the system when identity anchors such as the core dot-matrix role, industrial instrument semantics, or primary light-panel structure are absent. Scattered words such as “retro,” “industrial,” or “dot-matrix” do not establish identity.
