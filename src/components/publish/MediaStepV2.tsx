/**
 * Step 1: Media Upload → Type Selection → Intent Capture (INLINE)
 * v1.2.2 - Ultra-Compact: Pills horizontales, mini photos, cabe en ~380px sin scroll
 * Supports CREATE and EDIT modes (type locked in edit)
 */

import { useState, useEffect, useMemo } from 'react';
import { Upload, X, Camera, Check, Sparkles, Lock, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useFeatures } from '../../contexts/FeaturesContext';
import type { ListingType, AISuggestions, ListingIntent, OfferType, ProductCondition, ServiceMode } from './types';

interface MediaStepV2Props {
  mode?: 'create' | 'edit';
  images: string[];
  selectedType: ListingType | null;
  intent?: ListingIntent;  // NEW v1.2: Intent from draft state
  onImagesChange: (images: string[]) => void;
  onTypeChange: (type: ListingType) => void;
  onIntentChange?: (intent: ListingIntent) => void;  // NEW v1.2: Update intent
  onAISuggestions?: (suggestions: AISuggestions) => void;
  onNext: () => void;
  onSaveDraft?: () => void;
}

export function MediaStepV2({
  mode = 'create',
  images,
  selectedType,
  intent,
  onImagesChange,
  onTypeChange,
  onIntentChange,
  onAISuggestions,
  onNext,
  onSaveDraft,
}: MediaStepV2Props) {
  const { isFeatureActive } = useFeatures();
  const [aiDetectedType, setAiDetectedType] = useState<ListingType | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Check if AI Publishing Assistance is active
  const isAIActive = isFeatureActive('aiPublishingAssistance');
  
  // Type is locked in edit mode
  const isTypeLocked = mode === 'edit';

  // Auto-analyze when images are uploaded (if AI is ON and CREATE mode)
  useEffect(() => {
    if (images.length > 0 && isAIActive && !aiDetectedType && mode === 'create') {
      analyzeImages();
    }
  }, [images.length, isAIActive, mode]);

  // NEW v1.2: Smart defaults on type selection (only in CREATE mode)
  useEffect(() => {
    if (!selectedType || mode === 'edit' || intent) return;

    const smartDefaults: Record<ListingType, Partial<ListingIntent>> = {
      product: {
        listingType: 'product',
        offerMode: 'sell',
        condition: 'new',
      },
      service: {
        listingType: 'service',
        serviceMode: 'sale',
      },
      event: {
        listingType: 'event',
        ticketType: 'paid',
        eventDurationType: 'single_day',
      },
    };

    const defaults = smartDefaults[selectedType];
    if (defaults && onIntentChange) {
      onIntentChange(defaults as ListingIntent);
    }
  }, [selectedType, mode, intent, onIntentChange]);

  const analyzeImages = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      // Mock detection: Product, Service, or Event
      const mockDetectedType: ListingType = 'product';
      setAiDetectedType(mockDetectedType);
      
      // If no type selected yet, auto-select detected type
      if (!selectedType) {
        onTypeChange(mockDetectedType);
      }
      
      setIsAnalyzing(false);
    }, 1500);
  };

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const newImages: string[] = [];
    for (let i = 0; i < Math.min(files.length, 10 - images.length); i++) {
      const file = files[i];
      const url = URL.createObjectURL(file);
      newImages.push(url);
    }

    onImagesChange([...images, ...newImages]);
  };

  const removeImage = (index: number) => {
    onImagesChange(images.filter((_, i) => i !== index));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleSwitchToAI = () => {
    if (aiDetectedType) {
      onTypeChange(aiDetectedType);
    }
  };

  // NEW v1.2.1: Handle type change with auto-defaults
  const handleTypeSelect = (type: ListingType) => {
    onTypeChange(type);
  };

  // NEW v1.2.1: Handle intent field updates
  const handleOfferModeChange = (offerMode: OfferType) => {
    if (onIntentChange && selectedType) {
      onIntentChange({
        ...intent,
        listingType: selectedType,
        offerMode,
      } as ListingIntent);
    }
  };

  const handleConditionChange = (condition: ProductCondition) => {
    if (onIntentChange && selectedType) {
      onIntentChange({
        ...intent,
        listingType: selectedType,
        condition,
      } as ListingIntent);
    }
  };

  const handleServiceModeChange = (serviceMode: ServiceMode) => {
    if (onIntentChange && selectedType) {
      onIntentChange({
        ...intent,
        listingType: selectedType,
        serviceMode,
      } as ListingIntent);
    }
  };

  const handleTicketTypeChange = (ticketType: 'free' | 'paid') => {
    if (onIntentChange && selectedType) {
      onIntentChange({
        ...intent,
        listingType: selectedType,
        ticketType,
      } as ListingIntent);
    }
  };

  const handleEventDurationChange = (eventDurationType: 'single_day' | 'multi_day') => {
    if (onIntentChange && selectedType) {
      onIntentChange({
        ...intent,
        listingType: selectedType,
        eventDurationType,
      } as ListingIntent);
    }
  };

  // NEW v1.2.1: Check if intent is complete
  const isIntentComplete = useMemo(() => {
    if (!selectedType || !intent) return false;
    
    if (selectedType === 'product') {
      return !!(intent.offerMode && intent.condition);
    }
    if (selectedType === 'service') {
      return !!intent.serviceMode;
    }
    if (selectedType === 'event') {
      return !!(intent.ticketType && intent.eventDurationType);
    }
    return false;
  }, [selectedType, intent]);

  // NEW v1.2.1: Can continue only if intent is complete (in create mode) or has images+type (edit mode)
  const canContinue = useMemo(() => {
    if (images.length === 0 || !selectedType) return false;
    
    // Edit mode: just need images + type (intent might be missing from old listings)
    if (mode === 'edit') return true;
    
    // Create mode: need complete intent
    return isIntentComplete;
  }, [images.length, selectedType, mode, isIntentComplete]);

  const typeOptions: { value: ListingType; label: string; emoji: string }[] = [
    { value: 'product', label: 'Product', emoji: '📦' },
    { value: 'service', label: 'Service', emoji: '🛠️' },
    { value: 'event', label: 'Event', emoji: '🎉' },
  ];

  const offerModes: Array<{ value: OfferType; label: string; emoji: string }> = [
    { value: 'sell', label: 'Sell', emoji: '💵' },
    { value: 'trade', label: 'Trade', emoji: '🔄' },
    { value: 'free', label: 'Give away', emoji: '🎁' },
    { value: 'sell_or_trade', label: 'Sell/Trade', emoji: '💵🔄' },
  ];

  const conditions: Array<{ value: ProductCondition; label: string; emoji: string }> = [
    { value: 'new', label: 'New', emoji: '✨' },
    { value: 'like-new', label: 'Like New', emoji: '👍' },
    { value: 'good', label: 'Good', emoji: '✔️' },
    { value: 'fair', label: 'Fair', emoji: '📦' },
  ];

  const serviceModes: Array<{ value: ServiceMode; label: string; emoji: string }> = [
    { value: 'sale', label: 'For Sale', emoji: '💼' },
    { value: 'rent', label: 'For Rent', emoji: '📅' },
  ];

  const ticketTypes: Array<{ value: 'free' | 'paid'; label: string; emoji: string }> = [
    { value: 'free', label: 'Free', emoji: '🆓' },
    { value: 'paid', label: 'Paid', emoji: '💵' },
  ];

  const eventDurations: Array<{ value: 'single_day' | 'multi_day'; label: string; emoji: string }> = [
    { value: 'single_day', label: 'Single Day', emoji: '📅' },
    { value: 'multi_day', label: 'Multi-Day', emoji: '📆' },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Step Header - ULTRA COMPACTO */}
      <div className="px-4 pt-2.5 pb-1.5 border-b border-border bg-white">
        <h2 className="text-xs font-medium text-gray-900">
          {images.length === 0 ? 'Photos' : 'Media & Type'}
        </h2>
        <p className="text-[10px] text-muted-foreground">
          {images.length === 0 
            ? 'At least 1 photo required'
            : `${images.length} photo${images.length > 1 ? 's' : ''} • ${selectedType ? typeOptions.find(t => t.value === selectedType)?.label : 'Select type'}`
          }
        </p>
      </div>

      {/* Scrollable Content - MÁS PADDING */}
      <div className="flex-1 overflow-auto p-4">
        
        {/* ========== FASE 1: Solo Upload (cuando no hay fotos) ========== */}
        {images.length === 0 && (
          <div className="space-y-6">
            {/* Upload Grid */}
            <div className="grid grid-cols-2 gap-3">
              {/* Upload Button */}
              <div
                onDrop={handleDrop}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                className={`
                  relative border-2 border-dashed rounded-xl p-6
                  transition-all duration-200
                  ${isDragging ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-gray-400'}
                `}
              >
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleFileSelect(e.target.files)}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                    <Upload className="w-6 h-6 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Upload Photos</p>
                    <p className="text-xs text-gray-500">Browse files</p>
                  </div>
                </div>
              </div>

              {/* Camera Button */}
              <div className="relative border-2 border-dashed rounded-xl p-6 border-gray-300 hover:border-gray-400 transition-all">
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={(e) => handleFileSelect(e.target.files)}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 mx-auto bg-blue-50 rounded-full flex items-center justify-center">
                    <Camera className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Take Photo</p>
                    <p className="text-xs text-gray-500">Use camera</p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs text-center text-gray-400">
              0/10 photos • PNG, JPG up to 10MB
            </p>

            {/* Tips Section */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
              <p className="text-sm font-medium text-blue-900">💡 Tips for great photos:</p>
              <ul className="text-xs text-muted-foreground space-y-1 pl-4">
                <li>• Use good lighting</li>
                <li>• Show product from multiple angles</li>
                <li>• Include any defects or imperfections</li>
                <li>• First photo will be your cover image</li>
              </ul>
            </div>
          </div>
        )}

        {/* ========== FASE 2: Photos + Type + INLINE Intent (cuando hay fotos) ========== */}
        {images.length > 0 && (
          <div className="space-y-3">
            {/* Uploaded Photos Section - MINI PREVIEW */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-medium">Photos ({images.length})</h3>
                {images.length < 10 && (
                  <label className="text-[10px] text-primary cursor-pointer hover:underline">
                    + Add More
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleFileSelect(e.target.files)}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Mini Grid - 4 columnas, solo 1 fila, thumbnails 60px */}
              <div className="grid grid-cols-4 gap-1.5">
                {images.slice(0, 3).map((image, index) => (
                  <motion.div
                    key={image}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="relative aspect-square rounded-md overflow-hidden bg-gray-100 group"
                  >
                    <img
                      src={image}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    
                    {index === 0 && (
                      <div className="absolute top-0.5 left-0.5">
                        <Badge className="bg-primary/90 text-white text-[8px] px-1 py-0 leading-tight">
                          Cover
                        </Badge>
                      </div>
                    )}
                    
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-0.5 right-0.5 w-4 h-4 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-2.5 h-2.5 text-white" />
                    </button>
                  </motion.div>
                ))}
                
                {/* Mostrar +N si hay más de 3 fotos */}
                {images.length > 3 && (
                  <div className="relative aspect-square rounded-md bg-gray-100 flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-600">+{images.length - 3}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-200" />
            
            {/* Type Selection Section - COMPACTO */}
            <div className="space-y-1.5">
              <h3 className="text-sm font-medium text-gray-900 flex items-center gap-1">
                What are you listing?
                {isTypeLocked && <Lock className="w-3 h-3 text-muted-foreground" />}
              </h3>

              {/* Type Selector Buttons - grid 3 columnas (OK) */}
              <div className="grid grid-cols-3 gap-1.5">
                {typeOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => !isTypeLocked && handleTypeSelect(option.value)}
                    disabled={isTypeLocked}
                    className={`
                      relative py-2 px-2 rounded-md border-2 transition-all
                      ${selectedType === option.value
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-gray-300'
                      }
                      ${isTypeLocked && selectedType !== option.value ? 'opacity-40 cursor-not-allowed' : ''}
                      ${isTypeLocked && selectedType === option.value ? 'cursor-not-allowed' : ''}
                    `}
                  >
                    <div className="text-center space-y-0.5">
                      <div className="text-lg">{option.emoji}</div>
                      <div className="text-xs font-medium leading-tight">{option.label}</div>
                    </div>
                    
                    {selectedType === option.value && (
                      <div className="absolute top-0.5 right-0.5 w-3 h-3 bg-primary rounded-full flex items-center justify-center">
                        <Check className="w-2 h-2 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* AI Detection Badge - SOLO SI NO COINCIDE */}
              {isAIActive && aiDetectedType && !isAnalyzing && mode === 'create' && aiDetectedType !== selectedType && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-1.5 rounded-md bg-amber-50 border border-amber-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-600" />
                      <span className="text-xs font-medium text-amber-900">
                        AI: {typeOptions.find(t => t.value === aiDetectedType)?.label}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleSwitchToAI}
                      className="h-5 text-xs text-amber-700 hover:text-amber-900 px-1.5"
                    >
                      Switch
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* ========== NEW v1.2.2: PILLS HORIZONTALES - ULTRA COMPACTO ========== */}
            {selectedType && mode === 'create' && (
              <>
                {/* Divider */}
                <div className="h-px bg-gray-200" />

                {/* PRODUCT Intent: Offer Mode + Condition */}
                {selectedType === 'product' && (
                  <div className="space-y-3">
                    {/* Offer Mode - PILLS HORIZONTALES MÁS ALTOS */}
                    <div className="space-y-1.5">
                      <h3 className="text-sm font-medium text-gray-900">What do you want to do?</h3>
                      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                        {offerModes.map((mode) => (
                          <button
                            key={mode.value}
                            onClick={() => handleOfferModeChange(mode.value)}
                            className={`
                              flex items-center gap-1.5 px-3 py-2.5 rounded-full border-2 transition-all whitespace-nowrap flex-shrink-0
                              ${intent?.offerMode === mode.value
                                ? 'border-primary bg-primary/10 text-primary'
                                : 'border-gray-200 hover:border-gray-300 text-gray-700'
                              }
                            `}
                          >
                            <span className="text-sm">{mode.emoji}</span>
                            <span className="text-xs font-medium">{mode.label}</span>
                            {intent?.offerMode === mode.value && (
                              <Check className="w-3 h-3" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Condition - PILLS HORIZONTALES MÁS ALTOS */}
                    <div className="space-y-1.5">
                      <h3 className="text-sm font-medium text-gray-900">What's the condition?</h3>
                      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                        {conditions.map((cond) => (
                          <button
                            key={cond.value}
                            onClick={() => handleConditionChange(cond.value)}
                            className={`
                              flex items-center gap-1.5 px-3 py-2.5 rounded-full border-2 transition-all whitespace-nowrap flex-shrink-0
                              ${intent?.condition === cond.value
                                ? 'border-primary bg-primary/10 text-primary'
                                : 'border-gray-200 hover:border-gray-300 text-gray-700'
                              }
                            `}
                          >
                            <span className="text-sm">{cond.emoji}</span>
                            <span className="text-xs font-medium">{cond.label}</span>
                            {intent?.condition === cond.value && (
                              <Check className="w-3 h-3" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* SERVICE Intent: Service Mode - PILLS HORIZONTALES */}
                {selectedType === 'service' && (
                  <div className="space-y-1.5">
                    <h3 className="text-sm font-medium text-gray-900">What do you want to do?</h3>
                    <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                      {serviceModes.map((mode) => (
                        <button
                          key={mode.value}
                          onClick={() => handleServiceModeChange(mode.value)}
                          className={`
                            flex items-center gap-1.5 px-4 py-2.5 rounded-full border-2 transition-all whitespace-nowrap flex-shrink-0
                            ${intent?.serviceMode === mode.value
                              ? 'border-primary bg-primary/10 text-primary'
                              : 'border-gray-200 hover:border-gray-300 text-gray-700'
                            }
                          `}
                        >
                          <span className="text-base">{mode.emoji}</span>
                          <span className="text-xs font-medium">{mode.label}</span>
                          {intent?.serviceMode === mode.value && (
                            <Check className="w-3 h-3" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* EVENT Intent: Ticket Type - PILLS HORIZONTALES */}
                {selectedType === 'event' && (
                  <div className="space-y-1.5">
                    <h3 className="text-sm font-medium text-gray-900">Ticket type?</h3>
                    <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                      {ticketTypes.map((type) => (
                        <button
                          key={type.value}
                          onClick={() => handleTicketTypeChange(type.value)}
                          className={`
                            flex items-center gap-1.5 px-4 py-2.5 rounded-full border-2 transition-all whitespace-nowrap flex-shrink-0
                            ${intent?.ticketType === type.value
                              ? 'border-primary bg-primary/10 text-primary'
                              : 'border-gray-200 hover:border-gray-300 text-gray-700'
                            }
                          `}
                        >
                          <span className="text-base">{type.emoji}</span>
                          <span className="text-xs font-medium">{type.label}</span>
                          {intent?.ticketType === type.value && (
                            <Check className="w-3 h-3" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* EVENT Intent: Event Duration - PILLS HORIZONTALES */}
                {selectedType === 'event' && (
                  <div className="space-y-1.5">
                    <h3 className="text-sm font-medium text-gray-900">Event duration?</h3>
                    <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                      {eventDurations.map((duration) => (
                        <button
                          key={duration.value}
                          onClick={() => handleEventDurationChange(duration.value)}
                          className={`
                            flex items-center gap-1.5 px-4 py-2.5 rounded-full border-2 transition-all whitespace-nowrap flex-shrink-0
                            ${intent?.eventDurationType === duration.value
                              ? 'border-primary bg-primary/10 text-primary'
                              : 'border-gray-200 hover:border-gray-300 text-gray-700'
                            }
                          `}
                        >
                          <span className="text-base">{duration.emoji}</span>
                          <span className="text-xs font-medium">{duration.label}</span>
                          {intent?.eventDurationType === duration.value && (
                            <Check className="w-3 h-3" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* Bottom Action - COMPACTO */}
      <div className="p-4 border-t border-border bg-white">
        <Button
          onClick={onNext}
          disabled={!canContinue}
          className="w-full h-9"
          size="default"
        >
          Continue →
        </Button>
      </div>
    </div>
  );
}