import { useQuery } from '@tanstack/react-query';
import type { CryptoPrice } from '@/types';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';
const API_URL = import.meta.env.VITE_API_URL || 'https://api.cryptoranked.xyz';

async function fetchCryptoPrices(): Promise<CryptoPrice[]> {
  // Try backend API first (cached, faster)
  try {
    const backendRes = await fetch(`${API_URL}/api/prices`, {
      signal: AbortSignal.timeout(5000),
    });
    if (backendRes.ok) {
      const data = await backendRes.json();
      if (Array.isArray(data) && data.length > 0) {
        return data.map((coin: { coin_id: string; symbol: string; name: string; current_price: number; price_change_24h: number; market_cap: number; image: string }) => ({
          id: coin.coin_id,
          symbol: coin.symbol,
          name: coin.name,
          current_price: coin.current_price,
          price_change_percentage_24h: coin.price_change_24h,
          market_cap: coin.market_cap,
          image: coin.image,
        }));
      }
    }
  } catch {
    // Backend unavailable, fall through to CoinGecko
  }

  // Fallback: direct CoinGecko fetch
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);
  try {
    const response = await fetch(
      `${COINGECKO_API}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false&price_change_percentage=24h`,
      { signal: controller.signal }
    );
    if (!response.ok) throw new Error('Failed to fetch prices');
    return response.json();
  } finally {
    clearTimeout(timeoutId);
  }
}

async function fetchFearGreedData(): Promise<{ value: number; classification: string }> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);
  try {
    const response = await fetch('https://api.alternative.me/fng/?limit=1', {
      signal: controller.signal,
    });
    if (!response.ok) throw new Error('Failed to fetch');
    const result = await response.json();
    if (result.data?.[0]) {
      const val = parseInt(result.data[0].value);
      let classification = 'محايد';
      if (val <= 25) classification = 'خوف شديد';
      else if (val <= 40) classification = 'خوف';
      else if (val <= 60) classification = 'محايد';
      else if (val <= 75) classification = 'طمع';
      else classification = 'طمع شديد';
      return { value: val, classification };
    }
    return { value: 50, classification: 'محايد' };
  } finally {
    clearTimeout(timeoutId);
  }
}

export function useCryptoPrices() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['cryptoPrices'],
    queryFn: fetchCryptoPrices,
    refetchInterval: 60000,
    placeholderData: fallbackPrices,
  });

  return {
    prices: data ?? fallbackPrices,
    loading: isLoading,
    error: error ? (error instanceof Error ? error.message : 'Unknown error') : null,
  };
}

export function useFearGreedIndex() {
  const { data, isLoading } = useQuery({
    queryKey: ['fearGreedIndex'],
    queryFn: fetchFearGreedData,
    placeholderData: { value: 50, classification: 'محايد' },
  });

  return { data: data ?? null, loading: isLoading };
}

const fallbackPrices: CryptoPrice[] = [
  { id: 'bitcoin', symbol: 'btc', name: 'Bitcoin', current_price: 87500, price_change_percentage_24h: 2.5, image: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png', market_cap: 1720000000000 },
  { id: 'ethereum', symbol: 'eth', name: 'Ethereum', current_price: 3200, price_change_percentage_24h: 1.8, image: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png', market_cap: 385000000000 },
  { id: 'tether', symbol: 'usdt', name: 'Tether', current_price: 1, price_change_percentage_24h: 0.01, image: 'https://assets.coingecko.com/coins/images/325/small/Tether.png', market_cap: 140000000000 },
  { id: 'binancecoin', symbol: 'bnb', name: 'BNB', current_price: 620, price_change_percentage_24h: 0.9, image: 'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png', market_cap: 92000000000 },
  { id: 'solana', symbol: 'sol', name: 'Solana', current_price: 195, price_change_percentage_24h: 3.2, image: 'https://assets.coingecko.com/coins/images/4128/small/solana.png', market_cap: 87000000000 },
  { id: 'ripple', symbol: 'xrp', name: 'XRP', current_price: 2.35, price_change_percentage_24h: -0.5, image: 'https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png', market_cap: 135000000000 },
  { id: 'cardano', symbol: 'ada', name: 'Cardano', current_price: 0.78, price_change_percentage_24h: 1.2, image: 'https://assets.coingecko.com/coins/images/975/small/cardano.png', market_cap: 27500000000 },
  { id: 'dogecoin', symbol: 'doge', name: 'Dogecoin', current_price: 0.165, price_change_percentage_24h: -1.3, image: 'https://assets.coingecko.com/coins/images/5/small/dogecoin.png', market_cap: 24000000000 },
];
