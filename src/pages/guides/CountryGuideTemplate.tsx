import { Link } from 'react-router-dom';
import { ExternalLink, ArrowLeft, MapPin, Shield, DollarSign, CreditCard, Globe } from 'lucide-react';
import SEOHead from '../../components/seo/SEOHead';
import { getExchangeById } from '../../data/exchanges';
import { trackAffiliateClick } from '../../hooks/useAffiliateTracker';
import NewsletterSignup from '../../components/NewsletterSignup';

interface ExchangeRecommendation {
  id: string;
  reason: string;
  bestFor: string;
}

interface CountryGuideTemplateProps {
  country: string;
  countryCode: string;
  intro: string;
  regulations: string;
  paymentMethods: string[];
  taxInfo: string;
  recommendations: ExchangeRecommendation[];
  tips: string[];
}

export default function CountryGuideTemplate({
  country,
  countryCode,
  intro,
  regulations,
  paymentMethods,
  taxInfo,
  recommendations,
  tips,
}: CountryGuideTemplateProps) {
  const allGuides = [
    { label: 'USA', path: '/best-exchange/usa' },
    { label: 'UAE', path: '/best-exchange/uae' },
    { label: 'UK', path: '/best-exchange/uk' },
    { label: 'Saudi Arabia', path: '/best-exchange/saudi-arabia' },
    { label: 'Egypt', path: '/best-exchange/egypt' },
    { label: 'Germany', path: '/best-exchange/germany' },
    { label: 'India', path: '/best-exchange/india' },
    { label: 'Canada', path: '/best-exchange/canada' },
  ].filter((g) => !g.path.includes(countryCode));

  return (
    <>
      <SEOHead
        seo={{
          title: `Best Crypto Exchange in ${country} 2026 — CryptoRanked`,
          description: `Find the best cryptocurrency exchange for ${country}. Compare fees, features, payment methods, and regulations for crypto traders in ${country}.`,
          keywords: [`best crypto exchange ${country.toLowerCase()}`, `cryptocurrency ${country.toLowerCase()}`, `buy bitcoin ${country.toLowerCase()}`, 'crypto exchange comparison'],
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-orange-500 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <MapPin className="w-8 h-8 text-orange-500" />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold">
            Best Crypto Exchange in{' '}
            <span className="bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">{country}</span>
            {' '}(2026)
          </h1>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-3xl">{intro}</p>

        {/* Top Picks */}
        <h2 className="text-2xl font-bold mb-6">Our Top Picks for {country}</h2>
        <div className="space-y-4 mb-10">
          {recommendations.map((rec, index) => {
            const exchange = getExchangeById(rec.id);
            if (!exchange) return null;
            return (
              <div key={rec.id} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 hover:border-orange-300 dark:hover:border-orange-700 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-sm font-bold">
                        #{index + 1}
                      </span>
                      <h3 className="text-xl font-bold">{exchange.name}</h3>
                      <span className="text-sm text-gray-500">Score: {exchange.overallScore}/100</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1"><strong>Why:</strong> {rec.reason}</p>
                    <p className="text-sm text-orange-500 font-medium">Best for: {rec.bestFor}</p>
                    <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500">
                      <span>Fee: {exchange.spotFee}</span>
                      <span>Coins: {exchange.supportedCryptos}+</span>
                      <span>Leverage: {exchange.leverage}</span>
                    </div>
                  </div>
                  <a
                    href={exchange.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackAffiliateClick(exchange.id, `guide_${countryCode}`)}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all whitespace-nowrap"
                  >
                    Visit {exchange.name} <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Regulations */}
        <div className="space-y-8 mb-10">
          <section>
            <h2 className="text-2xl font-bold mb-3 flex items-center gap-2"><Globe className="w-6 h-6 text-orange-500" /> Crypto Regulations in {country}</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{regulations}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3 flex items-center gap-2"><CreditCard className="w-6 h-6 text-orange-500" /> Payment Methods</h2>
            <div className="flex flex-wrap gap-2">
              {paymentMethods.map((method) => (
                <span key={method} className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-medium">
                  {method}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3 flex items-center gap-2"><DollarSign className="w-6 h-6 text-orange-500" /> Tax Information</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{taxInfo}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3 flex items-center gap-2"><Shield className="w-6 h-6 text-orange-500" /> Tips for Crypto Traders in {country}</h2>
            <ul className="space-y-2">
              {tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                  <span className="text-orange-500 font-bold mt-0.5">{i + 1}.</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <NewsletterSignup variant="banner" className="mb-10" />

        {/* Other Guides */}
        <div>
          <h3 className="text-lg font-bold mb-4">Guides for Other Countries</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {allGuides.map((g) => (
              <Link key={g.path} to={g.path} className="px-4 py-3 bg-gray-50 dark:bg-gray-900 rounded-xl text-sm font-medium hover:bg-orange-50 dark:hover:bg-orange-950/30 hover:text-orange-500 transition-colors border border-gray-200 dark:border-gray-800 text-center">
                Best for {g.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
