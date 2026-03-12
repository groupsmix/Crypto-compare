import { Component } from 'react';
import type { ReactNode, ErrorInfo } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home, RotateCcw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-lg mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-danger/20 mb-6">
              <AlertTriangle className="w-10 h-10 text-danger" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">حدث خطأ غير متوقع</h1>
            <p className="text-text-secondary text-lg mb-8 leading-relaxed">
              عذراً، حدث خطأ أثناء تحميل الصفحة. يرجى المحاولة مرة أخرى.
            </p>
            {this.state.error && (
              <div className="glass-card p-4 mb-6 text-left dir-ltr">
                <code className="text-danger text-sm break-all">{this.state.error.message}</code>
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={this.handleReset}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white font-bold hover:opacity-90 transition-all"
              >
                <RotateCcw className="w-5 h-5" />
                حاول مرة أخرى
              </button>
              <Link
                to="/"
                onClick={this.handleReset}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all"
              >
                <Home className="w-5 h-5" />
                الصفحة الرئيسية
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
