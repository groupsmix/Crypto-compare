import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Star, ExternalLink, Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import SEOHead from '../components/seo/SEOHead';
import { exchanges } from '../data/exchanges';
import { trackAffiliateClick } from '../hooks/useAffiliateTracker';

type SortKey = 'overallScore' | 'makerFee' | 'supportedCryptos' | 'rating';
type SortDir = 'asc' | 'desc';

export default function ExchangesPage() {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('overallScore');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [filterFutures, setFilterFutures] = useState(false);
  const [filterStaking, setFilterStaking] = useState(false);

  const filtered = useMemo(() => {
    let result = exchanges.filter((e) =>
      e.name.toLowerCase().includes(search.toLowerCase())
    );
    if (filterFutures) result = result.filter((e) => e.futures);
    if (filterStaking) result = result.filter((e) => e.staking);
    result.sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      return sortDir === 'desc' ? Number(bVal) - Number(aVal) : Number(aVal) - Number(bVal);
    });
    return result;
  }, [search, sortKey, sortDir, filterFutures, filterStaking]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'desc' ? 'asc' : 'desc'));
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  };

  return (
    <>
      <SEOHead
        seo={{
          title: 'All Crypto Exchanges Reviewed — CryptoRank 2026',
          description: 'Browse and compare all cryptocurrency exchanges. Filter by features, sort by fees or ratings, and find the best platform for your trading needs.',
          keywords: ['crypto exchanges', 'exchange reviews', 'crypto trading platforms', 'best exchanges 2026'],
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">All Crypto Exchanges</h1>
          <p className="text-gray-600 dark:text-gray-400">Compare and choose from our verified list of top cryptocurrency exchanges.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search exchanges..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilterFutures(!filterFutures)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors ${
                filterFutures
                  ? 'bg-orange-50 dark:bg-orange-950/50 border-orange-300 dark:border-orange-700 text-orange-600 dark:text-orange-400'
                  : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" /> Futures
            </button>
            <button
              onClick={() => setFilterStaking(!filterStaking)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors ${
                filterStaking
                  ? 'bg-orange-50 dark:bg-orange-950/50 border-orange-300 dark:border-orange-700 text-orange-600 dark:text-orange-400'
                  : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" /> Staking
            </button>
          </div>
        </div>

        {/* Sort Controls */}
        <div className="flex gap-2 mb-6 flex-wrap">
          <span className="text-sm text-gray-500 dark:text-gray-400 py-2">Sort by:</span>
          {([
            ['overallScore', 'Score'],
            ['makerFee', 'Fees'],
            ['supportedCryptos', 'Coins'],
            ['rating', 'Rating'],
          ] as [SortKey, string][]).map(([key, label]) => (
            <button
              key={key}
              onClick={() => toggleSort(key)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                sortKey === key
                  ? 'bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {label}
              <ArrowUpDown className="w-3 h-3" />
            </button>
          ))}
        </div>

        {/* Exchange Cards */}
        <div className="space-y-4">
          {filtered.map((exchange, index) => (
            <div
              key={exchange.id}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 hover:border-orange-300 dark:hover:border-orange-700 hover:shadow-lg transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                <div className="flex items-center gap-4 lg:w-64">
                  <span className="text-2xl font-bold text-gray-300 dark:text-gray-600 w-8">
                    #{index + 1}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xl font-bold text-orange-500">
                    {exchange.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">{exchange.name}</h2>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.round(exchange.rating)
                              ? 'text-yellow-500 fill-yellow-500'
                              : 'text-gray-300 dark:text-gray-600'
                          }`}
                        />
                      ))}
                      <span className="text-xs text-gray-500 ml-1">{exchange.rating}</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 lg:flex-1">
                  {exchange.shortDescription}
                </p>

                <div className="grid grid-cols-3 gap-4 lg:w-72">
                  <div className="text-center">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Fee</div>
                    <div className="font-semibold">{exchange.makerFee}%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Coins</div>
                    <div className="font-semibold">{exchange.supportedCryptos}+</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Score</div>
                    <div className="font-semibold text-orange-500">{exchange.overallScore}</div>
                  </div>
                </div>

                <div className="flex gap-2 lg:w-48">
                  <a
                    href={exchange.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackAffiliateClick(exchange.id, 'exchanges_list')}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all"
                  >
                    Visit <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <Link
                    to={`/exchange/${exchange.id}`}
                    className="inline-flex items-center justify-center px-4 py-2.5 bg-gray-100 dark:bg-gray-800 text-sm font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    Review
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            No exchanges found matching your criteria.
          </div>
        )}
      </div>
    </>
  );
}
