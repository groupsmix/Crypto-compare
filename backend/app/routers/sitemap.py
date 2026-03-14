from datetime import datetime

from fastapi import APIRouter, Depends, Response
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.models import Exchange, BlogPost

router = APIRouter(tags=["sitemap"])

SITE_URL = "https://cryptoranked.xyz"


@router.get("/sitemap.xml", response_class=Response)
async def sitemap(db: Session = Depends(get_db)):
    """Generate sitemap.xml dynamically."""
    today = datetime.utcnow().strftime("%Y-%m-%d")

    urls = [
        {"loc": SITE_URL, "priority": "1.0", "changefreq": "daily"},
        {"loc": f"{SITE_URL}/exchanges", "priority": "0.9", "changefreq": "daily"},
        {"loc": f"{SITE_URL}/compare", "priority": "0.8", "changefreq": "weekly"},
        {"loc": f"{SITE_URL}/calculator", "priority": "0.7", "changefreq": "monthly"},
        {"loc": f"{SITE_URL}/dca-calculator", "priority": "0.7", "changefreq": "monthly"},
        {"loc": f"{SITE_URL}/recommender", "priority": "0.8", "changefreq": "monthly"},
        {"loc": f"{SITE_URL}/blog", "priority": "0.8", "changefreq": "daily"},
        {"loc": f"{SITE_URL}/about", "priority": "0.5", "changefreq": "monthly"},
    ]

    # Exchange review pages
    exchanges = db.query(Exchange).filter(Exchange.is_active == True).all()
    for ex in exchanges:
        urls.append({
            "loc": f"{SITE_URL}/exchange/{ex.exchange_id}",
            "priority": "0.8",
            "changefreq": "weekly",
        })

    # Blog post pages
    posts = db.query(BlogPost).filter(BlogPost.is_published == True).all()
    for post in posts:
        urls.append({
            "loc": f"{SITE_URL}/blog/{post.slug}",
            "priority": "0.6",
            "changefreq": "monthly",
        })

    # Comparison pages
    comparisons = [
        "binance-vs-coinbase", "binance-vs-bybit", "binance-vs-okx",
        "bybit-vs-bitget", "coinbase-vs-kraken", "kucoin-vs-okx",
    ]
    for comp in comparisons:
        urls.append({
            "loc": f"{SITE_URL}/compare/{comp}",
            "priority": "0.7",
            "changefreq": "weekly",
        })

    # Country guide pages
    countries = ["usa", "uae", "uk", "saudi-arabia", "egypt", "germany", "india", "canada"]
    for country in countries:
        urls.append({
            "loc": f"{SITE_URL}/best-exchange/{country}",
            "priority": "0.7",
            "changefreq": "monthly",
        })

    xml_parts = ['<?xml version="1.0" encoding="UTF-8"?>']
    xml_parts.append('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')

    for url in urls:
        xml_parts.append("  <url>")
        xml_parts.append(f"    <loc>{url['loc']}</loc>")
        xml_parts.append(f"    <lastmod>{today}</lastmod>")
        xml_parts.append(f"    <changefreq>{url['changefreq']}</changefreq>")
        xml_parts.append(f"    <priority>{url['priority']}</priority>")
        xml_parts.append("  </url>")

    xml_parts.append("</urlset>")

    xml_content = "\n".join(xml_parts)
    return Response(content=xml_content, media_type="application/xml")


@router.get("/robots.txt", response_class=Response)
async def robots():
    """Generate robots.txt."""
    content = f"""User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/

Sitemap: {SITE_URL}/sitemap.xml
"""
    return Response(content=content, media_type="text/plain")
