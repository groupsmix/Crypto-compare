import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  Sparkles,
  Trash2,
  Eye,
  EyeOff,
  ArrowLeft,
  Loader2,
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'https://api.cryptoranked.xyz';

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  read_time: number;
  is_published: boolean;
  is_ai_generated: boolean;
}

export default function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [topic, setTopic] = useState('');
  const [showGenerate, setShowGenerate] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('admin_token');

  useEffect(() => {
    if (!token) { navigate('/admin'); return; }
    fetchPosts();
  }, [token, navigate]);

  const fetchPosts = async () => {
    try {
      const res = await fetch(`${API_URL}/api/blog/admin/posts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) { navigate('/admin'); return; }
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const generatePost = async () => {
    if (generating) return;
    setGenerating(true);
    try {
      const res = await fetch(`${API_URL}/api/blog/admin/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ topic }),
      });
      if (!res.ok) throw new Error('Generation failed');
      setTopic('');
      setShowGenerate(false);
      await fetchPosts();
    } catch {
      alert('Failed to generate blog post. Make sure GEMINI_API_KEY is configured.');
    } finally {
      setGenerating(false);
    }
  };

  const togglePublish = async (post: BlogPost) => {
    try {
      await fetch(`${API_URL}/api/blog/admin/posts/${post.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ is_published: !post.is_published }),
      });
      await fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  const deletePost = async (post: BlogPost) => {
    if (!confirm(`Delete "${post.title}"?`)) return;
    try {
      await fetch(`${API_URL}/api/blog/admin/posts/${post.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchPosts();
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
            <FileText className="w-6 h-6 text-orange-500" />
            Blog Management
          </h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowGenerate(!showGenerate)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white text-sm font-semibold rounded-xl hover:bg-purple-600 transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            AI Generate
          </button>
        </div>
      </div>

      {/* AI Generate Section */}
      {showGenerate && (
        <div className="mb-6 bg-purple-50 dark:bg-purple-950/20 rounded-xl border border-purple-200 dark:border-purple-800 p-5">
          <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-500" />
            Generate AI Blog Post
          </h3>
          <div className="flex gap-3">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter topic (leave empty for random crypto topic)..."
              className="flex-1 px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={generatePost}
              disabled={generating}
              className="flex items-center gap-2 px-6 py-2.5 bg-purple-500 text-white text-sm font-semibold rounded-xl hover:bg-purple-600 disabled:opacity-50 transition-colors"
            >
              {generating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate
                </>
              )}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Uses Google Gemini to write a humanized, SEO-optimized blog post. Takes 10-30 seconds.
          </p>
        </div>
      )}

      {/* Posts Table */}
      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading posts...</div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
          <p className="text-gray-500">No blog posts yet. Generate one with AI!</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                <th className="text-left px-4 py-3 font-semibold">Title</th>
                <th className="text-center px-4 py-3 font-semibold">Category</th>
                <th className="text-center px-4 py-3 font-semibold">Date</th>
                <th className="text-center px-4 py-3 font-semibold">Type</th>
                <th className="text-center px-4 py-3 font-semibold">Status</th>
                <th className="text-right px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/30">
                  <td className="px-4 py-3">
                    <div className="font-medium line-clamp-1">{post.title}</div>
                    <div className="text-xs text-gray-400">/{post.slug}</div>
                  </td>
                  <td className="text-center px-4 py-3">
                    <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-full">{post.category}</span>
                  </td>
                  <td className="text-center px-4 py-3 text-gray-500">{post.date}</td>
                  <td className="text-center px-4 py-3">
                    {post.is_ai_generated ? (
                      <span className="text-xs px-2 py-0.5 bg-purple-100 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 rounded-full flex items-center gap-1 justify-center">
                        <Sparkles className="w-3 h-3" /> AI
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">Manual</span>
                    )}
                  </td>
                  <td className="text-center px-4 py-3">
                    {post.is_published ? (
                      <span className="text-xs text-green-500 font-medium">Published</span>
                    ) : (
                      <span className="text-xs text-gray-400">Draft</span>
                    )}
                  </td>
                  <td className="text-right px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => togglePublish(post)}
                        className="p-1.5 text-gray-400 hover:text-orange-500 transition-colors"
                        title={post.is_published ? 'Unpublish' : 'Publish'}
                      >
                        {post.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => deletePost(post)}
                        className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
