/**
 * Product Access Validation Utilities
 * Validates if a user has permission to view a product and provides detailed reasons
 */

import type { Product } from '../data/products';
import type { CurrentUser } from '../types';
import { canUserViewProduct } from './productVisibility';

export type AccessDeniedReason = 
  | 'not-authenticated'  // User needs to sign in
  | 'not-member'         // User needs to join the group
  | 'private'            // Product is private (owner-only)
  | 'not-found';         // Product doesn't exist

export interface ProductAccessValidationResult {
  canAccess: boolean;
  reason?: AccessDeniedReason;
  requiredGroupId?: string;
  requiredGroupName?: string;
  productTitle?: string;
}

/**
 * Validates if a user can access a product and provides detailed feedback
 * 
 * This extends canUserViewProduct with specific denial reasons to show better UX
 * 
 * USAGE:
 * ```tsx
 * const result = validateProductAccess(product, currentUser);
 * 
 * if (!result.canAccess) {
 *   // Show access denied sheet with result.reason
 *   showAccessDeniedSheet(result);
 *   return;
 * }
 * 
 * // Proceed with showing product
 * ```
 * 
 * @param product - The product to validate access for
 * @param currentUser - The current user (null if not authenticated)
 * @returns Validation result with access status and denial reason
 */
export function validateProductAccess(
  product: Product | null,
  currentUser: CurrentUser | null
): ProductAccessValidationResult {
  // Product doesn't exist
  if (!product) {
    return { 
      canAccess: false, 
      reason: 'not-found' 
    };
  }

  // Check if user can view using existing visibility logic
  if (canUserViewProduct(product, currentUser)) {
    return { canAccess: true };
  }

  // User cannot view - determine specific reason
  
  // Private products are owner-only
  if (product.visibility === 'private') {
    return { 
      canAccess: false, 
      reason: 'private',
      productTitle: product.title,
    };
  }

  // Group products require authentication AND membership
  if (product.visibility === 'group') {
    const firstGroupId = product.groupIds?.[0];
    
    // Not authenticated at all
    if (!currentUser?.isAuthenticated) {
      return { 
        canAccess: false, 
        reason: 'not-authenticated',
        requiredGroupId: firstGroupId,
        productTitle: product.title,
      };
    }
    
    // Authenticated but not a member of required group
    return { 
      canAccess: false, 
      reason: 'not-member',
      requiredGroupId: firstGroupId,
      productTitle: product.title,
    };
  }

  // Fallback: access denied for unknown reason
  return { canAccess: false };
}

/**
 * Gets a human-readable message for an access denial reason
 * 
 * @param reason - The denial reason
 * @returns User-friendly message
 */
export function getAccessDeniedMessage(reason: AccessDeniedReason): string {
  switch (reason) {
    case 'not-authenticated':
      return 'You need to sign in to view this product';
    case 'not-member':
      return 'This product is only visible to group members';
    case 'private':
      return 'This product is private and only visible to its owner';
    case 'not-found':
      return 'This product could not be found';
    default:
      return 'You do not have access to this product';
  }
}

/**
 * Gets a suggested action for an access denial reason
 * 
 * @param reason - The denial reason
 * @returns Suggested action for the user
 */
export function getAccessDeniedAction(reason: AccessDeniedReason): string {
  switch (reason) {
    case 'not-authenticated':
      return 'Sign in to view this product';
    case 'not-member':
      return 'Join the group to view this product';
    case 'private':
      return 'Contact the owner for access';
    case 'not-found':
      return 'Browse other products';
    default:
      return 'Go back';
  }
}
