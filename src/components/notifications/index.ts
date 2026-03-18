/**
 * Notifications Module
 * Sistema de notificaciones accionable con agrupación inteligente
 */

export { NotificationSection } from './NotificationSection';
export { NotificationExpandedSheet } from './NotificationExpandedSheet';
export { mockNotifications, groupNotifications, filterByPriority, countByCategory } from '../../data/notifications';
export type { Notification } from '../../data/notifications';
export type { NotificationType, NotificationPriority } from './NotificationCard';