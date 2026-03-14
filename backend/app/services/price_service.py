import logging
from datetime import datetime
from typing import Optional

import httpx
from sqlalchemy.orm import Session

from app.config import settings
from app.models.models import CryptoPrice

logger = logging.getLogger(__name__)

# In-memory cache for fast access
_price_cache: list[dict] = []
_cache_updated_at: Optional[datetime] = None


async def fetch_prices_from_coingecko() -> list[dict]:
    """Fetch top 20 crypto prices from CoinGecko free API."""
    url = f"{settings.COINGECKO_BASE_URL}/coins/markets"
    params = {
        "vs_currency": "usd",
        "order": "market_cap_desc",
        "per_page": 20,
        "page": 1,
        "sparkline": "false",
        "price_change_percentage": "24h",
    }
    async with httpx.AsyncClient(timeout=15.0) as client:
        response = await client.get(url, params=params)
        response.raise_for_status()
        return response.json()


async def update_prices(db: Session) -> list[dict]:
    """Fetch latest prices and update database + cache."""
    global _price_cache, _cache_updated_at
    try:
        coins = await fetch_prices_from_coingecko()
        result = []
        for coin in coins:
            price_data = {
                "coin_id": coin["id"],
                "symbol": coin["symbol"],
                "name": coin["name"],
                "current_price": coin.get("current_price", 0),
                "price_change_24h": coin.get("price_change_percentage_24h", 0) or 0,
                "market_cap": coin.get("market_cap", 0) or 0,
                "image": coin.get("image", ""),
            }
            # Upsert in database
            existing = db.query(CryptoPrice).filter(CryptoPrice.coin_id == coin["id"]).first()
            if existing:
                for key, value in price_data.items():
                    setattr(existing, key, value)
                existing.last_updated = datetime.utcnow()
            else:
                db_price = CryptoPrice(**price_data)
                db.add(db_price)
            result.append(price_data)

        db.commit()
        _price_cache = result
        _cache_updated_at = datetime.utcnow()
        logger.info(f"Updated {len(result)} crypto prices")
        return result
    except Exception as e:
        logger.error(f"Failed to fetch prices: {e}")
        db.rollback()
        return _price_cache


def get_cached_prices() -> list[dict]:
    """Return cached prices for fast API response."""
    return _price_cache


def get_prices_from_db(db: Session) -> list[dict]:
    """Get prices from database as fallback."""
    prices = db.query(CryptoPrice).order_by(CryptoPrice.market_cap.desc()).all()
    return [
        {
            "id": p.coin_id,
            "symbol": p.symbol,
            "name": p.name,
            "current_price": p.current_price,
            "price_change_percentage_24h": p.price_change_24h,
            "market_cap": p.market_cap,
            "image": p.image,
        }
        for p in prices
    ]
