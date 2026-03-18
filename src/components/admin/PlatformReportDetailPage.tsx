/**
 * Platform Report Detail Page
 * Phase 3.3: Stub destination for Platform Report review
 * 
 * Consistent with Settings-style stubs
 */

import { ArrowLeft, Shield } from 'lucide-react';
import { Button } from '../ui/button';

interface PlatformReportDetailPageProps {
  reportId: string | null;
  onBack: () => void;
}

export function PlatformReportDetailPage({ reportId, onBack }: PlatformReportDetailPageProps) {
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
            <h1 className="font-semibold">Platform Report</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        <div className="p-4 space-y-4">
          {/* Status Card */}
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-red-500" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium mb-1">Report Details Coming Soon</h3>
                <p className="text-sm text-muted-foreground">
                  Full platform report review interface is under development.
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
                <span>View platform-wide report details and cross-group patterns</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Review reported content across all communities</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Take platform-level moderation actions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Investigate user behavior and history</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Resolve or escalate to senior admin</span>
              </li>
            </ul>
          </div>

          {/* Debug Info */}
          {reportId && (
            <div className="text-xs text-muted-foreground text-center opacity-50">
              Report ID: {reportId}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PlatformReportDetailPage;