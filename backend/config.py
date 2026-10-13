from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    # LLM provider selection — "ollama" or "claude"
    llm_provider: str = "ollama"

    # Ollama config
    ollama_base_url: str = "http://localhost:11434"
    ollama_model: str = "llama3.2"

    # Anthropic config
    anthropic_api_key: str = ""

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

settings = Settings()