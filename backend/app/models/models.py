from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, Boolean, Text, DateTime, JSON
from app.database import Base


class BlogPost(Base):
    __tablename__ = "blog_posts"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    title = Column(String(500), nullable=False)
    excerpt = Column(Text, nullable=False)
    content = Column(Text, nullable=False)
    category = Column(String(100), nullable=False)
    author = Column(String(100), default="CryptoRanked")
    date = Column(String(20), nullable=False)
    read_time = Column(Integer, default=5)
    image = Column(String(500), default="")
    tags = Column(JSON, default=list)
    meta_description = Column(Text, default="")
    is_published = Column(Boolean, default=True)
    is_ai_generated = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class Exchange(Base):
    __tablename__ = "exchanges"

    id = Column(Integer, primary_key=True, index=True)
    exchange_id = Column(String(50), unique=True, index=True, nullable=False)
    name = Column(String(100), nullable=False)
    name_ar = Column(String(100), default="")
    logo = Column(String(500), default="")
    description = Column(Text, default="")
    short_description = Column(Text, default="")
    url = Column(String(500), default="")
    affiliate_url = Column(String(500), default="")
    referral_code = Column(String(100), default="")
    referral_bonus = Column(String(255), default="")
    rating = Column(Float, default=0)
    founded = Column(Integer, default=0)
    headquarters = Column(String(255), default="")
    trading_pairs = Column(Integer, default=0)
    users = Column(String(50), default="")
    daily_volume = Column(String(50), default="")
    maker_fee = Column(Float, default=0)
    taker_fee = Column(Float, default=0)
    spot_fee = Column(String(20), default="")
    futures_fee = Column(String(50), default="")
    deposit_fee = Column(String(50), default="Free")
    deposit_methods = Column(JSON, default=list)
    security_features = Column(JSON, default=list)
    pros = Column(JSON, default=list)
    cons = Column(JSON, default=list)
    features = Column(JSON, default=list)
    supported_cryptos = Column(Integer, default=0)
    leverage = Column(String(20), default="")
    mobile_app = Column(Boolean, default=True)
    margin_trading = Column(Boolean, default=False)
    futures = Column(Boolean, default=False)
    staking = Column(Boolean, default=False)
    nft = Column(Boolean, default=False)
    kyc_required = Column(Boolean, default=True)
    min_deposit = Column(String(20), default="")
    withdrawal_fee = Column(String(100), default="")
    category = Column(String(50), default="advanced")
    overall_score = Column(Integer, default=0)
    fees_score = Column(Integer, default=0)
    security_score = Column(Integer, default=0)
    ease_of_use_score = Column(Integer, default=0)
    features_score = Column(Integer, default=0)
    support_score = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class Affiliate(Base):
    __tablename__ = "affiliates"

    id = Column(Integer, primary_key=True, index=True)
    exchange_id = Column(String(50), unique=True, index=True, nullable=False)
    name = Column(String(100), nullable=False)
    referral_url = Column(String(500), nullable=False)
    referral_code = Column(String(100), default="")
    commission_rate = Column(String(100), default="")
    is_active = Column(Boolean, default=True)
    clicks = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class CryptoPrice(Base):
    __tablename__ = "crypto_prices"

    id = Column(Integer, primary_key=True, index=True)
    coin_id = Column(String(100), unique=True, index=True, nullable=False)
    symbol = Column(String(20), nullable=False)
    name = Column(String(100), nullable=False)
    current_price = Column(Float, default=0)
    price_change_24h = Column(Float, default=0)
    market_cap = Column(Float, default=0)
    image = Column(String(500), default="")
    last_updated = Column(DateTime, default=datetime.utcnow)


class ChatMessage(Base):
    __tablename__ = "chat_messages"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String(100), index=True, nullable=False)
    role = Column(String(20), nullable=False)  # "user" or "assistant"
    content = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)


class NewsletterSubscriber(Base):
    __tablename__ = "newsletter_subscribers"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    is_subscribed = Column(Boolean, default=True)
    subscribed_at = Column(DateTime, default=datetime.utcnow)
    unsubscribed_at = Column(DateTime, nullable=True)


class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(255), nullable=False)
    subject = Column(String(300), default="")
    message = Column(Text, nullable=False)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)


class QuizResult(Base):
    __tablename__ = "quiz_results"

    id = Column(Integer, primary_key=True, index=True)
    answers = Column(JSON, nullable=False)
    recommendations = Column(JSON, nullable=False)
    ip_address = Column(String(45), default="")
    created_at = Column(DateTime, default=datetime.utcnow)


class SiteSettings(Base):
    __tablename__ = "site_settings"

    id = Column(Integer, primary_key=True, index=True)
    key = Column(String(100), unique=True, index=True, nullable=False)
    value = Column(Text, default="")
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
