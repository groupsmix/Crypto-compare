import { useState, useMemo } from 'react';
import { Calculator, ArrowRight, TrendingUp } from 'lucide-react';
import SEOHead from '../components/seo/SEOHead';
import { exchanges } from '../data/exchanges';

export default function CalculatorPage() {
  const [tradeAmount, setTradeAmount] = useState(1000);
  const [tradeType, setTradeType] = useState<'maker' | 'taker'>('taker');
  const [tradesPerMonth, setTradesPerMonth] = useState(10);

  const results = useMemo(() => {
    return exchanges
      .map((exchange) => {
        const feeRate = tradeType === 'maker' ? exchange.makerFee : exchange.takerFee;
        const feePerTrade = (tradeAmount * feeRate) / 100;
        const monthlyFees = feePerTrade * tradesPerMonth;
        const yearlyFees = monthlyFees * 12;
        return {
          exchange,
          feeRate,
          feePerTrade,
          monthlyFees,
          yearlyFees,
        };
      })
      .sort((a, b) => a.yearlyFees - b.yearlyFees);
  }, [tradeAmount, tradeType, tradesPerMonth]);

  const cheapest = results[0];
  const mostExpensive = results[results.length - 1];
  const savings = mostExpensive.yearlyFees - cheapest.yearlyFees;

  return (
    <>
      <SEOHead
        seo={{
          title: 'Crypto Trading Fee Calculator — Compare Exchange Costs | CryptoRank',
          description: 'Calculate and compare trading fees across top crypto exchanges. See how much you can save by choosing the right platform for your trading volume.',
          keywords: ['crypto fee calculator', 'trading fees', 'exchange fees comparison', 'crypto cost calculator'],
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 flex items-center gap-3">
            <Calculator className="w-8 h-8 text-orange-500" />
            Trading Fee Calculator
          </h1>
          <p className="text-gray-600 dark:text-gray-400">See exactly how much you'll pay in fees across different exchanges.</p>
        </div>

        {/* Calculator Inputs */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 mb-8">
          <div className="grid sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Trade Amount (USD)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                <input
                  type="number"
                  value={tradeAmount}
                  onChange={(e) => setTradeAmount(Number(e.target.value) || 0)}
                  className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500"
                />
              </div>
              <div className="flex gap-2 mt-2">
                {[100, 500, 1000, 5000, 10000].map((val) => (
                  <button
                    key={val}
                    onClick={() => setTradeAmount(val)}
                    className={`px-2 py-1 text-xs rounded-md transition-colors ${
                      tradeAmount === val
                        ? 'bg-orange-100 dark:bg-orange-950/50 text-orange-600'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    ${val.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Order Type</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setTradeType('maker')}
                  className={`flex-1 py-3 rounded-xl text-sm font-medium border transition-colors ${
                    tradeType === 'maker'
                      ? 'bg-orange-50 dark:bg-orange-950/50 border-orange-300 dark:border-orange-700 text-orange-600 dark:text-orange-400'
                      : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  Maker (Limit)
                </button>
                <button
                  onClick={() => setTradeType('taker')}
                  className={`flex-1 py-3 rounded-xl text-sm font-medium border transition-colors ${
                    tradeType === 'taker'
                      ? 'bg-orange-50 dark:bg-orange-950/50 border-orange-300 dark:border-orange-700 text-orange-600 dark:text-orange-400'
                      : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  Taker (Market)
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Trades Per Month</label>
              <input
                type="number"
                value={tradesPerMonth}
                onChange={(e) => setTradesPerMonth(Number(e.target.value) || 0)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500"
              />
              <div className="flex gap-2 mt-2">
                {[5, 10, 30, 100, 500].map((val) => (
                  <button
                    key={val}
                    onClick={() => setTradesPerMonth(val)}
                    className={`px-2 py-1 text-xs rounded-md transition-colors ${
                      tradesPerMonth === val
                        ? 'bg-orange-100 dark:bg-orange-950/50 text-orange-600'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Savings Highlight */}
        {savings > 0 && (
          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-200 dark:border-green-800 rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-green-500" />
              <div>
                <h3 className="text-lg font-bold text-green-700 dark:text-green-400">
                  Save up to ${savings.toFixed(2)}/year
                </h3>
                <p className="text-sm text-green-600 dark:text-green-500">
                  By choosing {cheapest.exchange.name} over {mostExpensive.exchange.name} based on your trading volume
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Results Table */}
        <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                <th className="text-left px-4 py-3 font-semibold">Rank</th>
                <th className="text-left px-4 py-3 font-semibold">Exchange</th>
                <th className="text-center px-4 py-3 font-semibold">Fee Rate</th>
                <th className="text-center px-4 py-3 font-semibold">Fee/Trade</th>
                <th className="text-center px-4 py-3 font-semibold">Monthly Cost</th>
                <th className="text-center px-4 py-3 font-semibold">Yearly Cost</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr
                  key={result.exchange.id}
                  className={`border-b border-gray-100 dark:border-gray-800 transition-colors ${
                    index === 0 ? 'bg-green-50/50 dark:bg-green-950/10' : ''
                  }`}
                >
                  <td className="px-4 py-3">
                    <span className={`font-bold ${index === 0 ? 'text-green-500' : 'text-gray-400'}`}>
                      #{index + 1}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-sm font-bold text-orange-500">
                        {result.exchange.name.charAt(0)}
                      </div>
                      <div>
                        <span className="font-medium">{result.exchange.name}</span>
                        {index === 0 && (
                          <span className="ml-2 text-xs text-green-600 bg-green-100 dark:bg-green-950/50 dark:text-green-400 px-2 py-0.5 rounded-full">
                            Cheapest
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="text-center px-4 py-3 font-semibold">{result.feeRate}%</td>
                  <td className="text-center px-4 py-3">${result.feePerTrade.toFixed(2)}</td>
                  <td className="text-center px-4 py-3">${result.monthlyFees.toFixed(2)}</td>
                  <td className="text-center px-4 py-3 font-semibold">
                    ${result.yearlyFees.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
          <h3 className="font-bold mb-3 flex items-center gap-2">
            <ArrowRight className="w-4 h-4 text-orange-500" />
            How to Reduce Fees Further
          </h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>Use the exchange's native token (BNB, KCS, OKB) for additional fee discounts up to 25%</li>
            <li>Increase your 30-day trading volume to qualify for VIP tier discounts</li>
            <li>Use limit orders (maker) instead of market orders (taker) for lower fees</li>
            <li>Look for sign-up bonuses and fee-free promotional periods</li>
          </ul>
        </div>
      </div>
    </>
  );
}
