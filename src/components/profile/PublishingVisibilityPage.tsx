/**
 * Publishing - Default Visibility Page
 * CANONICAL ALIGNED
 */

import { ArrowLeft, Globe, Users } from 'lucide-react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { useProfile } from '../../contexts/ProfileContext';
import type { VisibilityMode } from '../../types/canonical';

interface PublishingVisibilityPageProps {
  onBack: () => void;
}

export function PublishingVisibilityPage({ onBack }: PublishingVisibilityPageProps) {
  const { profile, updateProfile } = useProfile();

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-[480px] mx-auto">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center h-14 px-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="h-9 w-9 p-0">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-semibold ml-3">Default Visibility</h1>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-auto px-4 py-6">
        <div className="text-sm text-muted-foreground mb-6">
          Choose who can see your listings by default. This will be pre-selected when you publish.
        </div>

        <RadioGroup 
          value={profile.default_visibility} 
          onValueChange={(value: VisibilityMode) => 
            updateProfile({ default_visibility: value })
          }
        >
          <div className="space-y-3">
            {/* Public */}
            <div className={`border-2 rounded-xl p-4 transition-all ${
              profile.default_visibility === 'public' 
                ? 'border-primary bg-primary/5' 
                : 'border-gray-200'
            }`}>
              <div className="flex items-start gap-3">
                <RadioGroupItem value="public" id="public" className="mt-1" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Globe className="w-4 h-4 text-blue-600" />
                    <Label htmlFor="public" className="cursor-pointer font-medium">
                      Public
                    </Label>
                    <span className="text-xs text-green-600 font-medium ml-auto">Recommended</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Anyone can see your listings in search and feeds. Best for maximum reach.
                  </p>
                </div>
              </div>
            </div>

            {/* Groups Only */}
            <div className={`border-2 rounded-xl p-4 transition-all ${
              profile.default_visibility === 'groups_only' 
                ? 'border-primary bg-primary/5' 
                : 'border-gray-200'
            }`}>
              <div className="flex items-start gap-3">
                <RadioGroupItem value="groups_only" id="groups_only" className="mt-1" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="w-4 h-4 text-green-600" />
                    <Label htmlFor="groups_only" className="cursor-pointer font-medium">
                      Groups Only
                    </Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Only members of selected groups can see your listings. More private and targeted.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </RadioGroup>

        <div className="pt-6 border-t border-border mt-6">
          <h3 className="text-sm font-medium mb-2">How it works</h3>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>• This setting will be pre-selected when you create new listings</li>
            <li>• You can always change visibility for individual listings</li>
            <li>• Groups Only requires selecting at least one group when publishing</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
