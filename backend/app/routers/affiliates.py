from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.models import Affiliate
from app.utils.auth import verify_token

router = APIRouter(prefix="/api/affiliates", tags=["affiliates"])


class AffiliateResponse(BaseModel):
    id: int
    exchange_id: str
    name: str
    referral_url: str
    referral_code: str
    commission_rate: str
    is_active: bool
    clicks: int

    class Config:
        from_attributes = True


class AffiliateCreate(BaseModel):
    exchange_id: str
    name: str
    referral_url: str
    referral_code: str = ""
    commission_rate: str = ""


class AffiliateUpdate(BaseModel):
    name: Optional[str] = None
    referral_url: Optional[str] = None
    referral_code: Optional[str] = None
    commission_rate: Optional[str] = None
    is_active: Optional[bool] = None


# --- Public Endpoints ---

@router.get("", response_model=list[AffiliateResponse])
async def list_affiliates(db: Session = Depends(get_db)):
    """Get all active affiliate links."""
    return db.query(Affiliate).filter(Affiliate.is_active == True).all()


@router.post("/click/{exchange_id}")
async def track_click(exchange_id: str, db: Session = Depends(get_db)):
    """Track an affiliate link click."""
    affiliate = db.query(Affiliate).filter(Affiliate.exchange_id == exchange_id).first()
    if affiliate:
        affiliate.clicks += 1
        db.commit()
    return {"tracked": True}


# --- Admin Endpoints ---

@router.get("/admin", response_model=list[AffiliateResponse])
async def admin_list_affiliates(
    _: str = Depends(verify_token),
    db: Session = Depends(get_db),
):
    """Admin: list all affiliates including inactive."""
    return db.query(Affiliate).all()


@router.post("/admin", response_model=AffiliateResponse)
async def admin_create_affiliate(
    data: AffiliateCreate,
    _: str = Depends(verify_token),
    db: Session = Depends(get_db),
):
    """Admin: create a new affiliate."""
    existing = db.query(Affiliate).filter(Affiliate.exchange_id == data.exchange_id).first()
    if existing:
        raise HTTPException(status_code=400, detail="Affiliate already exists for this exchange")

    affiliate = Affiliate(**data.model_dump())
    db.add(affiliate)
    db.commit()
    db.refresh(affiliate)
    return affiliate


@router.put("/admin/{affiliate_id}", response_model=AffiliateResponse)
async def admin_update_affiliate(
    affiliate_id: int,
    data: AffiliateUpdate,
    _: str = Depends(verify_token),
    db: Session = Depends(get_db),
):
    """Admin: update an affiliate."""
    affiliate = db.query(Affiliate).filter(Affiliate.id == affiliate_id).first()
    if not affiliate:
        raise HTTPException(status_code=404, detail="Affiliate not found")

    update_data = data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(affiliate, field, value)

    db.commit()
    db.refresh(affiliate)
    return affiliate


@router.delete("/admin/{affiliate_id}")
async def admin_delete_affiliate(
    affiliate_id: int,
    _: str = Depends(verify_token),
    db: Session = Depends(get_db),
):
    """Admin: delete an affiliate."""
    affiliate = db.query(Affiliate).filter(Affiliate.id == affiliate_id).first()
    if not affiliate:
        raise HTTPException(status_code=404, detail="Affiliate not found")
    db.delete(affiliate)
    db.commit()
    return {"message": "Affiliate deleted"}
