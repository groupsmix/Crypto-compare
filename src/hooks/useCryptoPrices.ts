import { useState, useEffect } from 'react';
import type { CryptoPrice } from '@/types';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

export function useCryptoPrices() {
  const [prices, setPrices] = useState<CryptoPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchPrices() {
      try {
        const response = await fetch(
          `${COINGECKO_API}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false&price_change_percentage=24h`
        );
        if (!response.ok) throw new Error('Failed to fetch prices');
        const data = await response.json();
        if (mounted) {
          setPrices(data);
          setLoading(false);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Unknown error');
          setLoading(false);
          // Use fallback data
          setPrices(fallbackPrices);
        }
      }
    }

    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return { prices, loading, error };
}

export function useFearGreedIndex() {
  const [data, setData] = useState<{ value: number; classification: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function fetchFearGreed() {
      try {
        const response = await fetch('https://api.alternative.me/fng/?limit=1');
        if (!response.ok) throw new Error('Failed to fetch');
        const result = await response.json();
        if (mounted && result.data?.[0]) {
          const val = parseInt(result.data[0].value);
          let classification = 'محايد';
          if (val <= 25) classification = 'خوف شديد';
          else if (val <= 40) classification = 'خوف';
          else if (val <= 60) classification = 'محايد';
          else if (val <= 75) classification = 'طمع';
          else classification = 'طمع شديد';
          setData({ value: val, classification });
          setLoading(false);
        }
      } catch {
        if (mounted) {
          setData({ value: 50, classification: 'محايد' });
          setLoading(false);
        }
      }
    }

    fetchFearGreed();
    return () => { mounted = false; };
  }, []);

  return { data, loading };
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
