/**
 * Organizations Page
 * List and manage organizations
 */

import { ArrowLeft, Plus, Building, Lock, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { Alert, AlertDescription } from '../ui/alert';
import { useProfile } from '../../contexts/ProfileContext';
import { ProfileNavigation } from './types';
import { OrganizationCard } from './shared/OrganizationCard';
import { toast } from 'react-toastify';

interface OrganizationsPageProps {
  onBack: () => void;
  onNavigate: ProfileNavigation;
}

export function OrganizationsPage({ onBack, onNavigate }: OrganizationsPageProps) {
  const { profile } = useProfile();

  // Check if organizations feature is locked
  const isLocked = profile.plan === 'Free';
  const hasOrganizations = profile.organizations.length > 0;

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-[480px] mx-auto">
      {/* Status bar removed - PWA/WebView mobile */}

      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center h-14 px-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="h-9 w-9 p-0">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-semibold ml-3">Organizations</h1>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-auto px-4 py-6 space-y-6">
        {/* Locked State (Free Plan) */}
        {isLocked && (
          <div className="flex flex-col items-center justify-center py-12 space-y-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            
            <div className="text-center space-y-2">
              <h2 className="text-lg font-semibold">Organizations</h2>
              <p className="text-sm text-muted-foreground max-w-sm">
                Create and manage organizations to publish as a business and collaborate with your team.
              </p>
            </div>

            <div className="w-full max-w-sm space-y-3">
              <Button 
                className="w-full" 
                size="lg"
                onClick={() => toast.info('Upgrade to Plus — Billing coming soon')}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Upgrade to Plus
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full"
                onClick={() => toast.info('Learn more about Organizations')}
              >
                Learn More
              </Button>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 space-y-2 max-w-sm">
              <p className="text-xs font-medium">What you get:</p>
              <ul className="text-xs space-y-1 text-muted-foreground">
                <li>✓ Create unlimited organizations</li>
                <li>✓ Invite team members</li>
                <li>✓ Business analytics</li>
                <li>✓ Priority support</li>
                <li>✓ Custom branding</li>
              </ul>
            </div>
          </div>
        )}

        {/* Empty State (Plus/Pro, No Organizations) */}
        {!isLocked && !hasOrganizations && (
          <div className="flex flex-col items-center justify-center py-12 space-y-6">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
              <Building className="w-8 h-8 text-muted-foreground" />
            </div>
            
            <div className="text-center space-y-2">
              <h2 className="text-lg font-semibold">No organizations yet</h2>
              <p className="text-sm text-muted-foreground max-w-sm">
                Create your first organization to start publishing as a business.
              </p>
            </div>

            <div className="w-full max-w-sm space-y-3">
              <Button 
                className="w-full" 
                size="lg"
                onClick={() => onNavigate.navigateToOrganizationForm()}
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Organization
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
              >
                Join Existing Organization
              </Button>
            </div>

            <Alert className="max-w-sm">
              <AlertDescription className="text-xs">
                <p className="font-medium mb-2">Organizations let you:</p>
                <ul className="space-y-1">
                  <li>• Publish as a business</li>
                  <li>• Collaborate with team</li>
                  <li>• Manage multiple brands</li>
                  <li>• Track team performance</li>
                </ul>
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* List State (Plus/Pro, With Organizations) */}
        {!isLocked && hasOrganizations && (
          <>
            <div>
              <h2 className="text-sm font-medium mb-1">
                Your Organizations ({profile.organizations.length})
              </h2>
              <p className="text-xs text-muted-foreground">
                Manage your business accounts and team
              </p>
            </div>

            <div className="space-y-3">
              {profile.organizations.map((org) => (
                <OrganizationCard
                  key={org.id}
                  organization={org}
                  isActive={profile.activeOrganizationId === org.id}
                  onEdit={() => onNavigate.navigateToOrganizationForm(org.id)}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => onNavigate.navigateToOrganizationForm()}
              >
                <Plus className="w-4 h-4 mr-2" />
                Create New
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
              >
                Join Existing
              </Button>
            </div>

            <Alert>
              <AlertDescription className="text-xs">
                <p className="font-medium mb-1">When publishing</p>
                <p className="text-muted-foreground">
                  You can choose to list as yourself or as an active organization.
                </p>
              </AlertDescription>
            </Alert>
          </>
        )}
      </main>
    </div>
  );
}