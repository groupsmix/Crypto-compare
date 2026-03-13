import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun, TrendingUp, ChevronDown } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface NavLink {
  label: string;
  path: string;
  children?: { label: string; path: string }[];
}

const navLinks: NavLink[] = [
  { label: 'Home', path: '/' },
  { label: 'Exchanges', path: '/exchanges' },
  {
    label: 'Compare',
    path: '/compare',
    children: [
      { label: 'Compare All', path: '/compare' },
      { label: 'Binance vs Coinbase', path: '/compare/binance-vs-coinbase' },
      { label: 'Binance vs Bybit', path: '/compare/binance-vs-bybit' },
      { label: 'Binance vs OKX', path: '/compare/binance-vs-okx' },
      { label: 'Bybit vs Bitget', path: '/compare/bybit-vs-bitget' },
      { label: 'Coinbase vs Kraken', path: '/compare/coinbase-vs-kraken' },
      { label: 'KuCoin vs OKX', path: '/compare/kucoin-vs-okx' },
    ],
  },
  {
    label: 'Tools',
    path: '/calculator',
    children: [
      { label: 'Fee Calculator', path: '/calculator' },
      { label: 'DCA Calculator', path: '/dca-calculator' },
      { label: 'AI Recommender', path: '/recommender' },
    ],
  },
  {
    label: 'Guides',
    path: '/best-exchange/usa',
    children: [
      { label: 'Best for USA', path: '/best-exchange/usa' },
      { label: 'Best for UAE', path: '/best-exchange/uae' },
      { label: 'Best for UK', path: '/best-exchange/uk' },
      { label: 'Best for Saudi Arabia', path: '/best-exchange/saudi-arabia' },
      { label: 'Best for Egypt', path: '/best-exchange/egypt' },
      { label: 'Best for Germany', path: '/best-exchange/germany' },
      { label: 'Best for India', path: '/best-exchange/india' },
      { label: 'Best for Canada', path: '/best-exchange/canada' },
    ],
  },
  { label: 'Blog', path: '/blog' },
  { label: 'About', path: '/about' },
];

function DropdownMenu({ link, isActive }: { link: NavLink; isActive: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
          isActive
            ? 'bg-orange-50 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400'
            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
        }`}
      >
        {link.label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 w-56 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50 py-2 animate-in fade-in slide-in-from-top-2">
          {link.children?.map((child) => (
            <Link
              key={child.path}
              to={child.path}
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-950/30 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const isLinkActive = (link: NavLink): boolean => {
    if (location.pathname === link.path) return true;
    if (link.children) {
      return link.children.some((child) => location.pathname === child.path);
    }
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-orange-500/25 transition-shadow">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
              CryptoRanked
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <DropdownMenu key={link.label} link={link} isActive={isLinkActive(link)} />
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'bg-orange-50 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 max-h-[70vh] overflow-y-auto">
          <nav className="px-4 py-3 space-y-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label}>
                  <button
                    onClick={() =>
                      setMobileExpanded(mobileExpanded === link.label ? null : link.label)
                    }
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isLinkActive(link)
                        ? 'bg-orange-50 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {link.label}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        mobileExpanded === link.label ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {mobileExpanded === link.label && (
                    <div className="ml-4 mt-1 space-y-1">
                      {link.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          onClick={() => {
                            setMobileOpen(false);
                            setMobileExpanded(null);
                          }}
                          className="block px-3 py-2 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-orange-500 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'bg-orange-50 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
