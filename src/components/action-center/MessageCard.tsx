/**
 * MessageCard Component
 * Compact card for displaying unread/read messages
 * 
 * Features:
 * - Clear message hierarchy: Subject → Who said → What
 * - Soft blue-300 border for unread messages
 * - Avatar with initials fallback
 * - Single CTA: Reply button
 * - Premium 2025 design with soft tones
 * 
 * @example
 * <MessageCard
 *   from="Juan Pérez"
 *   message="Is this still available?"
 *   listing="iPhone 14 Pro Max"
 *   time="2h ago"
 *   unread
 * />
 */

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';

interface MessageCardProps {
  from: string;
  message: string;
  listing: string;
  time: string;
  unread?: boolean;
  avatarUrl?: string;
  onClick?: () => void; // NEW: Click handler for Reply button
}

export function MessageCard({ from, message, listing, time, unread = false, avatarUrl, onClick }: MessageCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className={`p-3 rounded-lg border space-y-2 ${unread ? 'bg-blue-50/20 border-blue-300 dark:bg-blue-950/10 dark:border-blue-900/30' : 'bg-card border-border'}`}>
      {/* Header: Avatar + Name + Time + Unread indicator */}
      <div className="flex items-center gap-2">
        <Avatar className="w-8 h-8 shrink-0">
          <AvatarImage src={avatarUrl} alt={from} />
          <AvatarFallback className="bg-primary/10 text-primary text-[11px]">
            {getInitials(from)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0 flex items-center gap-2">
          <p className="text-xs font-semibold truncate">{from}</p>
          {unread && <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />}
        </div>
        <span className="text-[10px] text-muted-foreground shrink-0">{time}</span>
      </div>

      {/* Subject line */}
      <div className="text-[11px] text-muted-foreground pl-10">
        Re: <span className="font-medium text-foreground/70">{listing}</span>
      </div>

      {/* Attribution + Message */}
      <div className="pl-10 space-y-1">
        <p className="text-[10px] font-medium text-primary">@{from.replace(' ', '').toLowerCase()} said:</p>
        <p className="text-xs text-foreground leading-relaxed">
          "{message}"
        </p>
      </div>

      {/* Action */}
      <div className="flex justify-end pt-1">
        <Button 
          size="sm" 
          className="h-7 px-3 text-[11px]"
          onClick={onClick}
        >
          Reply
        </Button>
      </div>
    </div>
  );
}