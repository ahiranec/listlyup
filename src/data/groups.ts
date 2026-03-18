/**
 * Mock Groups Data
 * Central source of truth for group information
 */

export interface Group {
  id: string;
  name: string;
  description?: string;
  memberCount?: number;
  isPrivate?: boolean;
}

/**
 * Mock groups available in the system
 */
export const mockGroups: Group[] = [
  {
    id: "group456",
    name: "Photography Enthusiasts",
    description: "A community for photography lovers",
    memberCount: 245,
    isPrivate: false,
  },
  {
    id: "group789",
    name: "Tech Traders Chile",
    description: "Buy, sell, and trade tech gadgets",
    memberCount: 512,
    isPrivate: false,
  },
  {
    id: "group1",
    name: "Tech Enthusiasts Chile",
    description: "Technology community in Chile",
    memberCount: 1024,
    isPrivate: false,
  },
  {
    id: "group2",
    name: "Vintage Marketplace",
    description: "Vintage items and collectibles",
    memberCount: 387,
    isPrivate: false,
  },
  {
    id: "group3",
    name: "Local Community V Region",
    description: "Local marketplace for Valparaíso region",
    memberCount: 892,
    isPrivate: false,
  },
];

/**
 * Helper function to get group names from group IDs
 */
export function getGroupNames(groupIds?: string[]): string[] {
  if (!groupIds || groupIds.length === 0) return [];
  
  return groupIds
    .map(id => {
      const group = mockGroups.find(g => g.id === id);
      return group?.name || null;
    })
    .filter((name): name is string => name !== null);
}

/**
 * Helper function to get a single group by ID
 */
export function getGroupById(groupId: string): Group | undefined {
  return mockGroups.find(g => g.id === groupId);
}
