/**
 * App Wrapper
 * Provides a stable mounting point for the App component
 * Helps prevent hot reload issues
 */

import { Suspense } from 'react';
import App from './App';
import { ErrorBoundary } from './components/ErrorBoundary';

function LoadingFallback() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <App />
      </Suspense>
    </ErrorBoundary>
  );
}
