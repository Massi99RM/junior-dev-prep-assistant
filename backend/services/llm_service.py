import asyncio
from functools import lru_cache
import httpx
from anthropic import Anthropic
from backend.config import settings

@lru_cache(maxsize=1)
def get_claude_client() -> Anthropic:
    """Initialize and cache the Anthropic client instance."""
    return Anthropic(api_key=settings.anthropic_api_key)

async def generate_response(prompt: str, provider: str = None) -> tuple[str, str]:
    active_provider = provider if provider else settings.llm_provider

    if active_provider == "ollama":
        url = f"{settings.ollama_base_url}/api/generate"
        payload = {
            "model": settings.ollama_model,
            "prompt": prompt,
            "stream": False
        }
        async with httpx.AsyncClient(timeout=60.0) as http_client:
            response = await http_client.post(url, json=payload)
            response.raise_for_status()
            data = response.json()
            return data.get("response", ""), "ollama"

    elif active_provider == "claude":
        def call_claude():
            client = get_claude_client()
            message = client.messages.create(
                model="claude-haiku-4-5-20251001",
                max_tokens=1024,
                messages=[{"role": "user", "content": prompt}]
            )
            return message.content[0].text

        response_text = await asyncio.to_thread(call_claude)
        return response_text, "claude"

    else:
        raise ValueError(f"Unsupported LLM provider: {active_provider}")