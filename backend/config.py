from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    # LLM provider selection — "ollama" or "claude"
    llm_provider: str = "ollama"

    # Ollama config
    ollama_base_url: str = "http://localhost:11434"
    ollama_model: str = "llama3.2"

    # Anthropic config
    anthropic_api_key: str = ""

    # CORS configuration
    cors_origins: str = "http://localhost:5173"

    @property
    def cors_origins_list(self) -> list[str]:
        """Return CORS origins as a clean list."""
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

settings = Settings()