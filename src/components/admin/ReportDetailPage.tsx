/**
 * Report Detail Page - VD-1 Phase
 * Minimal stub destination for "View Details" CTAs from:
 * - Notifications → Report Status cards
 * - Action Center → Admin → Platform Reports
 * 
 * Settings-style layout with neutral coming soon content
 */

import { ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';

interface ReportDetailPageProps {
  reportId: string | null;
  onBack: () => void;
}

export function ReportDetailPage({ reportId, onBack }: ReportDetailPageProps) {
  return (
    <div className="h-screen bg-background flex flex-col max-w-[480px] mx-auto">
      {/* Header */}
      <header className="h-14 px-4 flex items-center gap-3 border-b bg-background shrink-0">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="h-9 w-9"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold">Report Details</h1>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-auto p-4">
        <div className="space-y-4">
          {/* Report ID */}
          <div className="rounded-lg border bg-card p-4">
            <p className="text-sm text-muted-foreground mb-1">Report ID</p>
            <p className="font-medium">{reportId || 'Unknown'}</p>
          </div>

          {/* Coming Soon Content */}
          <div className="rounded-lg border bg-card p-6 space-y-3">
            <h2 className="font-medium text-base">Coming Soon</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• View full report details and context</li>
              <li>• Review reported content and evidence</li>
              <li>• Access moderation history</li>
              <li>• Track resolution status</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ReportDetailPage;