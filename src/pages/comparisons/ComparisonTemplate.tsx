import { Link } from 'react-router-dom';
import { ExternalLink, ArrowLeft, DollarSign, Shield, Zap, Users } from 'lucide-react';
import SEOHead from '../../components/seo/SEOHead';
import { getExchangeById } from '../../data/exchanges';
import { trackAffiliateClick } from '../../hooks/useAffiliateTracker';
import { Exchange } from '../../types';
import NewsletterSignup from '../../components/NewsletterSignup';

interface ComparisonRow {
  label: string;
  getValue: (e: Exchange) => string;
  winner?: 'a' | 'b' | 'tie';
}

interface ComparisonTemplateProps {
  exchangeAId: string;
  exchangeBId: string;
  verdict: string;
  chooseA: string[];
  chooseB: string[];
  feesAnalysis: string;
  securityAnalysis: string;
  featuresAnalysis: string;
}

export default function ComparisonTemplate({
  exchangeAId,
  exchangeBId,
  verdict,
  chooseA,
  chooseB,
  feesAnalysis,
  securityAnalysis,
  featuresAnalysis,
}: ComparisonTemplateProps) {
  const a = getExchangeById(exchangeAId)!;
  const b = getExchangeById(exchangeBId)!;

  const rows: ComparisonRow[] = [
    { label: 'Overall Score', getValue: (e) => `${e.overallScore}/100` },
    { label: 'Trading Fee (Spot)', getValue: (e) => e.spotFee },
    { label: 'Futures Fee', getValue: (e) => e.futuresFee },
    { label: 'Supported Coins', getValue: (e) => `${e.supportedCryptos}+` },
    { label: 'Users', getValue: (e) => e.users },
    { label: 'Max Leverage', getValue: (e) => e.leverage },
    { label: 'Futures', getValue: (e) => e.futures ? 'Yes' : 'No' },
    { label: 'Staking', getValue: (e) => e.staking ? 'Yes' : 'No' },
    { label: 'Copy Trading', getValue: (e) => e.features.includes('Copy Trading') ? 'Yes' : 'No' },
    { label: 'Security Score', getValue: (e) => `${e.securityScore}/100` },
    { label: 'Ease of Use', getValue: (e) => `${e.easeOfUseScore}/100` },
    { label: 'Min Deposit', getValue: (e) => e.minDeposit },
    { label: 'Founded', getValue: (e) => `${e.founded}` },
    { label: 'HQ', getValue: (e) => e.headquarters },
  ];

  const allComparisons = [
    { label: 'Binance vs Coinbase', path: '/compare/binance-vs-coinbase' },
    { label: 'Binance vs Bybit', path: '/compare/binance-vs-bybit' },
    { label: 'Binance vs OKX', path: '/compare/binance-vs-okx' },
    { label: 'Bybit vs Bitget', path: '/compare/bybit-vs-bitget' },
    { label: 'Coinbase vs Kraken', path: '/compare/coinbase-vs-kraken' },
    { label: 'KuCoin vs OKX', path: '/compare/kucoin-vs-okx' },
  ].filter((c) => !c.path.includes(exchangeAId) || !c.path.includes(exchangeBId));

  return (
    <>
      <SEOHead
        seo={{
          title: `${a.name} vs ${b.name} 2026: Complete Comparison — CryptoRanked`,
          description: `${a.name} vs ${b.name} head-to-head comparison. Compare fees, features, security, and more to find which exchange is best for you in 2026.`,
          keywords: [`${a.name.toLowerCase()} vs ${b.name.toLowerCase()}`, 'crypto exchange comparison', 'best exchange 2026'],
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/compare" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-orange-500 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Comparisons
        </Link>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
          <span className="bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">{a.name} vs {b.name}</span> — Which is Better in 2026?
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-3xl">
          {a.shortDescription} vs {b.shortDescription} Here's a detailed breakdown.
        </p>

        {/* Quick Verdict */}
        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-950/30 dark:to-yellow-950/30 rounded-2xl p-6 mb-10 border border-orange-200 dark:border-orange-800">
          <h2 className="text-lg font-bold mb-2">Quick Verdict</h2>
          <p className="text-gray-700 dark:text-gray-300">{verdict}</p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800 mb-10">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                <th className="text-left px-6 py-4 font-semibold">Feature</th>
                <th className="text-center px-6 py-4 font-semibold">{a.name}</th>
                <th className="text-center px-6 py-4 font-semibold">{b.name}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {rows.map((row) => (
                <tr key={row.label}>
                  <td className="px-6 py-3 font-medium">{row.label}</td>
                  <td className="px-6 py-3 text-center">{row.getValue(a)}</td>
                  <td className="px-6 py-3 text-center">{row.getValue(b)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Analysis */}
        <div className="space-y-8 mb-10">
          <section>
            <h2 className="text-2xl font-bold mb-3 flex items-center gap-2"><DollarSign className="w-6 h-6 text-orange-500" /> Fees</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feesAnalysis}</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-3 flex items-center gap-2"><Shield className="w-6 h-6 text-orange-500" /> Security</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{securityAnalysis}</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-3 flex items-center gap-2"><Zap className="w-6 h-6 text-orange-500" /> Features</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{featuresAnalysis}</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-3 flex items-center gap-2"><Users className="w-6 h-6 text-orange-500" /> Who Should Use Which?</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
                <h3 className="font-bold mb-2">Choose {a.name} if you:</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1.5">
                  {chooseA.map((item, i) => <li key={i}>- {item}</li>)}
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
                <h3 className="font-bold mb-2">Choose {b.name} if you:</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1.5">
                  {chooseB.map((item, i) => <li key={i}>- {item}</li>)}
                </ul>
              </div>
            </div>
          </section>
        </div>

        {/* CTA */}
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          <a href={a.affiliateUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackAffiliateClick(a.id, `comparison_${a.id}_vs_${b.id}`)}
            className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all text-lg">
            Visit {a.name} <ExternalLink className="w-5 h-5" />
          </a>
          <a href={b.affiliateUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackAffiliateClick(b.id, `comparison_${a.id}_vs_${b.id}`)}
            className="flex items-center justify-center gap-2 px-6 py-4 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-bold rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-all text-lg">
            Visit {b.name} <ExternalLink className="w-5 h-5" />
          </a>
        </div>

        <NewsletterSignup variant="banner" className="mb-10" />

        {/* Other Comparisons */}
        <div>
          <h3 className="text-lg font-bold mb-4">Other Comparisons</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {allComparisons.map((c) => (
              <Link key={c.path} to={c.path} className="px-4 py-3 bg-gray-50 dark:bg-gray-900 rounded-xl text-sm font-medium hover:bg-orange-50 dark:hover:bg-orange-950/30 hover:text-orange-500 transition-colors border border-gray-200 dark:border-gray-800">
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
