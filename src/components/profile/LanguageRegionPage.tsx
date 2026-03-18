/**
 * Language & Region Page
 */

import { ArrowLeft, Globe, MapPin } from 'lucide-react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useProfile } from '../../contexts/ProfileContext';

interface LanguageRegionPageProps {
  onBack: () => void;
}

const LANGUAGES = [
  { value: 'es', label: 'Español' },
  { value: 'en', label: 'English' },
  { value: 'pt', label: 'Português' },
];

const REGIONS = [
  'Chile',
  'Argentina',
  'Brazil',
  'México',
  'Colombia',
  'Peru',
  'Uruguay',
  'USA',
  'Spain',
  'Other',
];

export function LanguageRegionPage({ onBack }: LanguageRegionPageProps) {
  const { profile, updateProfile } = useProfile();

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-[480px] mx-auto">
      {/* Status bar removed - PWA/WebView mobile */}

      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center h-14 px-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="h-9 w-9 p-0">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-semibold ml-3">Language & Region</h1>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-auto px-4 py-6 space-y-6">
        {/* App Language */}
        <div className="space-y-2">
          <Label htmlFor="language" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            App Language
          </Label>
          <Select
            value={profile.appLanguage}
            onValueChange={(value: 'es' | 'en' | 'pt') => updateProfile({ appLanguage: value })}
          >
            <SelectTrigger id="language">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGES.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Interface language (requires app restart)
          </p>
        </div>

        {/* Region */}
        <div className="space-y-2">
          <Label htmlFor="region" className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Region
          </Label>
          <Select
            value={profile.region}
            onValueChange={(value) => updateProfile({ region: value })}
          >
            <SelectTrigger id="region">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {REGIONS.map((region) => (
                <SelectItem key={region} value={region}>
                  {region}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Affects date/time formats and local content
          </p>
        </div>
      </main>
    </div>
  );
}