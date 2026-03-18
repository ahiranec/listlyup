/**
 * Invite Utilities
 * Funciones para generar códigos, tokens y manejar invitaciones de grupos
 */

import { GroupPreset } from '@/types/group';

export type InviteMethodType = 'LINK_ONLY' | 'SHARED_CODE' | 'PERSONAL_INVITE';

export interface InviteMethod {
  type: InviteMethodType;
  requiresCode: boolean;
  allowsMultipleUses: boolean;
  description: string;
}

/**
 * Mapeo de presets a métodos de invitación
 */
export const GROUP_PRESET_INVITE_METHODS: Record<string, InviteMethod> = {
  // Nivel 1: Link público (sin restricción)
  'public-group': {
    type: 'LINK_ONLY',
    requiresCode: false,
    allowsMultipleUses: true,
    description: 'Anyone with the link can join directly',
  },
  'open-community': {
    type: 'LINK_ONLY',
    requiresCode: false,
    allowsMultipleUses: true,
    description: 'Anyone with the link can join directly',
  },
  'public-event': {
    type: 'LINK_ONLY',
    requiresCode: false,
    allowsMultipleUses: true,
    description: 'Anyone with the link can join directly',
  },
  
  // Nivel 2: Código compartido
  'standard-private': {
    type: 'SHARED_CODE',
    requiresCode: true,
    allowsMultipleUses: true,
    description: 'Members will receive an invite code to join',
  },
  'moderated-community': {
    type: 'SHARED_CODE',
    requiresCode: true,
    allowsMultipleUses: true,
    description: 'Members will receive an invite code to join',
  },
  
  // Nivel 3: Token único
  'exclusive-private': {
    type: 'PERSONAL_INVITE',
    requiresCode: true,
    allowsMultipleUses: false,
    description: 'Members will receive personal invite links',
  },
  'maximum-privacy': {
    type: 'PERSONAL_INVITE',
    requiresCode: true,
    allowsMultipleUses: false,
    description: 'Members will receive personal invite links',
  },
  'event-registration': {
    type: 'PERSONAL_INVITE',
    requiresCode: true,
    allowsMultipleUses: false,
    description: 'Attendees will receive personal invite links',
  },
  'private-event': {
    type: 'PERSONAL_INVITE',
    requiresCode: true,
    allowsMultipleUses: false,
    description: 'Attendees will receive personal invite links',
  },
};

/**
 * Obtiene el método de invitación según el preset del grupo
 */
export function getInviteMethod(presetId: string): InviteMethod {
  return GROUP_PRESET_INVITE_METHODS[presetId] || GROUP_PRESET_INVITE_METHODS['public-group'];
}

/**
 * Genera un código de invitación legible (formato: ABC-123)
 * Sin I, O, 0, 1 para evitar confusión
 */
export function generateInviteCode(): string {
  const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ'; // Sin I, O
  const numbers = '23456789'; // Sin 0, 1
  
  const part1 = Array.from({ length: 3 }, () => 
    letters[Math.floor(Math.random() * letters.length)]
  ).join('');
  
  const part2 = Array.from({ length: 3 }, () => 
    numbers[Math.floor(Math.random() * numbers.length)]
  ).join('');
  
  return `${part1}-${part2}`;
}

/**
 * Genera un token único para invitaciones personales
 */
export function generateInviteToken(): string {
  // Simulación de UUID (en producción usarías crypto.randomUUID())
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Formatea el mensaje de invitación para compartir
 */
export function formatInviteMessage(
  groupName: string,
  groupSlug: string,
  code?: string
): string {
  let message = `¡Únete a nuestro grupo!\n\n`;
  message += `Grupo: ${groupName}\n`;
  message += `Link: https://listlyup.com/g/${groupSlug}\n`;
  
  if (code) {
    message += `Código: ${code}`;
  }
  
  return message;
}

/**
 * Abre WhatsApp para compartir el mensaje
 */
export function shareViaWhatsApp(message: string, phone?: string) {
  const encodedMessage = encodeURIComponent(message);
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
  let url: string;
  
  if (phone) {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    url = isMobile 
      ? `whatsapp://send?phone=${cleanPhone}&text=${encodedMessage}`
      : `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
  } else {
    url = isMobile
      ? `whatsapp://send?text=${encodedMessage}`
      : `https://wa.me/?text=${encodedMessage}`;
  }
  
  window.open(url, '_blank');
}

/**
 * Copia texto al portapapeles
 * Usa método moderno con fallback clásico para compatibilidad total
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  // Método 1: Clipboard API (moderno, pero puede estar bloqueado)
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      console.warn('Clipboard API failed, using fallback:', error);
      // Continuar al fallback
    }
  }
  
  // Método 2: Fallback clásico (funciona siempre)
  try {
    // Crear elemento temporal
    const textArea = document.createElement('textarea');
    textArea.value = text;
    
    // Hacer invisible pero accesible
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = '0';
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    textArea.style.opacity = '0';
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    // Intentar copiar
    const successful = document.execCommand('copy');
    
    // Limpiar
    document.body.removeChild(textArea);
    
    return successful;
  } catch (error) {
    console.error('All clipboard methods failed:', error);
    return false;
  }
}

/**
 * Valida formato de email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Obtiene iniciales de un nombre
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}