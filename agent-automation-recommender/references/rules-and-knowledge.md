# Rules & Knowledge Reference Patterns

This reference provides patterns for recommending project rules, code style guidelines, knowledge items (KIs), and system prompt rules across **Claude Code**, **Antigravity (Gemini)**, and **Codex**.

---

## 1. When to Recommend Rules & Knowledge Items

Recommend project rules or knowledge items when you detect:
- Complex architectural conventions (e.g. Clean Architecture, Domain Driven Design, Layered structure)
- Strict testing guidelines (TDD required, coverage thresholds)
- Security & compliance rules (Secrets handling, Auth checks)
- Specialized domain knowledge (Financial formulas, Medical protocols, Paper logic)
- Frequently repeated developer onboarding instructions

---

## 2. Common Codebase Signals & Recommended Rules

| Codebase Signal | Recommended Rule / Knowledge Item | Purpose |
|-----------------|-----------------------------------|---------|
| Multi-module Monorepo | **architecture-boundaries** | Enforce import boundaries between packages |
| Strict TDD / Quality | **testing-standards** | Mandate test-first workflow and verification rules |
| Database / ORM | **schema-conventions** | Guidelines for migrations and query patterns |
| Security/Payment code | **security-guardrails** | Block sensitive file edits and mandate audit steps |
| Domain specific logic | **domain-glossary-ki** | Knowledge Item detailing core domain concepts |

---

## 3. Platform Implementations & Templates

### A. Claude Code (`CLAUDE.md`)

In Claude Code, rules are placed in `CLAUDE.md` at the project root or `.claude/CLAUDE.md`.

```markdown
# Project Guidelines

## Code Style & Architecture
- Maintain functional purity in service modules.
- Use explicit return type annotations.

## Security & Protection
- Never read or write `.env` or credentials directly.
```

---

### B. Antigravity (Gemini) (`.gemini/` / `RULE[...]` / KIs)

In Antigravity, rules can be defined via system rules or stored as Knowledge Items (`knowledge/`).

#### System Rule Example:
```markdown
<RULE[project_conventions]>
- Follow DRY principle across all components.
- Run `python -m py_compile` immediately after code modifications.
</RULE[project_conventions]>
```

#### Knowledge Item Example (`metadata.json` + artifact):
```json
{
  "summary": "Core domain logic and data structures for order processing pipeline",
  "references": ["src/domain/order.py"]
}
```

---

### C. Codex (`AGENTS.md` / `.codexrules`)

In Codex (OpenAI Developer Workflows), project guidelines are specified using `AGENTS.md` at the project root or within subdirectories. Codex automatically discovers and merges instructions from parent directories down to the current working directory:

```markdown
# AGENTS.md

## Context & Setup
- Primary Stack: Python 3.11+, FastAPI, PostgreSQL.
- Setup Commands: `pip install -r requirements.txt`

## Development & Verification Rules
1. **Linting & Formatting**: Execute `ruff check .` on Python files.
2. **Testing Standards**: Run unit tests (`pytest tests/unit`) before declaring task completion.
3. **Safety & Guardrails**: Never expose API keys, edit `.env`, or touch production secrets directly.
```


