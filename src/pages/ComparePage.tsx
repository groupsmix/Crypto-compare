import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, SlidersHorizontal, Columns3 } from 'lucide-react';
import ExchangeCard from '@/components/ExchangeCard';
import { exchanges } from '@/data/exchanges';

type SortKey = 'rating' | 'coins' | 'security' | 'ease';

export default function ComparePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortKey>('rating');

  const filteredExchanges = exchanges
    .filter((e) =>
      e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.nameAr.includes(searchTerm)
    )
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'coins') return b.coins - a.coins;
      if (sortBy === 'security') return b.security - a.security;
      if (sortBy === 'ease') return b.ease - a.ease;
      return 0;
    });

  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">قارن منصات التداول</h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            قارن بين أفضل 6 منصات تداول عملات رقمية من حيث الرسوم والأمان والميزات
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <Link
            to="/compare/side-by-side"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-bold hover:opacity-90 transition-all"
          >
            <Columns3 className="w-5 h-5" />
            مقارنة جنب لجنب
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
            <input
              type="text"
              placeholder="ابحث عن منصة..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-12 pl-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-text-secondary focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-text-secondary" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortKey)}
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary/50 transition-colors appearance-none cursor-pointer"
            >
              <option value="rating">ترتيب حسب التقييم</option>
              <option value="coins">ترتيب حسب عدد العملات</option>
              <option value="security">ترتيب حسب الأمان</option>
              <option value="ease">ترتيب حسب سهولة الاستخدام</option>
            </select>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="glass-card overflow-hidden mb-12">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="text-right p-4 text-text-secondary text-sm font-medium">المنصة</th>
                  <th className="text-right p-4 text-text-secondary text-sm font-medium">التقييم</th>
                  <th className="text-right p-4 text-text-secondary text-sm font-medium">رسوم فورية</th>
                  <th className="text-right p-4 text-text-secondary text-sm font-medium">رسوم عقود</th>
                  <th className="text-right p-4 text-text-secondary text-sm font-medium">العملات</th>
                  <th className="text-right p-4 text-text-secondary text-sm font-medium">الرافعة</th>
                  <th className="text-right p-4 text-text-secondary text-sm font-medium">الأمان</th>
                  <th className="text-right p-4 text-text-secondary text-sm font-medium hidden lg:table-cell">المستخدمون</th>
                </tr>
              </thead>
              <tbody>
                {filteredExchanges.map((exchange) => (
                  <tr key={exchange.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={exchange.logo} alt={exchange.name} className="w-8 h-8 rounded-lg bg-white/10 p-0.5" onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/32x32/1a1a2e/f7931a?text=${exchange.name[0]}`; }} />
                        <div>
                          <div className="text-white font-medium text-sm">{exchange.nameAr}</div>
                          <div className="text-text-secondary text-xs">{exchange.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-primary font-bold">{exchange.rating}</span>
                    </td>
                    <td className="p-4 text-white text-sm">{exchange.spotFee}</td>
                    <td className="p-4 text-white text-sm">{exchange.futuresFee}</td>
                    <td className="p-4 text-white text-sm">{exchange.coins}+</td>
                    <td className="p-4 text-white text-sm">{exchange.leverage}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-white/10 rounded-full h-2">
                          <div className="bg-success rounded-full h-2" style={{ width: `${exchange.security}%` }} />
                        </div>
                        <span className="text-success text-xs">{exchange.security}%</span>
                      </div>
                    </td>
                    <td className="p-4 text-text-secondary text-sm hidden lg:table-cell">{exchange.users}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Exchange Cards */}
        <h2 className="text-2xl font-bold text-white mb-6">تفاصيل المنصات</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExchanges.map((exchange, index) => (
            <ExchangeCard key={exchange.id} exchange={exchange} rank={index + 1} />
          ))}
        </div>
      </div>
    </div>
  );
}
