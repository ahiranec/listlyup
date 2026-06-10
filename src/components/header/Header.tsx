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

import { User } from 'lucide-react';
import { HeaderLogo } from './HeaderLogo';
import { HeaderSearch } from './HeaderSearch';
import { HeaderIconButton } from './HeaderIconButton';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface HeaderProps {
  logo: string;
  notificationCount?: number;
  onNotificationClick?: () => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  userAvatar?: string;
  onProfileClick?: () => void;
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
  userAvatar,
  onProfileClick,
  onMapViewClick,
  isMapView = false,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-fixed bg-white border-b border-gray-200 shadow-sm">
      {/* Fixed background layer for Desktop to make border full-width */}
      <div className="hidden lg:block fixed top-0 left-0 right-0 header-height bg-white border-b border-gray-200 shadow-sm -z-10 pointer-events-none" />
      
      {/* Mobile Header - Stable Alignment */}
      <div 
        className="lg:hidden header-height flex items-center px-4 gap-4" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230f62fe' fill-opacity='0.015'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      >
        {/* Left: Logo - Fixed and stable */}
        <div className="shrink-0">
          <HeaderLogo logo={logo} />
        </div>

        {/* Center/Right: Search & Avatar block */}
        <div className="flex-1 flex justify-center min-w-0">
          <div className="w-full max-w-[820px] flex items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <HeaderSearch 
                value={searchValue}
                onChange={onSearchChange}
                placeholder={searchPlaceholder}
              />
            </div>
            
            <div className="shrink-0">
              <button 
                onClick={onProfileClick || onNotificationClick}
                className="relative group focus:outline-none transition-transform active:scale-95"
                aria-label="User Profile"
              >
                <Avatar className="h-8 w-8 border border-gray-200/50 shadow-sm">
                  <AvatarImage src={userAvatar} alt="Profile" />
                  <AvatarFallback className="bg-primary/5 text-primary">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                
                {/* Notification Badge on Avatar */}
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-500 px-1 text-[8px] font-bold text-white border-2 border-white shadow-sm">
                    {notificationCount > 9 ? '9+' : notificationCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Header - Redesigned Dashboard Layout */}
      <div className="hidden lg:block">
        <div 
          className="w-full header-height flex items-center"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230f62fe' fill-opacity='0.015'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        >
          {/* 1. Left Section: Logo - Fixed 280px width (aligned with sidebar) */}
          <div className="w-[280px] px-6 flex items-center shrink-0">
            <HeaderLogo logo={logo} />
          </div>
          
          {/* 2. Controls Section: Search & Avatar - Aligned with Product Grid */}
          <div className="flex-1 px-12">
            <div className="max-w-[820px] w-full flex items-center justify-between">
              {/* Search Bar Container */}
              <div className="max-w-xl flex-1 mr-8">
                <HeaderSearch 
                  value={searchValue}
                  onChange={onSearchChange}
                  placeholder={searchPlaceholder}
                />
              </div>

              {/* Avatar Container - Anchored to the right edge of the 820px block */}
              <div className="flex items-center shrink-0">
                <button 
                  onClick={onProfileClick || onNotificationClick}
                  className="relative group focus:outline-none transition-transform active:scale-95"
                  aria-label="User Profile"
                >
                  <Avatar className="h-9 w-9 border border-gray-200/50 shadow-sm group-hover:border-primary/30 transition-colors">
                    <AvatarImage src={userAvatar} alt="Profile" />
                    <AvatarFallback className="bg-primary/5 text-primary">
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  
                  {/* Notification Badge on Avatar */}
                  {notificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white border-2 border-white shadow-sm">
                      {notificationCount > 9 ? '9+' : notificationCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
