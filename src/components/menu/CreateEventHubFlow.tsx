/**
 * Create Event Hub Flow - 2-Step Process
 * Premium Design 2025
 * 
 * Step 1: Select Flyer (choose an Event Listing as the main flyer)
 * Step 2: Hub Rules (visibility, contributors, eligibility, approval)
 */

import { useState } from 'react';
import { ArrowLeft, ArrowRight, Calendar, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Badge } from '../ui/badge';
import { toast } from 'sonner@2.0.3';

interface CreateEventHubFlowProps {
  onBack: () => void;
  onComplete: () => void;
  onCreateEventListing?: () => void;
}

export function CreateEventHubFlow({ onBack, onComplete, onCreateEventListing }: CreateEventHubFlowProps) {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [selectedFlyer, setSelectedFlyer] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    visibility: 'public' as 'public' | 'groups' | 'private',
    allowedContributors: 'anyone' as 'anyone' | 'approved' | 'invited',
    allowProducts: true,
    allowServices: true,
    categories: [] as string[],
    requireApproval: false,
  });

  // Mock event listings (type = event)
  const mockEventListings = [
    {
      id: 'event-1',
      title: 'Tech Meetup Santiago - Dec 2025',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
      date: '2025-12-25',
      time: '18:00',
      location: 'Santiago, RM',
      ticketType: 'free' as const,
    },
    {
      id: 'event-2',
      title: 'Art Exhibition - Viña del Mar',
      image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=400',
      date: '2025-12-28',
      time: '10:00',
      location: 'Viña del Mar, V',
      ticketType: 'paid' as const,
      price: '$5',
    },
    {
      id: 'event-3',
      title: 'New Year Party 2026',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400',
      date: '2025-12-31',
      time: '21:00',
      location: 'Valparaíso, V',
      ticketType: 'paid' as const,
      price: '$15',
    },
  ];

  const handleNext = () => {
    if (currentStep === 1) {
      if (!selectedFlyer) {
        toast.error('Please select an event flyer');
        return;
      }
      setCurrentStep(2);
    } else {
      // Complete creation
      toast.success('Event Hub created!');
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep === 1) {
      onBack();
    } else {
      setCurrentStep(1);
    }
  };

  const selectedFlyerData = mockEventListings.find(e => e.id === selectedFlyer);

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-[480px] lg:max-w-[640px] mx-auto">
      {/* Status bar removed - PWA/WebView mobile */}

      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center justify-between h-14 px-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="h-9 w-9 p-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <h1 className="font-semibold">
            Create Event Hub
          </h1>
          
          <div className="w-9" /> {/* Spacer */}
        </div>

        {/* Progress */}
        <div className="px-4 pb-3">
          <div className="flex items-center gap-2">
            <div className={`h-1 flex-1 rounded-full ${currentStep >= 1 ? 'bg-primary' : 'bg-muted'}`} />
            <div className={`h-1 flex-1 rounded-full ${currentStep >= 2 ? 'bg-primary' : 'bg-muted'}`} />
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Step {currentStep} of 2: {currentStep === 1 ? 'Select Flyer' : 'Hub Rules'}
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-auto pb-6">
        {/* STEP 1: Select Flyer */}
        {currentStep === 1 && (
          <div className="p-4 space-y-4">
            <div className="mb-4">
              <h2 className="text-sm font-semibold mb-1">Select Event Flyer</h2>
              <p className="text-xs text-muted-foreground">
                Choose one of your event listings to be the main flyer for this hub
              </p>
            </div>

            {mockEventListings.length === 0 ? (
              <div className="py-12 text-center px-4">
                <div className="text-5xl mb-4">📅</div>
                <h3 className="font-medium mb-2">No Event Listings Yet</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Create an Event listing first to use it as a flyer for this hub
                </p>
                {onCreateEventListing && (
                  <Button onClick={onCreateEventListing} className="mx-auto">
                    Create Event Listing
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {mockEventListings.map((event) => (
                  <button
                    key={event.id}
                    onClick={() => setSelectedFlyer(event.id)}
                    className={`w-full bg-white border-2 rounded-xl overflow-hidden text-left transition-all ${
                      selectedFlyer === event.id
                        ? 'border-primary shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex gap-3 p-3">
                      {/* Image */}
                      <div className="relative">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                        {selectedFlyer === event.id && (
                          <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm mb-1 line-clamp-2">
                          {event.title}
                        </h3>
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">
                            📅 {new Date(event.date).toLocaleDateString('en', { month: 'short', day: 'numeric' })} · {event.time}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            📍 {event.location}
                          </p>
                          <Badge variant="secondary" className="text-xs h-5 px-2">
                            {event.ticketType === 'free' ? '🎟️ Free' : `💳 ${event.price}`}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Preview */}
            {selectedFlyerData && (
              <div className="mt-6 p-4 bg-primary/5 border-2 border-primary/20 rounded-xl">
                <p className="text-xs font-medium text-primary mb-2">✨ Preview</p>
                <p className="text-sm">
                  This event will be the main flyer. Other users can add their own listings (products/services) to this event hub.
                </p>
              </div>
            )}
          </div>
        )}

        {/* STEP 2: Hub Rules */}
        {currentStep === 2 && (
          <div className="p-4 space-y-6">
            {/* Selected Flyer Summary */}
            {selectedFlyerData && (
              <div className="bg-white border-2 border-gray-200 rounded-xl p-3 flex gap-3">
                <img
                  src={selectedFlyerData.image}
                  alt={selectedFlyerData.title}
                  className="w-16 h-16 rounded-lg object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{selectedFlyerData.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(selectedFlyerData.date).toLocaleDateString('en', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
              </div>
            )}

            {/* Visibility */}
            <div className="space-y-3">
              <Label>Event Hub Visibility</Label>
              <div className="grid grid-cols-3 gap-2">
                {(['public', 'groups', 'private'] as const).map((vis) => (
                  <button
                    key={vis}
                    type="button"
                    onClick={() => setFormData({ ...formData, visibility: vis })}
                    className={`h-20 rounded-lg border-2 text-xs font-medium transition-all flex flex-col items-center justify-center gap-1 ${
                      formData.visibility === vis
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-2xl">
                      {vis === 'public' && '🌍'}
                      {vis === 'groups' && '👥'}
                      {vis === 'private' && '🔒'}
                    </span>
                    <span className="capitalize">{vis}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Allowed Contributors */}
            <div className="space-y-1.5">
              <Label htmlFor="contributors">Who Can Add Listings?</Label>
              <Select
                value={formData.allowedContributors}
                onValueChange={(value: any) => setFormData({ ...formData, allowedContributors: value })}
              >
                <SelectTrigger id="contributors">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="anyone">🌍 Anyone</SelectItem>
                  <SelectItem value="approved">✅ Approved users</SelectItem>
                  <SelectItem value="invited">🔒 Invited only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Eligibility */}
            <div className="space-y-3 pt-4 border-t border-border">
              <Label>Allowed Listing Types</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="allow-products"
                    checked={formData.allowProducts}
                    onCheckedChange={(checked) => 
                      setFormData({ ...formData, allowProducts: checked === true })
                    }
                  />
                  <label htmlFor="allow-products" className="text-sm cursor-pointer">
                    Products (sale/rent/trade)
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="allow-services"
                    checked={formData.allowServices}
                    onCheckedChange={(checked) => 
                      setFormData({ ...formData, allowServices: checked === true })
                    }
                  />
                  <label htmlFor="allow-services" className="text-sm cursor-pointer">
                    Services
                  </label>
                </div>
              </div>
            </div>

            {/* Approval Toggle */}
            <div className="space-y-3 pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label htmlFor="require-approval" className="cursor-pointer">
                    Require Approval
                  </Label>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Review listings before they appear in the hub
                  </p>
                </div>
                <Checkbox
                  id="require-approval"
                  checked={formData.requireApproval}
                  onCheckedChange={(checked) => 
                    setFormData({ ...formData, requireApproval: checked === true })
                  }
                />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <div className="sticky bottom-0 bg-background border-t border-border p-4">
        <Button onClick={handleNext} className="w-full h-11" disabled={currentStep === 1 && !selectedFlyer}>
          {currentStep === 1 ? (
            <>
              Next: Hub Rules
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          ) : (
            'Create Event Hub'
          )}
        </Button>
      </div>
    </div>
  );
}

export default CreateEventHubFlow;