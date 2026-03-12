import { useCryptoPrices } from '@/hooks/useCryptoPrices';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function PriceTicker() {
  const { prices, loading } = useCryptoPrices();

  if (loading || prices.length === 0) {
    return (
      <div className="bg-surface/80 border-b border-white/5 py-2 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center text-text-secondary text-sm">
          جاري تحميل الأسعار...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface/80 border-b border-white/5 py-2 mt-16 overflow-hidden">
      <div className="flex gap-8 ticker-scroll" style={{ width: 'max-content' }}>
        {[...prices, ...prices].map((coin, i) => (
          <div key={`${coin.id}-${i}`} className="flex items-center gap-2 text-sm whitespace-nowrap">
            <img src={coin.image} alt={coin.name} className="w-5 h-5 rounded-full" />
            <span className="text-text-secondary font-medium">{coin.symbol.toUpperCase()}</span>
            <span className="text-white font-semibold">
              ${coin.current_price.toLocaleString('en-US', { maximumFractionDigits: 2 })}
            </span>
            <span className={`flex items-center gap-0.5 ${
              coin.price_change_percentage_24h >= 0 ? 'text-success' : 'text-danger'
            }`}>
              {coin.price_change_percentage_24h >= 0 ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
