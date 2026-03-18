/**
 * Notification Preferences Page
 * MVP: Sound ON/OFF, Desktop/Browser Notifications (Coming Soon)
 */

import { ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { NotificationsProvider, useNotifications } from './contexts/NotificationsContext';
import { SettingsSection } from './shared/SettingsSection';

interface NotificationPreferencesPageProps {
  onBack: () => void;
}

function NotificationPreferencesPageContent({ onBack }: NotificationPreferencesPageProps) {
  const { notifications, updateInAppNotifications, isLoading } = useNotifications();

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-[480px] mx-auto">
      {/* Status bar removed - PWA/WebView mobile */}
      
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center justify-between h-14 px-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="h-9 w-9 p-0">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-semibold">Notification Preferences</h1>
          <div className="w-9" />
        </div>
      </header>
      
      <main className="flex-1 overflow-auto pb-6">
        <div className="px-4 pt-4 pb-3 border-b border-border">
          <p className="text-sm text-muted-foreground">
            Manage how you receive notifications
          </p>
        </div>

        {isLoading ? (
          <div className="text-center text-muted-foreground py-12">
            <div className="w-6 h-6 border-2 border-primary/20 border-t-primary rounded-full animate-spin mx-auto" />
          </div>
        ) : (
          <div className="px-4 py-4 space-y-6">
            {/* In-App Settings */}
            <SettingsSection title="In-App Settings">
              <div className="p-4 bg-white border border-gray-200 rounded-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Label htmlFor="inapp-sound">Sound</Label>
                    <p className="text-xs text-muted-foreground">
                      Play notification sounds
                    </p>
                  </div>
                  <Switch
                    id="inapp-sound"
                    checked={notifications.inApp.sound}
                    onCheckedChange={(checked) => updateInAppNotifications({ sound: checked })}
                  />
                </div>
              </div>
            </SettingsSection>

            {/* Desktop / Browser Notifications - Coming Soon */}
            <SettingsSection title="Desktop / Browser Notifications">
              <div className="p-4 bg-muted/30 border border-border rounded-xl">
                <p className="text-sm text-muted-foreground text-center">
                  Coming soon
                </p>
              </div>
            </SettingsSection>

            {/* Info Box */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <p className="text-xs text-blue-900 font-semibold mb-1">
                💡 How Notifications Work
              </p>
              <p className="text-xs text-blue-800">
                Settings only change the presentation of notifications, not which events you receive. All events appear in your Action Center.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function NotificationPreferencesPage(props: NotificationPreferencesPageProps) {
  return (
    <NotificationsProvider>
      <NotificationPreferencesPageContent {...props} />
    </NotificationsProvider>
  );
}
