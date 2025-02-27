from fastapi import APIRouter, HTTPException
from models.code import CodeSnippet, CodeFixResult
from services.ai_service import fix_code

router = APIRouter()

@router.post("/fix", response_model=CodeFixResult)
def fix_code_endpoint(snippet: CodeSnippet):
    try:
        fixed = fix_code(snippet.code)
        return CodeFixResult(fixed_code=fixed)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
