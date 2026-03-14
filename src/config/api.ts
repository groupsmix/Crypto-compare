// Backend API configuration
// Change this to your deployed backend URL in production
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.cryptoranked.xyz';

export const api = {
  baseUrl: API_BASE_URL,

  // Auth
  login: `${API_BASE_URL}/api/auth/login`,

  // Prices
  prices: `${API_BASE_URL}/api/prices`,
  pricesRefresh: `${API_BASE_URL}/api/prices/refresh`,

  // Blog
  blogPosts: `${API_BASE_URL}/api/blog/posts`,
  blogPost: (slug: string) => `${API_BASE_URL}/api/blog/posts/${slug}`,
  adminBlogPosts: `${API_BASE_URL}/api/blog/admin/posts`,
  adminBlogGenerate: `${API_BASE_URL}/api/blog/admin/generate`,
  adminBlogPost: (id: number) => `${API_BASE_URL}/api/blog/admin/posts/${id}`,

  // Chat
  chat: `${API_BASE_URL}/api/chat`,
  chatHistory: (sessionId: string) => `${API_BASE_URL}/api/chat/history/${sessionId}`,

  // Exchanges
  exchanges: `${API_BASE_URL}/api/exchanges`,
  exchange: (id: string) => `${API_BASE_URL}/api/exchanges/${id}`,
  adminExchanges: `${API_BASE_URL}/api/exchanges/admin`,
  adminExchange: (id: string) => `${API_BASE_URL}/api/exchanges/admin/${id}`,

  // Affiliates
  affiliates: `${API_BASE_URL}/api/affiliates`,
  affiliateClick: (id: string) => `${API_BASE_URL}/api/affiliates/click/${id}`,
  adminAffiliates: `${API_BASE_URL}/api/affiliates/admin`,
  adminAffiliate: (id: number) => `${API_BASE_URL}/api/affiliates/admin/${id}`,

  // Admin
  dashboard: `${API_BASE_URL}/api/admin/dashboard`,
  settings: `${API_BASE_URL}/api/admin/settings`,
};

// Helper for authenticated requests
export function authHeaders(): Record<string, string> {
  const token = localStorage.getItem('admin_token');
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}

export async function apiGet(url: string, authenticated = false) {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (authenticated) Object.assign(headers, authHeaders());
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function apiPost(url: string, body: unknown, authenticated = false) {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (authenticated) Object.assign(headers, authHeaders());
  const res = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body) });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function apiPut(url: string, body: unknown, authenticated = false) {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (authenticated) Object.assign(headers, authHeaders());
  const res = await fetch(url, { method: 'PUT', headers, body: JSON.stringify(body) });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function apiDelete(url: string, authenticated = false) {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (authenticated) Object.assign(headers, authHeaders());
  const res = await fetch(url, { method: 'DELETE', headers });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}
