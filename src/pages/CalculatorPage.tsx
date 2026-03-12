import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp } from 'lucide-react';
import { exchanges } from '@/data/exchanges';

export default function CalculatorPage() {
  const [amount, setAmount] = useState<number>(1000);
  const [trades, setTrades] = useState<number>(30);
  const [type, setType] = useState<'spot' | 'futures'>('spot');

  const feeData = useMemo(() => {
    return exchanges.map((exchange) => {
      const feeStr = type === 'spot' ? exchange.spotFee : exchange.futuresFee;
      const feePercent = parseFloat(feeStr.replace('%', '').split('/')[0].replace(/[^0-9.]/g, ''));
      const feePerTrade = (amount * feePercent) / 100;
      const totalFees = feePerTrade * trades;
      const monthlyFees = totalFees;
      const yearlyFees = totalFees * 12;

      return {
        exchange,
        feePercent,
        feePerTrade,
        totalFees,
        monthlyFees,
        yearlyFees,
      };
    }).sort((a, b) => a.totalFees - b.totalFees);
  }, [amount, trades, type]);

  const cheapest = feeData[0];
  const mostExpensive = feeData[feeData.length - 1];
  const savings = mostExpensive.yearlyFees - cheapest.yearlyFees;

  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent mb-6">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">حاسبة رسوم التداول</h1>
          <p className="text-text-secondary text-lg">
            اعرف كم ستدفع رسوم على كل منصة وكم يمكنك توفيره
          </p>
        </motion.div>

        {/* Input Section */}
        <motion.div
          className="glass-card p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-text-secondary text-sm mb-2">حجم الصفقة الواحدة ($)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary/50 transition-colors"
                min={1}
              />
            </div>
            <div>
              <label className="block text-text-secondary text-sm mb-2">عدد الصفقات شهرياً</label>
              <input
                type="number"
                value={trades}
                onChange={(e) => setTrades(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary/50 transition-colors"
                min={1}
              />
            </div>
            <div>
              <label className="block text-text-secondary text-sm mb-2">نوع التداول</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setType('spot')}
                  className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
                    type === 'spot' ? 'bg-primary text-white' : 'bg-white/5 text-text-secondary hover:bg-white/10'
                  }`}
                >
                  فوري (Spot)
                </button>
                <button
                  onClick={() => setType('futures')}
                  className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
                    type === 'futures' ? 'bg-primary text-white' : 'bg-white/5 text-text-secondary hover:bg-white/10'
                  }`}
                >
                  عقود آجلة
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Savings Banner */}
        <motion.div
          className="glass-card p-6 mb-8 bg-gradient-to-r from-success/10 to-success/5 border-success/20"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-6 h-6 text-success" />
            </div>
            <div>
              <div className="text-white font-bold text-lg">
                يمكنك توفير حتى ${savings.toFixed(2)} سنوياً!
              </div>
              <div className="text-text-secondary text-sm">
                باستخدام {cheapest.exchange.nameAr} بدلاً من {mostExpensive.exchange.nameAr}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Visual Bar Chart */}
        <motion.div
          className="glass-card p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-lg font-bold text-white mb-6">مقارنة الرسوم السنوية بصرياً</h3>
          <div className="space-y-4">
            {feeData.map((data, index) => {
              const maxYearly = mostExpensive.yearlyFees || 1;
              const barWidth = maxYearly > 0 ? (data.yearlyFees / maxYearly) * 100 : 0;
              return (
                <div key={data.exchange.id} className="flex items-center gap-4">
                  <div className="flex items-center gap-2 w-28 flex-shrink-0">
                    <img
                      src={data.exchange.logo}
                      alt={data.exchange.name}
                      className="w-6 h-6 rounded-md bg-white/10 p-0.5"
                      onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/24x24/1a1a2e/f7931a?text=${data.exchange.name[0]}`; }}
                    />
                    <span className="text-white text-sm font-medium truncate">{data.exchange.nameAr}</span>
                  </div>
                  <div className="flex-1 bg-white/5 rounded-full h-8 relative overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 flex items-center justify-end px-3 ${
                        index === 0 ? 'bg-gradient-to-l from-success/80 to-success/40' : 'bg-gradient-to-l from-primary/80 to-primary/40'
                      }`}
                      style={{ width: `${Math.max(barWidth, 5)}%` }}
                    >
                      <span className="text-white text-xs font-bold whitespace-nowrap">
                        ${data.yearlyFees.toFixed(0)}/سنة
                      </span>
                    </div>
                    {index === 0 && (
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-success text-xs font-bold">الأرخص</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Results Table */}
        <motion.div
          className="glass-card overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="text-right p-4 text-text-secondary text-sm font-medium">المنصة</th>
                  <th className="text-right p-4 text-text-secondary text-sm font-medium">نسبة الرسوم</th>
                  <th className="text-right p-4 text-text-secondary text-sm font-medium">رسوم/صفقة</th>
                  <th className="text-right p-4 text-text-secondary text-sm font-medium">شهرياً</th>
                  <th className="text-right p-4 text-text-secondary text-sm font-medium">سنوياً</th>
                </tr>
              </thead>
              <tbody>
                {feeData.map((data, index) => (
                  <tr
                    key={data.exchange.id}
                    className={`border-b border-white/5 hover:bg-white/5 transition-colors ${
                      index === 0 ? 'bg-success/5' : ''
                    }`}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {index === 0 && (
                          <span className="px-2 py-0.5 rounded text-xs bg-success/20 text-success font-bold">الأرخص</span>
                        )}
                        <img src={data.exchange.logo} alt={data.exchange.name} className="w-8 h-8 rounded-lg bg-white/10 p-0.5" onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/32x32/1a1a2e/f7931a?text=${data.exchange.name[0]}`; }} />
                        <div>
                          <div className="text-white font-medium text-sm">{data.exchange.nameAr}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-white text-sm">{data.feePercent}%</td>
                    <td className="p-4 text-white text-sm font-medium">${data.feePerTrade.toFixed(2)}</td>
                    <td className="p-4 text-white text-sm font-medium">${data.monthlyFees.toFixed(2)}</td>
                    <td className={`p-4 text-sm font-bold ${index === 0 ? 'text-success' : 'text-white'}`}>
                      ${data.yearlyFees.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
