from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.models import Exchange
from app.utils.auth import verify_token

router = APIRouter(prefix="/api/exchanges", tags=["exchanges"])


class ExchangeResponse(BaseModel):
    id: int
    exchange_id: str
    name: str
    name_ar: str
    logo: str
    description: str
    short_description: str
    url: str
    affiliate_url: str
    referral_code: str
    referral_bonus: str
    rating: float
    founded: int
    headquarters: str
    trading_pairs: int
    users: str
    daily_volume: str
    maker_fee: float
    taker_fee: float
    spot_fee: str
    futures_fee: str
    deposit_fee: str
    deposit_methods: list
    security_features: list
    pros: list
    cons: list
    features: list
    supported_cryptos: int
    leverage: str
    mobile_app: bool
    margin_trading: bool
    futures: bool
    staking: bool
    nft: bool
    kyc_required: bool
    min_deposit: str
    withdrawal_fee: str
    category: str
    overall_score: int
    fees_score: int
    security_score: int
    ease_of_use_score: int
    features_score: int
    support_score: int
    is_active: bool

    class Config:
        from_attributes = True


class ExchangeCreate(BaseModel):
    exchange_id: str
    name: str
    name_ar: str = ""
    logo: str = ""
    description: str = ""
    short_description: str = ""
    url: str = ""
    affiliate_url: str = ""
    referral_code: str = ""
    referral_bonus: str = ""
    rating: float = 0
    founded: int = 0
    headquarters: str = ""
    trading_pairs: int = 0
    users: str = ""
    daily_volume: str = ""
    maker_fee: float = 0
    taker_fee: float = 0
    spot_fee: str = ""
    futures_fee: str = ""
    deposit_fee: str = "Free"
    deposit_methods: list = []
    security_features: list = []
    pros: list = []
    cons: list = []
    features: list = []
    supported_cryptos: int = 0
    leverage: str = ""
    mobile_app: bool = True
    margin_trading: bool = False
    futures: bool = False
    staking: bool = False
    nft: bool = False
    kyc_required: bool = True
    min_deposit: str = ""
    withdrawal_fee: str = ""
    category: str = "advanced"
    overall_score: int = 0
    fees_score: int = 0
    security_score: int = 0
    ease_of_use_score: int = 0
    features_score: int = 0
    support_score: int = 0


class ExchangeUpdate(BaseModel):
    name: Optional[str] = None
    name_ar: Optional[str] = None
    logo: Optional[str] = None
    description: Optional[str] = None
    short_description: Optional[str] = None
    url: Optional[str] = None
    affiliate_url: Optional[str] = None
    referral_code: Optional[str] = None
    referral_bonus: Optional[str] = None
    rating: Optional[float] = None
    founded: Optional[int] = None
    headquarters: Optional[str] = None
    trading_pairs: Optional[int] = None
    users: Optional[str] = None
    daily_volume: Optional[str] = None
    maker_fee: Optional[float] = None
    taker_fee: Optional[float] = None
    spot_fee: Optional[str] = None
    futures_fee: Optional[str] = None
    deposit_fee: Optional[str] = None
    deposit_methods: Optional[list] = None
    security_features: Optional[list] = None
    pros: Optional[list] = None
    cons: Optional[list] = None
    features: Optional[list] = None
    supported_cryptos: Optional[int] = None
    leverage: Optional[str] = None
    mobile_app: Optional[bool] = None
    margin_trading: Optional[bool] = None
    futures: Optional[bool] = None
    staking: Optional[bool] = None
    nft: Optional[bool] = None
    kyc_required: Optional[bool] = None
    min_deposit: Optional[str] = None
    withdrawal_fee: Optional[str] = None
    category: Optional[str] = None
    overall_score: Optional[int] = None
    fees_score: Optional[int] = None
    security_score: Optional[int] = None
    ease_of_use_score: Optional[int] = None
    features_score: Optional[int] = None
    support_score: Optional[int] = None
    is_active: Optional[bool] = None


# --- Public Endpoints ---

@router.get("", response_model=list[ExchangeResponse])
async def list_exchanges(db: Session = Depends(get_db)):
    """Get all active exchanges."""
    exchanges = db.query(Exchange).filter(Exchange.is_active == True).order_by(Exchange.overall_score.desc()).all()
    return exchanges


@router.get("/{exchange_id}", response_model=ExchangeResponse)
async def get_exchange(exchange_id: str, db: Session = Depends(get_db)):
    """Get a single exchange by its ID."""
    exchange = db.query(Exchange).filter(Exchange.exchange_id == exchange_id).first()
    if not exchange:
        raise HTTPException(status_code=404, detail="Exchange not found")
    return exchange


# --- Admin Endpoints ---

@router.post("/admin", response_model=ExchangeResponse)
async def admin_create_exchange(
    data: ExchangeCreate,
    _: str = Depends(verify_token),
    db: Session = Depends(get_db),
):
    """Admin: create a new exchange."""
    existing = db.query(Exchange).filter(Exchange.exchange_id == data.exchange_id).first()
    if existing:
        raise HTTPException(status_code=400, detail="Exchange ID already exists")

    exchange = Exchange(**data.model_dump())
    db.add(exchange)
    db.commit()
    db.refresh(exchange)
    return exchange


@router.put("/admin/{exchange_id}", response_model=ExchangeResponse)
async def admin_update_exchange(
    exchange_id: str,
    data: ExchangeUpdate,
    _: str = Depends(verify_token),
    db: Session = Depends(get_db),
):
    """Admin: update an exchange."""
    exchange = db.query(Exchange).filter(Exchange.exchange_id == exchange_id).first()
    if not exchange:
        raise HTTPException(status_code=404, detail="Exchange not found")

    update_data = data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(exchange, field, value)

    db.commit()
    db.refresh(exchange)
    return exchange


@router.delete("/admin/{exchange_id}")
async def admin_delete_exchange(
    exchange_id: str,
    _: str = Depends(verify_token),
    db: Session = Depends(get_db),
):
    """Admin: delete an exchange."""
    exchange = db.query(Exchange).filter(Exchange.exchange_id == exchange_id).first()
    if not exchange:
        raise HTTPException(status_code=404, detail="Exchange not found")
    db.delete(exchange)
    db.commit()
    return {"message": f"Exchange '{exchange_id}' deleted"}
