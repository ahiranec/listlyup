/**
 * VerificationDialog Component
 * Dialog for email/phone verification flow
 */

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { toast } from 'sonner@2.0.3';

interface VerificationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: 'email' | 'phone';
  contact: string;
  onVerify: () => void;
}

export function VerificationDialog({
  open,
  onOpenChange,
  type,
  contact,
  onVerify,
}: VerificationDialogProps) {
  const [code, setCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [codeSent, setCodeSent] = useState(false);

  const handleSendCode = async () => {
    setCodeSent(true);
    toast.success(`Verification code sent to ${contact}`);
  };

  const handleVerify = async () => {
    if (code.length !== 6) {
      toast.error('Please enter a 6-digit code');
      return;
    }

    setIsVerifying(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsVerifying(false);
      onVerify();
      onOpenChange(false);
      toast.success(`${type === 'email' ? 'Email' : 'Phone'} verified successfully!`);
      setCode('');
      setCodeSent(false);
    }, 2000);
  };

  const handleClose = () => {
    onOpenChange(false);
    setCode('');
    setCodeSent(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Verify {type === 'email' ? 'Email' : 'Phone Number'}
          </DialogTitle>
          <DialogDescription>
            {!codeSent ? (
              <>We'll send a 6-digit verification code to:</>
            ) : (
              <>Enter the 6-digit code sent to:</>
            )}
            <br />
            <span className="font-medium text-foreground">{contact}</span>
          </DialogDescription>
        </DialogHeader>

        {!codeSent ? (
          <div className="flex flex-col gap-4">
            <Button onClick={handleSendCode}>
              Send Verification Code
            </Button>
            <Button variant="ghost" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <Label htmlFor="code">Verification Code</Label>
              <Input
                id="code"
                placeholder="000000"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                maxLength={6}
                className="text-center text-lg tracking-widest"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Enter the 6-digit code
              </p>
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={handleVerify} 
                disabled={code.length !== 6 || isVerifying}
                className="flex-1"
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  'Verify'
                )}
              </Button>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
            </div>

            <button
              onClick={handleSendCode}
              className="text-xs text-primary hover:underline w-full text-center"
            >
              Resend code
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
