# My Skills

OpenCode Skills 备份仓库 - 包含所有 opencode 代理技能集

## 简介

本仓库备份了我本地的所有 OpenCode Skills，共包含 23 个技能模块。这些技能可以扩展 AI 代理的能力，使其能够处理各种特定任务。

## 包含的 Skills

### 开发工具类
- **github** - 与 GitHub 仓库交互（创建 PR、管理 issues、代码搜索等）
- **gkg** - 代码库全局知识图谱分析
- **gh-grep** - 搜索 GitHub 上的真实代码示例
- **context7** - 获取库和框架的最新文档和代码示例

### 内容创建类
- **docx** - 处理 Word 文档（.docx）
- **pptx** - 处理 PowerPoint 演示文稿（.pptx）
- **xlsx** - 处理电子表格（.xlsx, .xlsm, .csv）
- **pdf** - 处理 PDF 文件

### 测试与构建类
- **webapp-testing** - 使用 Playwright 测试本地 Web 应用
- **web-artifacts-builder** - 使用现代前端技术创建复杂的 HTML artifacts
- **mcp-builder** - 创建 MCP 服务器以集成外部 API

### 设计与艺术类
- **frontend-design** - 创建生产级前端界面
- **canvas-design** - 使用设计理念创建视觉艺术
- **algorithmic-art** - 使用 p5.js 创建算法艺术
- **brand-guidelines** - 应用 Anthropic 官方品牌颜色和排版
- **theme-factory** - 为 artifacts 应用主题

### 文档与沟通类
- **doc-coauthoring** - 协作编写文档的结构化工作流
- **internal-comms** - 编写各种内部通信格式
- **slack-gif-creator** - 创建针对 Slack 优化的动画 GIF

### 技能管理类
- **skill-creator** - 创建新的技能指南
- **sequential-thinking** - 通过结构化顺序思考进行动态问题解决
- **code-review** - 代码审查反馈和实践指导
- **deep-wiki** - 通过 DeepWiki 访问 GitHub 仓库的 AI 生成文档

## 使用方法

### 本地使用

这些 skills 配置在 `~/.config/opencode/skills/` 目录中。OpenCode 会自动加载这些技能。

### 安装到其他环境

1. 克隆此仓库：
   ```bash
   git clone https://github.com/L-yifan/my-skills.git
   ```

2. 复制到 opencode 配置目录：
   ```bash
   cp -r my-skills/* ~/.config/opencode/skills/
   ```

## 项目结构

```
my-skills/
├── algorithmic-art/          # 算法艺术
├── brand-guidelines/         # 品牌指南
├── canvas-design/            # Canvas 设计
├── code-review/              # 代码审查
├── context7/                 # Context7 文档
├── deep-wiki/                # DeepWiki
├── doc-coauthoring/          # 文档协作
├── docx/                     # Word 文档处理
├── frontend-design/          # 前端设计
├── gh-grep/                  # GitHub Grep
├── github/                   # GitHub 操作
├── gkg/                      # 全局知识图谱
├── internal-comms/           # 内部沟通
├── mcp-builder/              # MCP 构建器
├── pdf/                      # PDF 处理
├── pptx/                     # PPT 处理
├── sequential-thinking/      # 顺序思考
├── skill-creator/            # 技能创建器
├── slack-gif-creator/        # Slack GIF 创建器
├── theme-factory/            # 主题工厂
├── web-artifacts-builder/    # Web artifacts 构建器
├── webapp-testing/           # Web 应用测试
└── xlsx/                     # Excel 处理
```

## 版本信息

- **备份日期**: 2026-02-22
- **Total Skills**: 23
- **Total Size**: ~11MB

## License

请参考每个 skill 目录中的 LICENSE.txt 文件了解具体的许可证信息。

## 贡献

这是一个个人备份仓库，不对外接受贡献。

## 联系方式

如有问题，请通过 [GitHub Issues](https://github.com/L-yifan/my-skills/issues) 联系。
