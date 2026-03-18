/**
 * User Issue Detail Page
 * Phase 3.3: Stub destination for User Issue review
 * 
 * Consistent with Settings-style stubs
 * Handles all issue types: verification, appeal, account-access, dispute
 */

import { ArrowLeft, UserCheck } from 'lucide-react';
import { Button } from '../ui/button';

interface UserIssueDetailPageProps {
  issueId: string | null;
  onBack: () => void;
}

export function UserIssueDetailPage({ issueId, onBack }: UserIssueDetailPageProps) {
  return (
    <div className="h-screen bg-background flex flex-col max-w-[480px] lg:max-w-[640px] mx-auto relative overflow-x-hidden w-full">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="flex items-center gap-3 p-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={onBack}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <h1 className="font-semibold">User Issue</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        <div className="p-4 space-y-4">
          {/* Status Card */}
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                <UserCheck className="w-5 h-5 text-blue-500" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium mb-1">Issue Details Coming Soon</h3>
                <p className="text-sm text-muted-foreground">
                  Full user issue review interface is under development.
                </p>
              </div>
            </div>
          </div>

          {/* What you'll be able to do */}
          <div className="rounded-lg border border-border bg-card p-4">
            <h4 className="font-medium mb-3 text-sm">What you'll be able to do</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>View complete issue details and user submission</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Review verification documents and appeals</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Approve or reject verification requests</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Restore accounts or dismiss appeals</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Communicate directly with users about their issues</span>
              </li>
            </ul>
          </div>

          {/* Debug Info */}
          {issueId && (
            <div className="text-xs text-muted-foreground text-center opacity-50">
              Issue ID: {issueId}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserIssueDetailPage;