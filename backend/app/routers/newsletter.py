from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.models import NewsletterSubscriber
from app.utils.auth import verify_token

router = APIRouter(prefix="/api/newsletter", tags=["newsletter"])


class SubscribeRequest(BaseModel):
    email: str


class SubscribeResponse(BaseModel):
    message: str
    subscribed: bool


@router.post("/subscribe", response_model=SubscribeResponse)
async def subscribe(request: SubscribeRequest, db: Session = Depends(get_db)):
    """Subscribe to the newsletter."""
    email = request.email.strip().lower()
    if not email or "@" not in email:
        raise HTTPException(status_code=400, detail="Invalid email address")

    existing = db.query(NewsletterSubscriber).filter(
        NewsletterSubscriber.email == email
    ).first()

    if existing:
        if existing.is_subscribed:
            return SubscribeResponse(message="Already subscribed", subscribed=True)
        existing.is_subscribed = True
        existing.unsubscribed_at = None
        existing.subscribed_at = datetime.utcnow()
        db.commit()
        return SubscribeResponse(message="Re-subscribed successfully", subscribed=True)

    subscriber = NewsletterSubscriber(email=email)
    db.add(subscriber)
    db.commit()
    return SubscribeResponse(message="Subscribed successfully", subscribed=True)


@router.post("/unsubscribe", response_model=SubscribeResponse)
async def unsubscribe(request: SubscribeRequest, db: Session = Depends(get_db)):
    """Unsubscribe from the newsletter."""
    email = request.email.strip().lower()
    existing = db.query(NewsletterSubscriber).filter(
        NewsletterSubscriber.email == email
    ).first()

    if not existing or not existing.is_subscribed:
        return SubscribeResponse(message="Not subscribed", subscribed=False)

    existing.is_subscribed = False
    existing.unsubscribed_at = datetime.utcnow()
    db.commit()
    return SubscribeResponse(message="Unsubscribed successfully", subscribed=False)


@router.get("/subscribers/count")
async def subscriber_count(
    _: str = Depends(verify_token),
    db: Session = Depends(get_db),
):
    """Admin: get subscriber count."""
    total = db.query(NewsletterSubscriber).filter(
        NewsletterSubscriber.is_subscribed == True
    ).count()
    return {"count": total}
