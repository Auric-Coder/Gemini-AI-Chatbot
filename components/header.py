"""Top-of-page branding."""
from pathlib import Path
import streamlit as st


def render_header(logo_path: Path) -> None:
    logo, heading = st.columns([1, 14], vertical_alignment="center")
    logo.image(str(logo_path), width=42)
    with heading:
        st.markdown("<div class='header-copy'><h1>Gemini Studio</h1><p>Your thoughtful AI workspace</p></div>", unsafe_allow_html=True)
    st.markdown("""
    <section class="app-header">
      <span class="model-pill">● Gemini</span>
    </section>
    """, unsafe_allow_html=True)
