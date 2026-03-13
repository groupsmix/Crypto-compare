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
            <Route path="recommender" element={<RecommenderPage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="blog/:slug" element={<BlogPostPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="seo-tools" element={<SEOToolsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App
