from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from _tavily_common import parse_json_arg, print_json, require_fields, tavily_request


USAGE = [
    "Usage: python .\\scripts\\extract.py '<json>'",
    "",
    "Required:",
    "  urls: array - List of URLs to extract (max 20)",
    "",
    "Optional:",
    '  extract_depth: "basic" (default), "advanced" (for JS/complex pages)',
    "  query: string - Reranks chunks by relevance to this query",
    '  format: "markdown" (default), "text"',
    "  include_images: true/false",
    "  include_favicon: true/false",
]


def main() -> None:
    payload = parse_json_arg(sys.argv[1] if len(sys.argv) > 1 else None, USAGE)
    require_fields(payload, ["urls"])
    print_json(tavily_request("extract", payload))


if __name__ == "__main__":
    main()
