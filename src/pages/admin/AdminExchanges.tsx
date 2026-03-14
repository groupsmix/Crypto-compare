import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, ArrowLeft, Trash2, Edit3, X, Save } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'https://api.cryptoranked.xyz';

interface ExchangeData {
  id: number;
  exchange_id: string;
  name: string;
  affiliate_url: string;
  referral_code: string;
  rating: number;
  overall_score: number;
  supported_cryptos: number;
  maker_fee: number;
  taker_fee: number;
  is_active: boolean;
}

export default function AdminExchanges() {
  const [exchanges, setExchanges] = useState<ExchangeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<ExchangeData>>({});
  const navigate = useNavigate();
  const token = localStorage.getItem('admin_token');

  useEffect(() => {
    if (!token) { navigate('/admin'); return; }
    fetchExchanges();
  }, [token, navigate]);

  const fetchExchanges = async () => {
    try {
      const res = await fetch(`${API_URL}/api/exchanges`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setExchanges(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (ex: ExchangeData) => {
    setEditing(ex.exchange_id);
    setEditForm({
      name: ex.name,
      affiliate_url: ex.affiliate_url,
      referral_code: ex.referral_code,
      rating: ex.rating,
      overall_score: ex.overall_score,
      supported_cryptos: ex.supported_cryptos,
      maker_fee: ex.maker_fee,
      taker_fee: ex.taker_fee,
    });
  };

  const saveEdit = async () => {
    if (!editing) return;
    try {
      await fetch(`${API_URL}/api/exchanges/admin/${editing}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editForm),
      });
      setEditing(null);
      await fetchExchanges();
    } catch {
      alert('Failed to update exchange');
    }
  };

  const deleteExchange = async (exchangeId: string) => {
    if (!confirm(`Delete exchange "${exchangeId}"?`)) return;
    try {
      await fetch(`${API_URL}/api/exchanges/admin/${exchangeId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchExchanges();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/admin/dashboard')} className="text-gray-400 hover:text-orange-500">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Building2 className="w-6 h-6 text-blue-500" />
            Exchange Management
          </h1>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading exchanges...</div>
      ) : (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                <th className="text-left px-4 py-3 font-semibold">Exchange</th>
                <th className="text-center px-4 py-3 font-semibold">Score</th>
                <th className="text-center px-4 py-3 font-semibold">Rating</th>
                <th className="text-center px-4 py-3 font-semibold">Maker Fee</th>
                <th className="text-center px-4 py-3 font-semibold">Coins</th>
                <th className="text-center px-4 py-3 font-semibold">Referral Code</th>
                <th className="text-right px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {exchanges.map((ex) => (
                <tr key={ex.exchange_id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/30">
                  {editing === ex.exchange_id ? (
                    <>
                      <td className="px-4 py-3">
                        <input
                          value={editForm.name || ''}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="w-full px-2 py-1 bg-gray-50 dark:bg-gray-800 border rounded text-sm"
                        />
                      </td>
                      <td className="text-center px-4 py-3">
                        <input
                          type="number"
                          value={editForm.overall_score || 0}
                          onChange={(e) => setEditForm({ ...editForm, overall_score: parseInt(e.target.value) })}
                          className="w-16 px-2 py-1 bg-gray-50 dark:bg-gray-800 border rounded text-sm text-center"
                        />
                      </td>
                      <td className="text-center px-4 py-3">
                        <input
                          type="number"
                          step="0.1"
                          value={editForm.rating || 0}
                          onChange={(e) => setEditForm({ ...editForm, rating: parseFloat(e.target.value) })}
                          className="w-16 px-2 py-1 bg-gray-50 dark:bg-gray-800 border rounded text-sm text-center"
                        />
                      </td>
                      <td className="text-center px-4 py-3">
                        <input
                          type="number"
                          step="0.01"
                          value={editForm.maker_fee || 0}
                          onChange={(e) => setEditForm({ ...editForm, maker_fee: parseFloat(e.target.value) })}
                          className="w-16 px-2 py-1 bg-gray-50 dark:bg-gray-800 border rounded text-sm text-center"
                        />
                      </td>
                      <td className="text-center px-4 py-3">
                        <input
                          type="number"
                          value={editForm.supported_cryptos || 0}
                          onChange={(e) => setEditForm({ ...editForm, supported_cryptos: parseInt(e.target.value) })}
                          className="w-16 px-2 py-1 bg-gray-50 dark:bg-gray-800 border rounded text-sm text-center"
                        />
                      </td>
                      <td className="text-center px-4 py-3">
                        <input
                          value={editForm.referral_code || ''}
                          onChange={(e) => setEditForm({ ...editForm, referral_code: e.target.value })}
                          className="w-24 px-2 py-1 bg-gray-50 dark:bg-gray-800 border rounded text-sm text-center"
                        />
                      </td>
                      <td className="text-right px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={saveEdit} className="p-1.5 text-green-500 hover:text-green-600">
                            <Save className="w-4 h-4" />
                          </button>
                          <button onClick={() => setEditing(null)} className="p-1.5 text-gray-400 hover:text-gray-500">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-4 py-3 font-medium">{ex.name}</td>
                      <td className="text-center px-4 py-3">
                        <span className="text-xs px-2 py-0.5 bg-orange-100 dark:bg-orange-950/50 text-orange-600 rounded-full">{ex.overall_score}/100</span>
                      </td>
                      <td className="text-center px-4 py-3">{ex.rating}</td>
                      <td className="text-center px-4 py-3">{ex.maker_fee}%</td>
                      <td className="text-center px-4 py-3">{ex.supported_cryptos}+</td>
                      <td className="text-center px-4 py-3">
                        <span className="text-xs text-gray-400">{ex.referral_code}</span>
                      </td>
                      <td className="text-right px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => startEdit(ex)} className="p-1.5 text-gray-400 hover:text-orange-500">
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button onClick={() => deleteExchange(ex.exchange_id)} className="p-1.5 text-gray-400 hover:text-red-500">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
