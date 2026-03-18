/**
 * Mock Action Items Data
 * Centralized data for Action Center with proper TypeScript types
 * 
 * Moved from /components/action-center/mockActionItems.ts to /data/ (FASE 2 - Refactorización)
 * 
 * Architecture:
 * - Personal tasks (messages, questions, trades, listing actions, performance, activity)
 * - Groups tasks (join requests, reports, pending approvals, admin messages)
 * - Admin tasks (platform reports, flagged listings, user issues)
 */

export type ContextType = 'personal' | 'groups' | 'admin';
export type UserRole = 'user' | 'group-admin' | 'group-moderator' | 'platform-admin' | 'platform-moderator';

// ==================== PERSONAL CONTEXT ====================

export interface MessageAction {
  id: string;
  type: 'message';
  from: string;
  message: string;
  listing: string;
  time: string;
  unread: boolean;
  avatarUrl?: string;
}

export interface QuestionAction {
  id: string;
  type: 'question';
  question: string;
  askedBy: string;
  listing: string;
  time: string;
  waiting?: number;
  avatarUrl?: string;
}

export interface TradeOfferAction {
  id: string;
  type: 'trade-offer';
  from: string;
  offering: string;
  additionalCash?: string;
  forListing: string;
  time: string;
}

export interface ListingAction {
  id: string;
  type: 'listing-action';
  status: 'draft' | 'expiring' | 'paused' | 'pending' | 'rejected' | 'reported';
  title: string;
  subtitle: string;
  badge: string;
  badgeVariant: 'default' | 'destructive' | 'secondary';
}

export interface PerformanceAction {
  id: string;
  type: 'performance';
  performanceType: 'low-views' | 'high-views-no-messages';
  title: string;
  metric: string;
  subtitle?: string;
  suggestion?: string;
  badge: string;
}

export interface ActivityAction {
  id: string;
  type: 'activity';
  activityType: 'favorites' | 'shares' | 'profile-views';
  count: number;
  listing?: string;
  time: string;
}

// ==================== GROUPS CONTEXT ====================

export interface JoinRequestAction {
  id: string;
  type: 'join-request';
  user: string;
  group: string;
  message: string;
  time: string;
  role: string;
}

export interface ReportAction {
  id: string;
  type: 'report';
  reportType: string;
  reported: string;
  by: string;
  group: string;
  priority: 'High' | 'Medium' | 'Low';
  time: string;
  role: string;
}

// ==================== ADMIN CONTEXT ====================

export interface PlatformReportAction {
  id: string;
  type: 'platform-report';
  reportType: string;
  reported: string;
  reportedBy: string;
  location?: string;
  priority: 'High' | 'Medium' | 'Low';
  time: string;
  status: 'pending' | 'reviewed' | 'resolved';
}

export interface FlaggedListingAction {
  id: string;
  type: 'flagged-listing';
  listing: string;
  reason: string;
  flaggedBy: 'AI' | 'User Report';
  confidence?: string;
  severity: 'High' | 'Medium' | 'Low';
  time: string;
}

export interface UserIssueAction {
  id: string;
  type: 'user-issue';
  issueType: 'verification' | 'appeal' | 'account-access' | 'dispute';
  user: string;
  subject: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  time: string;
}

// ==================== MOCK DATA ====================

export const mockMessages: MessageAction[] = [
  // 🆕 Ana - Lámpara (SINCRONIZADO con product-ana-1)
  {
    id: 'product-ana-1',
    type: 'message',
    from: 'Pedro López',
    message: '¿Está disponible aún?',
    listing: 'Lámpara de Escritorio',
    time: '3h ago',
    unread: true,
  },
  // 🆕 Carlos - iPhone (SINCRONIZADO con product-carlos-1)
  {
    id: 'product-carlos-1',
    type: 'message',
    from: 'Ana Rodríguez',
    message: '¿Aceptas $800?',
    listing: 'iPhone 14 Pro',
    time: '1h ago',
    unread: true,
  },
  // 🆕 María - Cartera (SINCRONIZADO con product-maria-2)
  {
    id: 'product-maria-2',
    type: 'message',
    from: 'Pablo Ruiz',
    message: '¿Aceptas $100?',
    listing: 'Cartera Diseñador',
    time: '2h ago',
    unread: true,
  },
  // 🆕 María - Canon (read) (SINCRONIZADO con product-maria-3)
  {
    id: 'product-maria-3',
    type: 'message',
    from: 'Sofía Martínez',
    message: '¿Incluye accesorios?',
    listing: 'Canon EOS R5',
    time: '1d ago',
    unread: false,
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
  },
  // Existentes (otros usuarios)
  {
    id: 'chat-1',
    type: 'message',
    from: 'María González',
    message: 'Would you accept $1,700?',
    listing: 'MacBook Pro 16"',
    time: '2h ago',
    unread: true,
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
  },
  {
    id: 'chat-2',
    type: 'message',
    from: 'Carlos Ruiz',
    message: 'Can you meet at Starbucks on Main St?',
    listing: 'Mountain Bike',
    time: '5h ago',
    unread: true,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
  },
];

export const mockQuestions: QuestionAction[] = [
  {
    id: 'q-1',
    type: 'question',
    question: 'Does it come with the charger and original box?',
    askedBy: '@tech_buyer',
    listing: 'MacBook Pro M1',
    time: '5h ago',
    waiting: 3,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
  },
  {
    id: 'q-2',
    type: 'question',
    question: 'Can you ship to Santiago?',
    askedBy: '@maria_s',
    listing: 'Vintage Camera',
    time: '1d ago',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
  },
];

export const mockTradeOffers: TradeOfferAction[] = [
  {
    id: 'trade-1',
    type: 'trade-offer',
    from: '@maria_g',
    offering: 'iPad Pro 11" 2021',
    additionalCash: '+ $50',
    forListing: 'Vintage Camera',
    time: '1d ago',
  },
  {
    id: 'trade-2',
    type: 'trade-offer',
    from: '@carlos_tech',
    offering: 'Gaming Headset + Mouse',
    forListing: 'MacBook Pro M1',
    time: '2d ago',
  },
];

export const mockListingActions: ListingAction[] = [
  // Draft - Carlos (SINCRONIZADO con product-carlos-draft)
  {
    id: 'product-carlos-draft',
    type: 'listing-action',
    status: 'draft',
    title: 'Samsung Galaxy S23',
    subtitle: 'Saved 1 day ago',
    badge: 'DRAFT',
    badgeVariant: 'secondary',
  },
  // 🆕 Expiring - Carlos - MacBook (URGENT - 2 days) (SINCRONIZADO con product-carlos-2)
  {
    id: 'product-carlos-2',
    type: 'listing-action',
    status: 'expiring',
    title: 'MacBook Air M2',
    subtitle: '45 views · 3 favorites',
    badge: 'EXPIRES IN 2 DAYS',
    badgeVariant: 'destructive',
  },
  // 🆕 Expiring - Ana - Libros (5 days) (SINCRONIZADO con product-ana-2)
  {
    id: 'product-ana-2',
    type: 'listing-action',
    status: 'expiring',
    title: 'Libros Universitarios',
    subtitle: '23 views · 1 favorite',
    badge: 'EXPIRES IN 5 DAYS',
    badgeVariant: 'destructive',
  },
  // 🆕 Expiring - María - Departamento (4 days) (SINCRONIZADO con product-maria-4)
  {
    id: 'product-maria-4',
    type: 'listing-action',
    status: 'expiring',
    title: 'Arriendo Departamento',
    subtitle: '156 views · 12 favorites',
    badge: 'EXPIRES IN 4 DAYS',
    badgeVariant: 'destructive',
  },
  // 🆕 Expiring - Carlos - Cámara (6 days) (SINCRONIZADO con product-carlos-3)
  {
    id: 'product-carlos-3',
    type: 'listing-action',
    status: 'expiring',
    title: 'Cámara Vintage Olympus',
    subtitle: '89 views · 7 favorites',
    badge: 'EXPIRES IN 6 DAYS',
    badgeVariant: 'secondary',
  },
  // 🆕 REPORTED - María - Workshop (SINCRONIZADO con product-maria-5)
  {
    id: 'product-maria-5',
    type: 'listing-action',
    status: 'reported',
    title: 'Workshop Fotografía',
    subtitle: 'Reported 1d ago · Spam - duplicate posting',
    badge: 'REPORTED',
    badgeVariant: 'destructive',
  },
  // Paused - María (SINCRONIZADO con product-maria-paused)
  {
    id: 'product-maria-paused',
    type: 'listing-action',
    status: 'paused',
    title: 'Sesiones Fotográficas',
    subtitle: 'Paused 6 days ago',
    badge: 'PAUSED',
    badgeVariant: 'secondary',
  },
  // Pending - María (SINCRONIZADO con product-maria-pending)
  {
    id: 'product-maria-pending',
    type: 'listing-action',
    status: 'pending',
    title: 'Tour Gastronómico',
    subtitle: 'Waiting approval: Foodies Valpo · 10h ago',
    badge: 'PENDING',
    badgeVariant: 'secondary',
  },
];

export const mockPerformance: PerformanceAction[] = [
  {
    id: 'perf-1',
    type: 'performance',
    performanceType: 'low-views',
    title: 'Laptop Gaming MSI',
    metric: 'Only 12 views in 5 days',
    badge: 'LOW VIEWS',
  },
  {
    id: 'perf-2',
    type: 'performance',
    performanceType: 'high-views-no-messages',
    title: 'MacBook Pro M1',
    metric: '234 views · 0 messages',
    subtitle: 'Price might be high ($1,200)',
    suggestion: '💡 Similar listings: $800-$900',
    badge: '234 VIEWS',
  },
];

export const mockActivity: ActivityAction[] = [
  {
    id: 'act-1',
    type: 'activity',
    activityType: 'favorites',
    count: 5,
    listing: 'Vintage Camera',
    time: '12h ago',
  },
  {
    id: 'act-2',
    type: 'activity',
    activityType: 'shares',
    count: 8,
    listing: 'Tour Gastronómico',
    time: '1d ago',
  },
  {
    id: 'act-3',
    type: 'activity',
    activityType: 'profile-views',
    count: 23,
    time: 'Last 24h',
  },
];

export const mockJoinRequests: JoinRequestAction[] = [
  {
    id: 'join-1',
    type: 'join-request',
    user: '@maria_silva',
    group: 'Tech Lovers Chile',
    message: "I'm a software developer interested in tech discussions...",
    time: '3d ago',
    role: 'Admin',
  },
  {
    id: 'join-2',
    type: 'join-request',
    user: '@juan_dev',
    group: 'Vecinos Valparaíso',
    message: 'I live in Cerro Alegre and want to connect with neighbors',
    time: '5d ago',
    role: 'Admin',
  },
];

export const mockReports: ReportAction[] = [
  {
    id: 'rep-1',
    type: 'report',
    reportType: 'Spam/Scam',
    reported: 'iPhone 14 listing',
    by: '@user123',
    group: 'Tech Lovers Chile',
    priority: 'High',
    time: '2h ago',
    role: 'Group Admin',
  },
  {
    id: 'rep-2',
    type: 'report',
    reportType: 'Inappropriate Content',
    reported: 'Comment on Yoga Classes',
    by: '@concerned_user',
    group: 'Vecinos Valparaíso',
    priority: 'Medium',
    time: '1d ago',
    role: 'Group Admin',
  },
];

export const mockPlatformReports: PlatformReportAction[] = [
  {
    id: 'platrep-1',
    type: 'platform-report',
    reportType: 'Spam/Scam',
    reported: 'iPhone 14 listing by @suspect_user',
    reportedBy: '@user123',
    location: 'Tech Lovers Chile',
    priority: 'High',
    time: '2h ago',
    status: 'pending',
  },
  {
    id: 'platrep-2',
    type: 'platform-report',
    reportType: 'Inappropriate Content',
    reported: 'Comment on Yoga Classes post',
    reportedBy: '@concerned_user',
    location: 'Vecinos Valparaíso',
    priority: 'Medium',
    time: '5h ago',
    status: 'reviewed',
  },
  {
    id: 'platrep-3',
    type: 'platform-report',
    reportType: 'Fake Profile',
    reported: 'User @fake_seller',
    reportedBy: '@verified_buyer',
    location: 'Marketplace General',
    priority: 'High',
    time: '8h ago',
    status: 'pending',
  },
  {
    id: 'platrep-4',
    type: 'platform-report',
    reportType: 'Price Gouging',
    reported: 'PS5 listing - $2,500',
    reportedBy: '@fair_trade',
    location: 'Gaming Community',
    priority: 'Low',
    time: '12h ago',
    status: 'reviewed',
  },
  {
    id: 'platrep-5',
    type: 'platform-report',
    reportType: 'Harassment',
    reported: 'Messages from @toxic_user',
    reportedBy: '@victim_user',
    priority: 'High',
    time: '1d ago',
    status: 'pending',
  },
  {
    id: 'platrep-6',
    type: 'platform-report',
    reportType: 'Copyright Violation',
    reported: 'Logo use in listing photos',
    reportedBy: '@brand_owner',
    location: 'Fashion Group',
    priority: 'Medium',
    time: '1d ago',
    status: 'pending',
  },
  {
    id: 'platrep-7',
    type: 'platform-report',
    reportType: 'Spam/Scam',
    reported: 'MacBook listing - too good to be true',
    reportedBy: '@smart_buyer',
    location: 'Tech Lovers Chile',
    priority: 'High',
    time: '2d ago',
    status: 'resolved',
  },
  {
    id: 'platrep-8',
    type: 'platform-report',
    reportType: 'Duplicate Listing',
    reported: 'Same bike posted 5 times',
    reportedBy: '@community_mod',
    location: 'Sports & Outdoors',
    priority: 'Low',
    time: '2d ago',
    status: 'reviewed',
  },
  {
    id: 'platrep-9',
    type: 'platform-report',
    reportType: 'Inappropriate Content',
    reported: 'Adult content in listing photos',
    reportedBy: '@parent_user',
    location: 'General Marketplace',
    priority: 'High',
    time: '3d ago',
    status: 'resolved',
  },
  {
    id: 'platrep-10',
    type: 'platform-report',
    reportType: 'Fake Reviews',
    reported: 'Seller has suspicious 5-star reviews',
    reportedBy: '@detective_buyer',
    location: 'Services',
    priority: 'Medium',
    time: '3d ago',
    status: 'pending',
  },
  {
    id: 'platrep-11',
    type: 'platform-report',
    reportType: 'Prohibited Item',
    reported: 'Weapons listing',
    reportedBy: '@safety_first',
    priority: 'High',
    time: '4d ago',
    status: 'resolved',
  },
  {
    id: 'platrep-12',
    type: 'platform-report',
    reportType: 'Misleading Description',
    reported: 'Camera listing - not as described',
    reportedBy: '@disappointed_buyer',
    location: 'Photography Group',
    priority: 'Low',
    time: '4d ago',
    status: 'reviewed',
  },
  {
    id: 'platrep-13',
    type: 'platform-report',
    reportType: 'Spam/Scam',
    reported: 'Concert tickets - fake seller',
    reportedBy: '@music_fan',
    location: 'Events & Tickets',
    priority: 'High',
    time: '5d ago',
    status: 'pending',
  },
  {
    id: 'platrep-14',
    type: 'platform-report',
    reportType: 'Underage User',
    reported: 'User appears to be under 13',
    reportedBy: '@concerned_admin',
    priority: 'Medium',
    time: '5d ago',
    status: 'pending',
  },
  {
    id: 'platrep-15',
    type: 'platform-report',
    reportType: 'Hate Speech',
    reported: 'Comment with discriminatory language',
    reportedBy: '@community_member',
    location: 'Vecinos Valparaíso',
    priority: 'High',
    time: '6d ago',
    status: 'resolved',
  },
];

export const mockFlaggedListings: FlaggedListingAction[] = [
  {
    id: 'flag-1',
    type: 'flagged-listing',
    listing: 'iPhone 14 Pro Max - $50 URGENT SALE',
    reason: 'Suspicious pricing (96% below market)',
    flaggedBy: 'AI',
    confidence: '98% confidence',
    severity: 'High',
    time: '2h ago',
  },
  {
    id: 'flag-2',
    type: 'flagged-listing',
    listing: 'Rolex Watch Replica',
    reason: 'Prohibited item - counterfeit goods',
    flaggedBy: 'AI',
    confidence: '95% confidence',
    severity: 'High',
    time: '8h ago',
  },
  {
    id: 'flag-3',
    type: 'flagged-listing',
    listing: 'Vintage Camera Collection',
    reason: 'Inappropriate content detected in images',
    flaggedBy: 'User Report',
    severity: 'Medium',
    time: '1d ago',
  },
  {
    id: 'flag-4',
    type: 'flagged-listing',
    listing: 'Weight Loss Pills - Guaranteed Results!!!',
    reason: 'Prohibited medical claims + spam keywords',
    flaggedBy: 'AI',
    confidence: '92% confidence',
    severity: 'High',
    time: '2d ago',
  },
  {
    id: 'flag-5',
    type: 'flagged-listing',
    listing: 'Gaming PC Setup',
    reason: 'Duplicate listing (posted 8 times)',
    flaggedBy: 'AI',
    confidence: '100% match',
    severity: 'Low',
    time: '3d ago',
  },
  {
    id: 'flag-6',
    type: 'flagged-listing',
    listing: 'Work From Home Opportunity',
    reason: 'Pyramid scheme keywords detected',
    flaggedBy: 'AI',
    confidence: '89% confidence',
    severity: 'Medium',
    time: '4d ago',
  },
];

export const mockUserIssues: UserIssueAction[] = [
  {
    id: 'issue-1',
    type: 'user-issue',
    issueType: 'verification',
    user: '@maria_silva',
    subject: 'ID Verification Rejected - Request Review',
    description: 'User claims ID photo was clear but got rejected by automated system. Requesting manual review.',
    priority: 'High',
    time: '3h ago',
  },
  {
    id: 'issue-2',
    type: 'user-issue',
    issueType: 'appeal',
    user: '@carlos_merchant',
    subject: 'Account Suspension Appeal',
    description: 'Account suspended for "suspicious activity". User claims they were traveling and logging in from different locations.',
    priority: 'High',
    time: '1d ago',
  },
  {
    id: 'issue-3',
    type: 'user-issue',
    issueType: 'dispute',
    user: '@buyer_laura',
    subject: 'Payment Dispute - Item Not Received',
    description: 'Paid $450 for laptop. Seller claims it was shipped but buyer never received. No tracking provided.',
    priority: 'Medium',
    time: '2d ago',
  },
];

// ==================== COUNTS ====================

export interface ActionCounts {
  personal: {
    messages: number;
    questions: number;
    tradeOffers: number;
    listingActions: number;
    performance: number;
    activity: number;
  };
  groups: {
    joinRequests: number;
    reports: number;
    pendingApprovals: number;
    adminMessages: number;
  };
  admin: {
    allReports: number;
    flaggedListings: number;
    userIssues: number;
  };
}

export const mockCounts: ActionCounts = {
  personal: {
    messages: mockMessages.filter(m => m.unread).length,
    questions: mockQuestions.length,
    tradeOffers: mockTradeOffers.length,
    listingActions: mockListingActions.length,
    performance: mockPerformance.length,
    activity: mockActivity.length,
  },
  groups: {
    joinRequests: mockJoinRequests.length,
    reports: mockReports.length,
    pendingApprovals: 2,
    adminMessages: 4,
  },
  admin: {
    allReports: mockPlatformReports.length,
    flaggedListings: mockFlaggedListings.length,
    userIssues: mockUserIssues.length,
  },
};

// ==================== HELPERS ====================

export function getTotalCount(context: ContextType, counts: ActionCounts): number {
  if (context === 'personal') {
    return Object.values(counts.personal).reduce((a, b) => a + b, 0);
  } else if (context === 'groups') {
    return Object.values(counts.groups).reduce((a, b) => a + b, 0);
  } else {
    return Object.values(counts.admin).reduce((a, b) => a + b, 0);
  }
}

export function canAccessGroups(userRole: UserRole): boolean {
  return ['group-admin', 'group-moderator', 'platform-admin', 'platform-moderator'].includes(userRole);
}

export function canAccessAdmin(userRole: UserRole): boolean {
  return ['platform-admin', 'platform-moderator'].includes(userRole);
}