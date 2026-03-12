export interface Exchange {
  id: string;
  name: string;
  nameAr: string;
  logo: string;
  rating: number;
  founded: string;
  headquarters: string;
  users: string;
  tradingVolume: string;
  spotFee: string;
  futuresFee: string;
  depositFee: string;
  withdrawalFee: string;
  coins: number;
  tradingPairs: number;
  leverage: string;
  security: number;
  ease: number;
  support: number;
  features: string[];
  pros: string[];
  cons: string[];
  referralLink: string;
  referralBonus: string;
  description: string;
  color: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  content: string[];
}

export interface CryptoPrice {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
  market_cap: number;
}

export interface FearGreedData {
  value: number;
  classification: string;
}

export interface RecommenderAnswer {
  question: string;
  options: { label: string; value: string; icon?: string }[];
}
