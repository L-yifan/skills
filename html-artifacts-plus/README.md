# html-artifacts-plus

Personal enhanced version of `dogum/html-artifacts`.

It keeps the original skill's purpose: produce self-contained HTML artifacts when HTML is a better medium than markdown for substantial plans, reports, comparisons, reviews, diagrams, decks, and one-off editors.

The added behavior is Level 2 document-bound editing:

- generate an HTML editor for an existing markdown, JSON, YAML, config, prompt, or planning file;
- let the user edit through a focused browser UI;
- export `Patch JSON`, `Markdown Diff`, and `Agent Instruction`;
- let Codex or Claude Code apply the exported patch to the real source files.

The HTML file does not save automatically, write local files, start a backend, or maintain a document index. Source files remain the source of truth.

The `examples/` folder contains two small reference artifacts for the Level 2 flow:

- `document-bound-plan-editor.html`
- `json-config-patch-editor.html`

## Install

```bash
npx skills add https://github.com/L-yifan/skills --skill html-artifacts-plus
```

## Origin

Based on [`dogum/html-artifacts`](https://github.com/dogum/html-artifacts), which is licensed under Apache 2.0. The copied license is included in this folder.
