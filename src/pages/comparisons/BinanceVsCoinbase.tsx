import { Link } from 'react-router-dom';
import { ExternalLink, Star, Shield, DollarSign, Users, Zap, ArrowLeft } from 'lucide-react';
import SEOHead from '../../components/seo/SEOHead';
import { getExchangeById } from '../../data/exchanges';
import { trackAffiliateClick } from '../../hooks/useAffiliateTracker';
import NewsletterSignup from '../../components/NewsletterSignup';

export default function BinanceVsCoinbase() {
  const binance = getExchangeById('binance')!;
  const coinbase = getExchangeById('coinbase')!;

  return (
    <>
      <SEOHead
        seo={{
          title: 'Binance vs Coinbase 2026: Complete Comparison — CryptoRanked',
          description: 'Binance vs Coinbase head-to-head comparison. Compare fees, features, security, and more to find which exchange is best for you in 2026.',
          keywords: ['binance vs coinbase', 'crypto exchange comparison', 'best exchange 2026', 'binance review', 'coinbase review'],
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/compare" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-orange-500 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Comparisons
        </Link>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
          <span className="bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">Binance vs Coinbase</span> — Which is Better in 2026?
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-3xl">
          The world's largest exchange by volume vs the most trusted US exchange. Here's a detailed breakdown to help you decide.
        </p>

        {/* Quick Verdict */}
        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-950/30 dark:to-yellow-950/30 rounded-2xl p-6 mb-10 border border-orange-200 dark:border-orange-800">
          <h2 className="text-lg font-bold mb-2">Quick Verdict</h2>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>Choose Binance</strong> if you want the lowest fees, widest coin selection, and advanced trading tools.{' '}
            <strong>Choose Coinbase</strong> if you're a beginner in the US wanting the simplest, most regulated experience.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800 mb-10">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                <th className="text-left px-6 py-4 font-semibold">Feature</th>
                <th className="text-center px-6 py-4 font-semibold">Binance</th>
                <th className="text-center px-6 py-4 font-semibold">Coinbase</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              <tr><td className="px-6 py-3 font-medium">Overall Score</td><td className="px-6 py-3 text-center font-bold text-orange-500">{binance.overallScore}/100</td><td className="px-6 py-3 text-center font-bold text-orange-500">{coinbase.overallScore}/100</td></tr>
              <tr><td className="px-6 py-3 font-medium">Trading Fee (Spot)</td><td className="px-6 py-3 text-center text-green-500 font-semibold">{binance.spotFee}</td><td className="px-6 py-3 text-center text-red-500">{coinbase.spotFee}</td></tr>
              <tr><td className="px-6 py-3 font-medium">Supported Coins</td><td className="px-6 py-3 text-center font-semibold">{binance.supportedCryptos}+</td><td className="px-6 py-3 text-center">{coinbase.supportedCryptos}+</td></tr>
              <tr><td className="px-6 py-3 font-medium">Users</td><td className="px-6 py-3 text-center">{binance.users}</td><td className="px-6 py-3 text-center">{coinbase.users}</td></tr>
              <tr><td className="px-6 py-3 font-medium">Futures Trading</td><td className="px-6 py-3 text-center text-green-500">Yes (125x)</td><td className="px-6 py-3 text-center text-gray-400">No</td></tr>
              <tr><td className="px-6 py-3 font-medium">Staking</td><td className="px-6 py-3 text-center text-green-500">Yes</td><td className="px-6 py-3 text-center text-green-500">Yes</td></tr>
              <tr><td className="px-6 py-3 font-medium">Security Score</td><td className="px-6 py-3 text-center">{binance.securityScore}/100</td><td className="px-6 py-3 text-center font-semibold text-green-500">{coinbase.securityScore}/100</td></tr>
              <tr><td className="px-6 py-3 font-medium">Ease of Use</td><td className="px-6 py-3 text-center">{binance.easeOfUseScore}/100</td><td className="px-6 py-3 text-center font-semibold text-green-500">{coinbase.easeOfUseScore}/100</td></tr>
              <tr><td className="px-6 py-3 font-medium">Regulation</td><td className="px-6 py-3 text-center">Varies by region</td><td className="px-6 py-3 text-center font-semibold text-green-500">Fully US regulated</td></tr>
              <tr><td className="px-6 py-3 font-medium">Founded</td><td className="px-6 py-3 text-center">{binance.founded}</td><td className="px-6 py-3 text-center">{coinbase.founded}</td></tr>
            </tbody>
          </table>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-8 mb-10">
          <section>
            <h2 className="text-2xl font-bold mb-3 flex items-center gap-2"><DollarSign className="w-6 h-6 text-orange-500" /> Fees Comparison</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Binance wins decisively on fees. At 0.1% for both maker and taker, Binance's fees are 4-6x lower than Coinbase's 0.4%/0.6%. For a $10,000 trade, you'd pay $10 on Binance vs $40-60 on Coinbase. Over time, this difference is massive. Binance also offers additional discounts when using BNB to pay fees.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3 flex items-center gap-2"><Shield className="w-6 h-6 text-orange-500" /> Security</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Coinbase edges ahead on security. As a publicly traded company (NASDAQ: COIN), Coinbase offers FDIC insurance on USD balances and maintains robust insurance coverage on crypto assets. Binance has its SAFU fund (Secure Asset Fund for Users) but faces more regulatory scrutiny. Both offer 2FA, cold storage, and address whitelisting.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3 flex items-center gap-2"><Zap className="w-6 h-6 text-orange-500" /> Features</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Binance is far more feature-rich: futures, options, margin trading, copy trading, P2P, NFT marketplace, Launchpad, and DeFi staking. Coinbase focuses on simplicity: spot trading, staking, and Coinbase Earn (learn-to-earn program). If you want advanced tools, Binance is the clear winner. If you want simplicity, Coinbase is ideal.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3 flex items-center gap-2"><Users className="w-6 h-6 text-orange-500" /> Who Should Use Which?</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
                <h3 className="font-bold mb-2">Choose Binance if you:</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1.5">
                  <li>- Want the lowest trading fees</li>
                  <li>- Need access to 350+ cryptocurrencies</li>
                  <li>- Want futures/margin trading</li>
                  <li>- Are an experienced trader</li>
                  <li>- Trade high volumes</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
                <h3 className="font-bold mb-2">Choose Coinbase if you:</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1.5">
                  <li>- Are a complete beginner</li>
                  <li>- Want US regulatory compliance</li>
                  <li>- Value insurance on your deposits</li>
                  <li>- Prefer the simplest interface</li>
                  <li>- Want to earn free crypto via learning</li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        {/* CTA Buttons */}
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          <a
            href={binance.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackAffiliateClick('binance', 'comparison_binance_vs_coinbase')}
            className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all text-lg"
          >
            Visit Binance <ExternalLink className="w-5 h-5" />
          </a>
          <a
            href={coinbase.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackAffiliateClick('coinbase', 'comparison_binance_vs_coinbase')}
            className="flex items-center justify-center gap-2 px-6 py-4 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-bold rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-all text-lg"
          >
            Visit Coinbase <ExternalLink className="w-5 h-5" />
          </a>
        </div>

        <NewsletterSignup variant="banner" className="mb-10" />

        {/* Other Comparisons */}
        <div>
          <h3 className="text-lg font-bold mb-4">Other Comparisons</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <Link to="/compare/binance-vs-bybit" className="px-4 py-3 bg-gray-50 dark:bg-gray-900 rounded-xl text-sm font-medium hover:bg-orange-50 dark:hover:bg-orange-950/30 hover:text-orange-500 transition-colors border border-gray-200 dark:border-gray-800">Binance vs Bybit</Link>
            <Link to="/compare/binance-vs-okx" className="px-4 py-3 bg-gray-50 dark:bg-gray-900 rounded-xl text-sm font-medium hover:bg-orange-50 dark:hover:bg-orange-950/30 hover:text-orange-500 transition-colors border border-gray-200 dark:border-gray-800">Binance vs OKX</Link>
            <Link to="/compare/coinbase-vs-kraken" className="px-4 py-3 bg-gray-50 dark:bg-gray-900 rounded-xl text-sm font-medium hover:bg-orange-50 dark:hover:bg-orange-950/30 hover:text-orange-500 transition-colors border border-gray-200 dark:border-gray-800">Coinbase vs Kraken</Link>
            <Link to="/compare/bybit-vs-bitget" className="px-4 py-3 bg-gray-50 dark:bg-gray-900 rounded-xl text-sm font-medium hover:bg-orange-50 dark:hover:bg-orange-950/30 hover:text-orange-500 transition-colors border border-gray-200 dark:border-gray-800">Bybit vs Bitget</Link>
            <Link to="/compare/kucoin-vs-okx" className="px-4 py-3 bg-gray-50 dark:bg-gray-900 rounded-xl text-sm font-medium hover:bg-orange-50 dark:hover:bg-orange-950/30 hover:text-orange-500 transition-colors border border-gray-200 dark:border-gray-800">KuCoin vs OKX</Link>
          </div>
        </div>
      </div>
    </>
  );
}
