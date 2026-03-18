/**
 * Mock Chat Messages Data
 * Simula conversaciones de chat 1-on-1 estilo WhatsApp
 * CON PERSISTENCIA EN LOCALSTORAGE
 * 
 * Moved from /components/mockChatMessages.ts to /data/ (FASE 2 - Refactorización)
 */

const STORAGE_KEY = 'listlyup_chat_conversations';
const STORAGE_VERSION = '2.2'; // 🔒 PHASE 2.2d: Version tracking to invalidate stale localStorage data

// Load from localStorage or use default
function loadConversations(): Record<string, ChatConversation> {
  if (typeof window === 'undefined') return {};
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      // 🔒 PHASE 2.2d: Check version - invalidate if outdated
      if (data.version !== STORAGE_VERSION) {
        console.log('[ChatMessages] Clearing outdated localStorage data (version mismatch)');
        localStorage.removeItem(STORAGE_KEY);
        return {};
      }
      return data.conversations || {};
    }
  } catch (error) {
    console.error('Error loading chats from localStorage:', error);
  }
  
  return {};
}

// Save to localStorage
function saveConversations(conversations: Record<string, ChatConversation>) {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      version: STORAGE_VERSION, // 🔒 PHASE 2.2d: Include version
      conversations,
    }));
  } catch (error) {
    console.error('Error saving chats to localStorage:', error);
  }
}

export interface ChatUser {
  id: string;
  name: string;
  avatar?: string;
  isOnline: boolean;
  lastSeen?: string;
}

export interface ChatListing {
  id: string;
  title: string;
  price: string;
  image?: string;
  type?: 'product' | 'service' | 'event'; // ✅ P2 HOTFIX: Add type to determine Make Offer availability
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isRead: boolean;
  isSent: boolean;
  type: 'text' | 'offer' | 'image' | 'system';
  offer?: {
    amount: string;
    status: 'pending' | 'accepted' | 'rejected';
  };
  imageUrl?: string;
}

export interface ChatConversation {
  chatId: string;
  conversationType?: 'sales' | 'moderation'; // ✅ DUAL FLOW: Support moderation conversations parallel to sales
  context?: { // ✅ ADMIN CATEGORIZATION: Context for moderation conversations
    type: 'listing' | 'user' | 'group';
    id?: string; // Optional entity ID
  };
  otherUser: ChatUser;
  listing?: ChatListing;
  messages: ChatMessage[];
}

// Mock conversations data
export const mockChatConversations: Record<string, ChatConversation> = {
  'chat-1': {
    chatId: 'chat-1',
    otherUser: {
      id: 'user-maria',
      name: 'María González',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
      isOnline: true,
    },
    listing: {
      id: '24', // ✅ PHASE 2.2: Changed from 'listing-laptop' to valid mockProducts ID
      title: 'MacBook Pro 14\" M2 - Like New',
      price: '$1,899',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
      type: 'product', // ✅ P2 HOTFIX: Add type to existing mock chats
    },
    messages: [
      {
        id: 'msg-1',
        senderId: 'user-maria',
        senderName: 'María González',
        text: 'Hi! Is this still available?',
        timestamp: '2025-11-25T09:30:00Z',
        isRead: true,
        isSent: true,
        type: 'text',
      },
      {
        id: 'msg-2',
        senderId: 'me',
        senderName: 'You',
        text: 'Yes! It\'s still available 😊',
        timestamp: '2025-11-25T09:32:00Z',
        isRead: true,
        isSent: true,
        type: 'text',
      },
      {
        id: 'msg-3',
        senderId: 'user-maria',
        senderName: 'María González',
        text: 'Great! Does it come with the original charger and box?',
        timestamp: '2025-11-25T09:35:00Z',
        isRead: true,
        isSent: true,
        type: 'text',
      },
      {
        id: 'msg-4',
        senderId: 'me',
        senderName: 'You',
        text: 'Yes, everything is included. The laptop is in excellent condition, barely used.',
        timestamp: '2025-11-25T09:36:00Z',
        isRead: true,
        isSent: true,
        type: 'text',
      },
      {
        id: 'msg-5',
        senderId: 'user-maria',
        senderName: 'María González',
        text: 'Would you accept $1,700?',
        timestamp: '2025-11-25T10:15:00Z',
        isRead: false,
        isSent: true,
        type: 'offer',
        offer: {
          amount: '$1,700',
          status: 'pending',
        },
      },
      {
        id: 'msg-6',
        senderId: 'me',
        senderName: 'You',
        text: 'I can do $1,800. That\'s my lowest price.',
        timestamp: '2025-11-26T08:20:00Z',
        isRead: false,
        isSent: true,
        type: 'text',
      },
    ],
  },
  'chat-2': {
    chatId: 'chat-2',
    otherUser: {
      id: 'user-carlos',
      name: 'Carlos Ruiz',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
      isOnline: false,
      lastSeen: '2h ago',
    },
    listing: {
      id: '5', // ✅ PHASE 2.2: Changed from 'listing-bike' to valid mockProducts ID
      title: 'Mountain Bike Trek X-Caliber',
      price: '$650',
      image: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=400',
    },
    messages: [
      {
        id: 'msg-1',
        senderId: 'user-carlos',
        senderName: 'Carlos Ruiz',
        text: 'Hey, interested in the bike. Can I see it today?',
        timestamp: '2025-11-24T14:20:00Z',
        isRead: true,
        isSent: true,
        type: 'text',
      },
      {
        id: 'msg-2',
        senderId: 'me',
        senderName: 'You',
        text: 'Sure! I\'m available after 5 PM. Where are you located?',
        timestamp: '2025-11-24T14:45:00Z',
        isRead: true,
        isSent: true,
        type: 'text',
      },
      {
        id: 'msg-3',
        senderId: 'user-carlos',
        senderName: 'Carlos Ruiz',
        text: 'I\'m in downtown. Can you meet at Starbucks on Main St?',
        timestamp: '2025-11-24T15:10:00Z',
        isRead: true,
        isSent: true,
        type: 'text',
      },
      {
        id: 'msg-4',
        senderId: 'me',
        senderName: 'You',
        text: 'Perfect! See you at 5:30 PM',
        timestamp: '2025-11-24T15:12:00Z',
        isRead: true,
        isSent: true,
        type: 'text',
      },
      {
        id: 'msg-5',
        senderId: 'user-carlos',
        senderName: 'Carlos Ruiz',
        text: 'Sounds good 👍',
        timestamp: '2025-11-24T15:15:00Z',
        isRead: true,
        isSent: true,
        type: 'text',
      },
    ],
  },
  'chat-3': {
    chatId: 'chat-3',
    otherUser: {
      id: 'user-sofia',
      name: 'Sofía Martínez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      isOnline: true,
    },
    listing: {
      id: '25', // ✅ PHASE 2.2: Changed from 'listing-camera' to valid mockProducts ID
      title: 'Canon EOS R6 + 24-105mm Lens',
      price: '$2,400',
      image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400',
    },
    messages: [
      {
        id: 'msg-1',
        senderId: 'user-sofia',
        senderName: 'Sofía Martínez',
        text: 'Hi! I\'m interested in trading. I have a Sony A7III with extras.',
        timestamp: '2025-11-26T07:00:00Z',
        isRead: true,
        isSent: true,
        type: 'text',
      },
      {
        id: 'msg-2',
        senderId: 'me',
        senderName: 'You',
        text: 'Interesting! What extras do you have?',
        timestamp: '2025-11-26T07:15:00Z',
        isRead: true,
        isSent: true,
        type: 'text',
      },
      {
        id: 'msg-3',
        senderId: 'user-sofia',
        senderName: 'Sofía Martínez',
        text: '3 batteries, 64GB SD card, and a camera bag. All in great condition.',
        timestamp: '2025-11-26T07:20:00Z',
        isRead: false,
        isSent: true,
        type: 'text',
      },
    ],
  },
  // ✅ PHASE 2.4: New chats for fixing entry points (Notifications, Action Center, MyTrail, Admin)
  'sale-1': {
    chatId: 'sale-1',
    otherUser: {
      id: 'user-juan',
      name: 'Juan Pérez',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      isOnline: false,
      lastSeen: '1h ago',
    },
    listing: {
      id: '8', // Headphones Sony (reusing existing product if available)
      title: 'Headphones Sony WH-1000XM4',
      price: '$200',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
      type: 'product',
    },
    messages: [
      {
        id: 'msg-1',
        senderId: 'user-juan',
        senderName: 'Juan Pérez',
        text: 'Hi! I\'d like to buy the headphones. Are they still available?',
        timestamp: '2025-11-26T10:00:00Z',
        isRead: true,
        isSent: true,
        type: 'text',
      },
      {
        id: 'msg-2',
        senderId: 'me',
        senderName: 'You',
        text: 'Yes! They\'re in perfect condition. When would you like to meet?',
        timestamp: '2025-11-26T10:15:00Z',
        isRead: true,
        isSent: true,
        type: 'text',
      },
      {
        id: 'msg-3',
        senderId: 'user-juan',
        senderName: 'Juan Pérez',
        text: 'Great! I\'ll take them. Can we arrange delivery?',
        timestamp: '2025-11-26T11:00:00Z',
        isRead: false,
        isSent: true,
        type: 'text',
      },
    ],
  },
  'product-ana-1': {
    chatId: 'product-ana-1',
    otherUser: {
      id: 'user-pedro',
      name: 'Pedro López',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      isOnline: true,
    },
    listing: {
      id: '15', // Desk Lamp (reusing existing product if available)
      title: 'Lámpara de Escritorio',
      price: '$45',
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400',
      type: 'product',
    },
    messages: [
      {
        id: 'msg-1',
        senderId: 'user-pedro',
        senderName: 'Pedro López',
        text: '¿Está disponible aún?',
        timestamp: '2025-11-26T12:00:00Z',
        isRead: false,
        isSent: true,
        type: 'text',
      },
    ],
  },
  'product-carlos-1': {
    chatId: 'product-carlos-1',
    otherUser: {
      id: 'user-ana',
      name: 'Ana Rodríguez',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
      isOnline: true,
    },
    listing: {
      id: '12', // iPhone (reusing existing product if available)
      title: 'iPhone 14 Pro',
      price: '$899',
      image: 'https://images.unsplash.com/photo-1592286927505-b6e1c196f2a8?w=400',
      type: 'product',
    },
    messages: [
      {
        id: 'msg-1',
        senderId: 'user-ana',
        senderName: 'Ana Rodríguez',
        text: '¿Aceptas $800?',
        timestamp: '2025-11-26T13:00:00Z',
        isRead: false,
        isSent: true,
        type: 'text',
      },
    ],
  },
  'product-maria-2': {
    chatId: 'product-maria-2',
    otherUser: {
      id: 'user-pablo',
      name: 'Pablo Ruiz',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100',
      isOnline: false,
      lastSeen: '30m ago',
    },
    listing: {
      id: '18', // Designer Wallet (reusing existing product if available)
      title: 'Cartera Diseñador',
      price: '$120',
      image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400',
      type: 'product',
    },
    messages: [
      {
        id: 'msg-1',
        senderId: 'user-pablo',
        senderName: 'Pablo Ruiz',
        text: '¿Aceptas $100?',
        timestamp: '2025-11-26T14:00:00Z',
        isRead: false,
        isSent: true,
        type: 'text',
      },
    ],
  },
  'admin-appeal-1': {
    chatId: 'admin-appeal-1',
    conversationType: 'moderation',
    context: {
      type: 'user',
      id: 'user-sandra',
    },
    otherUser: {
      id: 'user-sandra',
      name: 'Sandra Torres',
      avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100',
      isOnline: false,
      lastSeen: '2h ago',
    },
    messages: [
      {
        id: 'msg-1',
        senderId: 'user-sandra',
        senderName: 'Sandra Torres',
        text: 'Hi, I\'m appealing the suspension of my listing. Can we discuss this?',
        timestamp: '2025-11-26T08:00:00Z',
        isRead: false,
        isSent: true,
        type: 'text',
      },
    ],
  },
  'mod-listing-1': {
    chatId: 'mod-listing-1',
    conversationType: 'moderation',
    context: {
      type: 'listing',
      id: 'fl-1',
    },
    otherUser: {
      id: 'user-suspect',
      name: 'Suspect User',
      avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100',
      isOnline: true,
    },
    listing: {
      id: 'fl-1',
      title: 'iPhone 14 Pro Max - $50 URGENT SALE!!!',
      price: '$50',
      image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=400',
      type: 'product',
    },
    messages: [
      {
        id: 'msg-sys',
        senderId: 'system',
        senderName: 'Platform',
        text: 'This moderation conversation has been opened regarding a flagged listing.',
        timestamp: '2025-11-26T10:00:00Z',
        isRead: false,
        isSent: true,
        type: 'system',
      },
      {
        id: 'msg-1',
        senderId: 'me',
        senderName: 'Admin',
        text: 'Hi, we noticed the price on your iPhone listing is significantly below market value. Can you confirm this is accurate?',
        timestamp: '2025-11-26T10:05:00Z',
        isRead: true,
        isSent: true,
        type: 'text',
      },
    ],
  },
  'mod-group-1': {
    chatId: 'mod-group-1',
    conversationType: 'moderation',
    context: {
      type: 'group',
      id: 'group-tech-scammers',
    },
    otherUser: {
      id: 'user-shady-admin',
      name: 'Shady Admin',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
      isOnline: false,
      lastSeen: '1d ago',
    },
    messages: [
      {
        id: 'msg-sys',
        senderId: 'system',
        senderName: 'Platform',
        text: 'This moderation conversation has been opened regarding reported group activity.',
        timestamp: '2025-11-25T14:00:00Z',
        isRead: false,
        isSent: true,
        type: 'system',
      },
      {
        id: 'msg-1',
        senderId: 'me',
        senderName: 'Admin',
        text: 'We\'ve received reports about harassment in your group. We need to discuss the group\'s content policies.',
        timestamp: '2025-11-25T14:30:00Z',
        isRead: true,
        isSent: true,
        type: 'text',
      },
    ],
  },
};

// Helper to get conversation by chatId
export function getChatConversation(chatId: string) {
  return mockChatConversations[chatId] || null;
}

// Helper to get all conversations
export function getAllConversations(): ChatConversation[] {
  return Object.values(mockChatConversations);
}

// Helper to get unread message count
export function getUnreadMessageCount(): number {
  return Object.values(mockChatConversations).reduce((total, conv) => {
    const unreadCount = conv.messages.filter(
      (msg) => msg.senderId !== 'me' && !msg.isRead
    ).length;
    return total + unreadCount;
  }, 0);
}

// Helper to mark all messages in a chat as read
export function markChatAsRead(chatId: string) {
  const conversation = mockChatConversations[chatId];
  if (!conversation) return;

  conversation.messages.forEach((msg) => {
    if (msg.senderId !== 'me') {
      msg.isRead = true;
    }
  });
  
  saveConversations(mockChatConversations);
}

// Initialize conversations from localStorage on module load
if (typeof window !== 'undefined') {
  const loaded = loadConversations();
  // If localStorage is empty, keep the default mock data
  if (Object.keys(loaded).length > 0) {
    Object.assign(mockChatConversations, loaded);
  } else {
    // Save initial mock data to localStorage
    saveConversations(mockChatConversations);
  }
}

// Helper to add message to conversation
export function addMessageToChat(chatId: string, message: Omit<ChatMessage, 'id' | 'timestamp'>) {
  const conversation = mockChatConversations[chatId];
  if (!conversation) return null;

  const newMessage: ChatMessage = {
    ...message,
    id: `msg-${Date.now()}`,
    timestamp: new Date().toISOString(),
  };

  conversation.messages.push(newMessage);
  saveConversations(mockChatConversations);
  
  return newMessage;
}

// Helper to format timestamp
export function formatMessageTime(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// Helper to format day separator
export function formatDaySeparator(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / 86400000);

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
}

// Helper to group messages by day
export function groupMessagesByDay(messages: ChatMessage[]): { day: string; messages: ChatMessage[] }[] {
  const groups: { day: string; messages: ChatMessage[] }[] = [];
  let currentDay = '';

  messages.forEach((message) => {
    const day = formatDaySeparator(message.timestamp);
    if (day !== currentDay) {
      currentDay = day;
      groups.push({ day, messages: [message] });
    } else {
      groups[groups.length - 1].messages.push(message);
    }
  });

  return groups;
}

/**
 * ✅ DUAL FLOW: Create a moderation conversation
 * Used by admins to initiate moderation discussions before taking action
 * 
 * @param targetUserId - User ID to start conversation with
 * @param listingId - Optional listing ID if moderation is about a specific listing
 * @param contextType - Type of entity being moderated (listing, user, group)
 * @returns chatId - New moderation chat ID
 */
export function createModerationChat(
  targetUserId: string, 
  listingId?: string,
  contextType?: 'listing' | 'user' | 'group'
): string {
  const chatId = `mod-${Date.now()}`;
  
  // Find target user from existing chats (in real app, fetch from user service)
  let targetUser: ChatUser | undefined;
  for (const conv of Object.values(mockChatConversations)) {
    if (conv.otherUser.id === targetUserId) {
      targetUser = conv.otherUser;
      break;
    }
  }
  
  // Fallback if user not found
  if (!targetUser) {
    targetUser = {
      id: targetUserId,
      name: `User ${targetUserId}`,
      isOnline: false,
      lastSeen: new Date().toISOString(),
    };
  }
  
  // Find listing if provided
  let listing: ChatListing | undefined;
  if (listingId) {
    for (const conv of Object.values(mockChatConversations)) {
      if (conv.listing?.id === listingId) {
        listing = conv.listing;
        break;
      }
    }
  }
  
  // Determine context type automatically if not provided
  let finalContextType: 'listing' | 'user' | 'group' = contextType || 'user';
  if (!contextType && listingId) {
    finalContextType = 'listing';
  }
  
  // Create moderation conversation
  mockChatConversations[chatId] = {
    chatId,
    conversationType: 'moderation',
    context: {
      type: finalContextType,
      id: listingId || targetUserId,
    },
    otherUser: targetUser,
    listing,
    messages: [
      {
        id: `msg-${Date.now()}`,
        senderId: 'system',
        senderName: 'Platform',
        text: 'This moderation conversation has been opened by Platform.',
        timestamp: new Date().toISOString(),
        isRead: false,
        isSent: true,
        type: 'system',
      }
    ],
  };
  
  saveConversations(mockChatConversations);
  return chatId;
}

/**
 * Helper: Get all moderation conversations
 * Used in Action Center to display moderation chats
 */
export function getModerationChats(): ChatConversation[] {
  return Object.values(mockChatConversations)
    .filter(conv => conv.conversationType === 'moderation');
}

/**
 * Helper: Buscar o crear un chat basado en productId y sellerId
 * Retorna el chatId para navegar
 */
export function findOrCreateChatForProduct(
  productId: string, 
  productTitle: string, 
  sellerId: string, 
  sellerName: string,
  productPrice?: string,
  productImage?: string,
  productType?: 'product' | 'service' | 'event' // ✅ P2 HOTFIX: Add type parameter
): string {
  // Buscar si ya existe un chat para este producto
  const existingChat = Object.values(mockChatConversations).find(
    (conv) => conv.listing?.id === productId || conv.otherUser.id === sellerId
  );
  
  if (existingChat) {
    return existingChat.chatId;
  }
  
  // Crear nuevo chat
  const newChatId = `chat-${Date.now()}`;
  
  mockChatConversations[newChatId] = {
    chatId: newChatId,
    otherUser: {
      id: sellerId,
      name: sellerName,
      isOnline: Math.random() > 0.5, // Random online status
      lastSeen: new Date(Date.now() - Math.random() * 3600000).toISOString(),
    },
    listing: {
      id: productId,
      title: productTitle,
      price: productPrice || '$0',
      image: productImage,
      type: productType, // ✅ P2 HOTFIX: Store type to filter Make Offer availability
    },
    messages: [
      {
        id: `msg-${Date.now()}`,
        senderId: 'me',
        senderName: 'You',
        text: `Hi! I'm interested in ${productTitle}`,
        timestamp: new Date().toISOString(),
        isRead: false,
        isSent: false, // Will be set to true after "sending"
        type: 'text',
      }
    ],
  };
  
  saveConversations(mockChatConversations);
  return newChatId;
}