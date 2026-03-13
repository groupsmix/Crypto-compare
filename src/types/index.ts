export interface Exchange {
  id: string;
  name: string;
  logo: string;
  description: string;
  shortDescription: string;
  url: string;
  affiliateUrl: string;
  rating: number;
  founded: number;
  headquarters: string;
  tradingPairs: number;
  users: string;
  dailyVolume: string;
  makerFee: number;
  takerFee: number;
  depositMethods: string[];
  securityFeatures: string[];
  pros: string[];
  cons: string[];
  features: string[];
  supportedCryptos: number;
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
  easeOfUseScore: number;
  featuresScore: number;
  supportScore: number;
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
