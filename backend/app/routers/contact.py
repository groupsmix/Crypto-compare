from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.models import ContactMessage
from app.utils.auth import verify_token

router = APIRouter(prefix="/api/contact", tags=["contact"])


class ContactRequest(BaseModel):
    name: str
    email: str
    subject: str = ""
    message: str


class ContactResponse(BaseModel):
    message: str
    success: bool


@router.post("/submit", response_model=ContactResponse)
async def submit_contact(request: ContactRequest, db: Session = Depends(get_db)):
    """Submit a contact form message."""
    if not request.name.strip():
        raise HTTPException(status_code=400, detail="Name is required")
    if not request.email.strip() or "@" not in request.email:
        raise HTTPException(status_code=400, detail="Valid email is required")
    if not request.message.strip():
        raise HTTPException(status_code=400, detail="Message is required")

    contact = ContactMessage(
        name=request.name.strip(),
        email=request.email.strip().lower(),
        subject=request.subject.strip(),
        message=request.message.strip(),
    )
    db.add(contact)
    db.commit()
    return ContactResponse(
        message="Thank you! Your message has been received.",
        success=True,
    )


@router.get("/messages")
async def list_messages(
    _: str = Depends(verify_token),
    db: Session = Depends(get_db),
):
    """Admin: list all contact messages."""
    messages = db.query(ContactMessage).order_by(
        ContactMessage.created_at.desc()
    ).all()
    return [
        {
            "id": m.id,
            "name": m.name,
            "email": m.email,
            "subject": m.subject,
            "message": m.message,
            "is_read": m.is_read,
            "created_at": m.created_at.isoformat() if m.created_at else None,
        }
        for m in messages
    ]
