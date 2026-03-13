import { useParams, Link } from 'react-router-dom';
import { Star, ExternalLink, Shield, Check, X, ArrowLeft, Zap, Award, Globe, Calendar, Users, BarChart3 } from 'lucide-react';
import SEOHead from '../components/seo/SEOHead';
import { getExchangeById } from '../data/exchanges';
import { trackAffiliateClick } from '../hooks/useAffiliateTracker';

export default function ExchangeReviewPage() {
  const { id } = useParams<{ id: string }>();
  const exchange = getExchangeById(id || '');

  if (!exchange) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Exchange Not Found</h1>
        <Link to="/exchanges" className="text-orange-500 hover:underline">Back to all exchanges</Link>
      </div>
    );
  }

  const scoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 80) return 'text-yellow-500';
    return 'text-orange-500';
  };

  const scoreBarWidth = (score: number) => `${score}%`;

  return (
    <>
      <SEOHead
        seo={{
          title: `${exchange.name} Review 2026 — Fees, Security & Features | CryptoRank`,
          description: `Detailed ${exchange.name} review for 2026. Compare fees (${exchange.makerFee}% maker), security features, ${exchange.supportedCryptos}+ coins, and more. Is ${exchange.name} right for you?`,
          keywords: [`${exchange.name.toLowerCase()} review`, `${exchange.name.toLowerCase()} fees`, `${exchange.name.toLowerCase()} security`, 'crypto exchange review', 'best crypto exchange'],
          structuredData: {
            '@context': 'https://schema.org',
            '@type': 'Review',
            itemReviewed: {
              '@type': 'Organization',
              name: exchange.name,
              url: exchange.url,
            },
            reviewRating: {
              '@type': 'Rating',
              ratingValue: exchange.rating,
              bestRating: 5,
            },
            author: { '@type': 'Organization', name: 'CryptoRank' },
          },
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/exchanges" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-orange-500 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Exchanges
        </Link>

        {/* Header */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-3xl font-bold text-orange-500">
              {exchange.name.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">{exchange.name}</h1>
                <span className="px-3 py-1 bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 text-sm font-semibold rounded-full">
                  {exchange.overallScore}/100
                </span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.round(exchange.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300 dark:text-gray-600'
                    }`}
                  />
                ))}
                <span className="text-gray-500 ml-1">{exchange.rating} / 5.0</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">{exchange.shortDescription}</p>
            </div>
            <a
              href={exchange.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackAffiliateClick(exchange.id, 'review_header')}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all whitespace-nowrap"
            >
              Visit {exchange.name} <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8">
              <h2 className="text-xl font-bold mb-4">Overview</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{exchange.description}</p>
            </div>

            {/* Key Stats */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8">
              <h2 className="text-xl font-bold mb-6">Key Statistics</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                  <Calendar className="w-5 h-5 text-orange-500 mb-2" />
                  <div className="text-xs text-gray-500 mb-1">Founded</div>
                  <div className="font-semibold">{exchange.founded}</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                  <Globe className="w-5 h-5 text-orange-500 mb-2" />
                  <div className="text-xs text-gray-500 mb-1">Headquarters</div>
                  <div className="font-semibold text-sm">{exchange.headquarters}</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                  <Users className="w-5 h-5 text-orange-500 mb-2" />
                  <div className="text-xs text-gray-500 mb-1">Users</div>
                  <div className="font-semibold">{exchange.users}</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                  <BarChart3 className="w-5 h-5 text-orange-500 mb-2" />
                  <div className="text-xs text-gray-500 mb-1">Daily Volume</div>
                  <div className="font-semibold">{exchange.dailyVolume}</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                  <Zap className="w-5 h-5 text-orange-500 mb-2" />
                  <div className="text-xs text-gray-500 mb-1">Trading Pairs</div>
                  <div className="font-semibold">{exchange.tradingPairs}+</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                  <Award className="w-5 h-5 text-orange-500 mb-2" />
                  <div className="text-xs text-gray-500 mb-1">Min Deposit</div>
                  <div className="font-semibold">{exchange.minDeposit}</div>
                </div>
              </div>
            </div>

            {/* Scores */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8">
              <h2 className="text-xl font-bold mb-6">Detailed Scores</h2>
              <div className="space-y-4">
                {([
                  ['Fees', exchange.feesScore],
                  ['Security', exchange.securityScore],
                  ['Ease of Use', exchange.easeOfUseScore],
                  ['Features', exchange.featuresScore],
                  ['Support', exchange.supportScore],
                ] as [string, number][]).map(([label, score]) => (
                  <div key={label}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-sm font-medium">{label}</span>
                      <span className={`text-sm font-bold ${scoreColor(score)}`}>{score}/100</span>
                    </div>
                    <div className="h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 transition-all duration-500"
                        style={{ width: scoreBarWidth(score) }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pros & Cons */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                <h3 className="text-lg font-bold mb-4 text-green-500">Pros</h3>
                <ul className="space-y-3">
                  {exchange.pros.map((pro, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-400">{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                <h3 className="text-lg font-bold mb-4 text-red-500">Cons</h3>
                <ul className="space-y-3">
                  {exchange.cons.map((con, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-400">{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8">
              <h2 className="text-xl font-bold mb-4">Features</h2>
              <div className="flex flex-wrap gap-2">
                {exchange.features.map((feature, i) => (
                  <span key={i} className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-sm rounded-lg">
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Security */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-orange-500" /> Security Features
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {exchange.securityFeatures.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-500" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sticky top-24">
              <h3 className="font-bold mb-4">Quick Info</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Maker Fee</span>
                  <span className="font-semibold">{exchange.makerFee}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Taker Fee</span>
                  <span className="font-semibold">{exchange.takerFee}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Cryptocurrencies</span>
                  <span className="font-semibold">{exchange.supportedCryptos}+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Mobile App</span>
                  <span className="font-semibold">{exchange.mobileApp ? 'Yes' : 'No'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Futures</span>
                  <span className="font-semibold">{exchange.futures ? 'Yes' : 'No'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Staking</span>
                  <span className="font-semibold">{exchange.staking ? 'Yes' : 'No'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">KYC Required</span>
                  <span className="font-semibold">{exchange.kycRequired ? 'Yes' : 'No'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Best For</span>
                  <span className="font-semibold capitalize">{exchange.category}</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <a
                  href={exchange.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackAffiliateClick(exchange.id, 'review_sidebar')}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all"
                >
                  Visit {exchange.name} <ExternalLink className="w-4 h-4" />
                </a>
                <Link
                  to="/compare"
                  className="w-full inline-flex items-center justify-center px-6 py-3 bg-gray-100 dark:bg-gray-800 font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm"
                >
                  Compare with Others
                </Link>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-semibold mb-2">Deposit Methods</h4>
                <div className="flex flex-wrap gap-1.5">
                  {exchange.depositMethods.map((method, i) => (
                    <span key={i} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs rounded-md">
                      {method}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
