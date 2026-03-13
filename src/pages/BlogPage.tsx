import { Link } from 'react-router-dom';
import { Clock, ArrowRight, BookOpen } from 'lucide-react';
import SEOHead from '../components/seo/SEOHead';
import { blogPosts } from '../data/blogPosts';

export default function BlogPage() {
  return (
    <>
      <SEOHead
        seo={{
          title: 'Crypto Blog & Guides — Learn Trading, Security & More | CryptoRank',
          description: 'Expert cryptocurrency guides, trading tips, and exchange reviews. Learn everything from crypto basics to advanced trading strategies.',
          keywords: ['crypto blog', 'cryptocurrency guides', 'trading tips', 'crypto education', 'exchange guides'],
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-orange-500" />
            Blog & Guides
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Expert articles to help you navigate the crypto world confidently.</p>
        </div>

        {/* Featured Post */}
        {blogPosts.length > 0 && (
          <Link
            to={`/blog/${blogPosts[0].slug}`}
            className="block bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:border-orange-300 dark:hover:border-orange-700 hover:shadow-xl transition-all mb-10 group"
          >
            <div className="grid md:grid-cols-2">
              <div className="h-48 md:h-auto bg-gradient-to-br from-orange-500/20 to-yellow-500/20 flex items-center justify-center">
                <img
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://placehold.co/800x400/f97316/white?text=CryptoRank';
                  }}
                />
              </div>
              <div className="p-6 sm:p-8 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-semibold text-orange-500 bg-orange-100 dark:bg-orange-950/50 px-2 py-0.5 rounded-full">
                    Featured
                  </span>
                  <span className="text-xs text-gray-500">{blogPosts[0].category}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold mb-3 group-hover:text-orange-500 transition-colors">
                  {blogPosts[0].title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                  {blogPosts[0].excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>{blogPosts[0].date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {blogPosts[0].readTime} min read</span>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* All Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.slice(1).map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:border-orange-300 dark:hover:border-orange-700 hover:shadow-lg transition-all group"
            >
              <div className="h-40 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://placehold.co/600x300/f97316/white?text=CryptoRank';
                  }}
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-orange-500">{post.category}</span>
                  <span className="text-xs text-gray-400">·</span>
                  <span className="text-xs text-gray-500 flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime} min</span>
                </div>
                <h3 className="font-bold mb-2 group-hover:text-orange-500 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                  {post.excerpt}
                </p>
                <span className="inline-flex items-center gap-1 text-xs text-orange-500 font-medium">
                  Read More <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
