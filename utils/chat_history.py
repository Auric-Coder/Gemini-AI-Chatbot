"""Persistent, JSON-based conversation storage."""
from datetime import datetime, timezone
import json
from pathlib import Path
from uuid import uuid4


def load_conversations(path: Path) -> list[dict]:
    if not path.exists():
        return []
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, OSError):
        return []


def save_conversation(path: Path, title: str, messages: list[dict[str, str]], conversation_id: str | None = None) -> str:
    """Create or replace a saved conversation and return its stable id."""
    path.parent.mkdir(parents=True, exist_ok=True)
    entries = load_conversations(path)
    identifier = conversation_id or str(uuid4())
    record = {"id": identifier, "title": title, "messages": messages, "updated_at": datetime.now(timezone.utc).isoformat()}
    entries = [item for item in entries if item["id"] != identifier] + [record]
    path.write_text(json.dumps(entries, indent=2, ensure_ascii=False), encoding="utf-8")
    return identifier


def delete_conversation(path: Path, conversation_id: str) -> None:
    entries = [item for item in load_conversations(path) if item["id"] != conversation_id]
    path.write_text(json.dumps(entries, indent=2, ensure_ascii=False), encoding="utf-8")
