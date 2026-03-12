import { Link } from 'react-router-dom';
import { TrendingUp, Mail, Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-surface/50 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">كريبتو قارن</span>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed">
              موقعك العربي الأول لمقارنة منصات تداول العملات الرقمية. نساعدك في اختيار المنصة المناسبة بموضوعية وشفافية.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">روابط سريعة</h4>
            <div className="space-y-2">
              <Link to="/compare" className="block text-text-secondary hover:text-primary transition-colors text-sm">قارن المنصات</Link>
              <Link to="/recommender" className="block text-text-secondary hover:text-primary transition-colors text-sm">المستشار الذكي</Link>
              <Link to="/calculator" className="block text-text-secondary hover:text-primary transition-colors text-sm">حاسبة الرسوم</Link>
              <Link to="/articles" className="block text-text-secondary hover:text-primary transition-colors text-sm">المقالات التعليمية</Link>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">المنصات</h4>
            <div className="space-y-2">
              <Link to="/exchange/binance" className="block text-text-secondary hover:text-primary transition-colors text-sm">Binance</Link>
              <Link to="/exchange/bybit" className="block text-text-secondary hover:text-primary transition-colors text-sm">Bybit</Link>
              <Link to="/exchange/okx" className="block text-text-secondary hover:text-primary transition-colors text-sm">OKX</Link>
              <Link to="/exchange/bitget" className="block text-text-secondary hover:text-primary transition-colors text-sm">Bitget</Link>
              <Link to="/exchange/kucoin" className="block text-text-secondary hover:text-primary transition-colors text-sm">KuCoin</Link>
              <Link to="/exchange/mexc" className="block text-text-secondary hover:text-primary transition-colors text-sm">MEXC</Link>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">تواصل معنا</h4>
            <div className="space-y-3">
              <a href="mailto:info@crypto-compare.com" className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors text-sm">
                <Mail className="w-4 h-4" />
                info@crypto-compare.com
              </a>
              <div className="flex items-center gap-2 text-text-secondary text-sm">
                <Shield className="w-4 h-4" />
                مراجعات مستقلة وموضوعية
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-text-secondary text-sm">
              &copy; {new Date().getFullYear()} كريبتو قارن. جميع الحقوق محفوظة.
            </p>
            <p className="text-text-secondary text-xs leading-relaxed text-center">
              تحذير: تداول العملات الرقمية ينطوي على مخاطر عالية. المحتوى للأغراض التعليمية فقط وليس نصيحة مالية.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
