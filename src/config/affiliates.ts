// Centralized affiliate configuration
// Replace placeholder URLs with your REAL referral links for each exchange

export interface AffiliateConfig {
  exchangeId: string;
  name: string;
  referralUrl: string;
  referralCode: string;
  commissionRate: string;
}

const affiliateLinks: Record<string, AffiliateConfig> = {
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
    // TODO: Replace with your real OKX referral link
    referralUrl: 'https://www.okx.com/join/YOUR_OKX_CODE',
    referralCode: 'YOUR_OKX_CODE',
    commissionRate: 'Up to 40%',
  },
  bitget: {
    exchangeId: 'bitget',
    name: 'Bitget',
    // TODO: Replace with your real Bitget referral link
    referralUrl: 'https://www.bitget.com/referral/register?from=referral&clacCode=YOUR_BITGET_CODE',
    referralCode: 'YOUR_BITGET_CODE',
    commissionRate: 'Up to 50%',
  },
  coinbase: {
    exchangeId: 'coinbase',
    name: 'Coinbase',
    // TODO: Replace with your real Coinbase referral link
    referralUrl: 'https://www.coinbase.com/join/YOUR_COINBASE_CODE',
    referralCode: 'YOUR_COINBASE_CODE',
    commissionRate: '50% for 3 months',
  },
  kraken: {
    exchangeId: 'kraken',
    name: 'Kraken',
    // TODO: Replace with your real Kraken referral link
    referralUrl: 'https://www.kraken.com/sign-up?ref=YOUR_KRAKEN_CODE',
    referralCode: 'YOUR_KRAKEN_CODE',
    commissionRate: 'Up to 20%',
  },
  kucoin: {
    exchangeId: 'kucoin',
    name: 'KuCoin',
    // TODO: Replace with your real KuCoin referral link
    referralUrl: 'https://www.kucoin.com/r/YOUR_KUCOIN_CODE',
    referralCode: 'YOUR_KUCOIN_CODE',
    commissionRate: 'Up to 20%',
  },
};

export const getAffiliateUrl = (exchangeId: string): string => {
  return affiliateLinks[exchangeId]?.referralUrl || '#';
};

export const getAffiliateConfig = (exchangeId: string): AffiliateConfig | undefined => {
  return affiliateLinks[exchangeId];
};

export const getAllAffiliateConfigs = (): AffiliateConfig[] => {
  return Object.values(affiliateLinks);
};

export default affiliateLinks;
