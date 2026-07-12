"""Sidebar controls and saved-conversation navigation."""
import streamlit as st


def render_sidebar(conversations: list[dict]) -> tuple[str | None, bool, bool, bool]:
    """Return selected conversation id, and new/clear/confirm actions."""
    with st.sidebar:
        st.markdown("<div class='sidebar-brand'>✦ <span>GEMINI STUDIO</span></div>", unsafe_allow_html=True)
        new_chat = st.button("＋ New chat", type="primary", use_container_width=True)
        st.caption("CONVERSATIONS")
        selected_id = None
        for conversation in sorted(conversations, key=lambda item: item.get("updated_at", ""), reverse=True):
            if st.button(f"◌  {conversation['title']}", key=f"open_{conversation['id']}", use_container_width=True):
                selected_id = conversation["id"]
        st.divider()
        st.caption("APPEARANCE")
        st.toggle("Dark mode", key="dark_mode", value=True)
        clear_requested = st.button("Clear current chat", use_container_width=True)
        confirm_clear = False
        if clear_requested or st.session_state.get("confirming_clear"):
            st.session_state.confirming_clear = True
            st.warning("Clear all messages in this chat?")
            left, right = st.columns(2)
            confirm_clear = left.button("Yes, clear", type="primary", use_container_width=True)
            if right.button("Cancel", use_container_width=True):
                st.session_state.confirming_clear = False
        return selected_id, new_chat, clear_requested, confirm_clear
