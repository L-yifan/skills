# Custom Editors

The most distinctive use of HTML artifacts is the throwaway editor: a single file, purpose-built for one task where a text box is the wrong shape. Examples include triaging tickets, tuning a regex, reordering steps, curating a dataset, editing a feature flag snapshot, picking colors, or adjusting easing values.

## The non-negotiable rule

Every editor must end with an export. "Copy as markdown," "copy as JSON," "copy as prompt," "copy diff," or "download CSV" turns the UI state into something the user can paste into Claude Code, a commit, a Linear comment, or the next prompt.

Without export, the editor is a toy. Add the export path first, then build the interface.

## Custom editor or document-bound editor?

Use this file for one-off editors whose output is just the user's final choice or transformed data.

Switch to `references/document-bound-editors.md` when the user wants the HTML page to edit an existing source file and export a patch for an agent to apply. Signals include source paths, named markdown sections, JSON pointers, YAML paths, "update this file," "copy patch," or "agent can apply this."

The distinction:

- **Custom editor:** "Triage these tickets into Now / Next / Later / Cut and copy the result as markdown."
- **Document-bound editor:** "Make an HTML editor for `docs/roadmap.md`; after I reorder priorities, export a patch that replaces the Roadmap section."

## When to build a custom editor

The signal: the user is trying to express something that is awkward to type in chat.

- Reordering, triaging, or bucketing many items.
- Editing structured data with visible constraints.
- Tuning prompts or templates with live preview.
- Curating a dataset by approving, rejecting, tagging, or labeling rows.
- Annotating a transcript, diff, screenshot, or research note.
- Picking values that are painful to express in text, such as colors, easing curves, crop regions, cron schedules, or regexes.

If the task is one-off and the input is structured, this pattern fits.

## Layout

- Make the work area the dominant focus.
- Use a short header that says what the editor is for.
- Pre-fill the data from the prompt or source context. Do not make the user paste it twice.
- Use interaction primitives that match the data: drag-and-drop for ordering, toggles for booleans, selects for enums, sliders for ranges, text inputs for strings.
- Show live state: counts, character length, validation errors, changed keys, selected rows, or current bucket totals.
- Put export controls in a persistent footer or final section.
- Include Reset. Add undo/redo only when many small changes are likely.

## What is load-bearing

- **Export.** The output must be pasteable into the next step.
- **Pre-filled data.** The page should start ready to manipulate.
- **Visible constraints.** If flag A requires flag B, show the warning at the moment of conflict.
- **Session persistence.** For local `.html` files, use `localStorage` when losing state would be painful. For Claude.ai artifacts, keep state in memory.
- **Keyboard support.** For repetitive work, add shortcuts such as `j`/`k`, number keys, Enter, Escape, or slash search.

## Common mistakes

- Making a generic product instead of a focused tool for this task.
- Skipping the export.
- Adding settings unrelated to the task.
- Creating server-style state. No backend, API, auth, or hidden network dependency.
- Over-polishing the visual layer while the editing flow remains slow.

## Example shapes

### Triage board

Drag cards across Now / Next / Later / Cut. Export markdown with one heading per bucket and a one-line rationale per card.

### Feature flag snapshot editor

Group toggles by area, show dependency warnings, and export only changed keys as JSON or a compact diff. If the user names a real config file to update, use document-bound mode instead.

### Prompt tuner

Show an editable prompt template on the left and filled sample outputs on the right. Export the final prompt, a JSON variable map, or an agent instruction.
