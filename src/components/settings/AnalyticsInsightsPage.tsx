import { ArrowLeft, BarChart3, Shield } from 'lucide-react';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { SecurityProvider, useSecurity } from './contexts/SecurityContext';
import { SettingsSection } from './shared/SettingsSection';
import { Alert, AlertDescription } from '../ui/alert';

interface AnalyticsInsightsPageProps {
  onBack: () => void;
}

function AnalyticsInsightsPageContent({ onBack }: AnalyticsInsightsPageProps) {
  const { analytics, updateAnalytics, isLoading } = useSecurity();

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-[480px] mx-auto">
      {/* Status bar removed - PWA/WebView mobile */}
      
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center justify-between h-14 px-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="h-9 w-9 p-0">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-semibold">Analytics & Insights</h1>
          <div className="w-9" />
        </div>
      </header>
      
      <main className="flex-1 overflow-auto pb-6">
        <div className="px-4 pt-4 pb-3 border-b border-border">
          <p className="text-sm text-muted-foreground">
            Help us improve ListlyUp with anonymous data
          </p>
        </div>

        {isLoading ? (
          <div className="text-center text-muted-foreground py-12">
            <div className="w-6 h-6 border-2 border-primary/20 border-t-primary rounded-full animate-spin mx-auto" />
          </div>
        ) : (
          <div className="px-4 py-4 space-y-6">
            {/* Analytics Toggle */}
            <SettingsSection title="Data Collection">
              <div className="p-4 bg-white border border-gray-200 rounded-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <BarChart3 className="w-4 h-4 text-primary" />
                      <Label htmlFor="analytics-enabled">Anonymous Analytics</Label>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Share anonymous usage data to help improve the platform
                    </p>
                  </div>
                  <Switch
                    id="analytics-enabled"
                    checked={analytics.enabled}
                    onCheckedChange={updateAnalytics}
                    disabled={analytics.forced}
                  />
                </div>

                {analytics.forced && (
                  <Alert>
                    <Shield className="w-4 h-4" />
                    <AlertDescription className="text-xs">
                      This setting is managed by the platform and cannot be changed.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </SettingsSection>

            {/* Privacy Information */}
            <SettingsSection title="Your Privacy">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl space-y-3">
                <h3 className="text-sm font-semibold text-blue-900">
                  What data do we collect?
                </h3>
                
                <div className="space-y-2 text-xs text-blue-800">
                  <div className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Anonymous page views and feature usage</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Performance metrics and error reports</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Device type and browser information</span>
                  </div>
                </div>

                <h3 className="text-sm font-semibold text-blue-900 pt-2">
                  What we DON'T collect:
                </h3>
                
                <div className="space-y-2 text-xs text-blue-800">
                  <div className="flex items-start gap-2">
                    <span className="text-red-600">✗</span>
                    <span>Personal information (name, email, phone)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-red-600">✗</span>
                    <span>Message content or private conversations</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-red-600">✗</span>
                    <span>Precise location data or tracking</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-blue-200">
                  <p className="text-xs text-blue-700">
                    All analytics data is anonymized and aggregated. We never sell your data to third parties.
                  </p>
                  
                  <Button
                    variant="link"
                    size="sm"
                    className="h-auto p-0 text-xs text-blue-600 mt-2"
                    onClick={() => window.open('/privacy-policy', '_blank')}
                  >
                    Read our Privacy Policy →
                  </Button>
                </div>
              </div>
            </SettingsSection>

            {/* GDPR/CCPA Compliance */}
            <SettingsSection title="Your Rights">
              <div className="p-4 bg-white border border-gray-200 rounded-xl space-y-3">
                <p className="text-xs text-muted-foreground">
                  Under GDPR and CCPA regulations, you have the right to:
                </p>
                
                <ul className="text-xs text-muted-foreground space-y-1 pl-4">
                  <li>• Access your data at any time</li>
                  <li>• Request data deletion</li>
                  <li>• Opt out of data collection</li>
                  <li>• Export your data</li>
                </ul>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-2"
                  onClick={() => window.open('/data-rights', '_blank')}
                >
                  Learn More About Your Rights
                </Button>
              </div>
            </SettingsSection>
          </div>
        )}
      </main>
    </div>
  );
}

export default function AnalyticsInsightsPage(props: AnalyticsInsightsPageProps) {
  return (
    <SecurityProvider>
      <AnalyticsInsightsPageContent {...props} />
    </SecurityProvider>
  );
}