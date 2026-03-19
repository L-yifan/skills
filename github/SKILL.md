---
name: github
description: Interact with GitHub repositories, issues, pull requests, and code via the GitHub MCP server. This skill should be used when managing repositories, creating/updating files, working with issues and PRs, searching code/repos/users, creating branches, and performing code reviews. Supports all major GitHub API operations.
---

# GitHub

Base directory for this skill: ~\.agents\skills\github

Interact with GitHub repositories through the Model Context Protocol (MCP) server for GitHub.

## When to Use

- Managing repository files (create, update, get contents)
- Working with issues (create, update, list, comment)
- Managing pull requests (create, review, merge, get status)
- Searching GitHub (repositories, code, issues, users)
- Creating and managing branches
- Forking repositories

## Prerequisites

1. **设置环境变量**：需要 `GITHUB_TOKEN` 环境变量进行 GitHub API 认证
   ```bash
   export GITHUB_TOKEN="your_github_token_here"
   ```

2. **切换到技能目录**：必须在技能目录下运行命令，或使用完整路径
   ```bash
   cd ~/.agents/skills/github
   ```

## Quick Start

Run the CLI script with bun from this skill directory:

```bash
cd ~/.agents/skills/github && bun ./scripts/github.ts <command> [options]
```

**Note on path formats:**
- The `~` (tilde) expands to your home directory in most shells (bash, zsh, PowerShell, Git Bash)
- On Windows with cmd.exe, use: `cd %USERPROFILE%\.agents\skills\github`
- On Windows with PowerShell, use: `cd ~/.agents/skills/github` or `cd $env:USERPROFILE/.agents/skills/github`
- In bash on Windows (e.g., Git Bash), use forward slashes: `cd C:/Users/username/.agents/skills/github`

## Available Commands

### Repository Operations

| Command | Description |
|---------|-------------|
| `create-repository` | Create a new GitHub repository |
| `fork-repository` | Fork a repository to your account |
| `search-repositories` | Search for repositories |

### File Operations

| Command | Description |
|---------|-------------|
| `get-file-contents` | Get file or directory contents |
| `create-or-update-file` | Create or update a single file |
| `push-files` | Push multiple files in a single commit |

### Branch Operations

| Command | Description |
|---------|-------------|
| `create-branch` | Create a new branch |
| `list-commits` | List commits in a repository |

### Issue Operations

| Command | Description |
|---------|-------------|
| `create-issue` | Create a new issue |
| `get-issue` | Get issue details |
| `list-issues` | List repository issues |
| `update-issue` | Update an existing issue |
| `add-issue-comment` | Add a comment to an issue |

### Pull Request Operations

| Command | Description |
|---------|-------------|
| `create-pull-request` | Create a new PR |
| `get-pull-request` | Get PR details |
| `list-pull-requests` | List repository PRs |
| `get-pull-request-files` | Get files changed in PR |
| `get-pull-request-status` | Get PR status checks |
| `get-pull-request-comments` | Get PR review comments |
| `get-pull-request-reviews` | Get PR reviews |
| `create-pull-request-review` | Create a PR review |
| `merge-pull-request` | Merge a PR |
| `update-pull-request-branch` | Update PR branch from base |

### Search Operations

| Command | Description |
|---------|-------------|
| `search-repositories` | Search repositories |
| `search-code` | Search code across GitHub |
| `search-issues` | Search issues and PRs |
| `search-users` | Search GitHub users |

## Global Options

- `-t, --timeout <ms>`: Call timeout (default: 30000)
- `-o, --output <format>`: Output format: `text` | `markdown` | `json` | `raw`

## Common Examples

```bash
# Get file contents (first cd to skill directory)
cd ~/.agents/skills/github && bun ./scripts/github.ts get-file-contents \
  --owner facebook --repo react --path README.md

# Create an issue
cd ~/.agents/skills/github && bun ./scripts/github.ts create-issue \
  --owner myorg --repo myrepo --title "Bug report" --body "Description here"

# List open PRs
cd ~/.agents/skills/github && bun ./scripts/github.ts list-pull-requests \
  --owner facebook --repo react --state open

# Search code
cd ~/.agents/skills/github && bun ./scripts/github.ts search-code \
  --q "useState filename:*.tsx"

# Create a PR review
cd ~/.agents/skills/github && bun ./scripts/github.ts create-pull-request-review \
  --owner myorg --repo myrepo --pull-number 123 \
  --body "LGTM!" --event APPROVE
```

Or save the path for easier use:
```bash
# Set alias in your shell config (e.g., ~/.bashrc or ~/.zshrc)
alias github-cli='cd ~/.agents/skills/github && bun ./scripts/github.ts'

# Then use:
github-cli get-file-contents --owner facebook --repo react --path README.md
```

## Requirements

- [Bun](https://bun.sh) runtime
- `mcporter` package (embedded in script)
- `GITHUB_TOKEN` environment variable for authentication

## Troubleshooting

### Error: Module not found "./scripts/github.ts"

**原因**：当前工作目录不是 `~/.agents/skills/github`

**解决方法**：
```bash
cd ~/.agents/skills/github
bun ./scripts/github.ts <command> [options]
```

或者使用完整路径（需要根据实际情况调整）：
```bash
bun ~/.agents/skills/github/scripts/github.ts <command> [options]
```

**Windows 用户特别提示**：
- 如果在 bash/Git Bash 中使用 Windows 路径（如 `C:\Users\...`），反斜杠会被当作转义字符
- **解决方案**：使用正斜杠 `C:/Users/...` 或双反斜杠 `C:\\Users\\...`
- 更简单的方法：使用 `~/.agents/skills/github` 格式（在 Git Bash 中可用）

示例（Git Bash on Windows）：
```bash
# 正确 ✓
cd ~/.agents/skills/github && bun ./scripts/github.ts <command>
cd C:/Users/username/.agents/skills/github && bun ./scripts/github.ts <command>

# 错误 ✗（反斜杠被转义）
cd C:\Users\username\.agents\skills\github && bun ./scripts/github.ts <command>
```

### Error: MCP error -32603 Not Found

**可能原因**：
1. **路径不存在**：请求的文件或目录在仓库中不存在
2. **认证失败**：`GITHUB_TOKEN` 未设置或无效
3. **仓库不存在**：指定的 owner/repo 不存在或没有访问权限

**解决方法**：
1. **验证路径存在**：先搜索确认路径
   ```bash
   cd ~/.agents/skills/github && bun ./scripts/github.ts search-code \
     --q "filename:your-file.txt repo:owner/repo"
   ```

2. **检查 GITHUB_TOKEN**：
   ```bash
   echo $GITHUB_TOKEN  # Linux/Mac
   echo %GITHUB_TOKEN% # Windows
   ```

3. **验证仓库访问权限**：
   ```bash
   cd ~/.agents/skills/github && bun ./scripts/github.ts get-file-contents \
     --owner owner --repo repo --path .
   ```

### Error: 401/403 Unauthorized

**原因**：GitHub Token 无效或权限不足

**解决方法**：
1. 在 GitHub 生成新的 Personal Access Token
2. 确保 Token 具有所需的权限（如 `repo` 用于私有仓库）
3. 设置环境变量：`export GITHUB_TOKEN="your_token"`

## Resources

- `scripts/github.ts` - Main CLI tool wrapping GitHub MCP server
- `references/api_reference.md` - Detailed parameter documentation for all commands
