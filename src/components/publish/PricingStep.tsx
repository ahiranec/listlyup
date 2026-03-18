/**
 * Step 4: Visibility & Contact
 * v1.2 - CANONICAL ALIGNED
 */

import { useState, useEffect } from 'react';
import { Package, MessageCircle, Globe, Users, ChevronDown, ExternalLink, Share2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { useProfile } from '../../contexts/ProfileContext';
import type { ListingType } from './types';
import type { ContactMethod, AccessMode, VisibilityMode } from '../../types/canonical';

interface PricingStepProps {
  listingType: ListingType;
  offerType?: 'sell' | 'trade' | 'giveaway' | 'sell_or_trade';
  price?: string;
  priceNegotiable?: boolean;
  access_mode: AccessMode[];
  contact_methods: ContactMethod[];
  contact_whatsapp_phone?: string;
  contact_website_url?: string;
  contact_social_url?: string;
  visibility_mode: VisibilityMode;
  selectedGroups?: string[];
  lockedGroups?: boolean;
  onDataChange: (data: {
    type: 'service' | 'sale' | 'trade' | 'free' | 'sale_or_trade';
    price?: string;
    priceNegotiable?: boolean;
    access_mode: AccessMode[];
    contact_methods: ContactMethod[];
    contact_whatsapp_phone?: string;
    contact_website_url?: string;
    contact_social_url?: string;
    visibility_mode: VisibilityMode;
    selectedGroups?: string[];
  }) => void;
  onNext: () => void;
  onBack: () => void;
}

const ACCESS_OPTIONS = [
  { id: 'pickup' as AccessMode, label: 'Pickup', description: 'Buyer picks up at your location', icon: '📍' },
  { id: 'meetup' as AccessMode, label: 'Meetup', description: 'Meet nearby', icon: '🤝' },
  { id: 'delivery' as AccessMode, label: 'Delivery', description: 'You deliver within your area', icon: '🚚' },
  { id: 'virtual' as AccessMode, label: 'Virtual / Digital', description: 'For services or digital products', icon: '🌐' },
];

const CONTACT_OPTIONS = [
  { id: 'in_app_chat' as ContactMethod, label: 'In-App Chat', description: 'Message through ListlyUp (Recommended)' },
  { id: 'whatsapp' as ContactMethod, label: 'WhatsApp', description: 'Contact via WhatsApp' },
  { id: 'website' as ContactMethod, label: 'Website', description: 'Direct to your website' },
  { id: 'social_media' as ContactMethod, label: 'Social Media', description: 'Instagram, Facebook, etc.' },
];

const VISIBILITY_OPTIONS = [
  { id: 'public' as VisibilityMode, label: 'Public', description: 'Anyone can see this listing', icon: Globe },
  { id: 'groups_only' as VisibilityMode, label: 'Groups Only', description: 'Only members of selected groups', icon: Users },
];

const AVAILABLE_GROUPS = [
  { id: 'viña-del-mar', name: 'Viña del Mar Community', members: 1234 },
  { id: 'valparaiso', name: 'Valparaíso Marketplace', members: 3456 },
  { id: 'tech-chile', name: 'Tech Chile', members: 890 },
  { id: 'reñaca-neighbors', name: 'Reñaca Neighbors', members: 567 },
  { id: 'con-con-local', name: 'Con Con Local', members: 234 },
];

export function PricingStep({
  listingType,
  offerType,
  price,
  priceNegotiable,
  access_mode,
  contact_methods,
  contact_whatsapp_phone,
  contact_website_url,
  contact_social_url,
  visibility_mode,
  selectedGroups,
  lockedGroups,
  onDataChange,
  onNext,
  onBack,
}: PricingStepProps) {
  const { profile } = useProfile();
  const [localPrice, setLocalPrice] = useState(price || '');
  const [localNegotiable, setLocalNegotiable] = useState(priceNegotiable || false);
  const [localAccessModes, setLocalAccessModes] = useState(access_mode);
  const [localContactMethods, setLocalContactMethods] = useState(contact_methods);
  const [localWhatsAppPhone, setLocalWhatsAppPhone] = useState(contact_whatsapp_phone || '');
  const [localWebsiteUrl, setLocalWebsiteUrl] = useState(contact_website_url || '');
  const [localSocialUrl, setLocalSocialUrl] = useState(contact_social_url || '');
  const [localVisibilityMode, setLocalVisibilityMode] = useState<VisibilityMode>(visibility_mode);
  const [localSelectedGroups, setLocalSelectedGroups] = useState<string[]>(selectedGroups || []);

  // Collapsible states
  const [accessOpen, setAccessOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [visibilityOpen, setVisibilityOpen] = useState(false);

  // Detectar si es Product, Service o Event
  const isProduct = listingType === 'product';
  const isService = listingType === 'service';
  const isEvent = listingType === 'event';
  const showAccess = !isEvent; // Mostrar para products y services, ocultar solo para events

  // ✅ APLICAR DEFAULTS DINÁMICOS para Products
  useEffect(() => {
    // Solo aplicar si:
    // 1. Es producto
    // 2. access_modes está vacío (usuario no ha seleccionado)
    // 3. Hay profile con defaults
    if (isProduct && access_mode.length === 0 && profile) {
      const defaults: AccessMode[] = [];
      if (profile.defaultDelivery.pickup) defaults.push('pickup');
      if (profile.defaultDelivery.meetup) defaults.push('meetup');
      if (profile.defaultDelivery.delivery) defaults.push('delivery');
      if (profile.defaultDelivery.virtual) defaults.push('virtual');
      
      if (defaults.length > 0) {
        setLocalAccessModes(defaults);
      }
    }
  }, []); // Solo al montar el componente

  const needsWhatsAppPhone = localContactMethods.includes('whatsapp');
  const needsWebsiteUrl = localContactMethods.includes('website');
  const needsSocialUrl = localContactMethods.includes('social_media');
  const needsGroups = localVisibilityMode === 'groups_only';

  useEffect(() => {
    onDataChange({
      type: listingType,
      price: localPrice,
      priceNegotiable: localNegotiable,
      access_mode: localAccessModes,
      contact_methods: localContactMethods,
      contact_whatsapp_phone: localContactMethods.includes('whatsapp') 
        ? localWhatsAppPhone 
        : undefined,
      contact_website_url: localContactMethods.includes('website') 
        ? localWebsiteUrl 
        : undefined,
      contact_social_url: localContactMethods.includes('social_media') 
        ? localSocialUrl 
        : undefined,
      visibility_mode: localVisibilityMode,
      selectedGroups: localVisibilityMode === 'groups_only' ? localSelectedGroups : undefined,
    });
  }, [localPrice, localNegotiable, localAccessModes, localContactMethods, localWhatsAppPhone, localWebsiteUrl, localSocialUrl, localVisibilityMode, localSelectedGroups]);

  const toggleAccessMode = (mode: AccessMode) => {
    if (localAccessModes.includes(mode)) {
      setLocalAccessModes(localAccessModes.filter(m => m !== mode));
    } else {
      setLocalAccessModes([...localAccessModes, mode]);
    }
  };

  const toggleContactMethod = (mode: ContactMethod) => {
    if (localContactMethods.includes(mode)) {
      setLocalContactMethods(localContactMethods.filter(m => m !== mode));
    } else {
      setLocalContactMethods([...localContactMethods, mode]);
    }
  };

  const toggleGroup = (groupId: string) => {
    if (localSelectedGroups.includes(groupId)) {
      setLocalSelectedGroups(localSelectedGroups.filter(g => g !== groupId));
    } else {
      setLocalSelectedGroups([...localSelectedGroups, groupId]);
    }
  };
  
  // ✅ VALIDACIÓN CONTEXTUAL: Solo products requieren delivery methods
  const canProceed = 
    (isService || localAccessModes.length > 0) && // Products requieren delivery, Services opcional
    localContactMethods.length > 0 &&
    (!needsWhatsAppPhone || localWhatsAppPhone.length >= 9) &&
    (!needsGroups || localSelectedGroups.length > 0);

  const getAccessModesSummary = () => {
    if (localAccessModes.length === 0) return 'None selected';
    return localAccessModes.map(id => ACCESS_OPTIONS.find(o => o.id === id)?.label).join(', ');
  };

  const getContactModesSummary = () => {
    if (localContactMethods.length === 0) return 'None selected';
    return localContactMethods.map(id => CONTACT_OPTIONS.find(o => o.id === id)?.label).join(', ');
  };

  const getVisibilityLabel = () => {
    return VISIBILITY_OPTIONS.find(opt => opt.id === localVisibilityMode)?.label || 'Select visibility...';
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-1 overflow-auto p-4 space-y-3 w-full max-w-full mx-[0px] my-[20px]">
        
        {/* ===== SECTION 1: VISIBILITY ===== */}
        <Collapsible open={visibilityOpen} onOpenChange={setVisibilityOpen}>
          <div className="bg-white rounded-xl border border-gray-200/50 p-3 sm:p-4 shadow-sm">
            <CollapsibleTrigger className="w-full">
              <div className={`text-sm font-semibold text-foreground flex items-center justify-between gap-2 ${visibilityOpen ? 'mb-3' : ''}`}>
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <Globe className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <span>Visibility <span className="text-red-500">*</span></span>
                  {!visibilityOpen && (
                    <span className="text-xs font-normal text-muted-foreground ml-2 truncate">
                      • {getVisibilityLabel()}
                    </span>
                  )}
                </div>
                <ChevronDown className={`w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${visibilityOpen ? '' : '-rotate-90'}`} />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <p className="text-xs text-muted-foreground mb-3">Choose who can see this listing</p>
              
              <RadioGroup 
                value={localVisibilityMode} 
                onValueChange={(v) => {
                  setLocalVisibilityMode(v as VisibilityMode);
                  if (v !== 'groups_only') {
                    setTimeout(() => setVisibilityOpen(false), 300);
                  }
                }}
              >
                {VISIBILITY_OPTIONS.map((option) => {
                  const Icon = option.icon;
                  return (
                    <div 
                      key={option.id} 
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50"
                    >
                      <RadioGroupItem 
                        value={option.id} 
                        id={`vis-${option.id}`}
                      />
                      <label 
                        htmlFor={`vis-${option.id}`} 
                        className="flex-1 flex items-center gap-2 cursor-pointer"
                      >
                        <Icon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{option.label}</p>
                          <p className="text-xs text-muted-foreground">{option.description}</p>
                        </div>
                      </label>
                    </div>
                  );
                })}
              </RadioGroup>

              {/* Select Groups (if groups visibility) */}
              {needsGroups && !lockedGroups && (
                <div className="space-y-2 pt-3 border-t border-gray-200 mt-3">
                  <div>
                    <Label className="text-xs">Select Groups <span className="text-red-500">*</span></Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      Sharing to groups controls who can see this listing.
                    </p>
                  </div>
                  <div className="space-y-2 max-h-[200px] overflow-y-auto">
                    {AVAILABLE_GROUPS.map((group) => (
                      <div 
                        key={group.id} 
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50"
                      >
                        <Checkbox
                          id={`group-${group.id}`}
                          checked={localSelectedGroups.includes(group.id)}
                          onCheckedChange={() => toggleGroup(group.id)}
                        />
                        <label 
                          htmlFor={`group-${group.id}`} 
                          className="flex-1 cursor-pointer"
                        >
                          <p className="text-sm font-medium">{group.name}</p>
                          <p className="text-xs text-muted-foreground">{group.members.toLocaleString()} members</p>
                        </label>
                      </div>
                    ))}
                  </div>
                  {localSelectedGroups.length > 0 && (
                    <p className="text-xs text-green-600">
                      ✓ {localSelectedGroups.length} group{localSelectedGroups.length > 1 ? 's' : ''} selected
                    </p>
                  )}

                  <Button 
                    onClick={() => setVisibilityOpen(false)}
                    size="sm"
                    className="w-full mt-2"
                  >
                    Apply
                  </Button>
                </div>
              )}
              
              {/* Locked Groups Info (contextual publish from GroupDetail) */}
              {needsGroups && lockedGroups && (
                <div className="space-y-2 pt-3 border-t border-gray-200 mt-3">
                  <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                    <div className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-blue-900">
                          Posting in:
                        </p>
                        {localSelectedGroups.map((groupId) => {
                          const group = AVAILABLE_GROUPS.find(g => g.id === groupId);
                          return group ? (
                            <p key={groupId} className="text-xs text-blue-700 mt-1">
                              • {group.name}
                            </p>
                          ) : null;
                        })}
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={() => setVisibilityOpen(false)}
                    size="sm"
                    className="w-full mt-2"
                  >
                    Apply
                  </Button>
                </div>
              )}
            </CollapsibleContent>
          </div>
        </Collapsible>

        {/* ===== SECTION 2: ACCESS METHODS ===== */}
        {showAccess && (
          <Collapsible open={accessOpen} onOpenChange={setAccessOpen}>
            <div className="bg-white rounded-xl border border-gray-200/50 p-3 sm:p-4 shadow-sm">
              <CollapsibleTrigger className="w-full">
                <div className={`text-sm font-semibold text-foreground flex items-center justify-between gap-2 ${accessOpen ? 'mb-3' : ''}`}>
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <Package className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <span>Access Methods <span className="text-red-500">*</span></span>
                    {!accessOpen && (
                      <span className="text-xs font-normal text-muted-foreground ml-2 truncate">
                        • {getAccessModesSummary()}
                      </span>
                    )}
                  </div>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${accessOpen ? '' : '-rotate-90'}`} />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <p className="text-xs text-muted-foreground mb-3">
                  Select all that apply
                </p>
                
                <div className="space-y-2">
                  {ACCESS_OPTIONS.map(option => (
                    <div 
                      key={option.id} 
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50"
                    >
                      <Checkbox
                        id={`access-${option.id}`}
                        checked={localAccessModes.includes(option.id)}
                        onCheckedChange={() => toggleAccessMode(option.id)}
                      />
                      <label 
                        htmlFor={`access-${option.id}`} 
                        className="text-sm cursor-pointer flex-1"
                      >
                        <p className="font-medium">{option.label}</p>
                        <p className="text-xs text-muted-foreground">{option.description}</p>
                      </label>
                    </div>
                  ))}
                </div>

                <Button 
                  onClick={() => setAccessOpen(false)}
                  size="sm"
                  className="w-full mt-4"
                >
                  Apply
                </Button>
              </CollapsibleContent>
            </div>
          </Collapsible>
        )}

        {/* ===== SECTION 3: CONTACT METHODS ===== */}
        <Collapsible open={contactOpen} onOpenChange={setContactOpen}>
          <div className="bg-white rounded-xl border border-gray-200/50 p-3 sm:p-4 shadow-sm">
            <CollapsibleTrigger className="w-full">
              <div className={`text-sm font-semibold text-foreground flex items-center justify-between gap-2 ${contactOpen ? 'mb-3' : ''}`}>
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <MessageCircle className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <span>Contact Methods <span className="text-red-500">*</span></span>
                  {!contactOpen && (
                    <span className="text-xs font-normal text-muted-foreground ml-2 truncate">
                      • {getContactModesSummary()}
                    </span>
                  )}
                </div>
                <ChevronDown className={`w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${contactOpen ? '' : '-rotate-90'}`} />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <p className="text-xs text-muted-foreground mb-3">
                How can buyers contact you?
              </p>
              
              <div className="space-y-2">
                {CONTACT_OPTIONS.map(option => (
                  <div 
                    key={option.id} 
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50"
                  >
                    <Checkbox
                      id={`contact-${option.id}`}
                      checked={localContactMethods.includes(option.id)}
                      onCheckedChange={() => toggleContactMethod(option.id)}
                    />
                    <label 
                      htmlFor={`contact-${option.id}`} 
                      className="text-sm cursor-pointer flex-1"
                    >
                      <p className="font-medium">{option.label}</p>
                      <p className="text-xs text-muted-foreground">{option.description}</p>
                    </label>
                  </div>
                ))}
              </div>

              {/* WhatsApp Phone - if needed */}
              {needsWhatsAppPhone && (
                <div className="space-y-2 pt-3 border-t border-gray-200 mt-3">
                  <Label className="text-xs">
                    WhatsApp Phone <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="tel"
                    placeholder="+56 9 1234 5678"
                    value={localWhatsAppPhone}
                    onChange={(e) => setLocalWhatsAppPhone(e.target.value)}
                    className="border-2"
                  />
                  {localWhatsAppPhone.length > 0 && localWhatsAppPhone.length < 9 && (
                    <p className="text-xs text-amber-600">
                      ⚠️ Phone number must be at least 9 digits
                    </p>
                  )}
                </div>
              )}

              {/* Website URL - if needed */}
              {needsWebsiteUrl && (
                <div className="space-y-2 pt-3 border-t border-gray-200 mt-3">
                  <Label className="text-xs">
                    Website URL <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="url"
                    placeholder="https://www.example.com"
                    value={localWebsiteUrl}
                    onChange={(e) => setLocalWebsiteUrl(e.target.value)}
                    className="border-2"
                  />
                </div>
              )}

              {/* Social Media URL - if needed */}
              {needsSocialUrl && (
                <div className="space-y-2 pt-3 border-t border-gray-200 mt-3">
                  <Label className="text-xs">
                    Social Media URL <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="url"
                    placeholder="https://www.example.com"
                    value={localSocialUrl}
                    onChange={(e) => setLocalSocialUrl(e.target.value)}
                    className="border-2"
                  />
                </div>
              )}

              <Button 
                onClick={() => setContactOpen(false)}
                size="sm"
                className="w-full mt-4"
              >
                Apply
              </Button>
            </CollapsibleContent>
          </div>
        </Collapsible>
      </div>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-border bg-white space-y-2">
        {!canProceed && (
          <p className="text-sm text-muted-foreground text-center">
            ⚠️ Please fill all required fields
          </p>
        )}
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex-1"
          >
            ← Back
          </Button>
          <Button
            onClick={onNext}
            disabled={!canProceed}
            className="flex-1"
          >
            Continue →
          </Button>
        </div>
      </div>
    </div>
  );
}