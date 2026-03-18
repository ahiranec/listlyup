import { ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { DataProvider, useData } from './contexts/DataContext';
import { NotificationsProvider, useNotifications } from './contexts/NotificationsContext';
import { SavedSearchCard } from './shared/SavedSearchCard';
import { SettingsSection } from './shared/SettingsSection';

interface SavedSearchesPageProps {
  onBack: () => void;
}

function SavedSearchesPageContent({ onBack }: SavedSearchesPageProps) {
  const { savedSearches, deleteSavedSearch, toggleSearchAlert, isLoading } = useData();
  const { notifications } = useNotifications();
  
  const masterAlertsEnabled = notifications.push.savedSearchAlerts;
  const activeAlertsCount = savedSearches.filter(s => s.notifyEnabled).length;
  const hasDisabledAlerts = !masterAlertsEnabled && activeAlertsCount > 0;

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-[480px] mx-auto">
      {/* Status bar removed - PWA/WebView mobile */}
      
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center justify-between h-14 px-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="h-9 w-9 p-0">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-semibold">Saved Searches</h1>
          <div className="w-9" />
        </div>
      </header>
      
      <main className="flex-1 overflow-auto pb-6">
        <div className="px-4 pt-4 pb-3 border-b border-border">
          <p className="text-sm text-muted-foreground">
            Manage your saved searches and alerts
          </p>
        </div>

        {isLoading ? (
          <div className="text-center text-muted-foreground py-12">
            <div className="w-6 h-6 border-2 border-primary/20 border-t-primary rounded-full animate-spin mx-auto" />
          </div>
        ) : (
          <div className="px-4 py-4 space-y-4">
            {/* Warning Banner if Master Toggle is OFF */}
            {hasDisabledAlerts && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
                <p className="text-xs font-semibold text-amber-900 mb-1">
                  ⚠️ Alerts are disabled
                </p>
                <p className="text-xs text-amber-800">
                  You have {activeAlertsCount} search{activeAlertsCount !== 1 ? 'es' : ''} with alerts enabled, but the master "Saved Search Alerts" toggle is off in Notification Preferences. Enable it to receive notifications.
                </p>
              </div>
            )}

            <SettingsSection 
              title="Your Saved Searches"
              description={`${savedSearches.length} saved search${savedSearches.length !== 1 ? 'es' : ''}${activeAlertsCount > 0 ? ` • ${activeAlertsCount} alert${activeAlertsCount !== 1 ? 's' : ''} active` : ''}`}
            >
              {savedSearches.length === 0 ? (
                <div className="p-8 text-center bg-gray-50 border border-gray-200 rounded-xl">
                  <p className="text-sm text-muted-foreground mb-2">
                    No saved searches yet
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Save searches from the Browse page to get notified of new matches
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {savedSearches.map(search => (
                    <SavedSearchCard
                      key={search.id}
                      search={search}
                      onDelete={() => deleteSavedSearch(search.id)}
                      onToggleAlert={() => toggleSearchAlert(search.id)}
                      masterAlertsEnabled={masterAlertsEnabled}
                    />
                  ))}
                </div>
              )}
            </SettingsSection>

            {/* Info Box */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <p className="text-xs text-blue-900 font-semibold mb-1">
                💡 How Saved Searches Work
              </p>
              <p className="text-xs text-blue-800">
                Alerts are controlled at two levels: a master toggle in Notification Preferences enables all alerts, and individual toggles let you choose which searches to monitor. Individual alerts only work when the master toggle is enabled.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function SavedSearchesPage(props: SavedSearchesPageProps) {
  return (
    <NotificationsProvider>
      <DataProvider>
        <SavedSearchesPageContent {...props} />
      </DataProvider>
    </NotificationsProvider>
  );
}