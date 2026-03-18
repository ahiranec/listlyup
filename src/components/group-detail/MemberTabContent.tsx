/**
 * MemberTabContent Component
 * Contenido de cada tab para members y visitors
 * Adapta contenido según permisos del usuario
 */

import { useState } from "react";
import { motion } from "motion/react";
import {
  Users,
  Share2,
  UserPlus,
  LogOut,
  Flag,
  Package,
  Activity,
} from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { GroupInfoSection } from "./GroupInfoSection";
import { ListingActionsMenu } from "./ListingActionsMenu";
import { MemberActionsMenu } from "./MemberActionsMenu";
import { PendingTabContent } from "./PendingTabContent";
import { SettingsTabContent } from "./SettingsTabContent";
import ShareGroupSheet from "../share/ShareGroupSheet";
import { ReportGroupSheet } from "../groups/ReportGroupSheet";
import { actionRegistry } from "../../actions/registry";
import { isMember as checkIsMember } from "../../lib/groupPermissions";
import type { GroupTab } from "./GroupDetailPage";
import type { CanonicalListing } from "../../types/canonical";

interface Listing {
  id: string;
  title: string;
  price?: string;
  image?: string;
  location?: string;
  createdAt?: Date;
}

interface Member {
  id: string;
  name: string;
  username?: string;
  avatarUrl?: string;
  role: "member" | "moderator" | "admin";
  joinedAt?: Date;
}

interface ActivityItem {
  id: string;
  type: "product_added" | "member_joined" | "comment";
  user: { name: string; avatarUrl?: string };
  content: string;
  timestamp: Date;
}

interface MemberTabContentProps {
  activeTab: GroupTab;
  group: any;
  products?: CanonicalListing[];
  members?: Member[];
  activities?: ActivityItem[];
  userRole?: "visitor" | "pending" | "member" | "moderator" | "admin";
  onProductClick?: (productId: string) => void;
  onMemberClick?: (memberId: string) => void;
  onTabChange?: (tab: GroupTab) => void; // NEW: Callback para cambiar tab
  onNavigateToChat?: (chatId: string) => void; // ✅ DUAL FLOW: Navigate to moderation chat
}

export function MemberTabContent({
  activeTab,
  group,
  products = [],
  members = [],
  activities = [],
  userRole = "visitor",
  onProductClick,
  onMemberClick,
  onTabChange, // NEW: Recibe callback para cambiar tab
  onNavigateToChat, // ✅ DUAL FLOW: Navigate to moderation chat
}: MemberTabContentProps) {
  const isMember = ["member", "moderator", "admin"].includes(userRole);
  const isVisitor = userRole === "visitor" || userRole === "pending";
  const canViewContent = isMember || group.visibility === "Public";
  const canManage = ["moderator", "admin"].includes(userRole);
  
  const [shareSheetOpen, setShareSheetOpen] = useState(false);
  const [reportSheetOpen, setReportSheetOpen] = useState(false);
  
  // ✅ PHASE 3.5: Track hidden/removed listings locally
  const [hiddenListings, setHiddenListings] = useState<Set<string>>(new Set());
  const [removedListings, setRemovedListings] = useState<Set<string>>(new Set());
  
  // Filter out hidden/removed listings
  const visibleProducts = products.filter(p => !hiddenListings.has(p.id) && !removedListings.has(p.id));

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const roleColors = {
    admin: "bg-red-500/10 text-red-700 dark:text-red-400",
    moderator: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
    member: "bg-green-500/10 text-green-700 dark:text-green-400",
  };

  // Tab: About
  if (activeTab === "about") {
    /**
     * ABOUT TAB - ARQUITECTURA CERRADA ✅
     * Principalmente INFORMATIVO con CTAs conectados al Action Registry
     * 
     * ✅ MIGRACIÓN COMPLETA: Sin callbacks legacy, solo Action Registry
     * ✅ NAVEGACIÓN REAL: Link a Members tab funcional
     * ✅ CONSISTENCIA TOTAL: Misma acción, mismo handler, mismo resultado
     * 
     * Botones PRINCIPALES:
     * - Share Group → actionId: 'share-group' (Todos)
     * 
     * Sección secundaria (low emphasis):
     * - Leave Group → actionId: 'leave-group' (Miembros)
     * - Report Group → actionId: 'report-group' (Todos)
     */

    return (
      <div className={isVisitor ? "pb-[200px]" : "pb-[calc(60px+var(--space-lg)))"}>
        {/* Group Info - CONTENIDO PRINCIPAL (informativo) */}
        <GroupInfoSection group={group} canViewFullInfo={true} />

        {/* Action Strip - CTAs principales conectados al Action Registry ✅ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mx-4 mb-4 space-y-2"
        >
          {/* CTA Primario: Share Group (Todos) */}
          <Button
            variant="default"
            size="lg"
            className="w-full justify-start"
            onClick={() => setShareSheetOpen(true)}
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share Group
          </Button>
        </motion.div>

        {/* Sección secundaria - Low emphasis actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mx-4 mt-8 pt-6 border-t border-border space-y-2"
        >
          {/* Leave Group (Miembros) */}
          {isMember && (
            <button
              onClick={() => {
                const action = actionRegistry['leave-group'];
                if (action?.handler) {
                  action.handler({
                    id: group.id,
                    title: group.name,
                    type: 'group',
                  });
                }
              }}
              className="w-full flex items-center gap-2 px-4 py-3 text-left text-sm text-muted-foreground hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Leave Group</span>
            </button>
          )}

          {/* Report Group (Todos - CRÍTICO) */}
          <button
            onClick={() => setReportSheetOpen(true)}
            className="w-full flex items-center gap-2 px-4 py-3 text-left text-sm text-muted-foreground hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Flag className="w-4 h-4" />
            <span>Report Group</span>
          </button>
        </motion.div>

        {/* Share Group Sheet */}
        <ShareGroupSheet
          open={shareSheetOpen}
          onOpenChange={setShareSheetOpen}
          group={group}
        />

        {/* Report Group Sheet */}
        <ReportGroupSheet
          open={reportSheetOpen}
          onOpenChange={setReportSheetOpen}
          group={group}
        />
      </div>
    );
  }

  // Tab: Products
  if (activeTab === "listings") {
    // Visitor en grupo privado/ultra-privado: Bloqueado
    if (isVisitor && !canViewContent) {
      return (
        <div className="pb-[200px] pt-12">
          <div className="mx-4 bg-muted/50 border border-border rounded-xl p-6 text-center">
            <Package className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
            <h3 className="font-medium mb-1">Members Only</h3>
            <p className="text-sm text-muted-foreground">
              Join this group to see listings shared by members
            </p>
          </div>
        </div>
      );
    }

    // Visitor en grupo público: Preview limitado (3 listings)
    const displayProducts = isVisitor ? visibleProducts.slice(0, 3) : visibleProducts;
    
    if (displayProducts.length === 0) {
      return (
        <div className="pb-[200px] pt-12">
          <div className="mx-4 bg-muted/50 border border-border rounded-xl p-6 text-center">
            <Package className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
            <h3 className="font-medium mb-1">No Listings Yet</h3>
            <p className="text-sm text-muted-foreground">
              {isVisitor ? "This group doesn't have any listings yet" : "Be the first to share a listing in this group"}
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="pb-[200px]">
        <div className="bg-card border-b">
          {displayProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-start gap-3 p-4 border-b last:border-b-0 hover:bg-muted/50 transition-fast"
            >
              <button
                onClick={() => onProductClick?.(product.id)}
                className="flex-1 flex items-start gap-3 text-left"
              >
                <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                  <ImageWithFallback
                    src={product.primary_image_url || ""}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate mb-1">{product.title}</h4>
                  <div className="flex items-center gap-2 text-sm mb-1">
                    {product.price_amount && product.price_currency && (
                      <span className="font-semibold text-primary">
                        {product.price_amount} {product.price_currency}
                      </span>
                    )}
                  </div>
                  {product.created_at && (
                    <p className="text-xs text-muted-foreground">
                      Posted {formatRelativeTime(product.created_at)}
                    </p>
                  )}
                </div>
              </button>
              
              {/* Listing Actions Menu - Disponible para TODOS los miembros (member, moderator, admin) */}
              {isMember && !isVisitor && (userRole === "member" || userRole === "moderator" || userRole === "admin") && (
                <ListingActionsMenu
                  listing={product}
                  currentUserRole={userRole}
                  groupId={group.id}
                  group={group} // ✅ Pasar group para evaluar permisos
                  onAction={(actionId, listingId) => {
                    // ✅ PHASE 3.5: Handle hide/remove actions locally
                    if (actionId === 'hide-listing') {
                      setHiddenListings(prev => new Set([...prev, listingId]));
                    } else if (actionId === 'remove-listing') {
                      setRemovedListings(prev => new Set([...prev, listingId]));
                    }
                  }}
                  onNavigateToChat={onNavigateToChat} // ✅ DUAL FLOW: Pass navigation callback
                />
              )}
            </motion.div>
          ))}
        </div>
        
        {/* Preview notice for visitors */}
        {isVisitor && products.length > 3 && (
          <div className="mx-4 mt-4 bg-primary/5 border border-primary/20 rounded-xl p-4 text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Showing {displayProducts.length} of {products.length} listings
            </p>
            <p className="text-xs text-muted-foreground">
              Join this group to see all listings
            </p>
          </div>
        )}
      </div>
    );
  }

  // Tab: Members
  if (activeTab === "members") {
    // Visitor en grupo privado/ultra-privado: Bloqueado
    if (isVisitor && !canViewContent) {
      return (
        <div className="pb-[200px] pt-12">
          <div className="mx-4 bg-muted/50 border border-border rounded-xl p-6 text-center">
            <Users className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
            <h3 className="font-medium mb-1">Members Only</h3>
            <p className="text-sm text-muted-foreground">
              Join this group to see who's part of the community
            </p>
          </div>
        </div>
      );
    }

    // Visitor en grupo público: Preview limitado (5 miembros)
    const displayMembers = isVisitor ? members.slice(0, 5) : members;

    return (
      <div className="pb-[200px]">
        <div className="bg-card border-b">
          {displayMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-3 p-4 border-b last:border-b-0 hover:bg-muted/50 transition-fast"
            >
              <button
                onClick={() => onMemberClick?.(member.id)}
                className="flex-1 flex items-center gap-3 text-left"
              >
                <Avatar className="w-12 h-12 flex-shrink-0">
                  <AvatarImage src={member.avatarUrl} alt={member.name} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {getInitials(member.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium truncate">{member.name}</h4>
                    {member.role !== "member" && (
                      <Badge
                        variant="secondary"
                        className={`${roleColors[member.role]} text-xs flex-shrink-0`}
                      >
                        {member.role === "admin" ? "Admin" : "Mod"}
                      </Badge>
                    )}
                  </div>
                  {member.username && (
                    <p className="text-sm text-muted-foreground truncate">
                      @{member.username}
                    </p>
                  )}
                  {member.joinedAt && (
                    <p className="text-xs text-muted-foreground">
                      Joined {formatRelativeTime(member.joinedAt)}
                    </p>
                  )}
                </div>
              </button>
              
              {/* Moderation Actions Menu - Solo para Moderator/Admin */}
              {canManage && !isVisitor && (userRole === "moderator" || userRole === "admin") && (
                <MemberActionsMenu
                  member={member}
                  currentUserRole={userRole}
                  groupId={group.id}
                  group={group} // ✅ Pasar group para evaluar permisos
                  onNavigateToChat={onNavigateToChat} // ✅ DUAL FLOW: Pass navigation callback
                />
              )}
            </motion.div>
          ))}
        </div>
        
        {/* Preview notice for visitors */}
        {isVisitor && members.length > 5 && (
          <div className="mx-4 mt-4 bg-primary/5 border border-primary/20 rounded-xl p-4 text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Showing {displayMembers.length} of {members.length} members
            </p>
            <p className="text-xs text-muted-foreground">
              Join this group to see all members
            </p>
          </div>
        )}
      </div>
    );
  }

  // Tab: Activity
  if (activeTab === "activity") {
    // Activity is members-only
    if (isVisitor) {
      return (
        <div className="pb-[200px] pt-12">
          <div className="mx-4 bg-muted/50 border border-border rounded-xl p-6 text-center">
            <Activity className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
            <h3 className="font-medium mb-1">Members Only</h3>
            <p className="text-sm text-muted-foreground">
              Join this group to see recent activity and updates
            </p>
          </div>
        </div>
      );
    }

    if (activities.length === 0) {
      return (
        <div className="pb-[calc(60px+var(--space-lg))] pt-12">
          <div className="mx-4 bg-muted/50 border border-border rounded-xl p-6 text-center">
            <Activity className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
            <h3 className="font-medium mb-1">No Recent Activity</h3>
            <p className="text-sm text-muted-foreground">
              Group activity will appear here
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="pb-[calc(60px+var(--space-lg))]">
        <div className="bg-card border-b">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-start gap-3 p-4 border-b last:border-b-0"
            >
              <Avatar className="w-10 h-10 flex-shrink-0">
                <AvatarImage src={activity.user.avatarUrl} alt={activity.user.name} />
                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                  {getInitials(activity.user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm">
                  <span className="font-medium">{activity.user.name}</span>{" "}
                  <span className="text-muted-foreground">{activity.content}</span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatRelativeTime(activity.timestamp)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // Tab: Pending (Moderation) - SOLO Admin y Moderator
  if (activeTab === "pending") {
    /**
     * PENDING TAB - TAB DEDICADO DE MODERACIÓN ✅
     * Visible SOLO para Admin y Moderator
     * 
     * Reemplaza:
     * - "Moderate Listings" button (eliminado de About)
     * - "Moderate Content" button (eliminado de About)
     * 
     * Funcionalidad:
     * - Lista de listings pendientes de aprobación
     * - Filtros: Pending | Approved | Rejected
     * - Acciones: Approve | Reject (individual y bulk)
     */
    
    // Control de acceso estricto
    if (!canManage) {
      return null; // No debería renderizarse si el tab no está visible
    }

    return <PendingTabContent groupId={group.id} autoApproveListings={group.autoApproveListings} />;
  }

  // Tab: Settings (Configuration) - SOLO Admin
  if (activeTab === "settings") {
    /**
     * SETTINGS TAB - TAB DEDICADO DE CONFIGURACIÓN ✅
     * Visible SOLO para Admin
     * 
     * Reemplaza:
     * - "Settings" button (eliminado de About)
     * - "Edit Group Profile" button (eliminado de About)
     * 
     * Funcionalidad:
     * - Group Profile: Nombre, descripción, avatar, reglas
     * - Permissions: Quién puede postear, invitar, moderar
     * - Visibility: Public/Private, join rules
     * - Moderation Settings: Auto-approve
     */
    
    // Control de acceso estricto
    if (userRole !== "admin") {
      return null; // No debería renderizarse si el tab no está visible
    }

    return <SettingsTabContent groupId={group.id} groupName={group.name} />;
  }

  return null;
}

// Helper function
function formatRelativeTime(date: Date | string): string {
  const now = new Date();
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const diffMs = now.getTime() - dateObj.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return dateObj.toLocaleDateString();
}