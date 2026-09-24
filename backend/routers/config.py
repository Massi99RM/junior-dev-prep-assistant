from fastapi import APIRouter
from backend.config import settings
from backend.schemas.schemas import ConfigResponse, ConfigUpdateRequest

router = APIRouter(prefix="/api/config", tags=["Configuration"])

@router.get("", response_model=ConfigResponse)
def get_config():
    return ConfigResponse(
        llm_provider=settings.llm_provider,
        ollama_model=settings.ollama_model,
        ollama_host=settings.ollama_host
    )

@router.post("", response_model=ConfigResponse)
def update_config(update: ConfigUpdateRequest):
    # Update the runtime setting
    settings.llm_provider = update.llm_provider
    return ConfigResponse(
        llm_provider=settings.llm_provider,
        ollama_model=settings.ollama_model,
        ollama_host=settings.ollama_host
    )