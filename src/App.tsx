import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import ExchangesPage from './pages/ExchangesPage';
import ExchangeReviewPage from './pages/ExchangeReviewPage';
import ComparePage from './pages/ComparePage';
import CalculatorPage from './pages/CalculatorPage';
import RecommenderPage from './pages/RecommenderPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import AboutPage from './pages/AboutPage';
import SEOToolsPage from './pages/SEOToolsPage';
import ScrollToTop from './components/layout/ScrollToTop';
import NotFoundPage from './pages/NotFoundPage';

// New comparison pages
import BinanceVsCoinbase from './pages/comparisons/BinanceVsCoinbase';
import BinanceVsBybit from './pages/comparisons/BinanceVsBybit';
import BinanceVsOKX from './pages/comparisons/BinanceVsOKX';
import BybitVsBitget from './pages/comparisons/BybitVsBitget';
import CoinbaseVsKraken from './pages/comparisons/CoinbaseVsKraken';
import KuCoinVsOKX from './pages/comparisons/KuCoinVsOKX';

// New country guide pages
import BestExchangeUSA from './pages/guides/BestExchangeUSA';
import BestExchangeUAE from './pages/guides/BestExchangeUAE';
import BestExchangeUK from './pages/guides/BestExchangeUK';
import BestExchangeSaudiArabia from './pages/guides/BestExchangeSaudiArabia';
import BestExchangeEgypt from './pages/guides/BestExchangeEgypt';
import BestExchangeGermany from './pages/guides/BestExchangeGermany';
import BestExchangeIndia from './pages/guides/BestExchangeIndia';
import BestExchangeCanada from './pages/guides/BestExchangeCanada';

// DCA Calculator
import DCACalculatorPage from './pages/DCACalculatorPage';

// Admin pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminBlog from './pages/admin/AdminBlog';
import AdminExchanges from './pages/admin/AdminExchanges';
import AdminAffiliates from './pages/admin/AdminAffiliates';

import './App.css';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
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
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
