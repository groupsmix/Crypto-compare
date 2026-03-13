import { Shield, Award, Users, Zap, Mail, Globe } from 'lucide-react';
import SEOHead from '../components/seo/SEOHead';

export default function AboutPage() {
  return (
    <>
      <SEOHead
        seo={{
          title: 'About CryptoRank — Trusted Crypto Exchange Reviews Since 2024',
          description: 'Learn about CryptoRank, our mission to help traders find the best cryptocurrency exchanges, our review methodology, and our commitment to unbiased analysis.',
          keywords: ['about cryptorank', 'crypto review methodology', 'exchange review process', 'trusted crypto reviews'],
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">About CryptoRank</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            We're on a mission to help every crypto trader find the perfect exchange. Through rigorous research, AI-powered analysis, and transparent reviews, we make the complex world of crypto simple.
          </p>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 text-center">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-orange-100 dark:bg-orange-950/50 flex items-center justify-center">
              <Shield className="w-7 h-7 text-orange-500" />
            </div>
            <h3 className="text-lg font-bold mb-2">Unbiased Reviews</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Every exchange is evaluated using the same rigorous methodology across 50+ metrics. Our reviews are based on real testing, not sponsored content.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 text-center">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-orange-100 dark:bg-orange-950/50 flex items-center justify-center">
              <Zap className="w-7 h-7 text-orange-500" />
            </div>
            <h3 className="text-lg font-bold mb-2">AI-Powered</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              We leverage artificial intelligence to analyze market data, track fee changes, and provide personalized exchange recommendations.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 text-center">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-orange-100 dark:bg-orange-950/50 flex items-center justify-center">
              <Award className="w-7 h-7 text-orange-500" />
            </div>
            <h3 className="text-lg font-bold mb-2">Always Current</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Our reviews and rankings are continuously updated to reflect the latest changes in fees, features, security incidents, and regulatory developments.
            </p>
          </div>
        </div>

        {/* Methodology */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-10 mb-16">
          <h2 className="text-2xl font-bold mb-6">Our Review Methodology</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            Every exchange we review goes through a comprehensive evaluation process. We test each platform ourselves, analyzing everything from account creation to withdrawal processing.
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">1</div>
                Fees & Costs (25%)
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 ml-8">
                We analyze maker/taker fees, withdrawal fees, deposit costs, and hidden charges across all trading tiers.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">2</div>
                Security (25%)
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 ml-8">
                We evaluate cold storage practices, 2FA options, insurance coverage, hack history, and regulatory compliance.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">3</div>
                Features (20%)
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 ml-8">
                We test trading tools, order types, charting, copy trading, staking, lending, and additional services.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">4</div>
                Ease of Use (15%)
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 ml-8">
                We evaluate the interface design, onboarding process, mobile app quality, and overall user experience.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">5</div>
                Support (15%)
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 ml-8">
                We test response times, support channels, knowledge base quality, and issue resolution effectiveness.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl p-8 sm:p-12 mb-16 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <Users className="w-8 h-8 mx-auto mb-2 opacity-80" />
              <div className="text-3xl font-bold">500K+</div>
              <div className="text-sm opacity-80">Monthly Visitors</div>
            </div>
            <div>
              <Shield className="w-8 h-8 mx-auto mb-2 opacity-80" />
              <div className="text-3xl font-bold">7</div>
              <div className="text-sm opacity-80">Reviewed Exchanges</div>
            </div>
            <div>
              <Globe className="w-8 h-8 mx-auto mb-2 opacity-80" />
              <div className="text-3xl font-bold">190+</div>
              <div className="text-sm opacity-80">Countries Served</div>
            </div>
            <div>
              <Award className="w-8 h-8 mx-auto mb-2 opacity-80" />
              <div className="text-3xl font-bold">50+</div>
              <div className="text-sm opacity-80">Review Metrics</div>
            </div>
          </div>
        </div>

        {/* Affiliate Disclosure */}
        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 mb-16">
          <h2 className="text-xl font-bold mb-4">Affiliate Disclosure</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            CryptoRank may earn commissions from qualifying purchases made through affiliate links on this site. This does not affect our reviews, rankings, or editorial content. We are committed to providing honest and unbiased information to help you make the best decisions for your cryptocurrency trading journey. Our editorial team maintains complete independence from our commercial partnerships.
          </p>
        </div>

        {/* Contact */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Mail className="w-5 h-5 text-orange-500" /> Contact Us
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Have questions, suggestions, or partnership inquiries? We'd love to hear from you.
          </p>
          <div className="space-y-2 text-sm">
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-orange-500" />
              <span className="text-gray-600 dark:text-gray-400">contact@cryptorank.com</span>
            </p>
            <p className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-orange-500" />
              <span className="text-gray-600 dark:text-gray-400">Available worldwide, 24/7</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
