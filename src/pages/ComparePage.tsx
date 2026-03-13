import { useState } from 'react';
import { Check, X, ExternalLink } from 'lucide-react';
import SEOHead from '../components/seo/SEOHead';
import { exchanges } from '../data/exchanges';
import { trackAffiliateClick } from '../hooks/useAffiliateTracker';
import { Exchange } from '../types';

export default function ComparePage() {
  const [selected, setSelected] = useState<string[]>(['binance', 'bybit', 'okx']);

  const toggleExchange = (id: string) => {
    if (selected.includes(id)) {
      if (selected.length > 2) setSelected(selected.filter((s) => s !== id));
    } else {
      if (selected.length < 4) setSelected([...selected, id]);
    }
  };

  const selectedExchanges = selected
    .map((id) => exchanges.find((e) => e.id === id))
    .filter(Boolean) as Exchange[];

  const BoolCell = ({ value }: { value: boolean }) => (
    value ? <Check className="w-4 h-4 text-green-500 mx-auto" /> : <X className="w-4 h-4 text-red-400 mx-auto" />
  );

  const ScoreCell = ({ value, best }: { value: number; best: number }) => (
    <span className={`font-semibold ${value === best ? 'text-green-500' : ''}`}>{value}</span>
  );

  const getBest = (key: keyof Exchange) => {
    return Math.max(...selectedExchanges.map((e) => Number(e[key])));
  };

  const getLowest = (key: 'makerFee' | 'takerFee') => {
    return Math.min(...selectedExchanges.map((e) => e[key]));
  };

  return (
    <>
      <SEOHead
        seo={{
          title: 'Compare Crypto Exchanges Side by Side — CryptoRank 2026',
          description: 'Compare cryptocurrency exchanges side by side. See fees, features, security scores, and more to find the best platform for you.',
          keywords: ['compare crypto exchanges', 'exchange comparison', 'crypto fees comparison', 'binance vs bybit', 'best exchange comparison'],
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Compare Exchanges</h1>
          <p className="text-gray-600 dark:text-gray-400">Select 2-4 exchanges to compare side by side.</p>
        </div>

        {/* Exchange Selector */}
        <div className="flex flex-wrap gap-2 mb-8">
          {exchanges.map((exchange) => (
            <button
              key={exchange.id}
              onClick={() => toggleExchange(exchange.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                selected.includes(exchange.id)
                  ? 'bg-orange-50 dark:bg-orange-950/50 border-orange-300 dark:border-orange-700 text-orange-600 dark:text-orange-400'
                  : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              <div className="w-6 h-6 rounded bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs font-bold text-orange-500">
                {exchange.name.charAt(0)}
              </div>
              {exchange.name}
            </button>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50">
                <th className="text-left px-4 py-4 font-semibold w-48 border-b border-gray-200 dark:border-gray-700">Feature</th>
                {selectedExchanges.map((e) => (
                  <th key={e.id} className="text-center px-4 py-4 border-b border-gray-200 dark:border-gray-700 min-w-36">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-lg font-bold text-orange-500">
                        {e.name.charAt(0)}
                      </div>
                      <span className="font-bold">{e.name}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <td className="px-4 py-3 font-medium text-gray-500">Overall Score</td>
                {selectedExchanges.map((e) => (
                  <td key={e.id} className="text-center px-4 py-3">
                    <span className={`text-lg font-bold ${e.overallScore === getBest('overallScore') ? 'text-green-500' : ''}`}>
                      {e.overallScore}/100
                    </span>
                  </td>
                ))}
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20">
                <td className="px-4 py-3 font-medium text-gray-500">Rating</td>
                {selectedExchanges.map((e) => (
                  <td key={e.id} className="text-center px-4 py-3">
                    <ScoreCell value={e.rating} best={getBest('rating')} />
                    <span className="text-gray-400">/5</span>
                  </td>
                ))}
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <td className="px-4 py-3 font-medium text-gray-500">Maker Fee</td>
                {selectedExchanges.map((e) => (
                  <td key={e.id} className="text-center px-4 py-3">
                    <span className={`font-semibold ${e.makerFee === getLowest('makerFee') ? 'text-green-500' : ''}`}>
                      {e.makerFee}%
                    </span>
                  </td>
                ))}
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20">
                <td className="px-4 py-3 font-medium text-gray-500">Taker Fee</td>
                {selectedExchanges.map((e) => (
                  <td key={e.id} className="text-center px-4 py-3">
                    <span className={`font-semibold ${e.takerFee === getLowest('takerFee') ? 'text-green-500' : ''}`}>
                      {e.takerFee}%
                    </span>
                  </td>
                ))}
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <td className="px-4 py-3 font-medium text-gray-500">Cryptocurrencies</td>
                {selectedExchanges.map((e) => (
                  <td key={e.id} className="text-center px-4 py-3">
                    <ScoreCell value={e.supportedCryptos} best={getBest('supportedCryptos')} />
                  </td>
                ))}
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20">
                <td className="px-4 py-3 font-medium text-gray-500">Trading Pairs</td>
                {selectedExchanges.map((e) => (
                  <td key={e.id} className="text-center px-4 py-3">
                    <ScoreCell value={e.tradingPairs} best={getBest('tradingPairs')} />
                  </td>
                ))}
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <td className="px-4 py-3 font-medium text-gray-500">Users</td>
                {selectedExchanges.map((e) => (
                  <td key={e.id} className="text-center px-4 py-3 font-semibold">{e.users}</td>
                ))}
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20">
                <td className="px-4 py-3 font-medium text-gray-500">Daily Volume</td>
                {selectedExchanges.map((e) => (
                  <td key={e.id} className="text-center px-4 py-3 font-semibold">{e.dailyVolume}</td>
                ))}
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <td className="px-4 py-3 font-medium text-gray-500">Founded</td>
                {selectedExchanges.map((e) => (
                  <td key={e.id} className="text-center px-4 py-3 font-semibold">{e.founded}</td>
                ))}
              </tr>

              {/* Scores */}
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-4 py-3 font-bold text-orange-500" colSpan={selectedExchanges.length + 1}>Scores</td>
              </tr>
              {(['feesScore', 'securityScore', 'easeOfUseScore', 'featuresScore', 'supportScore'] as (keyof Exchange)[]).map((key) => {
                const labels: Record<string, string> = { feesScore: 'Fees Score', securityScore: 'Security Score', easeOfUseScore: 'Ease of Use', featuresScore: 'Features Score', supportScore: 'Support Score' };
                return (
                  <tr key={key} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="px-4 py-3 font-medium text-gray-500">{labels[key]}</td>
                    {selectedExchanges.map((e) => (
                      <td key={e.id} className="text-center px-4 py-3">
                        <ScoreCell value={Number(e[key])} best={getBest(key)} />
                      </td>
                    ))}
                  </tr>
                );
              })}

              {/* Features */}
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-4 py-3 font-bold text-orange-500" colSpan={selectedExchanges.length + 1}>Features</td>
              </tr>
              {(['futures', 'marginTrading', 'staking', 'nft', 'mobileApp'] as (keyof Exchange)[]).map((key) => {
                const labels: Record<string, string> = { futures: 'Futures', marginTrading: 'Margin Trading', staking: 'Staking', nft: 'NFT Marketplace', mobileApp: 'Mobile App' };
                return (
                  <tr key={key} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="px-4 py-3 font-medium text-gray-500">{labels[key]}</td>
                    {selectedExchanges.map((e) => (
                      <td key={e.id} className="text-center px-4 py-3">
                        <BoolCell value={Boolean(e[key])} />
                      </td>
                    ))}
                  </tr>
                );
              })}

              {/* Visit Buttons */}
              <tr>
                <td className="px-4 py-4"></td>
                {selectedExchanges.map((e) => (
                  <td key={e.id} className="text-center px-4 py-4">
                    <a
                      href={e.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackAffiliateClick(e.id, 'compare_table')}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all"
                    >
                      Visit <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
