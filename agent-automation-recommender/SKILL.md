---
name: agent-automation-recommender
description: Analyze a codebase and recommend AI Agent automations and extensibility options across 6 dimensions for Claude Code, Antigravity (Gemini), Codex, and general AI Agents.
tools: Read, Glob, Grep, Bash
---

# Agent Automation Recommender

Analyze codebase patterns to recommend tailored AI Agent automations across 6 universal extensibility dimensions, customized for **Claude Code**, **Antigravity (Gemini)**, **Codex**, or generic Agent environments.

**This skill is read-only.** It analyzes the codebase and outputs structured recommendations. It does NOT create or modify any files. Users implement the recommendations themselves or ask the agent separately to help build them.

## Output Guidelines

- **Recommend 1-2 per dimension**: Focus on the highest-value recommendations per category to avoid overwhelming the user.
- **Agent Context Adaptation**: Tailor file paths, syntax, and configuration snippets directly to the target Agent environment (Claude Code, Antigravity, Codex).
- **Go beyond standard lists**: Use web search when needed to discover specialized MCP servers or tools tailored to the project's tech stack.
- **Interactive Follow-up**: Inform users they can request additional recommendations or assistance implementing any specific item.

---

## 6 Universal Extensibility Dimensions

| Dimension | Purpose & Focus |
|-----------|-----------------|
| **🔌 1. MCP Servers** | External tool integrations, live documentation, database, & cloud connectors |
| **🎯 2. Skills & Tools** | Packaged workflows, repeatable tasks, slash commands, & project-specific scripts |
| **⚡ 3. Hooks & Guardrails** | Event-driven actions (Pre/Post tool execution, auto-formatting, linting, file protection) |
| **🤖 4. Subagents & Roles** | Focused review agents, parallel analyzers, & specialized persona prompts |
| **📜 5. Rules & Knowledge** | Code guidelines, project rules, system prompts (`CLAUDE.md`, `RULE[...]`, `AGENTS.md`), & Knowledge Items |
| **📦 6. Plugins & Packages** | Installable capability bundles & extension packages |

---

## Workflow

### Phase 1: Codebase & Agent Context Analysis

1. **Detect Target Agent Environment:**

```bash
# Check for agent signature files
ls -d .claude .gemini AGENTS.md CLAUDE.md .codexrules 2>/dev/null
```
- If `.claude/` or `CLAUDE.md` exists -> Target: **Claude Code**
- If `.gemini/` exists -> Target: **Antigravity (Gemini)**
- If `AGENTS.md` or `.codexrules` exists -> Target: **Codex**
- If explicit user prompt specifies an agent (e.g. "recommend for Antigravity") -> Target: Specified Agent
- Otherwise -> Target: **Universal Multi-Agent**

2. **Detect Codebase Tech Stack & Signals:**

```bash
# Detect project type and package manifests
ls -la package.json pyproject.toml Cargo.toml go.mod pom.xml 2>/dev/null
cat package.json 2>/dev/null | head -50

# Check key libraries and frameworks
cat package.json 2>/dev/null | grep -E '"(react|vue|angular|next|express|fastapi|django|prisma|supabase|convex|stripe)"'

# Inspect project directory structure & tests
ls -la src/ app/ lib/ tests/ components/ pages/ api/ 2>/dev/null
```

---

### Phase 2: Generate Recommendations Across 6 Dimensions

Consult reference guides in `references/` for detailed pattern matching:
- [references/agent-mappings.md](references/agent-mappings.md) for platform-specific syntax & paths
- [references/mcp-servers.md](references/mcp-servers.md) for MCP server patterns
- [references/skills-reference.md](references/skills-reference.md) for Skills & Custom Tools
- [references/hooks-patterns.md](references/hooks-patterns.md) for Hooks & Guardrails
- [references/subagent-templates.md](references/subagent-templates.md) for Subagents & Roles
- [references/rules-and-knowledge.md](references/rules-and-knowledge.md) for Rules & Knowledge Items
- [references/plugins-reference.md](references/plugins-reference.md) for Plugins & Extension Bundles

---

### Phase 3: Output Recommendations Report

Format the final report clearly with code blocks tailored to the detected Target Agent:

```markdown
## AI Agent Automation Recommendations

I've analyzed your codebase and identified the top automations across all 6 dimensions.

### 🔍 Codebase & Agent Profile
- **Target Agent Context**: [Claude Code / Antigravity / Codex / Universal]
- **Language / Runtime**: [detected language/runtime]
- **Framework & Libraries**: [detected framework & key packages]

---

### 🔌 1. MCP Servers
#### [MCP Name]
- **Why**: [Specific reason based on dependencies]
- **Config Syntax**: [Target Agent specific installation / config snippet]

---

### 🎯 2. Skills & Custom Tools
#### [Skill Name]
- **Why**: [Specific workflow value]
- **Location**: [Target Agent path, e.g. .claude/skills/[name]/SKILL.md or .gemini/config/plugins/...]
- **Structure / Syntax**:
```yaml
---
name: [skill-name]
description: [description]
---
```

---

### ⚡ 3. Hooks & Guardrails
#### [Hook Name]
- **Why**: [Reasoning based on Prettier, ESLint, pytest, or sensitive files]
- **Target File**: [e.g. .claude/settings.json, RULE[...] or .git/hooks/pre-commit]

---

### 🤖 4. Subagents & Roles
#### [Subagent Name]
- **Why**: [Parallel analysis or review needs]
- **Location**: [e.g. .claude/agents/[name].md or .gemini/config/plugins/.../agents/]

---

### 📜 5. Rules & Project Knowledge
#### [Rule / KI Name]
- **Why**: [Architecture, security, or domain context needs]
- **Target Location**: [CLAUDE.md / .gemini/ (RULE/KI) / AGENTS.md]

---

### 📦 6. Plugins & Packages
#### [Plugin Name]
- **Why**: [Workflow bundle value]
- **Installation**: [Command or path instructions]

---

**Next Steps**:
- Ask for additional recommendations in any category (e.g. "show more MCP servers").
- Ask for direct assistance setting up or creating any of the recommended items above!
```
