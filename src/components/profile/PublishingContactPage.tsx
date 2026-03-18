/**
 * Publishing - Default Contact Methods Page
 * CANONICAL ALIGNED
 */

import { ArrowLeft, MessageSquare, MessageCircle, Globe, Share2, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Alert, AlertDescription } from '../ui/alert';
import { useProfile } from '../../contexts/ProfileContext';
import type { ContactMethod } from '../../types/canonical';

interface PublishingContactPageProps {
  onBack: () => void;
}

export function PublishingContactPage({ onBack }: PublishingContactPageProps) {
  const { profile, updateProfile } = useProfile();

  const handleMethodChange = (method: ContactMethod) => {
    updateProfile({
      default_contact_method: method,
    });
  };

  const handleWhatsAppPhoneChange = (phone: string) => {
    updateProfile({
      default_whatsapp_phone: phone,
    });
  };

  const handleWebsiteUrlChange = (url: string) => {
    updateProfile({
      default_website_url: url,
    });
  };

  const handleSocialUrlChange = (url: string) => {
    updateProfile({
      default_social_url: url,
    });
  };

  const isPhoneVerified = profile.phoneVerified;
  const selectedMethod = profile.default_contact_method;

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-[480px] mx-auto">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center h-14 px-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="h-9 w-9 p-0">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-semibold ml-3">Default Contact Method</h1>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-auto px-4 py-6 space-y-6">
        <div className="text-sm text-muted-foreground mb-4">
          Choose your preferred way for buyers to contact you. This will be pre-selected when you publish new listings.
        </div>

        <RadioGroup 
          value={selectedMethod} 
          onValueChange={(value) => handleMethodChange(value as ContactMethod)}
        >
          {/* In-app Chat */}
          <div className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors">
            <RadioGroupItem value="in_app_chat" id="in_app_chat" className="mt-1" />
            <label htmlFor="in_app_chat" className="flex-1 cursor-pointer">
              <div className="flex items-center gap-2 mb-1">
                <MessageSquare className="w-4 h-4 text-primary" />
                <span className="font-medium">In-App Chat</span>
                <span className="text-xs text-green-600 font-medium ml-auto">Recommended</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Secure messaging within ListlyUp. Best for privacy and safety.
              </p>
            </label>
          </div>

          {/* WhatsApp */}
          <div className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors">
            <RadioGroupItem 
              value="whatsapp" 
              id="whatsapp" 
              className="mt-1"
              disabled={!isPhoneVerified}
            />
            <label htmlFor="whatsapp" className="flex-1 cursor-pointer">
              <div className="flex items-center gap-2 mb-1">
                <MessageCircle className="w-4 h-4 text-green-600" />
                <span className="font-medium">WhatsApp</span>
                {!isPhoneVerified && (
                  <span className="text-xs text-muted-foreground ml-auto">Requires verified phone</span>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Quick messaging via WhatsApp
              </p>
              {selectedMethod === 'whatsapp' && (
                <Input
                  type="tel"
                  placeholder="WhatsApp phone number"
                  value={profile.default_whatsapp_phone || profile.phone || ''}
                  onChange={(e) => handleWhatsAppPhoneChange(e.target.value)}
                  className="mt-2"
                />
              )}
            </label>
          </div>

          {/* Website */}
          <div className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors">
            <RadioGroupItem value="website" id="website" className="mt-1" />
            <label htmlFor="website" className="flex-1 cursor-pointer">
              <div className="flex items-center gap-2 mb-1">
                <Globe className="w-4 h-4 text-blue-600" />
                <span className="font-medium">Website</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Direct buyers to your website or online store
              </p>
              {selectedMethod === 'website' && (
                <Input
                  type="url"
                  placeholder="https://yourwebsite.com"
                  value={profile.default_website_url || ''}
                  onChange={(e) => handleWebsiteUrlChange(e.target.value)}
                  className="mt-2"
                />
              )}
            </label>
          </div>

          {/* Social Media */}
          <div className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors">
            <RadioGroupItem value="social_media" id="social_media" className="mt-1" />
            <label htmlFor="social_media" className="flex-1 cursor-pointer">
              <div className="flex items-center gap-2 mb-1">
                <Share2 className="w-4 h-4 text-purple-600" />
                <span className="font-medium">Social Media</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Link to Instagram, Facebook, or other social profiles
              </p>
              {selectedMethod === 'social_media' && (
                <Input
                  type="url"
                  placeholder="https://instagram.com/yourusername"
                  value={profile.default_social_url || ''}
                  onChange={(e) => handleSocialUrlChange(e.target.value)}
                  className="mt-2"
                />
              )}
            </label>
          </div>
        </RadioGroup>

        {!isPhoneVerified && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Verify your phone number in Account & Verification to enable WhatsApp option.
            </AlertDescription>
          </Alert>
        )}

        <div className="pt-4 border-t border-border">
          <h3 className="text-sm font-medium mb-2">How it works</h3>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>• Your selected method will be pre-selected when publishing</li>
            <li>• You can always change it for individual listings</li>
            <li>• Buyers will see your preferred contact method on listings</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
