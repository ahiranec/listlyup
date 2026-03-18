import { useState, useEffect } from 'react';
import type { CurrentUser } from '../types';
import { mockUserAna, mockUserCarlos, mockUserMaria, mockUserSuperAdmin } from '../data/mockUsers';
import { getSuperAdminSession } from '../dev/mockAuth';

/**
 * Login methods supported by the app
 */
export type LoginMethod = 'google' | 'facebook' | 'apple' | 'superadmin' | null;

/**
 * Mock users mapped by login method
 */
const mockUsersByMethod: Record<'google' | 'facebook' | 'apple', CurrentUser> = {
  google: mockUserAna,
  facebook: mockUserMaria,
  apple: mockUserCarlos,
};

/**
 * Get initial login method from localStorage
 */
function getInitialLoginMethod(): LoginMethod {
  try {
    // Check for superadmin session first
    const superAdminSession = getSuperAdminSession();
    console.log('🔍 [getInitialLoginMethod] superAdminSession:', superAdminSession);
    if (superAdminSession) {
      console.log('✅ [getInitialLoginMethod] Found superadmin session, returning "superadmin"');
      return 'superadmin';
    }
    
    // Otherwise check regular login method
    const stored = localStorage.getItem('listlyup_login_method');
    console.log('🔍 [getInitialLoginMethod] listlyup_login_method:', stored);
    if (stored && ['google', 'facebook', 'apple', 'superadmin'].includes(stored)) {
      return stored as LoginMethod;
    }
    return null;
  } catch (error) {
    console.error('Error reading login method from localStorage:', error);
    return null;
  }
}

/**
 * Persist login method to localStorage
 */
function persistLoginMethod(method: LoginMethod): void {
  try {
    if (method) {
      localStorage.setItem('listlyup_login_method', method);
    } else {
      localStorage.removeItem('listlyup_login_method');
    }
  } catch (error) {
    console.error('Error persisting login method to localStorage:', error);
  }
}

/**
 * Get user data based on login method
 */
function getUserByLoginMethod(method: LoginMethod): CurrentUser | null {
  console.log('🔍 [getUserByLoginMethod] called with method:', method);
  if (!method) {
    console.log('⚠️ [getUserByLoginMethod] method is null, returning null');
    return null;
  }
  
  // Handle superadmin specially
  if (method === 'superadmin') {
    console.log('🔍 [getUserByLoginMethod] method is superadmin, calling getSuperAdminSession()');
    const session = getSuperAdminSession();
    console.log('🔍 [getUserByLoginMethod] session:', session);
    if (session) {
      console.log('✅ [getUserByLoginMethod] Found session, returning mockUserSuperAdmin:', mockUserSuperAdmin.name);
      return mockUserSuperAdmin;
    }
    console.log('❌ [getUserByLoginMethod] No session found, returning null');
    return null;
  }
  
  // Get mock user by login method
  const user = mockUsersByMethod[method];
  console.log('🔍 [getUserByLoginMethod] Returning user for method', method, ':', user?.name);
  return user || null;
}

interface UseCurrentUserProps {
  isAuthenticated: boolean;
}

/**
 * Custom hook to manage current user state
 */
export function useCurrentUser({ isAuthenticated }: UseCurrentUserProps) {
  const [loginMethod, setLoginMethod] = useState<LoginMethod>(getInitialLoginMethod());
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(() => {
    const initialMethod = getInitialLoginMethod();
    console.log('🔍 [useCurrentUser] INITIAL STATE:', {
      isAuthenticated,
      initialMethod,
    });
    if (!isAuthenticated) return null;
    const user = getUserByLoginMethod(initialMethod);
    console.log('🔍 [useCurrentUser] INITIAL USER:', user?.name);
    return user;
  });

  // Update current user when auth state or login method changes
  useEffect(() => {
    console.log('🔄 [useCurrentUser] useEffect triggered:', {
      isAuthenticated,
      loginMethod,
      currentUserBefore: currentUser?.name || 'null'
    });
    
    if (isAuthenticated && loginMethod) {
      const user = getUserByLoginMethod(loginMethod);
      console.log('✅ [useCurrentUser] Setting user:', user?.name);
      setCurrentUser(user);
    } else if (!isAuthenticated) {
      console.log('❌ [useCurrentUser] Clearing user (not authenticated)');
      setCurrentUser(null);
    } else {
      console.log('⚠️ [useCurrentUser] No action - isAuth:', isAuthenticated, 'method:', loginMethod);
    }
  }, [isAuthenticated, loginMethod]);

  /**
   * Set login method and persist to localStorage
   */
  const handleSetLoginMethod = (method: LoginMethod) => {
    setLoginMethod(method);
    persistLoginMethod(method);
    // Always set the user when a login method is set, don't wait for isAuthenticated
    if (method) {
      const user = getUserByLoginMethod(method);
      setCurrentUser(user);
    }
  };

  /**
   * Clear user state (on logout)
   */
  const clearUser = () => {
    setLoginMethod(null);
    setCurrentUser(null);
    persistLoginMethod(null);
  };

  return {
    currentUser,
    loginMethod,
    setLoginMethod: handleSetLoginMethod,
    clearUser,
    userId: currentUser?.id || '',
  };
}