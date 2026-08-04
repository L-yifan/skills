# Minimal Context Report Template

Use this report before editing. Omit sections with no evidence.

```markdown
## Minimal Context Report

### Effective scope

| File | Governs | Relationship |
|---|---|---|
| `AGENTS.md` | `<scope>` | root / inherited / override |

### Risk profile

Record only what repository or user evidence supports. Use `confirmed` for verified facts, `inferred` for reasonable conclusions, and `unknown` for unconfirmed environments or policies. Do not present an inference or an unconfirmed policy as a repository fact.

| Risk area | Status | Evidence | Decision impact |
|---|---|---|---|
| `<environment or concern>` | `confirmed / inferred / unknown` | `<path, command, or owner statement>` | `<safe default or allowed change>` |

### Evidence

| Finding | Status | Source | Notes |
|---|---|---|---|
| `<risk fact or policy>` | `confirmed / inferred / unknown` | `<path, command, or owner statement>` | `<why it supports the finding>` |

### Unknowns / Owner confirmation

- `<unconfirmed environment, external contract, or team policy>` — **Owner confirmation needed:** `<decision required and why>`

### Must fix

- **Remove / rewrite / move:** `<instruction>`
  - **Evidence:** `<path, command, or observed conflict>`
  - **Reason:** `<duplicate, stale, wrong scope, or untestable>`
  - **Decision effect:** `<what future agents will do better>`

### Minimal changes

| Decision | Location | Change | Evidence |
|---|---|---|---|
| Keep | `<file>` | `<non-obvious constraint>` | `<source>` |
| Remove | `<file>` | `<derivable or duplicate text>` | `<source>` |
| Move | `<file>` | `<specialized procedure>` | `<target + trigger>` |
| Add | `<file>` | `<recurring hidden constraint>` | `<source>` |
| Rewrite | `<file>` | `<vague rule>` | `<source>` |

### Proposed diff

```diff
- <redundant or conflicting instruction>
+ <verified, scoped instruction>
```

### Verification after approval

- `<command or source check>`
```

## Diff patterns

### Remove a derivable command

```diff
- Run `npm test` before every change.
```

Use this only when `npm test` is directly discoverable and no project-specific condition changes when it should run.

### Keep a hidden constraint

```diff
+ When changing generated API clients, update `schema/openapi.yaml` and run `pnpm generate`; do not edit `src/generated/` directly. Verify with `pnpm generate --check`.
```

### Move a specialized procedure

```diff
- <long deployment or migration procedure>
+ For production migrations, read `references/production-migrations.md` before editing migration files.
```

The referenced procedure must exist and state its trigger clearly. Do not create a reference merely to hide generic prose.

### Resolve a conflict

```diff
- Never add comments.
+ Match the surrounding module's comment density and conventions; preserve comments required for generated or public APIs.
```

Use conditional wording when repository context, rather than a blanket prohibition, determines the right action.
