import { useState } from 'react';
import { Mail, ArrowRight, Check } from 'lucide-react';

interface NewsletterSignupProps {
  variant?: 'inline' | 'card' | 'banner';
  className?: string;
}

export default function NewsletterSignup({ variant = 'card', className = '' }: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Store email locally (replace with real email service like Mailchimp/Brevo)
    const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
    if (!subscribers.includes(email)) {
      subscribers.push(email);
      localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
    }

    // Track event
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'newsletter_signup', {
        event_category: 'engagement',
        event_label: 'newsletter',
      });
    }

    setSubscribed(true);
    setEmail('');
  };

  if (subscribed) {
    return (
      <div className={`flex items-center gap-2 text-green-500 font-medium ${className}`}>
        <Check className="w-5 h-5" />
        <span>Thanks for subscribing! Check your inbox.</span>
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
            placeholder="Your email address"
            required
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2.5 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all text-sm"
        >
          Subscribe
        </button>
      </form>
    );
  }

  if (variant === 'banner') {
    return (
      <div className={`bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl p-6 sm:p-8 ${className}`}>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-xl font-bold text-white mb-1">Stay Ahead of the Market</h3>
            <p className="text-orange-100 text-sm">Get weekly crypto exchange updates, fee changes, and exclusive deals.</p>
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2 w-full sm:w-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              required
              className="flex-1 sm:w-64 px-4 py-2.5 bg-white/20 backdrop-blur-sm text-white placeholder-orange-200 border border-white/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-white text-orange-600 font-semibold rounded-xl hover:bg-orange-50 transition-all text-sm whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Default card variant
  return (
    <div className={`bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 ${className}`}>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950/50 flex items-center justify-center">
          <Mail className="w-5 h-5 text-orange-500" />
        </div>
        <div>
          <h3 className="font-bold text-sm">Weekly Crypto Newsletter</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">Free exchange updates & market insights</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all text-sm"
        >
          Subscribe Free <ArrowRight className="w-4 h-4" />
        </button>
      </form>
      <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 text-center">No spam. Unsubscribe anytime.</p>
    </div>
  );
}
