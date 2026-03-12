import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from '@/components/ErrorBoundary';
import Navbar from '@/components/Navbar';
import PriceTicker from '@/components/PriceTicker';
import ScrollToTop from '@/components/ScrollToTop';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import ComparePage from '@/pages/ComparePage';
import SideBySidePage from '@/pages/SideBySidePage';
import ExchangeDetailPage from '@/pages/ExchangeDetailPage';
import RecommenderPage from '@/pages/RecommenderPage';
import CalculatorPage from '@/pages/CalculatorPage';
import ConverterPage from '@/pages/ConverterPage';
import ArticlesPage from '@/pages/ArticlesPage';
import ArticleDetailPage from '@/pages/ArticleDetailPage';
import AboutPage from '@/pages/AboutPage';
import NotFoundPage from '@/pages/NotFoundPage';

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <PriceTicker />
          <main className="flex-1">
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
          </main>
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
}
