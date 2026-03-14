from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.models import BlogPost, Exchange, Affiliate, CryptoPrice, ChatMessage
from app.utils.auth import verify_token

router = APIRouter(prefix="/api/admin", tags=["admin"])


class DashboardStats(BaseModel):
    total_blog_posts: int
    published_posts: int
    ai_generated_posts: int
    total_exchanges: int
    active_exchanges: int
    total_affiliates: int
    total_affiliate_clicks: int
    tracked_coins: int
    total_chat_sessions: int


@router.get("/dashboard", response_model=DashboardStats)
async def get_dashboard(
    _: str = Depends(verify_token),
    db: Session = Depends(get_db),
):
    """Admin dashboard with site statistics."""
    total_posts = db.query(BlogPost).count()
    published_posts = db.query(BlogPost).filter(BlogPost.is_published == True).count()
    ai_posts = db.query(BlogPost).filter(BlogPost.is_ai_generated == True).count()
    total_exchanges = db.query(Exchange).count()
    active_exchanges = db.query(Exchange).filter(Exchange.is_active == True).count()
    total_affiliates = db.query(Affiliate).count()

    from sqlalchemy import func
    total_clicks = db.query(func.sum(Affiliate.clicks)).scalar() or 0
    tracked_coins = db.query(CryptoPrice).count()
    chat_sessions = db.query(ChatMessage.session_id).distinct().count()

    return DashboardStats(
        total_blog_posts=total_posts,
        published_posts=published_posts,
        ai_generated_posts=ai_posts,
        total_exchanges=total_exchanges,
        active_exchanges=active_exchanges,
        total_affiliates=total_affiliates,
        total_affiliate_clicks=total_clicks,
        tracked_coins=tracked_coins,
        total_chat_sessions=chat_sessions,
    )


class SettingUpdate(BaseModel):
    key: str
    value: str


@router.post("/settings")
async def update_setting(
    data: SettingUpdate,
    _: str = Depends(verify_token),
    db: Session = Depends(get_db),
):
    """Admin: update a site setting."""
    from app.models.models import SiteSettings
    existing = db.query(SiteSettings).filter(SiteSettings.key == data.key).first()
    if existing:
        existing.value = data.value
    else:
        setting = SiteSettings(key=data.key, value=data.value)
        db.add(setting)
    db.commit()
    return {"key": data.key, "value": data.value}


@router.get("/settings")
async def get_settings(
    _: str = Depends(verify_token),
    db: Session = Depends(get_db),
):
    """Admin: get all site settings."""
    from app.models.models import SiteSettings
    settings_list = db.query(SiteSettings).all()
    return {s.key: s.value for s in settings_list}
