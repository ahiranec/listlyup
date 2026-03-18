import { ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { SecurityProvider, useSecurity } from './contexts/SecurityContext';
import { SettingsSection } from './shared/SettingsSection';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface PrivacySettingsPageProps {
  onBack: () => void;
}

function PrivacySettingsPageContent({ onBack }: PrivacySettingsPageProps) {
  const { privacy, updatePrivacy, isLoading } = useSecurity();

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-[480px] lg:max-w-[640px] mx-auto">
      {/* Status bar removed - PWA/WebView mobile */}
      
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center justify-between h-14 px-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="h-9 w-9 p-0">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-semibold">Privacy Settings</h1>
          <div className="w-9" />
        </div>
      </header>
      
      <main className="flex-1 overflow-auto pb-6">
        <div className="px-4 pt-4 pb-3 border-b border-border">
          <p className="text-sm text-muted-foreground">
            Control who can see your profile and contact you
          </p>
        </div>

        {isLoading ? (
          <div className="text-center text-muted-foreground py-12">
            <div className="w-6 h-6 border-2 border-primary/20 border-t-primary rounded-full animate-spin mx-auto" />
          </div>
        ) : (
          <div className="px-4 py-4 space-y-6">
            {/* Profile Visibility */}
            <SettingsSection title="Profile Visibility">
              <div className="p-4 bg-white border border-gray-200 rounded-xl space-y-4">
                <div className="space-y-2">
                  <Label>Who can see your profile?</Label>
                  <Select
                    value={privacy.profileVisibility}
                    onValueChange={(value: any) => updatePrivacy({ profileVisibility: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="everyone">Everyone</SelectItem>
                      <SelectItem value="registered">Registered users only</SelectItem>
                      <SelectItem value="contacts">My contacts only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </SettingsSection>

            {/* Contact Permissions */}
            <SettingsSection title="Contact Permissions">
              <div className="p-4 bg-white border border-gray-200 rounded-xl space-y-4">
                <div className="space-y-2">
                  <Label>Who can send you messages?</Label>
                  <Select
                    value={privacy.allowMessages}
                    onValueChange={(value: any) => updatePrivacy({ allowMessages: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="everyone">Everyone</SelectItem>
                      <SelectItem value="verified">Verified users only</SelectItem>
                      <SelectItem value="none">No one</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </SettingsSection>

            {/* Activity Status */}
            <SettingsSection title="Activity Status">
              <div className="p-4 bg-white border border-gray-200 rounded-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Label htmlFor="show-online">Show when online</Label>
                    <p className="text-xs text-muted-foreground">
                      Let others see when you're active
                    </p>
                  </div>
                  <Switch
                    id="show-online"
                    checked={privacy.showOnline}
                    onCheckedChange={(checked) => updatePrivacy({ showOnline: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Label htmlFor="show-last-seen">Show last seen</Label>
                    <p className="text-xs text-muted-foreground">
                      Display when you were last active
                    </p>
                  </div>
                  <Switch
                    id="show-last-seen"
                    checked={privacy.showLastSeen}
                    onCheckedChange={(checked) => updatePrivacy({ showLastSeen: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Label htmlFor="read-receipts">Read receipts</Label>
                    <p className="text-xs text-muted-foreground">
                      Let others know when you've read their messages
                    </p>
                  </div>
                  <Switch
                    id="read-receipts"
                    checked={privacy.showReadReceipts}
                    onCheckedChange={(checked) => updatePrivacy({ showReadReceipts: checked })}
                  />
                </div>
              </div>
            </SettingsSection>
          </div>
        )}
      </main>
    </div>
  );
}

export default function PrivacySettingsPage(props: PrivacySettingsPageProps) {
  return (
    <SecurityProvider>
      <PrivacySettingsPageContent {...props} />
    </SecurityProvider>
  );
}