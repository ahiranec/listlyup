/**
 * NotificationExpandedSheet Component
 * Modal bottom sheet para mostrar notificaciones agrupadas expandidas
 */

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '../ui/sheet';
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
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        side="bottom" 
        className="max-h-[80vh] overflow-auto rounded-t-2xl max-w-[480px] mx-auto"
      >
        <SheetHeader className="mb-4">
          <div className="flex items-center justify-between">
            <div>
              <SheetTitle>{title}</SheetTitle>
              <SheetDescription>
                {notifications.length} {notifications.length === 1 ? 'notification' : 'notifications'}
              </SheetDescription>
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
        </SheetHeader>

        <div className="space-y-3 pb-6">
          {notifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              {...notification}
              onAction={(actionId) => onAction(notification.id, actionId)}
            />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
