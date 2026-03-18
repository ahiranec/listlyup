/**
 * Bottom Navigation Component (Refactored)
 * Mobile-first navigation bar
 * Optimized height: 60px + safe area
 */

import { NavItem } from './NavItem';
import { NAV_ITEMS } from './navConfig';

interface BottomNavProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  badges?: Record<string, number>; // NEW: Badge counts for each tab
}

export function BottomNav({ activeTab = 'home', onTabChange, badges }: BottomNavProps) {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-fixed bg-white/90 backdrop-blur-lg border-t border-gray-200/50 shadow-2xl shadow-black/5 max-w-[480px] lg:max-w-[1280px] mx-auto">
      <div className="bottom-nav-height flex items-center justify-around px-1 py-1.5">
        {NAV_ITEMS.map((item, index) => (
          <NavItem
            key={item.id}
            id={item.id}
            icon={item.icon}
            label={item.label}
            isActive={activeTab === item.id}
            onClick={() => onTabChange?.(item.id)}
            index={index}
            badge={badges?.[item.id]}
          />
        ))}
      </div>
      
      {/* iOS Safe Area */}
      <div className="h-[env(safe-area-inset-bottom)] bg-white/90 backdrop-blur-lg safe-area-bottom" />
    </nav>
  );
}