/**
 * PublicProfilePreview Component
 * Shows how the public profile appears to others
 */

import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Badge } from '../../ui/badge';
import { MapPin } from 'lucide-react';
import { ProfileData } from '../types';

interface PublicProfilePreviewProps {
  profile: ProfileData;
}

export function PublicProfilePreview({ profile }: PublicProfilePreviewProps) {
  const getInitials = (name: string) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const defaultAddress = profile.addresses.find(a => a.isDefaultForPublishing);
  const locationText = defaultAddress 
    ? `${defaultAddress.formattedAddress.split(',')[1] || defaultAddress.formattedAddress}` 
    : profile.region;

  return (
    <div className="border border-gray-200 rounded-xl p-4 bg-white">
      <p className="text-xs text-muted-foreground mb-3">Preview (how others see you)</p>
      
      <div className="flex items-start gap-3">
        <Avatar className="w-12 h-12">
          <AvatarImage src={profile.avatarUrl} />
          <AvatarFallback className="bg-primary/10 text-primary">
            {getInitials(profile.displayName)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          {profile.publicProfile.showDisplayName && profile.displayName ? (
            <p className="font-semibold">{profile.displayName}</p>
          ) : (
            <p className="text-muted-foreground italic">Name hidden</p>
          )}
          
          {profile.publicProfile.showBio && profile.bio ? (
            <p className="text-sm text-muted-foreground mt-1">{profile.bio}</p>
          ) : null}
          
          {profile.publicProfile.showGeneralLocation && (
            <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
              <MapPin className="w-3 h-3" />
              {locationText}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
