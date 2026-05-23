# Document-Bound Editors

Use this pattern when the user wants an HTML artifact to edit or reorganize an existing source document, config, prompt, or structured data file, then export a reviewable patch for an agent to apply.

This is Level 2 round-trip editing:

1. Source files remain the source of truth.
2. The HTML file is a visual editor and patch exporter.
3. The user edits in the browser.
4. The user copies patch JSON, markdown diff, or an agent instruction.
5. An agent applies the exported change to the real files.

The HTML must never write files directly, start a backend, call a hidden API, or promise automatic sync.

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

Prefer stable IDs, explicit paths, and visible labels. If a source path or target section is unknown, ask for it or export an agent instruction that clearly states the uncertainty.

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
        "level": 2
      },
      "originalText": "Optional exact original section text for conflict checks.",
      "content": "Updated section content."
    }
  ]
}
```

Supported operations for v1:

- `replaceMarkdownSection`
- `replaceJsonPointer`
- `replaceYamlPath`

Use `originalText` when practical. It gives the applying agent a conflict check: if the source file has changed since the HTML was generated, the agent should stop and ask before overwriting.

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

`Copy Agent Instruction` should tell the next agent exactly what to do:

```text
Apply the following document-bound editor patch. Validate that each source file still contains the original text when provided. If a conflict is detected, stop and ask before editing. Do not make unrelated changes.

[paste patch JSON here]
```

This export is for users who want the shortest path back into Codex or Claude Code.

## Applying a pasted patch

When a user later pastes a document-bound patch and asks you to apply it:

1. Read every referenced source file first.
2. Validate the operation names and selectors.
3. If `originalText` is present, confirm it still matches the current source.
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
