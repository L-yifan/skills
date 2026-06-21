# Document-Bound Editors

Use this pattern when the user wants an HTML artifact to edit or reorganize an existing source document, config, prompt, or structured data file, then export a reviewable patch for an agent to apply.

This is Level 2 round-trip editing:

1. Source files remain the source of truth.
2. The HTML file is a visual editor and patch exporter.
3. The user edits in the browser.
4. The user copies patch JSON, markdown diff, or an agent instruction.
5. An agent applies the exported change to the real files.

The HTML must never write files directly, start a backend, call a hidden API, or promise automatic sync.

## Contents

- [When to use](#when-to-use)
- [Required behavior](#required-behavior)
- [Binding attributes](#binding-attributes)
- [Patch JSON schema](#patch-json-schema)
- [Inline-document editors](#inline-document-editors-full-document-mode)
- [Export formats](#markdown-diff-export)
- [Applying a pasted patch](#applying-a-pasted-patch)
- [Design guidance](#design-guidance)
- [Minimal HTML skeleton](#minimal-html-skeleton)

## When to use

Use a document-bound editor for requests like:

- "Make an HTML editor for `docs/plan.md` and let me update the Implementation Plan section."
- "Turn this JSON config into a form and export a patch for changed keys."
- "Let me reorder this roadmap visually, then copy a diff the agent can apply."
- "Build a prompt editor bound to `prompts/system.md` with live preview and patch export."
- "I want to edit this YAML policy through a safer UI and send the result back to Codex."

Do not use this pattern for ordinary reports, explainers, diagrams, or one-off editors that are not bound to a source file.

## Required behavior

Every document-bound editor must include:

- A visible source summary listing each bound file and what part of it is editable.
- Clearly marked editable regions or controls.
- A changed-state indicator, such as "3 changed fields" or "Roadmap section changed."
- Validation for obvious structural mistakes.
- Reset to original.
- `Copy Patch JSON`.
- `Copy Markdown Diff`.
- `Copy Agent Instruction`.
- Exact original state for every change: `originalText` for markdown or `originalValue` for JSON/YAML.

All export buttons must read from the same internal change state. Do not hand-write three separate output paths that can drift apart.

## Binding attributes

Use `data-*` attributes to make the binding readable to both humans and agents. Put artifact-level metadata on the top-level element:

```html
<main
  data-artifact-type="document-bound-editor"
  data-patch-version="1"
  data-source-files="docs/plan.md">
```

Mark editable regions or controls:

```html
<section
  contenteditable="true"
  data-source-file="docs/plan.md"
  data-bind-type="markdownHeading"
  data-bind-target="Implementation Plan"
  data-bind-level="2"
  data-bind-occurrence="1"
  data-change-id="implementation-plan">
  ...
</section>
```

For JSON:

```html
<input
  type="checkbox"
  data-source-file="config/flags.json"
  data-bind-type="jsonPointer"
  data-bind-target="/checkout/express/enabled"
  data-change-id="checkout-express-enabled">
```

For YAML:

```html
<textarea
  data-source-file="policies/release.yml"
  data-bind-type="yamlPath"
  data-bind-target="release.gates.manualApproval"
  data-change-id="manual-approval-gate"></textarea>
```

Prefer stable IDs, explicit paths, and visible labels. Markdown heading bindings must include a one-based `occurrence`; add `parentHeading` when the same heading can appear under different parents. If a source path or target section is unknown, ask for it rather than exporting an ambiguous patch.

## Patch JSON schema

`Copy Patch JSON` must produce this shape:

```json
{
  "artifactType": "document-bound-editor",
  "version": 1,
  "generatedAt": "2026-05-23T00:00:00.000Z",
  "sourceFiles": [
    {
      "path": "docs/plan.md",
      "kind": "markdown"
    }
  ],
  "changes": [
    {
      "id": "implementation-plan",
      "sourceFile": "docs/plan.md",
      "operation": "replaceMarkdownSection",
      "selector": {
        "heading": "Implementation Plan",
        "level": 2,
        "occurrence": 1
      },
      "originalText": "Exact original section text required for conflict checks.",
      "content": "Updated section content."
    }
  ]
}
```

Supported operations for v1:

- `replaceMarkdownSection`
- `replaceJsonPointer`
- `replaceYamlPath`

For markdown, `content` is the replacement section body and `originalText` is required. For JSON and YAML, `content` is the replacement value at the selected pointer or path and `originalValue` is required; either value may be a string, number, boolean, array, object, or `null`.

Keep `version: 1`. The additional selector fields are additive and existing v1 consumers may ignore them. Applying agents must compare the exact original state before editing. If it differs, stop and report a conflict instead of guessing or overwriting.

## Inline-document editors (full-document mode)

Some HTML artifacts embed the *entire content* of a source file into the page itself (e.g. a `<script type="application/json">` block or a JS string) rather than binding to individual sections. This is called **full-document mode**. Prefer section-level binding; use full-document mode only for bounded files.

In full-document mode, the `Copy Patch` export button **must produce a unified diff, not a full-content overwrite.** Inline `scripts/build-unified-diff.js` into the artifact. Do not reimplement the diff with a quadratic LCS matrix.

### Required implementation for full-document mode patch export

1. **Store the original content** at load time in a constant (e.g. `originalDocs`). Never mutate it.
2. **Store the working copy** in a separate mutable object (e.g. `documents`). The editor writes only to this copy.
3. **Call `buildUnifiedDiff` on export** with the original text, working text, and source path. The helper uses bounded Myers diff and emits hunks with five context lines by default.
4. **Handle every result status explicitly:**
   - `ok`: copy `result.diff`.
   - `unchanged`: show "No changes – nothing to export" and do not touch the clipboard.
   - `too-large`: explain that the file exceeds 200 KB or 2,000 lines and must use section-level binding.
   - `too-different`: explain that edit distance exceeded 1,000 and require a narrower editor.
5. **Never copy on a rejected status.** Leave the previous clipboard contents untouched.
6. **Wrap the diff in a machine-readable header** so the applying agent knows the target filename and intent:

```text
### AI AGENT SYNC INSTRUCTION ###
Apply the following unified diff patch to '<filename>' in the workspace.

```diff
--- a/<filename>
+++ b/<filename>
@@ -12,7 +12,7 @@
  context line
-old line
+new line
  context line
```
```

### What NOT to do in full-document mode

- ❌ `Action: Overwrite the target file content with the text below.` followed by the full document — this is the anti-pattern to avoid.
- ❌ Producing a diff only from the visible diff UI panel (it may be collapsed or stale).
- ❌ Computing the diff from `documents[key]` vs itself (always produces empty output).

The helper defaults are intentionally conservative: 200,000 UTF-8 bytes per document, 2,000 lines per document, edit distance 1,000, and five context lines. Override them only to make limits stricter.

## Markdown diff export

`Copy Markdown Diff` should be readable by a human. It does not need to be a perfect `git diff`, but it must show:

- source file path;
- target section, JSON pointer, or YAML path;
- before value or summary;
- after value;
- any validation warnings.

For markdown section edits, a simple format is enough:

```markdown
# Patch Preview

## docs/plan.md

### Replace section: Implementation Plan

Before:
...

After:
...
```

## Agent instruction export

`Copy Agent Instruction` should tell the next agent exactly what to do. For **section-level edits** (Patch JSON), use:

```text
Apply the following document-bound editor patch. Validate every originalText or originalValue against the current source. If a conflict is detected, stop and ask before editing. Do not make unrelated changes.

[paste patch JSON here]
```

For **full-document mode** (unified diff), use the format described in "Inline-document editors" above.

This export is for users who want the shortest path back into Codex or Claude Code.

## Applying a pasted patch

When a user later pastes a document-bound patch and asks you to apply it:

1. Read every referenced source file first.
2. Validate the operation names and selectors.
3. Require `originalText` or `originalValue` for every change and confirm it exactly matches the current source.
4. Apply only the requested changes.
5. Preserve formatting around the edited section when possible.
6. Summarize changed files and any conflicts.

Do not apply patches that reference files outside the user's intended workspace without asking.

## Design guidance

The editor should feel like a focused workbench, not a CMS. Show the thing being edited, the current state, and the export controls. Keep metadata visible but quiet.

Good patterns:

- Split view: source outline on the left, editable preview on the right.
- Form view: grouped fields for JSON/YAML with inline validation.
- Board view: drag cards, then export a markdown section replacement.
- Prompt view: editable template, variable controls, live rendered samples, patch export.

Avoid:

- Full-document WYSIWYG editing with no binding metadata.
- Hidden changes that only appear in the export.
- Automatic save claims.
- Backends, remote APIs, auth, or sync services.
- Turning the artifact into a long-term document management product.

## Minimal HTML skeleton

```html
<main data-artifact-type="document-bound-editor" data-patch-version="1">
  <header>
    <h1>Implementation Plan Editor</h1>
    <p>Edits the "Implementation Plan" section in docs/plan.md. Export a patch when ready.</p>
  </header>

  <aside>
    <h2>Source</h2>
    <p><code>docs/plan.md</code> -> heading level 2: Implementation Plan</p>
    <p id="change-count">No changes</p>
  </aside>

  <section
    id="implementation-plan"
    contenteditable="true"
    data-source-file="docs/plan.md"
    data-bind-type="markdownHeading"
    data-bind-target="Implementation Plan"
    data-bind-level="2"
    data-bind-occurrence="1"
    data-change-id="implementation-plan">
  </section>

  <footer>
    <button id="reset">Reset</button>
    <button id="copy-patch">Copy Patch JSON</button>
    <button id="copy-diff">Copy Markdown Diff</button>
    <button id="copy-instruction">Copy Agent Instruction</button>
  </footer>
</main>
```
