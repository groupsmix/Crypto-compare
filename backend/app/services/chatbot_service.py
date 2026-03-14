import logging
from typing import Optional

from sqlalchemy.orm import Session

from app.config import settings
from app.models.models import ChatMessage, Exchange, BlogPost

logger = logging.getLogger(__name__)

SYSTEM_PROMPT = """You are CryptoRanked AI Assistant - a helpful, knowledgeable chatbot for CryptoRanked.xyz, 
a cryptocurrency exchange comparison website.

YOUR KNOWLEDGE BASE:
- You know everything about the major crypto exchanges: Binance, Bybit, OKX, Coinbase, Kraken, KuCoin, and Bitget
- You can compare exchange fees, features, security, and suitability for different user types
- You understand crypto trading concepts: spot, futures, margin, staking, DCA, copy trading
- You can recommend exchanges based on user needs (beginner vs advanced, region, features needed)
- You know about crypto security best practices

EXCHANGE DATA (use this for accurate comparisons):
{exchange_context}

RECENT BLOG POSTS (reference these when relevant):
{blog_context}

RULES:
- Be friendly, concise, and helpful
- Always recommend exchanges with affiliate links when relevant: suggest users "check out [Exchange Name] on our site"
- If asked about something outside crypto/exchanges, politely redirect to crypto topics
- Give specific, actionable advice - not vague generalities
- When comparing exchanges, mention real fees and features
- If unsure about specific data, say so rather than making things up
- Keep responses under 300 words unless the user asks for detailed analysis
- Format responses in markdown for readability
"""


def _build_exchange_context(db: Session) -> str:
    """Build context string from exchange data."""
    exchanges = db.query(Exchange).filter(Exchange.is_active == True).all()
    if not exchanges:
        return """
- Binance: #1 rated, 0.1% fees, 350+ coins, 125x leverage, best for advanced traders
- Bybit: #2 rated, 0.1% fees, 300+ coins, 100x leverage, best for derivatives
- OKX: 0.08% maker fees, 300+ coins, Web3 wallet, great for DeFi
- Coinbase: 0.4% fees, most regulated, best for US beginners
- Kraken: 0.16% fees, never hacked, proof of reserves, best security
- KuCoin: 0.1% fees, 700+ coins, best for altcoins
- Bitget: 0.1% fees, best copy trading platform
"""
    context_lines = []
    for ex in exchanges:
        context_lines.append(
            f"- {ex.name}: Score {ex.overall_score}/100, {ex.maker_fee}% maker fee, "
            f"{ex.supported_cryptos}+ coins, {ex.leverage} leverage, {ex.short_description}"
        )
    return "\n".join(context_lines)


def _build_blog_context(db: Session) -> str:
    """Build context from recent blog posts."""
    posts = db.query(BlogPost).filter(
        BlogPost.is_published == True
    ).order_by(BlogPost.created_at.desc()).limit(5).all()
    if not posts:
        return "No recent blog posts available."
    return "\n".join(
        f"- [{p.title}](/blog/{p.slug}): {p.excerpt}" for p in posts
    )


async def chat_with_ai(
    db: Session,
    session_id: str,
    user_message: str,
) -> str:
    """Process a chat message and return AI response."""
    try:
        import google.generativeai as genai

        if not settings.GEMINI_API_KEY:
            return "AI chatbot is not configured yet. Please set up the GEMINI_API_KEY in the backend .env file."

        genai.configure(api_key=settings.GEMINI_API_KEY)
        model = genai.GenerativeModel("gemini-1.5-flash")

        # Save user message
        db.add(ChatMessage(session_id=session_id, role="user", content=user_message))
        db.commit()

        # Get chat history for context
        history = (
            db.query(ChatMessage)
            .filter(ChatMessage.session_id == session_id)
            .order_by(ChatMessage.created_at.desc())
            .limit(10)
            .all()
        )
        history.reverse()

        # Build system prompt with site context
        exchange_context = _build_exchange_context(db)
        blog_context = _build_blog_context(db)
        system = SYSTEM_PROMPT.format(
            exchange_context=exchange_context,
            blog_context=blog_context,
        )

        # Build conversation
        conversation = [system + "\n\nConversation:"]
        for msg in history:
            role = "User" if msg.role == "user" else "Assistant"
            conversation.append(f"{role}: {msg.content}")
        conversation.append("Assistant:")

        prompt = "\n".join(conversation)
        response = model.generate_content(prompt)
        ai_response = response.text.strip()

        # Save assistant response
        db.add(ChatMessage(session_id=session_id, role="assistant", content=ai_response))
        db.commit()

        return ai_response
    except Exception as e:
        logger.error(f"Chatbot error: {e}")
        return "Sorry, I'm having trouble right now. Please try again in a moment. If you need exchange comparisons, check out our [Compare page](/compare)!"


def get_chat_history(db: Session, session_id: str) -> list[dict]:
    """Get chat history for a session."""
    messages = (
        db.query(ChatMessage)
        .filter(ChatMessage.session_id == session_id)
        .order_by(ChatMessage.created_at.asc())
        .all()
    )
    return [
        {"role": msg.role, "content": msg.content, "created_at": msg.created_at.isoformat()}
        for msg in messages
    ]
