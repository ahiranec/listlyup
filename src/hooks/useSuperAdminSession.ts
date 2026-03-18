import { getSuperAdminSession as getMockSession, clearSuperAdminSession as clearMockSession } from "../dev/mockAuth";

export function useSuperAdminSession() {
  return {
    getSession: getMockSession,
    clearSession: clearMockSession
  };
}
