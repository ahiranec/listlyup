/**
 * Mock Data Validation
 * Verificaciones automáticas de consistencia y completitud
 */

import { mockUserAna, mockUserCarlos, mockUserMaria } from './mockUsers';
import { mockProfileAna, mockProfileCarlos, mockProfileMaria } from './mockProfiles';
import { mockGroupsAna, mockGroupsCarlos, mockGroupsMaria } from './mockUserGroups';
import { mockListingsAna, mockListingsCarlos, mockListingsMaria } from './mockUserListings';
import { mockSellerAna, mockSellerCarlos, mockSellerMaria } from './mockUserStats';
import type { CurrentUser } from '../types';
import type { ProfileData } from '../components/profile/types';
import type { MyGroup } from '../components/groups/types';
import type { Product } from './products';
import type { Seller } from '../types';

interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Validate a single user's data consistency
 */
function validateUser(
  user: CurrentUser,
  profile: ProfileData,
  groups: MyGroup[],
  listings: Product[],
  seller: Seller
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check ID consistency
  if (user.id !== seller.id) {
    errors.push(`User ID mismatch: ${user.id} vs ${seller.id}`);
  }

  // Check email consistency
  if (user.email !== profile.email) {
    errors.push(`Email mismatch: ${user.email} vs ${profile.email}`);
  }

  // Check username consistency
  if (user.username !== profile.username) {
    errors.push(`Username mismatch: ${user.username} vs ${profile.username}`);
  }

  // Check plan consistency (case-insensitive)
  if (user.plan && user.plan.toLowerCase() !== profile.plan.toLowerCase()) {
    errors.push(`Plan mismatch: ${user.plan} vs ${profile.plan}`);
  }

  // Check accountType mapping
  const accountTypeMap: Record<string, string> = {
    'personal': 'individual',
    'business': 'store',
  };
  
  const expectedAccountType = accountTypeMap[profile.accountType];
  if (user.accountType !== expectedAccountType) {
    errors.push(
      `AccountType mismatch: CurrentUser has "${user.accountType}" but ProfileData has "${profile.accountType}" (expected "${expectedAccountType}")`
    );
  }

  // Check groupIds consistency
  const userGroupIds = new Set(user.groupIds);
  const groupsGroupIds = new Set(groups.map(g => g.id));
  
  const missingInGroups = [...userGroupIds].filter(id => !groupsGroupIds.has(id));
  const extraInGroups = [...groupsGroupIds].filter(id => !userGroupIds.has(id));
  
  if (missingInGroups.length > 0) {
    errors.push(`Groups missing in MyGroup[]: ${missingInGroups.join(', ')}`);
  }
  
  if (extraInGroups.length > 0) {
    errors.push(`Extra groups in MyGroup[] not in CurrentUser: ${extraInGroups.join(', ')}`);
  }

  // Check listings ownership
  const wrongOwner = listings.filter(l => l.ownerId !== user.id);
  if (wrongOwner.length > 0) {
    errors.push(`${wrongOwner.length} listings have wrong ownerId`);
  }

  // Check Organizations consistency
  if (profile.accountType === 'personal' && profile.organizations.length > 0) {
    errors.push('Personal accounts cannot have organizations');
  }

  if (user.plan === 'free' && profile.organizations.length > 0) {
    errors.push('Free plan cannot have organizations');
  }

  if (profile.accountType === 'business' && user.plan !== 'free' && profile.organizations.length > 1) {
    warnings.push('Plus plan should have max 1 organization');
  }

  // Check loginMethod validity
  const validLoginMethods = ['email', 'google', 'apple'];
  if (!validLoginMethods.includes(profile.loginMethod)) {
    errors.push(`Invalid loginMethod: ${profile.loginMethod}`);
  }

  // Check group roles validity
  const validGroupRoles = ['admin', 'moderator', 'member'];
  const invalidRoles = groups.filter(g => !validGroupRoles.includes(g.role));
  if (invalidRoles.length > 0) {
    errors.push(`Invalid group roles found: ${invalidRoles.map(g => `${g.name}:${g.role}`).join(', ')}`);
  }

  // Check organization roles validity
  const validOrgRoles = ['owner', 'admin', 'member'];
  const invalidOrgRoles = profile.organizations.filter(o => !validOrgRoles.includes(o.role));
  if (invalidOrgRoles.length > 0) {
    errors.push(`Invalid organization roles: ${invalidOrgRoles.map(o => `${o.name}:${o.role}`).join(', ')}`);
  }

  // Check addresses
  if (profile.addresses.length === 0) {
    warnings.push('User has no addresses');
  }

  const defaultAddresses = profile.addresses.filter(a => a.isDefaultForPublishing);
  if (defaultAddresses.length === 0) {
    warnings.push('No default address for publishing');
  } else if (defaultAddresses.length > 1) {
    errors.push('Multiple default addresses for publishing');
  }

  // Check seller stats consistency
  if (seller.username !== user.username) {
    errors.push(`Seller username mismatch: ${seller.username} vs ${user.username}`);
  }

  if (seller.isStore !== (user.accountType === 'store')) {
    errors.push(`Seller isStore mismatch: ${seller.isStore} vs accountType=${user.accountType}`);
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validate all mock users
 */
export function validateAllMockData(): Record<string, ValidationResult> {
  const results = {
    ana: validateUser(mockUserAna, mockProfileAna, mockGroupsAna, mockListingsAna, mockSellerAna),
    carlos: validateUser(mockUserCarlos, mockProfileCarlos, mockGroupsCarlos, mockListingsCarlos, mockSellerCarlos),
    maria: validateUser(mockUserMaria, mockProfileMaria, mockGroupsMaria, mockListingsMaria, mockSellerMaria),
  };

  return results;
}

/**
 * Print validation report to console
 */
export function printValidationReport(): void {
  console.group('🔍 Mock Data Validation Report');
  
  const results = validateAllMockData();
  let allValid = true;
  
  Object.entries(results).forEach(([userId, result]) => {
    const icon = result.valid ? '✅' : '❌';
    console.group(`${icon} ${userId.toUpperCase()}`);
    
    if (result.errors.length > 0) {
      allValid = false;
      console.group('❌ Errors');
      result.errors.forEach(err => console.error(`  - ${err}`));
      console.groupEnd();
    }
    
    if (result.warnings.length > 0) {
      console.group('⚠️ Warnings');
      result.warnings.forEach(warn => console.warn(`  - ${warn}`));
      console.groupEnd();
    }
    
    if (result.valid && result.warnings.length === 0) {
      console.log('✅ All checks passed!');
    }
    
    console.groupEnd();
  });
  
  console.log('');
  if (allValid) {
    console.log('✅ ALL MOCK DATA IS VALID!');
  } else {
    console.error('❌ VALIDATION FAILED - Please fix errors above');
  }
  
  console.groupEnd();
}

/**
 * Get validation summary
 */
export function getValidationSummary(): {
  totalErrors: number;
  totalWarnings: number;
  allValid: boolean;
  details: Record<string, { errors: number; warnings: number }>;
} {
  const results = validateAllMockData();
  
  let totalErrors = 0;
  let totalWarnings = 0;
  const details: Record<string, { errors: number; warnings: number }> = {};
  
  Object.entries(results).forEach(([userId, result]) => {
    totalErrors += result.errors.length;
    totalWarnings += result.warnings.length;
    details[userId] = {
      errors: result.errors.length,
      warnings: result.warnings.length,
    };
  });
  
  return {
    totalErrors,
    totalWarnings,
    allValid: totalErrors === 0,
    details,
  };
}

// Auto-validate on import (dev only)
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  // Run validation after a small delay to not block initial load
  setTimeout(() => {
    printValidationReport();
  }, 1000);
}
