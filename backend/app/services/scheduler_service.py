import logging
import asyncio
from datetime import datetime

from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.cron import CronTrigger
from apscheduler.triggers.interval import IntervalTrigger

from app.config import settings
from app.database import SessionLocal
from app.services.price_service import update_prices
from app.services.blog_service import create_ai_blog_post

logger = logging.getLogger(__name__)

scheduler = AsyncIOScheduler()


async def scheduled_price_update():
    """Background job: update crypto prices."""
    db = SessionLocal()
    try:
        await update_prices(db)
        logger.info(f"Scheduled price update completed at {datetime.utcnow()}")
    except Exception as e:
        logger.error(f"Scheduled price update failed: {e}")
    finally:
        db.close()


async def scheduled_blog_generation():
    """Background job: generate and publish AI blog post."""
    db = SessionLocal()
    try:
        post = await create_ai_blog_post(db)
        logger.info(f"Scheduled blog post created: {post.title}")
    except Exception as e:
        logger.error(f"Scheduled blog generation failed: {e}")
    finally:
        db.close()


def start_scheduler():
    """Initialize and start the background scheduler."""
    # Price updates every 60 seconds
    scheduler.add_job(
        scheduled_price_update,
        trigger=IntervalTrigger(seconds=settings.PRICE_UPDATE_INTERVAL),
        id="price_update",
        name="Update crypto prices",
        replace_existing=True,
    )

    # Blog generation on schedule (default: Monday 9 AM UTC)
    scheduler.add_job(
        scheduled_blog_generation,
        trigger=CronTrigger(
            day_of_week=settings.BLOG_CRON_DAY_OF_WEEK,
            hour=settings.BLOG_CRON_HOUR,
            minute=settings.BLOG_CRON_MINUTE,
        ),
        id="blog_generation",
        name="Generate AI blog post",
        replace_existing=True,
    )

    scheduler.start()
    logger.info("Background scheduler started with price updates and blog generation")


def stop_scheduler():
    """Stop the background scheduler."""
    if scheduler.running:
        scheduler.shutdown()
        logger.info("Background scheduler stopped")
