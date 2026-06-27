---
name: skill-backup
description: Maintain a personal skills index repository such as L-yifan/skills. Use when the user discovers a useful external skill, wants to add an external skill reference to the repo README, creates a new custom skill and wants it backed up into the repo, or asks to sync, catalog, publish, or preserve skills in their personal skills repository.
---

# Skill Backup

Use this skill to keep the user's personal skills repository current. The repository distinguishes between:

- **Self-built skills**: source code lives in this repo and appears in the README's self-built table.
- **External skills**: source code stays in the upstream repo; this repo only keeps a README reference.

## Workflow

1. Locate the skills repository.
   - Prefer a user-provided repo URL or local checkout.
   - Check common local clones before cloning fresh: `$env:USERPROFILE\.agents\skills`, `$env:USERPROFILE\.claude\projects\<project>\` etc.
   - If the user says "our repo" and no checkout is open, use `L-yifan/skills`.
   - When cloning, use a named working directory (e.g. `$(mktemp -d)` on Unix, `$env:TEMP\skills-backup` on Windows) rather than `/tmp/`, so all tools (Read, Edit, etc.) can resolve the path. Record the path so cleanup can find it later.

2. Classify the request.
   - Treat GitHub URLs, marketplace links, or third-party skill names as **external skills** unless the user explicitly asks to vendor/copy the source.
   - Treat local skill folders, newly created skills, or skills authored for this repo as **self-built skills**.

3. For external skills, update only `README.md`.
   - Read the upstream `SKILL.md` or README enough to get the exact skill name, purpose, source repo, and install command.
   - **Discovery fallback**: if the root directory has no `SKILL.md`, check `skills/`, `.claude/`, `.claude-plugin/` subdirectories for nested skill structures.
   - **Multi-skill repos**: if the upstream has a `skills/` directory with multiple subdirectories, list them and ask the user which ones to add rather than silently picking the first one.
   - Use this install command shape when the source supports `--skill`:
     `npx skills add https://github.com/owner/repo --skill skill-name`
   - Do not copy external source files into this repo unless the user explicitly asks.

4. For self-built skills, copy or create the skill directory in the repo root.
   - The folder name must match the skill `name` in `SKILL.md`.
   - Preserve required resources: `SKILL.md`, `agents/`, `scripts/`, `references/`, `assets/`, and intentional examples.
   - Exclude caches, logs, secrets, credentials, generated build output, package caches, and machine-local files.
   - Add or update the README self-built table with:
     `npx skills add https://github.com/L-yifan/skills --skill skill-name`

5. Keep README metadata fresh.
   - Update the version date when the README index changes.
   - Keep descriptions short and Chinese-facing unless the surrounding section is English.
   - Keep table formatting consistent with nearby rows.

6. Validate before finishing.
   - Check `git diff` and `git status --short`.
   - **Verify Markdown table integrity**: count the pipe characters per row to ensure the new entry didn't break column alignment.
   - For self-built skills, validate required frontmatter: only `name` and `description`, both non-empty.
   - Run the skill validator if available, for example:
     `python path/to/quick_validate.py path/to/skill-folder`

7. **Cleanup**: delete the temporary clone directory after publishing, so no stale checkout is left behind.

8. Publish only when requested.
   - If the user asks to commit, push, or open a PR, follow the repository's Git/GitHub workflow.
   - Otherwise leave a clean summary of the local files changed and whether publishing remains.

## Common Cases

- "Add this skill to our external backup" means read the upstream skill and add a README external row.
- "Back up this skill I made" means copy the local skill directory into the repo, validate it, and add it to the self-built table.
- "Install this into our skills repo" is ambiguous; inspect context first. If it is third-party, prefer README reference. If it is authored by the user, prefer source backup.
