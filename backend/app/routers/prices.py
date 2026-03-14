from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.services.price_service import get_cached_prices, get_prices_from_db, update_prices

router = APIRouter(prefix="/api/prices", tags=["prices"])


@router.get("")
async def get_prices(db: Session = Depends(get_db)):
    """Get current crypto prices (from cache or database)."""
    cached = get_cached_prices()
    if cached:
        return {"prices": cached, "source": "cache"}
    db_prices = get_prices_from_db(db)
    if db_prices:
        return {"prices": db_prices, "source": "database"}
    # If no data, fetch fresh
    fresh = await update_prices(db)
    return {"prices": fresh, "source": "fresh"}


@router.post("/refresh")
async def refresh_prices(db: Session = Depends(get_db)):
    """Force refresh prices from CoinGecko."""
    prices = await update_prices(db)
    return {"prices": prices, "count": len(prices)}
