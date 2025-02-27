from fastapi import APIRouter, HTTPException
from models.code import CodeSnippet, CodeResult
from services.code_service import execute_code

router = APIRouter()

@router.post("/run", response_model=CodeResult)
def run_code(snippet: CodeSnippet):
    try:
        output = execute_code(snippet.code)
        return CodeResult(output=output)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
