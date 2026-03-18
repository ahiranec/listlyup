import { useState } from "react";
import { Search, Users, Package, Wrench, MapPin, Check, Clock, Crown, Shield, CheckCircle } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "../ui/sheet";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { toast } from "sonner@2.0.3";

interface ExploreGroup {
  id: string;
  name: string;
  description: string;
  avatarUrl?: string;
  memberCount: number;
  productCount: number;
  serviceCount: number;
  location: string;
  groupType: "public" | "private" | "secret";
  isPending?: boolean;
}

interface MyGroup {
  id: string;
  role: "admin" | "moderator" | "member";
  status: string;
}

interface ExploreGroupsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGroupClick?: (groupId: string, userRole?: "admin" | "moderator" | "member") => void;
  myGroups?: MyGroup[];
  isAuthenticated?: boolean; // NEW: Hide role badges when not authenticated
}

// Mock data for explore groups
const mockExploreGroups: ExploreGroup[] = [
  {
    id: "1", // Same as "Vecinos Valparaíso" - user is ADMIN
    name: "Vecinos Valparaíso",
    description: "Grupo para vecinos de Valparaíso",
    memberCount: 234,
    productCount: 45,
    serviceCount: 23,
    location: "Valparaíso",
    groupType: "public",
  },
  {
    id: "2", // Same as "Tech Lovers Chile" - user is MEMBER
    name: "Tech Lovers Chile",
    description: "Comunidad de tecnología y programación",
    memberCount: 1205,
    productCount: 189,
    serviceCount: 67,
    location: "Viña del Mar",
    groupType: "public",
  },
  {
    id: "e1", // New group - NOT a member
    name: "Emprendedores Valparaíso",
    description: "Grupo para emprendedores locales que quieren crecer juntos",
    memberCount: 432,
    productCount: 89,
    serviceCount: 124,
    location: "Valparaíso",
    groupType: "public",
  },
  {
    id: "3", // Same as "Deportes Viña del Mar" - user is MODERATOR
    name: "Deportes Viña del Mar",
    description: "Para los amantes del deporte",
    memberCount: 567,
    productCount: 78,
    serviceCount: 34,
    location: "Viña del Mar",
    groupType: "private",
  },
  {
    id: "e2", // New group - NOT a member
    name: "Deportes Extremos Chile",
    description: "Para los amantes de la adrenalina y deportes extremos",
    memberCount: 1205,
    productCount: 234,
    serviceCount: 56,
    location: "Viña del Mar",
    groupType: "public",
  },
  {
    id: "e3", // New group - NOT a member
    name: "Artesanos Locales Premium",
    description: "Comunidad exclusiva de artesanos y creadores",
    memberCount: 567,
    productCount: 456,
    serviceCount: 89,
    location: "Valparaíso",
    groupType: "private",
  },
  {
    id: "4", // Same as "Compra/Venta Reñaca" - user is MEMBER
    name: "Compra/Venta Reñaca",
    description: "Marketplace local de Reñaca",
    memberCount: 892,
    productCount: 234,
    serviceCount: 89,
    location: "Reñaca",
    groupType: "public",
  },
];

export function ExploreGroupsSheet({ open, onOpenChange, onGroupClick, myGroups, isAuthenticated }: ExploreGroupsSheetProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [pendingRequests, setPendingRequests] = useState<Set<string>>(new Set());

  const filteredGroups = mockExploreGroups.filter((group) =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleJoinRequest = (group: ExploreGroup) => {
    // Auth gate: If not authenticated, we need to trigger auth required modal
    // But since we don't have access to that state here, we'll just show a toast
    // The actual intercepting will be done by onAuthRequired in the parent
    if (!isAuthenticated) {
      toast.error("Please sign in to join groups");
      return;
    }
    
    setPendingRequests(prev => new Set(prev).add(group.id));
    if (group.groupType === "public") {
      toast.success(`Joined "${group.name}"`);
    } else {
      toast.success(`Request sent to "${group.name}"`);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] flex flex-col p-0 rounded-t-xl">
        <SheetHeader className="px-6 pt-6 pb-4 border-b">
          <SheetTitle>Explore Groups</SheetTitle>
          <SheetDescription>
            Discover and join new groups in your area
          </SheetDescription>
        </SheetHeader>

        {/* Search */}
        <div className="px-6 py-3 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              type="search"
              placeholder="Search groups..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-10"
            />
          </div>
        </div>

        {/* Groups List */}
        <div className="flex-1 overflow-y-auto">
          {filteredGroups.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-6">
              <div className="text-4xl mb-2">🔍</div>
              <p className="text-muted-foreground">No groups found</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {filteredGroups.map((group) => {
                const isPending = pendingRequests.has(group.id);
                const userRole = myGroups?.find(g => g.id === group.id)?.role;
                
                return (
                  <div 
                    key={group.id} 
                    className="p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => {
                      if (onGroupClick) {
                        onGroupClick(group.id, userRole);
                        onOpenChange(false);
                      }
                    }}
                  >
                    <div className="flex items-start gap-3">
                      {/* Avatar */}
                      <Avatar className="w-12 h-12 flex-shrink-0">
                        <AvatarImage src={group.avatarUrl} alt={group.name} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {getInitials(group.name)}
                        </AvatarFallback>
                      </Avatar>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium truncate">{group.name}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {group.description}
                            </p>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground my-2">
                          <div className="flex items-center gap-1">
                            <Users className="w-3.5 h-3.5" />
                            <span>{group.memberCount.toLocaleString()}</span>
                          </div>
                          {group.productCount > 0 && (
                            <div className="flex items-center gap-1">
                              <Package className="w-3.5 h-3.5" />
                              <span>{group.productCount}</span>
                            </div>
                          )}
                          {group.serviceCount > 0 && (
                            <div className="flex items-center gap-1">
                              <Wrench className="w-3.5 h-3.5" />
                              <span>{group.serviceCount}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{group.location}</span>
                          </div>
                        </div>

                        {/* Badges and Join Button */}
                        <div className="flex items-center gap-2 flex-wrap">
                          {group.groupType === "private" && (
                            <Badge variant="secondary" className="text-xs h-5">
                              🔒 Private
                            </Badge>
                          )}

                          {/* Member Badge - si ya eres miembro */}
                          {isAuthenticated && userRole && (
                            <Badge 
                              variant="outline" 
                              className="text-xs h-5 border-green-500/50 bg-green-500/10 text-green-700"
                            >
                              {userRole === "admin" && <Crown className="w-3 h-3 mr-1" />}
                              {userRole === "moderator" && <Shield className="w-3 h-3 mr-1" />}
                              {userRole === "member" && <CheckCircle className="w-3 h-3 mr-1" />}
                              {userRole === "admin" ? "Admin" : userRole === "moderator" ? "Moderator" : "Member"}
                            </Badge>
                          )}

                          {/* Join button - solo si NO eres miembro */}
                          {!userRole && (
                            <Button
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleJoinRequest(group);
                              }}
                              disabled={isPending}
                              className="ml-auto h-8 text-xs"
                              variant={isPending ? "outline" : "default"}
                            >
                              {isPending ? (
                                <>
                                  <Clock className="w-3.5 h-3.5 mr-1.5" />
                                  {group.groupType === "public" ? "Joined" : "Pending"}
                                </>
                              ) : (
                                <>
                                  {group.groupType === "public" ? "Join" : "Request to Join"}
                                </>
                              )}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default ExploreGroupsSheet;