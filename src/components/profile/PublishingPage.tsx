/**
 * Publishing Defaults Page
 * Index page showing all publishing defaults with checklist
 */

import { ArrowLeft, MessageSquare, Truck, Eye, DollarSign, MapPin } from 'lucide-react';
import { Button } from '../ui/button';
import { ProfileSection } from './shared/ProfileSection';
import { CompletionChecklist } from './shared/CompletionChecklist';
import { useProfile } from '../../contexts/ProfileContext';
import { getPublishingCompleteness, ProfileNavigation } from './types';

interface PublishingPageProps {
  onBack: () => void;
  onNavigate: ProfileNavigation;
}

export function PublishingPage({ onBack, onNavigate }: PublishingPageProps) {
  const { profile } = useProfile();
  const completeness = getPublishingCompleteness(profile);

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-[480px] mx-auto">
      {/* Status bar removed - PWA/WebView mobile */}

      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center h-14 px-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="h-9 w-9 p-0">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-semibold ml-3">Publishing Defaults</h1>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-auto px-4 py-6 space-y-6">
        {/* Explanation */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-900">
            These settings will be used as defaults when you create new listings. You can always change them for individual items.
          </p>
        </div>

        {/* Checklist */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h2 className="font-medium mb-3">Setup Progress</h2>
          <CompletionChecklist completeness={completeness} variant="detailed" />
        </div>

        {/* Sections */}
        <div className="space-y-2">
          <ProfileSection
            icon={MessageSquare}
            title="Default Contact Methods"
            description="How buyers can reach you"
            status={completeness.contact ? 'complete' : 'incomplete'}
            onClick={onNavigate.navigateToPublishingContact}
          />
          
          <ProfileSection
            icon={Truck}
            title="Default Delivery Options"
            description="Pickup, delivery, shipping"
            status={completeness.delivery ? 'complete' : 'incomplete'}
            onClick={onNavigate.navigateToPublishingDelivery}
          />
          
          <ProfileSection
            icon={Eye}
            title="Default Visibility"
            description="Who can see your listings"
            status={completeness.visibility ? 'complete' : 'incomplete'}
            onClick={onNavigate.navigateToPublishingVisibility}
          />
          
          <ProfileSection
            icon={DollarSign}
            title="Default Currency"
            description={profile.defaultCurrency || 'Not set'}
            status={completeness.currency ? 'complete' : 'incomplete'}
            onClick={onNavigate.navigateToPublishingCurrency}
          />

          <ProfileSection
            icon={MapPin}
            title="Default Address"
            description={
              profile.addresses.find(a => a.isDefaultForPublishing)
                ? 'Set'
                : 'Not set'
            }
            status={completeness.address ? 'complete' : 'incomplete'}
            onClick={onNavigate.navigateToAddresses}
          />
        </div>
      </main>
    </div>
  );
}