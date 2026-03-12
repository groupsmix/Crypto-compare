import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownUp, RefreshCw, TrendingUp, TrendingDown } from 'lucide-react';
import { useCryptoPrices } from '@/hooks/useCryptoPrices';

const fiatCurrencies = [
  { code: 'USD', name: 'دولار أمريكي', symbol: '$', rate: 1 },
  { code: 'SAR', name: 'ريال سعودي', symbol: 'ر.س', rate: 3.75 },
  { code: 'AED', name: 'درهم إماراتي', symbol: 'د.إ', rate: 3.67 },
  { code: 'EGP', name: 'جنيه مصري', symbol: 'ج.م', rate: 50.5 },
  { code: 'KWD', name: 'دينار كويتي', symbol: 'د.ك', rate: 0.31 },
  { code: 'QAR', name: 'ريال قطري', symbol: 'ر.ق', rate: 3.64 },
  { code: 'BHD', name: 'دينار بحريني', symbol: 'د.ب', rate: 0.376 },
  { code: 'OMR', name: 'ريال عماني', symbol: 'ر.ع', rate: 0.385 },
  { code: 'EUR', name: 'يورو', symbol: '\u20AC', rate: 0.92 },
  { code: 'GBP', name: 'جنيه إسترليني', symbol: '\u00A3', rate: 0.79 },
];

export default function ConverterPage() {
  const { prices, loading } = useCryptoPrices();
  const [amount, setAmount] = useState<string>('1');
  const [selectedCrypto, setSelectedCrypto] = useState('bitcoin');
  const [selectedFiat, setSelectedFiat] = useState('USD');
  const [direction, setDirection] = useState<'crypto-to-fiat' | 'fiat-to-crypto'>('crypto-to-fiat');

  const selectedCoin = prices.find((p) => p.id === selectedCrypto);
  const selectedFiatCurrency = fiatCurrencies.find((f) => f.code === selectedFiat);

  const result = useMemo(() => {
    if (!selectedCoin || !selectedFiatCurrency) return 0;
    const numAmount = parseFloat(amount) || 0;

    if (direction === 'crypto-to-fiat') {
      return numAmount * selectedCoin.current_price * selectedFiatCurrency.rate;
    } else {
      return numAmount / (selectedCoin.current_price * selectedFiatCurrency.rate);
    }
  }, [amount, selectedCoin, selectedFiatCurrency, direction]);

  const toggleDirection = () => {
    setDirection(direction === 'crypto-to-fiat' ? 'fiat-to-crypto' : 'crypto-to-fiat');
    setAmount('1');
  };

  if (loading || prices.length === 0) {
    return (
      <div className="min-h-screen py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 rounded-2xl bg-white/5 mx-auto mb-6 animate-pulse" />
            <div className="h-8 bg-white/5 rounded-lg max-w-xs mx-auto mb-4 animate-pulse" />
            <div className="h-5 bg-white/5 rounded-lg max-w-md mx-auto animate-pulse" />
          </div>
          <div className="glass-card p-8">
            <div className="space-y-6">
              <div className="h-20 bg-white/5 rounded-xl animate-pulse" />
              <div className="h-12 bg-white/5 rounded-xl animate-pulse" />
              <div className="h-20 bg-white/5 rounded-xl animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent mb-6">
            <ArrowDownUp className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">محول العملات الرقمية</h1>
          <p className="text-text-secondary text-lg">
            حوّل بين العملات الرقمية والعملات المحلية بأسعار لحظية
          </p>
        </motion.div>

        <motion.div
          className="glass-card p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* From Section */}
          <div className="mb-2">
            <label className="block text-text-secondary text-sm mb-2">
              {direction === 'crypto-to-fiat' ? 'من (عملة رقمية)' : 'من (عملة محلية)'}
            </label>
            <div className="flex gap-3">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-lg font-bold focus:outline-none focus:border-primary/50 transition-colors"
                min={0}
                step="any"
                placeholder="0"
              />
              {direction === 'crypto-to-fiat' ? (
                <select
                  value={selectedCrypto}
                  onChange={(e) => setSelectedCrypto(e.target.value)}
                  className="w-40 px-3 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary/50 transition-colors appearance-none cursor-pointer text-sm"
                >
                  {prices.slice(0, 20).map((coin) => (
                    <option key={coin.id} value={coin.id}>
                      {coin.symbol.toUpperCase()} - {coin.name}
                    </option>
                  ))}
                </select>
              ) : (
                <select
                  value={selectedFiat}
                  onChange={(e) => setSelectedFiat(e.target.value)}
                  className="w-40 px-3 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary/50 transition-colors appearance-none cursor-pointer text-sm"
                >
                  {fiatCurrencies.map((fiat) => (
                    <option key={fiat.code} value={fiat.code}>
                      {fiat.code} - {fiat.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center my-4">
            <button
              onClick={toggleDirection}
              className="p-3 rounded-full bg-primary/20 text-primary hover:bg-primary/30 transition-all hover:rotate-180 duration-300"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>

          {/* To Section */}
          <div className="mb-6">
            <label className="block text-text-secondary text-sm mb-2">
              {direction === 'crypto-to-fiat' ? 'إلى (عملة محلية)' : 'إلى (عملة رقمية)'}
            </label>
            <div className="flex gap-3">
              <div className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-lg font-bold">
                {result.toLocaleString('en-US', {
                  maximumFractionDigits: direction === 'fiat-to-crypto' ? 8 : 2,
                  minimumFractionDigits: direction === 'fiat-to-crypto' ? 2 : 2,
                })}
              </div>
              {direction === 'crypto-to-fiat' ? (
                <select
                  value={selectedFiat}
                  onChange={(e) => setSelectedFiat(e.target.value)}
                  className="w-40 px-3 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary/50 transition-colors appearance-none cursor-pointer text-sm"
                >
                  {fiatCurrencies.map((fiat) => (
                    <option key={fiat.code} value={fiat.code}>
                      {fiat.code} - {fiat.name}
                    </option>
                  ))}
                </select>
              ) : (
                <select
                  value={selectedCrypto}
                  onChange={(e) => setSelectedCrypto(e.target.value)}
                  className="w-40 px-3 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary/50 transition-colors appearance-none cursor-pointer text-sm"
                >
                  {prices.slice(0, 20).map((coin) => (
                    <option key={coin.id} value={coin.id}>
                      {coin.symbol.toUpperCase()} - {coin.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          {/* Exchange Rate Info */}
          {selectedCoin && selectedFiatCurrency && (
            <div className="bg-white/5 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-text-secondary text-sm mb-2">سعر الصرف الحالي</div>
                  <div className="text-white font-bold">
                    1 {selectedCoin.symbol.toUpperCase()} = {(selectedCoin.current_price * selectedFiatCurrency.rate).toLocaleString('en-US', { maximumFractionDigits: 2 })} {selectedFiatCurrency.code}
                  </div>
                </div>
                <div className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-bold ${selectedCoin.price_change_percentage_24h >= 0 ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
                  {selectedCoin.price_change_percentage_24h >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {selectedCoin.price_change_percentage_24h >= 0 ? '+' : ''}{selectedCoin.price_change_percentage_24h?.toFixed(2)}%
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Quick Conversion Table */}
        <motion.div
          className="glass-card overflow-hidden mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="p-4 border-b border-white/10">
            <h3 className="text-white font-bold">جدول التحويل السريع</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="text-right p-3 text-text-secondary text-xs font-medium">العملة</th>
                  {fiatCurrencies.slice(0, 5).map((fiat) => (
                    <th key={fiat.code} className="text-right p-3 text-text-secondary text-xs font-medium">{fiat.code}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {prices.slice(0, 8).map((coin) => (
                  <tr key={coin.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <img src={coin.image} alt={coin.name} className="w-5 h-5 rounded-full" />
                        <span className="text-white text-sm font-medium">{coin.symbol.toUpperCase()}</span>
                      </div>
                    </td>
                    {fiatCurrencies.slice(0, 5).map((fiat) => (
                      <td key={fiat.code} className="p-3 text-white text-xs font-medium">
                        {(coin.current_price * fiat.rate).toLocaleString('en-US', { maximumFractionDigits: 2 })}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
