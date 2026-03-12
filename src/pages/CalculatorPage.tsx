import { useState, useMemo } from 'react';
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
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent mb-6">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">حاسبة رسوم التداول</h1>
          <p className="text-text-secondary text-lg">
            اعرف كم ستدفع رسوم على كل منصة وكم يمكنك توفيره
          </p>
        </div>

        {/* Input Section */}
        <div className="glass-card p-6 mb-8">
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
        </div>

        {/* Savings Banner */}
        <div className="glass-card p-6 mb-8 bg-gradient-to-r from-success/10 to-success/5 border-success/20">
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
        </div>

        {/* Results Table */}
        <div className="glass-card overflow-hidden">
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
        </div>
      </div>
    </div>
  );
}
