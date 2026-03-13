import { useState, useMemo } from 'react';
import { Calculator, TrendingUp, DollarSign, Calendar, ArrowRight } from 'lucide-react';
import SEOHead from '../components/seo/SEOHead';
import NewsletterSignup from '../components/NewsletterSignup';

interface DCAResult {
  totalInvested: number;
  totalValue: number;
  totalCoins: number;
  profitLoss: number;
  profitLossPercent: number;
  averageCost: number;
}

const cryptoOptions = [
  { id: 'bitcoin', name: 'Bitcoin (BTC)', prices: { '2024-01': 42000, '2024-06': 65000, '2024-12': 95000, '2025-06': 85000, '2025-12': 105000, '2026-03': 92000 } },
  { id: 'ethereum', name: 'Ethereum (ETH)', prices: { '2024-01': 2300, '2024-06': 3500, '2024-12': 3800, '2025-06': 3200, '2025-12': 4200, '2026-03': 3600 } },
  { id: 'solana', name: 'Solana (SOL)', prices: { '2024-01': 100, '2024-06': 160, '2024-12': 220, '2025-06': 180, '2025-12': 250, '2026-03': 195 } },
];

export default function DCACalculatorPage() {
  const [amount, setAmount] = useState<number>(100);
  const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [duration, setDuration] = useState<number>(12);
  const [selectedCrypto, setSelectedCrypto] = useState(cryptoOptions[0]);

  const result = useMemo<DCAResult>(() => {
    const prices = Object.values(selectedCrypto.prices);
    const currentPrice = prices[prices.length - 1];
    let intervals: number;

    switch (frequency) {
      case 'daily': intervals = duration * 30; break;
      case 'weekly': intervals = duration * 4; break;
      case 'monthly': intervals = duration; break;
    }

    const totalInvested = amount * intervals;

    // Simulate DCA by spreading purchases across available price points
    let totalCoins = 0;
    for (let i = 0; i < intervals; i++) {
      const priceIndex = Math.floor((i / intervals) * prices.length);
      const price = prices[Math.min(priceIndex, prices.length - 1)];
      // Add some variance to simulate more realistic pricing
      const variance = 1 + (Math.sin(i * 0.7) * 0.08);
      totalCoins += amount / (price * variance);
    }

    const totalValue = totalCoins * currentPrice;
    const profitLoss = totalValue - totalInvested;
    const profitLossPercent = totalInvested > 0 ? (profitLoss / totalInvested) * 100 : 0;
    const averageCost = totalCoins > 0 ? totalInvested / totalCoins : 0;

    return { totalInvested, totalValue, totalCoins, profitLoss, profitLossPercent, averageCost };
  }, [amount, frequency, duration, selectedCrypto]);

  return (
    <>
      <SEOHead
        seo={{
          title: 'DCA Calculator — Dollar Cost Averaging Crypto Calculator | CryptoRanked',
          description: 'Calculate your potential returns with Dollar Cost Averaging (DCA) in cryptocurrency. See how regular investments in Bitcoin, Ethereum, and Solana could grow over time.',
          keywords: ['DCA calculator', 'dollar cost averaging', 'crypto calculator', 'bitcoin DCA', 'investment calculator'],
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300 text-sm font-medium mb-4">
            <Calculator className="w-3.5 h-3.5" />
            Investment Tool
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">DCA Calculator</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            See how Dollar Cost Averaging could grow your crypto investment over time. No timing the market needed.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <h2 className="text-lg font-bold mb-6">Configure Your DCA Plan</h2>

            <div className="space-y-5">
              {/* Crypto Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">Cryptocurrency</label>
                <div className="grid grid-cols-3 gap-2">
                  {cryptoOptions.map((crypto) => (
                    <button
                      key={crypto.id}
                      onClick={() => setSelectedCrypto(crypto)}
                      className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        selectedCrypto.id === crypto.id
                          ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      {crypto.name.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  <DollarSign className="w-4 h-4 inline mr-1" />
                  Investment Amount (USD)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Math.max(1, Number(e.target.value)))}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-lg font-semibold focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  min="1"
                />
                <div className="flex gap-2 mt-2">
                  {[25, 50, 100, 250, 500].map((v) => (
                    <button
                      key={v}
                      onClick={() => setAmount(v)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                        amount === v
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      ${v}
                    </button>
                  ))}
                </div>
              </div>

              {/* Frequency */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Frequency
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['daily', 'weekly', 'monthly'] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setFrequency(f)}
                      className={`px-3 py-2.5 rounded-xl text-sm font-medium capitalize transition-all ${
                        frequency === f
                          ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Duration: <span className="text-orange-500 font-bold">{duration} months</span>
                </label>
                <input
                  type="range"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  min="1"
                  max="36"
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>1 month</span>
                  <span>12 months</span>
                  <span>36 months</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl p-6 text-white">
              <h2 className="text-lg font-bold mb-4 opacity-90">Estimated Results</h2>
              <div className="text-4xl font-extrabold mb-1">
                ${result.totalValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </div>
              <div className={`text-lg font-semibold ${result.profitLoss >= 0 ? 'text-green-200' : 'text-red-200'}`}>
                {result.profitLoss >= 0 ? '+' : ''}{result.profitLossPercent.toFixed(1)}% ({result.profitLoss >= 0 ? '+' : ''}${result.profitLoss.toLocaleString(undefined, { maximumFractionDigits: 2 })})
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
                <div className="text-xs text-gray-500 mb-1">Total Invested</div>
                <div className="text-xl font-bold">${result.totalInvested.toLocaleString()}</div>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
                <div className="text-xs text-gray-500 mb-1">Average Cost</div>
                <div className="text-xl font-bold">${result.averageCost.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
                <div className="text-xs text-gray-500 mb-1">Total {selectedCrypto.name.split('(')[1]?.replace(')', '') || 'Coins'}</div>
                <div className="text-xl font-bold">{result.totalCoins.toFixed(6)}</div>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
                <div className="text-xs text-gray-500 mb-1">Purchases</div>
                <div className="text-xl font-bold">
                  {frequency === 'daily' ? duration * 30 : frequency === 'weekly' ? duration * 4 : duration}
                </div>
              </div>
            </div>

            <div className="bg-orange-50 dark:bg-orange-950/30 rounded-xl p-4 border border-orange-200 dark:border-orange-800">
              <p className="text-xs text-orange-700 dark:text-orange-300">
                <strong>Disclaimer:</strong> This calculator uses simplified historical price data for educational purposes only. Actual returns will vary. Past performance does not guarantee future results. Always do your own research before investing.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-orange-500" />
                Start Your DCA Strategy
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Set up automatic recurring purchases on these exchanges:
              </p>
              <div className="space-y-2">
                <a href="https://www.binance.com/register?ref=CRANKED" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between px-4 py-2.5 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-950/30 transition-colors group">
                  <span className="text-sm font-medium">Binance Auto-Invest</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-orange-500" />
                </a>
                <a href="https://www.bybit.com/invite?ref=5GGJYKB" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between px-4 py-2.5 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-950/30 transition-colors group">
                  <span className="text-sm font-medium">Bybit DCA Bot</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-orange-500" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <NewsletterSignup variant="banner" />
        </div>
      </div>
    </>
  );
}
