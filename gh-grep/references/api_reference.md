# gh-grep API Reference

## searchGitHub Parameters

### query (required)
Literal code pattern to search for. Use actual code that appears in files.

**Examples:**
- `useState(` - React hook usage
- `export function` - Function exports
- `import { Router }` - Specific imports
- `class.*extends Component` - Class patterns (with regex)

### matchCase (optional, default: false)
Enable case-sensitive matching.

```bash
--match-case true
```

Use when searching for:
- Specific constant names (`API_KEY`, `MAX_RETRIES`)
- Case-sensitive identifiers

### matchWholeWords (optional, default: false)
Match complete words only.

```bash
--match-whole-words true
```

Prevents partial matches. `use` won't match `useState`.

### useRegexp (optional, default: false)
Enable regular expression patterns.

```bash
--use-regexp true
```

Supports full regex syntax including:
- `.*` - Any characters
- `\s+` - Whitespace
- `(?s)` - Multiline matching (dot matches newlines)
- `[a-z]+` - Character classes

### repo (optional)
Filter by repository name.

**Examples:**
```bash
--repo "facebook/react"      # Exact repository
--repo "vercel/"             # All vercel org repos
--repo "microsoft/vscode"    # Specific project
```

### path (optional)
Filter by file path.

**Examples:**
```bash
--path "src/components/"     # Component files
--path "/route.ts"           # Route files at any level
--path "README.md"           # README files
--path ".config"             # Config files
```

### language (optional)
Filter by programming language (comma-separated).

**Common values:**
- TypeScript, TSX
- JavaScript, JSX
- Python
- Java
- Go
- Rust
- C, C++, C#
- Ruby
- PHP
- Markdown, YAML, JSON

```bash
--language "TypeScript,TSX"
--language "Python"
```

## Regex Pattern Examples

### Multiline Patterns
Prefix with `(?s)` for dot to match newlines:

```bash
# useEffect with cleanup
--query "(?s)useEffect\(\(\) => {.*return \(\) =>" --use-regexp true

# try-catch with await
--query "(?s)try {.*await.*} catch" --use-regexp true
```

### Flexible Matching
```bash
# useState with any state name
--query "const \[.*\] = useState" --use-regexp true

# Any hook usage
--query "use[A-Z][a-zA-Z]+\(" --use-regexp true

# Import with destructuring
--query "import {.*} from" --use-regexp true
```

### Specific Patterns
```bash
# API endpoint definitions
--query "app\.(get|post|put|delete)\(" --use-regexp true

# Environment variable access
--query "process\.env\.[A-Z_]+" --use-regexp true

# React component props
--query "interface.*Props" --use-regexp true
```

## Output Formats

| Format | Flag | Description |
|--------|------|-------------|
| text | `-o text` | Plain text (default) |
| json | `-o json` | JSON structure |
| markdown | `-o markdown` | Markdown formatted |
| raw | `-o raw` | Raw API response |

## Timeout

Default 30 seconds. Adjust with:

```bash
-t 60000  # 60 seconds
--timeout 60000
```

## Error Handling

Common issues:
- **Timeout**: Increase timeout or narrow search with filters
- **No results**: Check pattern accuracy, try broader search
- **Too many results**: Add language/repo/path filters
