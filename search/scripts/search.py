from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from _tavily_common import parse_json_arg, print_json, require_fields, tavily_request


USAGE = [
    "Usage: python .\\scripts\\search.py '<json>'",
    "",
    "Required:",
    "  query: string - Search query (keep under 400 chars)",
    "",
    "Optional:",
    '  search_depth: "ultra-fast", "fast", "basic" (default), "advanced"',
    '  topic: "general" (default)',
    "  max_results: 1-20 (default: 10)",
    '  time_range: "day", "week", "month", "year"',
    '  start_date: "YYYY-MM-DD"',
    '  end_date: "YYYY-MM-DD"',
    '  include_domains: ["domain1.com", "domain2.com"]',
    '  exclude_domains: ["domain1.com", "domain2.com"]',
    "  country: country name (general topic only)",
    "  include_raw_content: true/false",
    "  include_images: true/false",
    "  include_image_descriptions: true/false",
    "  include_favicon: true/false",
]


def main() -> None:
    payload = parse_json_arg(sys.argv[1] if len(sys.argv) > 1 else None, USAGE)
    require_fields(payload, ["query"])
    print_json(tavily_request("search", payload))


if __name__ == "__main__":
    main()
