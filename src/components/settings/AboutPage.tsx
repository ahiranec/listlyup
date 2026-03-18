import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Button } from '../ui/button';
import { SettingsSection } from './shared/SettingsSection';

interface AboutPageProps {
  onBack: () => void;
}

export default function AboutPage({ onBack }: AboutPageProps) {
  const APP_VERSION = '1.0.0';
  const BUILD_NUMBER = '2025.01';

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-[480px] mx-auto">
      {/* Status bar removed - PWA/WebView mobile */}
      
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center justify-between h-14 px-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="h-9 w-9 p-0">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-semibold">About ListlyUp</h1>
          <div className="w-9" />
        </div>
      </header>
      
      <main className="flex-1 overflow-auto pb-6">
        <div className="px-4 pt-4 pb-3 border-b border-border">
          <p className="text-sm text-muted-foreground">
            App version, legal information, and support
          </p>
        </div>

        <div className="px-4 py-4 space-y-6">
          {/* Version Info */}
          <SettingsSection title="App Information">
            <div className="p-4 bg-white border border-gray-200 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Version</span>
                <span className="text-sm font-medium">{APP_VERSION}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Build</span>
                <span className="text-sm font-medium">{BUILD_NUMBER}</span>
              </div>
            </div>
          </SettingsSection>

          {/* Legal */}
          <SettingsSection title="Legal">
            <div className="p-4 bg-white border border-gray-200 rounded-xl space-y-3">
              <button
                onClick={() => window.open('/terms-of-service', '_blank')}
                className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm">Terms of Service</span>
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
              </button>

              <button
                onClick={() => window.open('/privacy-policy', '_blank')}
                className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm">Privacy Policy</span>
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
              </button>

              <button
                onClick={() => window.open('/community-guidelines', '_blank')}
                className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm">Community Guidelines</span>
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
              </button>

              <button
                onClick={() => window.open('/licenses', '_blank')}
                className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm">Open Source Licenses</span>
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </SettingsSection>

          {/* Support */}
          <SettingsSection title="Help & Support">
            <div className="p-4 bg-white border border-gray-200 rounded-xl space-y-3">
              <button
                onClick={() => window.open('/help-center', '_blank')}
                className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm">Help Center</span>
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
              </button>

              <button
                onClick={() => window.open('/contact-support', '_blank')}
                className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm">Contact Support</span>
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
              </button>

              <button
                onClick={() => window.open('/report-bug', '_blank')}
                className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm">Report a Bug</span>
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </SettingsSection>

          {/* Footer */}
          <div className="text-center pt-4">
            <p className="text-xs text-muted-foreground">
              © 2025 ListlyUp. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Made with ❤️ for the community
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}