/**
 * NotificationExpandedSheet Component
 * Modal bottom sheet para mostrar notificaciones agrupadas expandidas
 */

import { ResponsiveModal } from '../shared/ResponsiveModal';
import { Button } from '../ui/button';
import { NotificationCard, NotificationType, NotificationPriority } from './NotificationCard';

interface ExpandedNotification {
  id: string;
  type: NotificationType;
  priority: NotificationPriority;
  title: string;
  subtitle?: string;
  description?: string;
  time: string;
  isRead?: boolean;
  actions?: Array<{
    id: string;
    label: string;
    variant?: 'default' | 'outline' | 'ghost' | 'destructive';
    icon?: React.ReactNode;
  }>;
}

interface NotificationExpandedSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  notifications: ExpandedNotification[];
  onAction: (notificationId: string, actionId: string) => void;
  onActionAll?: () => void;
  actionAllLabel?: string;
}

export function NotificationExpandedSheet({
  isOpen,
  onClose,
  title,
  notifications,
  onAction,
  onActionAll,
  actionAllLabel = 'Mark all as read',
}: NotificationExpandedSheetProps) {
  return (
    <ResponsiveModal
      open={isOpen}
      onOpenChange={onClose}
      title={title}
      description={`${notifications.length} ${notifications.length === 1 ? 'notification' : 'notifications'}`}
      desktopMaxWidth="max-w-lg"
      mobileHeight="h-[80vh]"
    >
      <div className="flex-none px-6 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-foreground">{title}</h2>
            <p className="text-sm text-muted-foreground">
              {notifications.length} {notifications.length === 1 ? 'notification' : 'notifications'}
            </p>
          </div>
          {onActionAll && (
            <Button
              size="sm"
              variant="outline"
              onClick={onActionAll}
              className="h-8 text-xs"
            >
              {actionAllLabel}
            </Button>
          )}
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto px-6">
        <div className="space-y-3 pb-6">
          {notifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              {...notification}
              onAction={(actionId) => onAction(notification.id, actionId)}
            />
          ))}
        </div>
      </div>
    </ResponsiveModal>
  );
}
