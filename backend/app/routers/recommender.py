from fastapi import APIRouter, Depends, Request
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.models import QuizResult

router = APIRouter(prefix="/api/recommender", tags=["recommender"])


class QuizAnswer(BaseModel):
    question_id: str
    answer: str


class QuizSubmission(BaseModel):
    answers: list[QuizAnswer]


class ExchangeRecommendation(BaseModel):
    exchange_id: str
    name: str
    score: int
    reason: str


class QuizResultResponse(BaseModel):
    recommendations: list[ExchangeRecommendation]
    result_id: int


# Scoring logic based on quiz answers
EXCHANGE_PROFILES = {
    "binance": {
        "name": "Binance",
        "strengths": ["advanced", "low_fees", "many_coins", "futures", "staking", "high_volume"],
    },
    "bybit": {
        "name": "Bybit",
        "strengths": ["advanced", "derivatives", "copy_trading", "fast_execution", "futures"],
    },
    "okx": {
        "name": "OKX",
        "strengths": ["advanced", "web3", "defi", "low_fees", "futures", "innovative"],
    },
    "bitget": {
        "name": "Bitget",
        "strengths": ["beginner", "copy_trading", "mobile", "low_fees", "futures"],
    },
    "coinbase": {
        "name": "Coinbase",
        "strengths": ["beginner", "regulated", "us_friendly", "secure", "simple"],
    },
    "kraken": {
        "name": "Kraken",
        "strengths": ["security", "regulated", "proof_of_reserves", "professional", "staking"],
    },
    "kucoin": {
        "name": "KuCoin",
        "strengths": ["altcoins", "trading_bots", "low_fees", "many_coins", "no_kyc"],
    },
}

# Maps answer values to exchange preference tags
ANSWER_TAG_MAP = {
    "beginner": ["beginner", "simple", "regulated"],
    "intermediate": ["low_fees", "many_coins", "staking"],
    "advanced": ["advanced", "futures", "derivatives", "high_volume"],
    "professional": ["professional", "advanced", "futures", "high_volume"],
    "low_fees": ["low_fees"],
    "security": ["security", "secure", "regulated", "proof_of_reserves"],
    "many_coins": ["many_coins", "altcoins"],
    "ease_of_use": ["beginner", "simple", "mobile"],
    "futures_trading": ["futures", "derivatives"],
    "copy_trading": ["copy_trading"],
    "staking": ["staking"],
    "defi": ["defi", "web3"],
    "usa": ["us_friendly", "regulated"],
    "uae": ["low_fees", "futures"],
    "europe": ["regulated", "low_fees"],
    "asia": ["many_coins", "low_fees", "futures"],
    "global": ["low_fees", "many_coins"],
    "small": ["beginner", "simple", "low_fees"],
    "medium": ["low_fees", "many_coins"],
    "large": ["advanced", "high_volume", "futures"],
    "spot": ["low_fees", "many_coins"],
    "futures": ["futures", "derivatives"],
    "both": ["futures", "low_fees", "many_coins"],
    "yes_kyc": ["regulated"],
    "no_kyc": ["no_kyc"],
}


def score_exchanges(answers: list[QuizAnswer]) -> list[ExchangeRecommendation]:
    """Score exchanges based on quiz answers."""
    scores: dict[str, int] = {eid: 0 for eid in EXCHANGE_PROFILES}

    # Collect all preference tags from answers
    user_tags: list[str] = []
    for answer in answers:
        tags = ANSWER_TAG_MAP.get(answer.answer, [])
        user_tags.extend(tags)

    # Score each exchange based on matching strengths
    for eid, profile in EXCHANGE_PROFILES.items():
        for tag in user_tags:
            if tag in profile["strengths"]:
                scores[eid] += 15

    # Normalize scores to 0-100
    max_score = max(scores.values()) if scores else 1
    if max_score == 0:
        max_score = 1

    recommendations = []
    for eid, raw_score in sorted(scores.items(), key=lambda x: x[1], reverse=True):
        normalized = min(100, int((raw_score / max_score) * 100))
        profile = EXCHANGE_PROFILES[eid]
        matching = [t for t in user_tags if t in profile["strengths"]]
        reason = f"Matches your preferences: {', '.join(set(matching)[:3])}" if matching else "General-purpose exchange"
        recommendations.append(ExchangeRecommendation(
            exchange_id=eid,
            name=profile["name"],
            score=normalized,
            reason=reason,
        ))

    return recommendations[:5]


@router.post("/quiz", response_model=QuizResultResponse)
async def submit_quiz(
    submission: QuizSubmission,
    request: Request,
    db: Session = Depends(get_db),
):
    """Submit quiz answers and get exchange recommendations."""
    recommendations = score_exchanges(submission.answers)

    # Save results
    client_ip = request.client.host if request.client else ""
    result = QuizResult(
        answers=[a.model_dump() for a in submission.answers],
        recommendations=[r.model_dump() for r in recommendations],
        ip_address=client_ip,
    )
    db.add(result)
    db.commit()
    db.refresh(result)

    return QuizResultResponse(
        recommendations=recommendations,
        result_id=result.id,
    )


@router.get("/results/{result_id}")
async def get_result(result_id: int, db: Session = Depends(get_db)):
    """Retrieve saved quiz results."""
    result = db.query(QuizResult).filter(QuizResult.id == result_id).first()
    if not result:
        return {"error": "Result not found"}
    return {
        "id": result.id,
        "answers": result.answers,
        "recommendations": result.recommendations,
        "created_at": result.created_at.isoformat() if result.created_at else None,
    }
