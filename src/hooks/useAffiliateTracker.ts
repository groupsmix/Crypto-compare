export function trackAffiliateClick(exchangeId: string, source: string) {
  const clickData = {
    exchangeId,
    source,
    timestamp: new Date().toISOString(),
    referrer: document.referrer,
    page: window.location.pathname,
  };

  const clicks = JSON.parse(localStorage.getItem('affiliate_clicks') || '[]');
  clicks.push(clickData);
  localStorage.setItem('affiliate_clicks', JSON.stringify(clicks));

  if (typeof window.gtag === 'function') {
    window.gtag('event', 'affiliate_click', {
      event_category: 'affiliate',
      event_label: exchangeId,
      value: 1,
    });
  }
}

export function getClickStats(): Record<string, number> {
  const clicks = JSON.parse(localStorage.getItem('affiliate_clicks') || '[]');
  const stats: Record<string, number> = {};
  clicks.forEach((click: { exchangeId: string }) => {
    stats[click.exchangeId] = (stats[click.exchangeId] || 0) + 1;
  });
  return stats;
}
