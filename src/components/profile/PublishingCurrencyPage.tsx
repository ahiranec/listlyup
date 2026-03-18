/**
 * Publishing - Default Currency Page
 */

import { ArrowLeft, DollarSign } from 'lucide-react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useProfile } from '../../contexts/ProfileContext';

interface PublishingCurrencyPageProps {
  onBack: () => void;
}

const CURRENCIES = [
  // Latin America
  { value: 'CLP', label: 'Chilean Peso (CLP)', symbol: '$', region: 'Latin America' },
  { value: 'ARS', label: 'Argentine Peso (ARS)', symbol: '$', region: 'Latin America' },
  { value: 'BRL', label: 'Brazilian Real (BRL)', symbol: 'R$', region: 'Latin America' },
  { value: 'MXN', label: 'Mexican Peso (MXN)', symbol: '$', region: 'Latin America' },
  { value: 'COP', label: 'Colombian Peso (COP)', symbol: '$', region: 'Latin America' },
  { value: 'PEN', label: 'Peruvian Sol (PEN)', symbol: 'S/', region: 'Latin America' },
  { value: 'UYU', label: 'Uruguayan Peso (UYU)', symbol: '$', region: 'Latin America' },
  
  // North America
  { value: 'USD', label: 'US Dollar (USD)', symbol: '$', region: 'North America' },
  { value: 'CAD', label: 'Canadian Dollar (CAD)', symbol: 'CA$', region: 'North America' },
  
  // Europe
  { value: 'EUR', label: 'Euro (EUR)', symbol: '€', region: 'Europe' },
  { value: 'GBP', label: 'British Pound (GBP)', symbol: '£', region: 'Europe' },
  
  // Asia
  { value: 'JPY', label: 'Japanese Yen (JPY)', symbol: '¥', region: 'Asia' },
  { value: 'CNY', label: 'Chinese Yuan (CNY)', symbol: '¥', region: 'Asia' },
];

export function PublishingCurrencyPage({ onBack }: PublishingCurrencyPageProps) {
  const { profile, updateProfile } = useProfile();

  // Group currencies by region
  const currenciesByRegion = CURRENCIES.reduce((acc, curr) => {
    if (!acc[curr.region]) {
      acc[curr.region] = [];
    }
    acc[curr.region].push(curr);
    return acc;
  }, {} as Record<string, typeof CURRENCIES>);

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-[480px] mx-auto">
      {/* Status bar removed - PWA/WebView mobile */}

      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center h-14 px-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="h-9 w-9 p-0">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-semibold ml-3">Default Currency</h1>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-auto px-4 py-6 space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-900">
            This currency will be pre-selected when creating new listings. You can change it for individual items.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="currency" className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Select Currency
          </Label>
          <Select
            value={profile.defaultCurrency}
            onValueChange={(value) => updateProfile({ defaultCurrency: value })}
          >
            <SelectTrigger id="currency">
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(currenciesByRegion).map(([region, currencies]) => (
                <div key={region}>
                  <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                    {region}
                  </div>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.value} value={currency.value}>
                      {currency.symbol} {currency.label}
                    </SelectItem>
                  ))}
                </div>
              ))}
            </SelectContent>
          </Select>
        </div>
      </main>
    </div>
  );
}