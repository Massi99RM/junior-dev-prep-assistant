from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.config import settings
from backend.routers import topics, chat, config

app = FastAPI(
    title="Junior Dev Prep Assistant API",
    version="1.0.0",
    description="Backend API supporting dual LLM providers (Ollama/Claude) and JSON-driven interview topics."
)

# Configure CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(topics.router)
app.include_router(chat.router)
app.include_router(config.router)

@app.get("/")
def root():
    return {"message": "Welcome to the Junior Dev Prep Assistant API! Visit /docs for Swagger documentation."}