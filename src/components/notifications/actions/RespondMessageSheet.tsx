/**
 * Respond Message Action Sheet
 * Modal for responding to questions or messages
 */

import { useState } from 'react';
import { Send, MessageSquare } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '../../ui/sheet';
import { Button } from '../../ui/button';
import { Textarea } from '../../ui/textarea';
import { Badge } from '../../ui/badge';

interface RespondMessageSheetProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  originalMessage: string;
  listingTitle?: string;
  onSend: (message: string) => void;
}

export function RespondMessageSheet({
  isOpen,
  onClose,
  userName,
  originalMessage,
  listingTitle,
  onSend,
}: RespondMessageSheetProps) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage('');
      onClose();
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="rounded-t-xl">
        <SheetHeader className="mb-4">
          <SheetTitle className="text-lg">Respond to Question</SheetTitle>
          <SheetDescription>
            Reply to {userName}'s question
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-4 mb-6">
          {/* Listing Context */}
          {listingTitle && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>About: <strong className="text-foreground">{listingTitle}</strong></span>
            </div>
          )}

          {/* Original Message */}
          <div className="p-3 bg-muted/50 rounded-lg border">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-medium">
                {userName[0]}
              </div>
              <span className="text-sm font-medium">{userName}</span>
            </div>
            <p className="text-sm text-muted-foreground">{originalMessage}</p>
          </div>

          {/* Response Input */}
          <div className="space-y-2">
            <label className="text-xs text-muted-foreground">Your response</label>
            <Textarea
              placeholder="Type your response..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[100px] resize-none"
              autoFocus
            />
            <p className="text-xs text-muted-foreground text-right">
              {message.length}/500
            </p>
          </div>

          {/* Quick Replies */}
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Quick replies:</p>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs"
                onClick={() => setMessage('Yes, still available!')}
              >
                Still available
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs"
                onClick={() => setMessage('Yes, I can deliver to that area.')}
              >
                Can deliver
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs"
                onClick={() => setMessage('Let me check and get back to you.')}
              >
                Let me check
              </Button>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            className="flex-1" 
            onClick={handleSend}
            disabled={!message.trim()}
          >
            <Send className="w-4 h-4 mr-2" />
            Send
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
