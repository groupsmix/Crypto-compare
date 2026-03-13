import { useEffect, useRef } from 'react';
import { analyticsConfig } from '../config/analytics';

interface AdBannerProps {
  slot?: string;
  format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle';
  className?: string;
}

export default function AdBanner({ slot, format = 'auto', className = '' }: AdBannerProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const isAdSenseConfigured = analyticsConfig.adsensePublisherId !== 'ca-pub-XXXXXXXXXX';

  useEffect(() => {
    if (!isAdSenseConfigured || !adRef.current) return;

    try {
      const adsbygoogle = (window as Record<string, unknown>)['adsbygoogle'] as unknown[];
      if (adsbygoogle) {
        adsbygoogle.push({});
      }
    } catch {
      // AdSense not loaded yet
    }
  }, [isAdSenseConfigured]);

  // Show placeholder when AdSense is not configured
  if (!isAdSenseConfigured) {
    return (
      <div className={`bg-gray-100 dark:bg-gray-800/50 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center text-sm text-gray-400 dark:text-gray-500 ${className}`}
        style={{ minHeight: format === 'horizontal' ? '90px' : format === 'rectangle' ? '250px' : '100px' }}
      >
        <div className="text-center p-4">
          <p className="font-medium">Ad Space</p>
          <p className="text-xs mt-1">Configure AdSense in src/config/analytics.ts</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={adRef} className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={analyticsConfig.adsensePublisherId}
        data-ad-slot={slot || analyticsConfig.adsenseSlots.headerBanner}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
