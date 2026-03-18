/**
 * Header Component (Refactored)
 * Main header with logo, search, and notifications
 * 
 * DESKTOP (lg+):
 * Layout: [Logo] [Search - expanded] [Map/List Toggle] [Notifications]
 * Max-width aligned with content containers
 * 
 * MOBILE:
 * Layout: [Logo] [Search] [Notifications]
 * Full-width design (56px height)
 */

import { Bell } from 'lucide-react';
import { HeaderLogo } from './HeaderLogo';
import { HeaderSearch } from './HeaderSearch';
import { HeaderIconButton } from './HeaderIconButton';

interface HeaderProps {
  logo: string;
  notificationCount?: number;
  onNotificationClick?: () => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  // Desktop-specific props
  onMapViewClick?: () => void;
  isMapView?: boolean;
}

export function Header({
  logo,
  notificationCount = 0,
  onNotificationClick,
  searchValue = "",
  onSearchChange,
  searchPlaceholder = "Search products...",
  onMapViewClick,
  isMapView = false,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-fixed bg-white/80 backdrop-blur-lg border-b border-gray-200/50 shadow-sm">
      {/* Mobile Header - full width */}
      <div 
        className="lg:hidden header-height flex items-center gap-2 px-2" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230f62fe' fill-opacity='0.015'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      >
        {/* Logo - Left */}
        <HeaderLogo logo={logo} />
        
        {/* Search - Center/Middle, expandible */}
        <HeaderSearch 
          value={searchValue}
          onChange={onSearchChange}
          placeholder={searchPlaceholder}
        />
        
        {/* Notifications - Right */}
        <div className="flex-shrink-0">
          <HeaderIconButton
            icon={Bell}
            onClick={onNotificationClick}
            ariaLabel="Notifications"
            badge={notificationCount}
            variant="secondary"
          />
        </div>
      </div>

      {/* Desktop Header - aligned with content containers */}
      <div className="hidden lg:block">
        <div 
          className="max-w-[1280px] mx-auto header-height flex items-center gap-6 px-4"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230f62fe' fill-opacity='0.015'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        >
          {/* Logo - Left */}
          <HeaderLogo logo={logo} />
          
          {/* Search - Center, expanded */}
          <div className="flex-1 max-w-2xl">
            <HeaderSearch 
              value={searchValue}
              onChange={onSearchChange}
              placeholder={searchPlaceholder}
            />
          </div>
          
          {/* Right Section: Quick Controls + Notifications */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Map/List Toggle - Desktop only */}
            {onMapViewClick && (
              <button
                onClick={onMapViewClick}
                className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-primary/20 rounded-xl hover:border-primary hover:bg-primary/5 transition-all duration-200 shadow-sm"
                aria-label={isMapView ? "Switch to List View" : "Switch to Map View"}
              >
                {isMapView ? (
                  <>
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    <span className="text-sm font-medium text-primary">List</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    <span className="text-sm font-medium text-muted-foreground">Map</span>
                  </>
                )}
              </button>
            )}
            
            {/* Notifications */}
            <HeaderIconButton
              icon={Bell}
              onClick={onNotificationClick}
              ariaLabel="Notifications"
              badge={notificationCount}
              variant="secondary"
            />
          </div>
        </div>
      </div>
    </header>
  );
}