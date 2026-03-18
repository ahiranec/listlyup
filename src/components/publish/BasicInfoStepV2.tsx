/**
 * Step 2: Details (Product / Service / Event)
 * v1.1.5 - Fixed state management and removed Event Mode
 */

import { useState } from 'react';
import { Package, FileText, Tag, Sparkles, Calendar, Clock, DollarSign, AlertCircle, MapPin, Briefcase, Info, Mic, MicOff, MessageSquare, Users, CalendarDays, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Badge } from '../ui/badge';
import { motion, AnimatePresence } from 'motion/react';
import { useFeatures } from '../../contexts/FeaturesContext';
import type { ListingType, AISuggestions, OfferType, ListingIntent } from './types';
import { PriceInput } from './PriceInput';

interface BasicInfoStepV2Props {
  listingType: ListingType;
  
  // Common fields
  title: string;
  description: string;
  category: string;
  subcategory?: string;
  tags: string[];
  
  // Product-specific
  offerType?: OfferType;
  price?: string;
  currency?: string;
  priceNegotiable?: boolean;
  discount?: {
    type: 'none' | 'percentage' | 'fixed';
    value?: number;
  };
  condition?: string;
  tradeInterests?: string; // NEW: For trade/sell_or_trade
  
  // Service-specific
  duration?: string;
  pricingModel?: 'hourly' | 'fixed' | 'quote' | 'session' | 'daily' | 'monthly';
  businessHours?: string; // NEW: Business hours for services
  
  // Event-specific
  eventDate?: string;
  eventTime?: string;
  eventEndTime?: string;
  eventEndDate?: string; // For multi-day events
  ticketType?: 'free' | 'paid';
  hasMultipleDates?: boolean; // Backward compat
  
  // Intent (NEW v1.3 - for event_duration_type alignment)
  intent?: ListingIntent;
  
  aiSuggestions?: AISuggestions | null;
  
  onDataChange: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const PRODUCT_CATEGORIES = [
  'Electronics',
  'Fashion & Clothing',
  'Home & Garden',
  'Sports & Outdoors',
  'Vehicles',
  'Books & Media',
  'Toys & Games',
  'Other',
];

const SUBCATEGORIES: Record<string, string[]> = {
  'Electronics': ['Phones', 'Laptops', 'Tablets', 'Cameras', 'Audio', 'Gaming', 'Accessories', 'Other'],
  'Fashion & Clothing': ['Men', 'Women', 'Kids', 'Shoes', 'Accessories', 'Bags', 'Jewelry', 'Other'],
  'Home & Garden': ['Furniture', 'Decor', 'Kitchen', 'Garden', 'Tools', 'Storage', 'Lighting', 'Other'],
  'Sports & Outdoors': ['Fitness', 'Cycling', 'Camping', 'Water Sports', 'Team Sports', 'Winter Sports', 'Other'],
  'Vehicles': ['Cars', 'Motorcycles', 'Bikes', 'Parts', 'Accessories', 'Other'],
  'Books & Media': ['Books', 'Movies', 'Music', 'Games', 'Magazines', 'Other'],
  'Toys & Games': ['Action Figures', 'Board Games', 'Puzzles', 'Educational', 'Outdoor', 'Baby Toys', 'Other'],
  'Other': ['General'],
};

const SERVICE_CATEGORIES = [
  'Home Services',
  'Professional Services',
  'Lessons & Tutoring',
  'Creative Services',
  'Health & Wellness',
  'Transportation',
  'Events & Entertainment',
  'Other Services',
];

const EVENT_CATEGORIES = [
  'Community Events',
  'Workshops & Classes',
  'Sports & Fitness',
  'Arts & Culture',
  'Networking',
  'Fundraisers',
  'Markets & Fairs',
  'Other Events',
];

const CONDITIONS = [
  { value: 'new', label: 'New' },
  { value: 'like-new', label: 'Like New' },
  { value: 'good', label: 'Good' },
  { value: 'fair', label: 'Fair' },
  { value: 'for-parts', label: 'For Parts' },
];

export function BasicInfoStepV2(props: BasicInfoStepV2Props) {
  const { isFeatureActive } = useFeatures();
  const isAIActive = isFeatureActive('aiPublishingAssistance');
  const isVoiceToTextActive = isFeatureActive('voiceToText');
  
  const [currentTag, setCurrentTag] = useState('');
  
  const categories = 
    props.listingType === 'product' ? PRODUCT_CATEGORIES :
    props.listingType === 'service' ? SERVICE_CATEGORIES :
    EVENT_CATEGORIES;
  
  const availableSubcategories = props.category && SUBCATEGORIES[props.category] 
    ? SUBCATEGORIES[props.category] 
    : [];
  
  const handleAddTag = () => {
    if (currentTag.trim() && props.tags.length < 10) {
      props.onDataChange({
        ...props,
        tags: [...props.tags, currentTag.trim()],
      });
      setCurrentTag('');
    }
  };
  
  const handleRemoveTag = (index: number) => {
    props.onDataChange({
      ...props,
      tags: props.tags.filter((_, i) => i !== index),
    });
  };
  
  const handleApplyAISuggestion = (field: string, value: any) => {
    props.onDataChange({
      ...props,
      [field]: value,
    });
  };
  
  // Auto-generate title from key fields
  const generateTitle = () => {
    if (props.listingType === 'product' && props.category && props.condition) {
      return `${props.category} - ${CONDITIONS.find(c => c.value === props.condition)?.label || ''}`;
    }
    return '';
  };
  
  const autoTitle = props.title || generateTitle();
  
  // Determine if price is required
  const isPriceRequired = props.listingType === 'product' && 
    (props.offerType === 'sell' || props.offerType === 'sell_or_trade');
  
  const canContinue = 
    props.category.trim() !== '' &&
    props.title.trim() !== '' &&
    props.title.trim().length >= 3 &&
    (!isPriceRequired || (props.price && parseFloat(props.price) > 0));
  
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 border-b border-border bg-white">
        <h2 className="font-medium">
          {props.listingType === 'product' ? 'Product Details' :
           props.listingType === 'service' ? 'Service Details' :
           'Event Details'}
        </h2>
        <p className="text-sm text-muted-foreground">
          {props.listingType === 'product' ? 'Tell us about your item' :
           props.listingType === 'service' ? 'Describe your service' :
           'Share event information'}
        </p>
      </div>
      
      {/* Scrollable Content - COMPACTED SPACING */}
      <div className="flex-1 overflow-auto p-4 space-y-3">
        
        {/* COMMON FIELDS - Title & Description */}
        
        {/* Title */}
        <div className="space-y-1.5">
          <Label htmlFor="title">Title *</Label>
          <div className="relative">
            <Input
              id="title"
              placeholder={autoTitle || 'Add a clear title...'}
              value={props.title}
              onChange={(e) => props.onDataChange({ ...props, title: e.target.value })}
              className="pr-10"
            />
            <button
              type="button"
              className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                isVoiceToTextActive ? 'text-primary hover:text-primary/80' : 'text-gray-300 cursor-not-allowed'
              }`}
              disabled={!isVoiceToTextActive}
              onClick={() => {
                if (isVoiceToTextActive) {
                  console.log('Voice-to-text activated');
                }
              }}
            >
              {isVoiceToTextActive ? (
                <Mic className="w-4 h-4" />
              ) : (
                <MicOff className="w-4 h-4" />
              )}
            </button>
          </div>
          
          {props.title.trim().length > 0 && props.title.trim().length < 3 && (
            <p className="text-xs text-amber-600">
              ⚠️ Title must be at least 3 characters
            </p>
          )}
          
          {isAIActive && props.aiSuggestions?.title && props.title !== props.aiSuggestions.title && (
            <div className="flex items-center gap-2 text-sm">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-muted-foreground">AI suggestion available</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleApplyAISuggestion('title', props.aiSuggestions?.title)}
                className="h-7 text-xs text-blue-600"
              >
                Apply
              </Button>
            </div>
          )}
          
          {!props.title && autoTitle && (
            <p className="text-xs text-green-600">
              ✓ Auto-generated from details
            </p>
          )}
        </div>
        
        {/* Description */}
        <div className="space-y-1.5">
          <Label htmlFor="description">Description</Label>
          <div className="relative">
            <Textarea
              id="description"
              placeholder="Describe your listing..."
              rows={3}
              value={props.description}
              onChange={(e) => props.onDataChange({ ...props, description: e.target.value })}
              className="pr-10 min-h-[80px]"
            />
            <button
              type="button"
              className={`absolute right-3 top-3 ${
                isVoiceToTextActive ? 'text-primary hover:text-primary/80' : 'text-gray-300 cursor-not-allowed'
              }`}
              disabled={!isVoiceToTextActive}
              onClick={() => {
                if (isVoiceToTextActive) {
                  console.log('Voice-to-text activated');
                }
              }}
            >
              {isVoiceToTextActive ? (
                <Mic className="w-4 h-4" />
              ) : (
                <MicOff className="w-4 h-4" />
              )}
            </button>
          </div>
          
          {isAIActive && props.aiSuggestions?.description && props.description !== props.aiSuggestions.description && (
            <div className="flex items-center gap-2 text-sm">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-muted-foreground">AI suggestion available</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleApplyAISuggestion('description', props.aiSuggestions?.description)}
                className="h-7 text-xs text-blue-600"
              >
                Apply
              </Button>
            </div>
          )}
        </div>
        
        {/* TYPE-SPECIFIC FIELDS */}
        
        {/* PRODUCT FIELDS */}
        {props.listingType === 'product' && (
          <>
            {/* Price - Only for Sell and Sell or Trade */}
            {(props.offerType === 'sell' || props.offerType === 'sell_or_trade') && (
              <PriceInput
                price={props.price}
                currency={props.currency}
                isNegotiable={props.priceNegotiable}
                discount={props.discount}
                isRequired={isPriceRequired}
                onChange={(priceData) => props.onDataChange({ ...props, ...priceData })}
              />
            )}
            
            {/* Trade Interests - Only for Trade and Sell or Trade */}
            {(props.offerType === 'trade' || props.offerType === 'sell_or_trade') && (
              <div className="space-y-1.5">
                <Label htmlFor="trade-interests">
                  What would you trade for?
                </Label>
                <Textarea
                  id="trade-interests"
                  placeholder="e.g., Laptop, gaming console, bicycle..."
                  rows={2}
                  value={props.tradeInterests || ''}
                  onChange={(e) => props.onDataChange({ ...props, tradeInterests: e.target.value })}
                  className="min-h-[60px]"
                />
              </div>
            )}
            
            {/* Category */}
            <div className="space-y-1.5">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={props.category}
                onValueChange={(value) => {
                  props.onDataChange({ 
                    ...props, 
                    category: value,
                    subcategory: ''
                  });
                }}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {isAIActive && props.aiSuggestions?.category && props.category !== props.aiSuggestions.category && (
                <div className="flex items-center gap-2 text-sm">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span className="text-muted-foreground">AI suggests: {props.aiSuggestions.category}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleApplyAISuggestion('category', props.aiSuggestions?.category)}
                    className="h-7 text-xs text-blue-600"
                  >
                    Apply
                  </Button>
                </div>
              )}
            </div>
            
            {/* Subcategory */}
            {availableSubcategories.length > 0 && (
              <div className="space-y-1.5">
                <Label htmlFor="subcategory">Subcategory</Label>
                <Select
                  value={props.subcategory || ''}
                  onValueChange={(value) => props.onDataChange({ ...props, subcategory: value })}
                >
                  <SelectTrigger id="subcategory">
                    <SelectValue placeholder="Select subcategory" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSubcategories.map((subcat) => (
                      <SelectItem key={subcat} value={subcat}>
                        {subcat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </>
        )}
        
        {/* SERVICE FIELDS - COMPACTED */}
        {props.listingType === 'service' && (
          <>
            {/* Pricing Model */}
            <div className="space-y-1.5">
              <Label>Pricing Model *</Label>
              <div className="grid grid-cols-3 gap-2">
                {/* Row 1: Fixed, Quote, Session */}
                <button
                  type="button"
                  onClick={() => props.onDataChange({ ...props, pricingModel: 'fixed' })}
                  className={`h-9 rounded-lg border-2 text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
                    props.pricingModel === 'fixed'
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <DollarSign className="w-3.5 h-3.5" />
                  Fixed
                </button>
                <button
                  type="button"
                  onClick={() => props.onDataChange({ ...props, pricingModel: 'quote' })}
                  className={`h-9 rounded-lg border-2 text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
                    props.pricingModel === 'quote'
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Quote
                </button>
                <button
                  type="button"
                  onClick={() => props.onDataChange({ ...props, pricingModel: 'session' })}
                  className={`h-9 rounded-lg border-2 text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
                    props.pricingModel === 'session'
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  Session
                </button>
                
                {/* Row 2: Hourly, Daily, Monthly */}
                <button
                  type="button"
                  onClick={() => props.onDataChange({ ...props, pricingModel: 'hourly' })}
                  className={`h-9 rounded-lg border-2 text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
                    props.pricingModel === 'hourly'
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  Hourly
                </button>
                <button
                  type="button"
                  onClick={() => props.onDataChange({ ...props, pricingModel: 'daily' })}
                  className={`h-9 rounded-lg border-2 text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
                    props.pricingModel === 'daily'
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  Daily
                </button>
                <button
                  type="button"
                  onClick={() => props.onDataChange({ ...props, pricingModel: 'monthly' })}
                  className={`h-9 rounded-lg border-2 text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
                    props.pricingModel === 'monthly'
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <CalendarDays className="w-3.5 h-3.5" />
                  Monthly
                </button>
              </div>
            </div>
            
            {/* Price + Currency OR Quote Explanation */}
            {props.pricingModel === 'quote' ? (
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  ℹ️ Price by quote - Clients will contact you for a custom estimate
                </p>
              </div>
            ) : (
              <div className="space-y-1.5">
                <Label htmlFor="price">
                  {props.pricingModel === 'hourly' ? 'Hourly Rate *' : 
                   props.pricingModel === 'daily' ? 'Daily Rate *' :
                   props.pricingModel === 'monthly' ? 'Monthly Rate *' :
                   props.pricingModel === 'session' ? 'Session Price *' :
                   'Fixed Price *'}
                </Label>
                <div className="flex gap-2">
                  <Select 
                    value={props.currency || 'USD'}
                    onValueChange={(value) => props.onDataChange({ ...props, currency: value })}
                  >
                    <SelectTrigger className="w-[30%]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="CLP">CLP</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    id="price"
                    type="number"
                    placeholder="0.00"
                    value={props.price || ''}
                    onChange={(e) => props.onDataChange({ ...props, price: e.target.value })}
                    className="flex-1"
                  />
                </div>
              </div>
            )}
            
            {/* Business Hours */}
            <div className="space-y-1.5">
              <Label htmlFor="business-hours">Business Hours (Optional)</Label>
              <Input
                id="business-hours"
                placeholder="e.g., Monday to Friday 8:30 AM - 6:00 PM"
                value={props.businessHours || ''}
                onChange={(e) => props.onDataChange({ ...props, businessHours: e.target.value })}
              />
            </div>
            
            {/* Service Category */}
            <div className="space-y-1.5">
              <Label htmlFor="category">Service Category *</Label>
              <Select
                value={props.category}
                onValueChange={(value) => props.onDataChange({ ...props, category: value })}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        )}
        
        {/* EVENT FIELDS - MVP Aligned (event_duration_type from Step 1) */}
        {props.listingType === 'event' && (() => {
          // Determine if multi-day based on intent (Step 1) or backward compatibility
          const isMultiDay = props.intent?.eventDurationType === 'multi_day' || 
                           (!props.intent?.eventDurationType && props.hasMultipleDates);
          
          return (
            <>
              {/* Ticket Price - Compacted */}
              {props.ticketType === 'paid' && (
                <div className="space-y-1.5">
                  <Label htmlFor="price">Ticket Price *</Label>
                  <div className="flex gap-2">
                    <Select 
                      value={props.currency || 'USD'}
                      onValueChange={(value) => props.onDataChange({ ...props, currency: value })}
                    >
                      <SelectTrigger className="w-[30%]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="CLP">CLP</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      id="price"
                      type="number"
                      placeholder="0.00"
                      value={props.price || ''}
                      onChange={(e) => props.onDataChange({ ...props, price: e.target.value })}
                      className="flex-1"
                    />
                  </div>
                </div>
              )}
              
              {/* Start Date - ALWAYS VISIBLE */}
              <div className="space-y-1.5">
                <Label htmlFor="event-date">{isMultiDay ? 'Start Date *' : 'Date *'}</Label>
                <Input
                  id="event-date"
                  type="date"
                  value={props.eventDate || ''}
                  onChange={(e) => props.onDataChange({ ...props, eventDate: e.target.value })}
                />
              </div>
              
              {/* End Date - Only for Multi-Day (based on eventDurationType from Step 1) */}
              {isMultiDay && (
                <div className="space-y-1.5">
                  <Label htmlFor="event-end-date">End Date *</Label>
                  <Input
                    id="event-end-date"
                    type="date"
                    value={props.eventEndDate || ''}
                    onChange={(e) => props.onDataChange({ ...props, eventEndDate: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">
                    ℹ️ Time range applies to all days
                  </p>
                </div>
              )}
              
              {/* Time - Start and End */}
              <div className="space-y-1.5">
                <Label>Time *</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Input
                      id="event-time"
                      type="time"
                      placeholder="Start"
                      value={props.eventTime || ''}
                      onChange={(e) => props.onDataChange({ ...props, eventTime: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground mt-1">Start</p>
                  </div>
                  <div>
                    <Input
                      id="event-end-time"
                      type="time"
                      placeholder="End"
                      value={props.eventEndTime || ''}
                      onChange={(e) => props.onDataChange({ ...props, eventEndTime: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground mt-1">End</p>
                  </div>
                </div>
              </div>
              
              {/* Event Category */}
              <div className="space-y-1.5">
                <Label htmlFor="category">Event Category *</Label>
                <Select
                  value={props.category}
                  onValueChange={(value) => props.onDataChange({ ...props, category: value })}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </>
          );
        })()}
        
        {/* Tags - Inline Button */}
        <div className="space-y-1.5">
          <Label htmlFor="tags">Tags (Optional)</Label>
          <div className="relative">
            <Input
              id="tags"
              placeholder="Add tag..."
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
              className="pr-10"
            />
            <button
              type="button"
              onClick={handleAddTag}
              disabled={!currentTag.trim() || props.tags.length >= 10}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-md bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
            >
              +
            </button>
          </div>
          
          {props.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {props.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="gap-1">
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(index)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
          
          {isAIActive && props.aiSuggestions?.tags && props.aiSuggestions.tags.length > 0 && (
            <div className="flex items-center gap-2 text-sm">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-muted-foreground text-xs">
                AI suggests: {props.aiSuggestions.tags.join(', ')}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleApplyAISuggestion('tags', props.aiSuggestions?.tags)}
                className="h-7 text-xs text-blue-600"
              >
                Apply
              </Button>
            </div>
          )}
          
          <p className="text-xs text-muted-foreground">
            {props.tags.length}/10 tags
          </p>
        </div>
      </div>
      
      {/* Bottom Actions */}
      <div className="p-4 border-t border-border bg-white space-y-2">
        {!canContinue && (
          <p className="text-sm text-muted-foreground text-center">
            ⚠️ Please fill all required fields
          </p>
        )}
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={props.onBack}
            className="flex-1"
          >
            ← Back
          </Button>
          <Button
            onClick={props.onNext}
            disabled={!canContinue}
            className="flex-1"
          >
            Continue →
          </Button>
        </div>
      </div>
    </div>
  );
}
