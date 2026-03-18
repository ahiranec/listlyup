/**
 * QuestionCard Component
 * Compact card for unanswered public questions
 * 
 * Features:
 * - Clear question hierarchy: Subject → Who asked → What
 * - Shows waiting users count with soft amber-300 color
 * - Single CTA: Answer button
 * - Premium 2025 design with soft tones
 * 
 * @example
 * <QuestionCard
 *   question="Does it come with the charger?"
 *   askedBy="@tech_buyer"
 *   listing="MacBook Pro M1"
 *   time="5h ago"
 *   waiting={3}
 * />
 */

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { HelpCircle } from 'lucide-react';

interface QuestionCardProps {
  question: string;
  askedBy: string;
  listing: string;
  time: string;
  waiting?: number;
  onClick?: () => void;
  avatarUrl?: string;
}

export function QuestionCard({ question, askedBy, listing, time, waiting, onClick, avatarUrl }: QuestionCardProps) {
  const getInitials = (username: string) => {
    // Remove @ symbol if present
    const name = username.replace('@', '');
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div className="p-3 rounded-lg border bg-card border-border space-y-2">
      {/* Header: Avatar + Name + Time + Waiting count */}
      <div className="flex items-center gap-2">
        <Avatar className="w-8 h-8 shrink-0">
          <AvatarImage src={avatarUrl} alt={askedBy} />
          <AvatarFallback className="bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 text-[11px]">
            {getInitials(askedBy)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0 flex items-center gap-2">
          <p className="text-xs font-semibold truncate">{askedBy}</p>
          {waiting && waiting > 0 && (
            <span className="flex items-center gap-1 text-[10px] text-amber-600 dark:text-amber-500 shrink-0">
              <HelpCircle className="w-3 h-3" />
              +{waiting}
            </span>
          )}
        </div>
        <span className="text-[10px] text-muted-foreground shrink-0">{time}</span>
      </div>

      {/* Subject line */}
      <div className="text-[11px] text-muted-foreground pl-10">
        Re: <span className="font-medium text-foreground/70">{listing}</span>
      </div>

      {/* Attribution + Question */}
      <div className="pl-10 space-y-1">
        <p className="text-[10px] font-medium text-amber-600 dark:text-amber-500">
          {askedBy} asked:
        </p>
        <p className="text-xs text-foreground leading-relaxed">
          "{question}"
        </p>
      </div>

      {/* Action */}
      <div className="flex justify-end pt-1">
        <Button 
          size="sm" 
          className="h-7 px-3 text-[11px]"
          onClick={onClick}
        >
          Answer
        </Button>
      </div>
    </div>
  );
}