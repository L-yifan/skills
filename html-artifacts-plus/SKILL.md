---
name: html-artifacts-plus
description: Produce self-contained HTML artifacts instead of markdown when the request benefits from spatial layout, color, diagrams, interactivity, sharing, or a round-trip editor. Use this skill for substantial docs, writeups, plans, specs, reports, explainers, summaries, comparisons, reviews, PR descriptions, mockups, diagrams, flowcharts, decks, status updates, post-mortems, incident reports, playgrounds, one-off editors, and document-bound editors. Also use it when the user wants to edit an existing markdown, JSON, YAML, prompt, config, or planning document through an HTML tool and export a patch/diff/instruction for an agent to apply. Stay in markdown only for short conversational replies, code-only outputs, terminal-style command answers, and content that is genuinely just a few sentences.
---

> [!IMPORTANT]
> **PRE-REQUISITE DIRECTIVE FOR THE AGENT**: Before generating any HTML codebase or design, you **MUST** read and check `references/matching-your-style.md` first to fetch the default CSS baseline (editorial spacing, real type, 70ch line limit, warm restrained accent) and avoid the AI-default visual traps.
> Additionally, if the workspace contains related reference documents, read them to align visual parameters.

# HTML Artifacts Plus

Markdown is the default agent output, but for many substantial deliverables it flattens the shape of the work. HTML can show comparisons side by side, render real diagrams, make hierarchy visible, add interaction, and give the user a shareable file they are more likely to read.

This skill is based on `dogum/html-artifacts` and keeps its core idea: choose HTML only when the format helps. The personal addition is a Level 2 document-bound editor mode: when the user wants to edit an existing source document or config through an HTML tool, generate a self-contained editor that exports a reviewable patch. The HTML never writes files directly; the agent applies the exported patch after the user sends it back.

## When to reach for HTML

Reach for HTML when any of the following is true:

- **Comparison.** Two or more options, approaches, designs, or tradeoffs need to be weighed against each other.
- **Spatial information.** Diffs, call graphs, module maps, flowcharts, timelines, before/after states, or workflows where position carries meaning.
- **Interaction matters.** Animations, parameter tuning, state transitions, sliders, toggles, sorting, filtering, or live previews.
- **Reference material.** A document the reader will navigate non-linearly with tabs, links, collapsible sections, or a glossary.
- **Color or hierarchy carries meaning.** Severity, status, syntax highlighting, design tokens, priority, ownership, or progress.
- **One-off editor.** The user needs to manipulate structured input and round-trip the result back into text, JSON, a prompt, or a commit.
- **Document-bound editor.** The user wants to update an existing file by editing a purpose-built HTML view, then export a patch for an agent to apply.
- **Sharing or handoff.** A spec, PR writeup, plan, report, or review needs to be easy for someone else to open and understand.
- **Length.** Anything that would become a long markdown wall, especially beyond roughly 100 lines.

The heuristic: if the user is going to do something with the document -- read it carefully, compare options, tune values, share it, refer back to it, hand it to another agent, or paste edits back in -- consider HTML.

## Visual resolution order

Resolve visual style in this order. Earlier sources always win:

1. The user's explicit visual direction.
2. The workspace or product design system.
3. Visual semantics required by the content, such as status, severity, or data series.
4. The neutral warm editorial baseline in `references/matching-your-style.md`.

Examples are structural references, not visual themes. Never copy an example's complete palette, card treatment, or typography without checking the first three sources above. Borrow the upstream `dogum/html-artifacts` approach to whitespace, hairline rules, and content-led layout; do not borrow its purple `#7c3aed` accent.

## When to stay in markdown

Markdown still wins for:

- Short conversational replies inside chat.
- Code-only outputs such as a function, config block, or one-liner.
- Terminal or command-style answers.
- Quick summaries the reader will scan once and discard.
- Source files that humans will edit by hand and review in git as the primary artifact.

If the durable source of truth should be markdown, JSON, YAML, or code, keep that source file in that format. It is often still useful to generate an HTML view or editor beside it.

## Universal rules for every HTML artifact

Every artifact this skill produces must satisfy these rules:

1. **Single self-contained `.html` file.** No build step, bundler, or `npm install`. CSS goes in `<style>`, JS goes in `<script>`, and images are inline SVG or data URIs unless the user explicitly wants otherwise.
2. **Works offline.** Avoid required network calls at view time. If a CDN is used, keep it optional and explain the tradeoff.
3. **Mobile responsive.** Include `<meta name="viewport" content="width=device-width, initial-scale=1">` and make the layout usable on narrow screens.
4. **Real layout, not markdown with tags.** Use the canvas HTML gives you: columns for comparisons, timelines for time, rendered diffs for diffs, diagrams for flows, controls for state.
5. **Readable on its own.** Put a clear title and a short framing sentence at the top so the user understands the file within a few seconds.
6. **Tasteful by default.** Use restrained visual design, legible type, stable spacing, and the user's existing style when available. Avoid generic gradient-card aesthetics.
7. **Editors export back to text.** Any artifact where the user manipulates state must include an export path: copy as markdown, JSON, prompt, diff, CSV, or patch.
8. **Document-bound editors do not write files.** They export patch JSON, markdown diff, and agent instructions. The user sends the export to an agent, and the agent applies it to source files.
9. **Export only when it earns its place.** Editors and document-bound artifacts must export back to text. Read-only reports, explainers, diagrams, and references add Copy Markdown or Copy Patch only when the user requests round-trip reuse or the artifact is explicitly bound to source content.
10. **Typographic and color baseline.** Default prose to 60–75ch, line-height 1.5–1.6, and a clean serif or sans-serif appropriate to the task. The fallback palette is neutral paper and white surfaces with a restrained warm terracotta accent; large tinted card fields, purple themes, generic Tailwind dashboards, emoji headers, shadows, and gradients are not defaults. Refer to `references/matching-your-style.md` for the exact tokens.

## Category index — 内容特征 → 制品选择

先分析用户提供的内容特征，再选参考文件。不要只看请求的措辞，要看**内容的形状**。如果跨越多个类别，读取所有相关 reference。

| 内容特征（用户给了什么？） | 最佳制品布局 | 读取参考 | 关键交互 | 如果…请改用… |
|---|---|---|---|---|
| 多个方案/选项/路径需要对比决策 | 等宽多列对比 + 指标行 + 推荐块 | `exploration-and-planning.md` | 只读，可加折叠 | 内容只有一个方案 → `reports-and-research.md` |
| 设计方向探索、UI 变体展示 | 网格化迷你模型，可展开 | `exploration-and-planning.md` | 只读，点击放大 | 只需要一个组件所有状态 → `design-and-prototypes.md` |
| 实现计划、里程碑路线图 | 时间线条 + 数据流图 + 风险表 | `exploration-and-planning.md` | 只读 | 只需要图 → `diagrams-and-illustrations.md` |
| 代码 diff / PR 审查 | annotated diff + 行内批注 + 严重度标签 | `code-review-and-pr.md` | 只读，跳转链接 | 内容是纯文本对比非代码 → `reports-and-research.md` |
| PR 描述撰写 | 文件导览 + before/after 并排 + 风险 | `code-review-and-pr.md` | 只读 | 需要编辑源文件 → `document-bound-editors.md` |
| 代码库模块讲解 | 模块关系图 + 热路径高亮 + 入口指引 | `code-review-and-pr.md` | 只读，可折叠细节 | 只需要图 → `diagrams-and-illustrations.md` |
| 设计系统/组件变体展示 | token 色板 + 组件状态矩阵 + 复制按钮 | `design-and-prototypes.md` | 复制 token/属性值 | 只是设计方向探索 → `exploration-and-planning.md` |
| 动画/交互原型调参 | 舞台 + 参数滑块 + 实时代码输出 | `design-and-prototypes.md` | 拖拽滑块、实时预览、复制代码 | 通用参数调优 → `sandboxes-and-interactive-tuners.md` |
| 流程图/架构图/技术插图 | SVG 图 + 点击展开侧栏 + 复制 SVG | `diagrams-and-illustrations.md` | 点击节点、复制 SVG | 需要数据图表 → `interactive-visualizations.md` |
| 数据图表/指标看板/性能图 | 原生 SVG 柱/线/区图 + hover 工具提示 | `interactive-visualizations.md` | hover 数据、可能切换视图 | 只是静态插图 → `diagrams-and-illustrations.md` |
| 状态报告/事故回顾/概念讲解 | TL;DR + 时间线 + 折叠区 + 边栏词汇表 | `reports-and-research.md` | 折叠展开、tab 切换 | 需要投屏演讲 → `decks.md` |
| 投屏演讲稿 | 全屏 slide + 键盘翻页 + 页码指示器 | `decks.md` | ← → 翻页、F 全屏 | 需要仔细阅读 → `reports-and-research.md` |
| 一次性工具（分类/排序/调参/标注） | 工作区主导 + 控件侧栏 + 导出按钮 | `custom-editors.md` | 拖拽/切换/输入 + 导出 Markdown/JSON | 绑定到源文件 → `document-bound-editors.md` |
| 交互沙盒/算法可视化 | 分栏：控件 + 画布 + 代码输出 | `sandboxes-and-interactive-tuners.md` | 滑块/按钮 + 实时刷新 + 复制配置 | 只是一个编辑器 → `custom-editors.md` |
| 编辑已有文件并导出 patch | 源文件绑定 + 可编辑区 + Patch/Markdown Diff/Agent Instruction 三导出 | `document-bound-editors.md` | 编辑 + 导出 + 重置 | 不绑定源文件 → `custom-editors.md` |
| 匹配用户现有视觉风格 | 从代码库提取 token 生成 design-system.html | `matching-your-style.md` | 只读参考 | 没有现有风格 → 直接用 fallback CSS |

### 常见内容→制品匹配错误

- **给了代码 diff → 却生成报告页**：代码 diff 应该走 annotated diff 布局（`code-review-and-pr.md`），不是报告格式。
- **给了多个方案 → 却串行堆叠**：多方案对比应该用等宽列并排（`exploration-and-planning.md`），不是纵向 section 堆叠。
- **给了 JSON/YAML 配置 → 却生成只读视图**：用户要编辑配置时应该走 `document-bound-editors.md` 或 `custom-editors.md`，给表单/编辑器而非纯展示。
- **给了时间线数据 → 却用列表**：时间线应该渲染为视觉时间轴（`reports-and-research.md`），不是 markdown 风格有序列表。
- **只是静态报告 → 却加了拖拽/排序**：只读报告不需要交互。交互只为操作服务，不为装饰。
- **需要投屏 → 却生成滚动长页**：演讲内容应该走 `decks.md` 的 slide 模式，不是报告的长滚动布局。

## 交互决策指南

不是所有 HTML 制品都需要交互。在添加交互前，先读 `references/interaction-decisions.md`，确认交互确实服务于用户的操作意图。

快速原则：
- **只读 = 不需要交互。** 报告、讲解、对比、图表、插图——用户只看不操作。
- **操作 = 需要交互 + 导出。** 编辑器、沙盒、分类板——用户操作后必须能导出结果。
- **投屏 = 只需要翻页交互。** 上一个/下一个，可能需要全屏。
- **数据探索 = 需要筛选/排序/hover。** 但不要加编辑功能。

## 生成后自检（保存前必查）

在保存 HTML 文件之前，快速自问 3 个问题：

1. **布局匹配吗？** — 内容的形状是否驱动了布局选择？（对比→列 / 流程→图 / 时间→时间线 / 代码→diff / 配置→表单）还是我用了一个通用报告布局敷衍了事？
2. **交互恰好吗？** — 加了交互是因为用户需要操作（编辑/排序/筛选/导出），还是因为"好看"？只读内容有没有被多余的交互干扰？
3. **用户拿到能做什么？** — 这个 HTML 是让人更好地**读**（对比、图示、时间线）、更好地**讲**（投屏）、还是更好地**改**（编辑→导出）？如果三个都不沾，考虑是否应该用 markdown。

如果任何一题回答不确定，重新审视 Category Index 决策表，确认选对了制品类型。

## Document-bound editor trigger

Use `references/document-bound-editors.md` only when the user explicitly wants the HTML tool to represent an existing source file or future file change. Good signals include:

- "edit this markdown/config/JSON/YAML/prompt through an HTML page"
- "update this document and export a patch"
- "make a tool page where I can change the plan and send the result back to the agent"
- "bind this UI to `docs/plan.md` / `config.json` / `prompts/system.md`"
- "copy diff", "copy patch", "agent can apply the changes"

Do not use document-bound mode just because an editor exports JSON. A ticket triage board or prompt tuner with no explicit source-file binding is a normal custom editor.

When building a document-bound editor, read `references/document-bound-editors.md` first.

## Output mechanics

### In Claude Code

Save the file to the working directory with a descriptive `kebab-case` name and a `.html` extension. Examples: `onboarding-design-explorations.html`, `pr-streaming-review.html`, `cycle-14-triage.html`, `plan-section-editor.html`.

If the artifact is part of a web of related files, put them in a folder together. After saving, tell the user the path and, when appropriate, offer to open it in their browser.

For document-bound editors, also tell the user:

- which source files the editor is bound to;
- that the HTML does not save automatically;
- which export button to use when they are ready for the agent to apply changes.

For read-only artifacts, do not add an export toolbar by habit. Add one only when the user asked for it, the page is a reusable source-bound view, or copying the rendered content is a material part of the workflow.

### In Claude.ai

Use the artifact system and output a single HTML artifact (`text/html`) unless the request specifically calls for another artifact type. For Claude.ai artifacts, use in-memory state and avoid browser storage. For local Claude Code `.html` files, `localStorage` is acceptable for session recovery.

## Token cost and time

HTML costs more tokens and takes longer than markdown. That tradeoff is worth it when the artifact will be read, shared, compared, manipulated, or reused. Do not manufacture an HTML artifact for a disposable answer.

## What this skill is not

This skill is not "always answer in HTML." It is also not a document management system. It does not maintain indexes, lifecycle states, or automatic sync. It gives the user a better reading or editing surface, then exports the user's choices back into a format an agent can apply safely.
