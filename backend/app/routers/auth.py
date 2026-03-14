from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel

from app.config import settings
from app.utils.auth import create_access_token, get_password_hash, verify_password

router = APIRouter(prefix="/api/auth", tags=["auth"])

# Store hashed password at startup
_hashed_password = get_password_hash(settings.ADMIN_PASSWORD)


class LoginRequest(BaseModel):
    username: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


@router.post("/login", response_model=TokenResponse)
async def login(request: LoginRequest):
    """Admin login endpoint."""
    if request.username != settings.ADMIN_USERNAME:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
        )
    if not verify_password(request.password, _hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
        )
    token = create_access_token(data={"sub": request.username})
    return TokenResponse(access_token=token)


@router.get("/me")
async def get_me():
    """Check if authenticated (token verified by dependency)."""
    return {"username": settings.ADMIN_USERNAME, "role": "admin"}
