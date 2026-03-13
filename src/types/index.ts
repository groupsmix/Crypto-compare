export interface Exchange {
  id: string;
  name: string;
  nameAr: string;
  logo: string;
  description: string;
  shortDescription: string;
  url: string;
  affiliateUrl: string;
  referralLink: string;
  referralBonus?: string;
  rating: number;
  founded: number;
  headquarters: string;
  tradingPairs: number;
  users: string;
  dailyVolume: string;
  tradingVolume: string;
  makerFee: number;
  takerFee: number;
  spotFee: string;
  futuresFee: string;
  depositFee: string;
  depositMethods: string[];
  securityFeatures: string[];
  pros: string[];
  cons: string[];
  features: string[];
  supportedCryptos: number;
  coins: number;
  leverage: string;
  mobileApp: boolean;
  marginTrading: boolean;
  futures: boolean;
  staking: boolean;
  nft: boolean;
  kycRequired: boolean;
  minDeposit: string;
  withdrawalFee: string;
  category: 'beginner' | 'advanced' | 'professional';
  overallScore: number;
  feesScore: number;
  securityScore: number;
  security: number;
  easeOfUseScore: number;
  ease: number;
  featuresScore: number;
  supportScore: number;
  support: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: number;
  image: string;
  tags: string[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
}

export interface QuizOption {
  label: string;
  value: string;
  scores: Record<string, number>;
}

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonicalUrl?: string;
  structuredData?: Record<string, unknown>;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  content: string[];
}

export interface RecommenderAnswer {
  question: string;
  options: { label: string; value: string; icon: string }[];
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
