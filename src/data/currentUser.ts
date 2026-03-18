import type { CurrentUser } from '../types';
import { mockUserAna, mockUserCarlos, mockUserMaria } from './mockUsers';

/**
 * Mock authenticated user
 * Switch between different test users:
 * - mockUserAna: Free plan, Individual, Google sign-in
 * - mockUserCarlos: Plus plan, Store, Apple sign-in
 * - mockUserMaria: Pro plan, Individual, Email sign-in
 * 
 * IMPORTANT: Products with visibility="group" are only visible if:
 * - The user is authenticated (isAuthenticated === true)
 * - The product's groupIds includes a group that the user belongs to
 */
export const mockCurrentUser: CurrentUser = mockUserAna; // Change to mockUserCarlos or mockUserMaria for testing

/**
 * Mock unauthenticated user (not logged in)
 * Can only see products with visibility="public"
 */
export const mockGuestUser: CurrentUser = {
  id: "",
  name: "Guest",
  email: "",
  isAuthenticated: false,
  groupIds: [],
};