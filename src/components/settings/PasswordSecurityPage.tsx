/**
 * Password & Security Page
 * Change password and manage sessions
 */

import { useState } from 'react';
import { ArrowLeft, Key } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { SecurityProvider, useSecurity } from './contexts/SecurityContext';
import { SessionCard } from './shared/SessionCard';
import { SettingsSection } from './shared/SettingsSection';
import { toast } from 'sonner';

interface PasswordSecurityPageProps {
  onBack: () => void;
}

function PasswordSecurityPageContent({ onBack }: PasswordSecurityPageProps) {
  const { sessions, logOutSession, changePassword, isLoading } = useSecurity();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('Please fill all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    setIsChangingPassword(true);
    try {
      await changePassword(currentPassword, newPassword);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      toast.error('Failed to change password');
    } finally {
      setIsChangingPassword(false);
    }
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
          
          <h1 className="font-semibold">Password & Security</h1>
          
          <div className="w-9" />
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-auto pb-6">
        {/* Description */}
        <div className="px-4 pt-4 pb-3 border-b border-border">
          <p className="text-sm text-muted-foreground">
            Manage your password and active sessions
          </p>
        </div>

        <div className="px-4 py-4 space-y-6">
          {/* Change Password Section */}
          <SettingsSection title="Change Password">
            <div className="p-4 bg-white border border-gray-200 rounded-xl space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input
                  id="current-password"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                />
                <p className="text-xs text-muted-foreground">
                  Must be at least 8 characters
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                />
              </div>

              <Button
                onClick={handleChangePassword}
                disabled={isChangingPassword || !currentPassword || !newPassword || !confirmPassword}
                className="w-full"
              >
                {isChangingPassword ? 'Changing...' : 'Change Password'}
              </Button>
            </div>
          </SettingsSection>

          {/* Active Sessions Section */}
          <SettingsSection 
            title="Active Sessions"
            description="Devices currently signed in to your account"
          >
            {isLoading ? (
              <div className="text-center text-muted-foreground py-8">
                <div className="w-6 h-6 border-2 border-primary/20 border-t-primary rounded-full animate-spin mx-auto" />
              </div>
            ) : (
              <div className="space-y-3">
                {sessions.map(session => (
                  <SessionCard
                    key={session.id}
                    session={session}
                    onLogout={() => logOutSession(session.id)}
                  />
                ))}
              </div>
            )}
          </SettingsSection>
        </div>
      </main>
    </div>
  );
}

export default function PasswordSecurityPage(props: PasswordSecurityPageProps) {
  return (
    <SecurityProvider>
      <PasswordSecurityPageContent {...props} />
    </SecurityProvider>
  );
}