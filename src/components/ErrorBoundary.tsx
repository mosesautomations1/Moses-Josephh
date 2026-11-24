import { Component, type ErrorInfo, type ReactNode } from 'react';
import { BRAND } from '../data/brand';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('Application render error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#071426] text-white flex items-center justify-center p-6">
          <div className="max-w-md w-full rounded-2xl bg-[#0B1D38] border border-white/15 p-8 text-center space-y-4">
            <h1 className="font-display font-bold text-2xl text-white">
              {BRAND.brandName}
            </h1>
            <p className="text-sm text-[#DCE5F0]/80 leading-relaxed">
              Something interrupted the page display. Reload the page or contact Moses Joseph
              directly below.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="px-5 py-2.5 rounded-lg bg-[#1677FF] hover:bg-[#2457C5] text-white text-sm font-semibold transition-colors"
              >
                Reload Page
              </button>
              <a
                href={`mailto:${BRAND.email}`}
                className="px-5 py-2.5 rounded-lg border border-white/15 text-sm font-semibold text-[#DCE5F0] hover:text-white transition-colors"
              >
                Email Moses
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
