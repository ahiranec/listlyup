/**
 * GroupDetailPage - Página de detalle de grupo
 * Vista adaptable según userRole y visibility del grupo
 * 
 * ARCHITECTURE (Phase 4B - Groups Alignment):
 * - Entry points (buttons) NO execute logic inline
 * - Leave Group → ConfirmActionDialog
 * - All destructive actions delegate to canonicals
 * - Consistent with Campaigns, Events, Settings, My Listings
 * 
 * VISTAS:
 * 1. Visitor en Public: Hero + Info + Products Preview + Members Preview + [Join]
 * 2. Visitor en Private: Hero limitado + Info básica + Bloqueado + [Request]
 * 3. Visitor en Ultra Private: Hero mínimo + Bloqueado + [Request Invitation]
 * 4. Pending: Banner pendiente + Vista visitor + [Cancel Request]
 * 5. Member/Mod/Admin: Hero completo + Tabs (About/Products/Members/Activity)
 */

import { useState, startTransition } from "react";
import { toast } from "sonner@2.0.3";
import { GroupHeader } from "./GroupHeader";
import { GroupHero } from "./GroupHero";
import { GroupInfoSection } from "./GroupInfoSection";
import { GroupContentSection } from "./GroupContentSection";
import { GroupMembersSection } from "./GroupMembersSection";
import { GroupActionButton } from "./GroupActionButton";
import { GroupTabs, type GroupTab } from "./GroupTabs";
import { MemberTabContent } from "./MemberTabContent";
import { BottomNav } from "../bottom-nav";
import { shareContent } from "../../utils/helpers";
import { MemberActionsSheet } from "./MemberActionsSheet";
import { InviteToGroupSheet } from "./InviteToGroupSheet";
import { PublishFloatingButton } from "./PublishFloatingButton";
import { GroupSheetsProvider } from "./GroupSheetsProvider";
import { Button } from "../ui/button";
import { canPost } from "../../lib/groupPermissions";
import type { Product } from "../../data/products"; // ✅ FIX A: Import Product type
import { ConfirmActionDialog } from "../action-center/ConfirmActionDialog"; // ✅ PHASE 4B: Canonical for destructive actions
import { useGlobalActionModal } from "../global-action-modal"; // ✅ Phase 5.1: GAM for confirmations
import { createModerationChat } from "../../data/chatMessages"; // ✅ DUAL FLOW T6: Import moderation helper
import { actionRegistry } from "../../actions/registry"; // ✅ Report Group: Action Registry for sheets
import type { CanonicalListing } from "../../types/canonical";

interface GroupDetailPageProps {
  groupId: string;
  onBack: () => void;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  initialUserRole?: "visitor" | "pending" | "member" | "moderator" | "admin";
  onNavigateToProducts?: (groupId: string) => void;
  onProductClick?: (productId: string) => void; // ✅ NEW: Fix #1 - Navigate to ProductDetail
  onViewMemberProducts?: (memberId: string) => void; // ✅ NEW: Fix #2 - Navigate to Home with group filter
  onPublishToGroup?: (groupId: string) => void; // ✅ NEW: Open PublishFlow with pre-selected group
  allProducts?: CanonicalListing[]; // ✅ CANONICAL: Receive canonical listings for filtering
  onNavigateToChat?: (chatId: string) => void; // ✅ DUAL FLOW: Navigate to moderation chat
}

// Mock data (en producción vendría del backend)
const mockGroupsData: Record<string, any> = {
  "1": {
    id: "1",
    name: "Vecinos Valparaíso",
    description: "Grupo para vecinos de Valparaíso. Comparte, vende y encuentra lo que necesitas en tu comunidad local.",
    avatarUrl: undefined,
    memberCount: 234,
    productCount: 45,
    serviceCount: 23,
    location: "Valparaíso, Chile",
    category: "Local Community",
    tags: ["neighborhood", "local", "community", "valparaiso"],
    ownerId: "user-valpo-admin", // ✅ DUAL FLOW T6: Group owner ID
    rules: [
      "Be respectful to all members",
      "No spam or excessive self-promotion",
      "Only post items related to Valparaíso area",
      "Meet in safe, public locations for transactions",
    ],
    type: "Community",
    visibility: "Public",
    joinPolicy: "Open",
    // ✅ Group Settings (defaults normales)
    whoCanPost: "members",
    whoCanInvite: "moderators",
    whoCanModerate: "moderators",
    autoApproveListings: false,
    autoApproveMembers: true, // Open group
    createdAt: new Date("2024-01-15"),
  },
  "2": {
    id: "2",
    name: "Tech Lovers Chile",
    description: "Comunidad de entusiastas de la tecnología en Chile. Comparte gadgets, software y conocimiento tech.",
    avatarUrl: undefined,
    memberCount: 1567,
    productCount: 89,
    serviceCount: 34,
    location: "Chile",
    category: "Technology",
    tags: ["tech", "gadgets", "software", "innovation"],
    rules: [
      "Keep discussions tech-related",
      "No piracy or illegal content",
      "Be helpful and respectful",
      "Share knowledge and resources",
    ],
    type: "Community",
    visibility: "Public",
    joinPolicy: "Approval",
    // ✅ Group Settings (RESTRINGIDO - para probar permisos)
    whoCanPost: "moderators", // Solo mods/admins pueden postear
    whoCanInvite: "admins",    // Solo admins pueden invitar
    whoCanModerate: "admins",  // Solo admins pueden moderar
    autoApproveListings: false,
    autoApproveMembers: false, // Requires approval
    createdAt: new Date("2024-02-10"),
  },
  "3": {
    id: "3",
    name: "Deportes Viña del Mar",
    description: "Para los amantes del deporte",
    avatarUrl: undefined,
    memberCount: 567,
    productCount: 78,
    serviceCount: 34,
    location: "Viña del Mar",
    category: "Sports",
    tags: ["sports", "fitness", "outdoor", "community"],
    rules: [
      "Respect all athletes",
      "No dangerous challenges",
      "Share fitness tips and advice",
      "Promote healthy competition",
    ],
    type: "Community",
    visibility: "Private",
    joinPolicy: "Approval",
    createdAt: new Date("2024-03-05"),
  },
  "4": {
    id: "4",
    name: "Compra/Venta Reñaca",
    description: "Marketplace local de Reñaca",
    avatarUrl: undefined,
    memberCount: 892,
    productCount: 234,
    serviceCount: 89,
    location: "Reñaca",
    category: "Marketplace",
    tags: ["marketplace", "local", "buy-sell", "renaca"],
    rules: [
      "Be honest about item conditions",
      "No scams or fraudulent listings",
      "Meet in safe, public locations",
      "Respect all community members",
    ],
    type: "Public",
    visibility: "Public",
    joinPolicy: "Open",
    createdAt: new Date("2024-04-20"),
  },
  "5": {
    id: "5",
    name: "Emprendedores Locales",
    description: "Red de apoyo para emprendedores de la región",
    avatarUrl: undefined,
    memberCount: 342,
    productCount: 156,
    serviceCount: 89,
    location: "Región de Valparaíso",
    category: "Business",
    tags: ["business", "entrepreneurs", "networking"],
    rules: [
      "Support local businesses",
      "No MLM schemes",
      "Constructive feedback only",
    ],
    type: "Private",
    visibility: "Private",
    joinPolicy: "Invite",
    createdAt: new Date("2024-05-15"),
  },
  "6": {
    id: "6",
    name: "Fitness Concon",
    description: "Grupo de entrenamiento y vida saludable",
    avatarUrl: undefined,
    memberCount: 178,
    productCount: 34,
    serviceCount: 28,
    location: "Concón",
    category: "Health & Fitness",
    tags: ["fitness", "health", "wellness"],
    rules: [
      "Promote healthy habits",
      "No body shaming",
      "Share workout tips",
    ],
    type: "Community",
    visibility: "Public",
    joinPolicy: "Open",
    createdAt: new Date("2024-06-01"),
  },
  "e1": {
    id: "e1",
    name: "Emprendedores Valparaíso",
    description: "Grupo para emprendedores locales que quieren crecer juntos",
    avatarUrl: undefined,
    memberCount: 432,
    productCount: 89,
    serviceCount: 124,
    location: "Valparaíso, Chile",
    category: "Business",
    tags: ["business", "entrepreneurs", "networking", "valparaiso"],
    rules: [
      "Support local businesses",
      "Share opportunities and resources",
      "No MLM or pyramid schemes",
      "Be respectful and constructive",
    ],
    type: "Community",
    visibility: "Public",
    joinPolicy: "Open",
    createdAt: new Date("2024-07-10"),
  },
  "e2": {
    id: "e2",
    name: "Deportes Extremos Chile",
    description: "Para los amantes de la adrenalina y deportes extremos",
    avatarUrl: undefined,
    memberCount: 1205,
    productCount: 234,
    serviceCount: 56,
    location: "Viña del Mar, Chile",
    category: "Sports",
    tags: ["extreme-sports", "adventure", "adrenaline", "outdoor"],
    rules: [
      "Safety first - always share safety tips",
      "Share your adventures and experiences",
      "Respect the environment",
      "No reckless behavior promotion",
    ],
    type: "Community",
    visibility: "Public",
    joinPolicy: "Open",
    createdAt: new Date("2024-08-15"),
  },
  "e3": {
    id: "e3",
    name: "Artesanos Locales Premium",
    description: "Comunidad exclusiva de artesanos y creadores",
    avatarUrl: undefined,
    memberCount: 567,
    productCount: 456,
    serviceCount: 89,
    location: "Valparaíso, Chile",
    category: "Arts & Crafts",
    tags: ["artisan", "crafts", "handmade", "local"],
    rules: [
      "Only handmade/artisan products",
      "Original work only - no reselling",
      "Support fellow artisans",
      "Quality over quantity",
    ],
    type: "Private",
    visibility: "Private",
    joinPolicy: "Invite",
    createdAt: new Date("2024-09-01"),
  },
};

// ❌ REMOVED: mockProducts (unused - now using allProducts prop filtered by groupId)

const mockMembers = [
  {
    id: "m1",
    name: "María González",
    username: "mariag",
    avatarUrl: undefined,
    role: "admin" as const,
    joinedAt: new Date("2024-01-15"),
  },
  {
    id: "m2",
    name: "Juan Pérez",
    username: "juanp",
    avatarUrl: undefined,
    role: "moderator" as const,
    joinedAt: new Date("2024-02-20"),
  },
  {
    id: "m3",
    name: "Carlos Silva",
    username: "carlosilva",
    avatarUrl: undefined,
    role: "member" as const,
    joinedAt: new Date("2024-03-10"),
  },
  {
    id: "m4",
    name: "Ana Martínez",
    username: "anamartinez",
    avatarUrl: undefined,
    role: "member" as const,
    joinedAt: new Date("2024-04-05"),
  },
  {
    id: "m5",
    name: "Pedro López",
    username: "pedrol",
    avatarUrl: undefined,
    role: "member" as const,
    joinedAt: new Date("2024-05-12"),
  },
];

const mockActivities = [
  {
    id: "a1",
    type: "product_added" as const,
    user: { name: "María González", avatarUrl: undefined },
    content: "shared a new product",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
  },
  {
    id: "a2",
    type: "member_joined" as const,
    user: { name: "Carlos Silva", avatarUrl: undefined },
    content: "joined the group",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2h ago
  },
  {
    id: "a3",
    type: "comment" as const,
    user: { name: "Juan Pérez", avatarUrl: undefined },
    content: "commented on a product",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5h ago
  },
];

export function GroupDetailPage({
  groupId,
  onBack,
  activeTab = "home",
  onTabChange,
  initialUserRole,
  onNavigateToProducts,
  onProductClick,
  onViewMemberProducts,
  onPublishToGroup,
  allProducts = [], // ✅ CANONICAL: Default empty array
  onNavigateToChat, // ✅ DUAL FLOW: Chat navigation handler
}: GroupDetailPageProps) {
  // ✅ Phase 5.1: Global Action Modal for confirmations
  const { dispatch } = useGlobalActionModal();
  
  // Simulación de userRole - en producción vendría del backend
  // Cambiar este valor para probar diferentes vistas:
  // "visitor" | "pending" | "member" | "moderator" | "admin"
  const [userRole, setUserRole] = useState<
    "visitor" | "pending" | "member" | "moderator" | "admin"
  >(initialUserRole || "visitor");

  const [memberTab, setMemberTab] = useState<GroupTab>("about");
  const [isLoading, setIsLoading] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  // Estados para Member Actions
  const [isMemberActionsOpen, setIsMemberActionsOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<typeof mockMembers[0] | null>(null);
  const [isInviteToGroupOpen, setIsInviteToGroupOpen] = useState(false);

  // ✅ Phase 5.1: Confirm Dialog State removed - now handled by GAM

  const group = mockGroupsData[groupId];
  
  // ✅ CANONICAL: Receive already-filtered listings from parent
  // Group filtering happens in App.tsx based on external group membership data
  // Do NOT use groupIds as canonical field on listings
  
  // Handle invalid group ID
  if (!group) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Group Not Found</h2>
          <p className="text-muted-foreground mb-4">The group you're looking for doesn't exist.</p>
          <Button onClick={onBack}>Go Back</Button>
        </div>
      </div>
    );
  }
  
  const isMember = ["member", "moderator", "admin"].includes(userRole);
  const isPending = userRole === "pending";
  const canViewContent = isMember || group.groupType === "public";
  const canManage = ["moderator", "admin"].includes(userRole);

  // Mock: Grupos donde el usuario es admin/moderator (para invitar a otros grupos)
  const userAdminGroups = [
    { id: "2", name: "Tech Lovers Chile", memberCount: 1567 },
    { id: "4", name: "Compra/Venta Reñaca", memberCount: 892 },
    { id: "6", name: "Fitness Concon", memberCount: 178 },
  ].filter((g) => g.id !== groupId); // Excluir el grupo actual

  // Handlers
  const handleShare = async () => {
    try {
      const result = await shareContent({
        title: group.name,
        text: `Check out ${group.name} on ListlyUp!`,
        url: window.location.href,
      });

      if (result.success) {
        if (result.method === "clipboard" || result.method === "manual") {
          toast.success("Link copied to clipboard!");
        } else if (result.method === "native") {
          toast.success("Shared successfully!");
        }
      } else {
        toast.error("Failed to share");
      }
    } catch (error) {
      console.error("Share error:", error);
      toast.error("Failed to share");
    }
  };

  const handleJoin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setUserRole("member");
      setIsLoading(false);
      toast.success(`You joined ${group.name}!`);
    }, 1000);
  };

  const handleRequestJoin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setUserRole("pending");
      setIsLoading(false);
      toast.success("Request sent! Group admins will review it soon.");
    }, 1000);
  };

  const handleCancelRequest = () => {
    setIsLoading(true);
    setTimeout(() => {
      setUserRole("visitor");
      setIsLoading(false);
      toast.info("Request cancelled");
    }, 1000);
  };

  const handleLeave = () => {
    // ✅ Phase 5.1: Migrated to GAM
    dispatch({
      actionId: 'leave-group',
      context: {
        groupName: group.name,
      },
      onConfirm: () => {
        setUserRole("visitor");
        toast.info(`You left ${group.name}`);
      },
    });
  };

  const handleReport = () => {
    // ✅ Call action handler to open Report Group sheet
    const action = actionRegistry['report-group'];
    if (action?.handler) {
      action.handler({
        id: group.id,
        name: group.name,
        type: 'group',
      });
    }
  };

  const handleManageGroup = () => {
    // Navigate to Pending tab for moderation
    setMemberTab('pending');
  };

  const handleSettings = () => {
    // Navigate to Settings tab for configuration
    setMemberTab('settings');
  };

  const handlePin = () => {
    // TODO: Backend integration
    toast.success(`Group ${isPinned ? 'unpinned' : 'pinned'}`);
    setIsPinned(!isPinned);
  };

  const handleMute = () => {
    // TODO: Backend integration
    toast.success(`Group ${isMuted ? 'unmuted' : 'muted'}`);
    setIsMuted(!isMuted);
  };

  const handleOpenModeration = () => {
    // ✅ DUAL FLOW T6: Create moderation chat with group owner
    if (!onNavigateToChat) {
      toast.error('Chat navigation not available');
      return;
    }
    
    const ownerId = group.ownerId || 'group-owner-' + groupId;
    const chatId = createModerationChat(ownerId);
    onNavigateToChat(chatId);
  };

  const handleProductClick = (productId: string) => {
    if (onProductClick) {
      onProductClick(productId);
    } else {
      toast.info(`Product ${productId} clicked - navigate to product detail`);
    }
  };

  const handleMemberClick = (memberId: string) => {
    const member = mockMembers.find((m) => m.id === memberId);
    if (member) {
      setSelectedMember(member);
      setIsMemberActionsOpen(true);
    }
  };

  const handleViewAllProducts = () => {
    setMemberTab("products");
    if (onNavigateToProducts) {
      onNavigateToProducts(groupId);
    }
  };

  const handleViewAllMembers = () => {
    setMemberTab("members");
  };

  // Handler para cambio de tab
  const handleTabChange = (tab: GroupTab) => {
    setMemberTab(tab);
  };

  return (
    <div className="min-h-screen bg-background max-w-[480px] lg:max-w-[1280px] mx-auto">
      {/* Header */}
      <GroupHeader
        groupName={group.name}
        groupId={groupId}
        userRole={userRole}
        groupVisibility={group.groupType}
        isPinned={isPinned}
        isMuted={isMuted}
        onBack={onBack}
        onShare={handleShare}
        onPin={isMember ? handlePin : undefined}
        onMute={isMember ? handleMute : undefined}
        onSettings={userRole === "admin" ? handleSettings : undefined}
        onLeave={isMember ? handleLeave : undefined}
        onReport={handleReport}
        group={group} // ✅ Pasar group para evaluar permisos
        onOpenModeration={handleOpenModeration} // ✅ DUAL FLOW T6
      />

      {/* Hero Section */}
      <GroupHero
        group={group}
        userRole={userRole}
        visibility={group.visibility}
        joinPolicy={group.joinPolicy}
        isMemberView={isMember}
      />

      {/* UNIFIED VIEW: Tabs para todos (members y visitors) */}
      <GroupTabs
        activeTab={memberTab}
        onTabChange={handleTabChange}
        userRole={userRole} // ✅ Pasar userRole para visibilidad condicional
        group={group} // ✅ Pasar group para evaluar permisos
      />
      <MemberTabContent
        activeTab={memberTab}
        group={group}
        products={allProducts} // ✅ CANONICAL: Pass received listings directly
        members={mockMembers}
        activities={mockActivities}
        userRole={userRole}
        onProductClick={handleProductClick}
        onMemberClick={handleMemberClick}
        onTabChange={setMemberTab} // ✅ Pasar callback para cambiar tab
        onNavigateToChat={onNavigateToChat} // ✅ DUAL FLOW: Navigate to moderation chat
      />

      {/* Action Button (only for visitors/pending) */}
      <GroupActionButton
        userRole={userRole}
        visibility={group.visibility}
        joinPolicy={group.joinPolicy}
        onJoin={handleJoin}
        onRequestJoin={handleRequestJoin}
        onCancelRequest={handleCancelRequest}
        isLoading={isLoading}
      />

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />

      {/* Member Actions Sheet */}
      <MemberActionsSheet
        open={isMemberActionsOpen}
        onOpenChange={setIsMemberActionsOpen}
        member={selectedMember}
        currentUserRole={userRole}
        userAdminGroups={userAdminGroups}
        onViewProfile={(memberId) => {
          toast.info(`Viewing profile of member ${memberId} - to be implemented`);
        }}
        onViewProducts={(memberId) => {
          if (onViewMemberProducts) {
            onViewMemberProducts(memberId);
          } else {
            toast.info(`Viewing products of member ${memberId} in this group`);
          }
        }}
        onInviteToGroup={(memberId) => {
          setIsMemberActionsOpen(false);
          setIsInviteToGroupOpen(true);
        }}
        onReportUser={(memberId) => {
          toast.info(`Reporting member ${memberId} - to be implemented`);
        }}
      />
      
      {/* Invite to Group Sheet */}
      <InviteToGroupSheet
        open={isInviteToGroupOpen}
        onOpenChange={setIsInviteToGroupOpen}
        member={selectedMember}
        availableGroups={userAdminGroups}
        onSendInvite={(memberId, groupIds) => {
          toast.success(
            `Sent invitation to ${selectedMember?.name} for ${groupIds.length} group${groupIds.length > 1 ? "s" : ""}`
          );
        }}
      />
      
      {/* Publish Floating Button (only for members/mods/admins who can post) */}
      {canPost(userRole, group) && (
        <PublishFloatingButton
          onClick={() => {
            if (onPublishToGroup) {
              onPublishToGroup(groupId);
            } else {
              toast.info(`Publishing to group ${groupId} - to be implemented`);
            }
          }}
        />
      )}
      
      {/* Global Sheets Provider */}
      <GroupSheetsProvider />
      
      {/* ✅ Phase 5.1: Confirm Dialog removed - now handled by GAM Provider */}
    </div>
  );
}

export default GroupDetailPage;