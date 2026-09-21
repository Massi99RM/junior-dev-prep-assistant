import json
from pathlib import Path
from backend.schemas.schemas import CategoryResponse

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_FILE = BASE_DIR / "data" / "swe.json"

def get_swe_topics() -> CategoryResponse:
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        data = json.load(f)
    return CategoryResponse(**data)