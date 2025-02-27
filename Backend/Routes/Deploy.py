from fastapi import APIRouter, HTTPException
from services.deploy_service import trigger_deployment

router = APIRouter()

@router.post("/")
def deploy():
    try:
        message = trigger_deployment()
        return {"message": message}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
