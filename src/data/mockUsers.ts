/**
 * Mock Users - CurrentUser Interface
 * 3 perfiles completos para testing: Google, Apple, Email
 * 
 * Estructura simplificada para uso en componentes (CurrentUser interface)
 */

import type { CurrentUser } from '../types';

/**
 * PERFIL 1: ANA GARCÍA - Google Sign-In
 * - Plan: Free
 * - Account: Individual
 * - Groups: 2 (member only)
 * - Listings: 2
 */
export const mockUserAna: CurrentUser = {
  id: 'user-ana-google',
  name: 'Ana García',
  email: 'ana.garcia@gmail.com',
  username: 'ana_garcia',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
  isAuthenticated: true,
  isVerified: false,
  role: 'user',
  groupIds: ['group1', 'group3'], // Tech Enthusiasts Chile, Local Community V Region
  plan: 'free',
  accountType: 'individual',
  location: {
    city: 'Santiago',
    region: 'Región Metropolitana',
    country: 'Chile',
  },
};

/**
 * PERFIL 2: CARLOS MENDOZA - Apple Sign-In
 * - Plan: Plus
 * - Account: Store (Business)
 * - Groups: 3 (2 admin, 1 moderator)
 * - Organizations: 1 (owner)
 * - Listings: 5 (1 draft)
 */
export const mockUserCarlos: CurrentUser = {
  id: 'user-carlos-apple',
  name: 'Carlos Mendoza',
  email: 'carlos.mendoza@icloud.com',
  username: 'techstore_vina',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
  isAuthenticated: true,
  isVerified: true,
  role: 'user',
  groupIds: ['group1', 'group2', 'group-tech-traders'], // Tech Enthusiasts (admin), Vintage Marketplace (mod), Tech Traders (admin)
  plan: 'plus',
  accountType: 'store',
  location: {
    city: 'Viña del Mar',
    region: 'V Región',
    country: 'Chile',
  },
};

/**
 * PERFIL 3: MARÍA LÓPEZ - Email Sign-In
 * - Plan: Pro
 * - Account: Individual
 * - Groups: 4 (1 admin, 1 moderator, 2 member)
 * - Listings: 7 (1 paused, 1 pending)
 */
export const mockUserMaria: CurrentUser = {
  id: 'user-maria-email',
  name: 'María López',
  email: 'maria.lopez@example.com',
  username: 'maria_concon',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
  isAuthenticated: true,
  isVerified: true,
  role: 'user',
  groupIds: ['group1', 'group2', 'group3', 'group-photography'], // Various roles
  plan: 'pro',
  accountType: 'individual',
  location: {
    city: 'Concón',
    region: 'V Región',
    country: 'Chile',
  },
};

/**
 * PERFIL 4: ANTONIO HIRANE - SuperAdmin
 * - Plan: Pro (full access)
 * - Account: Individual
 * - SuperAdmin privileges
 */
export const mockUserSuperAdmin: CurrentUser = {
  id: 'sa_001',
  name: 'Antonio Hirane',
  email: 'ahirane@gmail.com',
  username: 'superadmin',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Antonio',
  isAuthenticated: true,
  isVerified: true,
  role: 'super_admin',
  groupIds: [],
  plan: 'pro',
  accountType: 'individual',
  location: {
    city: 'Santiago',
    region: 'Región Metropolitana',
    country: 'Chile',
  },
};

/**
 * Default current user (can be switched for testing)
 */
export const defaultMockUser = mockUserAna;

/**
 * All mock users for easy switching
 */
export const allMockUsers = {
  ana: mockUserAna,
  carlos: mockUserCarlos,
  maria: mockUserMaria,
  superadmin: mockUserSuperAdmin,
};