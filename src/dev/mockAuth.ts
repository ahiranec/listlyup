// =====================================================================
// LISTLYUP — SUPERADMIN V2
// MOCK AUTHENTICATION (FRONTEND-ONLY)
// =====================================================================
// ⚠️ DEV ONLY: This is NOT production-ready authentication
// ⚠️ No encryption, no backend, no security
// ⚠️ For development and design review purposes only
// =====================================================================

export interface SuperAdminUser {
  id: string;
  name: string;
  email: string;
  role: "super_admin";
}

export const mockSuperAdmin: SuperAdminUser = {
  id: "sa_001",
  name: "Antonio Hirane",
  email: "ahirane@gmail.com",
  role: "super_admin"
};

/**
 * Verify mock credentials (frontend-only simulation)
 * @param email - User email
 * @param password - User password
 * @returns true if credentials match, false otherwise
 */
export function verifyMockCredentials(email: string, password: string): boolean {
  return email === "ahirane@gmail.com" && password === "ah901990";
}

/**
 * Store session in localStorage (dev-only)
 */
export function storeSuperAdminSession(user: SuperAdminUser): void {
  console.log('💾 [storeSuperAdminSession] Storing user:', user);
  localStorage.setItem("superadmin_session", JSON.stringify(user));
  console.log('✅ [storeSuperAdminSession] Session stored successfully');
  // Verify it was stored
  const verify = localStorage.getItem("superadmin_session");
  console.log('🔍 [storeSuperAdminSession] Verification read:', verify);
}

/**
 * Get session from localStorage
 */
export function getSuperAdminSession(): SuperAdminUser | null {
  try {
    const session = localStorage.getItem("superadmin_session");
    console.log('🔍 [getSuperAdminSession] raw localStorage value:', session);
    if (!session) {
      console.log('❌ [getSuperAdminSession] No session found in localStorage');
      return null;
    }
    
    const user = JSON.parse(session) as SuperAdminUser;
    console.log('🔍 [getSuperAdminSession] Parsed user:', user);
    
    // Validate session structure
    if (user.role !== "super_admin") {
      console.log('❌ [getSuperAdminSession] Invalid role:', user.role);
      return null;
    }
    
    console.log('✅ [getSuperAdminSession] Valid session found:', user.name);
    return user;
  } catch (error) {
    console.error("Failed to parse superadmin session:", error);
    return null;
  }
}

/**
 * Clear session from localStorage
 */
export function clearSuperAdminSession(): void {
  localStorage.removeItem("superadmin_session");
}

/**
 * Check if user has super_admin role
 */
export function isSuperAdmin(): boolean {
  const session = getSuperAdminSession();
  return session?.role === "super_admin";
}
