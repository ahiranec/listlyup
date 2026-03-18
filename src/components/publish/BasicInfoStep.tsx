/**
 * Step 2: Basic Info
 * Title, description, category, tags (pre-filled by AI if available)
 */

import { useState, useEffect } from 'react';
import { Sparkles, Tag, X, Mic, ChevronDown, ChevronRight, Info, MicOff, FolderTree, PackageCheck, Package, DollarSign, Percent } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { useVoiceInput } from '../ui/use-voice-input';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { Switch } from '../ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from '../ui/sheet';
import type { AISuggestions } from '../../lib/services/types';

interface BasicInfoStepProps {
  title: string;
  description: string;
  category: string;
  subcategory: string;
  tags: string[];
  condition?: string;
  type?: 'service' | 'sale' | 'trade' | 'free' | 'sale_or_trade';
  price?: string;
  priceNegotiable?: boolean;
  currency?: string;
  discountType?: 'none' | 'percentage' | 'fixed';
  discountValue?: string;
  aiSuggestions?: AISuggestions | null;
  onDataChange: (data: {
    title: string;
    description: string;
    category: string;
    subcategory: string;
    tags: string[];
    condition?: string;
    type?: 'service' | 'sale' | 'trade' | 'free' | 'sale_or_trade';
    price?: string;
    priceNegotiable?: boolean;
    currency?: string;
    discountType?: 'none' | 'percentage' | 'fixed';
    discountValue?: string;
  }) => void;
  onNext: () => void;
  onBack: () => void;
}

const CATEGORIES = [
  { value: 'electronics', label: 'Electronics', subcategories: ['Smartphones', 'Computers', 'Audio', 'Cameras'] },
  { value: 'fashion', label: 'Fashion & Clothing', subcategories: ['Shoes', 'Clothing', 'Accessories', 'Jewelry'] },
  { value: 'home', label: 'Home & Garden', subcategories: ['Furniture', 'Decoration', 'Kitchen', 'Tools'] },
  { value: 'sports', label: 'Sports & Outdoors', subcategories: ['Bicycles', 'Gym Equipment', 'Camping', 'Sports Gear'] },
  { value: 'vehicles', label: 'Vehicles', subcategories: ['Cars', 'Motorcycles', 'Boats', 'Parts'] },
  { value: 'services', label: 'Services', subcategories: ['Cleaning', 'Repair', 'Lessons', 'Professional'] },
];

const CURRENCIES = [
  // Latinoamérica
  { value: 'CLP', label: 'Chilean Peso (CLP)', symbol: '$', region: 'Latin America' },
  { value: 'ARS', label: 'Argentine Peso (ARS)', symbol: '$', region: 'Latin America' },
  { value: 'BRL', label: 'Brazilian Real (BRL)', symbol: 'R$', region: 'Latin America' },
  { value: 'MXN', label: 'Mexican Peso (MXN)', symbol: '$', region: 'Latin America' },
  { value: 'COP', label: 'Colombian Peso (COP)', symbol: '$', region: 'Latin America' },
  { value: 'PEN', label: 'Peruvian Sol (PEN)', symbol: 'S/', region: 'Latin America' },
  { value: 'UYU', label: 'Uruguayan Peso (UYU)', symbol: '$', region: 'Latin America' },
  { value: 'BOB', label: 'Bolivian Boliviano (BOB)', symbol: 'Bs', region: 'Latin America' },
  { value: 'PYG', label: 'Paraguayan Guaraní (PYG)', symbol: '₲', region: 'Latin America' },
  { value: 'VES', label: 'Venezuelan Bolívar (VES)', symbol: 'Bs.', region: 'Latin America' },
  
  // Norteamérica
  { value: 'USD', label: 'US Dollar (USD)', symbol: '$', region: 'North America' },
  { value: 'CAD', label: 'Canadian Dollar (CAD)', symbol: 'CA$', region: 'North America' },
  
  // Europa
  { value: 'EUR', label: 'Euro (EUR)', symbol: '€', region: 'Europe' },
  { value: 'GBP', label: 'British Pound (GBP)', symbol: '£', region: 'Europe' },
  { value: 'CHF', label: 'Swiss Franc (CHF)', symbol: 'CHF', region: 'Europe' },
  { value: 'SEK', label: 'Swedish Krona (SEK)', symbol: 'kr', region: 'Europe' },
  { value: 'NOK', label: 'Norwegian Krone (NOK)', symbol: 'kr', region: 'Europe' },
  { value: 'DKK', label: 'Danish Krone (DKK)', symbol: 'kr', region: 'Europe' },
  { value: 'PLN', label: 'Polish Złoty (PLN)', symbol: 'zł', region: 'Europe' },
  
  // Asia
  { value: 'JPY', label: 'Japanese Yen (JPY)', symbol: '¥', region: 'Asia' },
  { value: 'CNY', label: 'Chinese Yuan (CNY)', symbol: '¥', region: 'Asia' },
  { value: 'KRW', label: 'South Korean Won (KRW)', symbol: '₩', region: 'Asia' },
  { value: 'INR', label: 'Indian Rupee (INR)', symbol: '₹', region: 'Asia' },
  { value: 'SGD', label: 'Singapore Dollar (SGD)', symbol: 'S$', region: 'Asia' },
  { value: 'HKD', label: 'Hong Kong Dollar (HKD)', symbol: 'HK$', region: 'Asia' },
  { value: 'THB', label: 'Thai Baht (THB)', symbol: '฿', region: 'Asia' },
  { value: 'MYR', label: 'Malaysian Ringgit (MYR)', symbol: 'RM', region: 'Asia' },
  
  // Oceanía
  { value: 'AUD', label: 'Australian Dollar (AUD)', symbol: 'A$', region: 'Oceania' },
  { value: 'NZD', label: 'New Zealand Dollar (NZD)', symbol: 'NZ$', region: 'Oceania' },
  
  // Otros
  { value: 'ZAR', label: 'South African Rand (ZAR)', symbol: 'R', region: 'Africa' },
  { value: 'TRY', label: 'Turkish Lira (TRY)', symbol: '₺', region: 'Middle East' },
  { value: 'RUB', label: 'Russian Ruble (RUB)', symbol: '₽', region: 'Europe' },
];

const CONDITIONS = [
  { value: 'new', label: 'New', description: 'Never used, in original packaging' },
  { value: 'like-new', label: 'Like New', description: 'Barely used, excellent condition' },
  { value: 'good', label: 'Good', description: 'Used with minor wear' },
  { value: 'fair', label: 'Fair', description: 'Well used, still functional' },
  { value: 'for-parts', label: 'For Parts', description: 'Not working or damaged' },
];

// Main listing types (Level 1)
const MAIN_LISTING_TYPES = [
  { value: 'product', label: 'Product', description: 'Physical item to sell or trade' },
  { value: 'service', label: 'Service', description: 'Offer a service' },
];

// Product subtypes (Level 2 - only for Product)
const PRODUCT_SUBTYPES = [
  { value: 'sale', label: 'For Sale', description: 'Set a price' },
  { value: 'sale_or_trade', label: 'For Sale or For Trade', description: 'Open to both options' },
  { value: 'trade', label: 'For Trade', description: 'No money involved' },
  { value: 'free', label: 'Free', description: 'Give it away' },
];

// Service subtypes (Level 2 - only for Service)
const SERVICE_SUBTYPES = [
  { value: 'service', label: 'For Sale', description: 'Paid service' },
  { value: 'free', label: 'Free', description: 'Free service' },
];

export function BasicInfoStep({
  title,
  description,
  category,
  subcategory,
  tags,
  condition,
  type = 'sale',
  price,
  priceNegotiable,
  currency,
  discountType,
  discountValue,
  aiSuggestions,
  onDataChange,
  onNext,
  onBack,
}: BasicInfoStepProps) {
  const [localTitle, setLocalTitle] = useState(title);
  const [localDescription, setLocalDescription] = useState(description);
  const [localCategory, setLocalCategory] = useState(category || 'electronics');
  const [localSubcategory, setLocalSubcategory] = useState(subcategory);
  const [localTags, setLocalTags] = useState(tags);
  const [localCondition, setLocalCondition] = useState(condition || 'new');
  const [localType, setLocalType] = useState(type);
  const [localPrice, setLocalPrice] = useState(price || '');
  const [localNegotiable, setLocalNegotiable] = useState(priceNegotiable || false);
  const [localCurrency, setLocalCurrency] = useState(currency || 'CLP');
  const [localDiscountType, setLocalDiscountType] = useState(discountType || 'none');
  const [localDiscountValue, setLocalDiscountValue] = useState(discountValue || '');
  const [newTag, setNewTag] = useState('');
  const [showAISuggestions, setShowAISuggestions] = useState(!!aiSuggestions);
  const [showUnavailableDialog, setShowUnavailableDialog] = useState(false);

  // Collapsible states
  const [unifiedTypeOpen, setUnifiedTypeOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [subcategoryOpen, setSubcategoryOpen] = useState(false);
  const [conditionOpen, setConditionOpen] = useState(false);
  const [descriptionOpen, setDescriptionOpen] = useState(false);

  // Determine if we're dealing with a product or service
  const isService = localType === 'service';
  const isProduct = ['sale', 'trade', 'free', 'sale_or_trade'].includes(localType);
  const mainType = isService ? 'service' : 'product';
  
  const needsPrice = localType === 'sale' || localType === 'service' || localType === 'sale_or_trade';

  // Voice input for title
  const titleVoice = useVoiceInput({
    onTranscript: (text) => {
      setLocalTitle((prev) => {
        const newText = prev ? `${prev} ${text}` : text;
        return newText.slice(0, 80); // Respect max length
      });
    },
    language: 'es-CL',
  });

  // Voice input for description
  const descriptionVoice = useVoiceInput({
    onTranscript: (text) => {
      setLocalDescription((prev) => {
        const newText = prev ? `${prev} ${text}` : text;
        return newText.slice(0, 1000); // Respect max length
      });
    },
    language: 'es-CL',
  });

  // Get subcategories for selected category
  const selectedCategoryData = CATEGORIES.find(c => c.value === localCategory);
  const availableSubcategories = selectedCategoryData?.subcategories || [];

  useEffect(() => {
    onDataChange({
      title: localTitle,
      description: localDescription,
      category: localCategory,
      subcategory: localSubcategory,
      tags: localTags,
      condition: localCondition,
      type: localType,
      price: localPrice,
      priceNegotiable: localNegotiable,
      currency: localCurrency,
      discountType: localDiscountType,
      discountValue: localDiscountValue,
    });
  }, [localTitle, localDescription, localCategory, localSubcategory, localTags, localCondition, localType, localPrice, localNegotiable, localCurrency, localDiscountType, localDiscountValue]);

  // Clear voice errors when user types manually
  useEffect(() => {
    if (titleVoice.error) {
      titleVoice.resetTranscript();
    }
  }, [localTitle]);

  useEffect(() => {
    if (descriptionVoice.error) {
      descriptionVoice.resetTranscript();
    }
  }, [localDescription]);

  const applyAISuggestions = () => {
    if (!aiSuggestions) return;
    
    if (aiSuggestions.title) setLocalTitle(aiSuggestions.title);
    if (aiSuggestions.description) setLocalDescription(aiSuggestions.description);
    if (aiSuggestions.category) {
      const matchedCategory = CATEGORIES.find(c => 
        c.label.toLowerCase().includes(aiSuggestions.category!.toLowerCase())
      );
      if (matchedCategory) setLocalCategory(matchedCategory.value);
    }
    if (aiSuggestions.hashtags) {
      setLocalTags(aiSuggestions.hashtags.map(h => h.replace('#', '')));
    }
    
    setShowAISuggestions(false);
  };

  const addTag = () => {
    if (newTag.trim() && !localTags.includes(newTag.trim())) {
      setLocalTags([...localTags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setLocalTags(localTags.filter(t => t !== tagToRemove));
  };

  const getMainTypeLabel = () => {
    if (localType === 'service') return 'Service';
    return 'Product';
  };

  const getProductSubtypeLabel = () => {
    return PRODUCT_SUBTYPES.find(opt => opt.value === localType)?.label || 'Select...';
  };

  const getServiceSubtypeLabel = () => {
    return SERVICE_SUBTYPES.find(opt => opt.value === localType)?.label || 'Select...';
  };

  // Get unified label showing "Product - For Sale" or "Service - Free", etc.
  const getUnifiedLabel = () => {
    const mainLabel = getMainTypeLabel();
    let subtypeLabel = '';
    
    if (isProduct) {
      subtypeLabel = getProductSubtypeLabel();
    } else if (isService) {
      subtypeLabel = getServiceSubtypeLabel();
    }
    
    return `${mainLabel} - ${subtypeLabel}`;
  };

  const canProceed = localTitle.trim().length >= 3 && 
                     localCategory &&
                     (!needsPrice || (localPrice && parseFloat(localPrice) > 0));

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-1 overflow-auto p-3 space-y-3 w-full max-w-full mx-[0px] my-[8px]">
        
        {/* AI Suggestions Banner */}
        {showAISuggestions && aiSuggestions && (
          <Alert className="border-primary bg-primary/5">
            <Sparkles className="h-4 w-4 text-primary" />
            <AlertDescription>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-medium">AI found suggestions for you!</p>
                  <p className="text-sm mt-1">
                    Click below to auto-fill with AI-detected information
                  </p>
                </div>
                <Button
                  size="sm"
                  onClick={applyAISuggestions}
                  className="shrink-0"
                >
                  Use AI Data
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Title with Voice Input */}
        <div className="space-y-1">
          <Label htmlFor="title" className="text-sm">
            Title <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Input
              id="title"
              value={localTitle}
              onChange={(e) => setLocalTitle(e.target.value)}
              placeholder="Enter a descriptive title"
              maxLength={80}
              className={`pr-10 ${localTitle.trim().length >= 3 ? '' : 'border-primary'}`}
            />
            {titleVoice.isSupported && titleVoice.permissionState !== 'denied' ? (
              <button
                type="button"
                onClick={titleVoice.toggleListening}
                className={`absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-full transition-colors ${
                  titleVoice.isListening 
                    ? 'bg-red-500 text-white animate-pulse' 
                    : 'text-muted-foreground hover:text-primary hover:bg-primary/10'
                }`}
                title={titleVoice.isListening ? 'Stop recording' : 'Voice input'}
              >
                <Mic className="w-4 h-4" />
              </button>
            ) : titleVoice.permissionState === 'denied' ? (
              <button
                type="button"
                onClick={() => setShowUnavailableDialog(true)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-red-400 cursor-pointer"
              >
                <MicOff className="w-4 h-4" />
              </button>
            ) : null}
          </div>
          <p className="text-xs text-muted-foreground">
            {localTitle.length}/80 ��� min. 3 char
          </p>
        </div>

        {/* Description with Voice Input */}
        <Collapsible open={descriptionOpen} onOpenChange={setDescriptionOpen}>
          <div className="bg-white rounded-xl border border-gray-200/50 p-2.5 shadow-sm">
            <CollapsibleTrigger className="w-full">
              <div className={`text-sm font-semibold text-foreground flex items-center justify-between gap-2 ${descriptionOpen ? 'mb-3' : ''}`}>
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <FolderTree className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <span>Description</span>
                  {!descriptionOpen && (
                    <span className="text-xs font-normal text-muted-foreground ml-2 truncate">
                      • {localDescription.length}/1000
                    </span>
                  )}
                </div>
                <ChevronDown className={`w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${descriptionOpen ? '' : '-rotate-90'}`} />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="relative">
                <Textarea
                  id="description"
                  value={localDescription}
                  onChange={(e) => setLocalDescription(e.target.value)}
                  placeholder="Add details (recommended)"
                  rows={3}
                  maxLength={1000}
                  className="pr-10 resize-none"
                />
                {descriptionVoice.isSupported && descriptionVoice.permissionState !== 'denied' ? (
                  <button
                    type="button"
                    onClick={descriptionVoice.toggleListening}
                    className={`absolute right-2.5 top-2.5 p-1 rounded-full transition-colors ${
                      descriptionVoice.isListening 
                        ? 'bg-red-500 text-white animate-pulse' 
                        : 'text-muted-foreground hover:text-primary hover:bg-primary/10'
                    }`}
                    title={descriptionVoice.isListening ? 'Stop recording' : 'Voice input'}
                  >
                    <Mic className="w-4 h-4" />
                  </button>
                ) : descriptionVoice.permissionState === 'denied' ? (
                  <button
                    type="button"
                    onClick={() => setShowUnavailableDialog(true)}
                    className="absolute right-2.5 top-2.5 p-1 rounded-full text-red-400 cursor-pointer"
                  >
                    <MicOff className="w-4 h-4" />
                  </button>
                ) : null}
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>

        {/* Unified Type Selector - Collapsible (Product/Service + Offer Type) */}
        <Collapsible open={unifiedTypeOpen} onOpenChange={setUnifiedTypeOpen}>
          <div className="bg-white rounded-xl border border-gray-200/50 p-2.5 shadow-sm">
            <CollapsibleTrigger className="w-full">
              <div className={`text-sm font-semibold text-foreground flex items-center justify-between gap-2 ${unifiedTypeOpen ? 'mb-3' : ''}`}>
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <Package className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <span>Listing Type <span className="text-red-500">*</span></span>
                  {!unifiedTypeOpen && (
                    <span className="text-xs font-normal text-muted-foreground ml-2 truncate">
                      • {getUnifiedLabel()}
                    </span>
                  )}
                </div>
                <ChevronDown className={`w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${unifiedTypeOpen ? '' : '-rotate-90'}`} />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="space-y-4">
                {/* Level 1: Product or Service */}
                <RadioGroup 
                  value={mainType} 
                  onValueChange={(v) => {
                    if (v === 'service') {
                      setLocalType('service');
                    } else {
                      setLocalType('sale');
                    }
                  }}
                >
                  {MAIN_LISTING_TYPES.map((option) => (
                    <div 
                      key={option.value}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50"
                    >
                      <RadioGroupItem value={option.value} id={`main-${option.value}`} />
                      <Label htmlFor={`main-${option.value}`} className="font-medium cursor-pointer">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                {/* Level 2: Offer Type (Product subtypes) */}
                {isProduct && (
                  <div className="border-t pt-3">
                    <RadioGroup 
                      value={localType} 
                      onValueChange={(v) => {
                        setLocalType(v as any);
                        setTimeout(() => setUnifiedTypeOpen(false), 300);
                      }}
                    >
                      {PRODUCT_SUBTYPES.map((option) => (
                        <div 
                          key={option.value}
                          className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50"
                        >
                          <RadioGroupItem value={option.value} id={`subtype-${option.value}`} />
                          <Label htmlFor={`subtype-${option.value}`} className="font-medium cursor-pointer">
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                )}

                {/* Level 2: Offer Type (Service subtypes) */}
                {isService && (
                  <div className="border-t pt-3">
                    <RadioGroup 
                      value={localType} 
                      onValueChange={(v) => {
                        setLocalType(v as any);
                        setTimeout(() => setUnifiedTypeOpen(false), 300);
                      }}
                    >
                      {SERVICE_SUBTYPES.map((option) => (
                        <div 
                          key={option.value}
                          className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50"
                        >
                          <RadioGroupItem value={option.value} id={`service-subtype-${option.value}`} />
                          <Label htmlFor={`service-subtype-${option.value}`} className="font-medium cursor-pointer">
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                )}
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>

        {/* Price Configuration - For sale/service types with Sheet on title */}
        {needsPrice && (
          <Sheet>
            <div className="w-full bg-white rounded-xl p-2.5 shadow-sm">
              <SheetTrigger asChild>
                <button className="w-full text-left">
                  <div className="text-sm font-semibold text-foreground flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span>Price <span className="text-red-500">*</span></span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  </div>
                </button>
              </SheetTrigger>

              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                    {CURRENCIES.find(c => c.value === localCurrency)?.symbol}
                  </span>
                  <Input
                    type="number"
                    value={localPrice}
                    onChange={(e) => setLocalPrice(e.target.value)}
                    placeholder="0.00"
                    className={`pl-8 ${localPrice && parseFloat(localPrice) > 0 ? 'border-gray-200' : 'border-primary'}`}
                    min="0"
                    step="0.01"
                  />
                </div>
                <span className="text-xs text-muted-foreground flex-shrink-0 min-w-[35px]">
                  {localCurrency}
                </span>
              </div>

              <SheetContent side="bottom" className="h-[90vh] flex flex-col p-0">
                <SheetHeader className="border-b p-4">
                  <SheetTitle>Price Configuration</SheetTitle>
                  <SheetDescription className="sr-only">
                    Configure the price, currency, and discount options for your listing
                  </SheetDescription>
                </SheetHeader>
                
                <div className="flex-1 overflow-auto p-4 space-y-6">
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold">Currency</Label>
                    <Select value={localCurrency} onValueChange={setLocalCurrency}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select currency">
                          {CURRENCIES.find(c => c.value === localCurrency)?.label || 'Select currency'}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px]">
                        {CURRENCIES.map((curr) => (
                          <SelectItem key={curr.value} value={curr.value}>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-sm">{curr.symbol}</span>
                              <span>{curr.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="price-amount" className="text-sm font-semibold">
                      Amount <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        {CURRENCIES.find(c => c.value === localCurrency)?.symbol}
                      </span>
                      <Input
                        id="price-amount"
                        type="number"
                        value={localPrice}
                        onChange={(e) => setLocalPrice(e.target.value)}
                        placeholder="0.00"
                        className="pl-8 text-lg"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <Label htmlFor="price-negotiable" className="font-medium cursor-pointer">
                      Price is negotiable
                    </Label>
                    <Switch
                      id="price-negotiable"
                      checked={localNegotiable}
                      onCheckedChange={setLocalNegotiable}
                    />
                  </div>

                  <div className="space-y-3 pt-3 border-t">
                    <Label className="text-sm font-semibold">Discount (Optional)</Label>
                    
                    <RadioGroup value={localDiscountType} onValueChange={(v) => setLocalDiscountType(v as any)}>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer">
                          <RadioGroupItem value="none" id="discount-none" />
                          <Label htmlFor="discount-none" className="font-medium cursor-pointer flex-1">
                            No discount
                          </Label>
                        </div>
                        
                        <div className="flex items-center gap-2 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer">
                          <RadioGroupItem value="percentage" id="discount-percentage" />
                          <Label htmlFor="discount-percentage" className="font-medium cursor-pointer flex-1">
                            Percentage
                          </Label>
                          <Percent className="w-4 h-4 text-muted-foreground" />
                        </div>
                        
                        <div className="flex items-center gap-2 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer">
                          <RadioGroupItem value="fixed" id="discount-fixed" />
                          <Label htmlFor="discount-fixed" className="font-medium cursor-pointer flex-1">
                            Fixed amount
                          </Label>
                          <DollarSign className="w-4 h-4 text-muted-foreground" />
                        </div>
                      </div>
                    </RadioGroup>

                    {localDiscountType !== 'none' && (
                      <div className="mt-3">
                        <div className="relative">
                          {localDiscountType === 'percentage' ? (
                            <>
                              <Input
                                type="number"
                                value={localDiscountValue}
                                onChange={(e) => setLocalDiscountValue(e.target.value)}
                                placeholder="0"
                                className="pr-8"
                                min="0"
                                max="100"
                              />
                              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                %
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                {CURRENCIES.find(c => c.value === localCurrency)?.symbol}
                              </span>
                              <Input
                                type="number"
                                value={localDiscountValue}
                                onChange={(e) => setLocalDiscountValue(e.target.value)}
                                placeholder="0.00"
                                className="pl-8"
                                min="0"
                                step="0.01"
                              />
                            </>
                          )}
                        </div>
                      </div>
                    )}

                    {localPrice && parseFloat(localPrice) > 0 && localDiscountType !== 'none' && localDiscountValue && parseFloat(localDiscountValue) > 0 && (
                      <div className="mt-4 p-4 bg-primary/5 rounded-xl border border-primary/20">
                        <p className="text-xs text-muted-foreground mb-1">Final price after discount:</p>
                        <p className="text-xl font-semibold text-primary">
                          {CURRENCIES.find(c => c.value === localCurrency)?.symbol}
                          {(() => {
                            const price = parseFloat(localPrice);
                            const discount = parseFloat(localDiscountValue);
                            if (localDiscountType === 'percentage') {
                              return (price - (price * discount / 100)).toFixed(2);
                            } else {
                              return (price - discount).toFixed(2);
                            }
                          })()}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          <span className="line-through">
                            {CURRENCIES.find(c => c.value === localCurrency)?.symbol}{parseFloat(localPrice).toFixed(2)}
                          </span>
                          {' '}
                          {localDiscountType === 'percentage' 
                            ? `(${localDiscountValue}% off)` 
                            : `(-${CURRENCIES.find(c => c.value === localCurrency)?.symbol}${parseFloat(localDiscountValue).toFixed(2)})`
                          }
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="border-t p-4 bg-white">
                  <SheetTrigger asChild>
                    <Button className="w-full">
                      Save Price
                    </Button>
                  </SheetTrigger>
                </div>
              </SheetContent>

              {localNegotiable && (
                <p className="text-xs text-muted-foreground mt-2">
                  • Price is negotiable
                </p>
              )}
              {localDiscountType !== 'none' && localDiscountValue && parseFloat(localDiscountValue) > 0 && (
                <p className="text-xs text-primary mt-1">
                  • {localDiscountType === 'percentage' 
                      ? `${localDiscountValue}% discount` 
                      : `${CURRENCIES.find(c => c.value === localCurrency)?.symbol}${parseFloat(localDiscountValue).toFixed(2)} discount`}
                </p>
              )}
            </div>
          </Sheet>
        )}

        {/* Condition - Collapsible with RadioGroup */}
        <Collapsible open={conditionOpen} onOpenChange={setConditionOpen}>
          <div className="bg-white rounded-xl border border-gray-200/50 p-2.5 shadow-sm">
            <CollapsibleTrigger className="w-full">
              <div className={`text-sm font-semibold text-foreground flex items-center justify-between gap-2 ${conditionOpen ? 'mb-3' : ''}`}>
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <PackageCheck className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <span>Condition</span>
                  {!conditionOpen && (
                    <span className="text-xs font-normal text-muted-foreground ml-2 truncate">
                      • {localCondition 
                          ? CONDITIONS.find(c => c.value === localCondition)?.label 
                          : 'All Conditions'}
                    </span>
                  )}
                </div>
                <ChevronDown className={`w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${conditionOpen ? '' : '-rotate-90'}`} />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <RadioGroup value={localCondition} onValueChange={(value) => {
                setLocalCondition(value);
                setConditionOpen(false);
              }}>
                {CONDITIONS.map((cond) => (
                  <div 
                    key={cond.value} 
                    className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg sm:rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <RadioGroupItem 
                      value={cond.value} 
                      id={`cond-${cond.value}`}
                      className="data-[state=checked]:bg-primary data-[state=checked]:border-primary flex-shrink-0"
                    />
                    <Label 
                      htmlFor={`cond-${cond.value}`} 
                      className="flex-1 cursor-pointer text-xs sm:text-sm font-medium text-foreground truncate"
                    >
                      {cond.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CollapsibleContent>
          </div>
        </Collapsible>

        {/* Category + Subcategory Combined */}
        <div className="bg-white rounded-xl border border-gray-200/50 p-2.5 shadow-sm space-y-3">
          <Collapsible open={categoryOpen} onOpenChange={setCategoryOpen}>
            <div>
              <CollapsibleTrigger className="w-full">
                <div className={`text-sm font-semibold text-foreground flex items-center justify-between gap-2 ${categoryOpen ? 'mb-3' : ''}`}>
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <FolderTree className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <span>Category <span className="text-red-500">*</span></span>
                    {!categoryOpen && (
                      <span className="text-xs font-normal text-muted-foreground ml-2 truncate">
                        • {localCategory 
                            ? CATEGORIES.find(c => c.value === localCategory)?.label 
                            : 'Select category...'}
                      </span>
                    )}
                  </div>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${categoryOpen ? '' : '-rotate-90'}`} />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <RadioGroup value={localCategory} onValueChange={(value) => {
                  setLocalCategory(value);
                  setLocalSubcategory('');
                  setCategoryOpen(false);
                }}>
                  {CATEGORIES.map((cat) => (
                    <div 
                      key={cat.value} 
                      className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg sm:rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <RadioGroupItem 
                        value={cat.value} 
                        id={`cat-${cat.value}`}
                        className="data-[state=checked]:bg-primary data-[state=checked]:border-primary flex-shrink-0"
                      />
                      <Label 
                        htmlFor={`cat-${cat.value}`} 
                        className="flex-1 cursor-pointer text-xs sm:text-sm font-medium text-foreground truncate"
                      >
                        {cat.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CollapsibleContent>
            </div>
          </Collapsible>

          {localCategory && (
            <Collapsible open={subcategoryOpen} onOpenChange={setSubcategoryOpen}>
              <div className="border-t pt-3">
                <CollapsibleTrigger className="w-full">
                  <div className={`text-sm font-semibold text-foreground flex items-center justify-between gap-2 ${subcategoryOpen ? 'mb-3' : ''}`}>
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <FolderTree className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span>Subcategory</span>
                      {!subcategoryOpen && (
                        <span className="text-xs font-normal text-muted-foreground ml-2 truncate">
                          • {localSubcategory 
                              ? availableSubcategories.find(s => s.toLowerCase() === localSubcategory)
                              : 'Optional'}
                        </span>
                      )}
                    </div>
                    <ChevronDown className={`w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${subcategoryOpen ? '' : '-rotate-90'}`} />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <RadioGroup value={localSubcategory} onValueChange={(value) => {
                    setLocalSubcategory(value);
                    setSubcategoryOpen(false);
                  }}>
                    {availableSubcategories.map((sub) => (
                      <div 
                        key={sub} 
                        className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg sm:rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <RadioGroupItem 
                          value={sub.toLowerCase()} 
                          id={`sub-${sub}`}
                          className="data-[state=checked]:bg-primary data-[state=checked]:border-primary flex-shrink-0"
                        />
                        <Label 
                          htmlFor={`sub-${sub}`} 
                          className="flex-1 cursor-pointer text-xs sm:text-sm font-medium text-foreground truncate"
                        >
                          {sub}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </CollapsibleContent>
              </div>
            </Collapsible>
          )}
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <Label htmlFor="tags">
            Tags (Optional)
          </Label>
          <p className="text-xs text-muted-foreground">Help buyers find your listing</p>
          <div className="flex gap-2">
            <Input
              id="tags"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              placeholder="e.g., vintage, handmade, gaming"
              maxLength={20}
              className="flex-1"
            />
            <Button
              type="button"
              variant="outline"
              onClick={addTag}
              disabled={!newTag.trim()}
              className="shrink-0"
            >
              Add
            </Button>
          </div>
          
          {localTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3 p-3 bg-gray-50 rounded-xl border border-gray-200/50">
              {localTags.map(tag => (
                <Badge key={tag} variant="secondary" className="gap-1.5 pl-2.5 pr-1.5 py-1">
                  #{tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="ml-0.5 hover:text-destructive transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Bottom Actions */}
      <div className="border-t p-4 bg-white w-full space-y-2">
        {!canProceed && (
          <p className="text-xs text-center text-muted-foreground">
            {localTitle.trim().length < 3 && '• Title must be at least 3 characters\n'}
            {needsPrice && (!localPrice || parseFloat(localPrice) <= 0) && '• Set a valid price\n'}
            {!localCategory && '• Select a category'}
          </p>
        )}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex-1"
          >
            Back
          </Button>
          <Button
            onClick={onNext}
            disabled={!canProceed}
            className="flex-1"
          >
            Continue
          </Button>
        </div>
      </div>

      {/* Unavailable Feature Dialog */}
      <Dialog open={showUnavailableDialog} onOpenChange={setShowUnavailableDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Feature Unavailable</DialogTitle>
            <DialogDescription>
              This feature is currently unavailable
            </DialogDescription>
          </DialogHeader>
          <button
            onClick={() => setShowUnavailableDialog(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </DialogContent>
      </Dialog>
    </div>
  );
}