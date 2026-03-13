import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from '@/components/ErrorBoundary';
import Navbar from '@/components/Navbar';
import PriceTicker from '@/components/PriceTicker';
import ScrollToTop from '@/components/ScrollToTop';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';

const HomePage = lazy(() => import('@/pages/HomePage'));
const ComparePage = lazy(() => import('@/pages/ComparePage'));
const SideBySidePage = lazy(() => import('@/pages/SideBySidePage'));
const ExchangeDetailPage = lazy(() => import('@/pages/ExchangeDetailPage'));
const RecommenderPage = lazy(() => import('@/pages/RecommenderPage'));
const CalculatorPage = lazy(() => import('@/pages/CalculatorPage'));
const ConverterPage = lazy(() => import('@/pages/ConverterPage'));
const ArticlesPage = lazy(() => import('@/pages/ArticlesPage'));
const ArticleDetailPage = lazy(() => import('@/pages/ArticleDetailPage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
        <span className="text-text-secondary text-sm">جاري التحميل...</span>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <PriceTicker />
          <main className="flex-1">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/compare" element={<ComparePage />} />
                <Route path="/compare/side-by-side" element={<SideBySidePage />} />
                <Route path="/exchange/:id" element={<ExchangeDetailPage />} />
                <Route path="/recommender" element={<RecommenderPage />} />
                <Route path="/calculator" element={<CalculatorPage />} />
                <Route path="/converter" element={<ConverterPage />} />
                <Route path="/articles" element={<ArticlesPage />} />
                <Route path="/article/:id" element={<ArticleDetailPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <CookieConsent />
        </div>
      </Router>
    </ErrorBoundary>
  );
}
