import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { SecurityProvider, useSecurity } from './contexts/SecurityContext';
import { DangerZone } from './shared/DangerZone';
import { toast } from 'sonner';

interface DeleteAccountPageProps {
  onBack: () => void;
}

function DeleteAccountPageContent({ onBack }: DeleteAccountPageProps) {
  const { deleteAccount } = useSecurity();
  const [email, setEmail] = useState('');
  const [confirmationsChecked, setConfirmationsChecked] = useState({
    understand: false,
    permanent: false,
    noRecover: false,
  });
  const [isDeleting, setIsDeleting] = useState(false);

  const allConfirmed = Object.values(confirmationsChecked).every(v => v === true);
  const canDelete = allConfirmed && email.length > 0;

  const handleDelete = async () => {
    if (!canDelete) return;

    setIsDeleting(true);
    try {
      await deleteAccount(email);
      toast.success('Account deletion request submitted');
      onBack();
    } catch (error) {
      toast.error('Failed to submit deletion request');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-[480px] mx-auto">
      {/* Status bar removed - PWA/WebView mobile */}
      
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center justify-between h-14 px-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="h-9 w-9 p-0">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-semibold">Delete Account</h1>
          <div className="w-9" />
        </div>
      </header>
      
      <main className="flex-1 overflow-auto pb-6">
        <div className="px-4 pt-4 pb-3 border-b border-border">
          <p className="text-sm text-muted-foreground">
            Permanently delete your account and all associated data
          </p>
        </div>

        <div className="px-4 py-4 space-y-6">
          <DangerZone
            title="Delete Your Account"
            description="This action cannot be undone. All your data will be permanently removed."
          >
            <div className="space-y-4">
              {/* What gets deleted */}
              <div className="p-3 bg-white border border-red-200 rounded-lg">
                <p className="text-xs font-semibold text-red-900 mb-2">
                  What will be deleted:
                </p>
                <ul className="text-xs text-red-700 space-y-1 pl-4">
                  <li>• All your listings and photos</li>
                  <li>• Message history and conversations</li>
                  <li>• Saved searches and preferences</li>
                  <li>• Profile data and statistics</li>
                  <li>• Group memberships</li>
                </ul>
              </div>

              {/* Confirmations */}
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Checkbox
                    id="understand"
                    checked={confirmationsChecked.understand}
                    onCheckedChange={(checked) =>
                      setConfirmationsChecked(prev => ({ ...prev, understand: checked as boolean }))
                    }
                  />
                  <Label
                    htmlFor="understand"
                    className="text-xs text-red-900 cursor-pointer leading-relaxed"
                  >
                    I understand that all my data will be permanently deleted
                  </Label>
                </div>

                <div className="flex items-start gap-2">
                  <Checkbox
                    id="permanent"
                    checked={confirmationsChecked.permanent}
                    onCheckedChange={(checked) =>
                      setConfirmationsChecked(prev => ({ ...prev, permanent: checked as boolean }))
                    }
                  />
                  <Label
                    htmlFor="permanent"
                    className="text-xs text-red-900 cursor-pointer leading-relaxed"
                  >
                    I understand this action is permanent and cannot be reversed
                  </Label>
                </div>

                <div className="flex items-start gap-2">
                  <Checkbox
                    id="no-recover"
                    checked={confirmationsChecked.noRecover}
                    onCheckedChange={(checked) =>
                      setConfirmationsChecked(prev => ({ ...prev, noRecover: checked as boolean }))
                    }
                  />
                  <Label
                    htmlFor="no-recover"
                    className="text-xs text-red-900 cursor-pointer leading-relaxed"
                  >
                    I understand I will not be able to recover my account or data
                  </Label>
                </div>
              </div>

              {/* Email Confirmation */}
              <div className="space-y-2">
                <Label htmlFor="email-confirm" className="text-sm text-red-900">
                  Enter your email to confirm
                </Label>
                <Input
                  id="email-confirm"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="border-red-300 focus:border-red-500 focus:ring-red-500"
                />
              </div>

              {/* Delete Button */}
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={!canDelete || isDeleting}
                className="w-full"
              >
                {isDeleting ? 'Processing...' : 'Delete My Account Permanently'}
              </Button>

              {/* Help Text */}
              <p className="text-xs text-center text-muted-foreground">
                Need help? <a href="/support" className="text-primary underline">Contact Support</a>
              </p>
            </div>
          </DangerZone>
        </div>
      </main>
    </div>
  );
}

export default function DeleteAccountPage(props: DeleteAccountPageProps) {
  return (
    <SecurityProvider>
      <DeleteAccountPageContent {...props} />
    </SecurityProvider>
  );
}