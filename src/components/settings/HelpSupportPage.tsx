import { ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { SettingsSection } from './shared/SettingsSection';

interface HelpSupportPageProps {
  onBack: () => void;
}

export default function HelpSupportPage({ onBack }: HelpSupportPageProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col max-w-[480px] mx-auto">
      {/* Status bar removed - PWA/WebView mobile */}
      
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center justify-between h-14 px-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="h-9 w-9 p-0">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-semibold">Help & Support</h1>
          <div className="w-9" />
        </div>
      </header>
      
      <main className="flex-1 overflow-auto pb-6">
        <div className="px-4 pt-4 pb-3 border-b border-border">
          <p className="text-sm text-muted-foreground">
            Get help and learn how ListlyUp works
          </p>
        </div>

        <div className="px-4 py-4 space-y-6">
          {/* Status */}
          <SettingsSection title="Status">
            <div className="p-4 bg-white border border-gray-200 rounded-xl">
              <p className="text-sm text-muted-foreground">
                Help & Support is coming soon.
              </p>
            </div>
          </SettingsSection>

          {/* What you'll be able to do */}
          <SettingsSection title="What you'll be able to do">
            <div className="p-4 bg-white border border-gray-200 rounded-xl space-y-3">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2" />
                <p className="text-sm text-foreground">Browse FAQs</p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2" />
                <p className="text-sm text-foreground">Contact support</p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2" />
                <p className="text-sm text-foreground">Report a problem</p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2" />
                <p className="text-sm text-foreground">Track support requests</p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2" />
                <p className="text-sm text-foreground">Safety & policy information</p>
              </div>
            </div>
          </SettingsSection>
        </div>
      </main>
    </div>
  );
}
