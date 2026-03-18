export interface MyGroup {
  id: string;
  name: string;
  description?: string;
  avatarUrl?: string;
  memberCount: number;
  productCount: number;
  serviceCount: number;
  location: string;
  role: "admin" | "moderator" | "member";
  status: "joined" | "pending" | "invited";
  groupType: "public" | "private" | "secret";
  isActive: boolean; // Has activity in last 30 days
  createdAt: Date;
  lastActivityAt: Date;
  isPinned?: boolean; // Pinned to top of list
  isMuted?: boolean; // Notifications muted
  preset?: string; // Group preset for invite method detection
  slug?: string; // Group slug for invite links
}

export interface FilterState {
  status: Set<"joined" | "pending" | "invited">;
  role: Set<"admin" | "moderator" | "member">;
  groupType: Set<"public" | "private" | "secret">;
  hasProducts: boolean;
  hasServices: boolean;
  isActive: boolean;
  isInactive: boolean;
  selectedLocations: Set<string>;
}

export interface FilterChip {
  label: string;
  key: string;
  onRemove: () => void;
}

export interface Location {
  id: string;
  name: string;
  emoji: string;
}