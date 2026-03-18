/**
 * Profile Hub - Main profile page with sections
 * Entry point for modular Profile system
 */

import { ArrowLeft, User, Lock, FileText, MapPin, Globe, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Camera } from 'lucide-react';
import { ProfileSection } from './shared/ProfileSection';
import { CompletionChecklist } from './shared/CompletionChecklist';
import { useProfile } from '../../contexts/ProfileContext';
import { getPublishingCompleteness, calculateCompletenessScore, ProfileNavigation } from './types';
import { toast } from 'sonner@2.0.3';

interface ProfileHubProps {
  onBack: () => void;
  onNavigate: ProfileNavigation;
}

export function ProfileHub({ onBack, onNavigate }: ProfileHubProps) {
  const { profile, hasChanges, saveProfile, isLoading } = useProfile();
  
  const completeness = getPublishingCompleteness(profile);
  const score = calculateCompletenessScore(completeness);
  const isPublishingComplete = score === 5;

  const getInitials = (name: string) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSave = async () => {
    try {
      await saveProfile();
      toast.success('Profile saved successfully!');
    } catch (error) {
      toast.error('Failed to save profile');
    }
  };

  const canPublish = profile.displayName && profile.username;

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-[480px] lg:max-w-[640px] mx-auto">
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
          
          <h1 className="font-semibold">My Profile</h1>
          
          <Button
            size="sm"
            onClick={handleSave}
            disabled={!hasChanges || isLoading}
            className="h-9 px-4"
          >
            {isLoading ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-auto pb-6">
        {/* Profile Header */}
        <div className="px-4 pt-4 pb-3 border-b border-border">
          <div className="flex items-center gap-3 mb-3">
            {/* Avatar */}
            <div className="relative group shrink-0">
              <Avatar className="w-14 h-14 border-2 border-border">
                <AvatarImage src={profile.avatarUrl} alt={profile.displayName} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {getInitials(profile.displayName)}
                </AvatarFallback>
              </Avatar>
              <button 
                className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/40 transition-colors rounded-full"
                onClick={onNavigate.navigateToPersonal}
              >
                <Camera className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>

            {/* Name & Username */}
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate">
                {profile.displayName || 'Add your name'}
              </p>
              <p className="text-sm text-muted-foreground">
                @{profile.username || 'username'}
              </p>
            </div>

            {/* Plan Badge */}
            <Badge 
              variant={profile.plan === 'Free' ? 'secondary' : 'default'} 
              className="text-xs shrink-0"
            >
              {profile.plan === 'Free' && '🆓'}
              {profile.plan === 'Plus' && '✨'}
              {profile.plan === 'Pro' && '🚀'}
              {' '}{profile.plan}
            </Badge>
          </div>

          {/* Status Message */}
          {!canPublish && (
            <div className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-2 mt-2">
              Complete your profile to start publishing: add your name and username
            </div>
          )}

          {/* Publishing Completeness */}
          <div className="mt-3">
            <CompletionChecklist completeness={completeness} variant="summary" />
            {!isPublishingComplete && (
              <button
                onClick={onNavigate.navigateToPublishing}
                className="text-xs text-primary hover:underline mt-1"
              >
                Complete publishing setup
              </button>
            )}
          </div>
        </div>

        {/* Sections */}
        <div className="px-4 py-4 space-y-6">
          {/* Account Section */}
          <div>
            <h2 className="text-xs uppercase tracking-wider text-muted-foreground mb-3 px-1">
              Account
            </h2>
            
            {/* Account Type Inline Selector */}
            <div className="mb-3 px-4 py-3 bg-muted/30 border border-border rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Account Type</p>
                  <p className="text-xs text-muted-foreground">
                    {profile.accountType === 'personal' ? 'Personal' : 'Business'}
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={onNavigate.navigateToAccountType}
                  className="h-8"
                >
                  Edit
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <ProfileSection
                icon={Lock}
                title="Account & Verification"
                description="Email, phone, username"
                status={profile.emailVerified && profile.phoneVerified ? 'complete' : 'warning'}
                onClick={onNavigate.navigateToAccount}
              />
              <ProfileSection
                icon={User}
                title="Personal Information"
                description="Name, bio, profile photo"
                status={canPublish ? 'complete' : 'incomplete'}
                onClick={onNavigate.navigateToPersonal}
              />
            </div>
          </div>

          {/* Publishing Section */}
          <div>
            <h2 className="text-xs uppercase tracking-wider text-muted-foreground mb-3 px-1">
              Publishing
            </h2>
            <div className="space-y-2">
              <ProfileSection
                icon={FileText}
                title="Publishing Defaults"
                description={`${score}/5 completed`}
                status={isPublishingComplete ? 'complete' : 'incomplete'}
                badge={!isPublishingComplete ? 'Setup required' : undefined}
                onClick={onNavigate.navigateToPublishing}
              />
              <ProfileSection
                icon={MapPin}
                title="Saved Addresses"
                description={`${profile.addresses.length} address${profile.addresses.length !== 1 ? 'es' : ''}`}
                status={profile.addresses.some(a => a.isDefaultForPublishing) ? 'complete' : 'incomplete'}
                onClick={onNavigate.navigateToAddresses}
              />
            </div>
          </div>

          {/* Other Section */}
          <div>
            <h2 className="text-xs uppercase tracking-wider text-muted-foreground mb-3 px-1">
              Preferences
            </h2>
            <div className="space-y-2">
              <ProfileSection
                icon={Globe}
                title="Language & Region"
                description={`${profile.appLanguage.toUpperCase()} • ${profile.region}`}
                onClick={onNavigate.navigateToLanguage}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}