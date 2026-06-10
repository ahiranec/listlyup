/**
 * FilterSidebar Component
 * Desktop-only persistent filter panel for Home view
 * 
 * Reuses FilterSheetContent to maintain consistency with mobile filters
 * Only visible on desktop breakpoints (lg and above)
 */

import { FilterSheetContent } from "../filter-sheet/FilterSheetContent";
import { FilterFooter } from "../filters";
import type { FilterOptions } from "../filter-sheet";
import { Home, Users, Plus, Search, Menu, MessageSquare } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

interface FilterSidebarProps {
  filters: FilterOptions;
  openSections: Record<string, boolean>;
  onToggleSection: (section: string) => void;
  onUpdateFilters: (updates: Partial<FilterOptions>) => void;
  onReset: () => void;
  onApply: () => void;
  className?: string;
  
  // Navigation Props
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  unreadMessages?: number;
  
  // View Toggle Props
  onMapViewClick?: () => void;
  isMapView?: boolean;
}

export function FilterSidebar({
  filters,
  openSections,
  onToggleSection,
  onUpdateFilters,
  onReset,
  onApply,
  className = "",
  activeTab = "home",
  onTabChange,
  unreadMessages = 0,
  onMapViewClick,
  isMapView = false,
}: FilterSidebarProps) {
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "groups", label: "My Groups", icon: Users },
    { id: "products", label: "My Listings", icon: Search },
  ];

  return (
    <aside 
      className={`w-[280px] border-r border-border bg-white flex flex-col shrink-0 overflow-y-auto overflow-x-hidden ${className}`}
      style={{ height: 'calc(100vh - var(--header-height))' }}
    >
      {/* Navigation Section */}
      <div className="p-4 space-y-3">
        {/* View Toggle - Now at the top */}
        <button
          onClick={onMapViewClick}
          className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg border border-border bg-white hover:bg-muted/50 transition-all duration-200 group shadow-sm"
        >
          <div className="flex items-center gap-3">
            {isMapView ? (
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            )}
            <span className="text-sm font-medium text-foreground">
              {isMapView ? "List View" : "Map View"}
            </span>
          </div>
          <span className="text-[10px] font-bold text-primary/60 bg-primary/5 px-1.5 py-0.5 rounded border border-primary/10">Beta</span>
        </button>

        <Button 
          onClick={() => onTabChange?.("publish")}
          variant="outline"
          className="w-full justify-start gap-2 h-11 bg-primary/5 hover:bg-primary/10 text-primary border-primary/20 shadow-none hover:shadow-sm transition-all duration-200 rounded-lg"
        >
          <Plus className="w-5 h-5" />
          <span className="font-semibold text-sm">Create Listing</span>
        </Button>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange?.(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                activeTab === item.id 
                  ? "bg-primary/10 text-primary font-semibold" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className={`w-5 h-5 ${activeTab === item.id ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`} />
                <span className="text-sm">{item.label}</span>
              </div>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      <Separator className="mx-4 w-auto bg-border/60" />

      {/* Header for Filters */}
      <div className="h-[52px] px-4 flex items-center">
        <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Marketplace Filters</h2>
      </div>

      {/* Filters Content */}
      <FilterSheetContent
        filters={filters}
        openSections={openSections}
        onToggleSection={onToggleSection}
        onUpdateFilters={onUpdateFilters}
        noScroll={true}
      />

      {/* Footer - Part of the scrollable list */}
      <div className="border-t border-border p-4 mt-auto">
        <FilterFooter
          onReset={onReset}
          onApply={onApply}
        />
      </div>
    </aside>
  );
}
