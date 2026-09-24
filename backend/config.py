from pydantic import ConfigDict
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # LLM provider selection — "ollama" or "claude"
    llm_provider: str = "ollama"

    # Ollama config
    ollama_host: str = "http://localhost:11434"
    ollama_model: str = "llama3.2"

    # Anthropic config
    anthropic_api_key: str = ""

    model_config = ConfigDict(env_file=".env", extra="ignore", frozen=False)

settings = Settings()