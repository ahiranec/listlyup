/**
 * Permission Rules
 * Lógica de autorización para acciones
 */

import type { PermissionRule, PermissionContext, ActionEntity } from './types';

/**
 * Evalúa si el usuario tiene permiso para ejecutar una acción
 */
export function hasPermission(
  rule: PermissionRule | PermissionRule[],
  context: PermissionContext
): boolean {
  // Si es array, todas las reglas deben cumplirse (AND)
  if (Array.isArray(rule)) {
    return rule.every((r) => evaluateRule(r, context));
  }
  
  return evaluateRule(rule, context);
}

/**
 * Evalúa una regla individual
 */
function evaluateRule(rule: PermissionRule, context: PermissionContext): boolean {
  const { userId, userPlan, isAuthenticated, organizationRole, entity } = context;

  switch (rule) {
    case 'isOwner':
      return !!entity && !!userId && entity.userId === userId;
    
    case 'isNotOwner':
      return !!entity && !!userId && entity.userId !== userId;
    
    case 'isAuthenticated':
      return isAuthenticated;
    
    case 'isPremium':
      return userPlan === 'plus' || userPlan === 'pro';
    
    case 'isPro':
      return userPlan === 'pro';
    
    case 'isAdmin':
      return organizationRole === 'admin' || organizationRole === 'owner';
    
    case 'isOrgMember':
      return !!organizationRole;
    
    case 'hasActiveSubscription':
      return userPlan !== 'free';
    
    case 'canTrade':
      // Mock: usuarios autenticados pueden hacer trades
      return isAuthenticated;
    
    case 'canReview':
      // Mock: solo si no es owner y está autenticado
      return isAuthenticated && !!entity && entity.userId !== userId;
    
    default:
      return false;
  }
}

/**
 * Mock: Obtiene el contexto de permisos del usuario actual
 * En producción esto vendría de un auth provider
 */
export function getCurrentPermissionContext(entity?: ActionEntity): PermissionContext {
  // Mock: Usuario autenticado como "Individual" con plan "Plus"
  return {
    userId: 'user-123',
    userPlan: 'plus',
    userType: 'individual',
    isAuthenticated: true,
    organizationRole: undefined, // No está en organización
    entity,
  };
}

/**
 * Mock: Contexto para usuario no autenticado
 */
export function getGuestPermissionContext(entity?: ActionEntity): PermissionContext {
  return {
    userId: undefined,
    userPlan: 'free',
    userType: 'individual',
    isAuthenticated: false,
    organizationRole: undefined,
    entity,
  };
}
