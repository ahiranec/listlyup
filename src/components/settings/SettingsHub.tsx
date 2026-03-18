/**
 * Settings Hub - Main settings page with sections
 * Entry point for modular Settings system
 * Matches Profile aesthetic exactly
 */

import { ArrowLeft, Lock, Bell, Sparkles, Database, Info } from 'lucide-react';
import { Button } from '../ui/button';
import { ProfileSection } from '../profile/shared/ProfileSection';
import { SettingsNavigation } from './types';
import { DataProvider, useData } from './contexts/DataContext';

interface SettingsHubProps {
  onBack: () => void;
  onNavigate: SettingsNavigation;
}

function SettingsHubContent({ onBack, onNavigate }: SettingsHubProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col max-w-[480px] mx-auto">
      {/* Status bar removed - PWA/WebView mobile */}

      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center justify-between h-14 px-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="h-9 w-9 p-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <h1 className="font-semibold">Settings</h1>
          
          {/* No save button - auto-save */}
          <div className="w-9" />
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-auto pb-6">
        {/* Description */}
        <div className="px-4 pt-4 pb-3 border-b border-border">
          <p className="text-sm text-muted-foreground">
            Manage preferences, privacy, and features
          </p>
        </div>

        {/* Sections */}
        <div className="px-4 py-6 space-y-6">
          {/* Security & Privacy Section */}
          <div>
            <h2 className="text-xs uppercase tracking-wider text-muted-foreground mb-3 px-1">
              Security & Privacy
            </h2>
            <div className="space-y-2">
              <ProfileSection
                icon={Lock}
                title="Password & Security"
                description="Password, sessions"
                onClick={onNavigate.navigateToPasswordSecurity}
              />
            </div>
          </div>

          {/* Notifications Section */}
          <div>
            <h2 className="text-xs uppercase tracking-wider text-muted-foreground mb-3 px-1">
              Notifications
            </h2>
            <div className="space-y-2">
              <ProfileSection
                icon={Bell}
                title="Notification Preferences"
                description="Sound, desktop notifications"
                onClick={onNavigate.navigateToNotifications}
              />
            </div>
          </div>

          {/* AI Smart Tools Section */}
          <div>
            <h2 className="text-xs uppercase tracking-wider text-muted-foreground mb-3 px-1">
              AI Smart Tools
            </h2>
            <div className="space-y-2">
              <ProfileSection
                icon={Sparkles}
                title="AI & Smart Tools"
                description="Manage AI-powered features"
                onClick={onNavigate.navigateToSmartFeatures}
              />
            </div>
          </div>

          {/* About & Legal Section */}
          <div>
            <h2 className="text-xs uppercase tracking-wider text-muted-foreground mb-3 px-1">
              About & Legal
            </h2>
            <div className="space-y-2">
              <ProfileSection
                icon={Info}
                title="About ListlyUp"
                description="Version, legal, support"
                onClick={onNavigate.navigateToAbout}
              />
            </div>
          </div>

          {/* Data Storage Section */}
          <div>
            <h2 className="text-xs uppercase tracking-wider text-muted-foreground mb-3 px-1">
              Data Storage
            </h2>
            <div className="space-y-2">
              <ProfileSection
                icon={Database}
                title="Data & Storage"
                description="Cache, downloads, usage"
                onClick={onNavigate.navigateToDataStorage}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export function SettingsHub(props: SettingsHubProps) {
  return (
    <DataProvider>
      <SettingsHubContent {...props} />
    </DataProvider>
  );
}