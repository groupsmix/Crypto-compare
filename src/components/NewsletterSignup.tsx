import { useState } from 'react';
import { Mail, CheckCircle, ArrowRight } from 'lucide-react';

interface NewsletterSignupProps {
  variant?: 'inline' | 'card' | 'banner';
  className?: string;
}

export default function NewsletterSignup({ variant = 'card', className = '' }: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    // Store subscriber locally (replace with real email service like Mailchimp/Brevo)
    const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
    if (subscribers.includes(email)) {
      setError('This email is already subscribed!');
      return;
    }
    subscribers.push(email);
    localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));

    setSubmitted(true);
    setEmail('');
  };

  if (submitted) {
    return (
      <div className={`flex items-center gap-3 p-4 bg-green-50 dark:bg-green-950/30 rounded-xl border border-green-200 dark:border-green-800 ${className}`}>
        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
        <div>
          <p className="font-medium text-green-800 dark:text-green-300">Subscribed!</p>
          <p className="text-sm text-green-600 dark:text-green-400">You'll receive weekly crypto market updates.</p>
        </div>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2.5 bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all flex items-center gap-1.5"
        >
          Subscribe <ArrowRight className="w-3.5 h-3.5" />
        </button>
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </form>
    );
  }

  if (variant === 'banner') {
    return (
      <div className={`bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl p-6 md:p-8 ${className}`}>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
              Get Weekly Crypto Insights
            </h3>
            <p className="text-orange-100 text-sm md:text-base">
              Free market updates, exchange deals, and expert analysis delivered to your inbox every week.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2 w-full md:w-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 md:w-64 px-4 py-3 rounded-xl bg-white/20 backdrop-blur-sm text-white placeholder-orange-200 border border-white/30 text-sm focus:ring-2 focus:ring-white focus:border-transparent outline-none"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-orange-600 text-sm font-bold rounded-xl hover:bg-orange-50 transition-colors flex-shrink-0"
            >
              Subscribe
            </button>
          </form>
        </div>
        {error && <p className="text-xs text-white/80 mt-2 text-center md:text-right">{error}</p>}
      </div>
    );
  }

  // Card variant (default)
  return (
    <div className={`bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 ${className}`}>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950/50 flex items-center justify-center">
          <Mail className="w-5 h-5 text-orange-500" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white">Newsletter</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">Weekly crypto updates</p>
        </div>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Get the latest exchange reviews, market analysis, and exclusive deals delivered to your inbox.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="relative mb-3">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
          />
        </div>
        {error && <p className="text-xs text-red-500 mb-2">{error}</p>}
        <button
          type="submit"
          className="w-full py-2.5 bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all"
        >
          Subscribe Free
        </button>
      </form>
      <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 text-center">No spam. Unsubscribe anytime.</p>
    </div>
  );
}
