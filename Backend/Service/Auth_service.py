from models.user import UserCreate, UserOut, User
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from passlib.context import CryptContext
import jwt
from datetime import datetime, timedelta
from config import JWT_SECRET_KEY, JWT_ALGORITHM

# Create tables if not exist (in production use migrations)
from models.user import Base as UserBase
UserBase.metadata.create_all(bind=engine)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# For simplicity, using a database session per call. In production, use dependency injection.
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# In-memory cache is replaced by DB operations in a real app. Here we simulate a user store.
_fake_user_db = {}

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def create_user(user: UserCreate) -> UserOut:
    if user.username in _fake_user_db:
        raise Exception("User already exists")
    hashed = hash_password(user.password)
    user_obj = {"id": len(_fake_user_db) + 1, "email": user.email, "username": user.username, "hashed_password": hashed}
    _fake_user_db[user.username] = user_obj
    return UserOut(**user_obj)

def create_access_token(data: dict, expires_delta: int = 30) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=expires_delta)
    to_encode.update({"exp": expire})
    token = jwt.encode(to_encode, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)
    return token

def authenticate_user(username: str, password: str) -> str:
    user = _fake_user_db.get(username)
    if not user or not verify_password(password, user["hashed_password"]):
        return None
    return create_access_token({"sub": username})

def get_current_user(authorization: str) -> UserOut:
    if not authorization.startswith("Bearer "):
        raise Exception("Invalid token header")
    token = authorization.split(" ")[1]
    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise Exception("Invalid token payload")
    except Exception as e:
        raise Exception("Could not validate credentials")
    user = _fake_user_db.get(username)
    if user is None:
        raise Exception("User not found")
    return UserOut(**user)
