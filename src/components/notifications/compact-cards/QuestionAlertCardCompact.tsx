import { MessageCircle } from 'lucide-react';
import { Button } from '../../ui/button';

interface QuestionAlertCardCompactProps {
  id: string;
  title: string;
  subtitle: string;
  time: string;
  isRead: boolean;
  onReply: () => void;
}

export function QuestionAlertCardCompact({
  title,
  subtitle,
  time,
  isRead,
  onReply,
}: QuestionAlertCardCompactProps) {
  return (
    <div
      className={`relative rounded-xl border bg-card p-3 shadow-sm transition-all hover:shadow-lg ${
        !isRead ? 'border-l-[6px] border-l-blue-300' : ''
      }`}
    >
      <div className="flex items-start gap-3">

        {/* Icon */}
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-500/10">
          <MessageCircle className="h-5 w-5 text-blue-400" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">

          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className="font-semibold text-sm line-clamp-1">{title}</h4>
            <span className="text-[11px] text-muted-foreground opacity-70 shrink-0">{time}</span>
          </div>

          <p className="text-xs italic text-muted-foreground opacity-80 mb-2 line-clamp-1">{subtitle}</p>

          {/* Primary CTA */}
          <Button size="sm" onClick={onReply} className="h-8 text-xs font-medium">
            Reply
          </Button>
        </div>
      </div>

      {/* Unread Indicator */}
      {!isRead && (
        <div className="absolute top-3 right-3 h-2.5 w-2.5 rounded-full bg-blue-300 ring-2 ring-background" />
      )}
    </div>
  );
}