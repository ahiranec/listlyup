/**
 * Account & Verification Page
 * Manage account details and verification status
 */

import { useState } from 'react';
import { ArrowLeft, Mail, Phone, Key, AtSign } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { VerificationBadge } from './shared/VerificationBadge';
import { VerificationDialog } from './shared/VerificationDialog';
import { useProfile } from '../../contexts/ProfileContext';
import { validateEmail, validatePhone, validateUsername, sanitizeUsername } from './utils/validation';
import { toast } from 'sonner@2.0.3';

interface AccountVerificationPageProps {
  onBack: () => void;
}

export function AccountVerificationPage({ onBack }: AccountVerificationPageProps) {
  const { profile, updateProfile } = useProfile();
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [showPhoneDialog, setShowPhoneDialog] = useState(false);
  const [localUsername, setLocalUsername] = useState(profile.username);
  const [usernameError, setUsernameError] = useState('');

  const handleUsernameChange = (value: string) => {
    const sanitized = sanitizeUsername(value);
    setLocalUsername(sanitized);
    
    if (!validateUsername(sanitized) && sanitized.length > 0) {
      setUsernameError('Username must be 3-20 characters (letters, numbers, underscore)');
    } else {
      setUsernameError('');
    }
  };

  const handleUsernameBlur = () => {
    if (validateUsername(localUsername)) {
      updateProfile({ username: localUsername });
    }
  };

  const handleEmailVerify = () => {
    if (!validateEmail(profile.email)) {
      toast.error('Please enter a valid email address first');
      return;
    }
    setShowEmailDialog(true);
  };

  const handlePhoneVerify = () => {
    if (!validatePhone(profile.phone || '')) {
      toast.error('Please enter a valid phone number first');
      return;
    }
    setShowPhoneDialog(true);
  };

  const handleEmailVerified = () => {
    updateProfile({ emailVerified: true });
  };

  const handlePhoneVerified = () => {
    updateProfile({ phoneVerified: true });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-[480px] mx-auto">
      {/* Status bar removed - PWA/WebView mobile */}

      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center h-14 px-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="h-9 w-9 p-0">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-semibold ml-3">Account & Verification</h1>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-auto px-4 py-6 space-y-6">
        {/* Email */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email
            </Label>
            <VerificationBadge verified={profile.emailVerified} type="email" />
          </div>
          <Input
            id="email"
            type="email"
            value={profile.email}
            onChange={(e) => updateProfile({ email: e.target.value })}
            placeholder="your@email.com"
          />
          {!profile.emailVerified && profile.email && validateEmail(profile.email) && (
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handleEmailVerify}
              className="w-full"
            >
              Verify Email
            </Button>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Phone Number
            </Label>
            {profile.phone && (
              <VerificationBadge verified={profile.phoneVerified} type="phone" />
            )}
          </div>
          <Input
            id="phone"
            type="tel"
            value={profile.phone || ''}
            onChange={(e) => updateProfile({ phone: e.target.value })}
            placeholder="+56 9 1234 5678"
          />
          <p className="text-xs text-muted-foreground">
            Required for WhatsApp and phone call contact methods
          </p>
          {!profile.phoneVerified && profile.phone && validatePhone(profile.phone) && (
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handlePhoneVerify}
              className="w-full"
            >
              Verify Phone Number
            </Button>
          )}
        </div>

        {/* Login Method */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Key className="w-4 h-4" />
            Login Method
          </Label>
          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <Badge variant="secondary">
              {profile.loginMethod === 'google' && '🔐 Google'}
              {profile.loginMethod === 'apple' && '🍎 Apple'}
              {profile.loginMethod === 'email' && '📧 Email'}
            </Badge>
            <span className="text-sm text-muted-foreground">
              (Read-only)
            </span>
          </div>
        </div>

        {/* Username */}
        <div className="space-y-2">
          <Label htmlFor="username" className="flex items-center gap-2">
            <AtSign className="w-4 h-4" />
            Username
          </Label>
          <Input
            id="username"
            value={localUsername}
            onChange={(e) => handleUsernameChange(e.target.value)}
            onBlur={handleUsernameBlur}
            placeholder="username"
            className={usernameError ? 'border-red-500' : ''}
          />
          {usernameError && (
            <p className="text-xs text-red-600">{usernameError}</p>
          )}
          {!usernameError && localUsername && (
            <p className="text-xs text-green-600">✓ Username available</p>
          )}
          <p className="text-xs text-muted-foreground">
            3-20 characters, letters, numbers, and underscores only
          </p>
        </div>
      </main>

      {/* Verification Dialogs */}
      <VerificationDialog
        open={showEmailDialog}
        onOpenChange={setShowEmailDialog}
        type="email"
        contact={profile.email}
        onVerify={handleEmailVerified}
      />
      <VerificationDialog
        open={showPhoneDialog}
        onOpenChange={setShowPhoneDialog}
        type="phone"
        contact={profile.phone || ''}
        onVerify={handlePhoneVerified}
      />
    </div>
  );
}