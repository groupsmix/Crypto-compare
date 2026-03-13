import { useParams, Link } from 'react-router-dom';
import { ArrowRight, Clock, BookOpen } from 'lucide-react';
import SEO from '@/components/SEO';
import { articles } from '@/data/articles';

export default function ArticleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const article = articles.find((a) => a.id === id);

  if (!article) {
    return (
      <div className="min-h-screen py-24 px-4 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">المقال غير موجود</h1>
        <Link to="/articles" className="text-primary hover:underline">العودة للمقالات</Link>
      </div>
    );
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    author: { '@type': 'Organization', name: 'كريبتو قارن' },
    publisher: { '@type': 'Organization', name: 'كريبتو قارن' },
    mainEntityOfPage: `https://crypto-compare.com/article/${article.id}`,
    inLanguage: 'ar',
    articleSection: article.category,
  };

  return (
    <div className="min-h-screen py-24 px-4">
      <SEO
        title={article.title}
        description={article.excerpt}
        path={`/article/${article.id}`}
        type="article"
        article={{ section: article.category, tags: [article.category, 'عملات رقمية', 'تداول'] }}
        structuredData={articleSchema}
      />
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-text-secondary mb-8">
          <Link to="/" className="hover:text-primary transition-colors">الرئيسية</Link>
          <ArrowRight className="w-3 h-3 rotate-180" />
          <Link to="/articles" className="hover:text-primary transition-colors">المقالات</Link>
          <ArrowRight className="w-3 h-3 rotate-180" />
          <span className="text-white truncate max-w-xs">{article.title}</span>
        </div>

        <article className="glass-card p-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
              {article.category}
            </span>
            <span className="flex items-center gap-1 text-text-secondary text-xs">
              <Clock className="w-3 h-3" />
              {article.readTime}
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-white mb-8 leading-tight">
            {article.title}
          </h1>

          <div className="space-y-6">
            {article.content.map((paragraph, index) => (
              <p key={index} className="text-text-secondary leading-relaxed text-lg">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-bold text-white">مقالات ذات صلة</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {articles
                .filter((a) => a.id !== article.id)
                .slice(0, 2)
                .map((related) => (
                  <Link
                    key={related.id}
                    to={`/article/${related.id}`}
                    className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
                  >
                    <div className="text-xs text-primary mb-2">{related.category}</div>
                    <div className="text-white font-medium text-sm">{related.title}</div>
                  </Link>
                ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
