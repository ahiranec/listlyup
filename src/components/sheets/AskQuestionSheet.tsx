/**
 * AskQuestionSheet Component - UNIFIED 2025 DESIGN ✨
 * 
 * Premium sheet for asking public questions about listings
 * Matches the design pattern of ReplySheet from Action Center
 * 
 * Features:
 * - Clean header with icon
 * - Compact product preview
 * - Large textarea for question
 * - Character counter
 * - Tips section
 * - Professional styling
 */

import { useState } from 'react';
import { HelpCircle, Send, AlertCircle, Sparkles } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '../ui/sheet';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Separator } from '../ui/separator';
import { toast } from 'sonner@2.0.3';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface AskQuestionSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productTitle: string;
  productImage: string;
  sellerName: string;
  onQuestionSubmitted?: (questionId: string) => void;
}

const QUICK_QUESTIONS = [
  "Is this still available?",
  "What's the condition like?",
  "Can you provide more details?",
  "Do you offer delivery?",
  "Is the price negotiable?",
  "Can I see more photos?",
  "Where are you located?",
  "When can I pick this up?",
];

export function AskQuestionSheet({
  open,
  onOpenChange,
  productTitle,
  productImage,
  sellerName,
  onQuestionSubmitted,
}: AskQuestionSheetProps) {
  const [question, setQuestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const MAX_CHARS = 300;
  const MIN_CHARS = 10;
  const charsRemaining = MAX_CHARS - question.length;
  const isValid = question.trim().length >= MIN_CHARS && question.length <= MAX_CHARS;

  const handleSubmit = async () => {
    if (!isValid) {
      toast.error(`Question must be between ${MIN_CHARS} and ${MAX_CHARS} characters`);
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 600));

    const mockQuestionId = `q-${Date.now()}`;
    
    toast.success('Question posted successfully! 💬', {
      description: `${sellerName} will be notified`,
    });

    setIsSubmitting(false);
    onOpenChange(false);
    
    // Reset form
    setQuestion('');

    // Notify parent
    onQuestionSubmitted?.(mockQuestionId);
  };

  const handleClose = () => {
    if (question.trim() && !isSubmitting) {
      const confirmClose = window.confirm('You have unsaved changes. Are you sure you want to close?');
      if (!confirmClose) return;
    }
    setQuestion('');
    onOpenChange(false);
  };

  const handleQuickQuestion = (template: string) => {
    setQuestion(template);
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
            <SheetTitle>Ask a Public Question</SheetTitle>
          </div>
          <SheetDescription className="text-left">
            Your question will be visible to everyone viewing this listing
          </SheetDescription>
        </SheetHeader>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {/* Product Preview - Compact like ReplySheet */}
          <div className="rounded-lg border bg-card p-3">
            <p className="text-xs text-muted-foreground mb-2">About listing:</p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted shrink-0">
                <ImageWithFallback
                  src={productImage}
                  alt={productTitle}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium line-clamp-2">{productTitle}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Seller: {sellerName}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Questions */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Quick Questions</label>
            <div className="grid grid-cols-1 gap-2">
              {QUICK_QUESTIONS.map((template, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(template)}
                  className="px-3 py-2.5 rounded-lg border border-gray-200 hover:border-primary hover:bg-primary/5 transition-all text-left text-sm"
                >
                  {template}
                </button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Question Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Your Question</label>
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
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your question here..."
              className="min-h-[120px] resize-none"
              maxLength={MAX_CHARS}
              disabled={isSubmitting}
            />

            {question.trim().length > 0 && question.trim().length < MIN_CHARS && (
              <div className="flex items-start gap-2 text-xs text-orange-600 dark:text-orange-400">
                <AlertCircle className="w-3 h-3 mt-0.5 shrink-0" />
                <p>Please write at least {MIN_CHARS} characters for a clear question</p>
              </div>
            )}

            {/* Tips */}
            <div className="rounded-lg bg-muted/50 p-3 space-y-1.5">
              <div className="flex items-center gap-1.5 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <p className="text-xs font-medium">Tips for great questions:</p>
              </div>
              <ul className="text-xs text-muted-foreground space-y-0.5 pl-5">
                <li>• Be specific and clear</li>
                <li>• Ask one question at a time</li>
                <li>• Check existing Q&A first</li>
                <li>• Use private chat for sensitive details</li>
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
                Posting...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Post Question
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
