/**
 * Account Type Page
 * Select Personal or Business account type
 */

import { ArrowLeft, User, Building } from 'lucide-react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Alert, AlertDescription } from '../ui/alert';
import { useProfile } from '../../contexts/ProfileContext';
import { ProfileNavigation } from './types';

interface AccountTypePageProps {
  onBack: () => void;
  onNavigate: ProfileNavigation;
}

export function AccountTypePage({ onBack, onNavigate }: AccountTypePageProps) {
  const { profile, updateProfile } = useProfile();

  const handleTypeChange = (type: 'personal' | 'business') => {
    updateProfile({ accountType: type });
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
          <h1 className="font-semibold ml-3">Account Type</h1>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-auto px-4 py-6 space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-1">Select your account type</h2>
          <p className="text-sm text-muted-foreground">
            You can change this anytime
          </p>
        </div>

        <RadioGroup value={profile.accountType} onValueChange={handleTypeChange}>
          {/* Personal */}
          <div className={`p-4 border rounded-xl transition-all cursor-pointer ${
            profile.accountType === 'personal' 
              ? 'border-primary bg-primary/5' 
              : 'border-border hover:border-primary/50'
          }`}>
            <div className="flex items-start gap-3">
              <RadioGroupItem value="personal" id="personal" className="mt-1" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <User className="w-4 h-4" />
                  <Label htmlFor="personal" className="font-medium cursor-pointer">
                    Personal
                  </Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  I'm an individual seller
                </p>
              </div>
            </div>
          </div>

          {/* Business */}
          <div className={`p-4 border rounded-xl transition-all cursor-pointer ${
            profile.accountType === 'business' 
              ? 'border-primary bg-primary/5' 
              : 'border-border hover:border-primary/50'
          }`}>
            <div className="flex items-start gap-3">
              <RadioGroupItem value="business" id="business" className="mt-1" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Building className="w-4 h-4" />
                  <Label htmlFor="business" className="font-medium cursor-pointer">
                    Business
                  </Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  I represent a business
                </p>
              </div>
            </div>
          </div>
        </RadioGroup>

        {/* Next Steps for Business */}
        {profile.accountType === 'business' && (
          <Alert>
            <AlertDescription>
              <p className="text-sm text-muted-foreground">
                Advanced features (coming soon)
              </p>
            </AlertDescription>
          </Alert>
        )}
      </main>
    </div>
  );
}