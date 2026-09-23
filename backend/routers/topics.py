from fastapi import APIRouter
from backend.schemas.schemas import CategoryResponse
from backend.services.topic_service import get_swe_topics

router = APIRouter(prefix="/api/topics", tags=["Topics"])

@router.get("", response_model=CategoryResponse)
def get_topics():
    return get_swe_topics()