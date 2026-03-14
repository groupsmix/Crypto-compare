import json
import logging
import re
import random
from datetime import datetime

from sqlalchemy.orm import Session

from app.config import settings
from app.models.models import BlogPost

logger = logging.getLogger(__name__)

# Crypto niche topics for blog generation
BLOG_TOPICS = [
    "Best crypto exchanges for beginners in {year}",
    "How to reduce crypto trading fees: Expert tips for {year}",
    "Crypto security: Protecting your digital assets in {year}",
    "DeFi vs CeFi: Which is better for crypto trading in {year}?",
    "Top crypto staking platforms and APY rates in {year}",
    "How to use crypto trading bots effectively",
    "Bitcoin price analysis: What to expect in {year}",
    "Ethereum vs Solana: Which blockchain is better in {year}?",
    "Crypto copy trading: A complete guide for passive income",
    "Best crypto wallets for security in {year}",
    "How to do dollar-cost averaging (DCA) in crypto",
    "Crypto tax guide: What you need to know in {year}",
    "NFT market trends and opportunities in {year}",
    "Layer 2 solutions: Reducing crypto transaction fees",
    "How to spot crypto scams and protect yourself",
    "Margin trading vs spot trading: Which is right for you?",
    "Best crypto exchanges for futures trading in {year}",
    "How to build a diversified crypto portfolio",
    "Crypto regulation updates and what they mean for traders",
    "Passive income strategies in crypto for {year}",
    "KYC vs no-KYC exchanges: Privacy and compliance",
    "How to choose the safest crypto exchange",
    "Crypto market cycles: Understanding bull and bear markets",
    "Top altcoins to watch in {year}",
    "Web3 wallets explained: OKX, MetaMask, and more",
    "Crypto lending platforms: Earn interest on your holdings",
    "How to read crypto charts for beginners",
    "Best mobile apps for crypto trading in {year}",
    "Crypto exchange fees compared: Binance vs Bybit vs OKX",
    "Understanding crypto liquidity and why it matters",
]

# Writing style variations for humanization
WRITING_STYLES = [
    "Write in a conversational, friendly tone as if explaining to a friend over coffee.",
    "Write in an authoritative, expert tone with data-driven insights.",
    "Write in a balanced, analytical tone that weighs pros and cons carefully.",
    "Write with enthusiasm and excitement, highlighting opportunities.",
    "Write in a practical, step-by-step tutorial style focused on actionable advice.",
]

# Personal phrases for humanization
HUMANIZATION_INSTRUCTIONS = """
CRITICAL HUMANIZATION RULES:
- Use varied sentence lengths. Mix short punchy sentences with longer explanatory ones.
- Include personal opinions like "In my experience..." or "I've found that..." or "What really stands out is..."
- Add natural transitions like "Here's the thing though..." or "Now, this is where it gets interesting..."
- Use occasional rhetorical questions like "But is that really the best approach?"
- Include specific examples with numbers and real exchange names
- Add slight imperfections - use em dashes, parenthetical asides (like this), and conversational interjections
- Reference recent events or trends naturally
- Don't use bullet points for everything - use flowing paragraphs mixed with lists
- Avoid AI-typical phrases: "In today's digital landscape", "It's important to note", "In conclusion", "Let's dive in", "navigating the world of"
- NEVER start with a generic introduction. Start with a hook, anecdote, or surprising fact.
- End with a genuine recommendation, not a generic summary.
"""


def _build_blog_prompt(topic: str) -> str:
    """Build the AI prompt for blog generation."""
    style = random.choice(WRITING_STYLES)
    year = datetime.now().year

    return f"""You are a crypto trading expert writing a blog post for CryptoRanked.xyz, 
a cryptocurrency exchange comparison website. 

TOPIC: {topic.format(year=year)}

WRITING STYLE: {style}

{HUMANIZATION_INSTRUCTIONS}

STRUCTURE REQUIREMENTS:
- Title: Create an SEO-optimized, click-worthy title (not the exact topic - make it more engaging)
- Meta Description: 150-160 character description for SEO
- Content: 1200-1800 words, using markdown with ## and ### headings
- Include 3-5 internal link references to exchanges like Binance, Bybit, OKX, Coinbase, Kraken, KuCoin, Bitget
- Include relevant keywords naturally throughout
- Add a compelling introduction that hooks the reader
- Include practical, actionable advice
- Reference real data points and statistics

OUTPUT FORMAT (respond in valid JSON only):
{{
  "title": "Your SEO-optimized title here",
  "excerpt": "A compelling 1-2 sentence excerpt/summary",
  "content": "Full markdown content of the blog post",
  "category": "One of: Guides, Education, Market Analysis, Security, Tools, News",
  "tags": ["tag1", "tag2", "tag3", "tag4"],
  "meta_description": "150-160 char SEO meta description",
  "read_time": estimated_minutes_as_number
}}
"""


async def generate_blog_post_with_gemini(topic: str = "") -> dict:
    """Generate a humanized blog post using Google Gemini."""
    try:
        import google.generativeai as genai

        if not settings.GEMINI_API_KEY:
            logger.warning("GEMINI_API_KEY not set, cannot generate blog post")
            return {}

        genai.configure(api_key=settings.GEMINI_API_KEY)
        model = genai.GenerativeModel("gemini-1.5-flash")

        if not topic:
            topic = random.choice(BLOG_TOPICS)

        prompt = _build_blog_prompt(topic)
        response = model.generate_content(prompt)
        text = response.text.strip()

        # Extract JSON from response (handle markdown code blocks)
        if "```json" in text:
            text = text.split("```json")[1].split("```")[0].strip()
        elif "```" in text:
            text = text.split("```")[1].split("```")[0].strip()

        blog_data = json.loads(text)
        return blog_data
    except json.JSONDecodeError as e:
        logger.error(f"Failed to parse Gemini response as JSON: {e}")
        return {}
    except Exception as e:
        logger.error(f"Gemini blog generation failed: {e}")
        return {}


def _slugify(title: str) -> str:
    """Convert title to URL-friendly slug."""
    slug = title.lower().strip()
    slug = re.sub(r"[^\w\s-]", "", slug)
    slug = re.sub(r"[-\s]+", "-", slug)
    slug = slug.strip("-")
    return slug


async def create_ai_blog_post(db: Session, topic: str = "") -> BlogPost:
    """Generate and save an AI blog post."""
    blog_data = await generate_blog_post_with_gemini(topic)
    if not blog_data:
        raise ValueError("Failed to generate blog content")

    title = blog_data.get("title", "Untitled")
    slug = _slugify(title)

    # Check for duplicate slug
    existing = db.query(BlogPost).filter(BlogPost.slug == slug).first()
    if existing:
        slug = f"{slug}-{int(datetime.utcnow().timestamp())}"

    today = datetime.utcnow().strftime("%Y-%m-%d")

    post = BlogPost(
        slug=slug,
        title=title,
        excerpt=blog_data.get("excerpt", ""),
        content=blog_data.get("content", ""),
        category=blog_data.get("category", "Guides"),
        author="CryptoRanked",
        date=today,
        read_time=blog_data.get("read_time", 5),
        image=f"https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800",
        tags=blog_data.get("tags", []),
        meta_description=blog_data.get("meta_description", ""),
        is_published=True,
        is_ai_generated=True,
    )
    db.add(post)
    db.commit()
    db.refresh(post)
    logger.info(f"Created AI blog post: {title}")
    return post


def get_all_blog_posts(db: Session, published_only: bool = True) -> list[BlogPost]:
    """Get all blog posts, optionally filtered by published status."""
    query = db.query(BlogPost)
    if published_only:
        query = query.filter(BlogPost.is_published == True)
    return query.order_by(BlogPost.created_at.desc()).all()


def get_blog_post_by_slug(db: Session, slug: str) -> BlogPost:
    """Get a single blog post by slug."""
    return db.query(BlogPost).filter(BlogPost.slug == slug).first()
