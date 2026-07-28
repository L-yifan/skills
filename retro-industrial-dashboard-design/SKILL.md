---
name: retro-industrial-dashboard-design
description: Define, document, review, or implement the Retro Industrial Dot-Matrix visual system for dashboard interfaces. Use when the user explicitly invokes this skill; explicitly requests a retro-industrial, dot-matrix display, laboratory console, instrument panel, vintage radio, Glyph, or industrial telemetry terminal direction; supplies references with those traits and asks to reproduce, continue, or extract their design language; asks to continue a DESIGN.md whose name and description identify the retro-industrial-dot-matrix system; or the current project's DESIGN.md explicitly declares that identity. Do not trigger from generic requests for a dashboard, data panel, admin interface, or BI screen alone.
---

# Retro Industrial Dashboard Design

Create a project-specific dashboard design system with a recognizable retro-industrial dot-matrix identity. Keep design guidance framework-independent, produce code only when explicitly requested, and treat a compliant `DESIGN.md` as the durable project handoff when authorized.

## Load the right references

- Read [references/style-dna.md](references/style-dna.md) before proposing, formalizing, implementing, or reviewing a visual direction.
- Read [references/design-md-contract.md](references/design-md-contract.md) whenever reading, generating, updating, validating, or identifying a `DESIGN.md`.
- Read [references/review-checklist.md](references/review-checklist.md) for a formal design-system conformance review or before writing a formal `DESIGN.md`.

## Establish the task mode

Classify the request before acting:

- **Discovery:** inspect relevant project evidence and resolve material design decisions.
- **Candidate design:** present a discussable direction based on confirmed facts and explicitly listed assumptions; do not write files.
- **Formal design specification:** produce a fully decided design system and, only with file-writing authorization, write `DESIGN.md`.
- **Implementation:** translate an accepted design specification into code only when the user explicitly asks for implementation.
- **Review:** inspect an existing design, screenshot, page, or `DESIGN.md`; report conformance and actionable deviations. Do not modify files unless asked.

Words such as “direction,” “proposal,” “recommendation,” “candidate,” or “draft” authorize conversational output only. Words such as “generate,” “create,” or “write `DESIGN.md`” authorize file creation after discovery and conformance checks. “Update,” “sync,” or “modify” authorize an incremental edit that preserves unrelated content. Only “overwrite,” “rebuild,” or “replace” authorize whole-file replacement after confirming identity and exact path.

Generating or updating `DESIGN.md` never implies authorization to implement the interface.

## Run focused discovery

Keep discovery lightweight, relevant, and read-only. Inspect in this order:

1. User-provided references, pages, design files, and requirements.
2. An existing `DESIGN.md` that declares this system or a derivative identity.
3. Components, styles, themes, and tokens directly related to the target page.
4. The project entry point, technology stack, and existing screenshots when they affect the design deliverable.

Do not scan the whole repository by default or read unrelated business modules. Extract facts available from the environment instead of asking the user.

Before producing a formal specification, establish:

- the product purpose and page's primary task;
- primary users and usage context;
- core data and state types;
- intended information density;
- target devices, screen sizes, and responsive range;
- one dominant signature visual action;
- existing brand or interface constraints that must remain.

Ask only when missing information would materially alter information architecture, visual direction, density, layout tokens, or target screens. Ask exactly one decisive question per message, then wait for the answer before asking the next. Never bundle multiple unanswered decisions into one question or closing paragraph. Use constrained defaults for minor gaps and record the decision. If the user requests a fast start, produce a candidate design with visible assumptions; do not present it as formal.

## Develop the visual system

Use the fixed identity and project-variable rules in `style-dna.md`.

1. Translate product purpose and data behavior into an information hierarchy.
2. Choose exactly one dominant signature visual action. Necessary hover, focus, value-update, and state-feedback micro-motion may support it without becoming competing memory points.
3. Select project-specific colors, typography, spacing, radii, grid, and component values within the allowed ranges and combination rules.
4. Tie dot-matrix treatment and at least two instrument motifs to real information, state, or control behavior.
5. Define redundant non-color state cues and accessibility constraints alongside aesthetics.
6. Explain why each choice exists and when to use it; make exact token values normative.

Do not fill a dashboard with every available instrument motif. Do not use decorative telemetry, meaningless waveforms, or fake precision merely to satisfy the style.

## Produce candidate output

Keep a candidate in the conversation unless the user grants write authorization. Include:

- confirmed context and explicit assumptions;
- the proposed identity and emotional tone;
- information hierarchy and grid direction;
- proposed token ranges or candidate values;
- the single signature visual action;
- functional dot-matrix and instrument mappings;
- major interaction, live-data, responsive, and accessibility decisions;
- the single highest-dependency unresolved decision, framed as one question; hold later questions until the user answers.

## Produce or maintain DESIGN.md

Follow `design-md-contract.md`. Before writing, run the checklist in `review-checklist.md` and classify the result as conformant, derivative, or outside the system.

Resolve the target path as follows:

- Use an explicit user path exactly.
- If there is one unambiguous project root and no path is given, use `<project-root>/DESIGN.md`.
- If multiple workspaces, candidate files, or roots exist, ask which path to use.
- Never create both root `DESIGN.md` and `.stitch/DESIGN.md` automatically.

For an existing file:

- Read and identify it before editing.
- Preserve the canonical identity when it is conformant.
- Preserve derivative identity; never silently relabel it canonical.
- Do not overwrite or merge an unrelated design system.
- Treat uncertain identity as no write authorization and ask for direction.

Keep stable English YAML keys, token names, component identifiers, state identifiers, section headings, CSS variables, and system identity. Write explanatory prose in the language explicitly requested; otherwise use the project's primary language, then English if still unknown. Localize end-user interface copy separately from internal identifiers. Maintain one English token namespace even in bilingual documentation.

## Handle brand conflicts

Never silently weaken a hard identity condition while retaining the canonical name. When a brand or product constraint conflicts with the system:

1. State the conflicting requirement and affected identity condition.
2. Present two candidate directions: preserve canonical identity, or adopt a clearly named derivative.
3. Wait for the user to choose before producing a formal `DESIGN.md`.
4. For a derivative, use a project-specific `name`, the required derivative wording in `description`, and list replaced or unmet conditions in Overview.

## Implement only on request

When explicitly asked to implement, treat the accepted `DESIGN.md` or confirmed candidate as the design authority. Map tokens into the project's native theme or variables without renaming the stable semantic roles. Preserve existing architecture and unrelated code. If implementation constraints contradict the design authority, report the conflict rather than silently redesigning.

## Review without modifying

Use `review-checklist.md` to evaluate screenshots, pages, components, or documents. Lead with the conformance classification and evidence. Separate hard identity failures, functional or accessibility failures, and optional polish. Do not turn a review request into implementation.

## Handle format drift conservatively

Use the bundled format contract offline by default. Check the official source only when the user requests latest compatibility, a file contains unrecognized fields or value types, the user asks for migration, or an official validator disagrees with the bundled rules.

When checking online, use only the official specification, repository, or releases. Report the baseline-to-current differences and practical impact before suggesting migration. Preserve unknown content, mark it unvalidated, and do not reinterpret, delete, migrate, install tools, update this skill, or rewrite files without explicit authorization.
