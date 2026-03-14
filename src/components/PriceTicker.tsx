import { useCryptoPrices } from '@/hooks/useCryptoPrices';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function PriceTicker() {
  const { prices, loading } = useCryptoPrices();

  if (loading || prices.length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800 py-2">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          Loading prices...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800 py-2 overflow-hidden">
      <div className="flex gap-8 ticker-scroll" style={{ width: 'max-content' }}>
        {[...prices, ...prices].map((coin, i) => (
          <div key={`${coin.id}-${i}`} className="flex items-center gap-2 text-sm whitespace-nowrap">
            <img src={coin.image} alt={coin.name} className="w-5 h-5 rounded-full" />
            <span className="text-gray-500 dark:text-gray-400 font-medium">{coin.symbol.toUpperCase()}</span>
            <span className="text-gray-900 dark:text-white font-semibold">
              ${coin.current_price.toLocaleString('en-US', { maximumFractionDigits: 2 })}
            </span>
            <span className={`flex items-center gap-0.5 ${
              coin.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'
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
