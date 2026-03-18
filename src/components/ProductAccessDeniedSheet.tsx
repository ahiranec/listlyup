/**
 * ProductAccessDeniedSheet Component
 * Shows when a user tries to access a product they don't have permission to view
 * 
 * Provides clear explanation and actionable next steps
 */

import { Lock, Users, EyeOff, AlertCircle } from 'lucide-react';
import { Sheet, SheetContent, SheetTitle, SheetDescription } from './ui/sheet';
import { Button } from './ui/button';
import type { AccessDeniedReason } from '../utils/productAccess';
import { motion } from 'motion/react';

interface ProductAccessDeniedSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reason?: AccessDeniedReason;
  groupName?: string;
  productTitle?: string;
  onSignIn?: () => void;
  onSignUp?: () => void;
  onJoinGroup?: () => void;
  onGoBack?: () => void;
}

export function ProductAccessDeniedSheet({
  open,
  onOpenChange,
  reason = 'not-found',
  groupName,
  productTitle,
  onSignIn,
  onSignUp,
  onJoinGroup,
  onGoBack,
}: ProductAccessDeniedSheetProps) {
  
  const handleClose = () => {
    onOpenChange(false);
    // Auto navigate back after closing
    setTimeout(() => {
      onGoBack?.();
    }, 200);
  };

  const renderContent = () => {
    switch (reason) {
      case 'not-authenticated':
        return (
          <>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6"
            >
              <Lock className="w-10 h-10 text-primary" />
            </motion.div>

            <h3 className="text-2xl font-semibold text-center mb-3">
              Sign in to view this product
            </h3>

            <p className="text-center text-muted-foreground mb-6">
              {productTitle ? (
                <>
                  <span className="font-medium text-foreground">"{productTitle}"</span> is only visible to {groupName ? `members of ${groupName}` : 'authenticated users'}.
                </>
              ) : (
                'This product is only visible to authenticated users.'
              )}
            </p>

            <div className="space-y-3">
              <Button 
                onClick={() => {
                  onOpenChange(false);
                  onSignIn?.();
                }}
                className="w-full h-12"
                size="lg"
              >
                Sign In
              </Button>

              <Button 
                onClick={() => {
                  onOpenChange(false);
                  onSignUp?.();
                }}
                variant="outline"
                className="w-full h-12"
                size="lg"
              >
                Create Account
              </Button>

              {groupName && onJoinGroup && (
                <Button 
                  onClick={() => {
                    onOpenChange(false);
                    onJoinGroup();
                  }}
                  variant="ghost"
                  className="w-full"
                >
                  Learn about {groupName}
                </Button>
              )}
            </div>
          </>
        );

      case 'not-member':
        return (
          <>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mx-auto w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mb-6"
            >
              <Users className="w-10 h-10 text-blue-600" />
            </motion.div>

            <h3 className="text-2xl font-semibold text-center mb-3">
              Join {groupName || 'the group'} to view
            </h3>

            <p className="text-center text-muted-foreground mb-6">
              {productTitle ? (
                <>
                  <span className="font-medium text-foreground">"{productTitle}"</span> is only visible to members of {groupName || 'this group'}.
                </>
              ) : (
                `This product is only visible to members of ${groupName || 'this group'}.`
              )}
            </p>

            <div className="space-y-3">
              <Button 
                onClick={() => {
                  onOpenChange(false);
                  onJoinGroup?.();
                }}
                className="w-full h-12"
                size="lg"
              >
                Join {groupName || 'Group'}
              </Button>

              <Button 
                onClick={handleClose}
                variant="outline"
                className="w-full h-12"
                size="lg"
              >
                Go Back
              </Button>
            </div>
          </>
        );

      case 'private':
        return (
          <>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mx-auto w-20 h-20 bg-gray-500/10 rounded-full flex items-center justify-center mb-6"
            >
              <EyeOff className="w-10 h-10 text-gray-600" />
            </motion.div>

            <h3 className="text-2xl font-semibold text-center mb-3">
              This product is private
            </h3>

            <p className="text-center text-muted-foreground mb-6">
              Only the owner can view this product.
            </p>

            <Button 
              onClick={handleClose}
              variant="outline"
              className="w-full h-12"
              size="lg"
            >
              Go Back
            </Button>
          </>
        );

      case 'not-found':
      default:
        return (
          <>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mx-auto w-20 h-20 bg-orange-500/10 rounded-full flex items-center justify-center mb-6"
            >
              <AlertCircle className="w-10 h-10 text-orange-600" />
            </motion.div>

            <h3 className="text-2xl font-semibold text-center mb-3">
              Product not found
            </h3>

            <p className="text-center text-muted-foreground mb-6">
              This product could not be found or has been removed.
            </p>

            <Button 
              onClick={handleClose}
              variant="outline"
              className="w-full h-12"
              size="lg"
            >
              Go Back
            </Button>
          </>
        );
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-3xl p-6 max-w-[480px] mx-auto">
        <SheetTitle className="sr-only">Access Denied</SheetTitle>
        <SheetDescription className="sr-only">
          This content requires specific permissions to access
        </SheetDescription>
        <div className="flex flex-col items-center">
          {renderContent()}
        </div>
      </SheetContent>
    </Sheet>
  );
}