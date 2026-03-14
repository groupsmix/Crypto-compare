// Analytics Configuration
// Replace these IDs with your real analytics IDs

export const analyticsConfig = {
  // Google Analytics 4 - Get yours at https://analytics.google.com
  ga4MeasurementId: 'G-XXXXXXXXXX', // TODO: Replace with your GA4 ID

  // Microsoft Clarity - Get yours at https://clarity.microsoft.com
  clarityProjectId: 'XXXXXXXXXX', // TODO: Replace with your Clarity ID

  // Google AdSense - Get yours at https://adsense.google.com
  adsensePublisherId: 'ca-pub-XXXXXXXXXX', // TODO: Replace with your AdSense publisher ID
  adsenseSlots: {
    headerBanner: 'XXXXXXXXXX', // TODO: Replace with your ad slot IDs
    sidebarAd: 'XXXXXXXXXX',
    inArticleAd: 'XXXXXXXXXX',
    footerBanner: 'XXXXXXXXXX',
  },
};

// Initialize Google Analytics 4
export const initGA4 = (): void => {
  if (analyticsConfig.ga4MeasurementId === 'G-XXXXXXXXXX') return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsConfig.ga4MeasurementId}`;
  document.head.appendChild(script);

  const inlineScript = document.createElement('script');
  inlineScript.textContent = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${analyticsConfig.ga4MeasurementId}');
  `;
  document.head.appendChild(inlineScript);
};

// Initialize Microsoft Clarity
export const initClarity = (): void => {
  if (analyticsConfig.clarityProjectId === 'XXXXXXXXXX') return;

  const script = document.createElement('script');
  script.textContent = `
    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "${analyticsConfig.clarityProjectId}");
  `;
  document.head.appendChild(script);
};

// Track custom events in GA4
export const trackEvent = (eventName: string, params?: Record<string, string | number>): void => {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    const gtag = (window as unknown as Record<string, unknown>)['gtag'];
    if (typeof gtag === 'function') {
      gtag('event', eventName, params);
    }
  }
};

// Initialize all analytics
export const initAnalytics = (): void => {
  initGA4();
  initClarity();
};
