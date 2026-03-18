import type { 
  ListingLifecycle, 
  ListingVisibility, 
  ListingType, 
  Group, 
  EventType,
  OfferType,
  ListingStats
} from "../../types";

export interface MyListing {
  id: string;
  title: string;
  type: ListingType;
  offerType?: OfferType;
  price?: string;
  location?: string;
  username: string;
  lifecycle: ListingLifecycle;
  visibility: ListingVisibility;
  groupIds?: string[];
  eventTypeId?: string;
  stats: ListingStats;
  thumbnail?: string;
  createdAt: Date;
  updatedAt: Date;
  // My Listings - Messages state
  hasUnreadMessages?: boolean;
  messageType?: 'chat' | 'question'; // Type of message: private chat or public question
  lastMessagePreview?: string;
  lastMessageFrom?: string;
  lastMessageAt?: string;
  // My Listings - Reported state
  isReported?: boolean;
  reportReason?: string;
  reportDetails?: string;
  reportedBy?: string;
  reportedAt?: string;
  // My Listings - Expiring state
  daysUntilExpiration?: number;
  expiresAt?: string;
}

export interface FilterState {
  status: Set<ListingLifecycle>;
  type: Set<ListingType>;
  visibility: Set<ListingVisibility>;
  selectedGroups: Set<string>; // Group IDs
  groupsScope: "all" | "public" | "my-groups" | "specific"; // New: Groups filter scope
  selectedEventTypes: Set<string>; // Event type IDs (for listings of type "event")
  hasMessages: boolean;
  isReported: boolean;
  isExpiringSoon: boolean;
  discounted: boolean; // Renamed from discounted for clarity
  lowEngagement: boolean; // Low views
  highEngagement: boolean; // High views (new)
}

export interface FilterChip {
  label: string;
  key: string;
  onRemove: () => void;
}

export interface LifecycleConfig {
  label: string;
  color: string;
  textColor: string;
  bgColor: string;
}

export interface VisibilityConfig {
  icon: string;
  label: string;
}

export const lifecycleConfig: Record<ListingLifecycle, LifecycleConfig> = {
  active: { label: "Active", color: "bg-green-500", textColor: "text-green-700", bgColor: "bg-green-50" },
  draft: { label: "Draft", color: "bg-gray-400", textColor: "text-gray-700", bgColor: "bg-gray-50" },
  paused: { label: "Paused", color: "bg-yellow-500", textColor: "text-yellow-700", bgColor: "bg-yellow-50" },
  expired: { label: "Expired", color: "bg-red-500", textColor: "text-red-700", bgColor: "bg-red-50" },
  archived: { label: "Archived", color: "bg-slate-500", textColor: "text-slate-700", bgColor: "bg-slate-50" },
  sold: { label: "Sold", color: "bg-emerald-500", textColor: "text-emerald-700", bgColor: "bg-emerald-50" },
};

// MVP-ALIGNED: Only Public and Groups for My Listings
export const visibilityConfig: Record<ListingVisibility, VisibilityConfig> = {
  public: { icon: "🌍", label: "Public" },
  groups: { icon: "👥", label: "Groups" },
  private: { icon: "🔒", label: "Private" }, // Keep for backward compatibility but not shown in filters
};

export const typeLabels: Record<ListingType, string> = {
  product: "Product",
  service: "Service",
  event: "Event",
};