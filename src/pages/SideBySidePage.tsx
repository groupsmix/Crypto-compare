import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, X, Shield, Star, ExternalLink, Columns3 } from 'lucide-react';
import { exchanges } from '@/data/exchanges';
import type { Exchange } from '@/types';

export default function SideBySidePage() {
  const [selected, setSelected] = useState<string[]>(['binance', 'bybit']);

  const toggleExchange = (id: string) => {
    if (selected.includes(id)) {
      if (selected.length > 1) {
        setSelected(selected.filter((s) => s !== id));
      }
    } else if (selected.length < 3) {
      setSelected([...selected, id]);
    }
  };

  const selectedExchanges = selected
    .map((id) => exchanges.find((e) => e.id === id))
    .filter((e): e is Exchange => e !== undefined);

  const comparisonRows: { label: string; key: string; render: (e: Exchange) => React.ReactNode }[] = [
    { label: 'التقييم العام', key: 'rating', render: (e) => (
      <div className="flex items-center justify-center gap-1">
        <Star className="w-4 h-4 text-primary fill-primary" />
        <span className="text-primary font-bold text-lg">{e.rating}/5</span>
      </div>
    )},
    { label: 'سنة التأسيس', key: 'founded', render: (e) => <span className="text-white">{e.founded}</span> },
    { label: 'المقر الرئيسي', key: 'headquarters', render: (e) => <span className="text-white text-sm">{e.headquarters}</span> },
    { label: 'المستخدمون', key: 'users', render: (e) => <span className="text-white font-medium">{e.users}</span> },
    { label: 'حجم التداول اليومي', key: 'volume', render: (e) => <span className="text-white text-sm">{e.tradingVolume}</span> },
    { label: 'رسوم فورية', key: 'spotFee', render: (e) => <span className="text-white font-bold">{e.spotFee}</span> },
    { label: 'رسوم عقود', key: 'futuresFee', render: (e) => <span className="text-white text-sm">{e.futuresFee}</span> },
    { label: 'رسوم الإيداع', key: 'depositFee', render: (e) => <span className="text-success font-medium">{e.depositFee}</span> },
    { label: 'رسوم السحب', key: 'withdrawalFee', render: (e) => <span className="text-white text-sm">{e.withdrawalFee}</span> },
    { label: 'عدد العملات', key: 'coins', render: (e) => <span className="text-white font-bold">{e.coins}+</span> },
    { label: 'أزواج التداول', key: 'tradingPairs', render: (e) => <span className="text-white">{e.tradingPairs}+</span> },
    { label: 'الرافعة القصوى', key: 'leverage', render: (e) => <span className="text-white font-bold">{e.leverage}</span> },
    { label: 'الأمان', key: 'security', render: (e) => (
      <div className="flex flex-col items-center gap-1">
        <div className="w-full max-w-20 bg-white/10 rounded-full h-2">
          <div className="bg-success rounded-full h-2" style={{ width: `${e.security}%` }} />
        </div>
        <span className="text-success text-xs font-bold">{e.security}%</span>
      </div>
    )},
    { label: 'سهولة الاستخدام', key: 'ease', render: (e) => (
      <div className="flex flex-col items-center gap-1">
        <div className="w-full max-w-20 bg-white/10 rounded-full h-2">
          <div className="bg-accent rounded-full h-2" style={{ width: `${e.ease}%` }} />
        </div>
        <span className="text-accent text-xs font-bold">{e.ease}%</span>
      </div>
    )},
    { label: 'دعم العملاء', key: 'support', render: (e) => (
      <div className="flex flex-col items-center gap-1">
        <div className="w-full max-w-20 bg-white/10 rounded-full h-2">
          <div className="bg-primary rounded-full h-2" style={{ width: `${e.support}%` }} />
        </div>
        <span className="text-primary text-xs font-bold">{e.support}%</span>
      </div>
    )},
  ];

  const allFeatures = Array.from(new Set(exchanges.flatMap((e) => e.features)));

  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-text-secondary mb-8">
          <Link to="/" className="hover:text-primary transition-colors">الرئيسية</Link>
          <ArrowRight className="w-3 h-3 rotate-180" />
          <Link to="/compare" className="hover:text-primary transition-colors">المنصات</Link>
          <ArrowRight className="w-3 h-3 rotate-180" />
          <span className="text-white">مقارنة جنب لجنب</span>
        </div>

        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent mb-6">
            <Columns3 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">مقارنة جنب لجنب</h1>
          <p className="text-text-secondary text-lg">
            اختر حتى 3 منصات لمقارنتها بالتفصيل في جدول واحد
          </p>
        </motion.div>

        {/* Exchange Selector */}
        <div className="glass-card p-6 mb-8">
          <h3 className="text-white font-bold mb-4">اختر المنصات للمقارنة (حتى 3)</h3>
          <div className="flex flex-wrap gap-3">
            {exchanges.map((exchange) => (
              <button
                key={exchange.id}
                onClick={() => toggleExchange(exchange.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all text-sm font-medium ${
                  selected.includes(exchange.id)
                    ? 'bg-primary/20 border-primary/50 text-primary'
                    : 'bg-white/5 border-white/10 text-text-secondary hover:border-white/30'
                } ${!selected.includes(exchange.id) && selected.length >= 3 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <img
                  src={exchange.logo}
                  alt={exchange.name}
                  className="w-6 h-6 rounded-md bg-white/10 p-0.5"
                  onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/24x24/1a1a2e/f7931a?text=${exchange.name[0]}`; }}
                />
                {exchange.nameAr}
                {selected.includes(exchange.id) && <Check className="w-4 h-4" />}
              </button>
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        <AnimatePresence mode="wait">
        <motion.div
          key={selected.join('-')}
          className="glass-card overflow-hidden mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="text-right p-4 text-text-secondary text-sm font-medium min-w-[140px]">المعيار</th>
                  {selectedExchanges.map((exchange) => (
                    <th key={exchange.id} className="p-4 text-center min-w-[180px]">
                      <div className="flex flex-col items-center gap-2">
                        <img
                          src={exchange.logo}
                          alt={exchange.name}
                          className="w-12 h-12 rounded-xl p-1 bg-white/10"
                          onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/48x48/1a1a2e/f7931a?text=${exchange.name[0]}`; }}
                        />
                        <div className="text-white font-bold">{exchange.nameAr}</div>
                        <div className="text-text-secondary text-xs">{exchange.name}</div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={row.key} className={`border-b border-white/5 ${i % 2 === 0 ? 'bg-white/[0.02]' : ''}`}>
                    <td className="p-4 text-text-secondary text-sm font-medium">{row.label}</td>
                    {selectedExchanges.map((exchange) => (
                      <td key={exchange.id} className="p-4 text-center">
                        {row.render(exchange)}
                      </td>
                    ))}
                  </tr>
                ))}

                {/* Features section */}
                <tr className="border-b border-white/10 bg-white/5">
                  <td className="p-4 text-white font-bold" colSpan={selectedExchanges.length + 1}>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" />
                      الميزات المتاحة
                    </div>
                  </td>
                </tr>
                {allFeatures.map((feature, i) => (
                  <tr key={feature} className={`border-b border-white/5 ${i % 2 === 0 ? 'bg-white/[0.02]' : ''}`}>
                    <td className="p-4 text-text-secondary text-sm">{feature}</td>
                    {selectedExchanges.map((exchange) => (
                      <td key={exchange.id} className="p-4 text-center">
                        {exchange.features.includes(feature) ? (
                          <Check className="w-5 h-5 text-success mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-danger/50 mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}

                {/* Pros section */}
                <tr className="border-b border-white/10 bg-white/5">
                  <td className="p-4 text-white font-bold" colSpan={selectedExchanges.length + 1}>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-success" />
                      المميزات
                    </div>
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-4"></td>
                  {selectedExchanges.map((exchange) => (
                    <td key={exchange.id} className="p-4">
                      <ul className="space-y-2">
                        {exchange.pros.map((pro) => (
                          <li key={pro} className="flex items-start gap-1.5 text-xs text-text-secondary">
                            <Check className="w-3 h-3 text-success mt-0.5 flex-shrink-0" />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>

                {/* Cons section */}
                <tr className="border-b border-white/10 bg-white/5">
                  <td className="p-4 text-white font-bold" colSpan={selectedExchanges.length + 1}>
                    <div className="flex items-center gap-2">
                      <X className="w-4 h-4 text-danger" />
                      العيوب
                    </div>
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-4"></td>
                  {selectedExchanges.map((exchange) => (
                    <td key={exchange.id} className="p-4">
                      <ul className="space-y-2">
                        {exchange.cons.map((con) => (
                          <li key={con} className="flex items-start gap-1.5 text-xs text-text-secondary">
                            <X className="w-3 h-3 text-danger mt-0.5 flex-shrink-0" />
                            {con}
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

        </motion.div>
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {selectedExchanges.map((exchange) => (
            <div key={exchange.id} className="glass-card p-4 text-center">
              <div className="text-white font-bold mb-3">{exchange.nameAr}</div>
              {exchange.referralBonus && (
                <div className="text-xs text-primary mb-3 bg-primary/10 rounded-lg p-2">{exchange.referralBonus}</div>
              )}
              <div className="flex gap-2">
                <Link
                  to={`/exchange/${exchange.id}`}
                  className="flex-1 py-2 rounded-xl bg-white/5 text-white hover:bg-white/10 transition-all text-sm font-medium"
                >
                  تفاصيل
                </Link>
                <a
                  href={exchange.referralLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white hover:opacity-90 transition-all text-sm font-medium"
                >
                  <ExternalLink className="w-3 h-3" />
                  زيارة
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
