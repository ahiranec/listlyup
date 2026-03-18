/**
 * Settings Router
 * Manages navigation between Settings pages with lazy loading
 */

import { useState, lazy, Suspense } from 'react';
import { SettingsView, SettingsNavigation } from './types';
import { SettingsHub } from './SettingsHub';
import { LoadingFallback } from '../LoadingFallback';

// Lazy load all Settings pages for performance
const PasswordSecurityPage = lazy(() => import('./PasswordSecurityPage'));
const PrivacySettingsPage = lazy(() => import('./PrivacySettingsPage'));
const AnalyticsInsightsPage = lazy(() => import('./AnalyticsInsightsPage'));
const DeleteAccountPage = lazy(() => import('./DeleteAccountPage'));
const NotificationPreferencesPage = lazy(() => import('./NotificationPreferencesPage'));
const SmartFeaturesPage = lazy(() => import('./SmartFeaturesPage'));
const DataStoragePage = lazy(() => import('./DataStoragePage'));
const AboutPage = lazy(() => import('./AboutPage'));
const HelpSupportPage = lazy(() => import('./HelpSupportPage')); // ✅ PHASE 3.1: Help & Support page

interface SettingsRouterProps {
  onClose: () => void;
}

export function SettingsRouter({ onClose }: SettingsRouterProps) {
  const [currentView, setCurrentView] = useState<SettingsView>('hub');
  const [history, setHistory] = useState<SettingsView[]>([]);

  const navigateTo = (view: SettingsView) => {
    setHistory(prev => [...prev, currentView]);
    setCurrentView(view);
  };

  const goBack = () => {
    if (history.length > 0) {
      const previous = history[history.length - 1];
      setHistory(prev => prev.slice(0, -1));
      setCurrentView(previous);
    } else {
      onClose();
    }
  };

  const navigation: SettingsNavigation = {
    navigateToHub: () => navigateTo('hub'),
    navigateToPasswordSecurity: () => navigateTo('password-security'),
    navigateToPrivacySettings: () => navigateTo('privacy-settings'),
    navigateToAnalyticsInsights: () => navigateTo('analytics-insights'),
    navigateToDeleteAccount: () => navigateTo('delete-account'),
    navigateToNotifications: () => navigateTo('notifications'),
    navigateToSmartFeatures: () => navigateTo('smart-features'),
    navigateToSavedSearches: () => {
      // MVP: Saved Searches feature not available
      console.log('[MVP] Saved Searches coming soon');
    },
    navigateToDataStorage: () => navigateTo('data-storage'),
    navigateToAbout: () => navigateTo('about'),
    navigateToHelpSupport: () => navigateTo('help-support'), // ✅ PHASE 3.1: Help & Support page
    goBack,
  };

  // Hub doesn't need lazy loading (instant load)
  if (currentView === 'hub') {
    return <SettingsHub onBack={onClose} onNavigate={navigation} />;
  }

  // All other pages are lazy-loaded
  return (
    <Suspense fallback={<LoadingFallback />}>
      {currentView === 'password-security' && <PasswordSecurityPage onBack={goBack} />}
      {currentView === 'privacy-settings' && <PrivacySettingsPage onBack={goBack} />}
      {currentView === 'analytics-insights' && <AnalyticsInsightsPage onBack={goBack} />}
      {currentView === 'delete-account' && <DeleteAccountPage onBack={goBack} />}
      {currentView === 'notifications' && <NotificationPreferencesPage onBack={goBack} />}
      {currentView === 'smart-features' && <SmartFeaturesPage onBack={goBack} />}
      {currentView === 'data-storage' && <DataStoragePage onBack={goBack} />}
      {currentView === 'about' && <AboutPage onBack={goBack} />}
      {currentView === 'help-support' && <HelpSupportPage onBack={goBack} />}
    </Suspense>
  );
}

export default SettingsRouter;