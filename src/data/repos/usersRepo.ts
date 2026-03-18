/**
 * UsersRepo — Pre-Supabase Repository Layer
 *
 * SOURCE OF TRUTH: mockCurrentUser (src/data/currentUser.ts → mockUserAna)
 * This is the ONLY mock source consumed by this repository.
 *
 * INTENTIONALLY IGNORED legacy mock sources:
 * - mockUserCarlos, mockUserMaria (plan-specific test variants, not the active user)
 * - mockUserSuperAdmin (SuperAdmin session handled separately via useSuperAdminSession)
 * - mockProfiles (profile-page-specific view mock, not the core user identity)
 * - mockGuestUser (unauthenticated guest state, managed by auth state, not this repo)
 * - allMockUsers (testing utility, not a production data source)
 *
 * When Supabase is connected:
 * → Replace body with supabase.auth.getUser() + profiles table query
 * → Keep the same return types
 * → No hook changes required
 */

import { mockCurrentUser } from "../currentUser";
import type { CurrentUser } from "../../types";

export const usersRepo = {
  /**
   * Returns the currently authenticated user.
   * Will become supabase.auth.getUser() + profiles join.
   */
  getCurrentUser(): CurrentUser {
    return mockCurrentUser;
  },

  /**
   * Returns a user by their ID.
   * Will become supabase.from('profiles').select('*').eq('id', id).single().
   * Currently returns mockCurrentUser only if ID matches (illustrative stub).
   */
  getUserById(id: string): CurrentUser | undefined {
    if (mockCurrentUser.id === id) return mockCurrentUser;
    return undefined;
  },
};
