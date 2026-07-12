"""Environment-backed application settings."""
from dataclasses import dataclass
from pathlib import Path
import os

from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")


@dataclass(frozen=True)
class Settings:
    """Centralized, immutable settings used by the application."""

    gemini_api_key: str = os.getenv("GEMINI_API_KEY", "")
    gemini_model: str = os.getenv("GEMINI_MODEL", "gemini-2.0-flash")
    conversations_path: Path = BASE_DIR / "data" / "conversations.json"
    logo_path: Path = BASE_DIR / "assets" / "logo.png"
    css_path: Path = BASE_DIR / "assets" / "styles.css"


settings = Settings()
