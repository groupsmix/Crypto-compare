import { Link } from 'react-router-dom';
import { Star, Users, Shield, ExternalLink } from 'lucide-react';
import type { Exchange } from '@/types';

interface ExchangeCardProps {
  exchange: Exchange;
  rank: number;
}

export default function ExchangeCard({ exchange, rank }: ExchangeCardProps) {
  return (
    <div className="glass-card p-6 hover:border-primary/30 transition-all duration-300 group animate-slide-up" style={{ animationDelay: `${rank * 100}ms` }}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
              {rank}
            </div>
            <img
              src={exchange.logo}
              alt={exchange.name}
              className="w-14 h-14 rounded-xl p-1 bg-white/10"
              onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/56x56/1a1a2e/f7931a?text=${exchange.name[0]}`; }}
            />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{exchange.nameAr}</h3>
            <p className="text-text-secondary text-sm">{exchange.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-primary/20 px-3 py-1 rounded-full">
          <Star className="w-4 h-4 text-primary fill-primary" />
          <span className="text-primary font-bold">{exchange.rating}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <div className="bg-white/5 rounded-lg p-3 text-center">
          <div className="text-xs text-text-secondary mb-1">رسوم فورية</div>
          <div className="text-sm font-bold text-white">{exchange.spotFee}</div>
        </div>
        <div className="bg-white/5 rounded-lg p-3 text-center">
          <div className="text-xs text-text-secondary mb-1">العملات</div>
          <div className="text-sm font-bold text-white">{exchange.coins}+</div>
        </div>
        <div className="bg-white/5 rounded-lg p-3 text-center">
          <div className="text-xs text-text-secondary mb-1">المستخدمون</div>
          <div className="text-sm font-bold text-white">{exchange.users}</div>
        </div>
        <div className="bg-white/5 rounded-lg p-3 text-center">
          <div className="text-xs text-text-secondary mb-1">الرافعة</div>
          <div className="text-sm font-bold text-white">{exchange.leverage}</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {exchange.features.slice(0, 4).map((feature) => (
          <span key={feature} className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">
            {feature}
          </span>
        ))}
        {exchange.features.length > 4 && (
          <span className="text-xs bg-white/5 text-text-secondary px-2 py-1 rounded-full">
            +{exchange.features.length - 4}
          </span>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-xs text-text-secondary mb-1">
            <Shield className="w-3 h-3" /> أمان
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div className="bg-success rounded-full h-2 transition-all" style={{ width: `${exchange.security}%` }} />
          </div>
          <div className="text-xs text-success mt-1">{exchange.security}%</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-xs text-text-secondary mb-1">
            <Users className="w-3 h-3" /> سهولة
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div className="bg-accent rounded-full h-2 transition-all" style={{ width: `${exchange.ease}%` }} />
          </div>
          <div className="text-xs text-accent mt-1">{exchange.ease}%</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-xs text-text-secondary mb-1">
            <Star className="w-3 h-3" /> دعم
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div className="bg-primary rounded-full h-2 transition-all" style={{ width: `${exchange.support}%` }} />
          </div>
          <div className="text-xs text-primary mt-1">{exchange.support}%</div>
        </div>
      </div>

      <div className="flex gap-2">
        <Link
          to={`/exchange/${exchange.id}`}
          className="flex-1 text-center py-2.5 rounded-xl bg-white/5 text-white hover:bg-white/10 transition-all text-sm font-medium"
        >
          تفاصيل كاملة
        </Link>
        <a
          href={exchange.referralLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white hover:opacity-90 transition-all text-sm font-medium"
        >
          <ExternalLink className="w-4 h-4" />
          زيارة المنصة
        </a>
      </div>
    </div>
  );
}
