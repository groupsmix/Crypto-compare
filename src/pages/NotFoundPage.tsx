import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen py-24 px-4 flex items-center justify-center">
      <motion.div
        className="max-w-lg mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <motion.div
          className="text-8xl md:text-9xl font-bold gradient-text mb-6"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          404
        </motion.div>
        <h1 className="text-3xl font-bold text-white mb-4">الصفحة غير موجودة</h1>
        <p className="text-text-secondary text-lg mb-8 leading-relaxed">
          عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها. يمكنك العودة للصفحة الرئيسية أو تصفح المنصات.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white font-bold hover:opacity-90 transition-all"
          >
            <Home className="w-5 h-5" />
            الصفحة الرئيسية
          </Link>
          <Link
            to="/compare"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all"
          >
            <Search className="w-5 h-5" />
            تصفح المنصات
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
