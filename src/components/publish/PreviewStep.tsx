/**
 * Step 5: Preview & Confirm
 * Review all details and publish
 */

import { CheckCircle2, AlertCircle, MapPin, Package, MessageCircle, Edit, Globe, Users, Lock } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import type { PublishFormData } from './types';

interface PreviewStepProps {
  formData: PublishFormData;
  onPublish: () => void;
  onBack: () => void;
  onEdit: (step: string) => void;
  isPublishing: boolean;
}

export function PreviewStep({ formData, onPublish, onBack, onEdit, isPublishing }: PreviewStepProps) {
  
  // Validation checks
  const validations = [
    { 
      check: formData.images.length >= 1, 
      message: 'At least 1 photo uploaded',
      severity: 'error' as const
    },
    { 
      check: formData.title.length >= 3, 
      message: 'Title has minimum 3 characters',
      severity: 'error' as const
    },
    { 
      check: !!formData.location, 
      message: 'Location is set',
      severity: 'error' as const
    },
    {
      check: formData.images.length >= 3,
      message: 'Consider adding more photos (3+ recommended)',
      severity: 'warning' as const
    },
    {
      check: formData.tags.length > 0,
      message: 'Tags help buyers find your listing',
      severity: 'info' as const
    },
  ];

  const errors = validations.filter(v => v.severity === 'error' && !v.check);
  const warnings = validations.filter(v => v.severity === 'warning' && !v.check);
  const canPublish = errors.length === 0;

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-1 overflow-auto p-3 space-y-2 w-full max-w-full">
        
        <div className="mb-2">
          <h2 className="text-xl font-semibold">Review Your Listing</h2>
          <p className="text-xs text-muted-foreground">
            Check everything before publishing
          </p>
        </div>

        {/* Preview Cards */}
        <div className="space-y-2">
          
          {/* Photos */}
          <div className="border rounded-lg p-2">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium">Photos ({formData.images.length})</h3>
              <Button variant="ghost" size="sm" className="h-7" onClick={() => onEdit('media')}>
                <Edit className="w-3 h-3" />
              </Button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {formData.images.slice(0, 4).map((image, index) => (
                <div key={index} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <img src={image} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
              {formData.images.length > 4 && (
                <div className="aspect-square rounded-lg bg-gray-100 flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">+{formData.images.length - 4}</span>
                </div>
              )}
            </div>
          </div>

          {/* Basic Info */}
          <div className="border rounded-lg p-2">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium">Product Details</h3>
              <Button variant="ghost" size="sm" className="h-7" onClick={() => onEdit('basic-info')}>
                <Edit className="w-3 h-3" />
              </Button>
            </div>
            <div className="space-y-1.5">
              <div>
                <p className="text-xs text-muted-foreground">Title</p>
                <p className="text-sm font-medium line-clamp-1">{formData.title}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Description</p>
                <p className="text-xs line-clamp-1">{formData.description}</p>
              </div>
              <div className="flex gap-1.5 flex-wrap">
                <Badge variant="secondary" className="text-xs py-0">{formData.category}</Badge>
                <Badge variant="outline" className="text-xs py-0">{formData.subcategory}</Badge>
                {formData.condition && (
                  <Badge variant="outline" className="text-xs py-0">{formData.condition}</Badge>
                )}
                {formData.tags.length > 0 && formData.tags.slice(0, 2).map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs py-0">
                    #{tag}
                  </Badge>
                ))}
                {formData.tags.length > 2 && (
                  <Badge variant="secondary" className="text-xs py-0">+{formData.tags.length - 2}</Badge>
                )}
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="border rounded-lg p-2">
            <div className="flex items-center justify-between mb-1.5">
              <h3 className="text-sm font-medium">Location</h3>
              <Button variant="ghost" size="sm" className="h-7" onClick={() => onEdit('location')}>
                <Edit className="w-3 h-3" />
              </Button>
            </div>
            {formData.location && (
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs line-clamp-1">{formData.location.address || `${formData.location.city}, ${formData.location.region}`}</p>
                  <p className="text-xs text-muted-foreground">
                    {formData.locationPrecision === 'approximate' ? 'Approximate' : 'Exact'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Pricing & Contact */}
          <div className="border rounded-lg p-2">
            <div className="flex items-center justify-between mb-1.5">
              <h3 className="text-sm font-medium">Price & Contact</h3>
              <Button variant="ghost" size="sm" className="h-7" onClick={() => onEdit('pricing')}>
                <Edit className="w-3 h-3" />
              </Button>
            </div>
            <div className="space-y-1.5">
              {/* Type and Price in one line */}
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="secondary" className="text-xs py-0 capitalize">{formData.type}</Badge>
                {formData.price && (
                  <>
                    <Badge variant="outline" className="text-xs py-0">
                      ${formData.price}
                    </Badge>
                    {formData.priceNegotiable && (
                      <Badge variant="secondary" className="text-xs py-0">Negotiable</Badge>
                    )}
                  </>
                )}
              </div>
              
              {/* Delivery and Contact combined */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Delivery</p>
                  <div className="flex flex-wrap gap-0.5">
                    {formData.deliveryModes.map(mode => (
                      <Badge key={mode} variant="outline" className="text-xs py-0 capitalize">
                        {mode}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Contact</p>
                  <div className="flex flex-wrap gap-0.5">
                    {formData.contactModes.map(mode => (
                      <Badge key={mode} variant="outline" className="text-xs py-0 capitalize">
                        {mode}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Visibility compact */}
              <div className="flex items-center gap-1.5 pt-0.5">
                {formData.visibility === 'public' && (
                  <>
                    <Globe className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                    <span className="text-xs">Public</span>
                  </>
                )}
                {formData.visibility === 'groups' && (
                  <>
                    <Users className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                    <span className="text-xs">
                      {formData.selectedGroups?.length || 0} group{(formData.selectedGroups?.length || 0) > 1 ? 's' : ''}
                    </span>
                    {formData.selectedGroups && formData.selectedGroups.length > 0 && (
                      <div className="flex flex-wrap gap-0.5 ml-1">
                        {formData.selectedGroups.slice(0, 2).map(groupId => (
                          <Badge key={groupId} variant="secondary" className="text-xs py-0">
                            {groupId}
                          </Badge>
                        ))}
                        {formData.selectedGroups.length > 2 && (
                          <Badge variant="secondary" className="text-xs py-0">+{formData.selectedGroups.length - 2}</Badge>
                        )}
                      </div>
                    )}
                  </>
                )}
                {formData.visibility === 'private' && (
                  <>
                    <Lock className="w-3.5 h-3.5 text-gray-600 flex-shrink-0" />
                    <span className="text-xs">Private</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Validation Status - Compact */}
        {errors.length > 0 && (
          <Alert variant="destructive" className="py-2">
            <AlertCircle className="h-3 w-3" />
            <AlertDescription className="text-xs">
              {errors.map((error, index) => (
                <div key={index}>• {error.message}</div>
              ))}
            </AlertDescription>
          </Alert>
        )}

        {warnings.length > 0 && errors.length === 0 && (
          <Alert className="py-2">
            <AlertCircle className="h-3 w-3" />
            <AlertDescription className="text-xs">
              {warnings.map((warning, index) => (
                <div key={index}>• {warning.message}</div>
              ))}
            </AlertDescription>
          </Alert>
        )}

        {/* Quick validation indicators - only show critical ones */}
        <div className="grid grid-cols-2 gap-1">
          {validations.filter(v => v.severity === 'error').map((validation, index) => (
            <div
              key={index}
              className={`
                flex items-center gap-1.5 p-1.5 rounded-lg text-xs
                ${validation.check 
                  ? 'bg-green-50 text-green-700'
                  : 'bg-red-50 text-red-700'
                }
              `}
            >
              {validation.check ? (
                <CheckCircle2 className="w-3 h-3 shrink-0" />
              ) : (
                <AlertCircle className="w-3 h-3 shrink-0" />
              )}
              <span className="truncate">{validation.message}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="border-t p-3 bg-white space-y-2 w-full">
        <Button
          onClick={onPublish}
          disabled={!canPublish || isPublishing}
          className="w-full"
        >
          {isPublishing ? 'Publishing...' : 'Publish Listing'}
        </Button>
        
        <Button
          variant="outline"
          onClick={onBack}
          disabled={isPublishing}
          className="w-full"
          size="sm"
        >
          Back
        </Button>
      </div>
    </div>
  );
}