/**
 * Chat Action Sheet
 * Compact chat interface for quick communication
 */

import { useState } from 'react';
import { Send, Package, Truck, MapPin } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '../../ui/sheet';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'other';
  timestamp: string;
}

interface ChatSheetProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  listingTitle?: string;
  initialMessages?: Message[];
  onSend: (message: string) => void;
}

export function ChatSheet({
  isOpen,
  onClose,
  userName,
  listingTitle,
  initialMessages = [],
  onSend,
}: ChatSheetProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const handleSend = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: message,
        sender: 'user',
        timestamp: 'Just now',
      };
      setMessages([...messages, newMessage]);
      onSend(message);
      setMessage('');
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="rounded-t-xl h-[80vh]">
        <SheetHeader className="mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium">
              {userName[0]}
            </div>
            <div>
              <SheetTitle className="text-base">{userName}</SheetTitle>
              {listingTitle && (
                <SheetDescription className="text-xs">
                  About: {listingTitle}
                </SheetDescription>
              )}
            </div>
          </div>
        </SheetHeader>

        {/* Quick Actions */}
        <div className="flex gap-2 mb-4 pb-4 border-b overflow-x-auto">
          <Button variant="outline" size="sm" className="h-8 text-xs whitespace-nowrap">
            <MapPin className="w-3 h-3 mr-1.5" />
            Share location
          </Button>
          <Button variant="outline" size="sm" className="h-8 text-xs whitespace-nowrap">
            <Truck className="w-3 h-3 mr-1.5" />
            Arrange delivery
          </Button>
          <Button variant="outline" size="sm" className="h-8 text-xs whitespace-nowrap">
            <Package className="w-3 h-3 mr-1.5" />
            Mark as sent
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto mb-4 space-y-3 max-h-[50vh]">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                <Send className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">
                Start the conversation with {userName}
              </p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] rounded-lg px-3 py-2 ${
                    msg.sender === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <span className={`text-[10px] ${
                    msg.sender === 'user' 
                      ? 'text-white/70' 
                      : 'text-muted-foreground'
                  }`}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Quick Replies */}
        <div className="mb-4 pb-4 border-b">
          <p className="text-xs text-muted-foreground mb-2">Quick replies:</p>
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
              onClick={() => setMessage('When can we meet?')}
            >
              When to meet?
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-7 text-xs"
              onClick={() => setMessage('Can you deliver?')}
            >
              Can you deliver?
            </Button>
          </div>
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <Input
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1"
          />
          <Button 
            size="icon"
            onClick={handleSend}
            disabled={!message.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
