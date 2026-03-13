import { analyticsConfig } from '../config/analytics';

interface AdBannerProps {
  slot?: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  className?: string;
}

export default function AdBanner({ slot = '', format = 'auto', className = '' }: AdBannerProps) {
  const isConfigured = analyticsConfig.adsensePublisherId !== 'ca-pub-XXXXXXXXXXXXXXXX';

  if (!isConfigured) {
    // Placeholder when AdSense is not configured
    return (
      <div className={`bg-gray-50 dark:bg-gray-900/50 border border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-4 text-center ${className}`}>
        <p className="text-xs text-gray-400 dark:text-gray-500">Advertisement Space</p>
      </div>
    );
  }

  return (
    <div className={`ad-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={analyticsConfig.adsensePublisherId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
