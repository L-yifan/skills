---
name: work-tickets
description: Continuously execute an approved ticket set from its tracker frontier until complete or human judgement is required.
disable-model-invocation: true
---

# Work Tickets

Run this after `/to-tickets` has published an approved set of implementation tickets. Act as a **stateless coordinator over durable project state**: the tracker holds work state, Git holds implementation evidence, and repository docs hold durable knowledge.

The user should normally invoke this skill once. Continue across tickets without routine confirmation until the requested set is complete or a human-judgement boundary is reached.

## Reuse the Matt workflow

Read repository instructions first. Reuse the configuration written by `/setup-matt-pocock-skills`:

- `docs/agents/issue-tracker.md` is the tracker adapter. Use its fetch, list, comment, label/status, close, and generic dependency primitives, plus any implementation-ticket lifecycle operations.
- `docs/agents/triage-labels.md`, when present, maps canonical roles such as `ready-for-agent` to repository vocabulary.
- `docs/agents/domain.md` is the domain-doc consumer contract. Follow its pointers to relevant `CONTEXT.md`, `CONTEXT-MAP.md`, and ADRs; when those artifacts are absent, proceed silently.
- The ticket and linked spec are the implementation contract. Wayfinder maps and decision tickets are historical context loaded only through relevant pointers.

Treat tracker sections scoped to another skill—especially **Wayfinding operations**—as that skill's lifecycle, not this one's. Reuse a medium primitive such as reading the same native dependency representation that `/to-tickets` published, but do not inherit map/child updates, claims, answers, or resolution side effects unless the adapter explicitly generalizes them to implementation tickets.

If `docs/agents/issue-tracker.md` is missing, stop and ask the user to run `/setup-matt-pocock-skills`. Keep tracker-specific commands in that repository file; do not copy them into this skill.

## Boundaries

- Consume the approved tracer-bullet tickets without splitting, merging, rewriting, or re-planning them.
- Work one frontier ticket at a time in one shared worktree.
- Dispatch a fresh worker for every ticket whenever isolated workers are available. Use the current context only when isolation is unavailable.
- Let the worker own code and its ticket commit. Let the coordinator alone own tracker lifecycle.
- Persist coordination through the configured tracker and Git. Create no orchestration state, progress, handoff, or envelope file.
- Run the ticket set on one dedicated short-lived branch and finish with one commit per ticket.
- Default to a locally verified result. Deliver the ticket-set branch and create one pull/merge request only with affirmative authority.
- Keep merge outside this skill. Never invoke merge, enable auto-merge, or merge through a hosting API.

## Resolve the ticket set

Resolve scope in this order:

1. Use the ticket set, parent issue, tracker query, or local feature directory passed by the user.
2. Otherwise use the ticket set just published by `/to-tickets` in the current conversation.
3. Otherwise use the only active implementation ticket set exposed by the configured tracker.
4. If several candidates remain, ask once at startup. Begin no work until the user selects one.

Accept only an approved set whose open tickets provide an identity, lifecycle status, acceptance criteria, and blocking edges. Recognize Matt's local layout at `.scratch/<feature>/spec.md` and `.scratch/<feature>/issues/<NN>-<slug>.md`; use the tracker adapter for every other medium.

## Establish the ticket-set branch

Pass a **branch gate** before the first ticket:

1. Confirm that the worktree is a Git repository. Read repository rules for its base branch, branch naming, and delivery permissions; inspect remotes instead of assuming `main` or `master`.
2. Inspect the current branch, upstream, merge-base, status, and commits relative to the configured base.
3. Reuse the branch only when every condition is checkable: it is named and non-default; its merge-base matches the configured base; its name, tracker pointer, or commit history identifies this ticket set; and every relative commit and worktree change belongs to the set or is explicitly preserved as unrelated user work.
4. When still on the default branch, create the dedicated branch when repository rules determine a safe name and existing changes can be preserved safely. Otherwise propose `codex/<ticket-set-slug>` (or the repository's required prefix) and ask once.
5. Ask once when any gate condition is unprovable, HEAD is detached, the branch serves other work, or changing branches would move, hide, overwrite, or ambiguously re-home existing changes.

Begin ticket execution only after the branch gate passes. On later invocations, reconstruct branch ownership from Git and tracker state rather than relying on the original conversation.

## Observe and select

Load only ticket identities, statuses, blocking edges, stable tracker order, and any implementation-specific claims. Do not preload every ticket body, domain document, ADR, or source file.

Before deriving the frontier, reconcile durable evidence:

- When Git history or tracker comments link an open ticket to a candidate completion commit, verify it and finish the missing tracker transition instead of reimplementing it.
- Use a claim only when the tracker adapter explicitly defines claims for implementation tickets. Treat a matching claim owned by this actor and ticket-set branch as resumable, a foreign live claim as unavailable, and a stale claim according to the adapter. Ask before clearing a claim the adapter cannot classify.
- If the adapter defines no implementation claim, write none; this sequential coordinator and its dedicated branch are the execution boundary.
- Settle any supported transient claim on completion or terminal stop so an unfinished ticket cannot disappear from a future frontier.

Derive the **frontier** from the configured tracker: incomplete tickets whose blockers are all complete and which have no foreign live implementation claim.

- If every ticket is complete, proceed to **Finish the ticket set**.
- If incomplete tickets remain and the frontier is empty, stop with the blocking evidence. Preserve the approved dependency graph.
- Otherwise choose the first frontier ticket by configured tracker order, then stable ticket identity.
- Claim the ticket before dispatch only when the implementation-ticket adapter requires it.

## Execute one ticket

When isolated workers are supported, dispatch one fresh worker with the ticket identity, repository/worktree, and the contract below; wait for it before selecting another ticket. Pass pointers rather than copied ticket or spec bodies.

When isolation is unavailable, execute the same contract only after re-reading the tracker, full ticket, repository instructions, and current Git state. Treat conclusions remembered from earlier tickets as untrusted.

Require the worker to:

1. Read the full ticket, comments, linked spec, and pointed decision context.
2. Follow `docs/agents/domain.md`; load only relevant glossary and ADR material.
3. Inspect the code, tests, status, and recent history. Record the pre-ticket `HEAD` as `ticket_base`. Preserve unrelated user changes and stop if overlapping ownership cannot be proven.
4. Implement only the ticket's end-to-end behaviour. Carry `/implement`'s contract inline because that skill is user-invoked; call `/tdd` and diagnostic skills when available. Use only pre-agreed test seams, escalating rather than inventing a new seam.
5. Run focused tests and typechecking during implementation, then the repository's complete required validation.
6. Create one provisional ticket commit whose message carries the stable ticket reference in repository style.
7. Review `ticket_base...HEAD` against repository standards and the originating ticket/spec. Call `/code-review` when available, supplying both the fixed point and ticket/spec pointer. Resolve every finding, rerun affected and complete validation, and amend the same commit until the final range `ticket_base..HEAD` contains exactly one ticket commit.
8. Return a compact completion envelope to the coordinator. Change no tracker lifecycle state.

Use this in-context shape:

```yaml
ticket: <stable identity>
base: <ticket_base hash>
outcome: completed | blocked
commit: <final hash, only when completed>
acceptance: <criterion-by-criterion evidence>
validation: <commands and results after the final code change>
review: <resolved findings or none>
residual_risk: <none or concise risk>
blocker: <durable evidence, only when blocked>
```

Keep exploration, discarded hypotheses, and raw logs inside the worker context.

## Verify and persist

Treat the envelope as a claim, not proof. Inspect the ticket, repository, and commit. Pass the **completion gate** only when:

- every acceptance criterion has concrete evidence;
- focused checks and complete required validation passed after the final code change;
- review has no unresolved correctness finding;
- `ticket_base..HEAD` contains exactly one commit belonging only to this ticket; and
- no residual risk invalidates an acceptance criterion.

When this is the last incomplete ticket, treat its post-review complete validation as the ticket-set integration gate. Persist the final ticket only after that gate passes. If it fails, return an attributable defect to the same worker and amend the same commit; if ownership cannot be attributed safely, leave the final ticket incomplete and stop with integration evidence.

After the gate passes, use the tracker adapter's implementation completion operation. When it defines none, use the Matt-compatible fallback:

- Real issue tracker: post concise acceptance, commit, and validation evidence, then close the ticket.
- Matt local markdown: tick only verified acceptance criteria, change `Status: ready-for-agent` to `Status: done`, and append the same concise evidence under `## Comments`.

A repository-defined pre-merge completion state overrides this fallback. If repository rules reserve close for merge but provide no pre-merge done signal that advances blockers, stop and request that lifecycle decision instead of falsifying the frontier.

Treat tracker persistence as part of ticket completion. On failure, stop before selecting another ticket. On success, settle any implementation claim, discard the worker context and envelope, re-read tracker and Git state from scratch, and repeat. Leave the parent issue unchanged unless its configured workflow explicitly says otherwise.

## Finish the ticket set

When every ticket is durably complete:

A **delivery request** means the pull request or merge request named by the repository's hosting workflow.

1. Confirm the ticket-set integration gate passed on the final ticket, every ticket maps to one commit, and ticket-set changes are committed. Report unrelated pre-existing changes separately.
2. Report the branch, ticket-to-commit mapping, final validation, and tracker state without creating another artifact.
3. Read the invocation and repository rules for delivery authority. Authority must affirmatively and unambiguously permit both push and delivery-request creation; remotes, credentials, access, or technical ability are not authority.
4. Without authority, stop successfully at the locally verified branch without offering a routine confirmation prompt.
5. With authority, push the dedicated branch and create exactly one delivery request targeting the repository-configured base. Use the repository's configured hosting tools, link tickets, summarize validation without copying their bodies, and leave the request open.

Treat push or delivery-request failure as delivery failure, not implementation rollback. Preserve the locally complete branch and request only the missing permission or action.

## Recover or stop

Keep compilation errors, test failures, type errors, implementation bugs, and local refactoring inside the engineering loop. Use a diagnostic skill when available.

When a worker crashes or returns an unexplained technical block:

1. Before recovery, use the configured tracker comment operation to record a compact recovery marker: failure fingerprint, ticket-set branch, commit/dirty state, and that the one recovery attempt is being consumed.
2. Dispatch at most one fresh recovery worker with the ticket pointer, repository state, and concrete failure evidence—not the first worker's reasoning.
3. On a later invocation, treat a matching unresolved recovery marker as already consumed unless a user resolution or materially changed repository state invalidates its fingerprint.
4. If recovery confirms the same block, record durable blocker evidence, settle any implementation claim without hiding the unfinished ticket, preserve uncommitted changes, and stop.

Return control to the user only when the set is complete or when product/design judgement, contradictory acceptance criteria, inconsistent tracker state, an ADR reversal, scope expansion, unsafe change ownership, required external authority, or a confirmed unrecoverable block prevents progress.

On a stop, name the affected ticket, show the smallest decision-relevant evidence, state the durable tracker/Git state, and ask only the question that unblocks execution.
