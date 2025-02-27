from pydantic import BaseModel

class CodeSnippet(BaseModel):
    code: str

class CodeResult(BaseModel):
    output: str

class CodeFixResult(BaseModel):
    fixed_code: str
