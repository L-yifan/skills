---
name: agent-automation-recommender
description: Analyze a codebase and recommend AI Agent automations and extensibility options across 6 dimensions for Claude Code, Antigravity (Gemini), Codex, and general AI Agents.
allowed-tools: Read, Glob, Grep, Bash
---

# Agent Automation Recommender

Analyze codebase patterns to recommend tailored AI Agent automations across 6 universal extensibility dimensions, customized for **Claude Code**, **Antigravity (Gemini)**, **Codex**, or generic Agent environments.

**This skill is read-only.** It analyzes the codebase and outputs structured recommendations. It does NOT create or modify any files. Users implement the recommendations themselves or ask the agent separately to help build them.

## Decision Principles

Use the smallest effective automation, backed by repository evidence.

1. **Prefer existing mechanisms**: inspect package scripts, CI, tests, configuration, and native Agent features before proposing a new skill, MCP server, plugin, or dependency.
2. **Route by enforcement need**:
   - stable intent, rationale, or convention -> Rules & Knowledge;
   - mechanically checkable invariant -> tests or CI;
   - fast lifecycle feedback -> Hooks & Guardrails;
   - repeated multi-step workflow -> Skills & Tools;
   - live external data -> MCP Servers;
   - independent focused work -> Subagents & Roles;
   - a bundle -> Plugins & Packages only when several required capabilities share setup.
3. **Recommend less**: return at most 5 total items, ranked by value, effort, and risk. Omit dimensions with no concrete problem or evidence.
4. **Keep memory exceptional**: recommend persistent memory only for information that cannot be recovered from code or maintained documentation, and state an audit or expiry plan. Prefer curated project rules for stable constraints.
5. **State operational impact**: label each item as `[read-only]`, `[local write]`, `[external write]`, or `[requires confirmation]`. Recommendations must not imply installation, production access, or external mutation without explicit confirmation.

## Output Guidelines

- **Recommendation budget**: Recommend at most 5 items in total, normally no more than 1 per dimension. Omit a dimension when the codebase provides no evidence of a concrete need.
- **Agent Context Adaptation**: Tailor file paths, syntax, and configuration snippets directly to the target Agent environment (Claude Code, Antigravity, Codex).
- **Evidence first**: Use web search only when available and when repository evidence leaves a current-fact gap; identify the source and mark uncertainty when it remains.
- **Verification loop**: Every recommendation must include the expected outcome, implementation cost or maintenance burden, risk or side effect, a minimal verification check, and a disable/rollback path.
- **Interactive Follow-up**: Inform users they can request additional recommendations or assistance implementing any specific item.

---

## 6 Universal Extensibility Dimensions

| Dimension | Purpose & Focus |
|-----------|-----------------|
| **🔌 1. MCP Servers** | External tool integrations, live documentation, database, & cloud connectors |
| **🎯 2. Skills & Tools** | Packaged workflows, repeatable tasks, slash commands, & project-specific scripts |
| **⚡ 3. Hooks & Guardrails** | Fast feedback and enforcement through tests, CI, lifecycle hooks, linting, and file protection |
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

Use read-only, platform-appropriate commands. On Windows, use PowerShell equivalents. Confirm a signal by checking actual scripts, CI, and configuration; a marker file alone is not proof that a tool is in use.

---

### Phase 2: Generate Recommendations Across 6 Dimensions

Read only the reference guides relevant to dimensions supported by concrete evidence; do not load every reference by default:
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

Every proposed item must state: **Evidence**, **Why this is the smallest fit**, **Impact / effort / risk**, **Verification**, and **Disable / rollback**. Start with a short decision summary naming the top choices, existing mechanisms reused, and options deliberately skipped.

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
- **Evidence**: [Observed dependency, script, workflow, or explicit need]
- **Why**: [Specific reason based on dependencies]
- **Why this is the smallest fit**: [Why existing tools or a simpler layer are insufficient]
- **Impact / effort / risk**: [[read-only] / [local write] / [external write] / [requires confirmation]; maintenance and security notes]
- **Verification**: [Minimal check that demonstrates the expected outcome]
- **Disable / rollback**: [How to remove or turn it off]
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
