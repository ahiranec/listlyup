// Updated types for Group Filters based on new DB model

export type GroupStatus = "active" | "suspended" | "archived" | "deleted";
export type GroupType = "general" | "event" | "community" | "marketplace";
export type GroupVisibility = "public" | "discoverable" | "invite_only" | "hidden";
export type JoinPolicy = "open" | "request" | "approval_required" | "closed";
export type MemberRole = "admin" | "moderator" | "member";
export type MemberStatus = "invited" | "pending" | "joined" | "removed";

export interface GroupFilterState {
  // Status
  status: Set<GroupStatus>;
  
  // Group Type
  groupType: Set<GroupType>;
  
  // Visibility
  visibility: Set<GroupVisibility>;
  
  // Join Policy
  joinPolicy: Set<JoinPolicy>;
  
  // Location
  selectedCountry: string | null;
  selectedMunicipalities: Set<string>;
  includeNearby: boolean;
  
  // Category
  selectedCategory: string | null;
  selectedSubcategories: Set<string>;
  
  // Tags
  selectedTags: Set<string>;
  
  // Members
  selectedMembers: Set<string>;
  
  // Member Role
  memberRole: Set<MemberRole>;
  
  // Member Status
  memberStatus: Set<MemberStatus>;
  
  // Content
  hasProducts: boolean;
  hasServices: boolean;
  hasEvents: boolean;
}

export interface Country {
  id: string;
  name: string;
  municipalities: Municipality[];
}

export interface Municipality {
  id: string;
  name: string;
  countryId: string;
}

export interface GroupCategory {
  id: string;
  name: string;
  subcategories?: GroupSubcategory[];
}

export interface GroupSubcategory {
  id: string;
  name: string;
  categoryId: string;
}

export interface GroupTag {
  id: string;
  name: string;
}

export interface GroupMember {
  id: string;
  name: string;
  avatarUrl?: string;
}

// Keep existing types for compatibility
export interface MyGroup {
  id: string;
  name: string;
  description?: string;
  avatarUrl?: string;
  memberCount: number;
  productCount: number;
  serviceCount: number;
  location: string;
  role: MemberRole;
  status: MemberStatus;
  groupType: GroupType;
  visibility: GroupVisibility;
  joinPolicy?: JoinPolicy;
  groupStatus?: GroupStatus;
  isActive: boolean;
  createdAt: Date;
  lastActivityAt: Date;
  isPinned?: boolean;
  isMuted?: boolean;
  preset?: string;
  slug?: string;
}

export interface FilterChip {
  label: string;
  key: string;
  onRemove: () => void;
}

// Legacy types for backward compatibility
export interface Location {
  id: string;
  name: string;
  emoji: string;
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