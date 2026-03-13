import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, Shield, Zap, Brain, ArrowLeft, Star, ArrowDownUp, Calculator, Columns3 } from 'lucide-react';
import ExchangeCard from '@/components/ExchangeCard';
import FearGreedGauge from '@/components/FearGreedGauge';
import SEO from '@/components/SEO';
import { exchanges } from '@/data/exchanges';
import { useCryptoPrices } from '@/hooks/useCryptoPrices';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0, 0, 0.2, 1] as const },
  }),
} as const;

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function HomePage() {
  const { prices } = useCryptoPrices();
  const topExchanges = exchanges.slice(0, 3);

  return (
    <div className="min-h-screen">
      <SEO
        title="كريبتو قارن - قارن أفضل منصات تداول العملات الرقمية 2025"
        description="قارن بين أفضل منصات تداول العملات الرقمية مثل Binance وBybit وOKX. مراجعات شاملة، أسعار حية، حاسبة رسوم، ومستشار ذكي بالذكاء الاصطناعي."
        path="/"
      />
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div
              variants={fadeInUp}
              custom={0}
              className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6"
            >
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-primary text-sm font-medium">أسعار حية - محدثة كل دقيقة</span>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} custom={1} className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="text-white">اختر</span>{' '}
              <span className="gradient-text">أفضل منصة تداول</span>{' '}
              <span className="text-white">بذكاء</span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} custom={2} className="text-xl text-text-secondary mb-8 leading-relaxed max-w-2xl mx-auto">
              قارن بين أفضل منصات تداول العملات الرقمية بمساعدة الذكاء الاصطناعي. 
              مراجعات شاملة، أسعار حية، ومستشار ذكي يساعدك في الاختيار.
            </motion.p>
            
            <motion.div variants={fadeInUp} custom={3} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/recommender"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white font-bold text-lg hover:opacity-90 transition-all animate-pulse-glow"
              >
                <Brain className="w-5 h-5" />
                المستشار الذكي
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <Link
                to="/compare"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-lg hover:bg-white/10 transition-all"
              >
                قارن المنصات
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
          >
            {[
              { label: 'منصة مراجعة', value: '6+', icon: Shield },
              { label: 'مستخدم حول العالم', value: '285M+', icon: TrendingUp },
              { label: 'عملة رقمية', value: '1800+', icon: Zap },
              { label: 'مقال تعليمي', value: '7+', icon: Star },
            ].map((stat, i) => (
              <motion.div key={stat.label} variants={fadeInUp} custom={i} className="glass-card p-6 text-center hover:scale-[1.03] transition-transform duration-300">
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-text-secondary">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">أدوات مجانية لمساعدتك</h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              مجموعة أدوات متكاملة لاتخاذ قرارات تداول أفضل
            </p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
          >
            {[
              { icon: Columns3, title: 'مقارنة جنب لجنب', desc: 'قارن حتى 3 منصات في جدول تفصيلي واحد', link: '/compare/side-by-side', color: 'from-primary to-accent' },
              { icon: Calculator, title: 'حاسبة الرسوم', desc: 'احسب كم ستدفع رسوم سنوياً على كل منصة', link: '/calculator', color: 'from-accent to-success' },
              { icon: ArrowDownUp, title: 'محول العملات', desc: 'حوّل بين العملات الرقمية والمحلية بأسعار حية', link: '/converter', color: 'from-success to-primary' },
              { icon: Brain, title: 'المستشار الذكي', desc: 'أجب على 4 أسئلة واحصل على توصية مخصصة', link: '/recommender', color: 'from-primary to-warning' },
            ].map((tool, i) => (
              <motion.div key={tool.title} variants={fadeInUp} custom={i}>
                <Link
                  to={tool.link}
                  className="glass-card p-6 block hover:scale-[1.03] transition-all duration-300 group h-full"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <tool.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{tool.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{tool.desc}</p>
                  <div className="mt-4 flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
                    جرّب الآن
                    <ArrowLeft className="w-4 h-4" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Live Prices + Fear/Greed */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">أسعار العملات الرقمية الحية</h2>
              <div className="glass-card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-right text-text-secondary text-sm font-medium p-4">#</th>
                        <th className="text-right text-text-secondary text-sm font-medium p-4">العملة</th>
                        <th className="text-right text-text-secondary text-sm font-medium p-4">السعر</th>
                        <th className="text-right text-text-secondary text-sm font-medium p-4">التغيير (24 ساعة)</th>
                        <th className="text-right text-text-secondary text-sm font-medium p-4 hidden sm:table-cell">القيمة السوقية</th>
                      </tr>
                    </thead>
                    <tbody>
                      {prices.slice(0, 8).map((coin, index) => (
                        <tr key={coin.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-text-secondary text-sm">{index + 1}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
                              <div>
                                <div className="text-white font-medium text-sm">{coin.name}</div>
                                <div className="text-text-secondary text-xs">{coin.symbol.toUpperCase()}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 text-white font-semibold text-sm">
                            ${coin.current_price.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                          </td>
                          <td className={`p-4 font-semibold text-sm ${
                            coin.price_change_percentage_24h >= 0 ? 'text-success' : 'text-danger'
                          }`}>
                            {coin.price_change_percentage_24h >= 0 ? '+' : ''}
                            {coin.price_change_percentage_24h?.toFixed(2)}%
                          </td>
                          <td className="p-4 text-text-secondary text-sm hidden sm:table-cell">
                            ${(coin.market_cap / 1e9).toFixed(1)}B
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="p-4 border-t border-white/10 text-center">
                  <Link to="/converter" className="text-primary text-sm font-medium hover:text-primary-dark transition-colors inline-flex items-center gap-1">
                    حوّل العملات بأسعار حية
                    <ArrowLeft className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">مزاج السوق</h2>
              <FearGreedGauge />
              <div className="glass-card p-4 mt-4">
                <h4 className="text-sm font-bold text-white mb-2">ماذا يعني هذا المؤشر؟</h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  مؤشر الخوف والطمع يقيس مشاعر السوق. الخوف الشديد قد يعني فرصة شراء، والطمع الشديد قد يعني وقت الحذر.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Top Exchanges */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white">أفضل المنصات</h2>
            <Link to="/compare" className="text-primary hover:text-primary-dark transition-colors flex items-center gap-1 text-sm font-medium">
              عرض الكل
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
          >
            {topExchanges.map((exchange, index) => (
              <motion.div key={exchange.id} variants={fadeInUp} custom={index}>
                <ExchangeCard exchange={exchange} rank={index + 1} />
              </motion.div>
            ))}
          </motion.div>
          <div className="text-center mt-8">
            <Link
              to="/compare/side-by-side"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all text-sm"
            >
              <Columns3 className="w-4 h-4 text-primary" />
              قارن المنصات جنب لجنب
            </Link>
          </div>
        </div>
      </section>

      {/* AI Recommender CTA */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="glass-card p-8 md:p-12 text-center relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
            <div className="relative">
              <Brain className="w-16 h-16 text-primary mx-auto mb-6 animate-float" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                المستشار الذكي بالذكاء الاصطناعي
              </h2>
              <p className="text-text-secondary text-lg mb-8 max-w-2xl mx-auto">
                أجب على 4 أسئلة بسيطة وسنرشح لك أفضل منصة تناسب احتياجاتك ومستوى خبرتك. 
                مدعوم بتحليل ذكي لبيانات المنصات.
              </p>
              <Link
                to="/recommender"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-bold text-lg hover:opacity-90 transition-all"
              >
                <Brain className="w-5 h-5" />
                جرب المستشار الذكي مجاناً
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
