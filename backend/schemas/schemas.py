from pydantic import BaseModel
from typing import List, Optional

# --- Topic Models ---

class PromptItem(BaseModel):
    label: str
    prompt: str

class TopicGroup(BaseModel):
    topic_name: str
    description: str
    prompts: List[PromptItem]

class CategoryResponse(BaseModel):
    category: str
    description: str
    topics: List[TopicGroup]

# --- Chat Models ---

class ChatRequest(BaseModel):
    message: str
    provider: Optional[str] = None

class ChatResponse(BaseModel):
    response: str
    provider: str

# --- Config Models ---

class ConfigResponse(BaseModel):
    llm_provider: str
    ollama_model: str
    ollama_host: str

class ConfigUpdateRequest(BaseModel):
    llm_provider: str