import uuid

from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import get_db
from app.services.chatbot_service import chat_with_ai, get_chat_history

router = APIRouter(prefix="/api/chat", tags=["chatbot"])


class ChatRequest(BaseModel):
    message: str
    session_id: str = ""


class ChatResponse(BaseModel):
    response: str
    session_id: str


@router.post("", response_model=ChatResponse)
async def chat(request: ChatRequest, db: Session = Depends(get_db)):
    """Send a message to the AI chatbot."""
    session_id = request.session_id or str(uuid.uuid4())
    response = await chat_with_ai(db, session_id, request.message)
    return ChatResponse(response=response, session_id=session_id)


@router.get("/history/{session_id}")
async def history(session_id: str, db: Session = Depends(get_db)):
    """Get chat history for a session."""
    messages = get_chat_history(db, session_id)
    return {"session_id": session_id, "messages": messages}
