/**
 * Mock Credentials for Development
 * Maps email/password to user roles
 */

import type { CurrentUser } from '../types';
import { mockUserAna, mockUserCarlos, mockUserMaria, mockUserSuperAdmin } from './mockUsers';

export interface MockCredential {
  email: string;
  password: string;
  user: CurrentUser;
}

/**
 * Mock credentials database
 * In production, this would be handled by backend authentication
 */
export const MOCK_CREDENTIALS: MockCredential[] = [
  {
    email: 'ana.garcia@gmail.com',
    password: 'ana123',
    user: mockUserAna,
  },
  {
    email: 'carlos.mendoza@icloud.com',
    password: 'carlos123',
    user: mockUserCarlos,
  },
  {
    email: 'maria.lopez@example.com',
    password: 'maria123',
    user: mockUserMaria,
  },
  {
    email: 'ahirane@gmail.com',
    password: 'ah901990',
    user: mockUserSuperAdmin,
  },
];

/**
 * Verify credentials and return user if valid
 * @param email - User email
 * @param password - User password
 * @returns User object if credentials are valid, null otherwise
 */
export function verifyCredentials(email: string, password: string): CurrentUser | null {
  console.log('🔍 [verifyCredentials] Checking credentials...');
  console.log('🔍 [verifyCredentials] Email:', email);
  console.log('🔍 [verifyCredentials] Password:', password);
  console.log('🔍 [verifyCredentials] Available credentials:', MOCK_CREDENTIALS.map(c => c.email));
  
  const credential = MOCK_CREDENTIALS.find(
    (cred) => cred.email === email && cred.password === password
  );
  
  console.log('🔍 [verifyCredentials] Found credential:', credential ? 'YES' : 'NO');
  
  return credential ? credential.user : null;
}

/**
 * Check if user is SuperAdmin
 * @param user - User object
 * @returns true if user has super_admin role
 */
export function isSuperAdminUser(user: CurrentUser): boolean {
  return user.role === 'super_admin';
}
