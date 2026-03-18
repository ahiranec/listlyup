/**
 * useFeedback Hook
 * 
 * React hook wrapper for the feedback system
 * Provides type-safe access to all feedback functions
 * 
 * Usage:
 * ```tsx
 * function MyComponent() {
 *   const feedback = useFeedback();
 *   
 *   const handleSave = async () => {
 *     try {
 *       await saveData();
 *       feedback.actions.saved('Profile');
 *     } catch (error) {
 *       feedback.actions.failedToUpdate('Profile');
 *     }
 *   };
 *   
 *   return <button onClick={handleSave}>Save</button>;
 * }
 * ```
 */

import { useCallback } from 'react';
import { feedback } from '@/lib/feedback';

export function useFeedback() {
  // Wrap feedback functions in useCallback to prevent unnecessary re-renders
  const showSuccess = useCallback(feedback.success, []);
  const showError = useCallback(feedback.error, []);
  const showInfo = useCallback(feedback.info, []);
  const showWarning = useCallback(feedback.warning, []);
  const showLoading = useCallback(feedback.loading, []);
  const showPromise = useCallback(feedback.promise, []);
  const showConfirm = useCallback(feedback.confirm, []);
  const showConfirmDelete = useCallback(feedback.confirmDelete, []);

  return {
    // Core functions
    success: showSuccess,
    error: showError,
    info: showInfo,
    warning: showWarning,
    loading: showLoading,
    promise: showPromise,
    
    // Generic actions
    actions: feedback.actions,
    
    // Domain-specific
    trade: feedback.trade,
    messaging: feedback.messaging,
    listing: feedback.listing,
    group: feedback.group,
    auth: feedback.auth,
    
    // Confirmations
    confirm: showConfirm,
    confirmDelete: showConfirmDelete,
    
    // Constants
    DURATIONS: feedback.DURATIONS,
    EMOJIS: feedback.EMOJIS,
  };
}

export default useFeedback;
