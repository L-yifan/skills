# My Skills

个人心仪的 Agent Skills 索引，支持 OpenCode、Claude Code、Cursor 等 40+ AI 代理。

## 自建技能

以下技能由本仓库维护，可直接安装：

| 技能名 | 描述 | 安装命令 |
|--------|------|----------|
| humanizer-zh | 去除中文文本中的 AI 写作痕迹 | `npx skills add https://github.com/L-yifan/skills --skill humanizer-zh` |
| gkg | 代码库全局知识图谱分析 | `npx skills add https://github.com/L-yifan/skills --skill gkg` |
| github | GitHub CLI 增强 | `npx skills add https://github.com/L-yifan/skills --skill github` |
| figures4papers-playbook | 科研图表示例定位与改造 | `npx skills add https://github.com/L-yifan/skills --skill figures4papers-playbook` |
| scientific-figure-pro | 论文风格高质量科研图表生成 | `npx skills add https://github.com/L-yifan/skills --skill scientific-figure-pro` |
| gh-grep | GitHub 代码搜索 | `npx skills add https://github.com/L-yifan/skills --skill gh-grep` |
| deep-wiki | GitHub 仓库 AI 文档 |  `npx skills add https://github.com/L-yifan/skills --skill deep-wiki` |
| skill-vetter | 技能安全审核 | `npx skills add https://github.com/L-yifan/skills --skill skill-vetter` |
| agent-team-prompting | Claude Code agent team 启动 Prompt 编写与评估 | `npx skills add https://github.com/L-yifan/skills --skill agent-team-prompting` |
| harness-creator | AI Agent 基础设施设计与创建（AGENTS.md、linters、harness 配置） | `npx skills add https://github.com/L-yifan/skills --skill harness-creator` |
| harness-creator | AI Agent 基础设施设计与创建（AGENTS.md、linters、harness 配置） | `npx skills add https://github.com/L-yifan/skills --skill harness-creator` |

> **注意**：自建技能中，技能源码存放在本仓库（如 gkg、deep-wiki、github 等）；外部技能（如下方表格中的技能）仅在 README 中引用，源码存放在其官方仓库。

---

## 文档处理

| 技能名 | 描述 | 来源 | 安装命令 |
|--------|------|------|----------|
| docx | Word 文档（.docx）处理 | [anthropics/skills](https://github.com/anthropics/skills) | `npx skills add https://github.com/anthropics/skills --skill docx` |
| pdf | PDF 文件处理 | [anthropics/skills](https://github.com/anthropics/skills) | `npx skills add https://github.com/anthropics/skills --skill pdf` |
| pptx | PowerPoint 演示文稿处理 | [anthropics/skills](https://github.com/anthropics/skills) | `npx skills add https://github.com/anthropics/skills --skill pptx` |
| xlsx | 电子表格（.xlsx, .xlsm, .csv）处理 | [anthropics/skills](https://github.com/anthropics/skills) | `npx skills add https://github.com/anthropics/skills --skill xlsx` |
| MinerU Document Extractor | 多格式文档提取（PDF、图片、Word、PPT、网页转 Markdown/HTML/LaTeX/DOCX） | [opendatalab/mineru-ecosystem](https://github.com/opendatalab/MinerU-Ecosystem) | `npx skills add https://github.com/opendatalab/mineru-ecosystem --skill "MinerU Document Extractor"` |
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

## AI/ML 研究与开发

| 技能名 | 描述 | 来源 | 安装命令 |
|--------|------|------|----------|
| langchain | LLM 应用开发框架 | [Orchestra-Research/AI-Research-SKILLs](https://github.com/Orchestra-Research/AI-Research-SKILLs) | `npx skills add https://github.com/Orchestra-Research/AI-Research-SKILLs --skill langchain` |
| llamaindex | RAG 框架 | [Orchestra-Research/AI-Research-SKILLs](https://github.com/Orchestra-Research/AI-Research-SKILLs) | `npx skills add https://github.com/Orchestra-Research/AI-Research-SKILLs --skill llamaindex` |
| chroma | 开源向量数据库 | [Orchestra-Research/AI-Research-SKILLs](https://github.com/Orchestra-Research/AI-Research-SKILLs) | `npx skills add https://github.com/Orchestra-Research/AI-Research-SKILLs --skill chroma` |
| sentence-transformers | 文本嵌入模型 | [Orchestra-Research/AI-Research-SKILLs](https://github.com/Orchestra-Research/AI-Research-SKILLs) | `npx skills add https://github.com/Orchestra-Research/AI-Research-SKILLs --skill sentence-transformers` |
| dspy | 声明式 Prompt 优化 | [Orchestra-Research/AI-Research-SKILLs](https://github.com/Orchestra-Research/AI-Research-SKILLs) | `npx skills add https://github.com/Orchestra-Research/AI-Research-SKILLs --skill dspy` |
| guidance | 结构化 Prompt 控制 | [Orchestra-Research/AI-Research-SKILLs](https://github.com/Orchestra-Research/AI-Research-SKILLs) | `npx skills add https://github.com/Orchestra-Research/AI-Research-SKILLs --skill guidance` |
| instructor | LLM 输出解析 | [Orchestra-Research/AI-Research-SKILLs](https://github.com/Orchestra-Research/AI-Research-SKILLs) | `npx skills add https://github.com/Orchestra-Research/AI-Research-SKILLs --skill instructor` |
| outlines | 结构化输出保证 | [Orchestra-Research/AI-Research-SKILLs](https://github.com/Orchestra-Research/AI-Research-SKILLs) | `npx skills add https://github.com/Orchestra-Research/AI-Research-SKILLs --skill outlines` |
| langsmith-observability | LLM 应用追踪与调试 | [Orchestra-Research/AI-Research-SKILLs](https://github.com/Orchestra-Research/AI-Research-SKILLs) | `npx skills add https://github.com/Orchestra-Research/AI-Research-SKILLs --skill observability` |

## Agent 框架

| 技能名 | 描述 | 来源 | 安装命令 |
|--------|------|------|----------|
| autogpt-agents | Autonomous AI Agent 平台 | [Orchestra-Research/AI-Research-SKILLs](https://github.com/Orchestra-Research/AI-Research-SKILLs) | `npx skills add https://github.com/Orchestra-Research/AI-Research-SKILLs --skill autogpt-agents` |
| crewai-multi-agent | 多 Agent 编排框架 | [Orchestra-Research/AI-Research-SKILLs](https://github.com/Orchestra-Research/AI-Research-SKILLs) | `npx skills add https://github.com/Orchestra-Research/AI-Research-SKILLs --skill crewai-multi-agent` |
| mcp-builder | MCP 服务器构建 | [anthropics/skills](https://github.com/anthropics/skills) | `npx skills add https://github.com/anthropics/skills --skill mcp-builder` |

## 论文写作与研究

| 技能名 | 描述 | 来源 | 安装命令 |
|--------|------|------|----------|
| ml-paper-writing | ML/AI 论文写作指南 | [Orchestra-Research/AI-Research-SKILLs](https://github.com/Orchestra-Research/AI-Research-SKILLs) | `npx skills add https://github.com/Orchestra-Research/AI-Research-SKILLs --skill ml-paper-writing` |
| brainstorming-research-ideas | 研究头脑风暴 | [Orchestra-Research/AI-Research-SKILLs](https://github.com/Orchestra-Research/AI-Research-SKILLs) | `npx skills add https://github.com/Orchestra-Research/AI-Research-SKILLs --skill brainstorming-research-ideas` |
| creative-thinking-for-research | 研究创意思维 | [Orchestra-Research/AI-Research-SKILLs](https://github.com/Orchestra-Research/AI-Research-SKILLs) | `npx skills add https://github.com/Orchestra-Research/AI-Research-SKILLs --skill creative-thinking-for-research` |

## 前端设计与 Web 开发

| 技能名 | 描述 | 来源 | 安装命令 |
|--------|------|------|----------|
| frontend-design | 生产级前端界面设计 | [anthropics/skills](https://github.com/anthropics/skills) | `npx skills add https://github.com/anthropics/skills --skill frontend-design` |
| canvas-design | Canvas 视觉艺术创作 | [anthropics/skills](https://github.com/anthropics/skills) | `npx skills add https://github.com/anthropics/skills --skill canvas-design` |
| algorithmic-art | 算法艺术（p5.js） | [anthropics/skills](https://github.com/anthropics/skills) | `npx skills add https://github.com/anthropics/skills --skill algorithmic-art` |
| brand-guidelines | 品牌颜色和排版指南 | [anthropics/skills](https://github.com/anthropics/skills) | `npx skills add https://github.com/anthropics/skills --skill brand-guidelines` |
| theme-factory | Artifact 主题应用 | [anthropics/skills](https://github.com/anthropics/skills) | `npx skills add https://github.com/anthropics/skills --skill theme-factory` |
| web-artifacts-builder | 复杂 HTML artifacts 构建 | [anthropics/skills](https://github.com/anthropics/skills) | `npx skills add https://github.com/anthropics/skills --skill web-artifacts-builder` |

## Google Stitch 设计系统

Google Stitch 是 Google Labs 的 AI 设计平台，支持 Text-to-UI 设计、shadcn-ui 组件生成、Remotion 视频动画等。配合 [Stitch MCP server](https://github.com/davideast/stitch-mcp) 使用效果最佳。

| 技能名 | 描述 | 来源 | 安装命令 |
|--------|------|------|----------|
| stitch-design | 统一入口，设计工作入口 | [google-labs-code/stitch-skills](https://github.com/google-labs-code/stitch-skills) | `npx skills add https://github.com/google-labs-code/stitch-skills --skill stitch-design` |
| enhance-prompt | 提示词增强（UI/UX 专业术语） | [google-labs-code/stitch-skills](https://github.com/google-labs-code/stitch-skills) | `npx skills add https://github.com/google-labs-code/stitch-skills --skill enhance-prompt` |
| design-md | 设计文档生成（.stitch/DESIGN.md） | [google-labs-code/stitch-skills](https://github.com/google-labs-code/stitch-skills) | `npx skills add https://github.com/google-labs-code/stitch-skills --skill design-md` |
| stitch-loop | 循环处理工作流 | [google-labs-code/stitch-skills](https://github.com/google-labs-code/stitch-skills) | `npx skills add https://github.com/google-labs-code/stitch-skills --skill stitch-loop` |
| react-components | React 组件生成（Vite + Tailwind） | [google-labs-code/stitch-skills](https://github.com/google-labs-code/stitch-skills) | `npx skills add https://github.com/google-labs-code/stitch-skills --skill react-components` |
| shadcn-ui | shadcn/ui 组件库集成 | [google-labs-code/stitch-skills](https://github.com/google-labs-code/stitch-skills) | `npx skills add https://github.com/google-labs-code/stitch-skills --skill shadcn-ui` |
| remotion | 视频动画生成 | [google-labs-code/stitch-skills](https://github.com/google-labs-code/stitch-skills) | `npx skills add https://github.com/google-labs-code/stitch-skills --skill remotion` |

> **提示**：安装这些 skills 前，需先配置 Stitch MCP server。详情见 [stitch-mcp](https://github.com/davideast/stitch-mcp)。

## 文档协作与沟通

| 技能名 | 描述 | 来源 | 安装命令 |
|--------|------|------|----------|
| doc-coauthoring | 文档协作编写工作流 | [anthropics/skills](https://github.com/anthropics/skills) | `npx skills add https://github.com/anthropics/skills --skill doc-coauthoring` |
| internal-comms | 内部通信格式编写 | [anthropics/skills](https://github.com/anthropics/skills) | `npx skills add https://github.com/anthropics/skills --skill internal-comms` |
| slack-gif-creator | Slack 动画 GIF 创建 | [anthropics/skills](https://github.com/anthropics/skills) | `npx skills add https://github.com/anthropics/skills --skill slack-gif-creator` |

## Obsidian 与知识管理

| 技能名 | 描述 | 来源 | 安装命令 |
|--------|------|------|----------|
| obsidian-markdown | Obsidian Markdown 语法 | [kepano/obsidian-skills](https://github.com/kepano/obsidian-skills) | `npx skills add https://github.com/kepano/obsidian-skills --skill obsidian-markdown` |
| obsidian-bases | Obsidian Bases（.base 文件） | [kepano/obsidian-skills](https://github.com/kepano/obsidian-skills) | `npx skills add https://github.com/kepano/obsidian-skills --skill obsidian-bases` |
| json-canvas | JSON Canvas 文件（.canvas） | [kepano/obsidian-skills](https://github.com/kepano/obsidian-skills) | `npx skills add https://github.com/kepano/obsidian-skills --skill json-canvas` |

## 开发工具

| 技能名 | 描述 | 来源 | 安装命令 |
|--------|------|------|----------|
| find-skills | Skills 搜索与发现 | [vercel-labs/skills](https://github.com/vercel-labs/skills) | `npx skills add https://github.com/vercel-labs/skills --skill find-skills` |

## 技能管理

| 技能名 | 描述 | 来源 | 安装命令 |
|--------|------|------|----------|
| skill-creator | 新技能创建指南 | [anthropics/skills](https://github.com/anthropics/skills) | `npx skills add https://github.com/anthropics/skills --skill skill-creator` |

---

## Skills CLI 使用方法

### 安装技能

```bash
# 安装到用户级别（推荐）
npx skills add <https://github.com/owner/repo --skill skill> -g

# 安装到项目级别
npx skills add <https://github.com/owner/repo --skill skill>
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

- **更新日期**: 2026-05-06

## License

请参考各技能来源仓库的许可证信息。自建技能采用 MIT 许可证。
