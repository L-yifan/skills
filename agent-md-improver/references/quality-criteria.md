# Minimal Context Quality Criteria

Score only after establishing which instruction files govern the requested scope. A higher score means the file improves decisions without duplicating what the repository already says.

| Criterion | Weight | Evidence of quality |
|---|---:|---|
| Evidence fidelity | 25 | Every factual instruction is verified against code, config, CI, or a repeatable command. |
| Non-derivability | 25 | Lines capture exceptions, hidden constraints, or team choices that an agent cannot reliably infer. |
| Scope and precedence | 20 | Rules live at the narrowest correct level; parent, child, and local files do not conflict. |
| Actionability and risk control | 15 | High-risk instructions name a trigger, action, and verification; commands and paths are executable. |
| Context efficiency | 15 | No generic advice, redundant restatement, long low-frequency procedures, or filler. |

## Assessment process

1. Determine the target scope and applicable instruction hierarchy.
2. Cross-check every retained or proposed fact against repository evidence.
3. Classify each line as keep, remove, move, add, or rewrite.
4. Score the governing set, not each file in isolation when files inherit from one another.
5. Report must-fix conflicts before optional improvements.

## Red flags

- A root file repeats package scripts, directory listings, or style conventions visible in the repository.
- A nested file restates its parent without adding a domain-specific boundary.
- The same rule appears in a system prompt, tool description, skill, and project file.
- Absolute rules suppress legitimate context-dependent judgment.
- A long, rare procedure is always loaded instead of referenced on demand.
- A command, path, dependency, or workflow is not verified.
- A safety or release constraint is shortened until its trigger or verification is unclear.

## Classification guide

| If the instruction is… | Prefer… |
|---|---|
| visible in code or tool help | removing it |
| true only for a specialist workflow | moving it to a focused skill or reference |
| valid but duplicated | retaining one source of truth and linking if needed |
| vague but high-risk | rewriting it as trigger → action → verification |
| a recurring, hidden repository constraint | adding it with evidence |
