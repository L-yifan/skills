from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from _tavily_common import (
    parse_json_arg,
    print_json,
    require_fields,
    safe_filename_from_url,
    tavily_request,
)


USAGE = [
    "Usage: python .\\scripts\\crawl.py '<json>' [output_dir]",
    "",
    "Required:",
    "  url: string - Root URL to begin crawling",
    "",
    "Optional:",
    "  max_depth: 1-5 (default: 1) - Levels deep to crawl",
    "  max_breadth: integer (default: 20) - Links per page",
    "  limit: integer (default: 50) - Total pages cap",
    "  instructions: string - Natural language guidance for semantic focus",
    '  extract_depth: "basic" (default), "advanced"',
    '  format: "markdown" (default), "text"',
    '  select_paths: ["regex1", "regex2"] - Paths to include',
    '  select_domains: ["regex1"] - Domains to include',
    "  allow_external: true/false (default: true)",
    "  include_favicon: true/false",
    "",
    "Arguments:",
    "  output_dir: optional directory to save markdown files",
]


def save_results(output_dir: Path, response: dict) -> None:
    output_dir.mkdir(parents=True, exist_ok=True)
    for item in response.get("results", []):
        page_url = item.get("url", "")
        content = item.get("raw_content", "")
        filepath = output_dir / f"{safe_filename_from_url(page_url)}.md"
        filepath.write_text(f"# {page_url}\n\n{content}", encoding="utf-8")
        print(f"Saved: {filepath}")
    print(f"Crawl complete. Files saved to: {output_dir}")


def main() -> None:
    payload = parse_json_arg(sys.argv[1] if len(sys.argv) > 1 else None, USAGE)
    output_dir = Path(sys.argv[2]) if len(sys.argv) > 2 else None
    require_fields(payload, ["url"])

    if output_dir is not None:
        payload = dict(payload)
        payload["format"] = "markdown"

    print(f"Crawling: {payload['url']}")
    response = tavily_request("crawl", payload)

    if output_dir is not None:
        save_results(output_dir, response)
    else:
        print_json(response)


if __name__ == "__main__":
    main()
