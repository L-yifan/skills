---
name: html-artifacts-plus
description: Create self-contained HTML artifacts when spatial layout, visual hierarchy, interaction, or sharing materially improves a substantial deliverable. Use for comparisons, diagrams, timelines, decks, data views, interactive tools, and source-bound editors that export reviewable patches. Keep short chat replies, code-only or command-only answers, and git-first source documents in Markdown or text.
---

> [!IMPORTANT]
> **PRE-REQUISITE DIRECTIVE FOR THE AGENT**: Before generating any HTML codebase or design, you **MUST** read and check `references/matching-your-style.md` first. Use it to resolve the visual source of truth, apply the fallback tokens when no stronger source exists, and avoid AI-default visual traps. Its prose measure applies to reading columns, not to the whole page shell, diagrams, comparisons, decks, or editors.
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

## 制作闭环

此技能的目标是做出适合内容的 HTML 制品，不是把每个任务都变成完整网页设计项目。按下面的轻量闭环完成工作；默认在内部判断，不增加用户确认闸门。

1. **路由。** 根据内容形状选择制品类型并读取对应 reference；先判断页面是让人读、讲还是操作。
2. **Composition brief。** 写代码前在心中确定四件事：用户在这页完成的一个任务、首屏回答的一句话、唯一主视觉锚点、从标题到结论/操作的阅读顺序。再确定阅读距离、信息密度和视觉温度。
3. **容量与宽度。** 区分页面外壳、阅读列和空间画布：正文保持 60–75ch；对比、图表、时间线可使用更宽画布；编辑器可全宽。首屏只保留一个最强焦点，每页默认最多一个主视觉和两个辅助结构。
4. **品牌资产优先。** 围绕明确品牌或产品时，优先使用真实 Logo、产品图、截图与设计 token。缺少资产时使用带标签的诚实占位，不伪造品牌识别。
5. **生成并有界验收。** 保存后优先使用环境中已经可用的浏览器或截图工具检查桌面 `1440×900` 和手机 `390×844`。检查横向滚动、遮挡、截断、首屏层级、卡片墙、过长移动端比较和控件可达性；发现问题后修改并复查。视觉验收是有界步骤：最多做一次工具诊断或重试，总计不超过约 90 秒；不要仅为 QA 安装浏览器、启动本地服务器或委派子代理。若现有渲染路径失败，立即执行源码与交互 smoke check，并在交付时说明未完成视觉渲染。

完成标准：已渲染时，产物在两个目标视口都可用，标题、核心结论/当前状态和下一步能快速识别，且视觉锚点服务内容而不是装饰；无法渲染时，源码检查通过且交付说明准确披露该限制。

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
11. **Width roles.** Keep the page shell wide enough for the chosen artifact, and constrain only prose blocks. A global `body { max-width: 70ch }` is suitable only for a simple reading page; it is a defect when it compresses comparisons, diagrams, timelines, decks, or editors.

## Category index — 内容特征 → 制品选择

先分析用户提供的内容特征，再选参考文件。不要只看请求的措辞，要看**内容的形状**。如果跨越多个类别，读取所有相关 reference。

| 内容特征（用户给了什么？） | 最佳制品布局 | 读取参考 | 关键交互 | 如果…请改用… |
|---|---|---|---|---|
| 多个方案/选项/路径需要对比决策 | 等宽多列对比 + 指标行 + 推荐块；窄屏优先保留跨方案指标关系，避免只把完整卡片串成长页 | `exploration-and-planning.md` | 只读，可加折叠 | 内容只有一个方案 → `reports-and-research.md` |
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

## 渲染验收（交付前必查）

源码自检不能替代渲染。保存后按“制作闭环”打开成品并检查：

1. **内容匹配。** 对比能同时比较，流程看得出方向，时间线看得出先后，代码呈现 diff，配置提供表单；没有退化成通用报告页。
2. **首屏层级。** 标题、核心结论/当前状态和下一步一眼可见；标题或装饰没有压过主要信息；只能有一个最强视觉焦点。
3. **容量。** `1440×900` 与 `390×844` 均无横向滚动、遮挡或截断。窄屏对比仍能追踪同一指标，而不是仅把完整卡片纵向堆到数屏长。
4. **交互。** 只读页没有装饰性交互；操作型页面完成一次“修改→导出→重置” smoke test；键盘和触摸都有可达路径。
5. **视觉纪律。** 页面没有同权重卡片墙、无意义色块、填充内容或未解释的颜色；正文、画布和侧栏宽度各司其职。

任何一项失败都先调整信息层级、构图或控件路径，再复查；不要靠缩小字体、增加卡片或添加装饰掩盖容量问题。继续执行 `references/matching-your-style.md` 的 Visual quality gate。

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
