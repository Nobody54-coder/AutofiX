from fastapi import APIRouter, HTTPException, Depends
from models.user import UserCreate, UserOut
from services.auth_service import create_user, authenticate_user, get_current_user
from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter()

@router.post("/signup", response_model=UserOut)
def signup(user: UserCreate):
    try:
        new_user = create_user(user)
        return new_user
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    token = authenticate_user(form_data.username, form_data.password)
    if not token:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"access_token": token, "token_type": "bearer"}

@router.get("/me", response_model=UserOut)
def read_current_user(current_user: UserOut = Depends(get_current_user)):
    return current_user
