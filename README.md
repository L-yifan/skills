# My Skills

OpenCode Skills 备份仓库 - 可在多个 AI 代理中使用

## 简介

本仓库备份了常用的 Agent Skills，共包含 45 个技能模块。这些技能可以扩展 AI 代理的能力，使其能够处理各种特定任务。

**注意**：本仓库使用 `npx skills` 工具管理，不仅限于 OpenCode，还支持 Claude Code、Cursor、Codex 等 40+ 种 AI 代理。

## 使用方法

### 安装到本地（全局安装）

```bash
npx skills add https://github.com/L-yifan/skills -g
```

### 安装到项目（项目级别）

```bash
npx skills add https://github.com/L-yifan/skills
```

### 管理已安装的 Skills

```bash
# 列出所有已安装的 skills
npx skills list -g

# 移除特定 skill
npx skills remove <skill-name> -g

# 检查更新
npx skills check -g

# 更新所有 skills
npx skills update -g

# 搜索新 skills
npx skills find
```

## 包含的 Skills

### 开发工具类
- **github** - 与 GitHub 仓库交互（创建 PR、管理 issues、代码搜索等）
- **gkg** - 代码库全局知识图谱分析
- **gh-grep** - 搜索 GitHub 上的真实代码示例
- **context7** - 获取库和框架的最新文档和代码示例

### Agent 开发类
- **langchain** - 构建 LLM 应用的框架
- **llamaindex** - RAG（检索增强生成）框架
- **autogpt-agents** - Autonomous AI agent 平台
- **crewai-multi-agent** - 多 Agent 编排框架
- **mcp-builder** - 创建 MCP 服务器以集成外部 API

### RAG 与向量数据库
- **chroma** - 开源向量数据库
- **faiss** - Facebook 相似性搜索库
- **sentence-transformers** - 文本嵌入模型

### Prompt 工程
- **dspy** - 声明式 Prompt 优化框架
- **guidance** - 结构化 Prompt 控制 LLM 输出
- **instructor** - LLM 输出解析
- **outlines** - 结构化输出保证

### 内容创建类
- **docx** - 处理 Word 文档（.docx）
- **pptx** - 处理 PowerPoint 演示文稿（.pptx）
- **xlsx** - 处理电子表格（.xlsx, .xlsm, .csv）
- **pdf** - 处理 PDF 文件

### 测试与构建类
- **webapp-testing** - 使用 Playwright 测试本地 Web 应用
- **web-artifacts-builder** - 使用现代前端技术创建复杂的 HTML artifacts

### 设计与艺术类
- **frontend-design** - 创建生产级前端界面
- **canvas-design** - 使用设计理念创建视觉艺术
- **algorithmic-art** - 使用 p5.js 创建算法艺术
- **brand-guidelines** - 应用 Anthropic 官方品牌颜色和排版
- **theme-factory** - 为 artifacts 应用主题
- **web-design-guidelines** - Web UI 设计指南

### 文档与沟通类
- **doc-coauthoring** - 协作编写文档的结构化工作流
- **internal-comms** - 编写各种内部通信格式
- **slack-gif-creator** - 创建针对 Slack 优化的动画 GIF
- **humanizer** - AI 写作润色，去除 AI 写作痕迹

### 技能管理类
- **skill-creator** - 创建新的技能指南
- **code-review** - 代码审查反馈和实践指导
- **deep-wiki** - 通过 DeepWiki 访问 GitHub 仓库的 AI 生成文档
- **find-skills** - 搜索并安装合适的 Skills
- **template-skill** - Skill 创建模板

### 科研图表类
- **figures4papers-playbook** - 从 figures4papers 快速定位并改造图表示例
- **scientific-figure-pro** - 生成论文风格的高质量科研图表
- **ml-paper-writing** - ML/AI 论文写作指南

### 创意思维类
- **brainstorming-research-ideas** - 研究头脑风暴框架
- **creative-thinking-for-research** - 研究创意思维框架

### 可观测性
- **langsmith-observability** - LLM 应用追踪与调试

## 支持的 Agents

本仓库的 skills 可以在以下 AI 代理中使用：

- OpenCode
- Claude Code
- Cursor
- Codex
- GitHub Copilot
- Cline
- Continue
- OpenHands
- ... 以及 30+ 其他代理

完整列表请参考：https://github.com/vercel-labs/skills#supported-agents

## 项目结构

```
skills/
├── algorithmic-art/              # 算法艺术
├── autogpt-agents/              # Agent 平台
├── brainstorming-research-ideas/ # 研究头脑风暴
├── brand-guidelines/            # 品牌指南
├── canvas-design/               # Canvas 设计
├── chroma/                      # 向量数据库
├── code-review/                 # 代码审查
├── context7/                    # Context7 文档
├── creative-thinking-for-research/ # 创意思维
├── crewai-multi-agent/          # 多 Agent 编排
├── deep-wiki/                   # DeepWiki
├── doc-coauthoring/             # 文档协作
├── docx/                        # Word 文档处理
├── dspy/                        # Prompt 优化
├── faiss/                       # 相似性搜索
├── figures4papers-playbook/     # 科研图表示例定位
├── find-skills/                 # Skills 搜索与安装
├── frontend-design/             # 前端设计
├── gh-grep/                     # GitHub Grep
├── github/                      # GitHub 操作
├── gkg/                         # 全局知识图谱
├── guidance/                    # 结构化 Prompt
├── humanizer/                   # AI 写作润色
├── instructor/                  # LLM 输出解析
├── internal-comms/              # 内部沟通
├── langchain/                   # LLM 应用框架
├── langsmith-observability/      # LLM 可观测性
├── llamaindex/                  # RAG 框架
├── mcp-builder/                 # MCP 构建器
├── ml-paper-writing/             # 论文写作
├── outlines/                    # 结构化输出
├── pdf/                         # PDF 处理
├── pptx/                        # PPT 处理
├── scientific-figure-pro/       # 科研图表增强
├── sentence-transformers/       # 文本嵌入
├── skill-creator/               # 技能创建器
├── slack-gif-creator/           # Slack GIF 创建器
├── template-skill/              # Skill 模板
├── theme-factory/               # 主题工厂
├── web-artifacts-builder/       # Web artifacts 构建器
├── web-design-guidelines/       # UI 设计指南
├── webapp-testing/              # Web 应用测试
└── xlsx/                        # Excel 处理
```

## 版本信息

- **更新日期**: 2026-03-04
- **Total Skills**: 45
- **Skills 工具**: https://github.com/vercel-labs/skills

## License

请参考每个 skill 目录中的 LICENSE.txt 文件了解具体的许可证信息。

## 贡献

这是一个个人备份仓库，不对外接受贡献。

## 联系方式

如有问题，请通过 [GitHub Issues](https://github.com/L-yifan/skills/issues) 联系。
