import { useParams, Link } from 'react-router-dom';
import { Star, Shield, Users, ExternalLink, Check, X, ArrowRight, Zap } from 'lucide-react';
import { exchanges } from '@/data/exchanges';

export default function ExchangeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const exchange = exchanges.find((e) => e.id === id);

  if (!exchange) {
    return (
      <div className="min-h-screen py-24 px-4 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">المنصة غير موجودة</h1>
        <Link to="/compare" className="text-primary hover:underline">العودة لصفحة المقارنة</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-text-secondary mb-8">
          <Link to="/" className="hover:text-primary transition-colors">الرئيسية</Link>
          <ArrowRight className="w-3 h-3 rotate-180" />
          <Link to="/compare" className="hover:text-primary transition-colors">المنصات</Link>
          <ArrowRight className="w-3 h-3 rotate-180" />
          <span className="text-white">{exchange.nameAr}</span>
        </div>

        {/* Header */}
        <div className="glass-card p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={exchange.logo}
                alt={exchange.name}
                className="w-20 h-20 rounded-2xl p-2 bg-white/10"
                onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/80x80/1a1a2e/f7931a?text=${exchange.name[0]}`; }}
              />
              <div>
                <h1 className="text-3xl font-bold text-white">{exchange.nameAr}</h1>
                <p className="text-text-secondary">{exchange.name} - تأسست {exchange.founded}</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1 bg-primary/20 px-3 py-1 rounded-full">
                    <Star className="w-4 h-4 text-primary fill-primary" />
                    <span className="text-primary font-bold">{exchange.rating}/5</span>
                  </div>
                  <span className="text-text-secondary text-sm">{exchange.headquarters}</span>
                </div>
              </div>
            </div>
            <a
              href={exchange.referralLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white font-bold hover:opacity-90 transition-all"
            >
              <ExternalLink className="w-5 h-5" />
              زيارة {exchange.name}
            </a>
          </div>
          {exchange.referralBonus && (
            <div className="mt-4 p-3 rounded-xl bg-primary/10 border border-primary/20">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                <span className="text-primary font-medium">{exchange.referralBonus}</span>
              </div>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="glass-card p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">نبذة عن {exchange.nameAr}</h2>
          <p className="text-text-secondary leading-relaxed">{exchange.description}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'حجم التداول اليومي', value: exchange.tradingVolume },
            { label: 'المستخدمون', value: exchange.users },
            { label: 'أزواج التداول', value: `${exchange.tradingPairs}+` },
            { label: 'الرافعة القصوى', value: exchange.leverage },
          ].map((stat) => (
            <div key={stat.label} className="glass-card p-4 text-center">
              <div className="text-lg font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs text-text-secondary">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Fees */}
        <div className="glass-card p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">الرسوم</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'التداول الفوري', value: exchange.spotFee },
              { label: 'العقود الآجلة', value: exchange.futuresFee },
              { label: 'الإيداع', value: exchange.depositFee },
              { label: 'السحب', value: exchange.withdrawalFee },
            ].map((fee) => (
              <div key={fee.label} className="bg-white/5 rounded-xl p-4 text-center">
                <div className="text-sm text-text-secondary mb-2">{fee.label}</div>
                <div className="text-lg font-bold text-white">{fee.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scores */}
        <div className="glass-card p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">التقييمات</h2>
          <div className="space-y-4">
            {[
              { label: 'الأمان', value: exchange.security, icon: Shield, color: 'bg-success' },
              { label: 'سهولة الاستخدام', value: exchange.ease, icon: Users, color: 'bg-accent' },
              { label: 'دعم العملاء', value: exchange.support, icon: Star, color: 'bg-primary' },
            ].map((score) => (
              <div key={score.label} className="flex items-center gap-4">
                <div className="flex items-center gap-2 w-32">
                  <score.icon className="w-4 h-4 text-text-secondary" />
                  <span className="text-text-secondary text-sm">{score.label}</span>
                </div>
                <div className="flex-1 bg-white/10 rounded-full h-3">
                  <div className={`${score.color} rounded-full h-3 transition-all duration-1000`} style={{ width: `${score.value}%` }} />
                </div>
                <span className="text-white font-bold w-12 text-left">{score.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="glass-card p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">الميزات المتاحة</h2>
          <div className="flex flex-wrap gap-3">
            {exchange.features.map((feature) => (
              <span key={feature} className="px-4 py-2 rounded-xl bg-accent/10 text-accent border border-accent/20 text-sm">
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Pros & Cons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="glass-card p-6">
            <h3 className="text-lg font-bold text-success mb-4 flex items-center gap-2">
              <Check className="w-5 h-5" />
              المميزات
            </h3>
            <ul className="space-y-3">
              {exchange.pros.map((pro) => (
                <li key={pro} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-success mt-1 flex-shrink-0" />
                  <span className="text-text-secondary text-sm">{pro}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="glass-card p-6">
            <h3 className="text-lg font-bold text-danger mb-4 flex items-center gap-2">
              <X className="w-5 h-5" />
              العيوب
            </h3>
            <ul className="space-y-3">
              {exchange.cons.map((con) => (
                <li key={con} className="flex items-start gap-2">
                  <X className="w-4 h-4 text-danger mt-1 flex-shrink-0" />
                  <span className="text-text-secondary text-sm">{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
