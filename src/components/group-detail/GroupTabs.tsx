/**
 * GroupTabs Component
 * Tabs de navegación unificados con visibilidad por rol
 * 
 * TABS POR ROL:
 * - Visitor/Member: About | Listings | Members
 * - Moderator: About | Listings | Members | Pending (si canModerate)
 * - Admin: About | Listings | Members | Pending | Settings
 * 
 * CONTRATO:
 * - Pending tab: visible según canAccessPending() (respeta whoCanModerate)
 * - Settings tab: visible según canAccessSettings() (solo admin)
 */

import { Info, Package, Users, AlertCircle, Settings } from "lucide-react";
import { canAccessPending, canAccessSettings } from "../../lib/groupPermissions";
import type { Group } from "../../lib/groupPermissions";

export type GroupTab = "about" | "listings" | "members" | "pending" | "settings";

interface GroupTabsProps {
  activeTab: GroupTab;
  onTabChange: (tab: GroupTab) => void;
  userRole?: "visitor" | "pending" | "member" | "moderator" | "admin";
  group?: Group; // Necesario para evaluar permisos
}

const baseTabs = [
  { id: "about" as const, label: "About", icon: Info },
  { id: "listings" as const, label: "Listings", icon: Package },
  { id: "members" as const, label: "Members", icon: Users },
];

const moderationTab = { id: "pending" as const, label: "Pending", icon: AlertCircle };
const settingsTab = { id: "settings" as const, label: "Settings", icon: Settings };

export function GroupTabs({ activeTab, onTabChange, userRole = "visitor", group }: GroupTabsProps) {
  // Determinar tabs visibles según permisos (no solo rol)
  const visibleTabs = [...baseTabs];
  
  // Pending tab: visible si tiene permisos de moderación
  if (group && canAccessPending(userRole, group)) {
    visibleTabs.push(moderationTab);
  }
  
  // Settings tab: solo admin
  if (canAccessSettings(userRole)) {
    visibleTabs.push(settingsTab);
  }

  return (
    <div className="sticky top-[60px] z-20 bg-background border-b">
      <div className="flex overflow-x-auto scrollbar-hide">
        {visibleTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-shrink-0 flex flex-col items-center gap-1 py-3 px-4 transition-colors relative ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium whitespace-nowrap">{tab.label}</span>
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}