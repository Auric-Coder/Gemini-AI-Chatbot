"""Chat message rendering."""
import json
import streamlit as st


def render_message(message: dict[str, str], index: int) -> None:
    """Render a message with native Markdown/code support and optional copy control."""
    role = message["role"]
    icon = "✦" if role == "assistant" else "◉"
    st.markdown(f'<div class="message-label {role}"><span>{icon}</span>{"Gemini" if role == "assistant" else "You"}</div>', unsafe_allow_html=True)
    with st.chat_message(role, avatar=None):
        st.markdown(message["content"])
        if role == "assistant":
            copy_id = f"copy_{index}"
            if st.button("Copy response", key=copy_id, use_container_width=False):
                payload = json.dumps(message["content"])
                st.components.v1.html(f"<script>navigator.clipboard.writeText({payload})</script>", height=0)
                st.toast("Copied to clipboard")
