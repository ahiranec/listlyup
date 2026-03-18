/**
 * Personal Information Page
 * Manage display name, bio, avatar, and public profile visibility
 */

import { useState } from 'react';
import { ArrowLeft, User, Camera } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { PublicProfilePreview } from './shared/PublicProfilePreview';
import { useProfile } from '../../contexts/ProfileContext';
import { validateDisplayName, validateBio } from './utils/validation';

interface PersonalInfoPageProps {
  onBack: () => void;
}

export function PersonalInfoPage({ onBack }: PersonalInfoPageProps) {
  const { profile, updateProfile } = useProfile();
  const [nameError, setNameError] = useState('');
  const [bioError, setBioError] = useState('');

  const handleNameChange = (value: string) => {
    updateProfile({ displayName: value });
    const validation = validateDisplayName(value);
    setNameError(validation.error || '');
  };

  const handleBioChange = (value: string) => {
    updateProfile({ bio: value });
    const validation = validateBio(value);
    setBioError(validation.error || '');
  };

  const handleAvatarClick = () => {
    // Simulate avatar upload
    const demoAvatars = [
      'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
      'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
      'https://api.dicebear.com/7.x/avataaars/svg?seed=Luna',
    ];
    const randomAvatar = demoAvatars[Math.floor(Math.random() * demoAvatars.length)];
    updateProfile({ avatarUrl: randomAvatar });
  };

  const getInitials = (name: string) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-[480px] mx-auto">
      {/* Status bar removed - PWA/WebView mobile */}

      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center h-14 px-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="h-9 w-9 p-0">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-semibold ml-3">Personal Information</h1>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-auto px-4 py-6 space-y-6">
        {/* Avatar */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative group">
            <Avatar className="w-24 h-24 border-2 border-border">
              <AvatarImage src={profile.avatarUrl} />
              <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                {getInitials(profile.displayName)}
              </AvatarFallback>
            </Avatar>
            <button 
              onClick={handleAvatarClick}
              className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/40 transition-colors rounded-full"
            >
              <Camera className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
          <Button variant="outline" size="sm" onClick={handleAvatarClick}>
            Change Photo
          </Button>
        </div>

        {/* Display Name */}
        <div className="space-y-2">
          <Label htmlFor="displayName">Display Name *</Label>
          <Input
            id="displayName"
            value={profile.displayName}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="Your name"
            className={nameError ? 'border-red-500' : ''}
          />
          {nameError && (
            <p className="text-xs text-red-600">{nameError}</p>
          )}
          <p className="text-xs text-muted-foreground">
            Maximum 50 characters
          </p>
        </div>

        {/* Bio */}
        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            value={profile.bio}
            onChange={(e) => handleBioChange(e.target.value)}
            placeholder="Tell others about yourself..."
            rows={3}
            className={bioError ? 'border-red-500' : ''}
          />
          <div className="flex justify-between items-center">
            {bioError && (
              <p className="text-xs text-red-600">{bioError}</p>
            )}
            <p className="text-xs text-muted-foreground ml-auto">
              {profile.bio.length}/150
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border my-6" />

        {/* Public Profile Visibility */}
        <div className="space-y-4">
          <div>
            <h2 className="font-medium mb-1">Public Profile Visibility</h2>
            <p className="text-sm text-muted-foreground">
              Choose what information is visible on your public profile
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="showName">Show display name</Label>
                <p className="text-xs text-muted-foreground">Others can see your name</p>
              </div>
              <Switch
                id="showName"
                checked={profile.publicProfile.showDisplayName}
                onCheckedChange={(checked) =>
                  updateProfile({
                    publicProfile: { ...profile.publicProfile, showDisplayName: checked }
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="showBio">Show bio</Label>
                <p className="text-xs text-muted-foreground">Others can see your bio</p>
              </div>
              <Switch
                id="showBio"
                checked={profile.publicProfile.showBio}
                onCheckedChange={(checked) =>
                  updateProfile({
                    publicProfile: { ...profile.publicProfile, showBio: checked }
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="showLocation">Show general location</Label>
                <p className="text-xs text-muted-foreground">City/region only, not exact address</p>
              </div>
              <Switch
                id="showLocation"
                checked={profile.publicProfile.showGeneralLocation}
                onCheckedChange={(checked) =>
                  updateProfile({
                    publicProfile: { ...profile.publicProfile, showGeneralLocation: checked }
                  })
                }
              />
            </div>
          </div>

          {/* Preview */}
          <PublicProfilePreview profile={profile} />
        </div>
      </main>
    </div>
  );
}