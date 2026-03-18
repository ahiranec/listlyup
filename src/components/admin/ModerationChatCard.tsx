/**
 * Moderation Chat Card Component
 * For Admin Dashboard - Moderation Conversations section
 * 
 * Simple clickable card showing moderation chat preview
 * 
 * @example
 * <ModerationChatCard
 *   userName="María González"
 *   lastMessage="I understand the concern..."
 *   reportType="Spam/Scam"
 *   time="2h ago"
 *   onClick={() => onChatClick(chatId)}
 * />
 */

import { MessageSquare, Shield, Clock } from 'lucide-react';
import { Badge } from '../ui/badge';

interface ModerationChatCardProps {
  userName: string;
  userAvatar?: string;
  lastMessage?: string;
  reportType?: string;
  time?: string;
  onClick?: () => void;
}

export function ModerationChatCard({
  userName,
  userAvatar,
  lastMessage,
  reportType,
  time,
  onClick,
}: ModerationChatCardProps) {
  return (
    <div
      onClick={onClick}
      className="p-3 bg-card border border-border rounded-lg hover:border-amber-400 hover:bg-amber-50/50 dark:hover:bg-amber-950/20 transition-colors cursor-pointer"
    >
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="relative shrink-0">
          {userAvatar ? (
            <img
              src={userAvatar}
              alt={userName}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm font-medium truncate">{userName}</p>
            {time && (
              <span className="text-[11px] text-muted-foreground flex items-center gap-1 shrink-0">
                <Clock className="w-3 h-3" />
                {time}
              </span>
            )}
          </div>

          {reportType && (
            <Badge
              variant="outline"
              className="mb-1 text-[10px] h-4 px-1.5 border-amber-400 text-amber-700 dark:text-amber-300"
            >
              {reportType}
            </Badge>
          )}

          {lastMessage && (
            <p className="text-xs text-muted-foreground line-clamp-2 leading-snug">
              {lastMessage}
            </p>
          )}
        </div>

        {/* Icon */}
        <MessageSquare className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
      </div>
    </div>
  );
}
