---
name: agent-team-prompting
description: Use when the user wants to write, improve, or evaluate prompts for Claude Code agent teams, teammates, multi-agent collaboration, parallel reviewers, competing hypotheses, complex refactors, coordinated investigations, PR reviews, or tasks that need independent Claude Code sessions to discuss and coordinate.
---

# Agent Team Prompting

## Overview

Use this skill to write launch prompts for Claude Code agent teams. A good agent-team prompt does more than split work: it defines why a team is needed, how teammates coordinate through shared tasks and messages, what each teammate owns, where collaboration is required, and when the team lead should wait, summarize, approve, or clean up.

## Agent Teams vs Subagents

Use this decision before writing the prompt.

| Use this | When | Prompt implication |
| --- | --- | --- |
| Agent team | The work needs debate, coordination, shared task ownership, direct teammate communication, or long-running independent Claude Code sessions | Ask Claude Code to create an agent team with teammates, task list, mailbox-style communication, and a lead summary |
| Subagents | Only the final result matters and workers do not need to talk to each other | Ask for subagents or parallel agents instead; do not force agent teams |
| Single agent | The task is small, sequential, or file-conflict-prone | Keep the prompt focused on one Claude Code session |

Agent teams cost more tokens because each teammate is an independent Claude instance. State that tradeoff briefly when the user is choosing between approaches.

## Prompt Assembly Checklist

Every agent-team launch prompt should cover these elements unless the user explicitly asks for a shorter prompt.

| Element | Include |
| --- | --- |
| Intent | One sentence explaining the outcome the team should produce |
| Team creation | Explicitly say `Create an agent team` or `Spawn agent teammates` |
| Scope | Repository area, PR number, incident, doc, files, or constraints |
| Teammates | Names, responsibilities, and optional model or teammate-mode constraints |
| Context package | Facts each teammate needs before starting |
| Shared task list | How tasks are created, claimed, completed, and reported |
| Mailbox collaboration | When teammates should message each other, challenge findings, or request handoffs |
| Plan approval | Require approval before file changes when the task is risky |
| Conflict avoidance | File ownership, read-only review mode, or edit sequencing |
| Quality gates | Tests, build, review, severity ratings, citations, or evidence requirements |
| Wait condition | Tell the lead to wait for teammates before summarizing or implementing |
| Final output | Exact report, plan, patch, or doc format |
| Cleanup | Ask the lead to clean up or shut down teammates when finished |

## Prompt Template

Adapt this template. Remove sections that do not apply.

```text
Create an agent team for: [task/outcome].

Why this needs an agent team:
[Explain the need for independent context, direct teammate communication, debate, or coordinated parallel work.]

Context:
- Repository/task scope: [paths, PR number, incident, product area]
- Relevant constraints: [deadline, no code changes yet, compatibility, security, data limits]
- Known facts: [facts the team should not rediscover]

Team:
1. [Role/name]: [responsibility, files or topic, output]
2. [Role/name]: [responsibility, files or topic, output]
3. [Role/name]: [responsibility, files or topic, output]

Coordination rules:
- Use the shared task list to create, claim, and complete work items.
- Use teammate messages to ask questions, challenge assumptions, and hand off findings.
- Start with research/review before implementation.
- Wait for all teammates to finish their assigned work before the lead writes the final synthesis.
- If two teammates need the same files, keep one owner for edits and let the others read/comment only.

Approval and permissions:
- Do not modify files until a plan is presented and I approve it. [Remove if implementation may start immediately.]
- Do not use `--dangerously-skip-permissions` unless I explicitly request it.
- Pause and ask for guidance if the team finds a risk outside the original scope.

Quality gates:
- [Required checks, tests, evidence, severity rating, reproduction steps, citations]

Final output:
[Exact structure expected from the team lead.]

When complete:
- Summarize teammate findings, decisions, remaining risks, and next actions.
- Ask idle teammates to shut down or clean up the team.
```

## Role Patterns

Choose roles that create useful disagreement or complementary coverage.

| Task | Useful teammates |
| --- | --- |
| PR review | Security reviewer, performance reviewer, test coverage reviewer, maintainability reviewer |
| Incident/debugging | Runtime hypothesis owner, data/config owner, recent-change owner, external-dependency owner, devil's advocate |
| Refactor | Architect, migration planner, test owner, risk reviewer, implementation owner |
| Research/design | UX advocate, technical architect, business constraints reviewer, devil's advocate |
| Documentation/spec | Reader advocate, domain expert, implementation reviewer, consistency editor |

For large teams, prefer 3-5 teammates. More teammates increase coordination and token cost. If the work naturally has fewer independent angles, use fewer teammates.

## Collaboration Patterns

Use these instructions when the work needs true team behavior rather than isolated parallel reports.

| Need | Add this instruction |
| --- | --- |
| Competing hypotheses | `Each teammate must state evidence, counter-evidence, confidence, and at least two ways their hypothesis could be wrong.` |
| Scientific debate | `After the first pass, each teammate should challenge at least two other teammates' conclusions using evidence.` |
| File conflict avoidance | `Assign file owners before edits. Non-owners may read and comment but must not edit those files.` |
| Plan-before-code | `Require plan approval before teammates make changes. The plan must list file-level scope and tests.` |
| Shared synthesis | `The team lead must wait for all teammate summaries, deduplicate findings, and mark disagreements.` |
| Long-running work | `Create small tasks in the shared task list, claim them explicitly, and report completed tasks before taking new ones.` |

## Setup Snippets

Only include setup instructions if the user is preparing the environment or the prompt will be reused by someone else.

```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

Useful prompt additions:

```text
If agent teams are not enabled, tell me to set CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1 before proceeding.
Use teammate mode [auto|tmux|in-process] if appropriate for this environment.
```

Mention tmux or iTerm2 only when the user asks about display mode, panes, or team visibility. Do not clutter every task prompt with display setup.

## Examples

### Parallel PR Review

```text
Create an agent team to review PR #142. Spawn three reviewers: Security, Performance, and Test Coverage.

First, have the lead fetch the diff, changed files, and test context. Partition the changed files so each reviewer has a primary focus area. Reviewers may read overlapping files, but this is review-only: do not modify files.

Use the shared task list for each reviewer to claim their review area. Use teammate messages if a finding crosses domains. The lead should wait for all reviewers, deduplicate findings, and report severity, file/line, evidence, why it matters, and recommended fix. If no issue is found, say so and list residual risks.

Clean up the team after the final report.
```

### Competing Debug Hypotheses

```text
Create an agent team with five teammates to investigate why the service exits after the first message.

Assign one teammate each to runtime lifecycle, message pipeline, configuration/environment differences, external dependencies/resources, and recent code changes. Each teammate must gather evidence, list counter-evidence, and state confidence. After the first pass, have teammates challenge at least two other hypotheses through direct messages.

Do not modify production code. The lead should wait for all teammates, then update `findings.md` with confirmed facts, leading hypotheses, ruled-out causes, evidence, next 30-minute checks, risks, and rollback notes.

Clean up the team when the findings doc is complete.
```

### Plan-Approved Refactor

```text
Create an agent team to plan a refactor of the authentication module. Spawn an architect, security reviewer, test coverage owner, and migration planner.

Start with research and review only. Require plan approval before any teammate modifies files. The plan must include current-state summary, file-level scope, security risks, migration steps, compatibility risks, rollback strategy, and tests to run.

Use the shared task list for research tasks and teammate messages to resolve disagreements. If implementation is approved later, assign file owners before edits to avoid conflicts.
```

## Common Mistakes

| Mistake | Fix |
| --- | --- |
| Writing only a role list | Add task list, mailbox collaboration, wait condition, and final synthesis |
| Using agent teams for simple fan-out | Use subagents instead when workers do not need direct communication |
| Letting every teammate edit anything | Assign file owners or make the team read-only until synthesis |
| Forgetting approval | Add plan approval for refactors, risky fixes, production incidents, and broad changes |
| Ending after reports arrive | Tell the lead to synthesize, resolve conflicts, identify residual risks, and clean up |
| Overloading teammates | Give each teammate one clear responsibility and expected output |

## Final Self-Check

Before returning an agent-team prompt to the user, verify:

- It explicitly asks Claude Code to create an agent team.
- The task genuinely benefits from teammates communicating directly.
- Each teammate has a distinct role and output.
- The prompt includes shared task-list and teammate-message behavior.
- It says whether teammates may edit files.
- It includes plan approval when changes are risky.
- It tells the lead to wait for teammates before final synthesis.
- It defines the final output format.
- It includes cleanup or shutdown instructions.
