# Thinking Patterns Reference

Common patterns for effective sequential thinking across different problem types.

## Pattern 1: Problem Decomposition

For complex problems with unclear scope:

1. **Identify core problem** - What exactly needs solving?
2. **List known constraints** - What limitations exist?
3. **Break into subproblems** - What smaller pieces compose this?
4. **Prioritize subproblems** - What order makes sense?
5. **Verify decomposition** - Did we miss anything?

Example thought sequence:
```
Thought 1: "The core problem is X, constrained by Y and Z"
Thought 2: "This breaks into subproblems A, B, and C"
Thought 3: "B depends on A, C is independent"
Thought 4: "Starting with A: the key challenge is..."
```

## Pattern 2: Hypothesis-Driven Analysis

For debugging or investigation:

1. **State hypothesis** - What might be causing this?
2. **Define test** - How to verify/falsify?
3. **Predict outcome** - What should happen if hypothesis is true?
4. **Analyze result** - Does evidence support hypothesis?
5. **Revise or conclude** - Refine understanding

Use `--is-revision` when hypothesis is disproven.

## Pattern 3: Design Exploration

For architectural decisions with tradeoffs:

1. **Define requirements** - What must the solution do?
2. **Generate alternatives** - What approaches are possible?
3. **Branch and evaluate** - Use `--branch-from-thought` to explore each
4. **Compare tradeoffs** - What are pros/cons of each?
5. **Select and justify** - Which approach and why?

## Pattern 4: Incremental Refinement

For solutions requiring iteration:

1. **Initial attempt** - First approximation
2. **Identify gaps** - What's missing or wrong?
3. **Refine solution** - Address specific gaps
4. **Test refinement** - Does it work better?
5. **Repeat until satisfied** - Continue as needed

Adjust `--total-thoughts` upward when more refinement needed.

## Pattern 5: Multi-Perspective Analysis

For problems requiring different viewpoints:

1. **Technical perspective** - How does this work mechanically?
2. **User perspective** - How will users experience this?
3. **Business perspective** - What are cost/benefit implications?
4. **Risk perspective** - What could go wrong?
5. **Synthesize** - Combine insights into recommendation

## Anti-Patterns to Avoid

- **Rushing to conclusion** - Set adequate `totalThoughts`
- **Ignoring revision signals** - Use `--is-revision` when needed
- **Linear-only thinking** - Use branching for alternatives
- **Vague thoughts** - Be specific and concrete
- **Losing thread** - Reference previous thought numbers explicitly

## Thought Quality Guidelines

Good thoughts are:
- **Specific** - Concrete observations, not vague statements
- **Progressive** - Build meaningfully on previous thoughts
- **Testable** - Lead to verifiable conclusions
- **Revisable** - Acknowledge uncertainty when present

## Integration Tips

When using within larger workflows:
- Start with generous `totalThoughts` estimate
- Use thought 1 to establish problem framing
- Reserve final thought for verified conclusion
- Use `--needs-more-thoughts true` if running out of estimated thoughts
- Output as JSON (`--output json`) for programmatic processing
