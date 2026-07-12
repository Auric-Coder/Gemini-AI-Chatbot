"""A small, UI-independent adapter around the official Google Gen AI SDK."""
from google import genai
from google.genai import types


class GeminiService:
    """Sends a conversation to Gemini and returns a Markdown-ready response."""

    def __init__(self, api_key: str, model: str) -> None:
        if not api_key:
            raise ValueError("GEMINI_API_KEY is missing. Add it to your .env file and restart Streamlit.")
        self.client = genai.Client(api_key=api_key)
        self.model = model

    def generate_response(self, messages: list[dict[str, str]]) -> str:
        """Generate a response using prior messages as plain text context."""
        prompt = self._build_prompt(messages)
        try:
            response = self.client.models.generate_content(
                model=self.model,
                contents=prompt,
                config=types.GenerateContentConfig(
                    system_instruction=(
                        "You are Gemini, a thoughtful and concise AI assistant. "
                        "Use Markdown when it improves readability. Use fenced code blocks with a language tag."
                    ),
                ),
            )
            return response.text or "I couldn't generate a response. Please try again."
        except Exception as error:
            raise RuntimeError(f"Gemini could not complete that request: {error}") from error

    @staticmethod
    def _build_prompt(messages: list[dict[str, str]]) -> str:
        lines = []
        for message in messages:
            speaker = "User" if message["role"] == "user" else "Assistant"
            lines.append(f"{speaker}: {message['content']}")
        lines.append("Assistant:")
        return "\n\n".join(lines)
