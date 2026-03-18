/**
 * Step 5: Preview & Publish
 * v1.1.1 - Shows "New listing" badge instead of rating stars
 * Supports CREATE and EDIT modes with change detection
 */

import { Edit, MapPin, Package, MessageCircle, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import type { PublishFormData } from './types';

interface PreviewStepV2Props {
  mode?: 'create' | 'edit';
  changeCount?: number;
  hasChanges?: boolean;
  formData: PublishFormData;
  onPublish: () => void;
  onSaveAsDraft?: () => void; // NEW: Save draft handler
  onBack: () => void;
  onEdit: (step: string) => void;
  isPublishing: boolean;
}

export function PreviewStepV2({ 
  mode = 'create',
  changeCount = 0,
  hasChanges = true,
  formData, 
  onPublish, 
  onSaveAsDraft, // NEW: Save draft handler
  onBack, 
  onEdit, 
  isPublishing 
}: PreviewStepV2Props) {
  
  // Validation
  const canPublish = 
    formData.images.length >= 1 &&
    formData.title.trim() !== '' &&
    formData.category.trim() !== '' &&
    formData.location !== null &&
    (mode === 'create' || hasChanges); // In edit mode, require changes
  
  const finalButtonText = mode === 'edit' ? 'Save Changes' : 'Publish Now';
  const loadingText = mode === 'edit' ? 'Saving...' : 'Publishing...';
  
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 border-b border-border bg-white">
        <h2 className="font-medium">Preview & Publish</h2>
        <p className="text-sm text-muted-foreground">
          How your listing will appear
        </p>
      </div>
      
      {/* Scrollable Content */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        
        {/* LISTING PREVIEW CARD */}
        <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
          {/* Image Carousel Preview */}
          <div className="relative bg-gray-100 aspect-[4/3]">
            {formData.images.length > 0 ? (
              <img
                src={formData.images[0]}
                alt="Cover"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No image
              </div>
            )}
            
            {formData.images.length > 1 && (
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                1/{formData.images.length}
              </div>
            )}
          </div>
          
          {/* Listing Info */}
          <div className="p-4 space-y-3">
            {/* Title & Price */}
            <div>
              <h3 className="font-semibold text-lg line-clamp-2">
                {formData.title || 'Untitled'}
              </h3>
              {formData.price && (
                <p className="text-xl font-bold text-primary mt-1">
                  ${formData.price}
                </p>
              )}
            </div>
            
            {/* New Listing Badge + Condition + Category */}
            <div className="flex items-center gap-2 flex-wrap text-sm">
              <Badge className="bg-green-100 text-green-800 border-green-200">
                🆕 New listing
              </Badge>
              {formData.condition && (
                <span className="text-muted-foreground">
                  • {formData.condition.replace('-', ' ')}
                </span>
              )}
              {formData.category && (
                <span className="text-muted-foreground">
                  • {formData.category}
                </span>
              )}
            </div>
            
            {/* Description */}
            <div>
              <p className="text-sm font-medium mb-1">Description:</p>
              <p className="text-sm text-gray-700 line-clamp-3">
                {formData.description || 'No description'}
              </p>
            </div>
            
            {/* Location */}
            {formData.location && (
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {formData.location.city}, {formData.location.region}
                </span>
              </div>
            )}
            
            {/* Delivery & Contact */}
            <div className="space-y-2">
              {formData.deliveryModes.length > 0 && (
                <div className="flex items-center gap-2 text-sm">
                  <Package className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {formData.deliveryModes.map(m => m.charAt(0).toUpperCase() + m.slice(1)).join(', ')}
                  </span>
                </div>
              )}
              
              {formData.contactModes.length > 0 && (
                <div className="flex items-center gap-2 text-sm">
                  <MessageCircle className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {formData.contactModes.map(m => {
                      if (m === 'chat') return 'In-app messages';
                      if (m === 'phone') return 'Phone';
                      if (m === 'whatsapp') return 'WhatsApp';
                      return m;
                    }).join(', ')}
                  </span>
                </div>
              )}
            </div>
            
            {/* Tags */}
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {formData.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* QUICK EDIT BUTTONS */}
        <div>
          <p className="text-sm font-medium mb-2">Quick Edit:</p>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit('media')}
              className="justify-start gap-2"
            >
              <Edit className="w-4 h-4" />
              Photos & Type
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit('basic-info')}
              className="justify-start gap-2"
            >
              <Edit className="w-4 h-4" />
              Details
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit('location')}
              className="justify-start gap-2"
            >
              <Edit className="w-4 h-4" />
              Location
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit('pricing')}
              className="justify-start gap-2"
            >
              <Edit className="w-4 h-4" />
              Contact & Delivery
            </Button>
          </div>
        </div>
        
        {/* LEGAL DISCLAIMER */}
        <div className="text-xs text-center text-muted-foreground pb-2">
          📜 By publishing, you agree to our<br />
          Community Guidelines and Terms.
        </div>
      </div>
      
      {/* Bottom Actions */}
      <div className="p-4 border-t border-border bg-white">
        {mode === 'edit' && !hasChanges && (
          <p className="text-sm text-center text-amber-600 mb-2">
            ⓘ No changes to save
          </p>
        )}
        
        {!canPublish && hasChanges && (
          <p className="text-sm text-center text-muted-foreground mb-2">
            ⚠️ Please complete all required fields
          </p>
        )}
        
        {mode === 'create' ? (
          // CREATE MODE: 2 buttons - Back, Publish Now
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={onBack}
              disabled={isPublishing}
              className="flex-1"
            >
              Back
            </Button>
            <Button
              onClick={onPublish}
              disabled={!canPublish || isPublishing}
              className="gap-2 flex-[2]"
            >
              {isPublishing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {loadingText}
                </>
              ) : (
                <>
                  {finalButtonText} ✓
                </>
              )}
            </Button>
          </div>
        ) : (
          // EDIT MODE: 2 buttons - Back, Save Changes
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              onClick={onBack}
              disabled={isPublishing}
            >
              Back
            </Button>
            <Button
              onClick={onPublish}
              disabled={!canPublish || isPublishing}
              className="gap-2"
            >
              {isPublishing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  Save Changes ✓
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}