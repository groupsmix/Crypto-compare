"""Seed the database with initial exchange and affiliate data."""
import sys
import os

sys.path.insert(0, os.path.dirname(__file__))

from app.database import init_db, SessionLocal
from app.models.models import Exchange, Affiliate, BlogPost


def seed_exchanges(db):
    """Seed exchange data matching the frontend."""
    exchanges_data = [
        {
            "exchange_id": "binance",
            "name": "Binance",
            "name_ar": "\u0628\u064a\u0646\u0627\u0646\u0633",
            "logo": "https://cryptologos.cc/logos/binance-coin-bnb-logo.png",
            "description": "Binance is the world's largest cryptocurrency exchange by trading volume.",
            "short_description": "World's largest crypto exchange by volume with 350+ coins and industry-leading fees.",
            "url": "https://www.binance.com",
            "affiliate_url": "https://www.binance.com/register?ref=CRANKED",
            "referral_code": "CRANKED",
            "referral_bonus": "Get 20% off trading fees when you sign up with our link!",
            "rating": 4.8,
            "founded": 2017,
            "headquarters": "Global (Cayman Islands)",
            "trading_pairs": 1400,
            "users": "150M+",
            "daily_volume": "$15B+",
            "maker_fee": 0.1,
            "taker_fee": 0.1,
            "spot_fee": "0.1%",
            "futures_fee": "0.02%/0.05%",
            "deposit_fee": "Free",
            "deposit_methods": ["Bank Transfer", "Credit Card", "Debit Card", "P2P", "Apple Pay", "Google Pay"],
            "security_features": ["2FA", "Cold Storage", "SAFU Fund", "Anti-Phishing Code", "Address Whitelisting"],
            "pros": ["Lowest trading fees", "Largest selection of cryptocurrencies", "Advanced trading tools", "High liquidity", "Comprehensive ecosystem"],
            "cons": ["Complex interface for beginners", "Regulatory challenges in some countries", "Customer support can be slow"],
            "features": ["Spot Trading", "Futures", "Options", "Staking", "Lending", "NFT Marketplace", "Launchpad", "P2P Trading", "Copy Trading"],
            "supported_cryptos": 350,
            "leverage": "125x",
            "mobile_app": True,
            "margin_trading": True,
            "futures": True,
            "staking": True,
            "nft": True,
            "kyc_required": True,
            "min_deposit": "$1",
            "withdrawal_fee": "Varies by coin",
            "category": "advanced",
            "overall_score": 96,
            "fees_score": 98,
            "security_score": 95,
            "ease_of_use_score": 85,
            "features_score": 99,
            "support_score": 80,
        },
        {
            "exchange_id": "bybit",
            "name": "Bybit",
            "name_ar": "\u0628\u0627\u064a \u0628\u064a\u062a",
            "logo": "https://cryptologos.cc/logos/bybit-icon.png",
            "description": "Bybit is a leading cryptocurrency derivatives exchange.",
            "short_description": "Top derivatives exchange with lightning-fast execution and copy trading features.",
            "url": "https://www.bybit.com",
            "affiliate_url": "https://www.bybit.com/invite?ref=5GGJYKB",
            "referral_code": "5GGJYKB",
            "referral_bonus": "Get up to $30,000 bonus when you sign up!",
            "rating": 4.7,
            "founded": 2018,
            "headquarters": "Dubai, UAE",
            "trading_pairs": 800,
            "users": "20M+",
            "daily_volume": "$5B+",
            "maker_fee": 0.1,
            "taker_fee": 0.1,
            "spot_fee": "0.1%",
            "futures_fee": "0.02%/0.055%",
            "deposit_fee": "Free",
            "deposit_methods": ["Bank Transfer", "Credit Card", "Debit Card", "P2P", "Apple Pay"],
            "security_features": ["2FA", "Cold Storage", "Multi-Sig Wallets", "Anti-Phishing", "Fund Password"],
            "pros": ["Excellent derivatives trading", "Ultra-fast execution", "Copy trading", "Competitive fees", "Great mobile app"],
            "cons": ["Smaller spot market", "Not available everywhere", "Newer exchange"],
            "features": ["Spot Trading", "Derivatives", "Options", "Copy Trading", "Launchpad", "Earn Products", "NFT Marketplace", "Trading Bot"],
            "supported_cryptos": 300,
            "leverage": "100x",
            "mobile_app": True,
            "margin_trading": True,
            "futures": True,
            "staking": True,
            "nft": True,
            "kyc_required": True,
            "min_deposit": "$1",
            "withdrawal_fee": "Varies by coin",
            "category": "advanced",
            "overall_score": 92,
            "fees_score": 92,
            "security_score": 90,
            "ease_of_use_score": 90,
            "features_score": 93,
            "support_score": 88,
        },
        {
            "exchange_id": "okx",
            "name": "OKX",
            "name_ar": "\u0623\u0648 \u0643\u064a \u0625\u0643\u0633",
            "logo": "https://cryptologos.cc/logos/okb-okb-logo.png",
            "description": "OKX is one of the world's leading crypto exchanges with Web3 services.",
            "short_description": "Innovative exchange with Web3 wallet, DeFi tools, and 300+ cryptocurrencies.",
            "url": "https://www.okx.com",
            "affiliate_url": "https://www.okx.com/join/YOUR_OKX_CODE",
            "referral_code": "YOUR_OKX_CODE",
            "referral_bonus": "Get up to $10,000 bonus when you sign up!",
            "rating": 4.6,
            "founded": 2017,
            "headquarters": "Seychelles",
            "trading_pairs": 600,
            "users": "50M+",
            "daily_volume": "$3B+",
            "maker_fee": 0.08,
            "taker_fee": 0.1,
            "spot_fee": "0.08%",
            "futures_fee": "0.02%/0.05%",
            "deposit_fee": "Free",
            "deposit_methods": ["Bank Transfer", "Credit Card", "Debit Card", "P2P", "Apple Pay"],
            "security_features": ["2FA", "Cold Storage", "Multi-Sig", "Anti-Phishing", "Address Whitelisting"],
            "pros": ["Built-in Web3 wallet", "Excellent DeFi integration", "Competitive fees", "Strong security", "Innovative features"],
            "cons": ["Complex interface", "Limited fiat support", "Strict KYC"],
            "features": ["Spot Trading", "Futures", "Options", "Web3 Wallet", "DEX Aggregator", "Earn", "NFT Marketplace", "Copy Trading"],
            "supported_cryptos": 300,
            "leverage": "125x",
            "mobile_app": True,
            "margin_trading": True,
            "futures": True,
            "staking": True,
            "nft": True,
            "kyc_required": True,
            "min_deposit": "$10",
            "withdrawal_fee": "Varies by coin",
            "category": "advanced",
            "overall_score": 90,
            "fees_score": 93,
            "security_score": 92,
            "ease_of_use_score": 82,
            "features_score": 95,
            "support_score": 85,
        },
        {
            "exchange_id": "bitget",
            "name": "Bitget",
            "name_ar": "\u0628\u064a\u062a\u063a\u064a\u062a",
            "logo": "https://cryptologos.cc/logos/bitget-token-bgb-logo.png",
            "description": "Bitget is a rapidly growing exchange known for copy trading.",
            "short_description": "Rising star exchange with industry-leading copy trading and competitive fees.",
            "url": "https://www.bitget.com",
            "affiliate_url": "https://www.bitget.com/referral/register?from=referral&clacCode=YOUR_BITGET_CODE",
            "referral_code": "YOUR_BITGET_CODE",
            "referral_bonus": "Get up to $5,005 welcome bonus!",
            "rating": 4.5,
            "founded": 2018,
            "headquarters": "Singapore",
            "trading_pairs": 500,
            "users": "25M+",
            "daily_volume": "$2B+",
            "maker_fee": 0.1,
            "taker_fee": 0.1,
            "spot_fee": "0.1%",
            "futures_fee": "0.02%/0.06%",
            "deposit_fee": "Free",
            "deposit_methods": ["Bank Transfer", "Credit Card", "Debit Card", "P2P"],
            "security_features": ["2FA", "Cold Storage", "Multi-Sig", "Protection Fund", "Anti-Phishing"],
            "pros": ["Best copy trading", "Growing ecosystem", "Competitive fees", "Strong mobile app", "Good support"],
            "cons": ["Smaller by volume", "Fewer trading pairs", "Limited advanced tools"],
            "features": ["Spot Trading", "Futures", "Copy Trading", "Earn Products", "Launchpad", "Trading Bot"],
            "supported_cryptos": 200,
            "leverage": "125x",
            "mobile_app": True,
            "margin_trading": True,
            "futures": True,
            "staking": True,
            "nft": False,
            "kyc_required": True,
            "min_deposit": "$1",
            "withdrawal_fee": "Varies by coin",
            "category": "beginner",
            "overall_score": 87,
            "fees_score": 88,
            "security_score": 88,
            "ease_of_use_score": 92,
            "features_score": 85,
            "support_score": 90,
        },
        {
            "exchange_id": "coinbase",
            "name": "Coinbase",
            "name_ar": "\u0643\u0648\u064a\u0646 \u0628\u064a\u0633",
            "logo": "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
            "description": "Coinbase is the largest US cryptocurrency exchange.",
            "short_description": "Most trusted US exchange -- publicly traded, regulated, and beginner-friendly.",
            "url": "https://www.coinbase.com",
            "affiliate_url": "https://www.coinbase.com/join/YOUR_COINBASE_CODE",
            "referral_code": "YOUR_COINBASE_CODE",
            "referral_bonus": "Get $10 free Bitcoin when you sign up!",
            "rating": 4.5,
            "founded": 2012,
            "headquarters": "San Francisco, USA",
            "trading_pairs": 400,
            "users": "110M+",
            "daily_volume": "$2B+",
            "maker_fee": 0.4,
            "taker_fee": 0.6,
            "spot_fee": "0.4%",
            "futures_fee": "N/A",
            "deposit_fee": "Free",
            "deposit_methods": ["Bank Transfer", "Credit Card", "Debit Card", "PayPal", "Apple Pay", "Wire Transfer"],
            "security_features": ["2FA", "Cold Storage", "Insurance Coverage", "Biometric Login", "Vault Protection"],
            "pros": ["Most regulated", "Publicly traded", "Excellent security", "Very beginner-friendly", "Educational rewards"],
            "cons": ["Higher fees", "Limited advanced tools", "Support issues"],
            "features": ["Spot Trading", "Staking", "Coinbase Earn", "Coinbase Wallet", "NFT Marketplace"],
            "supported_cryptos": 200,
            "leverage": "N/A",
            "mobile_app": True,
            "margin_trading": False,
            "futures": False,
            "staking": True,
            "nft": True,
            "kyc_required": True,
            "min_deposit": "$2",
            "withdrawal_fee": "Varies by coin",
            "category": "beginner",
            "overall_score": 88,
            "fees_score": 65,
            "security_score": 98,
            "ease_of_use_score": 96,
            "features_score": 75,
            "support_score": 78,
        },
        {
            "exchange_id": "kraken",
            "name": "Kraken",
            "name_ar": "\u0643\u0631\u0627\u0643\u0646",
            "logo": "https://cryptologos.cc/logos/kraken-kra-logo.png",
            "description": "Kraken is one of the oldest and most secure crypto exchanges.",
            "short_description": "Veteran exchange since 2011 -- never hacked, proof-of-reserves, and trusted globally.",
            "url": "https://www.kraken.com",
            "affiliate_url": "https://www.kraken.com/sign-up?ref=YOUR_KRAKEN_CODE",
            "referral_code": "YOUR_KRAKEN_CODE",
            "referral_bonus": "Get $10 when you complete your first trade!",
            "rating": 4.6,
            "founded": 2011,
            "headquarters": "San Francisco, USA",
            "trading_pairs": 600,
            "users": "10M+",
            "daily_volume": "$1B+",
            "maker_fee": 0.16,
            "taker_fee": 0.26,
            "spot_fee": "0.16%",
            "futures_fee": "0.02%/0.05%",
            "deposit_fee": "Free",
            "deposit_methods": ["Bank Transfer", "Wire Transfer", "Credit Card", "Debit Card", "Apple Pay"],
            "security_features": ["2FA", "Cold Storage", "Proof of Reserves", "Global Settings Lock", "Master Key"],
            "pros": ["Never been hacked", "Proof of reserves", "Excellent support", "Strong compliance", "Good staking"],
            "cons": ["Higher fees", "Complex interface", "Slower fiat deposits"],
            "features": ["Spot Trading", "Margin Trading", "Futures", "Staking", "OTC Desk", "Kraken Pro"],
            "supported_cryptos": 200,
            "leverage": "50x",
            "mobile_app": True,
            "margin_trading": True,
            "futures": True,
            "staking": True,
            "nft": True,
            "kyc_required": True,
            "min_deposit": "$1",
            "withdrawal_fee": "Varies by coin",
            "category": "professional",
            "overall_score": 89,
            "fees_score": 82,
            "security_score": 99,
            "ease_of_use_score": 80,
            "features_score": 85,
            "support_score": 92,
        },
        {
            "exchange_id": "kucoin",
            "name": "KuCoin",
            "name_ar": "\u0643\u0648\u0643\u0648\u064a\u0646",
            "logo": "https://cryptologos.cc/logos/kucoin-token-kcs-logo.png",
            "description": "KuCoin is the People's Exchange known for altcoin discovery.",
            "short_description": "The People's Exchange -- best for altcoin discovery with 700+ tokens and trading bots.",
            "url": "https://www.kucoin.com",
            "affiliate_url": "https://www.kucoin.com/r/YOUR_KUCOIN_CODE",
            "referral_code": "YOUR_KUCOIN_CODE",
            "referral_bonus": "Get 20% off trading fees!",
            "rating": 4.4,
            "founded": 2017,
            "headquarters": "Seychelles",
            "trading_pairs": 1200,
            "users": "30M+",
            "daily_volume": "$1.5B+",
            "maker_fee": 0.1,
            "taker_fee": 0.1,
            "spot_fee": "0.1%",
            "futures_fee": "0.02%/0.06%",
            "deposit_fee": "Free",
            "deposit_methods": ["Bank Transfer", "Credit Card", "Debit Card", "P2P", "Apple Pay"],
            "security_features": ["2FA", "Cold Storage", "Micro-Withdrawal Whitelist", "Trading Password", "Anti-Phishing"],
            "pros": ["Huge altcoin selection", "Trading bot marketplace", "KCS dividends", "Low minimum deposits", "Good staking APY"],
            "cons": ["Past security incident", "Complex for beginners", "Support can be slow"],
            "features": ["Spot Trading", "Futures", "Margin Trading", "Trading Bots", "Staking", "Lending", "KuCoin Earn"],
            "supported_cryptos": 700,
            "leverage": "100x",
            "mobile_app": True,
            "margin_trading": True,
            "futures": True,
            "staking": True,
            "nft": False,
            "kyc_required": False,
            "min_deposit": "$1",
            "withdrawal_fee": "Varies by coin",
            "category": "advanced",
            "overall_score": 85,
            "fees_score": 90,
            "security_score": 82,
            "ease_of_use_score": 78,
            "features_score": 90,
            "support_score": 75,
        },
    ]

    for data in exchanges_data:
        existing = db.query(Exchange).filter(Exchange.exchange_id == data["exchange_id"]).first()
        if not existing:
            exchange = Exchange(**data)
            db.add(exchange)
            print(f"  Added exchange: {data['name']}")
        else:
            print(f"  Exchange already exists: {data['name']}")

    db.commit()


def seed_affiliates(db):
    """Seed affiliate data."""
    affiliates_data = [
        {"exchange_id": "binance", "name": "Binance", "referral_url": "https://www.binance.com/register?ref=CRANKED", "referral_code": "CRANKED", "commission_rate": "Up to 50%"},
        {"exchange_id": "bybit", "name": "Bybit", "referral_url": "https://www.bybit.com/invite?ref=5GGJYKB", "referral_code": "5GGJYKB", "commission_rate": "Up to 30%"},
        {"exchange_id": "okx", "name": "OKX", "referral_url": "https://www.okx.com/join/YOUR_OKX_CODE", "referral_code": "YOUR_OKX_CODE", "commission_rate": "Up to 40%"},
        {"exchange_id": "bitget", "name": "Bitget", "referral_url": "https://www.bitget.com/referral/register?from=referral&clacCode=YOUR_BITGET_CODE", "referral_code": "YOUR_BITGET_CODE", "commission_rate": "Up to 50%"},
        {"exchange_id": "coinbase", "name": "Coinbase", "referral_url": "https://www.coinbase.com/join/YOUR_COINBASE_CODE", "referral_code": "YOUR_COINBASE_CODE", "commission_rate": "50% for 3 months"},
        {"exchange_id": "kraken", "name": "Kraken", "referral_url": "https://www.kraken.com/sign-up?ref=YOUR_KRAKEN_CODE", "referral_code": "YOUR_KRAKEN_CODE", "commission_rate": "Up to 20%"},
        {"exchange_id": "kucoin", "name": "KuCoin", "referral_url": "https://www.kucoin.com/r/YOUR_KUCOIN_CODE", "referral_code": "YOUR_KUCOIN_CODE", "commission_rate": "Up to 20%"},
    ]

    for data in affiliates_data:
        existing = db.query(Affiliate).filter(Affiliate.exchange_id == data["exchange_id"]).first()
        if not existing:
            affiliate = Affiliate(**data)
            db.add(affiliate)
            print(f"  Added affiliate: {data['name']}")
        else:
            print(f"  Affiliate already exists: {data['name']}")

    db.commit()


def seed_blog_posts(db):
    """Seed initial blog posts from existing frontend data."""
    posts_data = [
        {
            "slug": "how-to-choose-crypto-exchange-2026",
            "title": "How to Choose the Best Crypto Exchange in 2026: Complete Guide",
            "excerpt": "Choosing the right cryptocurrency exchange is crucial for your trading success. Learn what factors to consider, from fees to security.",
            "content": "Choosing the right cryptocurrency exchange can make or break your trading experience...",
            "category": "Guides",
            "date": "2026-03-10",
            "read_time": 8,
            "image": "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800",
            "tags": ["crypto exchange", "guide", "beginners", "trading"],
            "meta_description": "Compare crypto exchanges in 2026. Learn what to look for in fees, security, and features to find the best platform for your needs.",
        },
        {
            "slug": "bitcoin-halving-2028-what-to-expect",
            "title": "Bitcoin Halving 2028: What to Expect and How to Prepare",
            "excerpt": "The next Bitcoin halving is approaching. Learn what it means for prices, mining, and your investment strategy.",
            "content": "Bitcoin halvings are among the most significant events in the crypto calendar...",
            "category": "Market Analysis",
            "date": "2026-03-12",
            "read_time": 9,
            "image": "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800",
            "tags": ["bitcoin", "halving", "investment", "market analysis"],
            "meta_description": "Prepare for Bitcoin Halving 2028. Historical analysis, price predictions, and strategies to maximize your crypto investments.",
        },
        {
            "slug": "best-crypto-trading-bots-2026",
            "title": "Best Crypto Trading Bots in 2026: Automate Your Profits",
            "excerpt": "Discover the best crypto trading bots available on major exchanges. Automate your strategies for 24/7 trading.",
            "content": "Crypto trading bots can execute trades 24/7 based on predefined strategies...",
            "category": "Tools",
            "date": "2026-03-09",
            "read_time": 8,
            "image": "https://images.unsplash.com/photo-1516245834210-c4c142787335?w=800",
            "tags": ["trading bots", "automation", "trading strategies", "passive income"],
            "meta_description": "Compare the best crypto trading bots in 2026. Grid bots, DCA bots, and copy trading bots on Bybit, KuCoin, and Bitget.",
        },
    ]

    for data in posts_data:
        existing = db.query(BlogPost).filter(BlogPost.slug == data["slug"]).first()
        if not existing:
            post = BlogPost(**data, is_published=True, is_ai_generated=False)
            db.add(post)
            print(f"  Added blog post: {data['title']}")
        else:
            print(f"  Blog post already exists: {data['title']}")

    db.commit()


def main():
    print("Initializing database...")
    init_db()

    db = SessionLocal()
    try:
        print("\nSeeding exchanges...")
        seed_exchanges(db)

        print("\nSeeding affiliates...")
        seed_affiliates(db)

        print("\nSeeding blog posts...")
        seed_blog_posts(db)

        print("\nDatabase seeded successfully!")
    finally:
        db.close()


if __name__ == "__main__":
    main()
