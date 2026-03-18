/**
 * Testing Utilities
 * Funciones helper para facilitar el testing con diferentes usuarios
 */

import type { CurrentUser } from '../types';
import type { ProfileData } from '../components/profile/types';
import type { MyGroup } from '../components/groups/types';
import type { Product } from './products';
import { mockUserAna, mockUserCarlos, mockUserMaria } from './mockUsers';
import { mockProfileAna, mockProfileCarlos, mockProfileMaria } from './mockProfiles';
import { mockGroupsAna, mockGroupsCarlos, mockGroupsMaria } from './mockUserGroups';
import { mockListingsAna, mockListingsCarlos, mockListingsMaria } from './mockUserListings';

export type TestUserId = 'ana' | 'carlos' | 'maria';

/**
 * Get complete user data by ID
 */
export function getTestUser(userId: TestUserId): {
  user: CurrentUser;
  profile: ProfileData;
  groups: MyGroup[];
  listings: Product[];
} {
  switch (userId) {
    case 'ana':
      return {
        user: mockUserAna,
        profile: mockProfileAna,
        groups: mockGroupsAna,
        listings: mockListingsAna,
      };
    case 'carlos':
      return {
        user: mockUserCarlos,
        profile: mockProfileCarlos,
        groups: mockGroupsCarlos,
        listings: mockListingsCarlos,
      };
    case 'maria':
      return {
        user: mockUserMaria,
        profile: mockProfileMaria,
        groups: mockGroupsMaria,
        listings: mockListingsMaria,
      };
  }
}

/**
 * Get user summary for console logging
 */
export function logUserSummary(userId: TestUserId): void {
  const { user, profile, groups, listings } = getTestUser(userId);
  
  console.group(`👤 ${user.name} (@${user.username})`);
  console.log(`📧 Email: ${user.email}`);
  console.log(`🔐 Login: ${profile.loginMethod}`);
  console.log(`💎 Plan: ${user.plan}`);
  console.log(`🏢 Account: ${user.accountType}`);
  console.log(`📍 Location: ${user.location?.city}, ${user.location?.region}`);
  console.log(`👥 Groups: ${groups.length} total`);
  
  const adminGroups = groups.filter(g => g.role === 'admin').length;
  const modGroups = groups.filter(g => g.role === 'moderator').length;
  const memberGroups = groups.filter(g => g.role === 'member').length;
  
  if (adminGroups > 0) console.log(`   👑 Admin: ${adminGroups}`);
  if (modGroups > 0) console.log(`   🛡️ Moderator: ${modGroups}`);
  if (memberGroups > 0) console.log(`   👤 Member: ${memberGroups}`);
  
  console.log(`📦 Listings: ${listings.length} total`);
  
  const draftListings = listings.filter(l => l.title.includes('DRAFT')).length;
  const pausedListings = listings.filter(l => l.title.includes('PAUSED')).length;
  const pendingListings = listings.filter(l => l.title.includes('PENDING')).length;
  
  if (draftListings > 0) console.log(`   📝 Draft: ${draftListings}`);
  if (pausedListings > 0) console.log(`   ⏸️ Paused: ${pausedListings}`);
  if (pendingListings > 0) console.log(`   ⏳ Pending: ${pendingListings}`);
  
  console.log(`🏢 Organizations: ${profile.organizations.length}`);
  if (profile.organizations.length > 0) {
    profile.organizations.forEach(org => {
      console.log(`   - ${org.name} (${org.role})`);
    });
  }
  
  console.groupEnd();
}

/**
 * Compare users feature-by-feature
 */
export function compareUsers(): void {
  console.group('🔍 User Feature Comparison');
  
  const users: TestUserId[] = ['ana', 'carlos', 'maria'];
  
  console.table(users.map(userId => {
    const { user, profile, groups, listings } = getTestUser(userId);
    
    return {
      Name: user.name,
      Plan: user.plan,
      Account: user.accountType,
      Login: profile.loginMethod,
      Groups: groups.length,
      'Admin+Mod': groups.filter(g => g.role === 'admin' || g.role === 'moderator').length,
      Listings: listings.length,
      Organizations: profile.organizations.length,
      'Phone Verified': profile.phoneVerified ? '✅' : '❌',
    };
  }));
  
  console.groupEnd();
}

/**
 * Get listings by user ID
 */
export function getListingsByUser(userId: string): Product[] {
  switch (userId) {
    case 'user-ana-google':
      return mockListingsAna;
    case 'user-carlos-apple':
      return mockListingsCarlos;
    case 'user-maria-email':
      return mockListingsMaria;
    default:
      return [];
  }
}

/**
 * Get user's admin/moderator groups
 */
export function getUserAdminGroups(userId: TestUserId): MyGroup[] {
  const { groups } = getTestUser(userId);
  return groups.filter(g => g.role === 'admin' || g.role === 'moderator');
}

/**
 * Check if user has feature access (simplified)
 */
export function hasFeatureAccess(userId: TestUserId, feature: string): boolean {
  const { user } = getTestUser(userId);
  const plan = user.plan || 'free';
  
  const featureMap: Record<string, string[]> = {
    'ai_suggestions': ['free', 'plus', 'pro'],
    'ai_auto_analyze': ['plus', 'pro'],
    'organizations': ['plus', 'pro'],
    'bulk_upload': ['pro'],
    'featured_listings': ['pro'],
  };
  
  return featureMap[feature]?.includes(plan) || false;
}

/**
 * Print complete testing guide
 */
export function printTestingGuide(): void {
  console.group('📚 Testing Guide');
  
  console.log('🔄 To switch users, edit /data/currentUser.ts:');
  console.log('   export const mockCurrentUser = mockUserAna;     // Free');
  console.log('   export const mockCurrentUser = mockUserCarlos;  // Plus');
  console.log('   export const mockCurrentUser = mockUserMaria;   // Pro');
  console.log('');
  
  console.log('👥 Available users:');
  logUserSummary('ana');
  logUserSummary('carlos');
  logUserSummary('maria');
  
  console.log('');
  console.log('📊 Feature Comparison:');
  compareUsers();
  
  console.groupEnd();
}

// Auto-log on import (dev only)
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  console.log('💡 Use printTestingGuide() to see complete testing guide');
  console.log('💡 Use logUserSummary("ana"|"carlos"|"maria") to see user details');
  console.log('💡 Use compareUsers() to see feature comparison');
}
