/**
 * Mock Data - Central Export
 * Exporta todos los datos mock de los 3 usuarios de testing
 * 
 * USUARIOS DISPONIBLES:
 * - Ana García (Google, Free, Individual)
 * - Carlos Mendoza (Apple, Plus, Store)
 * - María López (Email, Pro, Individual)
 */

// Users
export {
  mockUserAna,
  mockUserCarlos,
  mockUserMaria,
  allMockUsers,
  defaultMockUser,
} from './mockUsers';

// Profiles
export {
  mockProfileAna,
  mockProfileCarlos,
  mockProfileMaria,
  allMockProfiles,
} from './mockProfiles';

// Groups
export {
  mockGroupsAna,
  mockGroupsCarlos,
  mockGroupsMaria,
  allMockUserGroups,
} from './mockUserGroups';

// Listings
export {
  mockListingsAna,
  mockListingsCarlos,
  mockListingsMaria,
  allMockUserListings,
  allUserListings,
} from './mockUserListings';

// Stats
export {
  mockSellerAna,
  mockSellerCarlos,
  mockSellerMaria,
  allMockSellers,
  getSellerById,
} from './mockUserStats';

/**
 * CÓMO USAR ESTOS MOCKS:
 * 
 * 1. Cambiar usuario actual:
 *    En /data/currentUser.ts, cambiar:
 *    export const mockCurrentUser = mockUserAna; // o mockUserCarlos o mockUserMaria
 * 
 * 2. Los listings de cada usuario ya están integrados en mockProducts
 * 
 * 3. Los grupos con roles están en mockUserGroups
 * 
 * 4. Los perfiles completos están en mockProfiles
 * 
 * CARACTERÍSTICAS POR USUARIO:
 * 
 * ANA GARCÍA:
 * - Plan: Free
 * - Account: Individual
 * - Login: Google
 * - Groups: 2 (member only)
 * - Listings: 2 (básicos, públicos)
 * - Organizations: 0
 * - Rating: 4.2 ⭐
 * 
 * CARLOS MENDOZA:
 * - Plan: Plus
 * - Account: Store (Business)
 * - Login: Apple
 * - Groups: 3 (2 admin, 1 moderator)
 * - Listings: 5 (1 draft, varios en grupos)
 * - Organizations: 1 (TechStore - owner)
 * - Rating: 4.8 ⭐ ✓ Verified
 * 
 * MARÍA LÓPEZ:
 * - Plan: Pro
 * - Account: Individual
 * - Login: Email
 * - Groups: 4 (1 admin, 1 moderator, 2 member)
 * - Listings: 7 (1 paused, 1 pending, varios tipos)
 * - Organizations: 0 (Individual)
 * - Rating: 4.9 ⭐ 🌟 Featured
 */
