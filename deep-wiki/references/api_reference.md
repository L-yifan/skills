# DeepWiki API Reference

DeepWiki MCP server endpoint: `https://mcp.deepwiki.com/sse`

## Tools

### read_wiki_structure

Get a list of documentation topics for a GitHub repository.

**Parameters:**
- `repoName` (string, required): GitHub repository in `owner/repo` format

**Example:**
```json
{"repoName": "facebook/react"}
```

**Returns:** List of available documentation topics/sections.

---

### read_wiki_contents

View full AI-generated documentation about a GitHub repository.

**Parameters:**
- `repoName` (string, required): GitHub repository in `owner/repo` format

**Example:**
```json
{"repoName": "vercel/next.js"}
```

**Returns:** Comprehensive documentation including architecture, key components, and usage patterns.

---

### ask_question

Ask any question about a GitHub repository.

**Parameters:**
- `repoName` (string, required): GitHub repository in `owner/repo` format
- `question` (string, required): The question to ask about the repository

**Example:**
```json
{
  "repoName": "prisma/prisma",
  "question": "How does the query engine work?"
}
```

**Returns:** AI-generated answer based on repository analysis.

## CLI Options

| Flag | Description | Default |
|------|-------------|---------|
| `-t, --timeout <ms>` | Request timeout | 30000 |
| `-o, --output <format>` | Output format: text, markdown, json, raw | text |
| `--raw <json>` | Pass raw JSON arguments directly | - |

## Requirements

- Bun runtime (`bun` command)
- Network access to `mcp.deepwiki.com`

## Limitations

- Only works with public GitHub repositories
- Response time depends on repository size and complexity
- Documentation is AI-generated and may not cover all aspects
