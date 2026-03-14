from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/api/calculator", tags=["calculator"])


class FeeCalculationRequest(BaseModel):
    trade_amount: float
    exchange_ids: list[str] = []
    trade_type: str = "spot"  # spot, futures
    is_maker: bool = True


class FeeResult(BaseModel):
    exchange_id: str
    exchange_name: str
    fee_rate: float
    fee_amount: float
    total_cost: float


class FeeCalculationResponse(BaseModel):
    results: list[FeeResult]
    trade_amount: float
    cheapest: str


# Exchange fee data (matches frontend data)
EXCHANGE_FEES = {
    "binance": {"name": "Binance", "maker": 0.1, "taker": 0.1, "futures_maker": 0.02, "futures_taker": 0.05},
    "bybit": {"name": "Bybit", "maker": 0.1, "taker": 0.1, "futures_maker": 0.02, "futures_taker": 0.055},
    "okx": {"name": "OKX", "maker": 0.08, "taker": 0.1, "futures_maker": 0.02, "futures_taker": 0.05},
    "bitget": {"name": "Bitget", "maker": 0.1, "taker": 0.1, "futures_maker": 0.02, "futures_taker": 0.06},
    "coinbase": {"name": "Coinbase", "maker": 0.4, "taker": 0.6, "futures_maker": 0.0, "futures_taker": 0.0},
    "kraken": {"name": "Kraken", "maker": 0.16, "taker": 0.26, "futures_maker": 0.02, "futures_taker": 0.05},
    "kucoin": {"name": "KuCoin", "maker": 0.1, "taker": 0.1, "futures_maker": 0.02, "futures_taker": 0.06},
}


@router.post("/fees", response_model=FeeCalculationResponse)
async def calculate_fees(request: FeeCalculationRequest):
    """Calculate trading fees across exchanges."""
    exchange_ids = request.exchange_ids or list(EXCHANGE_FEES.keys())
    results = []

    for eid in exchange_ids:
        if eid not in EXCHANGE_FEES:
            continue
        ex = EXCHANGE_FEES[eid]

        if request.trade_type == "futures":
            fee_rate = ex["futures_maker"] if request.is_maker else ex["futures_taker"]
        else:
            fee_rate = ex["maker"] if request.is_maker else ex["taker"]

        fee_amount = request.trade_amount * (fee_rate / 100)
        results.append(FeeResult(
            exchange_id=eid,
            exchange_name=ex["name"],
            fee_rate=fee_rate,
            fee_amount=round(fee_amount, 4),
            total_cost=round(request.trade_amount + fee_amount, 4),
        ))

    results.sort(key=lambda r: r.fee_amount)
    cheapest = results[0].exchange_id if results else ""

    return FeeCalculationResponse(
        results=results,
        trade_amount=request.trade_amount,
        cheapest=cheapest,
    )


class DCACalculationRequest(BaseModel):
    investment_amount: float  # Per period
    frequency: str = "weekly"  # daily, weekly, biweekly, monthly
    duration_months: int = 12
    coin: str = "bitcoin"


class DCACalculationResponse(BaseModel):
    total_invested: float
    num_purchases: int
    investment_per_purchase: float
    frequency: str
    duration_months: int
    coin: str


@router.post("/dca", response_model=DCACalculationResponse)
async def calculate_dca(request: DCACalculationRequest):
    """Calculate DCA strategy summary."""
    frequency_multipliers = {
        "daily": 30,
        "weekly": 4.33,
        "biweekly": 2.17,
        "monthly": 1,
    }
    purchases_per_month = frequency_multipliers.get(request.frequency, 4.33)
    total_purchases = int(purchases_per_month * request.duration_months)
    total_invested = request.investment_amount * total_purchases

    return DCACalculationResponse(
        total_invested=round(total_invested, 2),
        num_purchases=total_purchases,
        investment_per_purchase=request.investment_amount,
        frequency=request.frequency,
        duration_months=request.duration_months,
        coin=request.coin,
    )
