# My Skills

个人心仪的 Agent Skills 索引，支持 OpenCode、Claude Code、Cursor 等 40+ AI 代理。

## 自建技能

以下技能由本仓库维护，可直接安装：

| 技能名 | 描述 | 安装命令 |
|--------|------|----------|
| html-artifacts-plus | 生成自包含 HTML artifacts（含内容特征决策表 + 交互指南 + 生成自检），并支持文档绑定编辑器导出可审查 patch | `npx skills add https://github.com/L-yifan/skills --skill html-artifacts-plus` |
| humanizer-zh | 去除中文文本中的 AI 写作痕迹 | `npx skills add https://github.com/L-yifan/skills --skill humanizer-zh` |
| structural-thinker | 从数据结构视角分析并优化任何系统、流程、设计或问题 | `npx skills add https://github.com/L-yifan/skills --skill structural-thinker` |
| deep-wiki | GitHub 仓库 AI 文档 | `npx skills add https://github.com/L-yifan/skills --skill deep-wiki` |
| agent-team-prompting | Claude Code agent team 启动 Prompt 编写与评估 | `npx skills add https://github.com/L-yifan/skills --skill agent-team-prompting` |
| skill-backup | 将好用的外部技能或自建技能备份到个人 skills 索引仓库（含技能源定位、更新陷阱警示、备份前验证） | `npx skills add https://github.com/L-yifan/skills --skill skill-backup` |
| skill-discovery | 根据任务从个人 skills 索引仓库中检索并推荐合适技能 | `npx skills add https://github.com/L-yifan/skills --skill skill-discovery` |
| uv | 检查并安装 uv Python 包管理器（科学类技能的前置依赖） | `npx skills add https://github.com/L-yifan/skills --skill uv` |

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
## Web 研究与自动化

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
| beautiful-article | 将任意素材编辑为排版精美的文章 | [ConardLi/garden-skills](https://github.com/ConardLi/garden-skills) | `npx skills add https://github.com/ConardLi/garden-skills --skill beautiful-article` |

## AI/ML 研究

| 技能名 | 描述 | 来源 | 安装命令 |
|--------|------|------|----------|
| asta-skill | Semantic Scholar / Asta MCP 学术检索、论文发现与引文追踪 | [Agents365-ai/asta-skill](https://github.com/Agents365-ai/asta-skill) | `npx skills add https://github.com/Agents365-ai/asta-skill --skill asta-skill` |

## Agent 框架

| 技能名 | 描述 | 来源 | 安装命令 |
|--------|------|------|----------|
| mcp-builder | MCP 服务器构建 | [anthropics/skills](https://github.com/anthropics/skills) | `npx skills add https://github.com/anthropics/skills --skill mcp-builder` |

## Agent 工作流与工程规划

| 技能名 | 描述 | 来源 | 安装命令 |
|--------|------|------|----------|
| grill-me | 通过连续追问压力测试计划或设计，直到形成清晰共识 | [mattpocock/skills](https://github.com/mattpocock/skills) | `npx skills add https://github.com/mattpocock/skills --skill grill-me` |
| wayfinder | 将大型、路径尚不清晰的工作规划为可逐项解决的决策路线图 | [mattpocock/skills](https://github.com/mattpocock/skills) | `npx skills add https://github.com/mattpocock/skills --skill wayfinder` |
| diagnosing-bugs | 困难 Bug 与性能退化的诊断循环 | [mattpocock/skills](https://github.com/mattpocock/skills) | `npx skills add https://github.com/anthropics/skills --skill diagnosing-bugs` |
| domain-modeling | 构建并精炼项目的领域模型与统一语言，记录架构决策（ADR） | [mattpocock/skills](https://github.com/mattpocock/skills) | `npx skills add https://github.com/anthropics/skills --skill domain-modeling` |
| handoff | 将当前对话压缩为交接文档以供其他 Agent 接续工作 | [mattpocock/skills](https://github.com/mattpocock/skills) | `npx skills add https://github.com/anthropics/skills --skill handoff` |
| improve-codebase-architecture | 扫描代码库寻找架构深化机会，生成可视化 HTML 报告并引导重构 | [mattpocock/skills](https://github.com/mattpocock/skills) | `npx skills add https://github.com/anthropics/skills --skill improve-codebase-architecture` |
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
| frontend-design | 生产级前端界面设计 | [anthropics/skills](https://github.com/anthropics/skills) | `npx skills add https://github.com/anthropics/skills --skill frontend-design` |
| canvas-design | Canvas 视觉艺术创作 | [anthropics/skills](https://github.com/anthropics/skills) | `npx skills add https://github.com/anthropics/skills --skill canvas-design` |
| algorithmic-art | 算法艺术（p5.js） | [anthropics/skills](https://github.com/anthropics/skills) | `npx skills add https://github.com/anthropics/skills --skill algorithmic-art` |
| brand-guidelines | 品牌颜色和排版指南 | [anthropics/skills](https://github.com/anthropics/skills) | `npx skills add https://github.com/anthropics/skills --skill brand-guidelines` |
| theme-factory | Artifact 主题应用 | [anthropics/skills](https://github.com/anthropics/skills) | `npx skills add https://github.com/anthropics/skills --skill theme-factory` |
| web-artifacts-builder | 复杂 HTML artifacts 构建 | [anthropics/skills](https://github.com/anthropics/skills) | `npx skills add https://github.com/anthropics/skills --skill web-artifacts-builder` |
| web-design-engineer | 网页、落地页与复杂前端交互设计 | [ConardLi/garden-skills](https://github.com/ConardLi/garden-skills) | `npx skills add https://github.com/ConardLi/garden-skills --skill web-design-engineer` |

## 图像生成与多媒体

| 技能名 | 描述 | 来源 | 安装命令 |
|--------|------|------|----------|
| gpt-image-2 | 图像生成与图像编辑 Prompt 工程 | [ConardLi/garden-skills](https://github.com/ConardLi/garden-skills) | `npx skills add https://github.com/ConardLi/garden-skills --skill gpt-image-2` |

## Google Stitch 设计系统

Google Stitch 是 Google Labs 的 AI 设计平台，支持 Text-to-UI 设计、shadcn-ui 组件生成、Remotion 视频动画等。配合 [Stitch MCP server](https://github.com/davideast/stitch-mcp) 使用效果最佳。

| 技能名 | 描述 | 来源 | 安装命令 |
|--------|------|------|----------|
| stitch-design | 统一入口，设计工作入口 | [google-labs-code/stitch-skills](https://github.com/google-labs-code/stitch-skills) | `npx skills add https://github.com/google-labs-code/stitch-skills --skill stitch-design` |
| design-md | 设计文档生成（.stitch/DESIGN.md） | [google-labs-code/stitch-skills](https://github.com/google-labs-code/stitch-skills) | `npx skills add https://github.com/google-labs-code/stitch-skills --skill design-md` |
| shadcn-ui | shadcn/ui 组件库集成 | [google-labs-code/stitch-skills](https://github.com/google-labs-code/stitch-skills) | `npx skills add https://github.com/google-labs-code/stitch-skills --skill shadcn-ui` |
| remotion | 视频动画生成 | [google-labs-code/stitch-skills](https://github.com/google-labs-code/stitch-skills) | `npx skills add https://github.com/google-labs-code/stitch-skills --skill remotion` |

> **提示**：安装这些 skills 前，需先配置 Stitch MCP server。详情见 [stitch-mcp](https://github.com/davideast/stitch-mcp)。

## 文档协作与沟通

| 技能名 | 描述 | 来源 | 安装命令 |
|--------|------|------|----------|
| doc-coauthoring | 文档协作编写工作流 | [anthropics/skills](https://github.com/anthropics/skills) | `npx skills add https://github.com/anthropics/skills --skill doc-coauthoring` |
| internal-comms | 内部通信格式编写 | [anthropics/skills](https://github.com/anthropics/skills) | `npx skills add https://github.com/anthropics/skills --skill internal-comms` |

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

- **更新日期**: 2026-07-15

## License

请参考各技能来源仓库的许可证信息。自建技能采用 MIT 许可证。
