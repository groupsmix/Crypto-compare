// Analytics & Monetization Configuration
// Replace placeholder IDs with your real ones

export const analyticsConfig = {
  // Google Analytics 4 — Get your ID from https://analytics.google.com
  ga4MeasurementId: 'G-XXXXXXXXXX',

  // Microsoft Clarity — Get your ID from https://clarity.microsoft.com
  clarityProjectId: 'XXXXXXXXXX',

  // Google AdSense — Get your publisher ID from https://adsense.google.com
  adsensePublisherId: 'ca-pub-XXXXXXXXXXXXXXXX',
};

// Initialize Google Analytics 4
export function initGA4(): void {
  if (analyticsConfig.ga4MeasurementId === 'G-XXXXXXXXXX') return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsConfig.ga4MeasurementId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', analyticsConfig.ga4MeasurementId);
}

// Initialize Microsoft Clarity
export function initClarity(): void {
  if (analyticsConfig.clarityProjectId === 'XXXXXXXXXX') return;

  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.innerHTML = `
    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "${analyticsConfig.clarityProjectId}");
  `;
  document.head.appendChild(script);
}

// Initialize Google AdSense
export function initAdSense(): void {
  if (analyticsConfig.adsensePublisherId === 'ca-pub-XXXXXXXXXXXXXXXX') return;

  const script = document.createElement('script');
  script.async = true;
  script.crossOrigin = 'anonymous';
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${analyticsConfig.adsensePublisherId}`;
  document.head.appendChild(script);
}

// Initialize all analytics
export function initAllAnalytics(): void {
  initGA4();
  initClarity();
  initAdSense();
}

// Extend window types
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}
