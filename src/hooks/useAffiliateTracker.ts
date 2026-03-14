const MAX_STORED_CLICKS = 1000;

function safeParseJSON<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function trackAffiliateClick(exchangeId: string, source: string) {
  const clickData = {
    exchangeId,
    source,
    timestamp: new Date().toISOString(),
    referrer: document.referrer,
    page: window.location.pathname,
  };

  const clicks = safeParseJSON<Record<string, unknown>[]>(
    localStorage.getItem('affiliate_clicks'),
    []
  );
  clicks.push(clickData);

  // Cap stored clicks to prevent unbounded localStorage growth
  const trimmedClicks = clicks.slice(-MAX_STORED_CLICKS);
  localStorage.setItem('affiliate_clicks', JSON.stringify(trimmedClicks));

  if (typeof window.gtag === 'function') {
    window.gtag('event', 'affiliate_click', {
      event_category: 'affiliate',
      event_label: exchangeId,
      value: 1,
    });
  }
}

export function getClickStats(): Record<string, number> {
  const clicks = safeParseJSON<{ exchangeId: string }[]>(
    localStorage.getItem('affiliate_clicks'),
    []
  );
  const stats: Record<string, number> = {};
  clicks.forEach((click) => {
    stats[click.exchangeId] = (stats[click.exchangeId] || 0) + 1;
  });
  return stats;
}
