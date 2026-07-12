"""Streamlit entry point for Gemini Studio."""
import streamlit as st

from components.chat_input import render_chat_input
from components.header import render_header
from components.message import render_message
from components.sidebar import render_sidebar
from config.settings import settings
from services.gemini_service import GeminiService
from utils.chat_history import load_conversations, save_conversation
from utils.helpers import conversation_title, load_css, scroll_to_latest_message

st.set_page_config(page_title="Gemini Studio", page_icon="✦", layout="wide", initial_sidebar_state="expanded")


def initialize_state() -> None:
    st.session_state.setdefault("messages", [])
    st.session_state.setdefault("conversation_id", None)
    st.session_state.setdefault("confirming_clear", False)
    st.session_state.setdefault("dark_mode", True)


def reset_chat() -> None:
    st.session_state.messages = []
    st.session_state.conversation_id = None
    st.session_state.confirming_clear = False


def main() -> None:
    initialize_state()
    load_css(settings.css_path)
    if not st.session_state.dark_mode:
        st.markdown("<style>:root{--bg:#f7f8fc;--panel:#fff;--panel-2:#fff;--text:#202333;--muted:#676b7c;--border:rgba(30,35,55,.12)}.stApp{background:#f7f8fc}[data-testid='stSidebar']{background:#fff}[data-testid='stChatMessage'] [data-testid='stMarkdownContainer']{background:#fff}</style>", unsafe_allow_html=True)
    saved = load_conversations(settings.conversations_path)
    selected_id, new_chat, _, confirm_clear = render_sidebar(saved)
    if new_chat or confirm_clear:
        reset_chat()
        st.rerun()
    if selected_id:
        selected = next(item for item in saved if item["id"] == selected_id)
        st.session_state.messages = selected["messages"]
        st.session_state.conversation_id = selected_id
        st.rerun()

    render_header(settings.logo_path)
    if not st.session_state.messages:
        st.markdown("""<div class="landing"><h2>What can I help you explore?</h2><p>Ask questions, draft ideas, analyze code, or start a focused conversation.</p></div>""", unsafe_allow_html=True)
        examples = st.columns(3)
        for column, prompt in zip(examples, ["Help me plan a project", "Explain a difficult concept", "Review this code"]):
            if column.button(prompt, use_container_width=True):
                st.session_state["seed_prompt"] = prompt

    for index, message in enumerate(st.session_state.messages):
        render_message(message, index)

    prompt = st.session_state.pop("seed_prompt", None) or render_chat_input()
    if not prompt:
        return
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.spinner("Gemini is thinking…"):
        try:
            service = GeminiService(settings.gemini_api_key, settings.gemini_model)
            answer = service.generate_response(st.session_state.messages)
            st.session_state.messages.append({"role": "assistant", "content": answer})
            st.session_state.conversation_id = save_conversation(
                settings.conversations_path,
                conversation_title(st.session_state.messages),
                st.session_state.messages,
                st.session_state.conversation_id,
            )
        except (ValueError, RuntimeError) as error:
            st.error(str(error), icon="⚠️")
    scroll_to_latest_message()
    st.rerun()


if __name__ == "__main__":
    main()
