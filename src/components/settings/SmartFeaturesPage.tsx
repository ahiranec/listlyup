import { ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { useFeatures } from '../../contexts/FeaturesContext';
import { SMART_FEATURES } from './types';
import { FeatureToggleCard } from './shared/FeatureToggleCard';
import { SettingsSection } from './shared/SettingsSection';
import { toast } from 'sonner@2.0.3';

interface SmartFeaturesPageProps {
  onBack: () => void;
}

export default function SmartFeaturesPage({ onBack }: SmartFeaturesPageProps) {
  const { getFeatureState, toggleFeature, isLoading } = useFeatures();

  const handleToggle = (featureId: string, enabled: boolean) => {
    const state = getFeatureState(featureId);
    
    if (!state?.canToggle) {
      toast.error('This feature cannot be changed');
      return;
    }
    
    toggleFeature(featureId, enabled);
  };

  const handleUpgrade = (plan: string) => {
    toast.info(`Upgrade to ${plan} to unlock this feature`);
    // TODO: Navigate to billing page
  };

  // Group features by category
  const aiPublishingFeatures = SMART_FEATURES.filter(
    f => f.category === 'ai-publishing'
  );
  const contentCreationFeatures = SMART_FEATURES.filter(
    f => f.category === 'content-creation'
  );
  const discoveryFeatures = SMART_FEATURES.filter(
    f => f.category === 'discovery-personalization'
  );

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-[480px] mx-auto">
      {/* Status bar removed - PWA/WebView mobile */}

      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center justify-between h-14 px-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="h-9 w-9 p-0">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-semibold">Smart Features</h1>
          <div className="w-9" />
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-auto pb-6">
        {/* Description */}
        <div className="px-4 pt-4 pb-3 border-b border-border">
          <p className="text-sm text-muted-foreground">
            Enable or disable smart tools. Availability depends on your plan and platform settings.
          </p>
        </div>

        {/* PHASE 1: Info banner - features controlled by SuperAdmin */}
        <div className="px-4 pt-3">
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-800">
              <strong>ⓘ Connected to Admin:</strong> Feature availability is controlled by platform administrators. 
              Changes sync automatically in real-time.
            </p>
          </div>
        </div>

        {/* Sections */}
        <div className="px-4 py-4 space-y-6">
          {/* AI Publishing Assistance */}
          <SettingsSection
            title="AI Publishing Assistance"
            description="Smart suggestions while you create listings"
          >
            {aiPublishingFeatures.map(feature => (
              <FeatureToggleCard
                key={feature.id}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                state={getFeatureState(feature.id)}
                onToggle={(enabled) => handleToggle(feature.id, enabled)}
                onUpgrade={() => handleUpgrade('Plus')}
              />
            ))}
          </SettingsSection>

          {/* Content Creation */}
          <SettingsSection
            title="Content Creation"
            description="Enhance your photos and descriptions"
          >
            {contentCreationFeatures.map(feature => (
              <FeatureToggleCard
                key={feature.id}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                state={getFeatureState(feature.id)}
                onToggle={(enabled) => handleToggle(feature.id, enabled)}
                onUpgrade={() => handleUpgrade('Plus')}
              />
            ))}
          </SettingsSection>

          {/* Discovery & Personalization */}
          <SettingsSection
            title="Discovery & Personalization"
            description="AI-powered browsing experience"
          >
            {discoveryFeatures.map(feature => (
              <FeatureToggleCard
                key={feature.id}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                state={getFeatureState(feature.id)}
                onToggle={(enabled) => handleToggle(feature.id, enabled)}
                onUpgrade={() => {
                  const state = getFeatureState(feature.id);
                  handleUpgrade(state?.badge || 'Pro');
                }}
              />
            ))}
          </SettingsSection>

          {/* Loading State */}
          {isLoading && (
            <div className="text-center text-muted-foreground py-4">
              <div className="w-6 h-6 border-2 border-primary/20 border-t-primary rounded-full animate-spin mx-auto" />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}