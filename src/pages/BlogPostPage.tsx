import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Tag } from 'lucide-react';
import SEOHead from '../components/seo/SEOHead';
import { getBlogPostBySlug } from '../data/blogPosts';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = getBlogPostBySlug(slug || '');

  if (!post) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
        <Link to="/blog" className="text-orange-500 hover:underline">Back to Blog</Link>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        seo={{
          title: `${post.title} | CryptoRank Blog`,
          description: post.excerpt,
          keywords: post.tags,
          structuredData: {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.excerpt,
            author: { '@type': 'Person', name: post.author },
            datePublished: post.date,
            image: post.image,
          },
        }}
      />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-orange-500 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm font-medium text-orange-500 bg-orange-100 dark:bg-orange-950/50 px-3 py-1 rounded-full">
              {post.category}
            </span>
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {post.readTime} min read
            </span>
            <span className="text-sm text-gray-500">{post.date}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">{post.title}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">{post.excerpt}</p>
        </div>

        <div className="rounded-2xl overflow-hidden mb-8 h-64 sm:h-80">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://placehold.co/800x400/f97316/white?text=CryptoRank';
            }}
          />
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          {post.content.split('\n').map((line, i) => {
            if (line.startsWith('## ')) {
              return <h2 key={i} className="text-2xl font-bold mt-8 mb-4">{line.replace('## ', '')}</h2>;
            }
            if (line.startsWith('### ')) {
              return <h3 key={i} className="text-xl font-bold mt-6 mb-3">{line.replace('### ', '')}</h3>;
            }
            if (line.startsWith('- **')) {
              const match = line.match(/- \*\*(.*?)\*\*(.*)/);
              if (match) {
                return (
                  <p key={i} className="ml-4 mb-2 text-gray-600 dark:text-gray-400">
                    <span className="font-semibold text-gray-900 dark:text-white">{match[1]}</span>
                    {match[2]}
                  </p>
                );
              }
            }
            if (line.startsWith('- ')) {
              return (
                <p key={i} className="ml-4 mb-2 text-gray-600 dark:text-gray-400 before:content-['•'] before:mr-2 before:text-orange-500">
                  {line.replace('- ', '')}
                </p>
              );
            }
            if (line.match(/^\d+\./)) {
              return (
                <p key={i} className="ml-4 mb-2 text-gray-600 dark:text-gray-400">
                  {line}
                </p>
              );
            }
            if (line.startsWith('|')) {
              return null;
            }
            if (line.trim() === '') {
              return <div key={i} className="h-2" />;
            }
            return (
              <p key={i} className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                {line}
              </p>
            );
          })}
        </div>

        <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2 flex-wrap">
            <Tag className="w-4 h-4 text-gray-400" />
            {post.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-sm rounded-full text-gray-600 dark:text-gray-400">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    </>
  );
}
