/**
 * Menu Sheet Component - REDESIGNED 2025 ✨
 * 
 * Estética unificada con FilterSheet:
 * - Aparece desde arriba
 * - Diseño limpio con pills/cards blancas
 * - Sin secciones colapsables
 * - Todo scrolleable y visible
 */

import { useState, useEffect } from 'react';
import { Settings, User, BarChart3, Star, MessageSquare, Bell, Users, Package, Shield, HelpCircle, LogOut, LogIn, UserPlus, Info, CreditCard, BadgeCheck, MapPin, Megaphone, Calendar, Building2, Menu as MenuIcon, AlertCircle } from 'lucide-react';
import { Sheet, SheetContent, SheetTitle, SheetDescription } from './ui/sheet';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { motion } from 'motion/react';
import { getSavedItemsCount } from '../utils/savedItems';
import { isSuperAdmin } from '../dev/mockAuth';

interface MenuSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isAuthenticated?: boolean;
  isAdmin?: boolean;
  isModerator?: boolean;
  adminPendingCount?: number;
  user?: {
    name: string;
    email?: string;
    avatarUrl?: string;
    plan?: 'free' | 'plus' | 'pro';
    isVerified?: boolean;
  };
  onSettingsClick?: () => void;
  onProfileClick?: () => void;
  onAdminDashboardClick?: () => void;
  onMyListingsClick?: () => void;
  onMyGroupsClick?: () => void;
  onMyTrailClick?: () => void;
  onCampaignsClick?: () => void;
  onEventsClick?: () => void;
  onOrganizationClick?: () => void;
  onFavoritesClick?: () => void;
  onMessagesClick?: () => void;
  onNotificationsClick?: () => void;
  onSubscriptionClick?: () => void;
  onStatisticsClick?: () => void;
  onActionCenterClick?: () => void;
  onSuperAdminClick?: () => void; // SuperAdmin Dashboard access
  onHelpSupportClick?: () => void; // ✅ PHASE 3.1: Help & Support navigation
  onSignInClick?: () => void;
  onSignUpClick?: () => void;
  onLogoutClick?: () => void;
  onBackToHome?: () => void; // New prop for back navigation
}

export function MenuSheet({
  open,
  onOpenChange,
  isAuthenticated = false,
  isAdmin = false,
  isModerator = false,
  adminPendingCount = 0,
  user,
  onSettingsClick,
  onProfileClick,
  onAdminDashboardClick,
  onMyListingsClick,
  onMyGroupsClick,
  onMyTrailClick,
  onCampaignsClick,
  onEventsClick,
  onOrganizationClick,
  onFavoritesClick,
  onMessagesClick,
  onNotificationsClick,
  onSubscriptionClick,
  onStatisticsClick,
  onActionCenterClick,
  onSuperAdminClick, // SuperAdmin Dashboard access
  onHelpSupportClick, // ✅ PHASE 3.1: Help & Support navigation
  onSignInClick,
  onSignUpClick,
  onLogoutClick,
  onBackToHome,
}: MenuSheetProps) {
  
  const isAdminOrModerator = isAdmin || isModerator;

  const handleItemClick = (action?: () => void) => {
    onOpenChange(false);
    action?.();
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const [savedItemsCount, setSavedItemsCount] = useState(0);
  const [hasSuperAdminAccess, setHasSuperAdminAccess] = useState(false);

  useEffect(() => {
    if (open) {
      const count = getSavedItemsCount();
      setSavedItemsCount(count);
      
      // Check SuperAdmin session when menu opens
      const isSuper = isSuperAdmin();
      console.log('🔍 [MenuSheet] Checking SuperAdmin status:', isSuper);
      setHasSuperAdminAccess(isSuper);
    }
  }, [open]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="top" className="h-[100vh] p-0 border-b border-gray-200/50 shadow-2xl">
        
        {/* Accessibility elements */}
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <SheetDescription className="sr-only">
          {isAuthenticated 
            ? "Access your profile, settings, and account options"
            : "Sign in or create an account to get started"
          }
        </SheetDescription>

        <div className="flex flex-col h-full w-full overflow-hidden">
          
          {/* HEADER - Opción A: Solo Back */}
          <div className="flex-shrink-0">
            {/* Handle bar iOS-style */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
            </div>

            {/* Header con Back button */}
            <div className="w-full px-4 sm:px-6 py-4 bg-gradient-to-b from-gray-50 to-white border-b border-gray-200/50">
              <div className="flex items-center mb-2">
                <motion.button
                  onClick={() => {
                    onOpenChange(false);
                    onBackToHome?.();
                  }}
                  className="flex items-center gap-2 px-3 py-2 -ml-3 hover:bg-gray-100 rounded-xl transition-all duration-200"
                  whileHover={{ x: -4 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Back to home"
                >
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="font-medium text-primary">Back</span>
                </motion.button>
                <h2 className="text-lg sm:text-xl font-semibold text-foreground ml-2">
                  Menu
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {isAuthenticated 
                  ? "Manage your account and preferences"
                  : "Sign in to access your account"
                }
              </p>
            </div>
          </div>

          {/* CONTENT - Scrollable */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4">
            
            {/* Usuario NO autenticado */}
            {!isAuthenticated && (
              <div className="space-y-3">
                {/* Primary CTA: Sign In */}
                <motion.button
                  onClick={() => handleItemClick(onSignInClick)}
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <LogIn className="w-5 h-5" />
                  <span className="font-medium">Sign In</span>
                </motion.button>

                {/* Secondary: Sign Up */}
                <div className="flex items-center justify-center gap-1.5 text-sm">
                  <span className="text-muted-foreground">Don't have an account?</span>
                  <button
                    onClick={() => handleItemClick(onSignUpClick)}
                    className="text-primary font-medium hover:underline"
                  >
                    Sign Up
                  </button>
                </div>

                {/* Spacer */}
                <div className="h-2" />

                {/* Video Promocional */}
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-4">
                  <div className="mb-3">
                    <h3 className="font-semibold text-foreground mb-1">
                      What is ListlyUp? 🎬
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Your local marketplace reimagined
                    </p>
                  </div>
                  
                  {/* YouTube Video Container */}
                  <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-lg">
                    <iframe
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&playsinline=1&enablejsapi=1"
                      title="What is ListlyUp?"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                  
                  <p className="text-xs text-muted-foreground mt-3 text-center">
                    Discover how ListlyUp connects buyers and sellers locally
                  </p>
                </div>

                {/* Spacer */}
                <div className="h-2" />

                {/* Public Features - Available for guests */}
                <div className="space-y-2">
                  <MenuItem icon={Users} label="Explore Groups" onClick={() => handleItemClick(onMyGroupsClick)} />
                </div>

                {/* Spacer */}
                <div className="h-2" />

                {/* Bottom options */}
                <div className="space-y-2">
                  <MenuItem icon={HelpCircle} label="Help & Support" onClick={() => handleItemClick(onHelpSupportClick)} />
                  <MenuItem icon={Info} label="About ListlyUp" onClick={() => handleItemClick()} />
                </div>
              </div>
            )}

            {/* Usuario autenticado */}
            {isAuthenticated && user && (
              <div className="space-y-3">
                
                {/* User Profile Card - Premium style */}
                <motion.button
                  onClick={() => handleItemClick(onProfileClick)}
                  className="w-full bg-white border border-gray-200 rounded-2xl p-4 hover:border-primary/50 hover:shadow-md transition-all text-left"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12 border-2 border-primary/20">
                      <AvatarImage src={user.avatarUrl} alt={user.name} />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1">
                        <p className="font-semibold truncate">{user.name}</p>
                        {user.isVerified && (
                          <BadgeCheck className="w-4 h-4 text-blue-500 flex-shrink-0" />
                        )}
                      </div>
                      {user.plan && (
                        <Badge 
                          variant={user.plan === 'free' ? 'secondary' : 'default'} 
                          className="text-xs px-2 py-0.5"
                        >
                          {user.plan === 'free' && '🆓 '}
                          {user.plan === 'plus' && '✨ '}
                          {user.plan === 'pro' && '🚀 '}
                          {user.plan.charAt(0).toUpperCase() + user.plan.slice(1)}
                        </Badge>
                      )}
                    </div>
                  </div>
                </motion.button>

                {/* Logout Button - Destacado */}
                <motion.button
                  onClick={() => handleItemClick(onLogoutClick)}
                  className="w-full h-12 bg-red-50 border border-red-200 hover:bg-red-100 text-red-600 rounded-xl flex items-center justify-center gap-2 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </motion.button>

                {/* Spacer */}
                <div className="h-2" />

                {/* Action Center - Unificado para todos los roles */}
                <MenuItem 
                  icon={AlertCircle} 
                  label="Action Center" 
                  badge={isAdminOrModerator && adminPendingCount > 0 ? adminPendingCount : 8}
                  badgeVariant="destructive"
                  onClick={() => handleItemClick(onActionCenterClick)} 
                  highlight={isAdminOrModerator}
                />

                {/* SuperAdmin Dashboard - Solo visible si está logueado como superadmin */}
                {hasSuperAdminAccess && (
                  <MenuItem 
                    icon={Shield} 
                    label="SuperAdmin Dashboard" 
                    onClick={() => handleItemClick(onSuperAdminClick)} 
                    highlight={true}
                  />
                )}

                <div className="h-2" />

                {/* Menu Items - Agrupados visualmente pero sin separadores */}
                <div className="space-y-2">
                  <MenuItem icon={Settings} label="Settings" onClick={() => handleItemClick(onSettingsClick)} />
                  <MenuItem icon={User} label="My Profile" onClick={() => handleItemClick(onProfileClick)} />
                  {/* OUT OF MVP
                  <MenuItem icon={Building2} label="Organization" onClick={() => handleItemClick(onOrganizationClick)} />
                  <MenuItem icon={CreditCard} label="Subscription & Billing" onClick={() => handleItemClick(onSubscriptionClick)} />
                  */}
                  <MenuItem icon={BarChart3} label="My Statistics" onClick={() => handleItemClick(onStatisticsClick)} />
                </div>

                <div className="h-2" />

                <div className="space-y-2">
                  <MenuItem 
                    icon={Star} 
                    label="Favorites" 
                    badge={savedItemsCount > 0 ? savedItemsCount : undefined}
                    badgeVariant="secondary"
                    onClick={() => handleItemClick(onFavoritesClick)} 
                  />
                  {/* OUT OF MVP
                  <MenuItem icon={MessageSquare} label="Messages" onClick={() => handleItemClick(onMessagesClick)} />
                  <MenuItem icon={Bell} label="Notifications" onClick={() => handleItemClick(onNotificationsClick)} />
                  */}
                </div>

                <div className="h-2" />

                <div className="space-y-2">
                  <MenuItem icon={Package} label="My Listings" onClick={() => handleItemClick(onMyListingsClick)} />
                  <MenuItem icon={Users} label="My Groups" onClick={() => handleItemClick(onMyGroupsClick)} />
                  <MenuItem icon={MapPin} label="My Trail" onClick={() => handleItemClick(onMyTrailClick)} />
                  {/* OUT OF MVP
                  <MenuItem icon={Megaphone} label="Campaigns" onClick={() => handleItemClick(onCampaignsClick)} />
                  <MenuItem icon={Calendar} label="Events" onClick={() => handleItemClick(onEventsClick)} />
                  */}
                </div>

                <div className="h-2" />

                <MenuItem icon={HelpCircle} label="Help & Support" onClick={() => handleItemClick(onHelpSupportClick)} />

                {/* Bottom padding for safe scrolling */}
                <div className="h-4" />
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// MenuItem Component - Clean pill style
interface MenuItemProps {
  icon: React.ElementType;
  label: string;
  badge?: number;
  badgeVariant?: "default" | "destructive" | "secondary";
  onClick?: () => void;
  highlight?: boolean;
}

function MenuItem({ icon: Icon, label, badge, badgeVariant = "default", onClick, highlight }: MenuItemProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`w-full bg-white border rounded-xl p-3.5 flex items-center justify-between hover:border-primary/50 hover:shadow-sm transition-all text-left ${
        highlight ? 'border-primary/30 bg-primary/5' : 'border-gray-200'
      }`}
      whileHover={{ scale: 1.01, x: 4 }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="flex items-center gap-3">
        <Icon className={`w-5 h-5 ${highlight ? 'text-primary' : 'text-muted-foreground'}`} />
        <span className="font-medium text-sm">{label}</span>
      </div>
      {badge && badge > 0 && (
        <Badge variant={badgeVariant} className="text-xs px-2 py-0.5 h-5">
          {badge}
        </Badge>
      )}
    </motion.button>
  );
}