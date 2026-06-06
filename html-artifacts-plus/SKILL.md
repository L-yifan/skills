---
name: html-artifacts-plus
description: Produce self-contained HTML artifacts instead of markdown when the request benefits from spatial layout, color, diagrams, interactivity, sharing, or a round-trip editor. Use this skill for substantial docs, writeups, plans, specs, reports, explainers, summaries, comparisons, reviews, PR descriptions, mockups, diagrams, flowcharts, decks, status updates, post-mortems, incident reports, playgrounds, one-off editors, and document-bound editors. Also use it when the user wants to edit an existing markdown, JSON, YAML, prompt, config, or planning document through an HTML tool and export a patch/diff/instruction for an agent to apply. Stay in markdown only for short conversational replies, code-only outputs, terminal-style command answers, and content that is genuinely just a few sentences.
---

> [!IMPORTANT]
> **PRE-REQUISITE DIRECTIVE FOR THE AGENT**: Before generating any HTML codebase or design, you **MUST** read and check `references/matching-your-style.md` first to fetch the default CSS baseline (margins, serif type, 70ch line limit) and avoid the AI-default visual traps.
> Additionally, if the workspace contains related reference documents, read them to align visual parameters.

# HTML Artifacts Plus

Markdown is the default agent output, but for many substantial deliverables it flattens the shape of the work. HTML can show comparisons side by side, render real diagrams, make hierarchy visible, add interaction, and give the user a shareable file they are more likely to read.

This skill is based on `dogum/html-artifacts` and keeps its core idea: choose HTML only when the format helps. The personal addition is a Level 2 document-bound editor mode: when the user wants to edit an existing source document or config through an HTML tool, generate a self-contained editor that exports a reviewable patch. The HTML never writes files directly; the agent applies the exported patch after the user sends it back.

## When to reach for HTML

Reach for HTML when any of the following is true:

- **Comparison.** Two or more options, approaches, designs, or tradeoffs need to be weighed against each other.
- **Spatial information.** Diffs, call graphs, module maps, flowcharts, timelines, before/after states, or workflows where position carries meaning.
- **Interaction matters.** Animations, parameter tuning, state transitions, sliders, toggles, sorting, filtering, or live previews.
- **Reference material.** A document the reader will navigate non-linearly with tabs, links, collapsible sections, or a glossary.
- **Color or hierarchy carries meaning.** Severity, status, syntax highlighting, design tokens, priority, ownership, or progress.
- **One-off editor.** The user needs to manipulate structured input and round-trip the result back into text, JSON, a prompt, or a commit.
- **Document-bound editor.** The user wants to update an existing file by editing a purpose-built HTML view, then export a patch for an agent to apply.
- **Sharing or handoff.** A spec, PR writeup, plan, report, or review needs to be easy for someone else to open and understand.
- **Length.** Anything that would become a long markdown wall, especially beyond roughly 100 lines.

The heuristic: if the user is going to do something with the document -- read it carefully, compare options, tune values, share it, refer back to it, hand it to another agent, or paste edits back in -- consider HTML.

## When to stay in markdown

Markdown still wins for:

- Short conversational replies inside chat.
- Code-only outputs such as a function, config block, or one-liner.
- Terminal or command-style answers.
- Quick summaries the reader will scan once and discard.
- Source files that humans will edit by hand and review in git as the primary artifact.

If the durable source of truth should be markdown, JSON, YAML, or code, keep that source file in that format. It is often still useful to generate an HTML view or editor beside it.

## Universal rules for every HTML artifact

Every artifact this skill produces must satisfy these rules:

1. **Single self-contained `.html` file.** No build step, bundler, or `npm install`. CSS goes in `<style>`, JS goes in `<script>`, and images are inline SVG or data URIs unless the user explicitly wants otherwise.
2. **Works offline.** Avoid required network calls at view time. If a CDN is used, keep it optional and explain the tradeoff.
3. **Mobile responsive.** Include `<meta name="viewport" content="width=device-width, initial-scale=1">` and make the layout usable on narrow screens.
4. **Real layout, not markdown with tags.** Use the canvas HTML gives you: columns for comparisons, timelines for time, rendered diffs for diffs, diagrams for flows, controls for state.
5. **Readable on its own.** Put a clear title and a short framing sentence at the top so the user understands the file within a few seconds.
6. **Tasteful by default.** Use restrained visual design, legible type, stable spacing, and the user's existing style when available. Avoid generic gradient-card aesthetics.
7. **Editors export back to text.** Any artifact where the user manipulates state must include an export path: copy as markdown, JSON, prompt, diff, CSV, or patch.
8. **Document-bound editors do not write files.** They export patch JSON, markdown diff, and agent instructions. The user sends the export to an agent, and the agent applies it to source files.
9. **Sync mechanisms for Read-only / Document-bound view.** Even if the HTML is requested as a read-only document-bound view (i.e. not actively showing an editor), it **MUST** still provide a 'Copy Markdown' or 'Copy Patch' export pathway in the toolbar to facilitate easy agent round-trip synchronization back to the workspace.
10. **Typographic baseline constraint.** Always default to a 60–75ch max-width constraint for body/prose, line-height 1.5–1.6, and clean typographic serif (e.g. Georgia) or sans-serif fonts. Never default to generic Tailwind dashboard-style cards with shadows/rounded-corners, emoji headers, or distracting gradient palettes. Refer to `references/matching-your-style.md` for specific tokens.

## Category index

Pick the matching reference file before drafting. If a request spans categories, read all relevant references.

| If the request is about... | Read... |
|---|---|
| Brainstorming options, side-by-side comparisons, implementation plans, exploring directions before committing | `references/exploration-and-planning.md` |
| Annotated diffs, PR writeups, code review, module maps, explaining code | `references/code-review-and-pr.md` |
| Design systems, component sheets, mockups, prototyping animations or interactions | `references/design-and-prototypes.md` |
| Inline SVG figures, flowcharts, architecture diagrams, technical illustrations | `references/diagrams-and-illustrations.md` |
| Status reports, incident timelines, post-mortems, concept explainers, feature deep-dives, learning material | `references/reports-and-research.md` |
| Slide decks and arrow-key presentations | `references/decks.md` |
| One-off custom editors: triage boards, flag toggles, prompt tuners, dataset curators | `references/custom-editors.md` |
| Editing existing markdown, JSON, YAML, prompt, config, or plan files through HTML and exporting a patch | `references/document-bound-editors.md` |
| Matching the user's existing visual style or design system | `references/matching-your-style.md` |

## Document-bound editor trigger

Use `references/document-bound-editors.md` only when the user explicitly wants the HTML tool to represent an existing source file or future file change. Good signals include:

- "edit this markdown/config/JSON/YAML/prompt through an HTML page"
- "update this document and export a patch"
- "make a tool page where I can change the plan and send the result back to the agent"
- "bind this UI to `docs/plan.md` / `config.json` / `prompts/system.md`"
- "copy diff", "copy patch", "agent can apply the changes"

Do not use document-bound mode just because an editor exports JSON. A ticket triage board or prompt tuner with no explicit source-file binding is a normal custom editor.

When building a document-bound editor, read `references/document-bound-editors.md` first. If a concrete pattern would help, inspect the small examples in `examples/`; they are reference shapes, not templates to copy blindly.

## Output mechanics

### In Claude Code

Save the file to the working directory with a descriptive `kebab-case` name and a `.html` extension. Examples: `onboarding-design-explorations.html`, `pr-streaming-review.html`, `cycle-14-triage.html`, `plan-section-editor.html`.

If the artifact is part of a web of related files, put them in a folder together. After saving, tell the user the path and, when appropriate, offer to open it in their browser.

For document-bound editors, also tell the user:

- which source files the editor is bound to;
- that the HTML does not save automatically;
- which export button to use when they are ready for the agent to apply changes.

### In Claude.ai

Use the artifact system and output a single HTML artifact (`text/html`) unless the request specifically calls for another artifact type. For Claude.ai artifacts, use in-memory state and avoid browser storage. For local Claude Code `.html` files, `localStorage` is acceptable for session recovery.

## Token cost and time

HTML costs more tokens and takes longer than markdown. That tradeoff is worth it when the artifact will be read, shared, compared, manipulated, or reused. Do not manufacture an HTML artifact for a disposable answer.

## What this skill is not

This skill is not "always answer in HTML." It is also not a document management system. It does not maintain indexes, lifecycle states, or automatic sync. It gives the user a better reading or editing surface, then exports the user's choices back into a format an agent can apply safely.
