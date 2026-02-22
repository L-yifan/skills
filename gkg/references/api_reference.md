# GKG API Reference

Detailed parameter documentation for each GKG command.

## list-projects

Get list of all indexed projects.

**Parameters:** None

**Output:** List of project paths indexed in the knowledge graph.

---

## index-project

Rebuild knowledge graph index for a project.

**Parameters:**
| Parameter | Required | Description |
|-----------|----------|-------------|
| `--project-absolute-path` | Yes | Absolute path to project root |

**When to use:** After substantial file changes, or when index appears stale.

---

## search-codebase-definitions

Search for functions, classes, methods, constants.

**Parameters:**
| Parameter | Required | Description |
|-----------|----------|-------------|
| `--project-absolute-path` | Yes | Absolute path to project root |
| `--search-terms` | Yes | Comma-separated list of names to search |
| `--page` | No | Page number (default: 1) |

**Output:** Signatures, locations, definition types for matches.

---

## get-references

Find all references to a code definition.

**Parameters:**
| Parameter | Required | Description |
|-----------|----------|-------------|
| `--absolute-file-path` | Yes | Path to file containing the definition |
| `--definition-name` | Yes | Exact symbol name (case-sensitive) |
| `--page` | No | Page number (default: 1) |

**Output:** File paths, line numbers, context around each usage.

---

## read-definitions

Read complete definition bodies.

**Parameters:**
| Parameter | Required | Description |
|-----------|----------|-------------|
| `--definitions` | Yes | Comma-separated list, or use `--raw` |
| `--raw` | No | JSON with definitions array |

**JSON format for --raw:**
```json
{
  "definitions": [
    {"names": ["func1", "func2"], "file_path": "/path/to/file.ts"},
    {"names": ["MyClass"], "file_path": "/path/to/other.ts"}
  ]
}
```

---

## get-definition

Go to definition for callable symbols on a line.

**Parameters:**
| Parameter | Required | Description |
|-----------|----------|-------------|
| `--absolute-file-path` | Yes | Path to file with the usage |
| `--line` | Yes | Exact line of code (whitespace preserved) |
| `--symbol-name` | Yes | Symbol to resolve |

**Output types:**
- `Definition` - Symbol defined in workspace
- `ImportedSymbol` - External symbol (returns import statement)

---

## repo-map

Generate compact API-style map of repository.

**Parameters:**
| Parameter | Required | Description |
|-----------|----------|-------------|
| `--project-absolute-path` | Yes | Absolute path to project root |
| `--relative-paths` | Yes | Comma-separated paths to include |
| `--depth` | No | Nesting depth 1-3 (default: 1) |
| `--page` | No | Page number (default: 1) |
| `--page-size` | No | Results per page 1-200 (default: 50) |
| `--show-definitions` | No | Include definitions (default: true) |
| `--show-directories` | No | Include directories (default: true) |

---

## import-usage

Analyze import usages across project.

**Parameters:**
| Parameter | Required | Description |
|-----------|----------|-------------|
| `--project-absolute-path` | Yes | Absolute path to project root |
| `--packages` | Yes | Comma-separated, or use `--raw` |
| `--page` | No | Page number (default: 1) |
| `--page-size` | No | Results per page 1-200 (default: 50) |

**JSON format for --raw:**
```json
{
  "project_absolute_path": "/path/to/project",
  "packages": [
    {"import_path": "react", "name": "React"},
    {"import_path": "@vue/runtime-core"}
  ]
}
```

---

## Global Options

| Option | Description |
|--------|-------------|
| `-t, --timeout <ms>` | Call timeout in milliseconds (default: 30000) |
| `-o, --output <format>` | Output format: text, markdown, json, raw |
| `--raw <json>` | Provide raw JSON arguments |
