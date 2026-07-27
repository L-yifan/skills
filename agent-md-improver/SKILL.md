---
name: agent-md-improver
description: Audit, simplify, and update repository AGENTS.md and CLAUDE.md files. Use when Codex needs to review, improve, deconflict, or reduce agent instructions; maintain project memory; or decide what belongs in an instruction file versus code, a skill, or a reference. Preserve only current, non-obvious, task-relevant constraints backed by repository evidence.
---

# Agent Instruction Files Improver

Treat instruction files as a minimal decision layer, not a project manual. Prefer deleting, consolidating, or moving instructions over adding prose.

## Workflow

### 1. Establish scope before judging content

1. Find instruction files with `rg --files -g 'AGENTS.md' -g 'AGENTS.local.md' -g '.agents.md' -g 'CLAUDE.md' -g '.claude.md' -g '.claude.local.md'`.
2. Identify the user's target directory and the files that actually govern it. Record parent-to-child precedence and local overrides.
3. Do not inspect or change global instruction files unless the user explicitly includes them.
4. Do not treat every nested instruction file as a candidate for expansion. A nested file should exist only for a real domain or workflow boundary.

### 2. Build an evidence-backed instruction inventory

Read each applicable file completely. For every instruction, verify it against the codebase, configuration, scripts, and recent task evidence.

Classify each item before proposing a change:

| Decision | Use when |
|---|---|
| **Keep** | It is current, non-obvious, applies in scope, and materially changes a decision. |
| **Remove** | It is generic, duplicate, stale, contradicted, or directly derivable from files and tool output. |
| **Move** | It is valid but specialized, long, or low-frequency; place it in a focused skill or reference and retain only a trigger/link here. |
| **Add** | It cannot be reliably inferred, recurs, and prevents a meaningful failure or wrong decision. |
| **Rewrite** | The constraint is necessary but vague, untestable, overly absolute, or located at the wrong scope. |

Preserve explicit guardrails for destructive operations, secrets, security, compliance, releases, and other high-cost failures. Do not weaken those merely to make a file shorter.

### 3. Audit derivability and conflicts

For each candidate addition or retained line, ask:

1. Can an agent infer this from `package.json`, scripts, CI, directory names, tests, tool help, or nearby code?
2. Is it already stated by a parent, child, tool description, or another source of truth?
3. Is it needed for most tasks in this scope, or only a specialized workflow?
4. Does it specify a condition, action, and verifiable outcome?

If the answer to 1 or 2 is yes, remove or link instead of repeating it. If the answer to 3 is no, move it behind progressive disclosure. Resolve a conflict by choosing one source of truth; never preserve contradictory wording to be "safe."

### 4. Report before editing

Always present a **Minimal Context Report** and wait for approval before writing. Use [references/templates.md](references/templates.md) for the report and diff structure. Include:

- files that govern the requested scope and their precedence;
- evidence-backed keep, remove, move, add, and rewrite decisions;
- must-fix conflicts or stale instructions separately from optional polish;
- the expected effect on agent decisions, not a chapter-completeness score.

Use [references/quality-criteria.md](references/quality-criteria.md) when a scored assessment is useful or requested. Do not reward a file merely for listing commands, architecture, or every key file.

### 5. Propose and apply the smallest safe diff

1. Show exact diffs, with deletions before additions.
2. Add only verified repository-specific facts. Cite the configuration, code, test, or command that supports each addition.
3. Keep low-frequency procedures in a skill or one-level-deep reference; the instruction file should state when to load it.
4. Do not create an instruction file simply because none exists. Create one only when verified non-inferable constraints recur in the requested scope.
5. After approval, preserve the existing structure where possible and apply the diff.

### 6. Verify the result

After editing, re-check the affected scope:

- every path and command is real and current;
- no child file repeats or contradicts its parent;
- no retained line is obvious from the repository alone;
- high-risk guardrails remain explicit;
- referenced skills and documents exist and are loaded only when relevant.

Report what changed and any facts that still require owner confirmation.

## Writing rules

- State project-specific constraints, not generic agent advice.
- Put instructions at the narrowest scope that reliably governs the affected work.
- Prefer conditional instructions: trigger → action → expected verification.
- Treat code, tests, CI, and tool schemas as primary evidence; instruction files should describe the exceptions those artifacts cannot express.
- Use concise tables or bullets only when they reduce ambiguity.
