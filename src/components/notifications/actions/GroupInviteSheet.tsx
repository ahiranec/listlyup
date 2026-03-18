/**
 * Group Invite Action Sheet
 * Modal for accepting/rejecting group invitations with group preview
 */

import { Users, Lock, Globe, TrendingUp } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '../../ui/sheet';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';

interface GroupInviteSheetProps {
  isOpen: boolean;
  onClose: () => void;
  groupName: string;
  memberCount: number;
  isPrivate: boolean;
  description?: string;
  recentActivity?: string;
  onAccept: () => void;
  onReject: () => void;
}

export function GroupInviteSheet({
  isOpen,
  onClose,
  groupName,
  memberCount,
  isPrivate,
  description,
  recentActivity = '12 posts this week',
  onAccept,
  onReject,
}: GroupInviteSheetProps) {
  const handleAccept = () => {
    onAccept();
    onClose();
  };

  const handleReject = () => {
    onReject();
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="rounded-t-xl">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-lg">Group Invitation</SheetTitle>
          <SheetDescription>
            You've been invited to join this group
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-4 mb-6">
          {/* Group Info */}
          <div className="p-4 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 rounded-lg border border-purple-200/50">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white">
                <Users className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium mb-1">{groupName}</h3>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs h-5">
                    {isPrivate ? (
                      <>
                        <Lock className="w-3 h-3 mr-1" />
                        Private
                      </>
                    ) : (
                      <>
                        <Globe className="w-3 h-3 mr-1" />
                        Public
                      </>
                    )}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {memberCount} members
                  </span>
                </div>
              </div>
            </div>

            {description && (
              <p className="text-xs text-muted-foreground mb-3">
                {description}
              </p>
            )}

            {/* Activity Stats */}
            <div className="flex items-center gap-2 pt-3 border-t border-purple-200/30">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              <span className="text-xs text-muted-foreground">{recentActivity}</span>
            </div>
          </div>

          {/* Group Benefits */}
          <div className="space-y-2">
            <p className="text-xs font-medium">What you'll get:</p>
            <div className="space-y-1.5">
              <div className="flex items-start gap-2 text-xs">
                <span className="text-green-600">✓</span>
                <span className="text-muted-foreground">Access to exclusive group listings</span>
              </div>
              <div className="flex items-start gap-2 text-xs">
                <span className="text-green-600">✓</span>
                <span className="text-muted-foreground">Connect with {memberCount} members</span>
              </div>
              <div className="flex items-start gap-2 text-xs">
                <span className="text-green-600">✓</span>
                <span className="text-muted-foreground">Priority access to new trades</span>
              </div>
            </div>
          </div>

          {/* Privacy Note */}
          {isPrivate && (
            <div className="p-3 bg-muted/30 rounded-lg border border-dashed">
              <p className="text-xs text-muted-foreground">
                🔒 This is a private group. Only members can see posts and activity.
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="flex-1" 
            onClick={handleReject}
          >
            Decline
          </Button>
          <Button 
            className="flex-1" 
            onClick={handleAccept}
          >
            Join Group
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
