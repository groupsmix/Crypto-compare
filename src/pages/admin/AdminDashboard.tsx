import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Building2,
  Link2,
  LogOut,
  Bot,
  TrendingUp,
  MousePointerClick,
  MessageSquare,
  Sparkles,
  RefreshCw,
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'https://api.cryptoranked.xyz';

interface DashboardStats {
  total_blog_posts: number;
  published_posts: number;
  ai_generated_posts: number;
  total_exchanges: number;
  active_exchanges: number;
  total_affiliates: number;
  total_affiliate_clicks: number;
  tracked_coins: number;
  total_chat_sessions: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem('admin_token');

  useEffect(() => {
    if (!token) {
      navigate('/admin');
      return;
    }
    fetchStats();
  }, [token, navigate]);

  const fetchStats = async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) {
        localStorage.removeItem('admin_token');
        navigate('/admin');
        return;
      }
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error('Dashboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin');
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-64" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-28 bg-gray-200 dark:bg-gray-800 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6 text-orange-500" />
            Admin Dashboard
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your CryptoRanked website</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>

      {/* Stats Grid */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={<FileText className="w-5 h-5" />}
            label="Blog Posts"
            value={stats.total_blog_posts}
            sub={`${stats.published_posts} published`}
            color="orange"
          />
          <StatCard
            icon={<Sparkles className="w-5 h-5" />}
            label="AI Posts"
            value={stats.ai_generated_posts}
            sub="Auto-generated"
            color="purple"
          />
          <StatCard
            icon={<Building2 className="w-5 h-5" />}
            label="Exchanges"
            value={stats.total_exchanges}
            sub={`${stats.active_exchanges} active`}
            color="blue"
          />
          <StatCard
            icon={<MousePointerClick className="w-5 h-5" />}
            label="Affiliate Clicks"
            value={stats.total_affiliate_clicks}
            sub={`${stats.total_affiliates} links`}
            color="green"
          />
          <StatCard
            icon={<TrendingUp className="w-5 h-5" />}
            label="Tracked Coins"
            value={stats.tracked_coins}
            sub="Real-time prices"
            color="cyan"
          />
          <StatCard
            icon={<MessageSquare className="w-5 h-5" />}
            label="Chat Sessions"
            value={stats.total_chat_sessions}
            sub="AI chatbot"
            color="pink"
          />
        </div>
      )}

      {/* Quick Actions */}
      <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <Link
          to="/admin/blog"
          className="flex items-center gap-4 p-5 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-orange-300 dark:hover:border-orange-700 transition-all group"
        >
          <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-950/50 flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <div className="font-semibold">Manage Blog</div>
            <div className="text-sm text-gray-500">Create, edit, and generate AI posts</div>
          </div>
        </Link>

        <Link
          to="/admin/exchanges"
          className="flex items-center gap-4 p-5 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-orange-300 dark:hover:border-orange-700 transition-all group"
        >
          <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="font-semibold">Manage Exchanges</div>
            <div className="text-sm text-gray-500">Add, edit, remove exchanges</div>
          </div>
        </Link>

        <Link
          to="/admin/affiliates"
          className="flex items-center gap-4 p-5 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-orange-300 dark:hover:border-orange-700 transition-all group"
        >
          <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-950/50 flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform">
            <Link2 className="w-6 h-6" />
          </div>
          <div>
            <div className="font-semibold">Manage Affiliates</div>
            <div className="text-sm text-gray-500">Affiliate links and tracking</div>
          </div>
        </Link>
      </div>

      {/* AI Automation Status */}
      <h2 className="text-lg font-bold mb-4">AI Automation Status</h2>
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-950/50 flex items-center justify-center text-green-500">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <div className="font-medium text-sm">Price Updates</div>
              <div className="text-xs text-green-500 font-medium">Active - Every 60s</div>
              <div className="text-xs text-gray-400 mt-0.5">CoinGecko free API</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-950/50 flex items-center justify-center text-purple-500">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="font-medium text-sm">AI Blog Writer</div>
              <div className="text-xs text-green-500 font-medium">Active - Weekly (Mon 9AM UTC)</div>
              <div className="text-xs text-gray-400 mt-0.5">Google Gemini</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-950/50 flex items-center justify-center text-orange-500">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="font-medium text-sm">AI Chatbot</div>
              <div className="text-xs text-green-500 font-medium">Active - 24/7</div>
              <div className="text-xs text-gray-400 mt-0.5">Google Gemini</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  sub,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  sub: string;
  color: string;
}) {
  const colorMap: Record<string, string> = {
    orange: 'bg-orange-100 dark:bg-orange-950/50 text-orange-500',
    purple: 'bg-purple-100 dark:bg-purple-950/50 text-purple-500',
    blue: 'bg-blue-100 dark:bg-blue-950/50 text-blue-500',
    green: 'bg-green-100 dark:bg-green-950/50 text-green-500',
    cyan: 'bg-cyan-100 dark:bg-cyan-950/50 text-cyan-500',
    pink: 'bg-pink-100 dark:bg-pink-950/50 text-pink-500',
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
      <div className="flex items-center gap-3 mb-2">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${colorMap[color]}`}>{icon}</div>
        <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">{label}</div>
      </div>
      <div className="text-2xl font-bold">{value.toLocaleString()}</div>
      <div className="text-xs text-gray-400 mt-0.5">{sub}</div>
    </div>
  );
}
