/**
 * Mock Notifications Data
 * Data de ejemplo para el sistema de notificaciones
 * 
 * Moved from /components/notifications/mockNotifications.ts to /data/ (FASE 2 - Refactorización)
 */

import { NotificationType, NotificationPriority } from '../components/notifications/NotificationCard';
import type { ActionId } from '../actions/types';

export interface Notification {
  id: string;
  type: NotificationType;
  priority: NotificationPriority;
  title: string;
  subtitle?: string;
  description?: string;
  time: string;
  timestamp: number;
  isRead: boolean;
  category: 'marketplace' | 'messages' | 'groups' | 'social' | 'system' | 'insights';
  
  // Legacy: acciones hardcoded (para backward compatibility)
  actions?: Array<{
    id: string;
    label: string;
    variant?: 'default' | 'outline' | 'ghost' | 'destructive';
  }>;
  
  // New: IDs de acciones desde registry
  actionIds?: ActionId[];
  
  badge?: {
    label: string;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary';
  };
  groupable?: boolean; // Si puede agruparse con otras del mismo tipo
  
  // ✅ VD-1: Optional listingId for navigation to ProductDetailPage
  listingId?: string;
}

export const mockNotifications: Notification[] = [
  // 🔴 URGENT (3)
  {
    id: 'trade-1',
    type: 'trade-offer',
    priority: 'urgent',
    category: 'marketplace',
    title: 'Trade offer expires in 2h',
    subtitle: 'María S. · Your Camera ↔️ HP Laptop',
    description: 'María is offering an HP Pavilion Laptop for your Vintage Camera',
    time: '1h',
    timestamp: Date.now() - 3600000,
    isRead: false,
    // NEW: Usando registry en vez de hardcoded
    actionIds: ['view-trade-offer', 'accept-trade', 'reject-trade'],
    badge: { label: '⏰ 2h left', variant: 'destructive' },
  },
  {
    id: 'listing-1',
    type: 'listing-expiring',
    priority: 'urgent',
    category: 'marketplace',
    title: '"Vintage Camera" expires tomorrow',
    subtitle: '24 views · 3 questions',
    time: '12h',
    timestamp: Date.now() - 43200000,
    isRead: false,
    // NEW: Usando registry
    actionIds: ['renew-listing', 'edit-listing'],
  },
  {
    id: 'sale-1',
    type: 'sale',
    priority: 'urgent',
    category: 'marketplace',
    title: 'You sold "Headphones Sony"',
    subtitle: '$200 to Juan Pérez',
    description: 'Coordinate delivery details with the buyer',
    time: '2h',
    timestamp: Date.now() - 7200000,
    isRead: false,
    // NEW: Usando registry
    actionIds: ['open-chat', 'confirm-delivery-received'],
    listingId: 'headphones-sony-1', // ✅ VD-1: Added for View Details navigation
  },

  // 🟡 PENDING (8)
  {
    id: 'questions-group',
    type: 'question',
    priority: 'pending',
    category: 'marketplace',
    title: '3 unanswered questions',
    subtitle: 'Camera, Lamp, Mouse',
    time: '4h',
    timestamp: Date.now() - 14400000,
    isRead: false,
    groupable: true,
  },
  {
    id: 'group-invites-group',
    type: 'group-invite',
    priority: 'pending',
    category: 'groups',
    title: '2 group invitations',
    subtitle: 'Tech Fans, Traders Valpo',
    time: '6h',
    timestamp: Date.now() - 21600000,
    isRead: false,
    groupable: true,
  },
  {
    id: 'messages-group',
    type: 'message',
    priority: 'pending',
    category: 'messages',
    title: '5 new messages',
    subtitle: 'Juan, María, Pedro...',
    time: '1h',
    timestamp: Date.now() - 3600000,
    isRead: false,
    groupable: true,
  },
  {
    id: 'question-1',
    type: 'question',
    priority: 'pending',
    category: 'marketplace',
    title: 'New question on "Camera"',
    subtitle: 'Juan: "Does the zoom work?"',
    time: '4h',
    timestamp: Date.now() - 14400000,
    isRead: false,
    // NEW: Usando registry
    actionIds: ['respond-question'],
  },
  {
    id: 'question-2',
    type: 'question',
    priority: 'pending',
    category: 'marketplace',
    title: 'New question on "Lamp"',
    subtitle: 'María: "Do you deliver to Viña?"',
    time: '5h',
    timestamp: Date.now() - 18000000,
    isRead: false,
    // Legacy: manteniendo actions hardcoded para probar coexistencia
    actions: [
      { id: 'respond', label: 'Respond', variant: 'default' },
    ],
  },
  {
    id: 'question-3',
    type: 'question',
    priority: 'pending',
    category: 'marketplace',
    title: 'New question on "Mouse"',
    subtitle: 'Pedro: "Trade for keyboard?"',
    time: '6h',
    timestamp: Date.now() - 21600000,
    isRead: false,
    actions: [
      { id: 'respond', label: 'Respond', variant: 'default' },
    ],
  },
  {
    id: 'group-invite-1',
    type: 'group-invite',
    priority: 'pending',
    category: 'groups',
    title: 'Invitation: "Tech Enthusiasts"',
    subtitle: '50 members · Private',
    time: '6h',
    timestamp: Date.now() - 21600000,
    isRead: false,
    actions: [
      { id: 'preview', label: 'Preview', variant: 'outline' },
      { id: 'accept', label: '✓', variant: 'default' },
      { id: 'reject', label: '✗', variant: 'ghost' },
    ],
  },
  {
    id: 'group-invite-2',
    type: 'group-invite',
    priority: 'pending',
    category: 'groups',
    title: 'Invitation: "Traders Valparaíso"',
    subtitle: '120 members · Public',
    time: '8h',
    timestamp: Date.now() - 28800000,
    isRead: false,
    actions: [
      { id: 'preview', label: 'Preview', variant: 'outline' },
      { id: 'accept', label: '✓', variant: 'default' },
      { id: 'reject', label: '✗', variant: 'ghost' },
    ],
  },

  // ⚪ HOY (15)
  {
    id: 'milestone-1',
    type: 'milestone',
    priority: 'info',
    category: 'insights',
    title: '"Camera" reached 100 views',
    subtitle: '🎉 Top 10% this week!',
    time: '8h',
    timestamp: Date.now() - 28800000,
    isRead: false,
  },
  {
    id: 'milestone-2',
    type: 'milestone',
    priority: 'info',
    category: 'social',
    title: '5 new followers',
    subtitle: 'Juan, María, Pedro and 2 more',
    time: '10h',
    timestamp: Date.now() - 36000000,
    isRead: false,
  },
  {
    id: 'sale-2',
    type: 'sale',
    priority: 'info',
    category: 'marketplace',
    title: 'You sold "Vintage Lamp"',
    subtitle: '$100 to Pedro R.',
    time: '14h',
    timestamp: Date.now() - 50400000,
    isRead: true,
    listingId: 'vintage-lamp-1', // ✅ N-3: Added for View Details navigation (data contract fix)
  },
  {
    id: 'sale-3',
    type: 'sale',
    priority: 'info',
    category: 'marketplace',
    title: 'You sold "Mouse Logitech"',
    subtitle: '$50 to Ana García',
    time: '16h',
    timestamp: Date.now() - 57600000,
    isRead: true,
    listingId: 'mouse-logitech-1', // ✅ N-3: Added for View Details navigation (data contract fix)
  },
  {
    id: 'message-1',
    type: 'message',
    priority: 'info',
    category: 'messages',
    title: 'New message from Juan',
    subtitle: '"When can we coordinate?"',
    time: '18h',
    timestamp: Date.now() - 64800000,
    isRead: true,
  },
  {
    id: 'message-2',
    type: 'message',
    priority: 'info',
    category: 'messages',
    title: 'New message from María',
    subtitle: '"Perfect, see you tomorrow"',
    time: '19h',
    timestamp: Date.now() - 68400000,
    isRead: true,
  },
  {
    id: 'message-3',
    type: 'message',
    priority: 'info',
    category: 'messages',
    title: 'New message from Pedro',
    subtitle: '"Is the Mouse still available?"',
    time: '20h',
    timestamp: Date.now() - 72000000,
    isRead: true,
  },
  {
    id: 'message-4',
    type: 'message',
    priority: 'info',
    category: 'messages',
    title: 'New message from Ana',
    subtitle: '"Thanks! Everything perfect"',
    time: '21h',
    timestamp: Date.now() - 75600000,
    isRead: true,
  },
  {
    id: 'message-5',
    type: 'message',
    priority: 'info',
    category: 'messages',
    title: 'New message from Carlos',
    subtitle: '"Trade for laptop?"',
    time: '22h',
    timestamp: Date.now() - 79200000,
    isRead: true,
  },
  {
    id: 'milestone-3',
    type: 'milestone',
    priority: 'info',
    category: 'insights',
    title: '"Headphones" trending in Valpo',
    subtitle: '15 views today',
    time: '23h',
    timestamp: Date.now() - 82800000,
    isRead: true,
  },
  {
    id: 'milestone-4',
    type: 'milestone',
    priority: 'info',
    category: 'social',
    title: '2 people added favorites',
    subtitle: 'Camera, Lamp',
    time: '1d',
    timestamp: Date.now() - 86400000,
    isRead: true,
  },
  {
    id: 'milestone-5',
    type: 'milestone',
    priority: 'info',
    category: 'insights',
    title: 'Your avg response: 12 min',
    subtitle: '⚡ 3x faster than average',
    time: '1d',
    timestamp: Date.now() - 86400000,
    isRead: true,
  },
  {
    id: 'sale-4',
    type: 'sale',
    priority: 'info',
    category: 'marketplace',
    title: 'Sale completed',
    subtitle: 'Juan confirmed receipt',
    time: '1d',
    timestamp: Date.now() - 86400000,
    isRead: true,
    listingId: 'keyboard-mechanical-1', // ✅ N-3: Added for View Details navigation (data contract fix)
  },
  {
    id: 'milestone-6',
    type: 'milestone',
    priority: 'info',
    category: 'social',
    title: 'New follower',
    subtitle: 'Laura Rodríguez follows you',
    time: '1d',
    timestamp: Date.now() - 86400000,
    isRead: true,
  },
  {
    id: 'milestone-7',
    type: 'milestone',
    priority: 'info',
    category: 'insights',
    title: '10 new visits today',
    subtitle: 'Camera (4), Lamp (3), Mouse (3)',
    time: '1d',
    timestamp: Date.now() - 86400000,
    isRead: true,
  },
];

// Función para agrupar notificaciones
export function groupNotifications(notifications: Notification[]) {
  const grouped: Record<string, Notification[]> = {
    questions: [],
    groupInvites: [],
    messages: [],
  };

  notifications.forEach((notification) => {
    if (notification.groupable) {
      if (notification.type === 'question') {
        grouped.questions.push(notification);
      } else if (notification.type === 'group-invite') {
        grouped.groupInvites.push(notification);
      } else if (notification.type === 'message') {
        grouped.messages.push(notification);
      }
    }
  });

  return grouped;
}

// Función para filtrar por prioridad
export function filterByPriority(
  notifications: Notification[],
  priority: NotificationPriority
) {
  return notifications.filter((n) => n.priority === priority);
}

// Función para contar por categoría
export function countByCategory(notifications: Notification[]) {
  const counts = {
    marketplace: 0,
    messages: 0,
    groups: 0,
    social: 0,
    system: 0,
    insights: 0,
  };

  notifications.forEach((notification) => {
    if (!notification.isRead) {
      counts[notification.category]++;
    }
  });

  return counts;
}