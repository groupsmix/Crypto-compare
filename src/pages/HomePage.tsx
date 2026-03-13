import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Zap, Award, Star, ExternalLink, Users, BarChart3, TrendingUp, ChevronRight } from 'lucide-react';
import SEOHead from '../components/seo/SEOHead';
import { exchanges, getTopExchanges } from '../data/exchanges';
import { trackAffiliateClick } from '../hooks/useAffiliateTracker';

const topExchanges = getTopExchanges(3);

export default function HomePage() {
  return (
    <>
      <SEOHead
        seo={{
          title: 'CryptoRank — Best Crypto Exchange Reviews & Comparisons 2026',
          description: 'Find the best cryptocurrency exchange for your needs. Compare fees, features, and security across Binance, Bybit, OKX, Coinbase, Kraken, and more. AI-powered recommendations.',
          keywords: ['best crypto exchange', 'cryptocurrency exchange comparison', 'crypto trading platform', 'binance review', 'bybit review', 'crypto affiliate', 'exchange fees comparison'],
          structuredData: {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'CryptoRank',
            description: 'Best Crypto Exchange Reviews & Comparisons',
            url: 'https://cryptorank.com',
          },
        }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-yellow-500/5 dark:from-orange-500/10 dark:to-yellow-500/10" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300 text-sm font-medium mb-6">
              <Zap className="w-3.5 h-3.5" />
              Updated for 2026 — AI-Powered Rankings
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
              Find the{' '}
              <span className="bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
                Perfect Crypto Exchange
              </span>{' '}
              for You
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Compare fees, features, and security across the world's top cryptocurrency exchanges. Our AI-powered tools help you make the smartest choice.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/recommender"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all hover:-translate-y-0.5"
              >
                <Zap className="w-5 h-5" />
                AI Recommender Quiz
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/compare"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
              >
                Compare Exchanges
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-y border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center gap-1">
              <Users className="w-5 h-5 text-orange-500 mb-1" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">500K+</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Monthly Visitors</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Shield className="w-5 h-5 text-orange-500 mb-1" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">7</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Verified Exchanges</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <BarChart3 className="w-5 h-5 text-orange-500 mb-1" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">50+</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Metrics Compared</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <TrendingUp className="w-5 h-5 text-orange-500 mb-1" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">2026</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Updated Rankings</span>
            </div>
          </div>
        </div>
      </section>

      {/* Top Exchanges */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Top Rated Exchanges
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Our expert-reviewed and AI-ranked top cryptocurrency exchanges for 2026.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {topExchanges.map((exchange, index) => (
            <div
              key={exchange.id}
              className="relative group bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 hover:border-orange-300 dark:hover:border-orange-700 hover:shadow-xl hover:shadow-orange-500/5 transition-all"
            >
              {index === 0 && (
                <div className="absolute -top-3 left-6 px-3 py-1 bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-xs font-bold rounded-full">
                  #1 RATED
                </div>
              )}

              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-2xl font-bold text-orange-500">
                  {exchange.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-bold">{exchange.name}</h3>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.round(exchange.rating)
                            ? 'text-yellow-500 fill-yellow-500'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-500 ml-1">{exchange.rating}</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                {exchange.shortDescription}
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-2.5">
                  <div className="text-xs text-gray-500 dark:text-gray-400">Trading Fee</div>
                  <div className="text-sm font-semibold">{exchange.makerFee}%</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-2.5">
                  <div className="text-xs text-gray-500 dark:text-gray-400">Coins</div>
                  <div className="text-sm font-semibold">{exchange.supportedCryptos}+</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-2.5">
                  <div className="text-xs text-gray-500 dark:text-gray-400">Score</div>
                  <div className="text-sm font-semibold text-orange-500">{exchange.overallScore}/100</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-2.5">
                  <div className="text-xs text-gray-500 dark:text-gray-400">Users</div>
                  <div className="text-sm font-semibold">{exchange.users}</div>
                </div>
              </div>

              <div className="flex gap-2">
                <a
                  href={exchange.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackAffiliateClick(exchange.id, 'homepage_top')}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all"
                >
                  Visit {exchange.name}
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <Link
                  to={`/exchange/${exchange.id}`}
                  className="inline-flex items-center justify-center px-4 py-2.5 bg-gray-100 dark:bg-gray-800 text-sm font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  Review
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/exchanges"
            className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 font-medium transition-colors"
          >
            View All Exchanges
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Full Exchange Comparison Table */}
      <section className="bg-gray-50 dark:bg-gray-900/50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Quick Comparison
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              At-a-glance comparison of all exchanges we review.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left px-4 py-3 font-semibold">Exchange</th>
                  <th className="text-center px-4 py-3 font-semibold">Score</th>
                  <th className="text-center px-4 py-3 font-semibold">Trading Fee</th>
                  <th className="text-center px-4 py-3 font-semibold">Coins</th>
                  <th className="text-center px-4 py-3 font-semibold">Futures</th>
                  <th className="text-center px-4 py-3 font-semibold">Staking</th>
                  <th className="text-right px-4 py-3 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {exchanges.map((exchange) => (
                  <tr key={exchange.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="px-4 py-3">
                      <Link to={`/exchange/${exchange.id}`} className="flex items-center gap-3 font-medium hover:text-orange-500 transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-sm font-bold text-orange-500">
                          {exchange.name.charAt(0)}
                        </div>
                        {exchange.name}
                      </Link>
                    </td>
                    <td className="text-center px-4 py-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-orange-100 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300">
                        {exchange.overallScore}/100
                      </span>
                    </td>
                    <td className="text-center px-4 py-3">{exchange.makerFee}%</td>
                    <td className="text-center px-4 py-3">{exchange.supportedCryptos}+</td>
                    <td className="text-center px-4 py-3">
                      {exchange.futures ? (
                        <span className="text-green-500">Yes</span>
                      ) : (
                        <span className="text-gray-400">No</span>
                      )}
                    </td>
                    <td className="text-center px-4 py-3">
                      {exchange.staking ? (
                        <span className="text-green-500">Yes</span>
                      ) : (
                        <span className="text-gray-400">No</span>
                      )}
                    </td>
                    <td className="text-right px-4 py-3">
                      <a
                        href={exchange.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackAffiliateClick(exchange.id, 'homepage_table')}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold rounded-lg transition-colors"
                      >
                        Visit <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Why Trust CryptoRank?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            We use data-driven analysis and AI to deliver unbiased exchange reviews.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-orange-100 dark:bg-orange-950/50 flex items-center justify-center">
              <Shield className="w-7 h-7 text-orange-500" />
            </div>
            <h3 className="text-lg font-bold mb-2">Independent Reviews</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Every exchange is rigorously tested across 50+ metrics including security, fees, user experience, and customer support.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-orange-100 dark:bg-orange-950/50 flex items-center justify-center">
              <Zap className="w-7 h-7 text-orange-500" />
            </div>
            <h3 className="text-lg font-bold mb-2">AI-Powered Insights</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Our AI recommender analyzes your needs and matches you with the perfect exchange. Smart, fast, and personalized.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-orange-100 dark:bg-orange-950/50 flex items-center justify-center">
              <Award className="w-7 h-7 text-orange-500" />
            </div>
            <h3 className="text-lg font-bold mb-2">Always Updated</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Our rankings and reviews are continuously updated with the latest data, fee changes, and platform updates for 2026.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-orange-500 to-yellow-500 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Not Sure Which Exchange to Choose?
          </h2>
          <p className="text-lg text-orange-100 mb-8 max-w-xl mx-auto">
            Take our 2-minute AI quiz and get a personalized recommendation based on your trading needs.
          </p>
          <Link
            to="/recommender"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-orange-600 font-bold rounded-xl hover:shadow-xl transition-all hover:-translate-y-0.5"
          >
            Start AI Quiz
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
