import { lazy, Suspense, useState, useEffect, startTransition } from "react";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { motion } from "motion/react";
import { Share2, SearchX } from "lucide-react";
import { toast, Toaster } from "sonner@2.0.3";
import { AuthRequiredSheet } from "./components/AuthRequiredSheet";
import { ProductAccessDeniedSheet } from "./components/ProductAccessDeniedSheet";
import { getUnreadMessageCount } from "./data/chatMessages";
import { ReportSheet } from "./components/product-detail/ReportSheet";
import { useReportSheet } from "./hooks/useReportSheet";
import { verifyCredentials, isSuperAdminUser } from "./data/mockCredentials";
import { storeSuperAdminSession } from "./dev/mockAuth";
import { AppStandaloneRenderer } from "./AppStandaloneRenderer";
import { BottomNav } from "./components/bottom-nav";
import { Header } from "./components/header";
import { SearchBar } from "./components/search-bar";
import { ProductCard } from "./components/product-card";
import { ProductCardSkeleton } from "./components/ProductCardSkeleton";
import { MenuSheet } from "./components/MenuSheet";
import { FilterSheet } from "./components/filter-sheet/FilterSheet";
import { FilterSidebar } from "./components/filter-sidebar";
import ShareSheet from "./components/share/ShareSheet";
import { ProductModal } from "./components/product-modal";

// Lazy load heavy components (only load when needed)
const SignInPage = lazy(() => import("./components/SignInPage"));
const SignUpPage = lazy(() => import("./components/SignUpPage"));
const BillingPage = lazy(() => import("./components/BillingPage"));
const StatisticsPage = lazy(() => import("./components/StatisticsPage"));
const ActionCenterPage = lazy(() => import("./components/ActionCenterPage"));
const ChatConversationPage = lazy(() => import("./components/ChatConversationPage"));
const MyListingsPage = lazy(() => import("./components/MyListingsPage"));
const ProductDetailPage = lazy(() => import("./components/ProductDetailPage"));
const PublishFlow = lazy(() => import("./components/publish/PublishFlow"));
const MyGroupsPage = lazy(() => import("./components/groups/MyGroupsPageNew"));
const GroupDetailPage = lazy(() => import("./components/group-detail/GroupDetailPage"));
const NotificationsPage = lazy(() => import("./components/notifications/NotificationsPage"));
const MapView = lazy(() => import("./components/map-view"));
const SuperAdminPanel = lazy(() => import("./components/super-admin"));
const SuperAdminDashboard = lazy(() => import("./components/super-admin-v2"));
const SavedItemsPage = lazy(() => import("./components/SavedItemsPage"));
const ExploreGroupsSheet = lazy(() => import("./components/groups/ExploreGroupsSheet"));
const MockUserTesting = lazy(() => import("./components/testing/MockUserTesting"));
const AdminLoginPage = lazy(() => import("./components/AdminLoginPage"));

// Menu Pages - My Trail, Campaigns, Events
const MyTrailPage = lazy(() => import("./components/menu/MyTrailPage"));
const TrailDetailSheet = lazy(() => import("./components/menu/TrailDetailSheet"));
const CampaignsPage = lazy(() => import("./components/menu/CampaignsPage"));
const CreateEditCampaignSheet = lazy(() => import("./components/menu/CreateEditCampaignSheet"));
const CampaignDetailPage = lazy(() => import("./components/menu/CampaignDetailPage"));
const EventsHubPage = lazy(() => import("./components/menu/EventsHubPage"));
const CreateEventHubFlow = lazy(() => import("./components/menu/CreateEventHubFlow"));
const EventHubDetailPage = lazy(() => import("./components/menu/EventHubDetailPage"));

// Developer Tools - Only in development
import { DevTools } from "./components/testing/DevTools";

// Profile Modular System - Lazy load all pages

// Settings Modular System - Lazy load

// Help & Support - Standalone page (not in Settings)
const HelpSupportPage = lazy(() => import("./components/settings/HelpSupportPage"));

// Admin/Moderation Detail Pages - Phase 3.3
const GroupReportDetailPage = lazy(() => import("./components/admin/GroupReportDetailPage"));
const PlatformReportDetailPage = lazy(() => import("./components/admin/PlatformReportDetailPage"));
const UserIssueDetailPage = lazy(() => import("./components/admin/UserIssueDetailPage"));
const ReportDetailPage = lazy(() => import("./components/admin/ReportDetailPage")); // ✅ VD-1

// Providers & Services
import { ServiceProvider } from "./lib/providers/ServiceProvider";
import { ProfileProvider } from "./contexts/ProfileContext"; // Corrected path
import { FeaturesProvider } from "./contexts/FeaturesContext"; // Settings Features Context (GLOBAL)
import { GlobalActionModalProvider } from "./components/global-action-modal"; // Phase 5: Global Action Modal

// Hooks
import { useAppState } from "./hooks/useAppState";
import { useAppNavigation } from "./hooks/useAppNavigation";
import { useAppFilters } from "./hooks/useAppFilters";
import { useFilterSheet } from "./components/filter-sheet";
import { useVisibleProducts } from "./hooks/useVisibleProducts";
import { useCurrentUser } from "./hooks/useCurrentUser"; // NEW: Centralized user state
import { useListings } from "./hooks/useListings";
import { useListingById } from "./hooks/useListingById";
import { useSuperAdminSession } from "./hooks/useSuperAdminSession";

// Utils & Data
import { shareContent } from "./utils/helpers";
import canonicalListings from "./data/products"; // ✅ CANONICAL SOURCE - All data starts as CanonicalListing[]
import { mockCurrentUser } from "./data/currentUser";
import { mockListingForEdit } from "./data/mockListingForEdit";
import type { SavedSearch } from "./components/settings/types";
import type { FilterOptions } from "./components/filters/types";
import { getSuperAdminSession, clearSuperAdminSession } from "./dev/mockAuth";
import { trailListingToPublishFormData } from "./utils/trailHelpers";
import { getTrailListings } from "./data/trailListings";

// Assets
import imgLogo from "figma:asset/9d920bf2177dcd7ccef7e97e9cc7d4a98384cf54.png";
import imgProductImage from "figma:asset/ec8f016d30871cab49c52501657924d86f0824b1.png";

// Loading Fallback Component
function LoadingFallback() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}

/**
 * Main App Component - REFACTORED ✨
 * 
 * ETAPA 14: Simplified using custom hooks and better organization
 * - State management: useAppState hook
 * - Navigation logic: useAppNavigation hook  
 * - Filter logic: useAppFilters hook
 * - Reduced from 752 lines to ~520 lines (-31%)
 * 
 * Product Visibility Logic:
 * - See /hooks/useVisibleProducts.ts
 * - See /utils/productVisibility.ts
 */
export default function App() {
  // Consolidated state management
  const state = useAppState();

  // Centralized user state - SINGLE SOURCE OF TRUTH
  const { currentUser, userId, setLoginMethod, clearUser } = useCurrentUser({
    isAuthenticated: state.isAuthenticated
  });

  // Global Report Sheet state
  const reportSheet = useReportSheet();

  // Navigation handlers
  const navigation = useAppNavigation({
    setActiveTab: state.setActiveTab,
    setCurrentView: state.setCurrentView,
    setIsMenuOpen: state.setIsMenuOpen,
    setActiveChatId: state.setActiveChatId,
    setPreviousView: state.setPreviousView,
    currentView: state.currentView,
    isAuthenticated: state.isAuthenticated, // NEW: Pass auth status
    setIsAuthRequiredOpen: state.setIsAuthRequiredOpen, // NEW
    setAuthRequiredContext: state.setAuthRequiredContext, // NEW
    setIsExploreGroupsOpen: state.setIsExploreGroupsOpen, // NEW: For opening Explore Groups modal
    setRepublishData: state.setRepublishData, // NEW: For re-publish integration
    setPreselectedGroupId: state.setPreselectedGroupId, // NEW: Clear preselected group
  });

  // Simulate initial loading (reduced for faster perceived performance)
  useEffect(() => {
    const timer = setTimeout(() => state.setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // SuperAdmin hotkey: Shift + Alt + A
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.altKey && e.key === 'A') {
        // Check if already logged in as superadmin
        const session = getSession();
        startTransition(() => {
          if (session) {
            state.setCurrentView('superadmin-v2');
            toast.info('️ SuperAdmin Dashboard opened');
          } else {
            state.setCurrentView('admin-login');
            toast.info('️ SuperAdmin login required');
          }
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // SuperAdmin session guard: Redirect to login if accessing dashboard without session
  useEffect(() => {
    if (state.currentView === 'superadmin-v2') {
      const session = getSession();
      if (!session) {
        startTransition(() => {
          state.setCurrentView('admin-login');
          toast.error('Please log in to access SuperAdmin Dashboard');
        });
      }
    }
  }, [state.currentView]);

  // Apply visibility filtering - CANONICAL NATIVE
  const listings = useListings();
  const getListingById = useListingById();
  const { getSession, clearSession } = useSuperAdminSession();

  const { visibleListings } = useVisibleProducts({
    listings: listings,
    currentUser: currentUser,
  });

  // Filter management - CANONICAL NATIVE
  const filters = useAppFilters({
    visibleListings,
    searchQuery: state.searchQuery,
    filteredGroupId: state.filteredGroupId,
  });

  // Map-specific filtering: Use ONLY accessible listings
  const mapFilters = useAppFilters({
    visibleListings: visibleListings,
    searchQuery: state.searchQuery,
    filteredGroupId: state.filteredGroupId,
  });

  // Map filters are independent - no sync needed
  // Each view (home vs map) maintains its own filter state

  // Desktop filter sidebar state (shares logic with mobile FilterSheet)
  const desktopFilters = useFilterSheet(filters.activeFilters);

  // Badge counts for bottom nav - ONLY if authenticated
  const [unreadCount, setUnreadCount] = useState(0);

  // ✅ PHASE 3.5: Trail status management (minimal local state)
  const [trailStatuses, setTrailStatuses] = useState<Record<string, 'pending' | 'in-progress' | 'completed' | 'cancelled'>>({
    'trail-1': 'in-progress',
    'trail-2': 'pending',
    'trail-3': 'completed',
    'trail-4': 'completed',
  });

  // Update unread count periodically - ONLY if authenticated
  useEffect(() => {
    if (!state.isAuthenticated) {
      setUnreadCount(0);
      return;
    }

    const updateCount = () => setUnreadCount(getUnreadMessageCount());
    updateCount(); // Initial
    const interval = setInterval(updateCount, 3000); // Every 3s
    return () => clearInterval(interval);
  }, [state.currentView, state.isAuthenticated]); // Re-check when view or auth changes

  // Handlers
  const handleProductClick = async (productId: string) => {
    // ✅ CANONICAL: Find and use canonical listing directly
    const listing = await getListingById(productId);
    if (!listing) return;

    startTransition(() => {
      state.setPreviousView(state.currentView); // 🔒 Save origin before navigation
      state.setSelectedProduct(listing);
      state.setCurrentView("product-detail");
    });
  };

  const handleFilterClick = () => state.setIsFilterOpen(true);

  const handleApplyFilters = (newFilters: any) => {
    filters.handleApplyFilters(newFilters);
  };

  const handleClearFilters = () => {
    filters.clearAllFilters(state.setFilteredGroupId, state.setSearchQuery);
  };

  const handleSaveSearch = (currentFilters: FilterOptions) => {
    // Build price range string from filters
    let priceRange: string | undefined;
    if (currentFilters.minPrice || currentFilters.maxPrice) {
      if (currentFilters.minPrice && currentFilters.maxPrice) {
        priceRange = `${currentFilters.currency} ${currentFilters.minPrice}-${currentFilters.maxPrice}`;
      } else if (currentFilters.minPrice) {
        priceRange = `Over ${currentFilters.currency} ${currentFilters.minPrice}`;
      } else if (currentFilters.maxPrice) {
        priceRange = `Under ${currentFilters.currency} ${currentFilters.maxPrice}`;
      }
    }

    // Build saved search object
    const newSearch: Omit<SavedSearch, 'id' | 'createdAt' | 'notifyEnabled'> = {
      query: state.searchQuery || 'All listings',
      location: currentFilters.locationCity || 'All locations',
      priceRange,
    };

    // Save to localStorage (same key as DataContext)
    const STORAGE_KEY = 'listlyup_data_settings';
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const data = saved ? JSON.parse(saved) : { savedSearches: [], storage: {} };

      const savedSearch: SavedSearch = {
        ...newSearch,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        notifyEnabled: false,
      };

      data.savedSearches = [savedSearch, ...(data.savedSearches || [])];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

      toast.success('Search saved! Check Settings > Saved Searches');
      state.setIsFilterOpen(false); // Close filter sheet after saving
    } catch (error) {
      console.error('Failed to save search:', error);
      toast.error('Failed to save search');
    }
  };

  return (
    <ServiceProvider>
      <ProfileProvider>
        <FeaturesProvider>
          <GlobalActionModalProvider>
            {/* Toaster for notifications */}
            <Toaster position="top-center" richColors />
            {["profile", "settings", "messages"].includes(state.currentView) ? (
              <Suspense fallback={<LoadingFallback />}>
                <AppStandaloneRenderer
                  currentView={state.currentView as "profile" | "settings" | "messages"}
                  onNavigateToHome={navigation.navigateToHome}
                  onNavigateToChat={navigation.navigateToChat}
                />
              </Suspense>
            ) : state.currentView === "publish" ? (
              <Suspense fallback={<LoadingFallback />}>
                <PublishFlow
                  currentUser={mockCurrentUser}
                  initialData={
                    state.republishData
                      ? state.republishData // Re-publish with pre-filled data
                      : state.preselectedGroupId
                        ? {
                          selectedGroups: [state.preselectedGroupId],
                          lockedGroups: true,
                        }
                        : undefined
                  }
                  onClose={() => {
                    state.setPreselectedGroupId(null); // Clear context
                    state.setRepublishData(null); // Clear re-publish data
                    navigation.navigateToHome();
                  }}
                  onPublish={(data) => {
                    // TODO: Save to backend
                    state.setPreselectedGroupId(null); // Clear context
                    state.setRepublishData(null); // Clear re-publish data
                  }}
                />
              </Suspense>
            ) : state.currentView === "edit-listing" ? (
              <Suspense fallback={<LoadingFallback />}>
                <PublishFlow
                  mode="edit"
                  initialData={mockListingForEdit}
                  currentUser={mockCurrentUser}
                  onClose={() => {
                    navigation.navigateToHome();
                  }}
                  onPublish={(data) => {
                    // TODO: Update listing in backend
                    console.log('Listing updated:', data);
                  }}
                />
              </Suspense>
            ) : state.currentView === "sign-in" ? (
              <Suspense fallback={<LoadingFallback />}>
                <SignInPage
                  onBack={() => {
                    navigation.navigateToHome();
                    state.setIsMenuOpen(false);
                  }}
                  onSignIn={(email, password) => {
                    console.log('🔐 [SignIn] Handler called!');
                    console.log('🔐 [SignIn] Email:', email);
                    console.log('🔐 [SignIn] Password length:', password?.length || 0);
                    console.log('🔐 [SignIn] Calling verifyCredentials...');

                    // Verify credentials against mock database
                    const user = verifyCredentials(email, password);

                    console.log('🔐 [SignIn] verifyCredentials returned:', user);

                    if (!user) {
                      console.log('❌ [SignIn] Invalid credentials - BLOCKING LOGIN');
                      toast.error("Invalid email or password");
                      return;
                    }

                    console.log('✅ [SignIn] Valid credentials for:', user.name, '- Role:', user.role);

                    // Set authenticated state
                    state.setIsAuthenticated(true);

                    // If SuperAdmin, create SuperAdmin session
                    if (isSuperAdminUser(user)) {
                      console.log('⚡ [SignIn] SuperAdmin detected - creating session...');
                      storeSuperAdminSession({
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: 'super_admin',
                      });

                      // Add delay to ensure localStorage is written before navigation
                      setTimeout(() => {
                        console.log('✅ [SignIn] SuperAdmin session created');
                        toast.success(`Welcome back, ${user.name}!`, {
                          description: 'Authenticated as SuperAdmin',
                        });
                      }, 100);
                    } else {
                      toast.success(`Welcome back, ${user.name}!`);
                    }

                    // Navigate to home
                    navigation.navigateToHome();
                  }}
                  onSignUp={() => navigation.navigateToSignUp()}
                  onGoogleSignIn={() => {
                    setLoginMethod('google'); // Ana García - Free, Individual
                    state.setIsAuthenticated(true);
                    navigation.navigateToHome();
                    toast.success("Signed in with Google as Ana García!");
                  }}
                  onAppleSignIn={() => {
                    setLoginMethod('apple'); // Carlos Mendoza - Plus, Store
                    state.setIsAuthenticated(true);
                    navigation.navigateToHome();
                    toast.success("Signed in with Apple as Carlos Mendoza!");
                  }}
                  onFacebookSignIn={() => {
                    setLoginMethod('facebook'); // María López - Pro, Individual
                    state.setIsAuthenticated(true);
                    navigation.navigateToHome();
                    toast.success("Signed in with Facebook as María López!");
                  }}
                  onForgotPassword={() => {
                    toast.info("Password reset link sent to your email");
                  }}
                />
              </Suspense>
            ) : state.currentView === "sign-up" ? (
              <Suspense fallback={<LoadingFallback />}>
                <SignUpPage
                  onBack={() => {
                    navigation.navigateToHome();
                    state.setIsMenuOpen(false);
                  }}
                  onSignUp={(data) => {
                    // TODO: Implement actual registration
                    state.setIsAuthenticated(true);
                    navigation.navigateToHome();
                    toast.success("Account created successfully!");
                  }}
                  onSignIn={() => navigation.navigateToSignIn()}
                  onGoogleSignUp={() => {
                    state.setIsAuthenticated(true);
                    navigation.navigateToHome();
                    toast.success("Signed up with Google!");
                  }}
                  onAppleSignUp={() => {
                    state.setIsAuthenticated(true);
                    navigation.navigateToHome();
                    toast.success("Signed up with Apple!");
                  }}
                  onFacebookSignUp={() => {
                    state.setIsAuthenticated(true);
                    navigation.navigateToHome();
                    toast.success("Signed up with Facebook!");
                  }}
                />
              </Suspense>
            ) : state.currentView === "admin-login" ? (
              <Suspense fallback={<LoadingFallback />}>
                <AdminLoginPage
                  onSuccess={() => {
                    console.log('🎯 [App] AdminLoginPage onSuccess called');

                    // Add a small delay to ensure localStorage is written
                    setTimeout(() => {
                      const session = getSuperAdminSession();
                      console.log('🎯 [App] session after delay:', session);

                      if (session) {
                        console.log('✅ [App] Valid session found, authenticating...');
                        state.setIsAuthenticated(true);
                        setLoginMethod('superadmin');
                        state.setCurrentView('superadmin-v2');
                        toast.success(`Authenticated as ${session.name}`);
                      } else {
                        console.error('❌ [App] No session found after login - localStorage may be blocked');
                        toast.error('Authentication failed - please check browser settings');
                        // Stay on login page
                      }
                    }, 100); // 100ms delay to ensure localStorage sync
                  }}
                />
              </Suspense>
            ) : state.currentView === "superadmin-v2" ? (
              <Suspense fallback={<LoadingFallback />}>
                <SuperAdminDashboard
                  userName={getSession()?.name}
                  onLogout={() => {
                    clearSession();
                    state.setIsAuthenticated(false);
                    clearUser();
                    toast.success('Logged out successfully');
                    state.setCurrentView('admin-login');
                  }}
                  onBackToApp={() => {
                    state.setCurrentView('home');
                  }}
                />
              </Suspense>
            ) : state.currentView === "help-support" ? (
              <Suspense fallback={<LoadingFallback />}>
                <HelpSupportPage
                  onBack={() => {
                    // ✅ PHASE 3.1: Back from Help & Support respects previousView
                    if (state.previousView && state.previousView !== 'home') {
                      startTransition(() => {
                        state.setCurrentView(state.previousView);
                        state.setPreviousView(null);
                      });
                    } else {
                      navigation.navigateToHome();
                    }
                  }}
                />
              </Suspense>
            ) : state.currentView === "group-report-detail" ? (
              <Suspense fallback={<LoadingFallback />}>
                <GroupReportDetailPage
                  reportId={state.selectedGroupReportId}
                  onBack={() => {
                    startTransition(() => {
                      state.setCurrentView(state.previousView || "action-center");
                      state.setPreviousView(null);
                      state.setSelectedGroupReportId(null);
                    });
                  }}
                />
              </Suspense>
            ) : state.currentView === "platform-report-detail" ? (
              <Suspense fallback={<LoadingFallback />}>
                <PlatformReportDetailPage
                  reportId={state.selectedPlatformReportId}
                  onBack={() => {
                    startTransition(() => {
                      state.setCurrentView(state.previousView || "action-center");
                      state.setPreviousView(null);
                      state.setSelectedPlatformReportId(null);
                    });
                  }}
                />
              </Suspense>
            ) : state.currentView === "user-issue-detail" ? (
              <Suspense fallback={<LoadingFallback />}>
                <UserIssueDetailPage
                  issueId={state.selectedUserIssueId}
                  onBack={() => {
                    startTransition(() => {
                      state.setCurrentView(state.previousView || "action-center");
                      state.setPreviousView(null);
                      state.setSelectedUserIssueId(null);
                    });
                  }}
                />
              </Suspense>
            ) : state.currentView === "report-detail" ? (
              <Suspense fallback={<LoadingFallback />}>
                <ReportDetailPage
                  reportId={state.selectedReportId}
                  onBack={() => {
                    startTransition(() => {
                      state.setCurrentView(state.previousView || "notifications");
                      state.setPreviousView(null);
                      state.setSelectedReportId(null);
                    });
                  }}
                />
              </Suspense>
            ) : state.currentView === "billing" ? (
              <Suspense fallback={<LoadingFallback />}>
                <BillingPage
                  onBack={() => navigation.navigateToHome()}
                  user={{
                    id: mockCurrentUser.id,
                    name: mockCurrentUser.name,
                    email: mockCurrentUser.email,
                    plan: (mockCurrentUser.plan?.charAt(0).toUpperCase() + mockCurrentUser.plan?.slice(1)) as 'Free' | 'Plus' | 'Pro',
                  }}
                />
              </Suspense>
            ) : state.currentView === "statistics" ? (
              <Suspense fallback={<LoadingFallback />}>
                <StatisticsPage
                  onBack={() => navigation.navigateToHome()}
                  user={{
                    id: mockCurrentUser.id,
                    name: mockCurrentUser.name,
                    email: mockCurrentUser.email,
                    plan: (mockCurrentUser.plan?.charAt(0).toUpperCase() + mockCurrentUser.plan?.slice(1)) as 'Free' | 'Plus' | 'Pro',
                  }}
                />
              </Suspense>
            ) : state.currentView === "action-center" ? (
              <Suspense fallback={<LoadingFallback />}>
                <ActionCenterPage
                  onBack={() => navigation.navigateToHome()}
                  onChatClick={(chatId) => navigation.navigateToChat(chatId)}
                  onContinueDraft={(draftId) => navigation.navigateToPublish(draftId)}
                  onViewListing={(listingId) => {
                    startTransition(() => {
                      const canonical = canonicalListings.find(l => l.id === listingId);
                      if (canonical) {
                        state.setSelectedProduct(canonical);
                        state.setCurrentView("product-detail");
                      } else {
                        toast.error('Listing not found');
                      }
                    });
                  }}
                  onReviewGroupReport={(reportId) => {
                    startTransition(() => {
                      state.setPreviousView(state.currentView);
                      state.setSelectedGroupReportId(reportId);
                      state.setCurrentView("group-report-detail");
                    });
                  }}
                  onReviewPlatformReport={(reportId) => {
                    startTransition(() => {
                      state.setPreviousView(state.currentView);
                      state.setSelectedReportId(reportId); // ✅ VD-1: Changed to use unified report-detail view
                      state.setCurrentView("report-detail");
                    });
                  }}
                  onReviewUserIssue={(issueId) => {
                    startTransition(() => {
                      state.setPreviousView(state.currentView);
                      state.setSelectedUserIssueId(issueId);
                      state.setCurrentView("user-issue-detail");
                    });
                  }}
                  onReviewFlaggedListing={(listingId) => {
                    startTransition(() => {
                      const canonical = canonicalListings.find(l => l.id === listingId);
                      if (canonical) {
                        state.setPreviousView(state.currentView);
                        state.setSelectedProduct(canonical);
                        state.setCurrentView("product-detail");
                      } else {
                        toast.info("Listing details coming soon.");
                      }
                    });
                  }}
                />
              </Suspense>
            ) : state.currentView === "notifications" ? (
              <Suspense fallback={<LoadingFallback />}>
                <NotificationsPage
                  onBack={() => navigation.navigateToHome()}
                  onChatClick={(chatId) => navigation.navigateToChat(chatId)}
                  onViewProduct={(productId) => {
                    const canonical = canonicalListings.find(l => l.id === productId);
                    if (canonical) {
                      state.setPreviousView(state.currentView);
                      state.setSelectedProduct(canonical);
                      state.setCurrentView("product-detail");
                    } else {
                      toast.error("Listing not found");
                    }
                  }}
                  onViewReport={(reportId) => {
                    state.setPreviousView(state.currentView);
                    state.setSelectedReportId(reportId);
                    state.setCurrentView("report-detail");
                  }}
                />
              </Suspense>
            ) : state.currentView === "chat-conversation" ? (
              <Suspense fallback={<LoadingFallback />}>
                <ChatConversationPage
                  chatId={state.activeChatId}
                  onBack={() => navigation.navigateBackFromChat(state.previousView)}
                  onViewProduct={(productId) => {
                    startTransition(() => {
                      const canonical = canonicalListings.find(l => l.id === productId);
                      if (canonical) {
                        state.setPreviousView(state.currentView);
                        state.setSelectedProduct(canonical);
                        state.setCurrentView("product-detail");
                      } else {
                        toast.error('Listing not found');
                      }
                    });
                  }}
                />
              </Suspense>
            ) : (
              <div className="h-screen bg-background flex flex-col max-w-[480px] lg:max-w-[1280px] mx-auto relative overflow-x-hidden w-full">
                {state.currentView === "product-detail" && state.selectedProduct ? (
                  <Suspense fallback={<LoadingFallback />}>
                    <ProductDetailPage
                      product={state.selectedProduct}
                      productImage={state.selectedProduct.primary_image_url}
                      onBack={() => {
                        // ✅ Respect navigation origin - return to source view
                        if (state.previousView === "group-detail") {
                          startTransition(() => {
                            state.setCurrentView("group-detail");
                            state.setPreviousView(null); // 🔒 Clear to prevent stuck navigation
                          });
                        } else if (state.previousView === "my-listings") {
                          startTransition(() => {
                            state.setCurrentView("my-listings");
                            state.setPreviousView(null); // 🔒 Clear to prevent stuck navigation
                          });
                        } else {
                          navigation.navigateToHome();
                        }
                      }}
                      isOwner={state.isAuthenticated && state.selectedProduct.owner_user_id === currentUser?.id} // Use currentUser safely
                      isAuthenticated={state.isAuthenticated} // NEW: Pass auth status
                      onAuthRequired={(context) => {
                        state.setAuthRequiredContext(context);
                        state.setIsAuthRequiredOpen(true);
                      }} // NEW: Auth gate handler
                      onNavigateToHome={(filterParams) => {
                        startTransition(() => {
                          if (filterParams?.groupId) {
                            state.setFilteredGroupId(filterParams.groupId);
                            filters.setActiveFilters({
                              ...filters.activeFilters,
                              groupsScope: "specific",
                              specificGroups: [filterParams.groupId],
                            });
                          }
                          state.setCurrentView("home");
                        });
                      }}
                      onNavigateToChat={(chatId) => {
                        navigation.navigateToChat(chatId); // Use the navigation function that saves previousView
                      }}
                      allProducts={filters.filteredAndSortedListings || []}
                      onNavigateToProduct={(productId) => {
                        // Navigate to another listing from RelatedProducts
                        const canonical = canonicalListings.find((l) => l.id === productId);
                        if (canonical) {
                          startTransition(() => {
                            state.setSelectedProduct(canonical);
                            // Keep currentView as "product-detail" to stay in the same view
                            // The component will re-render with the new product
                          });
                        }
                      }}
                    />
                  </Suspense>
                ) : state.currentView === "group-detail" && state.selectedGroupId ? (
                  <Suspense fallback={<LoadingFallback />}>
                    <GroupDetailPage
                      groupId={state.selectedGroupId}
                      initialUserRole={state.selectedGroupRole}
                      allProducts={canonicalListings}
                      onBack={() => {
                        startTransition(() => {
                          state.setCurrentView("groups");
                          state.setSelectedGroupId(null);
                        });
                      }}
                      activeTab={state.activeTab}
                      onTabChange={navigation.handleTabChange}
                      onNavigateToProducts={(groupId) => {
                        state.setFilteredGroupId(groupId);
                        navigation.navigateToHome();
                        toast.success(`Viewing products from this group`);
                      }}
                      onProductClick={(productId) => {
                        const canonical = canonicalListings.find((l) => l.id === productId);
                        if (canonical) {
                          startTransition(() => {
                            state.setPreviousView(state.currentView);
                            state.setSelectedProduct(canonical);
                            state.setCurrentView("product-detail");
                          });
                        }
                      }}
                      onViewMemberProducts={(memberId) => {
                        // TODO: Home debe soportar filtro combinado groupId + userId
                        // Por ahora, filtrar solo por grupo (feature incremental)
                        state.setFilteredGroupId(state.selectedGroupId);
                        navigation.navigateToHome();
                        toast.info(`Viewing products in this group (member filter pending)`);
                      }}
                      onPublishToGroup={(groupId) => {
                        startTransition(() => {
                          state.setPreselectedGroupId(groupId); // Save context
                          state.setCurrentView("publish");
                        });
                      }}
                      onNavigateToChat={(chatId) => {
                        // ✅ DUAL FLOW: Navigate to moderation chat from Group Detail
                        startTransition(() => {
                          state.setActiveChatId(chatId);
                          state.setCurrentView("chat-conversation");
                        });
                      }}
                      isPlatformAdmin={true} // ✅ DUAL FLOW T6: Mock platform admin flag
                    />
                  </Suspense>
                ) : state.currentView === "map" ? (
                  <Suspense fallback={<LoadingFallback />}>
                    <MapView
                      products={mapFilters.filteredAndSortedListings || []}
                      onBack={() => navigation.navigateToHome()}
                      logo={imgLogo}
                      notificationCount={9}
                      onNotificationClick={navigation.navigateToNotifications}
                      onFilterClick={handleFilterClick}
                      searchQuery={state.searchQuery}
                      onSearchChange={state.setSearchQuery}
                      hasActiveFilters={filters.hasActiveFilters}
                      activeTab={state.activeTab}
                      onTabChange={navigation.handleTabChange}
                      onProductClick={handleProductClick}
                      filters={mapFilters.activeFilters}
                      onFiltersChange={mapFilters.setActiveFilters}
                    />
                  </Suspense>
                ) : state.currentView === "my-listings" ? (
                  <Suspense fallback={<LoadingFallback />}>
                    <MyListingsPage
                      onBack={() => {
                        navigation.navigateToHome();
                      }}
                      activeTab={state.activeTab}
                      onTabChange={navigation.handleTabChange}
                      onNavigateToDetail={handleProductClick}
                      onEditListing={navigation.navigateToEditListing}
                      listings={canonicalListings
                        .filter(l => l.owner_user_id === currentUser?.id)
                        .map(l => ({
                          id: l.id,
                          title: l.title,
                          type: l.listing_type,
                          offerType: l.offer_mode,
                          price: l.price_amount ? `${l.price_amount} ${l.price_currency || 'USD'}` : 'Free',
                          location: '', // TODO: Resolve location via listing_location_id
                          thumbnail: l.primary_image_url || '',
                          username: currentUser?.username || '',
                          lifecycle: l.status as 'active' | 'paused' | 'draft' | 'expired' | 'archived' | 'sold',
                          visibility: (l.visibility_mode === 'groups_only' ? 'groups' : 'public') as 'public' | 'private' | 'groups',
                          groupIds: [], // TODO: Fetch from listing_groups table
                          stats: { views: 0, messages: 0, likes: 0 },
                          createdAt: new Date(l.created_at),
                          updatedAt: new Date(l.updated_at),
                          // Runtime fields - would come from backend in real app
                          hasUnreadMessages: false,
                          messageType: undefined,
                          lastMessagePreview: undefined,
                          lastMessageFrom: undefined,
                          lastMessageAt: undefined,
                          isReported: false,
                          reportReason: undefined,
                          reportDetails: undefined,
                          reportedBy: undefined,
                          reportedAt: undefined,
                          daysUntilExpiration: undefined,
                          expiresAt: undefined,
                        }))}
                    />
                  </Suspense>
                ) : state.currentView === "groups" ? (
                  <Suspense fallback={<LoadingFallback />}>
                    <MyGroupsPage
                      onBack={() => {
                        navigation.navigateToHome();
                      }}
                      activeTab={state.activeTab}
                      onTabChange={navigation.handleTabChange}
                      isAuthenticated={state.isAuthenticated}
                      onAuthRequired={(context) => {
                        state.setAuthRequiredContext(context);
                        state.setIsAuthRequiredOpen(true);
                      }}
                      onGroupClick={(groupId, userRole) => {
                        startTransition(() => {
                          state.setSelectedGroupId(groupId);
                          state.setSelectedGroupRole(userRole);
                          state.setCurrentView("group-detail");
                        });
                      }}
                    />
                  </Suspense>
                ) : state.currentView === "saved-items" ? (
                  <Suspense fallback={<LoadingFallback />}>
                    <SavedItemsPage
                      onBack={() => {
                        navigation.navigateToHome();
                      }}
                      onProductClick={handleProductClick}
                      activeTab={state.activeTab}
                      onTabChange={navigation.handleTabChange}
                    />
                  </Suspense>
                ) : state.currentView === "my-trail" ? (
                  <Suspense fallback={<LoadingFallback />}>
                    <MyTrailPage
                      onBack={() => navigation.navigateToHome()}
                      onNavigateToDetail={(listingId) => {
                        const canonical = canonicalListings.find(l => l.id === listingId);
                        if (canonical) {
                          state.setPreviousView(state.currentView);
                          state.setSelectedProduct(canonical);
                          state.setCurrentView('product-detail');
                        } else {
                          toast.info('Listing details coming soon.');
                        }
                      }}
                      onRepublish={(listingId) => {
                        // Get trail listing data
                        const trailListings = getTrailListings();
                        const listing = trailListings.find(l => l.id === listingId);
                        if (listing) {
                          // Convert to PublishFormData
                          const publishData = trailListingToPublishFormData(listing);
                          // Navigate to PublishFlow with pre-filled data
                          navigation.navigateToPublishWithData(publishData);
                        }
                      }}
                    />
                  </Suspense>
                ) : state.currentView === "campaigns" ? (
                  <Suspense fallback={<LoadingFallback />}>
                    <CampaignsPage
                      onBack={() => navigation.navigateToHome()}
                      onCreateCampaign={() => state.setIsCampaignCreateOpen(true)}
                      onCampaignClick={(campaignId) => {
                        state.setSelectedCampaignId(campaignId);
                        navigation.navigateToCampaignDetail(campaignId);
                      }}
                    />
                  </Suspense>
                ) : state.currentView === "campaign-detail" && state.selectedCampaignId ? (
                  <Suspense fallback={<LoadingFallback />}>
                    <CampaignDetailPage
                      campaignId={state.selectedCampaignId}
                      onBack={() => navigation.navigateToCampaigns()}
                      onEdit={() => state.setIsCampaignCreateOpen(true)}
                      onViewListing={(listingId) => {
                        // Navigate to listing detail
                        startTransition(() => {
                          const canonical = canonicalListings.find(l => l.id === listingId);
                          if (canonical) {
                            state.setSelectedProduct(canonical);
                            state.setCurrentView("product-detail");
                          } else {
                            toast.error('Listing not found');
                          }
                        });
                      }}
                    />
                  </Suspense>
                ) : state.currentView === "events-hub" ? (
                  <Suspense fallback={<LoadingFallback />}>
                    <EventsHubPage
                      onBack={() => navigation.navigateToHome()}
                      onCreateEventHub={() => navigation.navigateToCreateEventHub()}
                      onEventHubClick={(eventHubId) => {
                        state.setSelectedEventHubId(eventHubId);
                        navigation.navigateToEventHubDetail(eventHubId);
                      }}
                    />
                  </Suspense>
                ) : state.currentView === "event-hub-detail" && state.selectedEventHubId ? (
                  <Suspense fallback={<LoadingFallback />}>
                    <EventHubDetailPage
                      eventHubId={state.selectedEventHubId}
                      onBack={() => navigation.navigateToEventsHub()}
                      onEdit={() => navigation.navigateToCreateEventHub()}
                      onViewFlyer={(flyerId) => {
                        // Navigate to event listing detail
                        startTransition(() => {
                          const canonical = canonicalListings.find(l => l.id === flyerId);
                          if (canonical) {
                            state.setSelectedProduct(canonical);
                            state.setCurrentView("product-detail");
                          } else {
                            toast.error('Event flyer not found');
                          }
                        });
                      }}
                      onViewListing={(listingId) => {
                        // Navigate to listing detail
                        startTransition(() => {
                          const canonical = canonicalListings.find(l => l.id === listingId);
                          if (canonical) {
                            state.setSelectedProduct(canonical);
                            state.setCurrentView("product-detail");
                          } else {
                            toast.error('Listing not found');
                          }
                        });
                      }}
                    />
                  </Suspense>
                ) : state.currentView === "create-event-hub" ? (
                  <Suspense fallback={<LoadingFallback />}>
                    <CreateEventHubFlow
                      onBack={() => navigation.navigateToEventsHub()}
                      onComplete={() => navigation.navigateToEventsHub()}
                      onCreateEventListing={() => {
                        toast.info('Redirecting to Publish Flow (Event listing)...');
                        // TODO: Open Publish Flow with type=event pre-selected
                        navigation.navigateToPublishFlow();
                      }}
                    />
                  </Suspense>
                ) : (
                  <>
                    {/* Status bar removed - PWA/WebView mobile */}

                    <Header
                      logo={imgLogo}
                      notificationCount={state.isAuthenticated ? 9 : 0} // Only show if authenticated
                      onNotificationClick={navigation.navigateToNotifications}
                      searchValue={state.searchQuery}
                      onSearchChange={state.setSearchQuery}
                      searchPlaceholder="Search products..."
                      onMapViewClick={navigation.navigateToMap}
                      isMapView={false}
                    />

                    <SearchBar
                      onMapViewClick={navigation.navigateToMap}
                      filters={filters.activeFilters}
                      onFiltersChange={(newFilters) => {
                        if (newFilters.groupsScope === "all" && filters.activeFilters.groupsScope !== "all") {
                          state.setFilteredGroupId(null);
                        }
                        filters.applyFilters(newFilters);
                      }}
                      onFilterClick={() => state.setIsFilterOpen(true)}
                      hasActiveFilters={filters.hasActiveFilters}
                    />

                    {/* Desktop Layout: Sidebar + Content */}
                    <div className="flex-1 flex overflow-hidden">
                      {/* Desktop Filter Sidebar - hidden on mobile */}
                      <FilterSidebar
                        className="hidden lg:block"
                        filters={desktopFilters.filters}
                        openSections={desktopFilters.openSections}
                        onToggleSection={desktopFilters.toggleSection}
                        onUpdateFilters={(updates) => {
                          desktopFilters.setFilters({ ...desktopFilters.filters, ...updates });
                        }}
                        onReset={() => {
                          desktopFilters.handleReset();
                          state.setFilteredGroupId(null);
                          // Reset will update desktopFilters.filters via handleReset
                          // We need to apply the default filters after reset completes
                          setTimeout(() => {
                            filters.clearFilters();
                          }, 0);
                        }}
                        onApply={() => {
                          filters.applyFilters(desktopFilters.filters);
                          // Sync: When filters are applied, update the desktop sidebar's internal state
                          // This ensures the sidebar reflects the currently active filters
                        }}
                      />

                      {/* Main Content Area */}
                      <main className="flex-1 p-2 pb-20 lg:p-4 lg:pb-4 overflow-auto">
                        {state.isLoading ? (
                          <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2 lg:gap-4">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                              <div key={i}>
                                <ProductCardSkeleton />
                              </div>
                            ))}
                          </div>
                        ) : (
                          <>
                            <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2 lg:gap-4 animate-in fade-in duration-500">
                              {(filters.filteredAndSortedListings || []).map((listing, index) => (
                                <div
                                  key={listing.id}
                                  className="animate-in fade-in slide-in-from-bottom-4"
                                  style={{ animationDelay: `${index * 50}ms`, animationFillMode: "backwards" }}
                                >
                                  <ProductCard
                                    id={listing.id}
                                    image={listing.primary_image_url || ''}
                                    title={listing.title}
                                    price={listing.price_amount ? `${listing.price_amount} ${listing.price_currency || 'USD'}` : undefined}
                                    condition={listing.condition}
                                    visibility={listing.visibility_mode === 'groups_only' ? 'group' : 'public'}
                                    location={listing.location_name} // TODO: Resolve via listing_location_id
                                    ownerName={listing.owner_user?.name}
                                    type={listing.listing_type === 'product' ? listing.offer_mode : listing.listing_type}
                                    eventDate={listing.start_date}
                                    eventEndDate={listing.end_date}
                                    eventTime={listing.event_time_text} S
                                    eventTimeEnd={undefined} // Not in canonical contract
                                    pricingModel={listing.pricing_model}
                                    ticketType={listing.ticket_type}
                                    duration={listing.event_duration_type === 'multi_day' ? 'multi' : 'single'}
                                    onClick={() => handleProductClick(listing.id)}
                                  />
                                </div>
                              ))}
                            </div>

                            {(filters.filteredAndSortedListings?.length || 0) === 0 && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                className="flex flex-col items-center justify-center py-16 px-6"
                              >
                                <div className="w-24 h-24 mb-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                  <SearchX className="w-12 h-12 text-muted-foreground" />
                                </div>

                                <h3 className="text-xl font-semibold text-foreground mb-2">
                                  No products found
                                </h3>

                                <p className="text-sm text-muted-foreground text-center mb-6">
                                  Try adjusting your filters or search terms
                                </p>

                                {filters.hasActiveFilters && (
                                  <motion.button
                                    onClick={handleClearFilters}
                                    className="px-6 py-2.5 bg-primary text-white rounded-xl font-medium hover:shadow-lg hover:shadow-primary/30 transition-all"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    Clear Filters
                                  </motion.button>
                                )}
                              </motion.div>
                            )}
                          </>
                        )}
                      </main>
                    </div>

                    <BottomNav
                      activeTab={state.activeTab}
                      onTabChange={navigation.handleTabChange}
                      badges={{ messages: unreadCount || undefined }}
                    />
                  </>
                )}

                <Suspense fallback={<LoadingFallback />}>
                  <ProductModal
                    product={state.selectedProduct}
                    isOpen={state.isModalOpen}
                    onClose={() => state.setIsModalOpen(false)}
                    productImage={state.selectedProduct?.primary_image_url || imgProductImage}
                    onNavigateToGroup={(groupId, groupName) => {
                      state.setFilteredGroupId(groupId);
                      filters.setActiveFilters({
                        ...filters.activeFilters,
                        groupsScope: "specific",
                        specificGroups: [groupId],
                      });
                      toast.success(`Viewing products from ${groupName}`);
                    }}
                  />
                </Suspense>

                <FilterSheet
                  isOpen={state.isFilterOpen}
                  onClose={() => state.setIsFilterOpen(false)}
                  onApplyFilters={handleApplyFilters}
                  currentFilters={filters.activeFilters}
                  onResetFilters={() => {
                    state.setFilteredGroupId(null);
                  }}
                  searchQuery={state.searchQuery}
                  onSaveSearch={handleSaveSearch}
                />

                <MenuSheet
                  open={state.isMenuOpen}
                  onOpenChange={state.setIsMenuOpen}
                  isAuthenticated={state.isAuthenticated}
                  isAdmin={true}
                  isModerator={false}
                  adminPendingCount={15}
                  user={{
                    name: (console.log('🎨 [App] Rendering MenuSheet with currentUser:', currentUser), currentUser?.name || 'Guest'),
                    email: currentUser?.email || '',
                    avatarUrl: currentUser?.avatarUrl,
                    plan: currentUser?.plan || 'free',
                    isVerified: currentUser?.isVerified || false,
                  }}
                  onSettingsClick={navigation.navigateToSettings}
                  onProfileClick={navigation.navigateToProfile}
                  onAdminDashboardClick={navigation.navigateToAdminDashboard}
                  onSuperAdminClick={() => {
                    console.log('🔐 [App] SuperAdmin click - checking session...');
                    const session = getSuperAdminSession();
                    if (session) {
                      console.log('✅ [App] Session found, navigating to dashboard');
                      state.setCurrentView('superadmin-v2');
                    } else {
                      console.log('❌ [App] No session, navigating to login');
                      state.setCurrentView('admin-login');
                    }
                  }}
                  onMyListingsClick={navigation.navigateToMyListings}
                  onMyGroupsClick={navigation.navigateToGroups}
                  onMyTrailClick={navigation.navigateToMyTrail}
                  onCampaignsClick={navigation.navigateToCampaigns}
                  onEventsClick={navigation.navigateToEventsHub}
                  onOrganizationClick={() => toast.info("Opening My Organization")}
                  onFavoritesClick={navigation.navigateToSavedItems}
                  onMessagesClick={navigation.navigateToMessages}
                  onNotificationsClick={navigation.navigateToNotifications}
                  onSubscriptionClick={navigation.navigateToBilling}
                  onStatisticsClick={navigation.navigateToStatistics}
                  onActionCenterClick={navigation.navigateToActionCenter}
                  onHelpSupportClick={navigation.navigateToHelpSupport} // ✅ PHASE 3.1: Help & Support
                  onSignInClick={navigation.navigateToSignIn}
                  onSignUpClick={navigation.navigateToSignUp}
                  onBackToHome={navigation.navigateToHome}
                  onLogoutClick={() => {
                    state.setIsMenuOpen(false);
                    state.setIsAuthenticated(false);
                    clearUser(); // Clear user state on logout
                    clearSuperAdminSession(); // Clear superadmin session if exists
                    toast.success("Logged out successfully");
                  }}
                />

                {/* AuthRequiredSheet - NEW */}
                <AuthRequiredSheet
                  open={state.isAuthRequiredOpen}
                  onOpenChange={state.setIsAuthRequiredOpen}
                  context={state.authRequiredContext}
                  onSignUp={navigation.navigateToSignUp}
                  onSignIn={navigation.navigateToSignIn}
                />

                <Suspense fallback={<LoadingFallback />}>
                  <SuperAdminPanel
                    open={state.isSuperAdminOpen}
                    onOpenChange={state.setIsSuperAdminOpen}
                  />
                </Suspense>

                {/* Share Button - Floating */}
                {state.currentView === "product-detail" && state.selectedProduct && (
                  <motion.button
                    onClick={() => state.setIsShareSheetOpen(true)}
                    className="fixed bottom-24 right-6 z-[999] w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-full shadow-lg flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      right: 'max(24px, calc((100vw - 480px) / 2 + 24px))'
                    }}
                  >
                    <Share2 className="w-6 h-6" />
                  </motion.button>
                )}

                {/* ShareSheet - NO lazy loading */}
                {state.currentView === "product-detail" && state.selectedProduct && (
                  <ShareSheet
                    open={state.isShareSheetOpen}
                    onOpenChange={state.setIsShareSheetOpen}
                    product={{
                      id: state.selectedProduct.id,
                      title: state.selectedProduct.title,
                      price: state.selectedProduct.price_amount && state.selectedProduct.price_currency
                        ? `${state.selectedProduct.price_amount} ${state.selectedProduct.price_currency}`
                        : 'Price not available',
                      location: 'Location not available', // TODO: Resolve from listing_location_id
                      image: state.selectedProduct.primary_image_url || '',
                      rating: undefined, // Not in canonical model
                      type: state.selectedProduct.listing_type === 'product'
                        ? state.selectedProduct.offer_mode
                        : state.selectedProduct.listing_type,
                    }}
                    isOwner={state.selectedProduct.owner_user_id === mockCurrentUser.id}
                    username={mockCurrentUser.username || 'user123'}
                    sellerName={undefined} // TODO: Resolve from owner_user_id
                    sellerAvatar={undefined} // TODO: Resolve from owner_user_id
                  />
                )}

                {/* ExploreGroupsSheet - For non-authenticated users */}
                <Suspense fallback={null}>
                  <ExploreGroupsSheet
                    open={state.isExploreGroupsOpen}
                    onOpenChange={state.setIsExploreGroupsOpen}
                    isAuthenticated={state.isAuthenticated}
                    onGroupClick={(groupId, userRole) => {
                      startTransition(() => {
                        state.setSelectedGroupId(groupId);
                        state.setSelectedGroupRole(userRole);
                        state.setCurrentView("group-detail");
                        state.setIsExploreGroupsOpen(false);
                      });
                    }}
                  />
                </Suspense>

                {/* Trail Detail Sheet */}
                {state.selectedTrailId && (
                  <Suspense fallback={null}>
                    <TrailDetailSheet
                      open={state.isTrailDetailOpen}
                      onOpenChange={state.setIsTrailDetailOpen}
                      trailId={state.selectedTrailId}
                      status={trailStatuses[state.selectedTrailId]}
                      onViewProduct={() => {
                        state.setIsTrailDetailOpen(false);
                        // ✅ PHASE 3.5: Navigate to ProductDetailPage using canonical pattern
                        // Map trail-1 to existing product (Laptop Stand = uer-1)
                        const productId = 'uer-1'; // Mock: Map trail transaction to actual product
                        const canonical = canonicalListings.find((l) => l.id === productId);

                        if (!canonical) {
                          toast.error('Listing not found');
                          return;
                        }

                        startTransition(() => {
                          state.setPreviousView(state.currentView);
                          state.setSelectedProduct(canonical);
                          state.setCurrentView('product-detail');
                        });
                      }}
                      onOpenChat={() => {
                        state.setIsTrailDetailOpen(false);
                        // ✅ PHASE 2.4: Replace toast stub with actual chat navigation
                        navigation.navigateToChat('chat-1'); // Use first chat as deterministic default
                      }}
                      onMarkCompleted={() => {
                        // ✅ PHASE 3.5: Mark transaction as completed
                        if (state.selectedTrailId) {
                          setTrailStatuses(prev => ({
                            ...prev,
                            [state.selectedTrailId!]: 'completed'
                          }));
                          toast.success('Marked as completed');
                          state.setIsTrailDetailOpen(false);
                        }
                      }}
                    />
                  </Suspense>
                )}

                {/* Campaign Create/Edit Sheet */}
                <Suspense fallback={null}>
                  <CreateEditCampaignSheet
                    open={state.isCampaignCreateOpen}
                    onOpenChange={state.setIsCampaignCreateOpen}
                    mode={state.selectedCampaignId ? 'edit' : 'create'}
                    campaignId={state.selectedCampaignId || undefined}
                  />
                </Suspense>
              </div>
            )}

            {/* Global Report Sheet */}
            <ReportSheet
              open={reportSheet.isOpen}
              onOpenChange={reportSheet.close}
            />

            {/* Developer Tools - Only in development */}
            <DevTools />
          </GlobalActionModalProvider>
        </FeaturesProvider>
      </ProfileProvider>
    </ServiceProvider>
  );
}