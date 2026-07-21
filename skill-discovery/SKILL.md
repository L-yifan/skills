---
name: skill-discovery
description: 从个人 skills 索引仓库中根据用户任务检索并推荐最合适的技能。当用户问"用什么技能"、"有没有xx技能"、"怎么安装xx"、"推荐一个技能"、"哪个skill"时使用。只在用户明确询问技能推荐时触发。
---

# Skill Discovery

README 是唯一数据源。搜索时从 GitHub 实时拉取，不维护本地副本。

## 搜索流程

### 1. 提取关键词

从用户任务中提取 2-5 个关键词（中英文 + 同义词），构建 `grep -iE` 正则。示例：

- 用户说"管理笔记" → `grep -iE "obsidian|note|笔记|知识库|wiki"`  
- 用户说"审查代码" → `grep -iE "review|审查|代码|code.review|diff"`
- 用户说"处理 PDF" → `grep -iE "pdf|PDF|文档|document"`

### 2. 执行搜索

```bash
gh api repos/L-yifan/skills/contents/README.md --jq '.content' | base64 -d 2>/dev/null | grep -iE "<regex>" || echo "FALLBACK"
```

- 输出：匹配的 README 表格行，每行包含 `| 技能名 | 描述 | 来源 | 安装命令 |`
- 从匹配行中提取技能名、描述、安装命令

### 3. 降级路径

若 `gh` 不可用（未安装、未登录、网络问题），按优先级降级：

1. **优先**：用 `WebFetch` 读取 `https://raw.githubusercontent.com/L-yifan/skills/main/README.md`，在返回的 markdown 中搜索关键词
2. **兜底**：用 `WebSearch` 搜索 `site:github.com SKILL.md <user task keywords>`

### 4. 排名

对匹配行，以自然语言判定匹配度：

1. 关键词在**技能名**中出现 → 权重最高
2. 关键词在**描述**中出现 → 权重中等  
3. 关键词在**分类标题**中出现 → 权重较低
4. 同分类下自建技能优先

返回 ≤3 个候选，按匹配度降序。

## 输出格式

一句话结论，然后表格。安装命令必须完整可复制：

```markdown
| 推荐 | 技能 | 匹配原因 | 安装命令 |
|------|------|----------|----------|
| ★ 最推荐 | skill-name | 一句话 | `npx skills add ...` |
| ☆ 备选 | skill-name | 一句话 | `npx skills add ...` |
```

目录无匹配时说清楚，并建议扩大搜索范围或自建技能。
