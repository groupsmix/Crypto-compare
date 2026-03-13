import { Link } from 'react-router-dom';
import { TrendingUp, Mail, Shield, FileText } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
                CryptoRank
              </span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Your trusted guide to the best cryptocurrency exchanges. We help you find the perfect platform for your trading needs.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Exchanges</h3>
            <ul className="space-y-2">
              {['Binance', 'Bybit', 'OKX', 'Bitget', 'Coinbase', 'Kraken', 'KuCoin'].map((name) => (
                <li key={name}>
                  <Link
                    to={`/exchange/${name.toLowerCase()}`}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
                  >
                    {name} Review
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Tools</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/compare" className="text-sm text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
                  Compare Exchanges
                </Link>
              </li>
              <li>
                <Link to="/calculator" className="text-sm text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
                  Fee Calculator
                </Link>
              </li>
              <li>
                <Link to="/recommender" className="text-sm text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
                  AI Recommender
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
                  Blog & Guides
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" /> About Us
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" /> Contact
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" /> Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500 dark:text-gray-500">
              &copy; {new Date().getFullYear()} CryptoRank. All rights reserved. Not financial advice.
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              <Shield className="w-3 h-3 inline mr-1" />
              Affiliate Disclosure: We may earn commissions from qualifying purchases through our links.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
