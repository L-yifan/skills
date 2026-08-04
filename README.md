
个人心仪的 Agent Skills 索引，支持 OpenCode、Claude Code、Cursor 等 40+ AI 代理。

## 自建技能

以下技能由本仓库维护，可直接安装：

| 技能名 | 描述 | 安装命令 |
|--------|------|----------|
| html-artifacts-plus | 生成自包含 HTML artifacts（含内容特征决策表、轻量前端设计判断与交互/视觉自检），并支持文档绑定编辑器导出可审查 patch | `npx skills add https://github.com/L-yifan/skills --skill html-artifacts-plus` |
| humanizer-zh | 去除中文文本中的 AI 写作痕迹 | `npx skills add https://github.com/L-yifan/skills --skill humanizer-zh` |
| structural-thinker | 从数据结构视角分析并优化任何系统、流程、设计或问题 | `npx skills add https://github.com/L-yifan/skills --skill structural-thinker` |
| deep-wiki | GitHub 仓库 AI 文档 | `npx skills add https://github.com/L-yifan/skills --skill deep-wiki` |
| skill-backup | 将自建或外部技能同步到个人索引仓库（含来源核验、发布状态与临时目录收尾规则） | `npx skills add https://github.com/L-yifan/skills --skill skill-backup` |
| skill-discovery | 从个人索引推荐技能，并严格区分索引内与索引外候选 | `npx skills add https://github.com/L-yifan/skills --skill skill-discovery` |
| retro-industrial-dashboard-design | 为复古工业点阵仪表盘提供项目发现、视觉系统、DESIGN.md、实现与一致性审查指导 | `npx skills add https://github.com/L-yifan/skills --skill retro-industrial-dashboard-design` |
| agent-md-improver | 审计、精简并优化 AGENTS.md 和 CLAUDE.md；先识别项目风险，保护兼容性、迁移、回滚、安全、数据完整性和发布约束 | `npx skills add https://github.com/L-yifan/skills --skill agent-md-improver` |
| agent-automation-recommender | 分析代码库并从 6 个维度推荐适合 Claude Code、Antigravity、Codex 的 Agent 自动化扩展方案 | `npx skills add https://github.com/L-yifan/skills --skill agent-automation-recommender` |
| agent-team-prompting | 编写、改进并评估 AI Agent 团队启动提示词，覆盖角色分工、协作规则、质量门槛与最终汇总 | `npx skills add https://github.com/L-yifan/skills --skill agent-team-prompting` |


> **注意**：自建技能中，技能源码存放在本仓库（如 deep-wiki、github 等）；外部技能（如下方表格中的技能）仅在 README 中引用，源码存放在其官方仓库。

---

## 文档处理

| 技能名 | 描述 | 来源 | 安装命令 |
|--------|------|------|----------|
| docx | Word 文档（.docx）处理 | [anthropics/skills](https://github.com/anthropics/skills) | `npx skills add https://github.com/anthropics/skills --skill docx` |
| pdf | PDF 文件处理 | [anthropics/skills](https://github.com/anthropics/skills) | `npx skills add https://github.com/anthropics/skills --skill pdf` |
| pptx | PowerPoint 演示文稿处理 | [anthropics/skills](https://github.com/anthropics/skills) | `npx skills add https://github.com/anthropics/skills --skill pptx` |
| xlsx | 电子表格（.xlsx, .xlsm, .csv）处理 | [anthropics/skills](https://github.com/anthropics/skills) | `npx skills add https://github.com/anthropics/skills --skill xlsx` |
| MinerU Document Extractor | 多格式文档提取（PDF、图片、Word、PPT、网页转 Markdown/HTML/LaTeX/DOCX） | [opendatalab/mineru-ecosystem](https://github.com/opendatalab/MinerU-Ecosystem) | `npx skills add https://github.com/opendatalab/mineru-ecosystem --skill "MinerU Document Extractor"` |
| kb-retriever | 检索与问答本地知识库（支持分层检索） | [ConardLi/garden-skills](https://github.com/ConardLi/garden-skills) | `npx skills add https://github.com/ConardLi/garden-skills --skill kb-retriever` |

| 技能名 | 描述 | 来源 | 安装命令 |
|--------|------|------|----------|
| search | Web 搜索（Tavily） | [tavily-ai/skills](https://github.com/tavily-ai/skills) | `npx skills add https://github.com/tavily-ai/skills --skill tavily-search` |
| crawl | 网站抓取 | [tavily-ai/skills](https://github.com/tavily-ai/skills) | `npx skills add https://github.com/tavily-ai/skills --skill tavily-crawl` |
| extract | 页面内容提取 | [tavily-ai/skills](https://github.com/tavily-ai/skills) | `npx skills add https://github.com/tavily-ai/skills --skill tavily-extract` |
| research | 多来源综合研究 | [tavily-ai/skills](https://github.com/tavily-ai/skills) | `npx skills add https://github.com/tavily-ai/skills --skill tavily-research` |
| tavily-best-practices | Tavily 集成最佳实践 | [tavily-ai/skills](https://github.com/tavily-ai/skills) | `npx skills add https://github.com/tavily-ai/skills --skill tavily-best-practices` |
| agent-browser | 浏览器自动化 CLI | [vercel-labs/agent-browser](https://github.com/vercel-labs/agent-browser) | `npx skills add https://github.com/vercel-labs/agent-browser` |


## AI 写作润色

| 技能名 | 描述 | 来源 | 安装命令 |
|--------|------|------|----------|
| humanizer | 去除英文文本中的 AI 写作痕迹 | [blader/humanizer](https://github.com/blader/humanizer) | `npx skills add https://github.com/blader/humanizer` |

## AI/ML 研究

| 技能名 | 描述 | 来源 | 安装命令 |
|--------|------|------|----------|
| asta-skill | Semantic Scholar / Asta MCP 学术检索、论文发现与引文追踪 | [Agents365-ai/asta-skill](https://github.com/Agents365-ai/asta-skill) | `npx skills add https://github.com/Agents365-ai/asta-skill --skill asta-skill` |

## Agent 框架

| 技能名 | 描述 | 来源 | 安装命令 |
|--------|------|------|----------|
| mcp-builder | MCP 服务器构建 | [anthropics/skills](https://github.com/anthropics/skills) | `npx skills add https://github.com/anthropics/skills --skill mcp-builder` |

## Agent 工作流与工程规划

### Matt Pocock Skills 安装策略

Matt Pocock 的技能不是同一层级的独立工具，首次安装建议先装主流程及其运行依赖，再按任务扩展。核心工程工作流是：

```text
setup-matt-pocock-skills
              ↓
grill-with-docs ─┐
                 ├→ to-spec → to-tickets → implement
wayfinder ───────┘
```

- `setup-matt-pocock-skills`：每个仓库首次使用前运行一次，配置 Issue Tracker、Triage 标签和领域文档布局。
- `grill-with-docs`：已有代码库、问题可以在一个会话内逐步对齐时使用。
- `wayfinder`：大型、模糊或超过一个 Agent 会话的工作使用；它先解决决策票据，路线清晰后再进入 `to-spec`，不要直接跳到 `implement`。
- `to-spec`：把已经对齐的讨论合成为结构化规格说明，并发布到已配置的 Issue Tracker。
- `to-tickets`：将规格拆成带阻塞关系的纵向、可交付 Tickets。
- `implement`：逐个实现 Tickets，内部使用 `tdd`，完成后使用 `code-review` 检查实现与规格的一致性。

首次安装以下面的核心集合（6 个主流程入口 + 4 个必需运行依赖）为基线，不要选择 Matt 仓库中的全部技能。先检查主机上已有的技能；已经安装且能被当前 Agent 调用的同名技能，可以从安装命令中删去，不必重复安装：

```bash
# 查看用户级已安装技能
npx skills list -g

# 如果当前项目也有项目级技能，再查看项目级列表
npx skills list
```

只有“已安装且当前 Agent 可调用”的技能可以跳过；仅安装给其他 Agent、不可用或版本不兼容的同名技能，不应视为已满足依赖。

```bash
# 示例：主机尚未安装任何核心技能时
npx skills add https://github.com/mattpocock/skills --skill setup-matt-pocock-skills grill-with-docs wayfinder to-spec to-tickets implement grilling domain-modeling tdd code-review
```

其中 `grilling`、`domain-modeling` 是 `grill-with-docs` / `wayfinder` 使用的对齐与领域建模依赖，`tdd`、`code-review` 是 `implement` 使用的实现与收尾依赖。`prototype`、`research`、`triage`、`diagnosing-bugs`、`handoff`、`ask-matt` 等属于按需扩展：只有遇到对应的原型、调查、原始 Issue、困难 Bug、跨会话交接或需要路由推荐时再安装。

| 技能名 | 描述 | 来源 | 安装命令 |
|--------|------|------|----------|
| ask-matt | 可选路由：根据当前情境推荐适合的技能或技能工作流，并给出调用顺序 | [mattpocock/skills](https://github.com/mattpocock/skills) | `npx skills add https://github.com/mattpocock/skills --skill ask-matt` |
| setup-matt-pocock-skills | 核心入口（每个仓库运行一次）：配置 Issue Tracker、Triage 标签与领域文档路径 | [mattpocock/skills](https://github.com/mattpocock/skills) | `npx skills add https://github.com/mattpocock/skills --skill setup-matt-pocock-skills` |
| grilling | 核心依赖：通过连续追问与压力测试对计划、决策或想法进行审查并形成共识 | [mattpocock/skills](https://github.com/mattpocock/skills) | `npx skills add https://github.com/mattpocock/skills --skill grilling` |
| batch-grill-me | 基于决策树前沿（Frontier）按轮次批量追问方案，结合子 Agent 异步探查环境事实 | [mattpocock/skills](https://github.com/mattpocock/skills) | `npx skills add https://github.com/mattpocock/skills --skill batch-grill-me` |
| grill-with-docs | 核心入口：结合项目现有文档（CONTEXT.md / ADRs）通过追问压力测试方案并形成共识 | [mattpocock/skills](https://github.com/mattpocock/skills) | `npx skills add https://github.com/mattpocock/skills --skill grill-with-docs` |
| to-spec | 核心流程：将对齐的方案合成结构化的技术规格说明书（Spec / PRD）并发布到 Issue Tracker | [mattpocock/skills](https://github.com/mattpocock/skills) | `npx skills add https://github.com/mattpocock/skills --skill to-spec` |
| to-tickets | 核心流程：将技术规格说明书拆解为可独立交付、带阻塞关系的纵向任务卡片（Tickets） | [mattpocock/skills](https://github.com/mattpocock/skills) | `npx skills add https://github.com/mattpocock/skills --skill to-tickets` |
| implement | 核心流程：基于规格或 Tickets，使用 TDD 实现并完成验证与代码审查 | [mattpocock/skills](https://github.com/mattpocock/skills) | `npx skills add https://github.com/mattpocock/skills --skill implement` |
| tdd | 核心依赖：通过面向公开接口的纵向红—绿—重构循环，以测试驱动功能实现或缺陷修复 | [mattpocock/skills](https://github.com/mattpocock/skills) | `npx skills add https://github.com/mattpocock/skills --skill tdd` |
| code-review | 核心依赖：从代码规范与规格符合度两个维度审查固定起点之后的变更 | [mattpocock/skills](https://github.com/mattpocock/skills) | `npx skills add https://github.com/mattpocock/skills --skill code-review` |
| codebase-design | 使用深模块、简洁接口与清晰接缝等原则设计可测试、易演进的代码结构 | [mattpocock/skills](https://github.com/mattpocock/skills) | `npx skills add https://github.com/mattpocock/skills --skill codebase-design` |
| triage | 对原始 Issue 与外部 PR 进行分类、验证和信息补全，并整理为 Agent 可执行简报 | [mattpocock/skills](https://github.com/mattpocock/skills) | `npx skills add https://github.com/mattpocock/skills --skill triage` |
| wayfinder | 核心入口（大型工作）：将规模大、路径尚不清晰的工作规划为可逐项解决的决策路线图 | [mattpocock/skills](https://github.com/mattpocock/skills) | `npx skills add https://github.com/mattpocock/skills --skill wayfinder` |
| prototype | 构建抛弃型原型（Logic 终端 TUI 或 UI 多变体）以快速验证设计逻辑或界面效果 | [mattpocock/skills](https://github.com/mattpocock/skills) | `npx skills add https://github.com/mattpocock/skills --skill prototype` |
| diagnosing-bugs | 困难 Bug 与性能退化的诊断循环 | [mattpocock/skills](https://github.com/mattpocock/skills) | `npx skills add https://github.com/mattpocock/skills --skill diagnosing-bugs` |
| domain-modeling | 核心依赖：构建并精炼项目的领域模型与统一语言，记录架构决策（ADR） | [mattpocock/skills](https://github.com/mattpocock/skills) | `npx skills add https://github.com/mattpocock/skills --skill domain-modeling` |
| handoff | 将当前对话压缩为交接文档以供其他 Agent 接续工作 | [mattpocock/skills](https://github.com/mattpocock/skills) | `npx skills add https://github.com/mattpocock/skills --skill handoff` |
| improve-codebase-architecture | 扫描代码库寻找架构深化机会，生成可视化 HTML 报告并引导重构 | [mattpocock/skills](https://github.com/mattpocock/skills) | `npx skills add https://github.com/mattpocock/skills --skill improve-codebase-architecture` |
| research | 针对高信任第一方资料源（官方文档、源码、API）进行技术调查并输出带引用的分析文档 | [mattpocock/skills](https://github.com/mattpocock/skills) | `npx skills add https://github.com/mattpocock/skills --skill research` |
| teach | 引导并帮助用户在当前工作区学习一个新技能或概念（支持多会话状态保存） | [mattpocock/skills](https://github.com/mattpocock/skills) | `npx skills add https://github.com/mattpocock/skills --skill teach` |


## 论文写作与研究

| 技能名 | 描述 | 来源 | 安装命令 |
|--------|------|------|----------|
| brainstorming-research-ideas | 研究头脑风暴 | [Orchestra-Research/AI-Research-SKILLs](https://github.com/Orchestra-Research/AI-Research-SKILLs) | `npx skills add https://github.com/Orchestra-Research/AI-Research-SKILLs --skill brainstorming-research-ideas` |
| creative-thinking-for-research | 研究创意思维 | [Orchestra-Research/AI-Research-SKILLs](https://github.com/Orchestra-Research/AI-Research-SKILLs) | `npx skills add https://github.com/Orchestra-Research/AI-Research-SKILLs --skill creative-thinking-for-research` |
| nature-response | 审稿回复信起草与审计（逐点回复，语气校准） | [Yuan1z0825/nature-skills](https://github.com/Yuan1z0825/nature-skills) | `npx skills add https://github.com/Yuan1z0825/nature-skills --skill nature-response` |

## 前端设计与 Web 开发

| 技能名 | 描述 | 来源 | 安装命令 |
|--------|------|------|----------|
| interfaces（7 个前端界面技能） | 前端界面综合设计与审查：可访问性、布局、文案、排版、颜色、UI 精修 | [jakubkrehel/skills](https://github.com/jakubkrehel/skills) | `npx skills add jakubkrehel/skills` |
| frontend-design | 生产级前端界面设计 | [anthropics/skills](https://github.com/anthropics/skills) | `npx skills add https://github.com/anthropics/skills --skill frontend-design` |
| canvas-design | Canvas 视觉艺术创作 | [anthropics/skills](https://github.com/anthropics/skills) | `npx skills add https://github.com/anthropics/skills --skill canvas-design` |
| algorithmic-art | 算法艺术（p5.js） | [anthropics/skills](https://github.com/anthropics/skills) | `npx skills add https://github.com/anthropics/skills --skill algorithmic-art` |
| web-design-engineer | 网页、落地页与复杂前端交互设计 | [ConardLi/garden-skills](https://github.com/ConardLi/garden-skills) | `npx skills add https://github.com/ConardLi/garden-skills --skill web-design-engineer` |

## 图像生成与多媒体

| 技能名 | 描述 | 来源 | 安装命令 |
|--------|------|------|----------|
| gpt-image-2 | 图像生成与图像编辑 Prompt 工程 | [ConardLi/garden-skills](https://github.com/ConardLi/garden-skills) | `npx skills add https://github.com/ConardLi/garden-skills --skill gpt-image-2` |
| antibes-holiday | 原创轻松写意的黑色钢笔插画、叙事场景与早期 Logo 探索 | [haorantang97/antibes-holiday](https://github.com/haorantang97/antibes-holiday) | `npx skills add haorantang97/antibes-holiday --skill antibes-holiday` |
| video-shotcraft | 基于 Remotion 的 AI Agent 电影级视频/宣传片制作工具包（支持网页截图转 2.5D/3D 动态镜头与音效对齐） | [Vincentwei1021/video-shotcraft](https://github.com/Vincentwei1021/video-shotcraft) | `npx skills add https://github.com/Vincentwei1021/video-shotcraft` |

## Google DESIGN.md 设计系统与 Agent 工具链

`DESIGN.md` 是 Google Labs 开源的 Markdown 驱动设计系统规范工具链，结合机器可读 Token 与人类可读规范说明，支持自动编译为 Tailwind CSS 及 W3C DTCG 标准。

* **CLI 安装/免安装运行**：`npm i -g @google/design.md` 或 `npx @google/design.md <command>`

| 技能名 | 描述 | 来源 | 安装命令 |
|--------|------|------|----------|
| design.md | 设计系统规范管理、Token 校验与自动编译导出工具链（CLI：`npx @google/design.md`） | [google-labs-code/design.md](https://github.com/google-labs-code/design.md) | `npx skills add https://github.com/google-labs-code/design.md` |
| agent-dx-cli-scale | 评价与构建 Agent 友好型 CLI 的设计维度与纵深防御评估准则 | [google-labs-code/design.md](https://github.com/google-labs-code/design.md) | `npx skills add https://github.com/google-labs-code/design.md --skill agent-dx-cli-scale` |
| ink | 基于 json-render 的 Ink 终端 UI 渲染器，用于生成交互式终端界面 | [google-labs-code/design.md](https://github.com/google-labs-code/design.md) | `npx skills add https://github.com/google-labs-code/design.md --skill ink` |
| tdd-red-green-refactor | TypeScript/Node.js TDD 测试驱动开发规范与验证流程 | [google-labs-code/design.md](https://github.com/google-labs-code/design.md) | `npx skills add https://github.com/google-labs-code/design.md --skill tdd-red-green-refactor` |

## Google Stitch 设计系统

Google Stitch 是 Google Labs 的 AI 设计平台，支持 Text-to-UI 设计、shadcn-ui 组件生成、Remotion 视频动画等。配合 [Stitch MCP server](https://github.com/davideast/stitch-mcp) 使用效果最佳。

| 技能名 | 描述 | 来源 | 安装命令 |
|--------|------|------|----------|
| stitch-design | 统一入口，设计工作入口 | [google-labs-code/stitch-skills](https://github.com/google-labs-code/stitch-skills) | `npx skills add https://github.com/google-labs-code/stitch-skills --skill stitch-design` |
| shadcn-ui | shadcn/ui 组件库集成 | [google-labs-code/stitch-skills](https://github.com/google-labs-code/stitch-skills) | `npx skills add https://github.com/google-labs-code/stitch-skills --skill shadcn-ui` |

## 文档协作与沟通

| 技能名 | 描述 | 来源 | 安装命令 |
|--------|------|------|----------|
| doc-coauthoring | 文档协作编写工作流 | [anthropics/skills](https://github.com/anthropics/skills) | `npx skills add https://github.com/anthropics/skills --skill doc-coauthoring` |
| internal-comms | 内部通信格式编写 | [anthropics/skills](https://github.com/anthropics/skills) | `npx skills add https://github.com/anthropics/skills --skill internal-comms` |
| bro | 将上一条回复改写成简洁、通俗、少术语的人话 | [dmmulroy/skills](https://github.com/dmmulroy/skills) | `npx skills add https://github.com/dmmulroy/skills --skill bro` |

## 开发工具

| 技能名 | 描述 | 来源 | 安装命令 |
|--------|------|------|----------|
| find-skills | Skills 搜索与发现 | [vercel-labs/skills](https://github.com/vercel-labs/skills) | `npx skills add https://github.com/vercel-labs/skills --skill find-skills` |
| open-code-review | AI 代码审查工具（Git diff 行级审查、无集成成本、内置安全规则） | [alibaba/open-code-review](https://github.com/alibaba/open-code-review) | `npx skills add https://github.com/alibaba/open-code-review --skill open-code-review` |

## 技能管理

| 技能名 | 描述 | 来源 | 安装命令 |
|--------|------|------|----------|
| skill-creator | 新技能创建指南 | [anthropics/skills](https://github.com/anthropics/skills) | `npx skills add https://github.com/anthropics/skills --skill skill-creator` |
| writing-great-skills | 编写与编辑高质量技能的参考指南——提供让技能行为更可预测的术语和原则 | [mattpocock/skills](https://github.com/mattpocock/skills) | `npx skills add https://github.com/mattpocock/skills --skill writing-great-skills` |

---

## Skills CLI 使用方法

### 安装技能

```bash
# 安装到用户级别（推荐）
npx skills add https://github.com/owner/repo --skill skill -g

# 安装到项目级别
npx skills add https://github.com/owner/repo --skill skill
```

### 管理已安装的技能

```bash
# 列出所有已安装的技能
npx skills list -g

# 检查更新
npx skills check -g

# 更新所有技能
npx skills update -g

# 移除技能
npx skills remove <skill-name> -g

# 搜索新技能
npx skills find [query]
```

## 支持的 Agents

本索引中的技能可在以下 AI 代理中使用：

- OpenCode
- Claude Code
- Cursor
- GitHub Copilot
- Codex
- Cline
- Continue
- OpenHands
- ... 以及 30+ 其他代理

完整列表请参考：https://github.com/vercel-labs/skills#supported-agents

## 版本信息

- **更新日期**: 2026-08-05

## License

请参考各技能来源仓库的许可证信息。自建技能采用 MIT 许可证。
