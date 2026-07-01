---
name: skill-backup
description: Maintain a personal skills index repository such as L-yifan/skills. Use when the user discovers a useful external skill, wants to add an external skill reference to the repo README, creates a new custom skill and wants it backed up into the repo, or asks to sync, catalog, publish, or preserve skills in their personal skills repository.
---

# Skill Backup

Use this skill to keep the user's personal skills repository current. The repository distinguishes between:

- **Self-built skills**: source code lives in this repo and appears in the README's self-built table.
- **External skills**: source code stays in the upstream repo; this repo only keeps a README reference.

## ⚠️ 重要警示：`.agents/skills/` 是托管安装目录

`$env:USERPROFILE\.agents\skills\` 是 `npx skills` 包管理器托管目录，**不是 git 仓库**，也不应作为技能源：

- 该目录下的文件可能被 `npx skills update` 等命令静默覆盖或删除
- 编辑后的文件可能在备份阶段已经消失（本次实际遇到过）
- `.gemini/config/plugins/general-skills/skills/` 是另一个常见的技能安装目录（Codex/Gemini 生态），同样受托管
- **永远不要在托管目录中编辑文件后再备份**——应先将文件复制到安全位置

## Workflow

### Step 1: 定位 skills 仓库

- Prefer a user-provided repo URL or local checkout.
- Check common local clones before cloning fresh: `$env:USERPROFILE\projects\skills\`, `$env:USERPROFILE\.claude\projects\*\` etc.
- **Do NOT use `$env:USERPROFILE\.agents\skills\` as the repo** — it is NOT a git clone, it is a managed installation directory (see warning above).
- If the user says "our repo" and no checkout is open, use `L-yifan/skills`.
- When cloning, use a named working directory (e.g. `$(mktemp -d)` on Unix, `$env:TEMP\skills-backup` on Windows) rather than `/tmp/`, so all tools (Read, Edit, etc.) can resolve the path. Record the path so cleanup can find it later.

### Step 2: 定位自建技能的「真实源」目录

当备份或更新一个自建技能时，**不要直接使用 `.agents/skills/<skill-name>/` 中的文件**（原因见上方警示）。按以下顺序查找真正的技能源：

1. **用户明确指定的路径**（最高优先级）
2. **`.gemini/config/plugins/general-skills/skills/<skill-name>/`** — Codex/Gemini 插件缓存
3. **`.agents/skills/<skill-name>/`** — Claude Code 技能安装目录（最后手段，文件可能随时消失）
4. **整个用户目录搜索**：`find $HOME -name "SKILL.md" -path "*/<skill-name>/*" 2>/dev/null`
5. **仓库中的旧版本**：如果以上都没找到，用 clone 下来的仓库中已有的旧版本（至少保证了备份不会丢失更旧的内容）

找到多个副本时，**优先用最近修改过的**（`ls -lt` 排序），并告知用户找到了哪些副本、选择了哪个。

### Step 3: 分类请求

- Treat GitHub URLs, marketplace links, or third-party skill names as **external skills** unless the user explicitly asks to vendor/copy the source.
- Treat local skill folders, newly created skills, or skills authored for this repo as **self-built skills**.
- **对于已有的自建技能进行更新**：先验证技能源文件仍然存在（见 Step 2），再决定是直接复制还是需要重新应用改动。

### Step 4: 备份前验证（自建技能更新时必做）

在将文件复制/应用到仓库 clone 之前：

1. **列出源目录文件**：确认 `SKILL.md` + 所有 reference/script 文件都还在
2. **对比仓库旧版本**：`diff -rq <source-dir> <repo-clone>/<skill-name>/` 确认哪些文件变更了
3. **确认无遗漏**：如果旧版本有但源版本没有的文件，判断是故意的删除还是源丢失
4. **如果有文件丢失**：从仓库旧版本恢复，并告知用户

### Step 5: 应用到仓库

同步策略选择：

- **完全替换**（推荐用于自建技能更新）：`rm -rf <repo>/<skill-name> && cp -r <source> <repo>/<skill-name>`，然后用 `git status` 检查差异
- **增量添加**（用于新增文件）：只复制新文件，不动已有文件

### Step 7: README 元数据

- Update the version date when the README index changes.
- Keep descriptions short and Chinese-facing unless the surrounding section is English.
- Keep table formatting consistent with nearby rows.
- 对自建技能的描述，应反映最新版本的变化（不仅仅是旧的简介）。

### Step 8: 验证

- Check `git diff` and `git status --short`.
- **Verify Markdown table integrity**: count the pipe characters per row to ensure the new entry didn't break column alignment.
- For self-built skills, validate required frontmatter: only `name` and `description`, both non-empty.
- **对于更新场景**：验证新文件确实存在（如新建的 reference/script），验证旧文件都有对应的更新。

### Step 9: 清理

Delete the temporary clone directory after publishing, so no stale checkout is left behind.

### Step 10: 发布

- If the user asks to commit, push, or open a PR, follow the repository's Git/GitHub workflow.
- Otherwise leave a clean summary of the local files changed and whether publishing remains.

## Common Cases

| 用户意图 | 典型表达 | 处理方式 |
|---|---|---|
| 新增外部技能 | "add this skill to our backup" | 读上游 SKILL.md → README 外部表加一行 |
| 新增自建技能 | "back up this skill I made" | 定位源目录 → 复制到仓库 → 自建表加一行 |
| **更新已有自建技能** | "进行备份版本的更新"、"update the backup"、"sync my changes" | **Step 2 定位源（多个副本！）→ Step 4 验证源存在 → Step 5 完全替换 → Step 8 确认 diff 合理** |
| 含义模糊 | "install this into our skills repo" | 先检查来源——第三方 → 外部引用；用户创作 → 源码备份 |

### 更新已有技能的常见陷阱

本次备份 html-artifacts-plus 时遇到的实际问题（2026-07-01）：

1. **在 `.agents/skills/` 中编辑的文件在备份时已消失** —— 因为该目录是包管理器托管目录。教训：永远不要在托管目录中编辑文件后直接备份。
2. **找到了 5 个技能副本** —— 分布在 `.agents/`、`.gemini/`、`Documents/Codex/`、`Temp/`。需要选择最近修改且文件最完整的。
3. **`.gemini/config/plugins/general-skills/skills/` 才是实际的技能源** —— 这是 Codex/Gemini 的插件缓存，文件完整且包含所有更新。`.agents/` 下的副本可能不完整或被清理。
4. **新文件容易遗漏** —— `interaction-decisions.md` 是新建的，旧仓库没有。备份时需要确认新文件也一并复制。
