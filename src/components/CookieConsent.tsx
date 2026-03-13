import { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setVisible(false);
  };

  const dismiss = () => {
    localStorage.setItem('cookie-consent', 'dismissed');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 animate-slide-up">
      <div className="glass-card p-4 border border-white/10 shadow-2xl">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Cookie className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-text-secondary text-sm leading-relaxed mb-3">
              نستخدم ملفات تعريف الارتباط لتحسين تجربتك. باستمرارك في التصفح، أنت توافق على استخدامها.
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={accept}
                className="px-4 py-1.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                موافق
              </button>
              <button
                onClick={dismiss}
                className="px-4 py-1.5 rounded-lg bg-white/5 text-text-secondary text-sm hover:bg-white/10 transition-colors"
              >
                رفض
              </button>
            </div>
          </div>
          <button onClick={dismiss} className="text-text-secondary hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
