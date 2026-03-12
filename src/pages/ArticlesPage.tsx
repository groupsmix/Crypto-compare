import { Link } from 'react-router-dom';
import { Clock, ArrowLeft, BookOpen } from 'lucide-react';
import { articles } from '@/data/articles';

const categoryColors: Record<string, string> = {
  'مبتدئين': 'bg-success/10 text-success border-success/20',
  'الأمان': 'bg-danger/10 text-danger border-danger/20',
  'تداول': 'bg-primary/10 text-primary border-primary/20',
  'استراتيجيات': 'bg-accent/10 text-accent border-accent/20',
  'تعليم': 'bg-warning/10 text-warning border-warning/20',
};

export default function ArticlesPage() {
  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent mb-6">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">المقالات التعليمية</h1>
          <p className="text-text-secondary text-lg">
            تعلم كل ما تحتاجه لبدء رحلتك في عالم العملات الرقمية
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article, index) => (
            <Link
              key={article.id}
              to={`/article/${article.id}`}
              className="glass-card p-6 hover:border-primary/30 transition-all duration-300 group animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                  categoryColors[article.category] || 'bg-white/10 text-white border-white/20'
                }`}>
                  {article.category}
                </span>
                <span className="flex items-center gap-1 text-text-secondary text-xs">
                  <Clock className="w-3 h-3" />
                  {article.readTime}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">
                {article.title}
              </h3>
              <p className="text-text-secondary text-sm mb-4 leading-relaxed">
                {article.excerpt}
              </p>
              <div className="flex items-center gap-1 text-primary text-sm font-medium">
                اقرأ المزيد
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
