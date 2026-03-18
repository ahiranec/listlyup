/**
 * Group Permissions Library
 * 
 * SOURCE OF TRUTH para permisos de grupos.
 * Conecta Group Settings con lógica del frontend.
 * 
 * CONTRATO:
 * - Group Settings define: whoCanPost, whoCanInvite, whoCanModerate
 * - Estos helpers REEMPLAZAN lógica hardcodeada de roles
 * - Usados en: Publish Flow, Invite Actions, Moderation Menus
 */

export type UserRole = "member" | "moderator" | "admin" | "visitor" | "pending";
export type PermissionLevel = "members" | "moderators" | "admins";

export interface GroupPermissions {
  whoCanPost: PermissionLevel;
  whoCanInvite: PermissionLevel;
  whoCanModerate: "moderators" | "admins"; // Solo moderators o admins
  autoApproveListings: boolean;
  autoApproveMembers: boolean;
}

export interface Group {
  id: string;
  name: string;
  type?: "Public" | "Private" | "Community" | "Event";
  visibility?: "Public" | "Private";
  joinPolicy?: "Open" | "Approval" | "Invite";
  
  // Permissions (source of truth)
  whoCanPost?: PermissionLevel;
  whoCanInvite?: PermissionLevel;
  whoCanModerate?: "moderators" | "admins";
  autoApproveListings?: boolean;
  autoApproveMembers?: boolean;
}

/**
 * Determina si un usuario puede publicar listings en el grupo
 */
export function canPost(userRole: UserRole, group: Group): boolean {
  // Visitors y pending nunca pueden postear
  if (userRole === "visitor" || userRole === "pending") {
    return false;
  }

  // Default: members pueden postear (backward compatibility)
  const whoCanPost = group.whoCanPost ?? "members";

  if (whoCanPost === "admins") {
    return userRole === "admin";
  }

  if (whoCanPost === "moderators") {
    return userRole === "moderator" || userRole === "admin";
  }

  if (whoCanPost === "members") {
    return userRole === "member" || userRole === "moderator" || userRole === "admin";
  }

  return false;
}

/**
 * Determina si un usuario puede invitar miembros al grupo
 */
export function canInvite(userRole: UserRole, group: Group): boolean {
  // Visitors y pending nunca pueden invitar
  if (userRole === "visitor" || userRole === "pending") {
    return false;
  }

  // EXCEPCIÓN: Grupos públicos con joinPolicy Open
  // → Todos los members pueden compartir el link (no es invitación formal)
  if (group.type === "Public" && group.joinPolicy === "Open") {
    return userRole === "member" || userRole === "moderator" || userRole === "admin";
  }

  // Default: solo moderators pueden invitar (conservador, backward compatibility)
  const whoCanInvite = group.whoCanInvite ?? "moderators";

  if (whoCanInvite === "admins") {
    return userRole === "admin";
  }

  if (whoCanInvite === "moderators") {
    return userRole === "moderator" || userRole === "admin";
  }

  if (whoCanInvite === "members") {
    return userRole === "member" || userRole === "moderator" || userRole === "admin";
  }

  return false;
}

/**
 * Determina si un usuario puede moderar (hide/remove listings, manage members)
 */
export function canModerate(userRole: UserRole, group: Group): boolean {
  // Solo members activos pueden moderar
  if (userRole === "visitor" || userRole === "pending" || userRole === "member") {
    return false;
  }

  // Default: moderators pueden moderar (backward compatibility)
  const whoCanModerate = group.whoCanModerate ?? "moderators";

  if (whoCanModerate === "admins") {
    return userRole === "admin";
  }

  if (whoCanModerate === "moderators") {
    return userRole === "moderator" || userRole === "admin";
  }

  return false;
}

/**
 * Determina si un usuario es admin (permisos máximos)
 * Admin siempre puede: change-role, remove-listing, access Settings
 */
export function isAdmin(userRole: UserRole): boolean {
  return userRole === "admin";
}

/**
 * Determina si un usuario es member activo (puede acceder a contenido del grupo)
 */
export function isMember(userRole: UserRole): boolean {
  return ["member", "moderator", "admin"].includes(userRole);
}

/**
 * Determina si un usuario puede gestionar el grupo (moderator o admin)
 * NOTA: Este helper es para UI legacy. Prefer usar canModerate() con group settings.
 */
export function canManage(userRole: UserRole): boolean {
  return userRole === "moderator" || userRole === "admin";
}

/**
 * Determina si listings deben auto-aprobarse (visible inmediatamente)
 */
export function shouldAutoApproveListings(group: Group): boolean {
  // Default: false (requiere revisión, conservador)
  return group.autoApproveListings ?? false;
}

/**
 * Determina si miembros deben auto-aprobarse (join inmediato)
 */
export function shouldAutoApproveMembers(group: Group): boolean {
  // Default derivado de joinPolicy (backward compatibility)
  if (group.joinPolicy === "Open") {
    return true; // Open groups siempre auto-aprueban
  }

  return group.autoApproveMembers ?? false;
}

/**
 * Determina si el Pending tab debe ser visible
 * Visible para usuarios con permisos de moderación
 */
export function canAccessPending(userRole: UserRole, group: Group): boolean {
  return canModerate(userRole, group);
}

/**
 * Determina si el Settings tab debe ser visible
 * Solo admins pueden acceder a Settings
 */
export function canAccessSettings(userRole: UserRole): boolean {
  return isAdmin(userRole);
}
