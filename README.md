# Gemini Studio

Gemini Studio is a polished, portfolio-ready AI chat application built entirely with Python and Streamlit. It provides a focused ChatGPT-style experience while keeping API integration, persistence, configuration, and UI components cleanly separated.

## Features

- Dark, responsive AI assistant interface with custom CSS, animation, and message bubbles
- Gemini responses with Markdown and syntax-highlighted code blocks
- New-chat flow, clear-chat confirmation, spinner, and user-friendly API errors
- Browser session state plus JSON-backed saved conversation history
- Reloadable conversations and automatic persistence after every completed reply
- Example prompts, a collapsible Streamlit sidebar, and an in-app copy response control
- API key isolated in a local `.env` file (never committed)

## Project structure

```text
gemini-chatbot/
├── app.py                    # Streamlit entry point and orchestration
├── config/settings.py        # Environment-backed settings
├── services/gemini_service.py# Gemini-only service adapter
├── components/               # Header, sidebar, input, and message UI
├── utils/                    # Persistence and small presentation helpers
├── assets/styles.css          # Custom visual design
├── data/conversations.json   # Local saved conversations
├── requirements.txt
└── .env.example
```

## Installation

Requirements: Python 3.10+ and a Gemini API key.

```bash
git clone https://github.com/Auric-Coder/Gemini-AI-Chatbot.git
cd gemini-chatbot
python -m venv .venv
```

Activate the environment, then install dependencies:

```bash
# Windows PowerShell
.venv\Scripts\Activate.ps1

pip install -r requirements.txt
```

## Environment setup

Copy `.env.example` to `.env`, then supply your key. Obtain a key from [Google AI Studio](https://aistudio.google.com/app/apikey).

```env
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.0-flash
```

`.env` is ignored by Git. Never put a production key in source code or commit it to a repository.

## How Gemini integration works

`services/gemini_service.py` is the only module that communicates with Google. It uses the official `google-genai` SDK, converts the current chat history into context, and returns a Markdown-ready response. `app.py` only coordinates UI state and delegates generation to that service. This keeps provider changes, retry behavior, and future model settings isolated from the interface.

## Run locally

```bash
pip install -r requirements.txt
streamlit run app.py
```

Streamlit will print a local URL, normally `http://localhost:8501`.

## Deployment

- **Streamlit Community Cloud:** Push this project to GitHub, create an app pointing to `app.py`, and add `GEMINI_API_KEY` in the app's secrets manager.
- **Render:** Create a Python web service with build command `pip install -r requirements.txt` and start command `streamlit run app.py --server.port $PORT --server.address 0.0.0.0`. Add the key as an environment variable.
- **Hugging Face Spaces:** Create a Streamlit Space, upload the project, use `requirements.txt`, and configure the key as a Space secret.

For hosted deployments, replace local JSON persistence with a managed database or object store so conversation history survives container restarts.

## Future improvements

- Streaming token-by-token responses
- Account-based, encrypted cloud history
- File upload and multimodal Gemini prompts
- Conversation search, rename, export, and delete controls
- Automated tests, linting, and CI
- Model selector, safety controls, and usage analytics
