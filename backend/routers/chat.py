from fastapi import APIRouter, HTTPException
from backend.schemas.schemas import ChatRequest, ChatResponse
from backend.services.llm_service import generate_response

router = APIRouter(prefix="/api/chat", tags=["Chat"])

@router.post("", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    try:
        response_text, provider_used = await generate_response(
            prompt=request.message,
            provider=request.provider
        )
        return ChatResponse(response=response_text, provider=provider_used)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))