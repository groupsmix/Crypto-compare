import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import PriceTicker from '@/components/PriceTicker';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import ComparePage from '@/pages/ComparePage';
import ExchangeDetailPage from '@/pages/ExchangeDetailPage';
import RecommenderPage from '@/pages/RecommenderPage';
import CalculatorPage from '@/pages/CalculatorPage';
import ArticlesPage from '@/pages/ArticlesPage';
import ArticleDetailPage from '@/pages/ArticleDetailPage';
import AboutPage from '@/pages/AboutPage';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <PriceTicker />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/exchange/:id" element={<ExchangeDetailPage />} />
            <Route path="/recommender" element={<RecommenderPage />} />
            <Route path="/calculator" element={<CalculatorPage />} />
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/article/:id" element={<ArticleDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
