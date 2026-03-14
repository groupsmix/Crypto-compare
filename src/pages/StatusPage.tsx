import { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, Clock, Activity } from 'lucide-react';
import SEOHead from '../components/seo/SEOHead';

const API_URL = import.meta.env.VITE_API_URL || 'https://api.cryptoranked.xyz';

interface StatusData {
  status: string;
  services: Record<string, string>;
  stats: Record<string, number>;
}

const exchangeServices = [
  { name: 'Binance', url: 'https://www.binance.com', status: 'operational' },
  { name: 'Bybit', url: 'https://www.bybit.com', status: 'operational' },
  { name: 'OKX', url: 'https://www.okx.com', status: 'operational' },
  { name: 'Bitget', url: 'https://www.bitget.com', status: 'operational' },
  { name: 'Coinbase', url: 'https://www.coinbase.com', status: 'operational' },
  { name: 'Kraken', url: 'https://www.kraken.com', status: 'operational' },
  { name: 'KuCoin', url: 'https://www.kucoin.com', status: 'operational' },
];

export default function StatusPage() {
  const [apiStatus, setApiStatus] = useState<StatusData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastChecked, setLastChecked] = useState<Date>(new Date());

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch(`${API_URL}/api/status`, { signal: AbortSignal.timeout(5000) });
        if (res.ok) {
          setApiStatus(await res.json());
        }
      } catch {
        setApiStatus(null);
      } finally {
        setLoading(false);
        setLastChecked(new Date());
      }
    };
    fetchStatus();
    const interval = setInterval(fetchStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
      case 'healthy':
      case 'connected':
      case 'active':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'degraded':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
      case 'healthy':
      case 'connected':
      case 'active':
        return 'bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-300';
      case 'degraded':
        return 'bg-yellow-100 dark:bg-yellow-950/50 text-yellow-700 dark:text-yellow-300';
      default:
        return 'bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-300';
    }
  };

  return (
    <>
      <SEOHead
        seo={{
          title: 'System Status — CryptoRanked',
          description: 'Check the current status of CryptoRanked services and monitored exchange platforms.',
          keywords: ['crypto exchange status', 'exchange uptime', 'system status'],
          canonicalUrl: 'https://cryptoranked.xyz/status',
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center mb-12">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-green-100 dark:bg-green-950/50 flex items-center justify-center">
            <Activity className="w-7 h-7 text-green-500" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">System Status</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Real-time status of CryptoRanked services and monitored exchanges.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            Last checked: {lastChecked.toLocaleTimeString()}
          </div>
        </div>

        {/* CryptoRanked Services */}
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4">CryptoRanked Services</h2>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 divide-y divide-gray-200 dark:divide-gray-800 overflow-hidden">
            {loading ? (
              <div className="p-6 text-center text-gray-500">Checking status...</div>
            ) : apiStatus ? (
              Object.entries(apiStatus.services).map(([name, status]) => (
                <div key={name} className="flex items-center justify-between px-6 py-4">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(status)}
                    <span className="font-medium capitalize">{name.replace('_', ' ')}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(status)}`}>
                    {status}
                  </span>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-500" />
                  <span className="font-medium">API</span>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 dark:bg-yellow-950/50 text-yellow-700 dark:text-yellow-300">
                  unreachable
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Exchange Status */}
        <div>
          <h2 className="text-xl font-bold mb-4">Monitored Exchanges</h2>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 divide-y divide-gray-200 dark:divide-gray-800 overflow-hidden">
            {exchangeServices.map((exchange) => (
              <div key={exchange.name} className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-3">
                  {getStatusIcon(exchange.status)}
                  <a
                    href={exchange.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium hover:text-orange-500 transition-colors"
                  >
                    {exchange.name}
                  </a>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(exchange.status)}`}>
                  {exchange.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        {apiStatus?.stats && (
          <div className="mt-10 grid grid-cols-3 gap-4">
            {Object.entries(apiStatus.stats).map(([key, value]) => (
              <div key={key} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 text-center">
                <div className="text-2xl font-bold text-orange-500">{value}</div>
                <div className="text-xs text-gray-500 capitalize mt-1">{key.replace('_', ' ')}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
