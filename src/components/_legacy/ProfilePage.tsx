/**
 * @deprecated This component has been replaced by the modular ProfileRouter system.
 * Moved to _legacy/ folder. DO NOT use in new code.
 * Use ProfileRouter from /components/profile/ instead.
 * 
 * Profile Page - Redesigned (Horizontal Compact)
 * Ultra-compact, mobile-first design optimized for iPhone
 * Premium Design 2025
 */

import { useState } from 'react';
import { ArrowLeft, Camera, MapPin, Phone, ChevronRight, CheckCircle, AlertCircle, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { toast } from 'sonner@2.0.3';

interface ProfilePageProps {
  onBack: () => void;
  user?: {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
    plan: 'Free' | 'Premium' | 'Business';
  };
  onSave?: (data: ProfileData) => void;
  onLogout?: () => void; // NEW: Logout callback
}

export interface ProfileData {
  // Basic Info
  name: string;
  username: string;
  bio: string;
  avatarUrl?: string;
  
  // Account Type
  accountType: 'individual' | 'store';
  
  // User Plan
  userPlan: 'Free' | 'Plus' | 'Pro';
  
  // Contact & Location
  phoneNumber?: string;
  location?: {
    city: string;
    region: string;
    country: string;
  };
  
  // Location Precision
  locationPrecision: 'approximate' | 'exact';
  
  // Default Contact Methods
  defaultContactMethods: {
    internalChat: boolean;
    whatsapp: { enabled: boolean; preferred: boolean; hours?: string };
    phone: { enabled: boolean; hours?: string };
  };
  
  // Default Delivery Options
  defaultDeliveryOptions: {
    pickup: boolean;
    meetup: { enabled: boolean; radius?: string; cost?: string };
    delivery: { enabled: boolean; cost?: string; area?: string };
    shipping: { enabled: boolean; cost?: string };
    virtual: boolean;
  };
  
  // Listing Privacy Defaults
  listingPrivacy: {
    defaultVisibility: 'public' | 'groups' | 'private';
    showPhoneInListings: boolean;
  };
}

export function ProfilePage({ onBack, user, onSave, onLogout }: ProfilePageProps) {
  const [hasChanges, setHasChanges] = useState(false);
  const [showUsernameAvailable, setShowUsernameAvailable] = useState(false);
  
  // Collapsible states
  const [expandedAccountType, setExpandedAccountType] = useState(false);
  const [expandedContactMethods, setExpandedContactMethods] = useState(false);
  const [expandedDeliveryOptions, setExpandedDeliveryOptions] = useState(false);
  const [expandedVisibility, setExpandedVisibility] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState<ProfileData>({
    name: user?.name || '',
    username: '',
    bio: '',
    avatarUrl: user?.avatarUrl,
    accountType: 'individual',
    userPlan: 'Free',
    phoneNumber: '',
    location: undefined,
    locationPrecision: 'approximate',
    defaultContactMethods: {
      internalChat: true,
      whatsapp: { enabled: false, preferred: false },
      phone: { enabled: false },
    },
    defaultDeliveryOptions: {
      pickup: false,
      meetup: { enabled: false, radius: '500m', cost: '$5' },
      delivery: { enabled: false, cost: '$5', area: '' },
      shipping: { enabled: false, cost: '$8' },
      virtual: false,
    },
    listingPrivacy: {
      defaultVisibility: 'public',
      showPhoneInListings: false,
    },
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = <K extends keyof ProfileData>(field: K, value: ProfileData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
    
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateUsername = (username: string): boolean => {
    if (!username) return false;
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (!validateUsername(formData.username)) {
      newErrors.username = 'Username must be 3-20 characters (letters, numbers, underscore)';
    }

    if (formData.bio.length > 150) {
      newErrors.bio = 'Bio must be 150 characters or less';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      toast.error('Please fix the errors before saving');
      return;
    }

    onSave?.(formData);
    setHasChanges(false);
    toast.success('Profile saved successfully!');
  };

  const handleUsernameChange = (value: string) => {
    updateField('username', value.toLowerCase().replace(/[^a-z0-9_]/g, ''));
    
    if (validateUsername(value)) {
      setTimeout(() => setShowUsernameAvailable(true), 500);
    } else {
      setShowUsernameAvailable(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const canPublish = formData.name && formData.username && validateUsername(formData.username);

  // Get current contact method display
  const getCurrentContactMethod = () => {
    if (formData.defaultContactMethods.whatsapp.enabled) return 'WhatsApp';
    if (formData.defaultContactMethods.phone.enabled) return '📞 Phone Call';
    return '💬 Internal Chat';
  };

  // Get current delivery option display
  const getCurrentDeliveryOption = () => {
    if (formData.defaultDeliveryOptions.pickup) return '📍 Pickup';
    if (formData.defaultDeliveryOptions.meetup.enabled) return '🤝 Meetup';
    if (formData.defaultDeliveryOptions.delivery.enabled) return '🚚 Local Delivery';
    if (formData.defaultDeliveryOptions.shipping.enabled) return '📦 Shipping';
    if (formData.defaultDeliveryOptions.virtual) return '🌐 Virtual / Digital';
    return 'None selected';
  };

  // Get visibility display
  const getVisibilityDisplay = () => {
    const map = {
      public: '🌐 Public',
      groups: '👥 Groups Only',
      private: '🔒 Private',
    };
    return map[formData.listingPrivacy.defaultVisibility];
  };

  const handleUseCurrentLocation = () => {
    // Simulate getting current location
    toast.info('Getting your location...');
    setTimeout(() => {
      updateField('location', {
        city: 'Viña del Mar',
        region: 'Valparaíso',
        country: 'Chile',
      });
      toast.success('Location updated!');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-[480px] mx-auto">
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
            disabled={!hasChanges}
            className="h-9 px-4"
          >
            Save
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-auto pb-6">
        {/* 1. CABECERA COMPACTA - 1 FILA */}
        <div className="px-4 pt-3 pb-2">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="relative group shrink-0">
              <Avatar className="w-12 h-12 border-2 border-border">
                <AvatarImage src={formData.avatarUrl} alt={formData.name} />
                <AvatarFallback className="bg-primary/10 text-primary text-sm">
                  {formData.name ? getInitials(formData.name) : '?'}
                </AvatarFallback>
              </Avatar>
              <button className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/40 transition-colors rounded-full">
                <Camera className="w-3.5 h-3.5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>

            {/* Nombre y Username (centro) */}
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate text-sm">{formData.name || 'Add your name'}</p>
              <p className="text-[11px] text-muted-foreground">@{formData.username || 'username'}</p>
            </div>

            {/* Plan Badge (derecha) */}
            <Badge variant={formData.userPlan === 'Free' ? 'secondary' : 'default'} className="text-[10px] h-5 px-2 shrink-0">
              {formData.userPlan === 'Free' && '🆓'}
              {formData.userPlan === 'Plus' && '✨'}
              {formData.userPlan === 'Pro' && '🚀'}
              <span className="ml-0.5">{formData.userPlan}</span>
            </Badge>
          </div>
          
          {/* Mensaje de perfil incompleto - subtítulo discreto */}
          {!canPublish && (
            <p className="text-[10px] text-amber-700 mt-1.5 ml-[60px]">
              Complete your profile to start publishing: add your name and username
            </p>
          )}
        </div>

        <div className="px-4 space-y-0">
          {/* Divider */}
          <div className="h-px bg-border my-2" />

          {/* 2. ACCOUNT TYPE - LÍNEA SIMPLE */}
          <div>
            <button
              onClick={() => setExpandedAccountType(!expandedAccountType)}
              className="w-full flex items-center justify-between py-2 text-left"
            >
              <div className="flex items-center gap-2 flex-1">
                <span className="text-xs text-muted-foreground">Account Type:</span>
                <span className="text-sm">
                  {formData.accountType === 'individual' ? '👤 Individual' : '🏪 Store'}
                </span>
              </div>
              <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${expandedAccountType ? 'rotate-90' : ''}`} />
            </button>

            <AnimatePresence>
              {expandedAccountType && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <RadioGroup
                    value={formData.accountType}
                    onValueChange={(value: 'individual' | 'store') => {
                      updateField('accountType', value);
                      setExpandedAccountType(false);
                    }}
                    className="space-y-1.5 pb-2"
                  >
                    <div className="flex items-center space-x-2 py-1">
                      <RadioGroupItem value="individual" id="individual" />
                      <Label htmlFor="individual" className="flex-1 cursor-pointer text-sm">
                        👤 Individual
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 py-1">
                      <RadioGroupItem value="store" id="store" />
                      <Label htmlFor="store" className="flex-1 cursor-pointer text-sm">
                        🏪 Store
                      </Label>
                    </div>
                  </RadioGroup>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Divider */}
          <div className="h-px bg-border my-2" />

          {/* 3. YOUR PLAN - LÍNEA SIMPLE */}
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Plan:</span>
              <span className="text-sm">
                {formData.userPlan === 'Free' && '🆓 Free Plan'}
                {formData.userPlan === 'Plus' && '✨ Plus Plan'}
                {formData.userPlan === 'Pro' && '🚀 Pro Plan'}
              </span>
            </div>
            {formData.userPlan === 'Free' && (
              <Button 
                size="sm" 
                variant="outline" 
                className="h-6 text-[10px] px-2.5"
                onClick={() => toast.info('Plan upgrade coming soon!')}
              >
                Upgrade →
              </Button>
            )}
          </div>

          {/* Divider */}
          <div className="h-px bg-border my-2" />

          {/* 4. BASIC INFO - HORIZONTAL */}
          <div className="py-2 space-y-2">
            <p className="text-xs font-semibold text-foreground mb-2">Basic Info</p>

            {/* Name */}
            <div className="flex items-center gap-3">
              <Label htmlFor="name" className="text-[11px] text-muted-foreground w-20 shrink-0">
                Name <span className="text-destructive">*</span>
              </Label>
              <div className="flex-1">
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="Your full name"
                  className={errors.name ? 'h-8 border-destructive' : 'h-8 border-border'}
                />
                {errors.name && (
                  <p className="text-[9px] text-destructive flex items-center gap-0.5 mt-0.5">
                    <AlertCircle className="w-2 h-2" />
                    {errors.name}
                  </p>
                )}
              </div>
            </div>

            {/* Username */}
            <div className="flex items-center gap-3">
              <Label htmlFor="username" className="text-[11px] text-muted-foreground w-20 shrink-0">
                Username <span className="text-destructive">*</span>
              </Label>
              <div className="flex-1">
                <div className="relative">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">@</span>
                  <Input
                    id="username"
                    value={formData.username}
                    onChange={(e) => handleUsernameChange(e.target.value)}
                    placeholder="username"
                    className={errors.username ? 'pl-6 h-8 border-destructive' : 'pl-6 h-8 border-border'}
                  />
                  {showUsernameAvailable && !errors.username && formData.username && (
                    <CheckCircle className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-green-500" />
                  )}
                </div>
                {errors.username && (
                  <p className="text-[9px] text-destructive flex items-center gap-0.5 mt-0.5">
                    <AlertCircle className="w-2 h-2" />
                    {errors.username}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3">
              <Label className="text-[11px] text-muted-foreground w-20 shrink-0">Email</Label>
              <div className="flex-1 px-2.5 py-1.5 rounded-md bg-muted/30 border border-border flex items-center justify-between">
                <span className="text-xs text-muted-foreground truncate">{user?.email}</span>
                <CheckCircle className="w-3 h-3 text-green-500 shrink-0 ml-2" />
              </div>
            </div>

            {/* Bio */}
            <div className="flex gap-3">
              <Label htmlFor="bio" className="text-[11px] text-muted-foreground w-20 shrink-0 pt-1.5">
                Bio
              </Label>
              <div className="flex-1">
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => updateField('bio', e.target.value)}
                  placeholder="Tell others about yourself..."
                  maxLength={150}
                  rows={2}
                  className="resize-none text-xs py-1.5"
                />
                <span className="text-[9px] text-muted-foreground float-right mt-0.5">
                  {formData.bio.length}/150
                </span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-border my-2" />

          {/* 5. LOCATION & PRECISION */}
          <div className="py-2 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-foreground">Location</p>
              <p className="text-[9px] text-muted-foreground">Required for listings</p>
            </div>

            {/* Location input with button */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <Input
                  value={formData.location ? `${formData.location.city}, ${formData.location.region}` : ''}
                  onChange={(e) => {
                    const parts = e.target.value.split(',');
                    if (parts.length >= 2) {
                      updateField('location', {
                        city: parts[0].trim(),
                        region: parts[1].trim(),
                        country: 'Chile',
                      });
                    }
                  }}
                  placeholder="City, Region"
                  className="pl-8 h-8 text-xs"
                />
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={handleUseCurrentLocation}
                className="h-8 px-2.5 text-[10px] shrink-0 shadow-[0_0_0_1px_rgba(59,130,246,0.3)] hover:shadow-[0_0_0_1px_rgba(59,130,246,0.5)]"
              >
                📍 Use current
              </Button>
            </div>

            {/* Segmented control for precision */}
            <div className="flex gap-1.5 p-1 bg-muted/30 rounded-lg">
              <button
                onClick={() => updateField('locationPrecision', 'approximate')}
                className={`flex-1 py-1.5 px-2 rounded-md text-[11px] transition-all ${
                  formData.locationPrecision === 'approximate'
                    ? 'bg-background shadow-[0_1px_3px_rgba(0,0,0,0.1),0_0_0_1px_rgba(59,130,246,0.3)] font-medium'
                    : 'text-muted-foreground'
                }`}
              >
                Approximate (500m)
              </button>
              <button
                onClick={() => updateField('locationPrecision', 'exact')}
                className={`flex-1 py-1.5 px-2 rounded-md text-[11px] transition-all ${
                  formData.locationPrecision === 'exact'
                    ? 'bg-background shadow-[0_1px_3px_rgba(0,0,0,0.1),0_0_0_1px_rgba(59,130,246,0.3)] font-medium'
                    : 'text-muted-foreground'
                }`}
              >
                Exact (Precise)
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-border my-2" />

          {/* 6. CONTACT METHODS - LÍNEA SIMPLE */}
          <div>
            <button
              onClick={() => setExpandedContactMethods(!expandedContactMethods)}
              className="w-full flex items-center justify-between py-2 text-left"
            >
              <div className="flex items-center gap-2 flex-1">
                <span className="text-xs text-muted-foreground">Contact Method:</span>
                <span className="text-sm">{getCurrentContactMethod()}</span>
              </div>
              <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${expandedContactMethods ? 'rotate-90' : ''}`} />
            </button>

            <AnimatePresence>
              {expandedContactMethods && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-2.5 pb-2 pt-1">
                    {/* Phone Number Field First */}
                    {!formData.phoneNumber && (
                      <div className="p-2.5 rounded-lg bg-muted/20 border border-border">
                        <p className="text-[10px] text-muted-foreground mb-1.5">
                          Add phone number to enable WhatsApp and Phone Call
                        </p>
                        <div className="relative">
                          <Phone className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                          <Input
                            type="tel"
                            value={formData.phoneNumber || ''}
                            onChange={(e) => updateField('phoneNumber', e.target.value)}
                            placeholder="+56 9 1234 5678"
                            className="pl-7 h-8 text-xs"
                          />
                        </div>
                      </div>
                    )}

                    {formData.phoneNumber && (
                      <div className="space-y-1.5">
                        <div className="relative">
                          <Phone className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                          <Input
                            type="tel"
                            value={formData.phoneNumber || ''}
                            onChange={(e) => updateField('phoneNumber', e.target.value)}
                            placeholder="+56 9 1234 5678"
                            className="pl-7 h-8 text-xs"
                          />
                        </div>
                      </div>
                    )}

                    {/* Contact method options */}
                    <div className="space-y-2">
                      {/* Internal Chat - always enabled */}
                      <div className="flex items-center justify-between p-2 rounded-lg bg-muted/20">
                        <p className="text-xs">💬 Internal Chat</p>
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>

                      {/* WhatsApp */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-xs">WhatsApp</p>
                          <Switch
                            checked={formData.defaultContactMethods.whatsapp.enabled}
                            onCheckedChange={(checked) => {
                              if (!formData.phoneNumber) {
                                toast.error('Add phone number first');
                                return;
                              }
                              updateField('defaultContactMethods', {
                                ...formData.defaultContactMethods,
                                whatsapp: { ...formData.defaultContactMethods.whatsapp, enabled: checked },
                              });
                            }}
                            disabled={!formData.phoneNumber}
                          />
                        </div>

                        {formData.defaultContactMethods.whatsapp.enabled && (
                          <div className="pl-4 space-y-2">
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-4 h-4 rounded border-gray-300"
                                checked={formData.defaultContactMethods.whatsapp.preferred}
                                onChange={(e) => {
                                  updateField('defaultContactMethods', {
                                    ...formData.defaultContactMethods,
                                    whatsapp: { ...formData.defaultContactMethods.whatsapp, preferred: e.target.checked }
                                  });
                                }}
                              />
                              <Label className="text-xs">Preferred method</Label>
                            </div>
                            <Input
                              placeholder="Available hours (e.g., 24/7)"
                              className="text-xs h-8"
                              value={formData.defaultContactMethods.whatsapp.hours || ''}
                              onChange={(e) => {
                                updateField('defaultContactMethods', {
                                  ...formData.defaultContactMethods,
                                  whatsapp: { ...formData.defaultContactMethods.whatsapp, hours: e.target.value }
                                });
                              }}
                            />
                          </div>
                        )}
                      </div>

                      {/* Phone */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-xs">📞 Phone Call</p>
                          <Switch
                            checked={formData.defaultContactMethods.phone.enabled}
                            onCheckedChange={(checked) => {
                              if (!formData.phoneNumber) {
                                toast.error('Add phone number first');
                                return;
                              }
                              updateField('defaultContactMethods', {
                                ...formData.defaultContactMethods,
                                phone: { ...formData.defaultContactMethods.phone, enabled: checked },
                              });
                            }}
                            disabled={!formData.phoneNumber}
                          />
                        </div>

                        {formData.defaultContactMethods.phone.enabled && (
                          <div className="pl-4">
                            <Input
                              placeholder="Available hours (e.g., 9am-8pm)"
                              className="text-xs h-8"
                              value={formData.defaultContactMethods.phone.hours || ''}
                              onChange={(e) => {
                                updateField('defaultContactMethods', {
                                  ...formData.defaultContactMethods,
                                  phone: { ...formData.defaultContactMethods.phone, hours: e.target.value }
                                });
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Show phone in listings */}
                    {formData.phoneNumber && (
                      <div className="flex items-center justify-between pt-1 border-t border-border">
                        <p className="text-xs">Show phone in listings</p>
                        <Switch
                          checked={formData.listingPrivacy.showPhoneInListings}
                          onCheckedChange={(checked) => {
                            updateField('listingPrivacy', {
                              ...formData.listingPrivacy,
                              showPhoneInListings: checked,
                            });
                          }}
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Divider */}
          <div className="h-px bg-border my-2" />

          {/* 7. DELIVERY OPTIONS - LÍNEA SIMPLE */}
          <div>
            <button
              onClick={() => setExpandedDeliveryOptions(!expandedDeliveryOptions)}
              className="w-full flex items-center justify-between py-2 text-left"
            >
              <div className="flex items-center gap-2 flex-1">
                <span className="text-xs text-muted-foreground">Delivery Option:</span>
                <span className="text-sm">{getCurrentDeliveryOption()}</span>
              </div>
              <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${expandedDeliveryOptions ? 'rotate-90' : ''}`} />
            </button>

            <AnimatePresence>
              {expandedDeliveryOptions && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-2 pb-2 pt-1">
                    {/* Pickup */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs">📍 Pickup</p>
                        <p className="text-[10px] text-muted-foreground">Buyer picks up at your location</p>
                      </div>
                      <Switch
                        checked={formData.defaultDeliveryOptions.pickup}
                        onCheckedChange={(checked) => {
                          updateField('defaultDeliveryOptions', {
                            ...formData.defaultDeliveryOptions,
                            pickup: checked,
                          });
                        }}
                      />
                    </div>

                    {/* Meetup */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs">🤝 Meetup</p>
                          <p className="text-[10px] text-muted-foreground">Meet nearby</p>
                        </div>
                        <Switch
                          checked={formData.defaultDeliveryOptions.meetup.enabled}
                          onCheckedChange={(checked) => {
                            if (!formData.location) {
                              toast.error('Add location first');
                              return;
                            }
                            updateField('defaultDeliveryOptions', {
                              ...formData.defaultDeliveryOptions,
                              meetup: { ...formData.defaultDeliveryOptions.meetup, enabled: checked },
                            });
                          }}
                          disabled={!formData.location}
                        />
                      </div>

                      {formData.defaultDeliveryOptions.meetup.enabled && (
                        <div className="pl-4 space-y-2">
                          <Input
                            placeholder="Radius (e.g., 500m)"
                            className="text-xs h-8"
                            value={formData.defaultDeliveryOptions.meetup.radius || ''}
                            onChange={(e) => {
                              updateField('defaultDeliveryOptions', {
                                ...formData.defaultDeliveryOptions,
                                meetup: { ...formData.defaultDeliveryOptions.meetup, radius: e.target.value }
                              });
                            }}
                          />
                          <Input
                            placeholder="Cost (e.g., $5)"
                            className="text-xs h-8"
                            value={formData.defaultDeliveryOptions.meetup.cost || ''}
                            onChange={(e) => {
                              updateField('defaultDeliveryOptions', {
                                ...formData.defaultDeliveryOptions,
                                meetup: { ...formData.defaultDeliveryOptions.meetup, cost: e.target.value }
                              });
                            }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Local Delivery */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs">🚚 Local Delivery</p>
                          <p className="text-[10px] text-muted-foreground">You deliver within your area</p>
                        </div>
                        <Switch
                          checked={formData.defaultDeliveryOptions.delivery.enabled}
                          onCheckedChange={(checked) => {
                            if (!formData.location) {
                              toast.error('Add location first');
                              return;
                            }
                            updateField('defaultDeliveryOptions', {
                              ...formData.defaultDeliveryOptions,
                              delivery: { ...formData.defaultDeliveryOptions.delivery, enabled: checked },
                            });
                          }}
                          disabled={!formData.location}
                        />
                      </div>

                      {formData.defaultDeliveryOptions.delivery.enabled && (
                        <div className="pl-4 space-y-2">
                          <Input
                            placeholder="Cost (e.g., $5)"
                            className="text-xs h-8"
                            value={formData.defaultDeliveryOptions.delivery.cost || ''}
                            onChange={(e) => {
                              updateField('defaultDeliveryOptions', {
                                ...formData.defaultDeliveryOptions,
                                delivery: { ...formData.defaultDeliveryOptions.delivery, cost: e.target.value }
                              });
                            }}
                          />
                          <Input
                            placeholder="Area (e.g., Santiago)"
                            className="text-xs h-8"
                            value={formData.defaultDeliveryOptions.delivery.area || ''}
                            onChange={(e) => {
                              updateField('defaultDeliveryOptions', {
                                ...formData.defaultDeliveryOptions,
                                delivery: { ...formData.defaultDeliveryOptions.delivery, area: e.target.value }
                              });
                            }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Shipping */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs">📦 Shipping</p>
                          <p className="text-[10px] text-muted-foreground">Ship via postal service or courier</p>
                        </div>
                        <Switch
                          checked={formData.defaultDeliveryOptions.shipping.enabled}
                          onCheckedChange={(checked) => {
                            if (!formData.location) {
                              toast.error('Add location first');
                              return;
                            }
                            updateField('defaultDeliveryOptions', {
                              ...formData.defaultDeliveryOptions,
                              shipping: { ...formData.defaultDeliveryOptions.shipping, enabled: checked },
                            });
                          }}
                          disabled={!formData.location}
                        />
                      </div>

                      {formData.defaultDeliveryOptions.shipping.enabled && (
                        <div className="pl-4">
                          <Input
                            placeholder="Cost (e.g., $8)"
                            className="text-xs h-8"
                            value={formData.defaultDeliveryOptions.shipping.cost || ''}
                            onChange={(e) => {
                              updateField('defaultDeliveryOptions', {
                                ...formData.defaultDeliveryOptions,
                                shipping: { ...formData.defaultDeliveryOptions.shipping, cost: e.target.value }
                              });
                            }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Virtual / Digital */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs">🌐 Virtual / Digital</p>
                        <p className="text-[10px] text-muted-foreground">For services or digital products</p>
                      </div>
                      <Switch
                        checked={formData.defaultDeliveryOptions.virtual}
                        onCheckedChange={(checked) => {
                          updateField('defaultDeliveryOptions', {
                            ...formData.defaultDeliveryOptions,
                            virtual: checked,
                          });
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Divider */}
          <div className="h-px bg-border my-2" />

          {/* 8. DEFAULT VISIBILITY - LÍNEA SIMPLE */}
          <div>
            <button
              onClick={() => setExpandedVisibility(!expandedVisibility)}
              className="w-full flex items-center justify-between py-2 text-left"
            >
              <div className="flex items-center gap-2 flex-1">
                <span className="text-xs text-muted-foreground">Default Visibility:</span>
                <span className="text-sm">{getVisibilityDisplay()}</span>
              </div>
              <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${expandedVisibility ? 'rotate-90' : ''}`} />
            </button>

            <AnimatePresence>
              {expandedVisibility && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <RadioGroup
                    value={formData.listingPrivacy.defaultVisibility}
                    onValueChange={(value: 'public' | 'groups' | 'private') => {
                      updateField('listingPrivacy', {
                        ...formData.listingPrivacy,
                        defaultVisibility: value,
                      });
                      setExpandedVisibility(false);
                    }}
                    className="space-y-1.5 pb-2"
                  >
                    <div className="flex items-center space-x-2 py-1">
                      <RadioGroupItem value="public" id="public" />
                      <Label htmlFor="public" className="flex-1 cursor-pointer text-sm">
                        🌐 Public
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 py-1">
                      <RadioGroupItem value="groups" id="groups" />
                      <Label htmlFor="groups" className="flex-1 cursor-pointer text-sm">
                        👥 Groups Only
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 py-1">
                      <RadioGroupItem value="private" id="private" />
                      <Label htmlFor="private" className="flex-1 cursor-pointer text-sm">
                        🔒 Private
                      </Label>
                    </div>
                  </RadioGroup>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Logout Button */}
          <div className="mt-4">
            <Button
              size="sm"
              variant="outline"
              className="h-8 px-4"
              onClick={onLogout}
            >
              <LogOut className="w-4 h-4 mr-1" />
              Logout
            </Button>
          </div>

          {/* Bottom spacing */}
          <div className="h-3" />
        </div>
      </main>
    </div>
  );
}
