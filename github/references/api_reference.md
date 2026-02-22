# GitHub API Reference

Detailed parameter documentation for GitHub MCP server commands.

## Repository Commands

### create-repository

Create a new GitHub repository in your account.

```bash
bun .../github.ts create-repository --name <name> [options]
```

| Parameter | Required | Description |
|-----------|----------|-------------|
| `--name` | Yes | Repository name |
| `--description` | No | Repository description |
| `--private` | No | Whether repo should be private (true/false) |
| `--auto-init` | No | Initialize with README.md (true/false) |

### fork-repository

Fork a repository to your account or organization.

```bash
bun .../github.ts fork-repository --owner <owner> --repo <repo> [options]
```

| Parameter | Required | Description |
|-----------|----------|-------------|
| `--owner` | Yes | Repository owner |
| `--repo` | Yes | Repository name |
| `--organization` | No | Organization to fork to (default: personal) |

## File Commands

### get-file-contents

Get contents of a file or directory.

```bash
bun .../github.ts get-file-contents --owner <owner> --repo <repo> --path <path> [options]
```

| Parameter | Required | Description |
|-----------|----------|-------------|
| `--owner` | Yes | Repository owner |
| `--repo` | Yes | Repository name |
| `--path` | Yes | Path to file or directory |
| `--branch` | No | Branch to get contents from |

### create-or-update-file

Create or update a single file.

```bash
bun .../github.ts create-or-update-file --owner <owner> --repo <repo> --path <path> --content <content> --message <message> --branch <branch> [options]
```

| Parameter | Required | Description |
|-----------|----------|-------------|
| `--owner` | Yes | Repository owner |
| `--repo` | Yes | Repository name |
| `--path` | Yes | File path |
| `--content` | Yes | File content |
| `--message` | Yes | Commit message |
| `--branch` | Yes | Target branch |
| `--sha` | No | SHA of file being replaced (required for updates) |

### push-files

Push multiple files in a single commit.

```bash
bun .../github.ts push-files --owner <owner> --repo <repo> --branch <branch> --files <files> --message <message>
```

| Parameter | Required | Description |
|-----------|----------|-------------|
| `--owner` | Yes | Repository owner |
| `--repo` | Yes | Repository name |
| `--branch` | Yes | Target branch |
| `--files` | Yes | Array of files (use --raw for complex objects) |
| `--message` | Yes | Commit message |

## Issue Commands

### create-issue

Create a new issue.

```bash
bun .../github.ts create-issue --owner <owner> --repo <repo> --title <title> [options]
```

| Parameter | Required | Description |
|-----------|----------|-------------|
| `--owner` | Yes | Repository owner |
| `--repo` | Yes | Repository name |
| `--title` | Yes | Issue title |
| `--body` | No | Issue description |
| `--assignees` | No | Comma-separated assignees |
| `--labels` | No | Comma-separated labels |
| `--milestone` | No | Milestone number |

### list-issues

List issues with filtering.

```bash
bun .../github.ts list-issues --owner <owner> --repo <repo> [options]
```

| Parameter | Required | Description |
|-----------|----------|-------------|
| `--owner` | Yes | Repository owner |
| `--repo` | Yes | Repository name |
| `--state` | No | open, closed, all |
| `--labels` | No | Comma-separated labels |
| `--sort` | No | created, updated, comments |
| `--direction` | No | asc, desc |
| `--since` | No | ISO 8601 timestamp |
| `--page` | No | Page number |
| `--per-page` | No | Results per page |

## Pull Request Commands

### create-pull-request

Create a new pull request.

```bash
bun .../github.ts create-pull-request --owner <owner> --repo <repo> --title <title> --head <head> --base <base> [options]
```

| Parameter | Required | Description |
|-----------|----------|-------------|
| `--owner` | Yes | Repository owner |
| `--repo` | Yes | Repository name |
| `--title` | Yes | PR title |
| `--head` | Yes | Source branch |
| `--base` | Yes | Target branch |
| `--body` | No | PR description |
| `--draft` | No | Create as draft (true/false) |
| `--maintainer-can-modify` | No | Allow maintainer edits |

### create-pull-request-review

Submit a review on a PR.

```bash
bun .../github.ts create-pull-request-review --owner <owner> --repo <repo> --pull-number <num> --body <body> --event <event> [options]
```

| Parameter | Required | Description |
|-----------|----------|-------------|
| `--owner` | Yes | Repository owner |
| `--repo` | Yes | Repository name |
| `--pull-number` | Yes | PR number |
| `--body` | Yes | Review body |
| `--event` | Yes | APPROVE, REQUEST_CHANGES, COMMENT |
| `--commit-id` | No | Specific commit SHA |
| `--comments` | No | Line comments (use --raw) |

### merge-pull-request

Merge a pull request.

```bash
bun .../github.ts merge-pull-request --owner <owner> --repo <repo> --pull-number <num> [options]
```

| Parameter | Required | Description |
|-----------|----------|-------------|
| `--owner` | Yes | Repository owner |
| `--repo` | Yes | Repository name |
| `--pull-number` | Yes | PR number |
| `--commit-title` | No | Custom merge commit title |
| `--commit-message` | No | Custom merge commit message |
| `--merge-method` | No | merge, squash, rebase |

## Search Commands

### search-code

Search code across GitHub.

```bash
bun .../github.ts search-code --q <query> [options]
```

| Parameter | Required | Description |
|-----------|----------|-------------|
| `--q` | Yes | Search query (GitHub syntax) |
| `--order` | No | asc, desc |
| `--page` | No | Page number |
| `--per-page` | No | Results per page (max 100) |

**Query syntax examples:**
- `useState repo:facebook/react` - Search in specific repo
- `filename:*.tsx import React` - Search in TSX files
- `path:src/components Button` - Search in path

### search-issues

Search issues and pull requests.

```bash
bun .../github.ts search-issues --q <query> [options]
```

| Parameter | Required | Description |
|-----------|----------|-------------|
| `--q` | Yes | Search query |
| `--sort` | No | comments, reactions, created, updated, etc. |
| `--order` | No | asc, desc |
| `--page` | No | Page number |
| `--per-page` | No | Results per page |

**Query syntax examples:**
- `is:issue is:open label:bug` - Open bug issues
- `is:pr is:merged author:octocat` - Merged PRs by user
- `repo:facebook/react type:issue` - Issues in repo

## Using --raw for Complex Parameters

For complex objects or arrays, use the `--raw` flag with JSON:

```bash
# Push files with --raw
bun .../github.ts push-files --raw '{"owner":"myorg","repo":"myrepo","branch":"main","files":[{"path":"src/index.ts","content":"console.log(1)"}],"message":"Add file"}'

# PR review with line comments
bun .../github.ts create-pull-request-review --raw '{"owner":"myorg","repo":"myrepo","pull_number":1,"body":"Review","event":"COMMENT","comments":[{"path":"src/index.ts","line":10,"body":"Consider refactoring"}]}'
```
