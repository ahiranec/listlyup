/**
 * Centralized Feedback System
 * 
 * Provides consistent user feedback across the entire application
 * 
 * Features:
 * - Standardized toast messages (success, error, info, warning)
 * - Predefined messages for common actions
 * - Consistent duration and styling
 * - Emoji support for visual hierarchy
 * - Description support for detailed feedback
 * 
 * Usage:
 * ```tsx
 * import { feedback } from '@/lib/feedback';
 * 
 * // Simple success
 * feedback.success('Item saved!');
 * 
 * // With description
 * feedback.success('Answer published!', {
 *   description: 'The user will be notified'
 * });
 * 
 * // Predefined actions
 * feedback.actions.published('Answer');
 * feedback.actions.deleted('Listing');
 * feedback.actions.updated('Profile');
 * ```
 */

import { toast } from 'sonner@2.0.3';

// ============================================================================
// CONFIGURATION
// ============================================================================

const DURATIONS = {
  short: 3000,    // 3s - Simple confirmations
  medium: 4000,   // 4s - Default for most actions
  long: 6000,     // 6s - Important info or errors
} as const;

const EMOJIS = {
  success: '✅',
  error: '❌',
  warning: '⚠️',
  info: 'ℹ️',
  loading: '⏳',
  celebrate: '🎉',
  rocket: '🚀',
  checkmark: '✓',
  bell: '🔔',
  money: '💰',
  trade: '🔄',
  message: '💬',
  heart: '❤️',
} as const;

// ============================================================================
// TYPES
// ============================================================================

interface FeedbackOptions {
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// ============================================================================
// CORE FEEDBACK FUNCTIONS
// ============================================================================

/**
 * Success feedback - Green toast with checkmark
 * Use for: Completed actions, successful saves, confirmations
 */
function success(message: string, options?: FeedbackOptions) {
  return toast.success(message, {
    description: options?.description,
    duration: options?.duration || DURATIONS.medium,
    action: options?.action,
  });
}

/**
 * Error feedback - Red toast with X
 * Use for: Failed actions, validation errors, API errors
 */
function error(message: string, options?: FeedbackOptions) {
  return toast.error(message, {
    description: options?.description,
    duration: options?.duration || DURATIONS.long,
    action: options?.action,
  });
}

/**
 * Info feedback - Blue toast with info icon
 * Use for: General information, tips, notifications
 */
function info(message: string, options?: FeedbackOptions) {
  return toast.info(message, {
    description: options?.description,
    duration: options?.duration || DURATIONS.medium,
    action: options?.action,
  });
}

/**
 * Warning feedback - Orange toast with warning icon
 * Use for: Warnings, cautions, important notices
 */
function warning(message: string, options?: FeedbackOptions) {
  return toast.warning(message, {
    description: options?.description,
    duration: options?.duration || DURATIONS.medium,
    action: options?.action,
  });
}

/**
 * Loading feedback - Shows loading state
 * Use for: Long-running operations
 * Returns a function to dismiss the toast
 */
function loading(message: string, options?: Omit<FeedbackOptions, 'action'>) {
  return toast.loading(message, {
    description: options?.description,
    duration: options?.duration || Infinity, // Don't auto-dismiss
  });
}

/**
 * Promise feedback - Automatically shows loading, success, or error
 * Use for: Async operations with clear success/error states
 */
function promise<T>(
  promise: Promise<T>,
  messages: {
    loading: string;
    success: string | ((data: T) => string);
    error: string | ((error: any) => string);
  }
) {
  return toast.promise(promise, messages);
}

// ============================================================================
// PREDEFINED ACTION MESSAGES
// ============================================================================

/**
 * Predefined messages for common CRUD operations
 * Ensures consistency across the app
 */
const actions = {
  // CREATE
  created: (itemType: string, options?: FeedbackOptions) =>
    success(`${itemType} created successfully! ${EMOJIS.celebrate}`, options),

  published: (itemType: string, options?: FeedbackOptions) =>
    success(`${itemType} published successfully! ${EMOJIS.rocket}`, options),

  sent: (itemType: string, options?: FeedbackOptions) =>
    success(`${itemType} sent successfully! ${EMOJIS.checkmark}`, options),

  // UPDATE
  updated: (itemType: string, options?: FeedbackOptions) =>
    success(`${itemType} updated successfully! ${EMOJIS.success}`, options),

  saved: (itemType: string, options?: FeedbackOptions) =>
    success(`${itemType} saved! ${EMOJIS.success}`, options),

  // DELETE
  deleted: (itemType: string, options?: FeedbackOptions) =>
    success(`${itemType} deleted successfully`, options),

  removed: (itemType: string, options?: FeedbackOptions) =>
    success(`${itemType} removed`, options),

  // ERRORS
  failedToCreate: (itemType: string, options?: FeedbackOptions) =>
    error(`Failed to create ${itemType}. Please try again.`, options),

  failedToUpdate: (itemType: string, options?: FeedbackOptions) =>
    error(`Failed to update ${itemType}. Please try again.`, options),

  failedToDelete: (itemType: string, options?: FeedbackOptions) =>
    error(`Failed to delete ${itemType}. Please try again.`, options),

  failedToLoad: (itemType: string, options?: FeedbackOptions) =>
    error(`Failed to load ${itemType}. Please try again.`, options),

  // SPECIFIC ACTIONS
  copied: (options?: FeedbackOptions) =>
    success('Copied to clipboard! ${EMOJIS.success}', options),

  shared: (options?: FeedbackOptions) =>
    success('Shared successfully! ${EMOJIS.rocket}', options),

  liked: (options?: FeedbackOptions) =>
    info('Added to favorites ${EMOJIS.heart}', { ...options, duration: DURATIONS.short }),

  unliked: (options?: FeedbackOptions) =>
    info('Removed from favorites', { ...options, duration: DURATIONS.short }),

  reported: (options?: FeedbackOptions) =>
    success('Report submitted. We\'ll review it shortly.', options),

  blocked: (username: string, options?: FeedbackOptions) =>
    success(`${username} has been blocked`, options),

  unblocked: (username: string, options?: FeedbackOptions) =>
    success(`${username} has been unblocked`, options),
};

// ============================================================================
// SPECIFIC DOMAIN ACTIONS
// ============================================================================

/**
 * Trade & Offer specific feedback
 */
const trade = {
  offerSent: (itemName: string, recipientName: string) =>
    success(`Trade offer sent! ${EMOJIS.trade}`, {
      description: `${recipientName} will be notified about your offer for ${itemName}`,
    }),

  offerAccepted: (fromUser: string) =>
    success(`Trade accepted! ${EMOJIS.celebrate}`, {
      description: `You can now arrange pickup/delivery with ${fromUser}`,
      duration: DURATIONS.long,
    }),

  offerDeclined: () =>
    info('Trade offer declined', {
      description: 'The other user has been notified',
    }),

  counterOfferSent: (toUser: string) =>
    success(`Counter offer sent! ${EMOJIS.money}`, {
      description: `${toUser} will be notified`,
    }),
};

/**
 * Messaging specific feedback
 */
const messaging = {
  messageSent: () =>
    success('Message sent! ${EMOJIS.message}', { duration: DURATIONS.short }),

  answerPublished: (askedBy: string, waitingCount?: number) =>
    success(`Answer published! ${EMOJIS.celebrate}`, {
      description: waitingCount 
        ? `${askedBy} and ${waitingCount} ${waitingCount === 1 ? 'other person' : 'others'} will be notified`
        : `${askedBy} will be notified`,
    }),

  questionAsked: (sellerName: string) =>
    success('Question sent! ${EMOJIS.bell}', {
      description: `${sellerName} will be notified`,
    }),
};

/**
 * Listing specific feedback
 */
const listing = {
  published: (listingType: string) =>
    success(`${listingType} published successfully! ${EMOJIS.rocket}`, {
      description: 'Your listing is now live and visible to everyone',
      duration: DURATIONS.long,
    }),

  updated: () =>
    success('Listing updated! ${EMOJIS.success}', {
      description: 'Changes are now visible to everyone',
    }),

  deleted: () =>
    success('Listing deleted', {
      description: 'Your listing has been removed',
    }),

  paused: () =>
    info('Listing paused', {
      description: 'Your listing is now hidden from search',
    }),

  resumed: () =>
    success('Listing resumed! ${EMOJIS.success}', {
      description: 'Your listing is now visible again',
    }),

  markedAsSold: () =>
    success('Marked as sold! ${EMOJIS.celebrate}', {
      description: 'Your listing will be archived',
    }),
};

/**
 * Group specific feedback
 */
const group = {
  joined: (groupName: string) =>
    success(`Joined ${groupName}! ${EMOJIS.celebrate}`, {
      description: 'You can now see listings from this group',
    }),

  left: (groupName: string) =>
    info(`Left ${groupName}`, {
      description: 'You won\'t see listings from this group anymore',
    }),

  requestSent: (groupName: string) =>
    success('Join request sent! ${EMOJIS.bell}', {
      description: `${groupName} admins will review your request`,
    }),

  requestAccepted: (username: string, groupName: string) =>
    success(`${username} joined ${groupName}! ${EMOJIS.celebrate}`, {
      description: 'They can now see and post listings',
    }),

  requestDeclined: (username: string) =>
    info(`${username}'s request declined`, {
      description: 'They have been notified',
    }),
};

/**
 * Authentication specific feedback
 */
const auth = {
  signedIn: (username: string) =>
    success(`Welcome back, ${username}! ${EMOJIS.celebrate}`, {
      duration: DURATIONS.short,
    }),

  signedOut: () =>
    info('Signed out successfully', { duration: DURATIONS.short }),

  signedUp: (username: string) =>
    success(`Welcome to ListlyUp, ${username}! ${EMOJIS.rocket}`, {
      description: 'Your account has been created',
      duration: DURATIONS.long,
    }),

  passwordChanged: () =>
    success('Password changed successfully! ${EMOJIS.success}', {
      description: 'Your account is now more secure',
    }),

  emailVerified: () =>
    success('Email verified! ${EMOJIS.success}', {
      description: 'You can now access all features',
    }),
};

// ============================================================================
// CONFIRMATION HELPERS
// ============================================================================

/**
 * Standard confirmation dialog
 * Returns a promise that resolves to true if confirmed, false if cancelled
 */
function confirm(message: string, options?: { title?: string; confirmText?: string; cancelText?: string }): Promise<boolean> {
  return new Promise((resolve) => {
    const confirmed = window.confirm(
      options?.title ? `${options.title}\n\n${message}` : message
    );
    resolve(confirmed);
  });
}

/**
 * Confirmation for destructive actions
 */
async function confirmDelete(itemType: string, itemName?: string): Promise<boolean> {
  const message = itemName 
    ? `Are you sure you want to delete "${itemName}"? This action cannot be undone.`
    : `Are you sure you want to delete this ${itemType}? This action cannot be undone.`;
  
  return confirm(message, { title: '⚠️ Delete Confirmation' });
}

// ============================================================================
// EXPORT
// ============================================================================

export const feedback = {
  // Core functions
  success,
  error,
  info,
  warning,
  loading,
  promise,
  
  // Generic actions
  actions,
  
  // Domain-specific
  trade,
  messaging,
  listing,
  group,
  auth,
  
  // Confirmations
  confirm,
  confirmDelete,
  
  // Constants (for custom usage)
  DURATIONS,
  EMOJIS,
};

// Default export
export default feedback;
