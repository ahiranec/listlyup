/**
 * Chat Conversation Page - Premium Design 2025
 * WhatsApp/iMessage style 1-on-1 chat
 * Mobile-first optimized for iPhone
 * 
 * FEATURES:
 * - Full page chat UI with bubbles
 * - Read receipts (✓ sent, ✓✓ read)
 * - Day separators
 * - Typing indicator
 * - Auto-scroll to bottom
 * - Sticky input with auto-resize
 * - Listing preview header
 * - Quick actions for offers
 */

import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';
import { getChatConversation, formatMessageTime, groupMessagesByDay, addMessageToChat, markChatAsRead, type ChatMessage } from '../data/chatMessages';
import { MarkAsSoldSheet } from './sheets/MarkAsSoldSheet';
import { DealConfirmedDialog } from './DealConfirmedDialog';
import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, MoreVertical, Send, Check, CheckCheck, Phone, Video, Info, CheckCircle, DollarSign, Image as ImageIcon, Smile, Shield } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';
import { useGlobalActionModal } from './global-action-modal';

interface ChatConversationPageProps {
  chatId: string;
  onBack: () => void;
  isOwner?: boolean; // NEW: Si el usuario actual es el dueño del listing
  onViewProduct?: (productId: string) => void; // NEW: Callback para ver el producto
}

export function ChatConversationPage({ chatId, onBack, isOwner = false, onViewProduct }: ChatConversationPageProps) {
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMarkSoldOpen, setIsMarkSoldOpen] = useState(false);
  const [isDealConfirmedOpen, setIsDealConfirmedOpen] = useState(false);
  const [acceptedOfferAmount, setAcceptedOfferAmount] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const { dispatch } = useGlobalActionModal();
  
  const conversation = getChatConversation(chatId);

  // Determinar si el usuario actual es el owner del listing
  // En un chat real, esto vendría del listingOwnerId vs currentUserId
  // Por ahora, asumimos que si el listing existe, el primer mensaje de "me" NO es el owner (es el buyer)
  // y "system" o el otro usuario es el seller
  const isListingOwner = conversation?.messages.some(msg => msg.senderId === 'me' && msg.type === 'system') || false;
  // Mejor lógica: usar isOwner prop si está definido, si no, asumir que NO somos owner (somos buyer)
  const actualIsOwner = isOwner !== undefined ? isOwner : !isListingOwner;

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation?.messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [newMessage]);

  // Simulate typing indicator
  useEffect(() => {
    if (Math.random() > 0.7) {
      const timer = setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 3000);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Mark messages as read when opening the chat
  useEffect(() => {
    markChatAsRead(chatId);
  }, [chatId]);

  if (!conversation) {
    return (
      <div className="h-screen bg-background flex flex-col items-center justify-center gap-4 p-6">
        {/* Back button */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 p-2 rounded-full hover:bg-muted transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        
        {/* Error message */}
        <div className="text-center space-y-3">
          <p className="text-muted-foreground text-lg">Chat not found</p>
          <p className="text-sm text-muted-foreground max-w-[280px]">
            This conversation may have been deleted or is no longer available.
          </p>
        </div>
        
        {/* Action button */}
        <Button onClick={onBack} variant="outline" className="mt-2">
          Back to Messages
        </Button>
      </div>
    );
  }

  const { otherUser, listing, messages } = conversation;
  const groupedMessages = groupMessagesByDay(messages);

  // ✅ DUAL FLOW: Detect if this is a moderation conversation
  const isModeration = conversation.conversationType === 'moderation';

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    addMessageToChat(chatId, {
      senderId: 'me',
      senderName: 'You',
      text: newMessage,
      isRead: false,
      isSent: true,
      type: 'text',
    });

    setNewMessage('');
    scrollToBottom();
  };

  const handleAcceptOffer = (messageId: string) => {
    // Find the offer message
    const offerMessage = messages.find(msg => msg.id === messageId);
    if (!offerMessage || !offerMessage.offer) return;
    
    const offerAmount = offerMessage.offer.amount;
    
    // Update offer status to accepted (in a real app, this would update the database)
    if (offerMessage.offer) {
      offerMessage.offer.status = 'accepted';
    }
    
    // Add celebration system message to chat
    addMessageToChat(chatId, {
      senderId: 'system',
      senderName: 'System',
      text: `🤝 Deal confirmed at ${offerAmount}`,
      isRead: true,
      isSent: true,
      type: 'system',
    });
    
    // Store the accepted offer amount and show dialog
    setAcceptedOfferAmount(offerAmount);
    setIsDealConfirmedOpen(true);
    
    scrollToBottom();
  };

  const handleRejectOffer = (messageId: string) => {
    toast.info('Offer rejected');
  };

  const handleSubmitOffer = (amount: string, message: string) => {
    // Add offer message to chat
    addMessageToChat(chatId, {
      senderId: 'me',
      senderName: 'You',
      text: message || `I'd like to offer $${amount} for this item.`,
      isRead: false,
      isSent: true,
      type: 'offer',
      offer: {
        amount: `$${amount}`,
        status: 'pending',
      },
    });
    scrollToBottom();
  };

  const handleConfirmSold = (soldTo: string, finalPrice: string) => {
    // Add system message to chat
    addMessageToChat(chatId, {
      senderId: 'system',
      senderName: 'System',
      text: `Item sold to ${soldTo} for $${finalPrice}`,
      isRead: true,
      isSent: true,
      type: 'system',
    });
    scrollToBottom();
    setIsDealConfirmedOpen(true);
  };

  const handleMarkedAsSold = (buyerId: string, finalPrice: string) => {
    // For canonical component
    handleConfirmSold(otherUser.name, finalPrice);
  };

  return (
    <div className="h-screen bg-background flex flex-col max-w-[480px] lg:max-w-[640px] mx-auto">
      {/* Status bar removed - PWA/WebView mobile */}

      {/* Header */}
      <header className="h-[60px] px-4 flex items-center justify-between border-b bg-background shrink-0">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <button
            onClick={onBack}
            className="p-2 -ml-2 hover:bg-muted rounded-lg transition-colors shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Avatar + Name + Status */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="relative shrink-0">
              {otherUser.avatar ? (
                <img
                  src={otherUser.avatar}
                  alt={otherUser.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {otherUser.name.charAt(0)}
                  </span>
                </div>
              )}
              {otherUser.isOnline && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h1 className="font-semibold truncate text-sm">{otherUser.name}</h1>
              <p className="text-xs text-muted-foreground">
                {otherUser.isOnline ? 'Online' : otherUser.lastSeen || 'Offline'}
              </p>
            </div>
          </div>
        </div>

        <button className="p-2 -mr-2 hover:bg-muted rounded-lg transition-colors shrink-0">
          <MoreVertical className="w-5 h-5" />
        </button>
      </header>

      {/* ✅ DUAL FLOW: Moderation Badge */}
      {isModeration && (
        <div className="px-4 py-2 border-b bg-amber-50 dark:bg-amber-950/20 shrink-0">
          <div className="flex items-center gap-2 justify-center">
            <Shield className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <Badge variant="outline" className="border-amber-400 text-amber-700 dark:text-amber-300">
              Platform Moderation
            </Badge>
          </div>
        </div>
      )}

      {/* Listing Preview (if exists) */}
      {listing && (
        <div className="px-4 py-2 border-b bg-muted/30 shrink-0">
          <div className="flex items-center gap-3 p-2 bg-background rounded-lg border">
            {listing.image && (
              <img
                src={listing.image}
                alt={listing.title}
                className="w-12 h-12 rounded object-cover shrink-0"
              />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate">{listing.title}</p>
              <p className="text-xs text-muted-foreground">{listing.price}</p>
            </div>
            <Button 
              size="sm" 
              variant="ghost" 
              className="text-xs h-7 shrink-0"
              onClick={() => onViewProduct?.(listing.id)}
            >
              View
            </Button>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {groupedMessages.map((group) => (
          <div key={group.day} className="space-y-3">
            {/* Day Separator */}
            <div className="flex items-center justify-center">
              <div className="px-3 py-1 bg-muted/50 rounded-full">
                <p className="text-xs text-muted-foreground font-medium">{group.day}</p>
              </div>
            </div>

            {/* Messages */}
            {group.messages.map((message) => {
              const isMe = message.senderId === 'me';
              
              // DEBUG: Log para verificar senderId
              console.log('Message:', { 
                id: message.id, 
                senderId: message.senderId, 
                isMe, 
                text: message.text.substring(0, 30) 
              });

              return (
                <div key={message.id} className={`flex ${message.type === 'system' ? 'justify-center' : isMe ? 'justify-end' : 'justify-start'}`}>
                  {message.type === 'system' ? (
                    /* System Message - Deal Confirmed - Full Width Centered */
                    <div className="px-4 py-2 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-2 border-green-300 dark:border-green-800">
                      <p className="text-sm text-green-900 dark:text-green-100 font-medium text-center">
                        {message.text}
                      </p>
                    </div>
                  ) : (
                    <div className={`max-w-[75%] ${isMe ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                      {/* Message Bubble */}
                      {message.type === 'text' && (
                        <div
                          className={`px-3 py-2 rounded-2xl ${
                            isMe
                              ? 'bg-blue-500 text-white rounded-br-md'
                              : 'bg-muted border rounded-bl-md'
                          }`}
                        >
                          <p className="text-sm break-words">{message.text}</p>
                        </div>
                      )}

                      {/* Offer Bubble */}
                      {message.type === 'offer' && message.offer && (
                        <div
                          className={`px-3 py-2 rounded-2xl border-2 ${
                            isMe
                              ? 'bg-green-50 dark:bg-green-950/20 border-green-300 dark:border-green-800 rounded-br-md'
                              : 'bg-amber-50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800 rounded-bl-md'
                          }`}
                        >
                          <p className="text-xs text-muted-foreground mb-1">
                            {isMe ? 'You offered' : 'Offer received'}
                          </p>
                          <p className="font-semibold text-lg">{message.offer.amount}</p>
                          
                          {!isMe && message.offer.status === 'pending' && (
                            <div className="flex gap-2 mt-2">
                              <Button
                                size="sm"
                                variant="default"
                                onClick={() => handleAcceptOffer(message.id)}
                                className="h-7 text-xs flex-1"
                              >
                                Accept
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleRejectOffer(message.id)}
                                className="h-7 text-xs flex-1"
                              >
                                Reject
                              </Button>
                            </div>
                          )}
                          
                          {message.offer.status === 'accepted' && (
                            <p className="text-xs text-green-600 dark:text-green-400 mt-1">✓ Accepted</p>
                          )}
                          {message.offer.status === 'rejected' && (
                            <p className="text-xs text-red-600 dark:text-red-400 mt-1">✗ Rejected</p>
                          )}
                        </div>
                      )}

                      {/* Timestamp + Read Receipt */}
                      <div className="flex items-center gap-1 px-1">
                        <p className="text-[10px] text-muted-foreground">
                          {formatMessageTime(message.timestamp)}
                        </p>
                        {isMe && (
                          <span className="text-[10px]">
                            {message.isRead ? (
                              <span className="text-blue-500">✓✓</span>
                            ) : message.isSent ? (
                              <span className="text-muted-foreground">✓</span>
                            ) : (
                              <span className="text-muted-foreground">⏱</span>
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="max-w-[75%] flex flex-col gap-1">
              <div className="px-4 py-3 rounded-2xl bg-muted border rounded-bl-md">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:0ms]" />
                  <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:150ms]" />
                  <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
              <p className="text-[10px] text-muted-foreground px-1">
                {otherUser.name.split(' ')[0]} is typing...
              </p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Action Buttons - Solo si hay listing Y NO es moderación */}
      {listing && !isModeration && (
        <div className="px-4 py-2 bg-muted/30 border-t shrink-0">
          <div className="flex gap-2">
            {actualIsOwner ? (
              // Owner: puede marcar como vendido
              <Button
                onClick={() => setIsMarkSoldOpen(true)}
                className="flex-1 h-10 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0 gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                Mark as Sold
              </Button>
            ) : (
              // ✅ P2 HOTFIX: Buyer can Make Offer ONLY for products, NOT for events/services
              // If listing.type is missing/unknown, default to NOT showing Make Offer (fail-safe)
              listing.type === 'product' && (
                <Button
                  onClick={() => {
                    // ✅ Use GAM for consistency
                    dispatch({
                      actionId: 'make-offer',
                      context: {
                        productId: listing.id,
                        listingTitle: listing.title,
                        listingImage: listing.image || '',
                        productPrice: listing.price,
                        sellerId: otherUser.id,
                        sellerName: otherUser.name,
                      },
                      onConfirm: (data) => {
                        // ✅ GAM provides form data: { offerAmount, message }
                        if (data?.offerAmount) {
                          handleSubmitOffer(data.offerAmount.toString(), data.message || '');
                        }
                      },
                    });
                  }}
                  className="flex-1 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 gap-2"
                >
                  <DollarSign className="w-4 h-4" />
                  Make Offer
                </Button>
              )
            )}
          </div>
        </div>
      )}

      {/* ✅ DUAL FLOW: Take Action button for moderation conversations */}
      {isModeration && (
        <div className="px-4 py-2 bg-muted/30 border-t shrink-0">
          <Button
            onClick={() => {
              dispatch({
                actionId: 'moderation-take-action',
                context: {
                  chatId,
                  targetUserId: otherUser.id,
                  targetUserName: otherUser.name,
                  listingId: listing?.id,
                  listingTitle: listing?.title,
                },
                onConfirm: () => {
                  toast.success('Moderation action taken');
                },
              });
            }}
            variant="outline"
            className="w-full h-10 gap-2 border-amber-400 text-amber-700 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-950/20"
          >
            <Shield className="w-4 h-4" />
            Take Action
          </Button>
        </div>
      )}

      {/* Input Area */}
      <div className="px-4 py-3 border-t bg-background shrink-0">
        <div className="flex items-end gap-2">
          {/* Quick Actions */}
          <button className="p-2 hover:bg-muted rounded-lg transition-colors shrink-0">
            <ImageIcon className="w-5 h-5 text-muted-foreground" />
          </button>

          {/* Input */}
          <div className="flex-1 bg-muted rounded-2xl px-4 py-2 flex items-center gap-2">
            <textarea
              ref={textareaRef}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Message..."
              rows={1}
              className="flex-1 bg-transparent resize-none outline-none text-sm max-h-[120px] scrollbar-hide"
            />
            <button className="shrink-0 hover:scale-110 transition-transform">
              <Smile className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Send Button */}
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className={`p-2.5 rounded-full transition-all shrink-0 ${
              newMessage.trim()
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mark as Sold Sheet */}
      {listing && (
        <MarkAsSoldSheet
          open={isMarkSoldOpen}
          onOpenChange={setIsMarkSoldOpen}
          productTitle={listing.title}
          productPrice={listing.price}
          productImage={listing.image || ''}
          onMarkedAsSold={handleMarkedAsSold}
        />
      )}

      {/* Deal Confirmed Dialog */}
      {listing && acceptedOfferAmount && (
        <DealConfirmedDialog
          open={isDealConfirmedOpen}
          onOpenChange={setIsDealConfirmedOpen}
          amount={acceptedOfferAmount}
          itemTitle={listing.title}
          buyerName={otherUser.name}
          isOwner={actualIsOwner}
        />
      )}
    </div>
  );
}

export default ChatConversationPage;