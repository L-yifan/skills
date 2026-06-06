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

For markdown, `content` is the replacement section body. For JSON and YAML, `content` is the replacement value at the selected pointer or path, and may be a string, number, boolean, array, or object.

Use `originalText` when practical for markdown, and `originalValue` when practical for JSON/YAML. These give the applying agent a conflict check: if the source file has changed since the HTML was generated, the agent should stop and ask before overwriting.

## Inline-document editors (full-document mode)

Some HTML artifacts embed the *entire content* of a source file into the page itself (e.g. a `<script type="application/json">` block or a JS string) rather than binding to individual sections. This is called **full-document mode**.

In full-document mode, the `Copy Patch` export button **must produce a unified diff, not a full-content overwrite.** Exporting the entire file content as an agent instruction is a correctness anti-pattern: it forces the agent to replace megabytes of text for trivial edits, wastes context tokens, and makes conflict detection impossible.

### Required implementation for full-document mode patch export

1. **Store the original content** at load time in a constant (e.g. `originalDocs`). Never mutate this.
2. **Store the working copy** in a separate mutable object (e.g. `documents`). The editor writes to this.
3. **Compute a unified diff** between `originalDocs[key]` and `documents[key]` when the user clicks the export button. Use a line-level LCS algorithm. Render only the changed hunks with `±5` lines of context (`-U5` equivalent).
4. **Guard the empty-diff case.** If the two texts are identical, show a toast ("No changes – nothing to export") and return without writing to the clipboard.
5. **Wrap the diff in a machine-readable header** so the applying agent knows the target filename and intent:

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

### Reference implementation

The `buildUnifiedDiff(oldText, newText, filename, contextLines)` helper below satisfies all of the above requirements. Copy it into your artifact when implementing full-document mode:

```js
function buildUnifiedDiff(oldText, newText, filename, context) {
    const oldLines = oldText.split('\n');
    const newLines = newText.split('\n');
    const n = oldLines.length, m = newLines.length;
    // LCS DP
    const dp = Array(n + 1).fill(null).map(() => Array(m + 1).fill(0));
    for (let i = 1; i <= n; i++)
        for (let j = 1; j <= m; j++)
            dp[i][j] = oldLines[i-1] === newLines[j-1]
                ? dp[i-1][j-1] + 1
                : Math.max(dp[i-1][j], dp[i][j-1]);
    // Backtrack
    let i = n, j = m;
    const edits = [];
    while (i > 0 || j > 0) {
        if (i > 0 && j > 0 && oldLines[i-1] === newLines[j-1])
            edits.push({ type: 'eq', oldIdx: i-1, newIdx: j-1, text: oldLines[i-1] }), i--, j--;
        else if (j > 0 && (i === 0 || dp[i][j-1] >= dp[i-1][j]))
            edits.push({ type: 'add', newIdx: j-1, text: newLines[j-1] }), j--;
        else
            edits.push({ type: 'del', oldIdx: i-1, text: oldLines[i-1] }), i--;
    }
    edits.reverse();
    if (!edits.some(e => e.type !== 'eq')) return null; // no changes
    // Build hunks
    const CONTEXT = context;
    const hunks = [];
    let cur = null, lastChg = -1;
    edits.forEach((e, k) => {
        if (e.type !== 'eq') {
            const s = Math.max(0, k - CONTEXT), en = Math.min(edits.length - 1, k + CONTEXT);
            if (cur && s <= lastChg + CONTEXT + 1) { cur.end = en; }
            else { if (cur) hunks.push(cur); cur = { start: s, end: en }; }
            lastChg = k; cur.end = en;
        }
    });
    if (cur) hunks.push(cur);
    // Render
    let result = `--- a/${filename}\n+++ b/${filename}\n`;
    hunks.forEach(h => {
        const sl = edits.slice(h.start, h.end + 1);
        let os = null, ns = null, oc = 0, nc = 0;
        sl.forEach(e => {
            if (e.type === 'eq' || e.type === 'del') { if (os === null) os = (e.oldIdx ?? 0) + 1; oc++; }
            if (e.type === 'eq' || e.type === 'add') { if (ns === null) ns = (e.newIdx ?? 0) + 1; nc++; }
        });
        result += `@@ -${os||1},${oc} +${ns||1},${nc} @@\n`;
        sl.forEach(e => {
            if (e.type === 'eq')  result += ` ${e.text}\n`;
            if (e.type === 'del') result += `-${e.text}\n`;
            if (e.type === 'add') result += `+${e.text}\n`;
        });
    });
    return result;
}
```

Call it with `buildUnifiedDiff(originalDocs[key], documents[key], filename, 5)`. If the return value is `null`, show the "No changes" toast and bail.

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
Apply the following document-bound editor patch. Validate that each source file still contains the original text when provided. If a conflict is detected, stop and ask before editing. Do not make unrelated changes.

[paste patch JSON here]
```

For **full-document mode** (unified diff), use the format described in "Inline-document editors" above.

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

## Examples

The `examples/` folder contains small complete examples for agent reference:

- `examples/document-bound-plan-editor.html`: edits one markdown heading section and exports patch JSON, markdown diff, and agent instruction from the same state.
- `examples/json-config-patch-editor.html`: edits a JSON feature flag snapshot and exports `replaceJsonPointer` changes.

Use them to copy the binding and export patterns, not the visual style. A real artifact should still be tailored to the user's source document and task.

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
