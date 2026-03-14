import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/layout/Layout';
import ScrollToTop from './components/layout/ScrollToTop';

// Eagerly loaded (homepage)
import HomePage from './pages/HomePage';

// Lazy loaded pages for code splitting
const ExchangesPage = lazy(() => import('./pages/ExchangesPage'));
const ExchangeReviewPage = lazy(() => import('./pages/ExchangeReviewPage'));
const ComparePage = lazy(() => import('./pages/ComparePage'));
const CalculatorPage = lazy(() => import('./pages/CalculatorPage'));
const RecommenderPage = lazy(() => import('./pages/RecommenderPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const SEOToolsPage = lazy(() => import('./pages/SEOToolsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const StatusPage = lazy(() => import('./pages/StatusPage'));
const DCACalculatorPage = lazy(() => import('./pages/DCACalculatorPage'));

// Comparison pages
const BinanceVsCoinbase = lazy(() => import('./pages/comparisons/BinanceVsCoinbase'));
const BinanceVsBybit = lazy(() => import('./pages/comparisons/BinanceVsBybit'));
const BinanceVsOKX = lazy(() => import('./pages/comparisons/BinanceVsOKX'));
const BybitVsBitget = lazy(() => import('./pages/comparisons/BybitVsBitget'));
const CoinbaseVsKraken = lazy(() => import('./pages/comparisons/CoinbaseVsKraken'));
const KuCoinVsOKX = lazy(() => import('./pages/comparisons/KuCoinVsOKX'));

// Country guide pages
const BestExchangeUSA = lazy(() => import('./pages/guides/BestExchangeUSA'));
const BestExchangeUAE = lazy(() => import('./pages/guides/BestExchangeUAE'));
const BestExchangeUK = lazy(() => import('./pages/guides/BestExchangeUK'));
const BestExchangeSaudiArabia = lazy(() => import('./pages/guides/BestExchangeSaudiArabia'));
const BestExchangeEgypt = lazy(() => import('./pages/guides/BestExchangeEgypt'));
const BestExchangeGermany = lazy(() => import('./pages/guides/BestExchangeGermany'));
const BestExchangeIndia = lazy(() => import('./pages/guides/BestExchangeIndia'));
const BestExchangeCanada = lazy(() => import('./pages/guides/BestExchangeCanada'));

// Admin pages
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminBlog = lazy(() => import('./pages/admin/AdminBlog'));
const AdminExchanges = lazy(() => import('./pages/admin/AdminExchanges'));
const AdminAffiliates = lazy(() => import('./pages/admin/AdminAffiliates'));

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

import './App.css';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="exchanges" element={<ExchangesPage />} />
            <Route path="exchange/:id" element={<ExchangeReviewPage />} />
            <Route path="compare" element={<ComparePage />} />
            <Route path="calculator" element={<CalculatorPage />} />
            <Route path="dca-calculator" element={<DCACalculatorPage />} />
            <Route path="recommender" element={<RecommenderPage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="blog/:slug" element={<BlogPostPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="seo-tools" element={<SEOToolsPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="status" element={<StatusPage />} />

            {/* Head-to-Head Comparison Pages */}
            <Route path="compare/binance-vs-coinbase" element={<BinanceVsCoinbase />} />
            <Route path="compare/binance-vs-bybit" element={<BinanceVsBybit />} />
            <Route path="compare/binance-vs-okx" element={<BinanceVsOKX />} />
            <Route path="compare/bybit-vs-bitget" element={<BybitVsBitget />} />
            <Route path="compare/coinbase-vs-kraken" element={<CoinbaseVsKraken />} />
            <Route path="compare/kucoin-vs-okx" element={<KuCoinVsOKX />} />

            {/* Country Guide Pages */}
            <Route path="best-exchange/usa" element={<BestExchangeUSA />} />
            <Route path="best-exchange/uae" element={<BestExchangeUAE />} />
            <Route path="best-exchange/uk" element={<BestExchangeUK />} />
            <Route path="best-exchange/saudi-arabia" element={<BestExchangeSaudiArabia />} />
            <Route path="best-exchange/egypt" element={<BestExchangeEgypt />} />
            <Route path="best-exchange/germany" element={<BestExchangeGermany />} />
            <Route path="best-exchange/india" element={<BestExchangeIndia />} />
            <Route path="best-exchange/canada" element={<BestExchangeCanada />} />

            {/* Admin Pages */}
            <Route path="admin" element={<AdminLogin />} />
            <Route path="admin/dashboard" element={<AdminDashboard />} />
            <Route path="admin/blog" element={<AdminBlog />} />
            <Route path="admin/exchanges" element={<AdminExchanges />} />
            <Route path="admin/affiliates" element={<AdminAffiliates />} />

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
