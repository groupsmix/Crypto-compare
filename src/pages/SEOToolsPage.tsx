import { useState } from 'react';
import { Zap, Copy, Check, RefreshCw, Search, FileText, TrendingUp, Globe } from 'lucide-react';
import SEOHead from '../components/seo/SEOHead';

const CRYPTO_KEYWORDS = [
  'best crypto exchange', 'cryptocurrency trading platform', 'buy bitcoin', 'crypto exchange fees',
  'binance review', 'bybit review', 'okx review', 'coinbase review', 'kraken review',
  'crypto exchange comparison', 'lowest fee crypto exchange', 'best exchange for beginners',
  'crypto futures trading', 'copy trading crypto', 'crypto staking rewards',
  'defi vs centralized exchange', 'safest crypto exchange', 'crypto trading tips',
  'bitcoin exchange', 'ethereum trading', 'altcoin exchange', 'crypto margin trading',
  'how to buy cryptocurrency', 'best crypto app', 'crypto portfolio tracker',
  'cryptocurrency for beginners', 'crypto day trading', 'swing trading crypto',
  'crypto tax guide', 'hardware wallet vs exchange', 'crypto security tips',
  'passive income crypto', 'crypto lending platform', 'nft marketplace exchange',
  'web3 wallet', 'decentralized exchange', 'crypto arbitrage', 'trading bot crypto',
  'crypto news today', 'bitcoin price prediction', 'ethereum merge update',
  'crypto regulation news', 'best crypto to buy 2026', 'crypto market analysis',
];

const META_TEMPLATES = [
  {
    type: 'Exchange Review',
    title: '{Exchange} Review 2026: Fees, Security, Features & More | CryptoRank',
    description: 'Comprehensive {Exchange} review for 2026. Compare trading fees ({fee}% maker), security features, {coins}+ supported coins, and user experience. Is {Exchange} right for you?',
    keywords: ['{exchange} review', '{exchange} fees', '{exchange} security', '{exchange} vs binance', 'best crypto exchange', 'crypto trading platform'],
  },
  {
    type: 'Comparison Page',
    title: '{Exchange1} vs {Exchange2}: Which Is Better in 2026? | CryptoRank',
    description: 'Head-to-head comparison of {Exchange1} and {Exchange2}. Compare fees, features, security, and user experience to find the best exchange for your needs.',
    keywords: ['{exchange1} vs {exchange2}', 'crypto exchange comparison', 'best trading platform', 'exchange fees comparison'],
  },
  {
    type: 'Blog Post',
    title: '{Topic}: Complete Guide for 2026 | CryptoRank Blog',
    description: 'Learn everything about {topic} in our comprehensive 2026 guide. Expert tips, strategies, and insights for cryptocurrency traders of all levels.',
    keywords: ['{topic}', 'crypto guide', 'cryptocurrency tips', 'trading education'],
  },
  {
    type: 'Landing Page',
    title: 'Best Crypto Exchanges of 2026 — Compare & Find Your Perfect Platform',
    description: 'Compare the top cryptocurrency exchanges of 2026. Expert reviews, fee comparisons, security analysis, and AI-powered recommendations to find your perfect trading platform.',
    keywords: ['best crypto exchange 2026', 'top cryptocurrency exchanges', 'exchange reviews', 'crypto platform comparison'],
  },
];

const CONTENT_IDEAS = [
  { title: 'Top 7 Crypto Exchanges With the Lowest Fees in 2026', category: 'Guides', difficulty: 'Easy', searchVolume: 'High' },
  { title: 'Binance vs Coinbase: Which Exchange Should You Choose?', category: 'Comparison', difficulty: 'Medium', searchVolume: 'Very High' },
  { title: 'How to Start Copy Trading: Step-by-Step Guide', category: 'Tutorial', difficulty: 'Easy', searchVolume: 'High' },
  { title: 'Crypto Staking Guide: Earn Passive Income in 2026', category: 'Guides', difficulty: 'Medium', searchVolume: 'High' },
  { title: 'Is KuCoin Safe? Complete Security Analysis', category: 'Reviews', difficulty: 'Medium', searchVolume: 'Medium' },
  { title: 'Best Crypto Exchanges for US Traders in 2026', category: 'Guides', difficulty: 'Easy', searchVolume: 'Very High' },
  { title: 'Understanding Maker vs Taker Fees: Save Money Trading', category: 'Education', difficulty: 'Easy', searchVolume: 'Medium' },
  { title: 'DeFi vs CeFi: Which Is Right for You?', category: 'Education', difficulty: 'Hard', searchVolume: 'Medium' },
  { title: 'Bybit Copy Trading Review: Pros, Cons & How to Start', category: 'Reviews', difficulty: 'Medium', searchVolume: 'High' },
  { title: 'How to Protect Your Crypto: Security Best Practices', category: 'Security', difficulty: 'Easy', searchVolume: 'High' },
  { title: 'OKX Web3 Wallet Review: DeFi Made Simple', category: 'Reviews', difficulty: 'Medium', searchVolume: 'Medium' },
  { title: 'Crypto Tax Guide 2026: What You Need to Know', category: 'Education', difficulty: 'Hard', searchVolume: 'Very High' },
];

export default function SEOToolsPage() {
  const [activeTab, setActiveTab] = useState<'keywords' | 'meta' | 'content'>('keywords');
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [shuffledKeywords, setShuffledKeywords] = useState(CRYPTO_KEYWORDS);
  const [keywordFilter, setKeywordFilter] = useState('');

  const copyToClipboard = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const shuffleKeywords = () => {
    const shuffled = [...CRYPTO_KEYWORDS].sort(() => Math.random() - 0.5);
    setShuffledKeywords(shuffled);
  };

  const filteredKeywords = keywordFilter
    ? shuffledKeywords.filter((k) => k.toLowerCase().includes(keywordFilter.toLowerCase()))
    : shuffledKeywords;

  const tabs = [
    { id: 'keywords' as const, label: 'Keyword Explorer', icon: Search },
    { id: 'meta' as const, label: 'Meta Generator', icon: FileText },
    { id: 'content' as const, label: 'Content Ideas', icon: TrendingUp },
  ];

  return (
    <>
      <SEOHead
        seo={{
          title: 'AI SEO Tools — Keyword Explorer, Meta Generator & Content Ideas | CryptoRank',
          description: 'AI-powered SEO tools for crypto content creators. Generate optimized meta tags, discover trending keywords, and get content ideas for your crypto website.',
          keywords: ['crypto seo tools', 'meta tag generator', 'keyword research crypto', 'content ideas crypto'],
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300 text-sm font-medium mb-4">
            <Zap className="w-3.5 h-3.5" />
            AI-Powered SEO Tools
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">SEO Management Tools</h1>
          <p className="text-gray-600 dark:text-gray-400">AI-driven tools to optimize your crypto content for maximum search visibility.</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                activeTab === tab.id
                  ? 'bg-orange-50 dark:bg-orange-950/50 border-orange-300 dark:border-orange-700 text-orange-600 dark:text-orange-400'
                  : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Keyword Explorer */}
        {activeTab === 'keywords' && (
          <div>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Filter keywords..."
                  value={keywordFilter}
                  onChange={(e) => setKeywordFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500"
                />
              </div>
              <button
                onClick={shuffleKeywords}
                className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-xl transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh Keywords
              </button>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {filteredKeywords.map((keyword, i) => (
                  <div
                    key={keyword}
                    className="flex items-center justify-between px-4 py-3 border-b border-r border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Globe className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-sm">{keyword}</span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(keyword, i)}
                      className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      title="Copy keyword"
                    >
                      {copiedIdx === i ? (
                        <Check className="w-3.5 h-3.5 text-green-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-gray-400" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-4 text-center">
              {filteredKeywords.length} keywords available. Click refresh to shuffle and discover new keyword combinations.
            </p>
          </div>
        )}

        {/* Meta Generator */}
        {activeTab === 'meta' && (
          <div className="space-y-6">
            {META_TEMPLATES.map((template, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold flex items-center gap-2">
                    <FileText className="w-4 h-4 text-orange-500" />
                    {template.type}
                  </h3>
                  <button
                    onClick={() => copyToClipboard(`Title: ${template.title}\nDescription: ${template.description}\nKeywords: ${template.keywords.join(', ')}`, 100 + i)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-sm rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    {copiedIdx === 100 + i ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                    Copy All
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Title Tag</label>
                    <div className="mt-1 px-3 py-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg text-sm font-medium text-blue-600 dark:text-blue-400">
                      {template.title}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Meta Description</label>
                    <div className="mt-1 px-3 py-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg text-sm text-gray-600 dark:text-gray-400">
                      {template.description}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Keywords</label>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {template.keywords.map((kw, j) => (
                        <span key={j} className="px-2 py-1 bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 text-xs rounded-md">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Content Ideas */}
        {activeTab === 'content' && (
          <div>
            <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left px-4 py-3 font-semibold">#</th>
                    <th className="text-left px-4 py-3 font-semibold">Content Title</th>
                    <th className="text-center px-4 py-3 font-semibold">Category</th>
                    <th className="text-center px-4 py-3 font-semibold">Difficulty</th>
                    <th className="text-center px-4 py-3 font-semibold">Search Volume</th>
                    <th className="text-right px-4 py-3 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {CONTENT_IDEAS.map((idea, i) => (
                    <tr key={i} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                      <td className="px-4 py-3 text-gray-400 font-medium">{i + 1}</td>
                      <td className="px-4 py-3 font-medium">{idea.title}</td>
                      <td className="text-center px-4 py-3">
                        <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-xs rounded-full">{idea.category}</span>
                      </td>
                      <td className="text-center px-4 py-3">
                        <span className={`px-2 py-0.5 text-xs rounded-full ${
                          idea.difficulty === 'Easy' ? 'bg-green-100 dark:bg-green-950/50 text-green-600 dark:text-green-400' :
                          idea.difficulty === 'Medium' ? 'bg-yellow-100 dark:bg-yellow-950/50 text-yellow-600 dark:text-yellow-400' :
                          'bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400'
                        }`}>
                          {idea.difficulty}
                        </span>
                      </td>
                      <td className="text-center px-4 py-3">
                        <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                          idea.searchVolume === 'Very High' ? 'bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400' :
                          idea.searchVolume === 'High' ? 'bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400' :
                          'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                        }`}>
                          {idea.searchVolume}
                        </span>
                      </td>
                      <td className="text-right px-4 py-3">
                        <button
                          onClick={() => copyToClipboard(idea.title, 200 + i)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-xs font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                          {copiedIdx === 200 + i ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                          Copy
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-xl p-5">
              <h3 className="font-bold text-orange-700 dark:text-orange-400 mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                AI Content Strategy Tips
              </h3>
              <ul className="space-y-2 text-sm text-orange-600 dark:text-orange-300">
                <li>Focus on "Very High" search volume topics first for maximum organic traffic</li>
                <li>Create comparison content (Exchange A vs Exchange B) — these convert best for affiliates</li>
                <li>Target long-tail keywords like "best exchange for beginners in [country]" for easier rankings</li>
                <li>Update existing content quarterly to maintain search rankings and relevance</li>
                <li>Include structured data (FAQ schema) in guides to win featured snippets</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
