/**
 * @deprecated This component has been replaced by ChatConversationPage.
 * Moved to _legacy/ folder. DO NOT use in new code.
 * Use ChatConversationPage instead.
 * 
 * ChatView Component
 * Full-screen chat interface for private 1-on-1 conversations
 * 
 * Features:
 * - Bidirectional chat layout (received left, sent right)
 * - Message bubbles with timestamps
 * - Listing context card at top
 * - Input area with send functionality
 * - Premium 2025 mobile-first design
 * 
 * @example
 * <ChatView
 *   chatId="chat-1"
 *   userName="María González"
 *   userAvatar="..."
 *   listingTitle="MacBook Pro 14"
 *   listingImage="..."
 *   onBack={() => {}}
 * />
 */

import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, MoreVertical, Send, Eye, Image as ImageIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ScrollArea } from '../ui/scroll-area';
import { toast } from 'sonner@2.0.3';

interface Message {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  timestamp: string;
  type: 'sent' | 'received'; // sent = you, received = them
}

interface ChatViewProps {
  chatId: string;
  userName: string;
  userAvatar?: string;
  userId: string;
  listingTitle: string;
  listingImage: string;
  listingId?: string;
  onBack: () => void;
  onViewListing?: () => void;
}

export function ChatView({
  chatId,
  userName,
  userAvatar,
  userId,
  listingTitle,
  listingImage,
  listingId,
  onBack,
  onViewListing,
}: ChatViewProps) {
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Mock conversation data - would come from backend
  useEffect(() => {
    // Simulate loading conversation history
    const mockMessages: Message[] = [
      {
        id: 'msg-1',
        content: 'Hi! Is this still available?',
        senderId: userId,
        senderName: userName,
        timestamp: '9:30 AM',
        type: 'received',
      },
      {
        id: 'msg-2',
        content: 'Yes! It\'s in like-new condition, barely used.',
        senderId: 'you',
        senderName: 'You',
        timestamp: '9:45 AM',
        type: 'sent',
      },
      {
        id: 'msg-3',
        content: 'Great! Can you do $1,700?',
        senderId: userId,
        senderName: userName,
        timestamp: '10:00 AM',
        type: 'received',
      },
      {
        id: 'msg-4',
        content: 'How about $1,850? That\'s a fair price for the condition.',
        senderId: 'you',
        senderName: 'You',
        timestamp: '10:05 AM',
        type: 'sent',
      },
      {
        id: 'msg-5',
        content: 'I can do $1,800. That\'s my lowest price.',
        senderId: userId,
        senderName: userName,
        timestamp: '10:30 AM',
        type: 'received',
      },
    ];
    setMessages(mockMessages);
  }, [chatId, userId, userName]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      content: messageInput,
      senderId: 'you',
      senderName: 'You',
      timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      type: 'sent',
    };

    setMessages(prev => [...prev, newMessage]);
    setMessageInput('');

    // TODO: Send to backend
    toast.success('Message sent!');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="h-screen bg-background flex flex-col max-w-[480px] mx-auto">
      {/* Status bar removed - PWA/WebView mobile */}

      {/* Header */}
      <header className="h-[60px] px-4 flex items-center justify-between border-b bg-background shrink-0">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-muted rounded-lg transition-colors shrink-0">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <Avatar className="w-9 h-9 shrink-0">
            <AvatarImage src={userAvatar} alt={userName} />
            <AvatarFallback className="bg-primary/10 text-primary text-xs">
              {getInitials(userName)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h1 className="text-sm font-semibold truncate">{userName}</h1>
            <p className="text-[10px] text-muted-foreground truncate">Active now</p>
          </div>
        </div>
        <button className="p-2 -mr-2 hover:bg-muted rounded-lg transition-colors shrink-0">
          <MoreVertical className="w-5 h-5" />
        </button>
      </header>

      {/* Listing Context Card */}
      <div className="px-4 py-3 border-b bg-muted/30 shrink-0">
        <div className="flex items-center gap-3 bg-background rounded-lg p-2 border">
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted shrink-0">
            <img
              src={listingImage}
              alt={listingTitle}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium truncate">{listingTitle}</p>
            <p className="text-[10px] text-muted-foreground">Chatting about this item</p>
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="h-8 px-3 text-[11px] shrink-0"
            onClick={onViewListing}
          >
            <Eye className="w-3.5 h-3.5 mr-1" />
            View
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 px-4 py-3" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((message, index) => {
            const showAvatar = message.type === 'received' && 
              (index === 0 || messages[index - 1].type !== 'received');
            
            return (
              <div
                key={message.id}
                className={`flex items-end gap-2 ${
                  message.type === 'sent' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                {/* Avatar for received messages */}
                {message.type === 'received' && (
                  <div className="w-6 h-6 shrink-0">
                    {showAvatar ? (
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={userAvatar} alt={userName} />
                        <AvatarFallback className="bg-primary/10 text-primary text-[9px]">
                          {getInitials(userName)}
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="w-6 h-6" />
                    )}
                  </div>
                )}

                {/* Message Bubble */}
                <div
                  className={`max-w-[75%] ${
                    message.type === 'sent' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`px-3 py-2 rounded-2xl ${
                      message.type === 'sent'
                        ? 'bg-primary text-primary-foreground rounded-br-sm'
                        : 'bg-muted text-foreground rounded-bl-sm'
                    }`}
                  >
                    <p className="text-sm leading-relaxed break-words">
                      {message.content}
                    </p>
                  </div>
                  <span className={`text-[10px] text-muted-foreground mt-1 block px-1 ${
                    message.type === 'sent' ? 'text-right' : 'text-left'
                  }`}>
                    {message.timestamp}
                  </span>
                </div>

                {/* Spacer for sent messages */}
                {message.type === 'sent' && <div className="w-6 h-6 shrink-0" />}
              </div>
            );
          })}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="px-4 py-3 border-t bg-background shrink-0">
        <div className="flex items-end gap-2">
          {/* Image button */}
          <button className="p-2 hover:bg-muted rounded-lg transition-colors shrink-0 mb-0.5">
            <ImageIcon className="w-5 h-5 text-muted-foreground" />
          </button>

          {/* Input field */}
          <div className="flex-1">
            <Input
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type a message..."
              className="min-h-[40px] resize-none"
            />
          </div>

          {/* Send button */}
          <Button
            size="icon"
            onClick={handleSendMessage}
            disabled={!messageInput.trim()}
            className="h-10 w-10 rounded-full shrink-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Helper text */}
        <p className="text-[10px] text-muted-foreground text-center mt-2">
          Meet in public places. Never send money in advance.
        </p>
      </div>
    </div>
  );
}
