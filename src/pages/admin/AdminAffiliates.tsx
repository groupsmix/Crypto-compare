import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link2, ArrowLeft, Trash2, Edit3, Plus, X, Save, MousePointerClick } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'https://api.cryptoranked.xyz';

interface AffiliateData {
  id: number;
  exchange_id: string;
  name: string;
  referral_url: string;
  referral_code: string;
  commission_rate: string;
  is_active: boolean;
  clicks: number;
}

export default function AdminAffiliates() {
  const [affiliates, setAffiliates] = useState<AffiliateData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<number | null>(null);
  const [form, setForm] = useState({
    exchange_id: '',
    name: '',
    referral_url: '',
    referral_code: '',
    commission_rate: '',
  });
  const navigate = useNavigate();
  const token = localStorage.getItem('admin_token');

  useEffect(() => {
    if (!token) { navigate('/admin'); return; }
    fetchAffiliates();
  }, [token, navigate]);

  const fetchAffiliates = async () => {
    try {
      const res = await fetch(`${API_URL}/api/affiliates/admin`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) { navigate('/admin'); return; }
      const data = await res.json();
      setAffiliates(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addAffiliate = async () => {
    try {
      await fetch(`${API_URL}/api/affiliates/admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      setShowAdd(false);
      setForm({ exchange_id: '', name: '', referral_url: '', referral_code: '', commission_rate: '' });
      await fetchAffiliates();
    } catch {
      alert('Failed to add affiliate');
    }
  };

  const startEdit = (aff: AffiliateData) => {
    setEditing(aff.id);
    setForm({
      exchange_id: aff.exchange_id,
      name: aff.name,
      referral_url: aff.referral_url,
      referral_code: aff.referral_code,
      commission_rate: aff.commission_rate,
    });
  };

  const saveEdit = async () => {
    if (editing === null) return;
    try {
      await fetch(`${API_URL}/api/affiliates/admin/${editing}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: form.name,
          referral_url: form.referral_url,
          referral_code: form.referral_code,
          commission_rate: form.commission_rate,
        }),
      });
      setEditing(null);
      await fetchAffiliates();
    } catch {
      alert('Failed to update affiliate');
    }
  };

  const deleteAffiliate = async (id: number) => {
    if (!confirm('Delete this affiliate?')) return;
    try {
      await fetch(`${API_URL}/api/affiliates/admin/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchAffiliates();
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
            <Link2 className="w-6 h-6 text-green-500" />
            Affiliate Management
          </h1>
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white text-sm font-semibold rounded-xl hover:bg-green-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Affiliate
        </button>
      </div>

      {/* Add Form */}
      {showAdd && (
        <div className="mb-6 bg-green-50 dark:bg-green-950/20 rounded-xl border border-green-200 dark:border-green-800 p-5">
          <h3 className="font-semibold text-sm mb-3">Add New Affiliate Platform</h3>
          <div className="grid md:grid-cols-2 gap-3 mb-3">
            <input
              placeholder="Exchange ID (e.g., binance)"
              value={form.exchange_id}
              onChange={(e) => setForm({ ...form, exchange_id: e.target.value })}
              className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm"
            />
            <input
              placeholder="Display Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm"
            />
            <input
              placeholder="Referral URL"
              value={form.referral_url}
              onChange={(e) => setForm({ ...form, referral_url: e.target.value })}
              className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm"
            />
            <input
              placeholder="Referral Code"
              value={form.referral_code}
              onChange={(e) => setForm({ ...form, referral_code: e.target.value })}
              className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm"
            />
            <input
              placeholder="Commission Rate (e.g., Up to 50%)"
              value={form.commission_rate}
              onChange={(e) => setForm({ ...form, commission_rate: e.target.value })}
              className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm"
            />
          </div>
          <div className="flex gap-2">
            <button onClick={addAffiliate} className="px-4 py-2 bg-green-500 text-white text-sm rounded-xl hover:bg-green-600">
              Save
            </button>
            <button onClick={() => setShowAdd(false)} className="px-4 py-2 text-gray-500 text-sm hover:text-gray-700">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Affiliates Table */}
      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading affiliates...</div>
      ) : (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                <th className="text-left px-4 py-3 font-semibold">Platform</th>
                <th className="text-left px-4 py-3 font-semibold">Referral URL</th>
                <th className="text-center px-4 py-3 font-semibold">Code</th>
                <th className="text-center px-4 py-3 font-semibold">Commission</th>
                <th className="text-center px-4 py-3 font-semibold">Clicks</th>
                <th className="text-center px-4 py-3 font-semibold">Status</th>
                <th className="text-right px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {affiliates.map((aff) => (
                <tr key={aff.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/30">
                  {editing === aff.id ? (
                    <>
                      <td className="px-4 py-3">
                        <input
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full px-2 py-1 bg-gray-50 dark:bg-gray-800 border rounded text-sm"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          value={form.referral_url}
                          onChange={(e) => setForm({ ...form, referral_url: e.target.value })}
                          className="w-full px-2 py-1 bg-gray-50 dark:bg-gray-800 border rounded text-sm"
                        />
                      </td>
                      <td className="text-center px-4 py-3">
                        <input
                          value={form.referral_code}
                          onChange={(e) => setForm({ ...form, referral_code: e.target.value })}
                          className="w-20 px-2 py-1 bg-gray-50 dark:bg-gray-800 border rounded text-sm text-center"
                        />
                      </td>
                      <td className="text-center px-4 py-3">
                        <input
                          value={form.commission_rate}
                          onChange={(e) => setForm({ ...form, commission_rate: e.target.value })}
                          className="w-24 px-2 py-1 bg-gray-50 dark:bg-gray-800 border rounded text-sm text-center"
                        />
                      </td>
                      <td className="text-center px-4 py-3">{aff.clicks}</td>
                      <td className="text-center px-4 py-3">
                        {aff.is_active ? <span className="text-green-500 text-xs">Active</span> : <span className="text-gray-400 text-xs">Inactive</span>}
                      </td>
                      <td className="text-right px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={saveEdit} className="p-1.5 text-green-500 hover:text-green-600">
                            <Save className="w-4 h-4" />
                          </button>
                          <button onClick={() => setEditing(null)} className="p-1.5 text-gray-400">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-4 py-3 font-medium">{aff.name}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs text-gray-400 truncate block max-w-[200px]">{aff.referral_url}</span>
                      </td>
                      <td className="text-center px-4 py-3">
                        <span className="text-xs font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">{aff.referral_code}</span>
                      </td>
                      <td className="text-center px-4 py-3 text-xs">{aff.commission_rate}</td>
                      <td className="text-center px-4 py-3">
                        <span className="flex items-center justify-center gap-1 text-xs">
                          <MousePointerClick className="w-3 h-3 text-orange-500" />
                          {aff.clicks}
                        </span>
                      </td>
                      <td className="text-center px-4 py-3">
                        {aff.is_active ? <span className="text-green-500 text-xs font-medium">Active</span> : <span className="text-gray-400 text-xs">Inactive</span>}
                      </td>
                      <td className="text-right px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => startEdit(aff)} className="p-1.5 text-gray-400 hover:text-orange-500">
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button onClick={() => deleteAffiliate(aff.id)} className="p-1.5 text-gray-400 hover:text-red-500">
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
