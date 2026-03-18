/**
 * JoinRequestCard Component
 * Card for group membership join requests
 * 
 * Features:
 * - Avatar with initials fallback
 * - Role badge (Admin/Moderator)
 * - Optional message preview
 * - Two CTAs: Approve / Reject
 * - Premium 2025 design with soft tones
 * 
 * @example
 * <JoinRequestCard
 *   user="@maria_silva"
 *   group="Tech Lovers Chile"
 *   message="I'm a software developer..."
 *   time="3d ago"
 *   role="Admin"
 * />
 */

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface JoinRequestCardProps {
  user: string;
  group: string;
  message?: string;
  time: string;
  role: 'Admin' | 'Moderator';
  avatarUrl?: string;
  onApprove?: () => void;
  onReject?: () => void;
}

export function JoinRequestCard({ user, group, message, time, role, avatarUrl, onApprove, onReject }: JoinRequestCardProps) {
  const getInitials = (name: string) => {
    return name
      .replace('@', '')
      .split('_')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="p-2 rounded border bg-card border-border space-y-1">
      <div className="flex items-center gap-2">
        <Avatar className="w-8 h-8 shrink-0">
          <AvatarImage src={avatarUrl} alt={user} />
          <AvatarFallback className="bg-primary/10 text-primary text-[10px]">
            {getInitials(user)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium truncate">{user}</p>
          <p className="text-[10px] text-muted-foreground truncate">
            Wants to join: {group}
          </p>
        </div>
        <Badge variant="secondary" className="h-4 px-1.5 text-[9px] shrink-0">
          {role}
        </Badge>
      </div>
      {message && (
        <p className="text-[10px] text-muted-foreground italic line-clamp-2">
          "{message}"
        </p>
      )}
      <p className="text-[10px] text-muted-foreground">{time}</p>
      <div className="flex gap-1 pt-1">
        <Button 
          size="sm" 
          variant="default"
          className="h-6 flex-1 text-[10px]" 
          onClick={onApprove}
        >
          Approve
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          className="h-6 flex-1 text-[10px] text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300" 
          onClick={onReject}
        >
          Reject
        </Button>
      </div>
    </div>
  );
}