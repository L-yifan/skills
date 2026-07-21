# Agent Capability & Syntax Mapping Reference

This reference provides exact configuration paths, file structures, and syntax mappings across supported AI Agent platforms: **Claude Code**, **Antigravity (Gemini)**, and **Codex**.

---

## 1. Capability Taxonomy Overview

| Universal Dimension | Claude Code | Antigravity (Gemini) | Codex |
|---------------------|-------------|----------------------|-------|
| **MCP Servers** | `.mcp.json` / `claude mcp add` | `.gemini/config/plugins/...` / MCP config | Standardized MCP config / env tools |
| **Skills & Tools** | `.claude/skills/<name>/SKILL.md` | `.gemini/config/plugins/.../skills/<name>/SKILL.md` | Custom Tool functions / Python scripts |
| **Hooks & Guardrails** | `.claude/settings.json` (Pre/PostToolUse) | `RULE[...]` / Execution Interceptors | Git Pre-commit hooks / CI checks |
| **Subagents** | `.claude/agents/<name>.md` | `.gemini/config/plugins/.../agents/` / Subagent calls | Specialized Prompt Roles / Sub-tasks |
| **Rules & Knowledge** | `CLAUDE.md` / Guidelines | `.gemini/` Rules (`RULE[...]`), Knowledge Items (`knowledge/`) | `AGENTS.md`, `.codexrules`, `SYSTEM_PROMPT.md` |
| **Plugins & Bundles** | `.claude/plugins/` | Plugin folders (manifest, skills, agents) | Bundled Script Packages |

---

## 2. Platform Specific Implementations

### A. Claude Code

- **Config Directory**: `.claude/`
- **Main Context File**: `CLAUDE.md`
- **MCP Servers**: Configured in `.mcp.json` or global configuration.
- **Skills Location**: `.claude/skills/<skill-name>/SKILL.md`
  - Frontmatter:
    ```yaml
    ---
    name: skill-name
    description: Description of the skill
    disable-model-invocation: true # Optional: User-only
    user-invocable: false          # Optional: Model-only
    ---
    ```
- **Hooks Location**: `.claude/settings.json`
  - Example Hook Structure:
    ```json
    {
      "hooks": {
        "PostToolUse": [
          {
            "tool": "Edit",
            "command": "npx prettier --write $FILE"
          }
        ]
      }
    }
    ```
- **Subagents Location**: `.claude/agents/<agent-name>.md`

---

### B. Antigravity (Gemini)

- **Config Directory**: `.gemini/`
- **Main Rules & Knowledge**: `RULE[...]` tags in system context, `.gemini/knowledge/` (Knowledge Items with `metadata.json` & `artifacts/`).
- **MCP & Tool Integrations**: Declared via plugin configurations or MCP server manifests.
- **Skills Location**: `.gemini/config/plugins/<plugin-name>/skills/<skill-name>/SKILL.md` or workspace skills.
- **Slash Commands**: Specialized triggers like `/goal`, `/schedule`, `/grill-me`.
- **Subagents Location**: `.gemini/config/plugins/<plugin-name>/agents/<subagent-name>.md` or subagent declarations.
- **Rules Structure Example**:
  ```markdown
  <RULE[project_conventions]>
  - Always enforce TDD workflow before modifying code.
  - Run syntax check (python -m py_compile) immediately after edits.
  </RULE[project_conventions]>
  ```

---

### C. Codex (OpenAI Developer Environment)

- **Primary Instruction Mechanism**: `AGENTS.md` (Official open standard for project-level AI instructions, automatically discovered & concatenated from repo root down to working directory)
- **Global & Project Rules**: `~/.codex/AGENTS.md` (global defaults), `.codexrules` or repository `AGENTS.md` (project-level overrides).
- **Skills & Custom Functions**: Executable scripts under `scripts/` / `tools/` referenced inside `AGENTS.md`, or external APIs integrated via standard MCP connectors.
- **Hooks & Guardrails**: Workflow constraints specified in `AGENTS.md` ("always run tests before completion"), enforced alongside `.git/hooks/pre-commit` or CI pipelines.
- **Subagents & Multi-Tasking**: Dedicated sub-agent tasks or role templates invoked via background execution.
- **Official Structure Example (`AGENTS.md`)**:
  ```markdown
  # AGENTS.md

  ## Context & Setup Commands
  - Stack: Node.js 20+, TypeScript, Vite
  - Setup: `pnpm install`

  ## Coding & Quality Standards
  - Use strict TypeScript; avoid `any`.
  - Always run `pnpm test` and `pnpm lint` after editing code.

  ## Safety & Workflow Constraints
  - Do NOT modify `.env`, lockfiles, or production credentials.
  - Require user confirmation before adding new dependencies.
  ```

---

## 3. Platform Detection Strategy

When analyzing a project, check for the following file/folder signatures to determine the active agent context:

1. **Claude Code**: Presence of `.claude/` directory, `CLAUDE.md`, or `.mcp.json`.
2. **Antigravity (Gemini)**: Presence of `.gemini/` directory or `RULE[...]` definitions.
3. **Codex**: Presence of `AGENTS.md`, `.codexrules`, or `~/.codex/` configurations.

If multiple signatures exist or none are present, provide universal recommendations formatted with sub-sections for each relevant agent platform.

