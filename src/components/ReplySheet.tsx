/**
 * ReplySheet Component
 * 
 * Universal sheet for replying to public questions across the app
 * 
 * Features:
 * - Sheet modal from bottom (80% height)
 * - Preview of listing + question
 * - Textarea for answer
 * - Character counter
 * - Submit button with loading state
 * - Premium 2025 design
 * 
 * Used by:
 * - MessagesPage > Questions tab
 * - ProductDetailPage > QuestionsAnswers
 * - ActionCenter > QuestionCard
 * - Notifications > QuestionAlertCard
 * 
 * @example
 * <ReplySheet
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   question="Does it come with the charger?"
 *   askedBy="@tech_buyer"
 *   askedAt="2h ago"
 *   listingTitle="MacBook Pro M1 2021"
 *   listingImage={imageUrl}
 *   onSubmit={(answer) => console.log('Publishing:', answer)}
 * />
 */

import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from './ui/sheet';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Send, HelpCircle, AlertCircle, Sparkles } from 'lucide-react';
import { feedback } from '../lib/feedback';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ReplySheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  question: string;
  askedBy: string;
  askedAt: string;
  listingTitle: string;
  listingImage?: string;
  listingId?: string;
  questionId?: string;
  waitingCount?: number;
  initialAnswer?: string; // ✅ FIX: Support for edit mode
  onSubmit: (answer: string) => void | Promise<void>;
}

export function ReplySheet({
  open,
  onOpenChange,
  question,
  askedBy,
  askedAt,
  listingTitle,
  listingImage,
  waitingCount,
  initialAnswer, // ✅ FIX: Support for edit mode
  onSubmit,
}: ReplySheetProps) {
  const [answer, setAnswer] = useState(initialAnswer || ''); // ✅ FIX: Initialize with existing answer
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ FIX: Update answer when initialAnswer changes (edit mode)
  useEffect(() => {
    if (initialAnswer) {
      setAnswer(initialAnswer);
    }
  }, [initialAnswer]);

  const MAX_CHARS = 500;
  const MIN_CHARS = 10;
  const charsRemaining = MAX_CHARS - answer.length;
  const isValid = answer.trim().length >= MIN_CHARS && answer.length <= MAX_CHARS;

  const getInitials = (name: string) => {
    if (!name) return '??';
    return name
      .replace('@', '')
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSubmit = async () => {
    if (!isValid) {
      feedback.error(`Answer must be between ${MIN_CHARS} and ${MAX_CHARS} characters`);
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(answer.trim());
      
      // Show success feedback FIRST with user info
      const description = waitingCount && waitingCount > 0
        ? `${askedBy} and ${waitingCount} ${waitingCount === 1 ? 'other person' : 'others'} will be notified`
        : `${askedBy} will be notified`;
      
      feedback.success('Answer published successfully! 🎉', {
        description,
        duration: 5000, // Show for 5 seconds so user can see it
      });
      
      // Wait a bit for the toast to appear before closing
      await new Promise(resolve => setTimeout(resolve, 150));
      
      // Then clean up and close
      setAnswer('');
      onOpenChange(false);
    } catch (error) {
      feedback.error('Failed to publish answer. Please try again.');
      console.error('Error submitting answer:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (answer.trim() && !isSubmitting) {
      const confirmClose = window.confirm('You have unsaved changes. Are you sure you want to close?');
      if (!confirmClose) return;
    }
    setAnswer('');
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent 
        side="bottom" 
        className="h-[85vh] max-w-[480px] mx-auto p-0 flex flex-col"
      >
        {/* Header */}
        <SheetHeader className="px-4 pt-4 pb-3 border-b shrink-0">
          <div className="flex items-center gap-2 mb-1">
            <HelpCircle className="w-5 h-5 text-primary" />
            <SheetTitle>Answer Question</SheetTitle>
          </div>
          <SheetDescription className="text-left">
            Your answer will be public and visible to everyone
          </SheetDescription>
        </SheetHeader>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {/* Listing Preview */}
          <div className="rounded-lg border bg-card p-3">
            <p className="text-xs text-muted-foreground mb-2">About listing:</p>
            <div className="flex items-center gap-3">
              {listingImage && (
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted shrink-0">
                  <ImageWithFallback
                    src={listingImage}
                    alt={listingTitle}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <p className="text-sm font-medium line-clamp-2">{listingTitle}</p>
            </div>
          </div>

          {/* Question */}
          <div className="rounded-lg border bg-blue-50/30 dark:bg-blue-950/10 border-blue-200 dark:border-blue-900/30 p-3 space-y-2">
            <div className="flex items-start gap-2">
              <Avatar className="w-8 h-8 shrink-0">
                <AvatarImage src="" alt={askedBy} />
                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                  {getInitials(askedBy)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-xs font-medium">{askedBy}</p>
                  <p className="text-xs text-muted-foreground">· {askedAt}</p>
                </div>
                <p className="text-sm">{question}</p>
              </div>
            </div>

            {waitingCount && waitingCount > 0 && (
              <div className="flex items-center gap-1.5 pl-10">
                <Badge variant="secondary" className="bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 text-xs">
                  +{waitingCount} {waitingCount === 1 ? 'person' : 'people'} waiting for answer
                </Badge>
              </div>
            )}
          </div>

          <Separator />

          {/* Answer Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Your Answer</label>
              <span 
                className={`text-xs ${
                  charsRemaining < 50 
                    ? 'text-orange-500 dark:text-orange-400' 
                    : 'text-muted-foreground'
                }`}
              >
                {charsRemaining} chars remaining
              </span>
            </div>

            <Textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Write a helpful and detailed answer..."
              className="min-h-[120px] resize-none"
              maxLength={MAX_CHARS}
              disabled={isSubmitting}
            />

            {answer.trim().length > 0 && answer.trim().length < MIN_CHARS && (
              <div className="flex items-start gap-2 text-xs text-orange-600 dark:text-orange-400">
                <AlertCircle className="w-3 h-3 mt-0.5 shrink-0" />
                <p>Please write at least {MIN_CHARS} characters for a helpful answer</p>
              </div>
            )}

            {/* Tips */}
            <div className="rounded-lg bg-muted/50 p-3 space-y-1.5">
              <div className="flex items-center gap-1.5 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <p className="text-xs font-medium">Tips for great answers:</p>
              </div>
              <ul className="text-xs text-muted-foreground space-y-0.5 pl-5">
                <li>• Be specific and accurate</li>
                <li>• Include relevant details about the item</li>
                <li>• Stay professional and helpful</li>
                <li>• Answer completely to avoid follow-ups</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-4 py-3 border-t shrink-0 space-y-2">
          <Button
            onClick={handleSubmit}
            disabled={!isValid || isSubmitting}
            className="w-full h-11"
            size="lg"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Publishing...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Publish Answer
              </>
            )}
          </Button>
          
          <Button
            onClick={handleClose}
            variant="ghost"
            className="w-full"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}