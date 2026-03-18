import { useState } from 'react';
import type { NavigationTab, ViewType } from '../types';
import type { CanonicalListing } from '../types/canonical';
import type { AuthRequiredContext } from '../components/AuthRequiredSheet';
import { getSuperAdminSession } from '../dev/mockAuth';
import type { PublishFormData } from '../components/publish/types';

/**
 * Get initial auth state from localStorage
 * Also checks for superadmin session
 */
function getInitialAuthState(): boolean {
  try {
    // Check for superadmin session first
    const superAdminSession = getSuperAdminSession();
    console.log('🔍 [getInitialAuthState] superAdminSession:', superAdminSession);
    if (superAdminSession) {
      console.log('✅ [getInitialAuthState] Found superadmin session, returning true');
      return true;
    }
    
    // Otherwise check regular auth
    const stored = localStorage.getItem('listlyup_auth');
    console.log('🔍 [getInitialAuthState] listlyup_auth:', stored);
    return stored === 'true';
  } catch (error) {
    console.error('Error reading auth state from localStorage:', error);
    return false;
  }
}

/**
 * Persist auth state to localStorage
 */
function persistAuthState(isAuthenticated: boolean): void {
  try {
    if (isAuthenticated) {
      localStorage.setItem('listlyup_auth', 'true');
    } else {
      localStorage.removeItem('listlyup_auth');
    }
  } catch (error) {
    console.error('Error persisting auth state to localStorage:', error);
  }
}

/**
 * Custom hook to manage all app-level state
 * Consolidates scattered useState calls from App.tsx
 */
export function useAppState() {
  // Navigation state
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [activeChatId, setActiveChatId] = useState<string>('');
  const [previousView, setPreviousView] = useState<ViewType>('home'); // NEW: Track where we came from
  
  // Product state
  const [selectedProduct, setSelectedProduct] = useState<CanonicalListing | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Group state
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [selectedGroupRole, setSelectedGroupRole] = useState<'admin' | 'moderator' | 'member' | undefined>(undefined);
  const [filteredGroupId, setFilteredGroupId] = useState<string | null>(null);
  const [preselectedGroupId, setPreselectedGroupId] = useState<string | null>(null); // NEW: For publish flow context
  
  // UI state
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSuperAdminOpen, setIsSuperAdminOpen] = useState(false);
  const [isShareSheetOpen, setIsShareSheetOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthRequiredOpen, setIsAuthRequiredOpen] = useState(false);
  const [authRequiredContext, setAuthRequiredContext] = useState<AuthRequiredContext>('default');
  const [isExploreGroupsOpen, setIsExploreGroupsOpen] = useState(false); // NEW: For non-authenticated users
  
  // Menu Pages state - My Trail, Campaigns, Events
  const [selectedTrailId, setSelectedTrailId] = useState<string | null>(null);
  const [isTrailDetailOpen, setIsTrailDetailOpen] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);
  const [isCampaignCreateOpen, setIsCampaignCreateOpen] = useState(false);
  const [selectedEventHubId, setSelectedEventHubId] = useState<string | null>(null);
  const [isEventHubCreateOpen, setIsEventHubCreateOpen] = useState(false);
  
  // Re-publish state - For passing listing data to PublishFlow
  const [republishData, setRepublishData] = useState<Partial<PublishFormData> | null>(null);
  
  // Admin/Moderation state - Phase 3.3: Selected report and issue IDs
  const [selectedGroupReportId, setSelectedGroupReportId] = useState<string | null>(null);
  const [selectedPlatformReportId, setSelectedPlatformReportId] = useState<string | null>(null);
  const [selectedUserIssueId, setSelectedUserIssueId] = useState<string | null>(null);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null); // ✅ VD-1: For report-detail view
  
  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('');
  
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(getInitialAuthState()); // Changed to false for testing auth gate

  return {
    // Navigation
    activeTab,
    setActiveTab,
    currentView,
    setCurrentView,
    activeChatId,
    setActiveChatId,
    previousView,
    setPreviousView,
    
    // Products
    selectedProduct,
    setSelectedProduct,
    isModalOpen,
    setIsModalOpen,
    
    // Groups
    selectedGroupId,
    setSelectedGroupId,
    selectedGroupRole,
    setSelectedGroupRole,
    filteredGroupId,
    setFilteredGroupId,
    preselectedGroupId,
    setPreselectedGroupId,
    
    // UI
    isFilterOpen,
    setIsFilterOpen,
    isSettingsOpen,
    setIsSettingsOpen,
    isMenuOpen,
    setIsMenuOpen,
    isSuperAdminOpen,
    setIsSuperAdminOpen,
    isShareSheetOpen,
    setIsShareSheetOpen,
    isLoading,
    setIsLoading,
    isAuthRequiredOpen,
    setIsAuthRequiredOpen,
    authRequiredContext,
    setAuthRequiredContext,
    isExploreGroupsOpen,
    setIsExploreGroupsOpen,
    
    // Menu Pages
    selectedTrailId,
    setSelectedTrailId,
    isTrailDetailOpen,
    setIsTrailDetailOpen,
    selectedCampaignId,
    setSelectedCampaignId,
    isCampaignCreateOpen,
    setIsCampaignCreateOpen,
    selectedEventHubId,
    setSelectedEventHubId,
    isEventHubCreateOpen,
    setIsEventHubCreateOpen,
    
    // Re-publish
    republishData,
    setRepublishData,
    
    // Admin/Moderation
    selectedGroupReportId,
    setSelectedGroupReportId,
    selectedPlatformReportId,
    setSelectedPlatformReportId,
    selectedUserIssueId,
    setSelectedUserIssueId,
    selectedReportId,
    setSelectedReportId,
    
    // Search
    searchQuery,
    setSearchQuery,
    
    // Auth
    isAuthenticated,
    setIsAuthenticated: (value: boolean) => {
      setIsAuthenticated(value);
      persistAuthState(value);
    },
  };
}