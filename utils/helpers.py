"""Small UI and filesystem helpers."""
from pathlib import Path
import streamlit as st


def load_css(path: Path) -> None:
    """Inject the project's stylesheet once per render."""
    st.markdown(f"<style>{path.read_text(encoding='utf-8')}</style>", unsafe_allow_html=True)


def conversation_title(messages: list[dict[str, str]]) -> str:
    """Make a concise title from the first user message."""
    first = next((item["content"] for item in messages if item["role"] == "user"), "New conversation")
    return first.replace("\n", " ")[:42] + ("…" if len(first) > 42 else "")


def scroll_to_latest_message() -> None:
    """Ask the parent page to smoothly reveal the newest chat message."""
    st.components.v1.html(
        "<script>setTimeout(() => window.parent.document.querySelector('[data-testid=stChatInput]')?.scrollIntoView({behavior: 'smooth', block: 'end'}), 100)</script>",
        height=0,
    )
