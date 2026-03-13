// Centralized Affiliate Configuration
// Update your referral IDs here — all links across the site will update automatically

export interface AffiliateConfig {
  exchangeId: string;
  name: string;
  referralUrl: string;
  referralCode: string;
  commissionRate: string;
}

export const affiliateLinks: Record<string, AffiliateConfig> = {
  binance: {
    exchangeId: 'binance',
    name: 'Binance',
    referralUrl: 'https://www.binance.com/register?ref=CRANKED',
    referralCode: 'CRANKED',
    commissionRate: 'Up to 50%',
  },
  bybit: {
    exchangeId: 'bybit',
    name: 'Bybit',
    referralUrl: 'https://www.bybit.com/invite?ref=5GGJYKB',
    referralCode: '5GGJYKB',
    commissionRate: 'Up to 30%',
  },
  okx: {
    exchangeId: 'okx',
    name: 'OKX',
    // Replace with your real OKX referral link when you have one
    referralUrl: 'https://www.okx.com/join/CRYPTORANKED',
    referralCode: 'CRYPTORANKED',
    commissionRate: 'Up to 30%',
  },
  bitget: {
    exchangeId: 'bitget',
    name: 'Bitget',
    // Replace with your real Bitget referral link when you have one
    referralUrl: 'https://www.bitget.com/referral/register?clacCode=CRYPTORANKED',
    referralCode: 'CRYPTORANKED',
    commissionRate: 'Up to 50%',
  },
  coinbase: {
    exchangeId: 'coinbase',
    name: 'Coinbase',
    // Replace with your real Coinbase referral link when you have one
    referralUrl: 'https://www.coinbase.com/join/CRYPTORANKED',
    referralCode: 'CRYPTORANKED',
    commissionRate: 'Up to $10 BTC',
  },
  kraken: {
    exchangeId: 'kraken',
    name: 'Kraken',
    // Replace with your real Kraken referral link when you have one
    referralUrl: 'https://www.kraken.com/sign-up?referral=CRYPTORANKED',
    referralCode: 'CRYPTORANKED',
    commissionRate: 'Up to $10',
  },
  kucoin: {
    exchangeId: 'kucoin',
    name: 'KuCoin',
    // Replace with your real KuCoin referral link when you have one
    referralUrl: 'https://www.kucoin.com/r/CRYPTORANKED',
    referralCode: 'CRYPTORANKED',
    commissionRate: 'Up to 20%',
  },
};

export function getAffiliateUrl(exchangeId: string): string {
  return affiliateLinks[exchangeId]?.referralUrl || '#';
}

export function getReferralCode(exchangeId: string): string {
  return affiliateLinks[exchangeId]?.referralCode || '';
}
