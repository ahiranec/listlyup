import { startTransition } from 'react';
import { toast } from 'sonner@2.0.3';
import type { NavigationTab, ViewType } from '../types';
import type { AuthRequiredContext } from '../components/AuthRequiredSheet';
import type { PublishFormData } from '../components/publish/types';

interface UseAppNavigationProps {
  setActiveTab: (tab: NavigationTab) => void;
  setCurrentView: (view: string) => void;
  setIsMenuOpen: (open: boolean) => void;
  setActiveChatId?: (chatId: string) => void;
  setPreviousView?: (view: ViewType) => void; // NEW: Track navigation history
  currentView?: ViewType; // NEW: To know where we are
  isAuthenticated?: boolean; // NEW: Check auth status
  setIsAuthRequiredOpen?: (open: boolean) => void; // NEW: Open auth gate
  setAuthRequiredContext?: (context: AuthRequiredContext) => void; // NEW: Set auth context
  setIsExploreGroupsOpen?: (open: boolean) => void; // NEW: Open Explore Groups modal for non-authenticated users
  setRepublishData?: (data: Partial<PublishFormData> | null) => void; // NEW: Set re-publish data
  setPreselectedGroupId?: (groupId: string | null) => void; // NEW: Clear preselected group
}

/**
 * Custom hook to handle app navigation logic
 * Centralizes all navigation-related handlers
 * Uses startTransition to prevent suspense errors with lazy-loaded components
 */
export function useAppNavigation({
  setActiveTab,
  setCurrentView,
  setIsMenuOpen,
  setActiveChatId,
  setPreviousView,
  currentView,
  isAuthenticated = true,
  setIsAuthRequiredOpen,
  setAuthRequiredContext,
  setIsExploreGroupsOpen,
  setRepublishData,
  setPreselectedGroupId,
}: UseAppNavigationProps) {
  
  const handleTabChange = (tab: NavigationTab) => {
    startTransition(() => {
      setActiveTab(tab);
      
      if (tab === 'home') {
        setCurrentView('home');
      } else if (tab === 'publish') {
        // Auth gate: Publish requires login
        if (!isAuthenticated) {
          if (setIsAuthRequiredOpen && setAuthRequiredContext) {
            setAuthRequiredContext('publish');
            setIsAuthRequiredOpen(true);
          }
          return;
        }
        setCurrentView('publish');
      } else if (tab === 'products') {
        // Auth gate: My Listings requires login
        if (!isAuthenticated) {
          if (setIsAuthRequiredOpen && setAuthRequiredContext) {
            setAuthRequiredContext('publish'); // Use publish context since it's about listings
            setIsAuthRequiredOpen(true);
          }
          return;
        }
        setCurrentView('my-listings');
      } else if (tab === 'groups') {
        // Differentiate: Explore Groups (public) vs My Groups (auth required)
        if (!isAuthenticated) {
          // Show "Explore Groups" - public group discovery
          if (setIsExploreGroupsOpen) {
            setIsExploreGroupsOpen(true);
          }
        } else {
          // Show "My Groups" - user's joined groups
          setCurrentView('groups');
        }
      } else if (tab === 'menu') {
        setIsMenuOpen(true);
      }
    });
  };

  const navigateToHome = () => {
    startTransition(() => {
      setCurrentView('home');
      setActiveTab('home');
      setPreviousView?.(null); // 🔒 Clear previousView when going to Home
    });
  };

  const navigateToProfile = () => {
    startTransition(() => {
      setCurrentView('profile');
    });
  };

  const navigateToSettings = () => {
    startTransition(() => {
      setCurrentView('settings');
      setIsMenuOpen(false);
    });
  };

  const navigateToNotifications = () => {
    startTransition(() => {
      setCurrentView('notifications');
      setIsMenuOpen(false);
    });
  };

  const navigateToMessages = () => {
    // Auth gate: Messages require login
    if (!isAuthenticated) {
      if (setIsAuthRequiredOpen && setAuthRequiredContext) {
        setAuthRequiredContext('chat');
        setIsAuthRequiredOpen(true);
      }
      return;
    }
    
    startTransition(() => {
      setCurrentView('messages');
      setIsMenuOpen(false);
      if (setActiveChatId) {
        setActiveChatId('');
      }
    });
  };

  const navigateToSignIn = () => {
    startTransition(() => {
      setCurrentView('sign-in');
    });
  };

  const navigateToSignUp = () => {
    startTransition(() => {
      setCurrentView('sign-up');
    });
  };

  const navigateToBilling = () => {
    startTransition(() => {
      setCurrentView('billing');
    });
  };

  const navigateToStatistics = () => {
    startTransition(() => {
      setCurrentView('statistics');
    });
  };

  const navigateToActionCenter = () => {
    startTransition(() => {
      setCurrentView('action-center');
    });
  };

  const navigateToAdminDashboard = () => {
    // Redirect to Action Center (which now has an Admin tab)
    startTransition(() => {
      setCurrentView('action-center');
    });
  };

  const navigateToMyListings = () => {
    startTransition(() => {
      setCurrentView('my-listings');
      setActiveTab('products');
    });
  };

  const navigateToGroups = () => {
    startTransition(() => {
      setCurrentView('groups');
      setActiveTab('groups');
    });
  };

  const navigateToMap = () => {
    startTransition(() => {
      setCurrentView('map');
    });
  };

  const navigateToChat = (chatId: string) => {
    // Auth gate: Chat requires login
    if (!isAuthenticated) {
      if (setIsAuthRequiredOpen && setAuthRequiredContext) {
        setAuthRequiredContext('message');
        setIsAuthRequiredOpen(true);
      }
      return;
    }
    
    startTransition(() => {
      if (setActiveChatId && setPreviousView && currentView) {
        // ✅ PHASE 2.4: Safety guard - verify chat exists before navigating
        // Import at runtime to avoid circular dependency
        import('../data/chatMessages').then(({ getChatConversation }) => {
          const chatExists = getChatConversation(chatId);
          if (!chatExists) {
            toast.info('Chat coming soon.');
            return;
          }
          
          // Save where we're coming from before navigating to chat
          setPreviousView(currentView);
          setActiveChatId(chatId);
          setCurrentView('chat-conversation');
          setIsMenuOpen(false);
        }).catch(() => {
          toast.error('Unable to open chat');
        });
      } else {
        toast.error('Chat navigation not available');
      }
    });
  };

  const navigateToSavedItems = () => {
    // Auth gate: Favorites require login
    if (!isAuthenticated) {
      if (setIsAuthRequiredOpen && setAuthRequiredContext) {
        setAuthRequiredContext('favorites');
        setIsAuthRequiredOpen(true);
      }
      return;
    }
    
    startTransition(() => {
      setCurrentView('saved-items');
      setIsMenuOpen(false);
    });
  };

  // NEW: Navigate to Publish Flow (optionally with a draft to continue)
  const navigateToPublish = (draftId?: string) => {
    startTransition(() => {
      if (draftId) {
        console.log('Continuing draft:', draftId);
        // TODO: Load draft data
      }
      setCurrentView('publish');
      setActiveTab('publish');
    });
  };
  
  // NEW: Navigate to Publish Flow with pre-filled data (for re-publishing)
  const navigateToPublishWithData = (data: Partial<PublishFormData>) => {
    startTransition(() => {
      if (setRepublishData) {
        setRepublishData(data);
      }
      if (setPreselectedGroupId) {
        setPreselectedGroupId(null); // Clear any preselected group
      }
      setCurrentView('publish');
      setActiveTab('publish');
    });
  };
  
  const navigateToEditListing = (listingId?: string) => {
    startTransition(() => {
      if (listingId) {
        console.log('Editing listing:', listingId);
        // TODO: Load listing data
      }
      setCurrentView('edit-listing');
    });
  };

  // NEW: Navigate back from chat to the previous view
  const navigateBackFromChat = (previousView: ViewType) => {
    startTransition(() => {
      if (previousView === 'product-detail') {
        // Go back to product detail page
        setCurrentView('product-detail');
      } else if (previousView === 'messages') {
        // Go back to messages inbox
        navigateToMessages();
      } else {
        // Fallback: go to messages
        navigateToMessages();
      }
    });
  };

  // Menu Pages Navigation - My Trail, Campaigns, Events
  const navigateToMyTrail = () => {
    // Auth gate: My Trail requires login
    if (!isAuthenticated) {
      if (setIsAuthRequiredOpen && setAuthRequiredContext) {
        setAuthRequiredContext('default');
        setIsAuthRequiredOpen(true);
      }
      return;
    }
    
    startTransition(() => {
      setCurrentView('my-trail');
      setIsMenuOpen(false);
    });
  };

  const navigateToCampaigns = () => {
    // Auth gate: Campaigns require login
    if (!isAuthenticated) {
      if (setIsAuthRequiredOpen && setAuthRequiredContext) {
        setAuthRequiredContext('default');
        setIsAuthRequiredOpen(true);
      }
      return;
    }
    
    startTransition(() => {
      setCurrentView('campaigns');
      setIsMenuOpen(false);
    });
  };

  const navigateToCampaignDetail = (campaignId: string) => {
    startTransition(() => {
      setCurrentView('campaign-detail');
      // Campaign ID would be stored in state
    });
  };

  const navigateToEventsHub = () => {
    // Auth gate: Events Hub requires login
    if (!isAuthenticated) {
      if (setIsAuthRequiredOpen && setAuthRequiredContext) {
        setAuthRequiredContext('default');
        setIsAuthRequiredOpen(true);
      }
      return;
    }
    
    startTransition(() => {
      setCurrentView('events-hub');
      setIsMenuOpen(false);
    });
  };

  const navigateToEventHubDetail = (eventHubId: string) => {
    startTransition(() => {
      setCurrentView('event-hub-detail');
      // Event Hub ID would be stored in state
    });
  };

  const navigateToCreateEventHub = () => {
    startTransition(() => {
      setCurrentView('create-event-hub');
    });
  };

  const navigateToHelpSupport = () => {
    // ✅ PHASE 3.1: Help & Support navigation (public, no auth required)
    startTransition(() => {
      if (currentView && setPreviousView) {
        setPreviousView(currentView);
      }
      setCurrentView('help-support');
      setIsMenuOpen(false);
    });
  };

  return {
    handleTabChange,
    navigateToHome,
    navigateToProfile,
    navigateToSettings,
    navigateToNotifications,
    navigateToMessages,
    navigateToSignIn,
    navigateToSignUp,
    navigateToBilling,
    navigateToStatistics,
    navigateToActionCenter,
    navigateToAdminDashboard,
    navigateToMyListings,
    navigateToGroups,
    navigateToMap,
    navigateToChat,
    navigateToSavedItems,
    navigateToPublish, // NEW
    navigateToPublishWithData, // NEW
    navigateToEditListing, // NEW
    navigateBackFromChat, // NEW
    navigateToMyTrail, // MENU
    navigateToCampaigns, // MENU
    navigateToCampaignDetail, // MENU
    navigateToEventsHub, // MENU
    navigateToEventHubDetail, // MENU
    navigateToCreateEventHub, // MENU
    navigateToHelpSupport, // ✅ PHASE 3.1: Help & Support
  };
}