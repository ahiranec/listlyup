import type { CanonicalListing } from "../../types/canonical";

/**
 * Extended Listing interface with complete detail page data
 * CANONICAL NATIVE
 */
export interface ExtendedListing extends CanonicalListing {
  // Price extensions
  originalPrice?: string;
  discount?: number;
  negotiable?: boolean;
  priceHistory?: { date: string; price: string }[];
  
  // Rating extensions
  itemRating?: number;
  itemReviews?: number;
  
  // Seller extensions (runtime data)
  seller?: {
    id: string;
    name: string;
    username: string;
    rating: number;
    reviews: number;
    verified: boolean;
    isStore: boolean;
    memberSince: string;
    responseTime: string;
    itemsSold?: number;
  };
  
  // Payment methods
  paymentMethods?: string[];
  
  // Questions
  questions?: {
    id: string;
    question: string;
    askedBy: string;
    askedAt: string;
    helpful: number;
    answer?: { text: string; answeredAt: string; helpful: number };
  }[];
  
  // Stats (runtime data)
  stats?: {
    views: number;
    favorites: number;
    messages: number;
    shares: number;
    viewsChange?: number;
  };
  
  // Conversations (runtime data)
  conversations?: {
    id: string;
    userName: string;
    lastMessage: string;
    time: string;
    unread: boolean;
  }[];
  
  // Media items (runtime expanded from images array)
  mediaItems?: { type: 'image' | 'video'; url: string; thumbnail?: string }[];
  
  // Trade extensions
  lookingFor?: string[];
}

export interface MediaItem {
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
}
