---
name: skill-discovery
description: Find and recommend useful agent skills from a personal skills index repository such as L-yifan/skills. Use when the user asks which skill to use, wants to discover a skill for a task, asks whether an existing backed-up skill fits, wants external skill suggestions, or needs install and backup recommendations for skills.
---

# Skill Discovery

Use this skill to recommend the right skill for the user's current task. Treat the personal skills repository README as the primary source of truth.

## Search Order

1. Start with the personal skills repository.
   - Prefer the user's provided repo or local checkout.
   - If the user says "our repo" and no repo is open, use `L-yifan/skills`.
   - Read `README.md`; do not require or create a separate JSON/YAML index.
   - Search with `rg` for task terms, skill names, source repos, and category headings.

2. Recommend from the README first.
   - Prefer already indexed skills when they satisfy the task.
   - Include the README install command exactly when available.
   - Note whether the skill is self-built or external.

3. Search externally only when needed.
   - Search GitHub or the web only if the README has no good fit, the user asks for new/external options, or the task clearly needs something missing from the index.
   - Prefer official upstream repos and actual `SKILL.md` files over blog posts or summaries.
   - Verify the skill name and install command from source before recommending it.

## Ranking

Return at most three candidates. Use light ranking, not a long research report.

For each candidate, include:

- **Recommendation**: `Best`, `Optional`, or `Not recommended`
- **Why**: one concise reason tied to the user's task
- **Install**: exact command if known
- **Backup**: `Already indexed`, `Recommend backup`, or `Do not backup`

Consider these factors:

- task fit
- whether it is already in the personal repo
- maintenance/activity when externally searched
- installation simplicity
- overlap with existing skills
- extra tool, account, API key, or local dependency requirements

## Backup Boundary

Do not update the repo during discovery. Recommending a skill is read-only.

If a useful external skill is not indexed, say whether it should be backed up. Only call or suggest `skill-backup` after the user explicitly asks to add, back up, register, or save it.

## Output Shape

Start with the answer in the user's language. Then list candidates.

Use this compact format:

```markdown
Recommendation: use `skill-name`.

| Skill | Recommendation | Why | Install | Backup |
|---|---|---|---|---|
| skill-name | Best | ... | `npx skills add ...` | Already indexed |
```

If no skill fits, say that clearly and recommend either searching externally or creating a new skill.
