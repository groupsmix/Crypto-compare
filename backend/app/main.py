import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.database import init_db
from app.routers import auth, prices, blog, chatbot, exchanges, affiliates, admin, newsletter, contact, calculator, recommender, sitemap
from app.services.scheduler_service import start_scheduler, stop_scheduler

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup and shutdown events."""
    logger.info("Starting CryptoRanked API...")
    init_db()
    start_scheduler()
    logger.info("CryptoRanked API is ready")
    yield
    stop_scheduler()
    logger.info("CryptoRanked API shutdown complete")


app = FastAPI(
    title="CryptoRanked API",
    description="Backend API for CryptoRanked.xyz - AI-powered crypto exchange comparison",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS - allow frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        settings.FRONTEND_URL,
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(auth.router)
app.include_router(prices.router)
app.include_router(blog.router)
app.include_router(chatbot.router)
app.include_router(exchanges.router)
app.include_router(affiliates.router)
app.include_router(admin.router)
app.include_router(newsletter.router)
app.include_router(contact.router)
app.include_router(calculator.router)
app.include_router(recommender.router)
app.include_router(sitemap.router)


@app.get("/")
async def root():
    return {
        "name": "CryptoRanked API",
        "version": "1.0.0",
        "status": "running",
        "docs": "/docs",
    }


@app.get("/health")
async def health():
    return {"status": "healthy"}


@app.get("/api/status")
async def status():
    """System status for exchange health dashboard."""
    from app.database import SessionLocal
    from app.models.models import CryptoPrice, Exchange, BlogPost
    db = SessionLocal()
    try:
        exchange_count = db.query(Exchange).filter(Exchange.is_active == True).count()
        price_count = db.query(CryptoPrice).count()
        blog_count = db.query(BlogPost).filter(BlogPost.is_published == True).count()
        return {
            "status": "operational",
            "services": {
                "api": "healthy",
                "database": "connected",
                "price_feed": "active" if price_count > 0 else "no_data",
            },
            "stats": {
                "exchanges": exchange_count,
                "tracked_coins": price_count,
                "blog_posts": blog_count,
            },
        }
    finally:
        db.close()
