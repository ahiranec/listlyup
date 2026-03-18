/**
 * Toaster Component
 * 
 * Centralized toast notifications using Sonner
 * Provides consistent styling across the app
 * 
 * Usage:
 * Add this component once in your root layout/App.tsx:
 * ```tsx
 * import { Toaster } from './components/ui/toaster';
 * 
 * function App() {
 *   return (
 *     <>
 *       <YourApp />
 *       <Toaster />
 *     </>
 *   );
 * }
 * ```
 */

import { Toaster as Sonner } from 'sonner@2.0.3';

export function Toaster() {
  return (
    <Sonner
      position="top-center"
      expand={false}
      richColors
      closeButton
      duration={4000}
      toastOptions={{
        style: {
          borderRadius: '12px',
          padding: '16px',
        },
        className: 'group toast',
        descriptionClassName: 'group-[.toast]:text-muted-foreground',
      }}
    />
  );
}
