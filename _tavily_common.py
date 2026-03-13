import base64
import json
import os
import re
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path


TAVILY_MCP_ISSUER = "https://mcp.tavily.com/"


def _jwt_payload(token: str) -> dict:
    parts = token.split(".")
    if len(parts) < 2:
        return {}
    payload = parts[1]
    padding = "=" * (-len(payload) % 4)
    try:
        raw = base64.urlsafe_b64decode(payload + padding)
        return json.loads(raw.decode("utf-8"))
    except Exception:
        return {}


def _valid_tavily_token(token: str) -> bool:
    payload = _jwt_payload(token)
    if payload.get("iss") != TAVILY_MCP_ISSUER:
        return False
    exp = payload.get("exp")
    if isinstance(exp, (int, float)) and time.time() >= exp:
        return False
    return True


def load_tavily_key() -> str | None:
    env_key = os.environ.get("TAVILY_API_KEY")
    if env_key:
        return env_key

    auth_dir = Path.home() / ".mcp-auth"
    if not auth_dir.exists():
        return None

    for token_file in auth_dir.rglob("*_tokens.json"):
        try:
            data = json.loads(token_file.read_text(encoding="utf-8"))
        except Exception:
            continue
        token = data.get("access_token")
        if token and _valid_tavily_token(token):
            return token
    return None


def parse_json_arg(raw: str | None, usage_lines: list[str]) -> dict:
    if not raw:
        print("\n".join(usage_lines))
        raise SystemExit(1)
    if raw == "-":
        raw = sys.stdin.buffer.read().decode("utf-8-sig", errors="strict")
    raw = raw.strip()
    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        print("Error: Invalid JSON input", file=sys.stderr)
        raise SystemExit(1)


def require_fields(payload: dict, fields: list[str]) -> None:
    for field in fields:
        if field not in payload:
            print(f"Error: '{field}' field is required", file=sys.stderr)
            raise SystemExit(1)


def tavily_request(endpoint: str, payload: dict) -> dict:
    key = load_tavily_key()
    if not key:
        print("Error: Failed to obtain Tavily API token", file=sys.stderr)
        print(
            "Set TAVILY_API_KEY or authenticate via Tavily MCP first.",
            file=sys.stderr,
        )
        raise SystemExit(1)

    body = json.dumps(payload).encode("utf-8")
    request = urllib.request.Request(
        f"https://api.tavily.com/{endpoint}",
        data=body,
        headers={
            "Authorization": f"Bearer {key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )

    try:
        with urllib.request.urlopen(request, timeout=150) as response:
            return json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="replace")
        print(f"Error: Tavily API returned HTTP {exc.code}", file=sys.stderr)
        if detail:
            print(detail, file=sys.stderr)
        raise SystemExit(1)
    except urllib.error.URLError as exc:
        print(f"Error: {exc}", file=sys.stderr)
        raise SystemExit(1)


def print_json(data: object) -> None:
    text = json.dumps(data, ensure_ascii=False, indent=2)
    sys.stdout.buffer.write(text.encode("utf-8"))
    sys.stdout.buffer.write(b"\n")


def safe_filename_from_url(url: str) -> str:
    filename = re.sub(r"^https?://", "", url)
    filename = re.sub(r"[/:?&=]", "_", filename)
    return filename[:100] or "page"
