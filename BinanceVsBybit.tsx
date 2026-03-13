import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Check, Star, Globe, Shield, AlertTriangle } from 'lucide-react';
import SEOHead from '../../components/seo/SEOHead';
import { Exchange } from '../../types';
import { trackAffiliateClick } from '../../hooks/useAffiliateTracker';
import NewsletterSignup from '../../components/NewsletterSignup';
import AdBanner from '../../components/AdBanner';

export interface CountryGuideProps {
  country: string;
  countryCode: string;
  slug: string;
  heroDescription: string;
  rankedExchanges: { exchange: Exchange; note: string; available: boolean }[];
  regulations: string;
  paymentMethods: string[];
  taxInfo: string;
  tips: string[];
}

export default function CountryGuideTemplate({
  country,
  countryCode,
  slug,
  heroDescription,
  rankedExchanges,
  regulations,
  paymentMethods,
  taxInfo,
  tips,
}: CountryGuideProps) {
  return (
    <>
      <SEOHead
        seo={{
          title: `Best Crypto Exchanges in ${country} (2026) \u2014 Top Picks | CryptoRank`,
          description: `Find the best cryptocurrency exchange for ${country} in 2026. Compare fees, regulations, payment methods, and our top-ranked picks for ${country} traders.`,
          keywords: [
            `best crypto exchange ${country.toLowerCase()}`,
            `cryptocurrency ${country.toLowerCase()}`,
            `buy bitcoin ${country.toLowerCase()}`,
            `crypto trading ${country.toLowerCase()} 2026`,
          ],
          canonicalUrl: `https://cryptoranked.xyz/best-exchange/${slug}`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/exchanges" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-orange-500 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Exchanges
        </Link>

        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300 text-sm font-medium mb-4">
            <Globe className="w-3.5 h-3.5" />
            {countryCode} Guide \u2014 Updated 2026
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
            Best Crypto Exchanges in{' '}
            <span className="bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
              {country}
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {heroDescription}
          </p>
        </div>

        {/* Top Picks */}
        <div className="space-y-4 mb-10">
          {rankedExchanges.map(({ exchange, note, available }, index) => (
            <div
              key={exchange.id}
              className={`bg-white dark:bg-gray-900 rounded-2xl border ${index === 0 ? 'border-orange-300 dark:border-orange-700 ring-2 ring-orange-500/20' : 'border-gray-200 dark:border-gray-800'} p-6 transition-all hover:shadow-lg`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-4 flex-1">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-2xl font-bold text-orange-500">
                      {exchange.name.charAt(0)}
                    </div>
                    <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-xs font-bold flex items-center justify-center">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-lg font-bold">{exchange.name}</h2>
                      {index === 0 && (
                        <span className="px-2 py-0.5 bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 text-xs font-bold rounded-full">
                          TOP PICK
                        </span>
                      )}
                      {!available && (
                        <span className="px-2 py-0.5 bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 text-xs font-bold rounded-full flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" /> RESTRICTED
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 mb-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < Math.round(exchange.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300 dark:text-gray-600'}`} />
                      ))}
                      <span className="text-xs text-gray-500 ml-1">{exchange.rating}/5</span>
                      <span className="text-xs text-gray-400 mx-2">|</span>
                      <span className="text-xs text-orange-500 font-semibold">{exchange.overallScore}/100</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{note}</p>
                  </div>
                </div>
                <div className="flex gap-3 sm:flex-col items-center">
                  <div className="text-center">
                    <div className="text-xs text-gray-500">Fees from</div>
                    <div className="text-lg font-bold text-green-500">{exchange.makerFee}%</div>
                  </div>
                  <a
                    href={exchange.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackAffiliateClick(exchange.id, `country_${country.toLowerCase()}`)}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all text-sm whitespace-nowrap"
                  >
                    Visit {exchange.name} <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <AdBanner className="mb-8" />

        {/* Regulations */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 mb-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-orange-500" /> Crypto Regulations in {country}
          </h2>
          <div className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed whitespace-pre-line">
            {regulations}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 mb-6">
          <h2 className="text-xl font-bold mb-4">Payment Methods Available</h2>
          <div className="flex flex-wrap gap-2">
            {paymentMethods.map((method) => (
              <span key={method} className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-sm rounded-lg flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-green-500" />
                {method}
              </span>
            ))}
          </div>
        </div>

        {/* Tax Info */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 mb-6">
          <h2 className="text-xl font-bold mb-4">Crypto Tax in {country}</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{taxInfo}</p>
        </div>

        {/* Tips */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold mb-4">Tips for {country} Traders</h2>
          <ul className="space-y-3">
            {tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="text-gray-600 dark:text-gray-400">{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        <NewsletterSignup variant="banner" />
      </div>
    </>
  );
}
