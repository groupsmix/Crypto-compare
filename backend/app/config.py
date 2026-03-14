import os
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str = "sqlite:///./data/cryptoranked.db"
    SECRET_KEY: str = "change-this-to-a-random-secret-key-in-production"
    ADMIN_USERNAME: str = "admin"
    ADMIN_PASSWORD: str = "changeme123"
    GEMINI_API_KEY: str = ""
    COINGECKO_BASE_URL: str = "https://api.coingecko.com/api/v3"
    FRONTEND_URL: str = "https://cryptoranked.xyz"
    BLOG_CRON_HOUR: int = 9
    BLOG_CRON_MINUTE: int = 0
    BLOG_CRON_DAY_OF_WEEK: str = "mon"
    PRICE_UPDATE_INTERVAL: int = 60
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440  # 24 hours

    class Config:
        env_file = ".env"
        extra = "ignore"


settings = Settings()
