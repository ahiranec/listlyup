import React, { useState } from 'react';
import { X, AlertTriangle, CheckCircle, XCircle, Trash2, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ConfirmationDialog } from '../shared/ConfirmationDialog';
import { toast } from 'sonner';

interface Report {
  id: string;
  reporter: string;
  target: string;
  targetType: 'listing' | 'user' | 'group';
  reason: string;
  status: 'open' | 'resolved' | 'rejected';
  priority: 'normal' | 'high' | 'critical';
  createdAt: string;
  preview?: string;
}

interface ModerationPanelProps {
  report: Report;
  onClose: () => void;
}

export function ModerationPanel({ report, onClose }: ModerationPanelProps) {
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    type: 'resolve' | 'reject' | 'suspend' | 'soft_delete' | 'restore' | null;
  }>({ open: false, type: null });
  const [notes, setNotes] = useState('');
  const [contentStatus, setContentStatus] = useState<'active' | 'suspended' | 'removed'>('active');

  const handleResolve = () => {
    toast.success('Report resolved successfully');
    // In real app: API call + audit log entry
    console.log('[AUDIT LOG] Report resolved:', { reportId: report.id, notes });
    setConfirmDialog({ open: false, type: null });
    onClose();
  };

  const handleReject = () => {
    toast.success('Report rejected');
    // In real app: API call + audit log entry
    console.log('[AUDIT LOG] Report rejected:', { reportId: report.id, notes });
    setConfirmDialog({ open: false, type: null });
    onClose();
  };

  const handleSuspendTarget = () => {
    toast.success('Target suspended');
    setContentStatus('suspended');
    // In real app: API call + audit log entry
    console.log('[AUDIT LOG] Target suspended:', { 
      reportId: report.id, 
      targetType: report.targetType,
      target: report.target,
      notes 
    });
    setConfirmDialog({ open: false, type: null });
  };

  const handleSoftDelete = () => {
    toast.success(`${report.targetType} soft-deleted successfully`);
    setContentStatus('removed');
    // In real app: API call + audit log entry
    console.log('[AUDIT LOG] Content soft-deleted:', {
      reportId: report.id,
      targetType: report.targetType,
      target: report.target,
      notes
    });
    setConfirmDialog({ open: false, type: null });
  };

  const handleRestore = () => {
    toast.success(`${report.targetType} restored successfully`);
    setContentStatus('active');
    // In real app: API call + audit log entry
    console.log('[AUDIT LOG] Content restored:', {
      reportId: report.id,
      targetType: report.targetType,
      target: report.target,
      notes
    });
    setConfirmDialog({ open: false, type: null });
  };

  const canSoftDelete = report.targetType === 'listing' || report.targetType === 'group';
  const isRemoved = contentStatus === 'removed';

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/20 z-40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="fixed top-0 right-0 bottom-0 w-full max-w-2xl bg-white shadow-xl z-50 overflow-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Report #{report.id}</h2>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary">{report.targetType}</Badge>
              <Badge 
                className={
                  report.priority === 'critical' 
                    ? 'bg-red-100 text-red-800' 
                    : report.priority === 'high'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
                }
                variant="secondary"
              >
                {report.priority}
              </Badge>
              {contentStatus !== 'active' && (
                <Badge 
                  className={
                    contentStatus === 'suspended'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }
                  variant="secondary"
                >
                  {contentStatus === 'suspended' ? 'Suspended' : 'Removed'}
                </Badge>
              )}
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="summary" className="p-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="actions">Actions</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          {/* Summary Tab */}
          <TabsContent value="summary" className="space-y-4">
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Reporter</p>
                    <p className="font-medium text-gray-900">{report.reporter}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Target</p>
                    <p className="font-medium text-gray-900">{report.target}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Reason</p>
                    <p className="font-medium text-gray-900">{report.reason}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Created</p>
                    <p className="font-medium text-gray-900">{report.createdAt}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Content Status</p>
                    <Badge 
                      className={
                        contentStatus === 'active'
                          ? 'bg-green-100 text-green-800'
                          : contentStatus === 'suspended'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }
                      variant="secondary"
                    >
                      {contentStatus === 'active' ? 'Active' : contentStatus === 'suspended' ? 'Suspended' : 'Removed'}
                    </Badge>
                  </div>
                </div>

                {report.preview && (
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-500 mb-2">Details</p>
                    <p className="text-sm text-gray-900">{report.preview}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Actions Tab */}
          <TabsContent value="actions" className="space-y-4">
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-900 mb-2 block">
                    Resolution Notes
                  </label>
                  <Textarea
                    placeholder="Add notes about your decision..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="pt-4 border-t border-gray-200 space-y-3">
                  {/* Report Actions */}
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Report Actions
                    </p>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-green-700 border-green-300 hover:bg-green-50"
                      onClick={() => setConfirmDialog({ open: true, type: 'resolve' })}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Resolve Report
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-gray-700 border-gray-300 hover:bg-gray-50"
                      onClick={() => setConfirmDialog({ open: true, type: 'reject' })}
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject Report
                    </Button>
                  </div>

                  {/* Target Actions */}
                  <div className="pt-4 border-t border-gray-200 space-y-2">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Target Actions
                    </p>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-yellow-700 border-yellow-300 hover:bg-yellow-50"
                      onClick={() => setConfirmDialog({ open: true, type: 'suspend' })}
                    >
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Suspend Target
                    </Button>

                    {/* Soft Delete / Restore - Only for listings and groups */}
                    {canSoftDelete && (
                      <>
                        {!isRemoved ? (
                          <Button
                            variant="outline"
                            className="w-full justify-start text-red-700 border-red-300 hover:bg-red-50"
                            onClick={() => setConfirmDialog({ open: true, type: 'soft_delete' })}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Soft-Delete {report.targetType === 'listing' ? 'Listing' : 'Group'}
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            className="w-full justify-start text-blue-700 border-blue-300 hover:bg-blue-50"
                            onClick={() => setConfirmDialog({ open: true, type: 'restore' })}
                          >
                            <RotateCcw className="w-4 h-4 mr-2" />
                            Restore {report.targetType === 'listing' ? 'Listing' : 'Group'}
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-500">No history available</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Confirmation Dialogs */}
      {confirmDialog.type === 'resolve' && (
        <ConfirmationDialog
          open={confirmDialog.open}
          onClose={() => setConfirmDialog({ open: false, type: null })}
          title="Resolve Report?"
          description="This report will be marked as resolved and removed from the queue."
          confirmText="RESOLVE"
          severity="warning"
          onConfirm={handleResolve}
        />
      )}
      {confirmDialog.type === 'reject' && (
        <ConfirmationDialog
          open={confirmDialog.open}
          onClose={() => setConfirmDialog({ open: false, type: null })}
          title="Reject Report?"
          description="This report will be marked as invalid and archived."
          confirmText="REJECT"
          severity="warning"
          onConfirm={handleReject}
        />
      )}
      {confirmDialog.type === 'suspend' && (
        <ConfirmationDialog
          open={confirmDialog.open}
          onClose={() => setConfirmDialog({ open: false, type: null })}
          title="Suspend Target?"
          description={`This will suspend the ${report.targetType} immediately. Users will not be able to access it.`}
          confirmText="SUSPEND"
          severity="critical"
          onConfirm={handleSuspendTarget}
        />
      )}
      {confirmDialog.type === 'soft_delete' && (
        <ConfirmationDialog
          open={confirmDialog.open}
          onClose={() => setConfirmDialog({ open: false, type: null })}
          title={`Soft-Delete ${report.targetType === 'listing' ? 'Listing' : 'Group'}?`}
          description={`This will remove the ${report.targetType} from public view but keep it in the database. It can be restored later.`}
          confirmText="SOFT-DELETE"
          severity="critical"
          onConfirm={handleSoftDelete}
        />
      )}
      {confirmDialog.type === 'restore' && (
        <ConfirmationDialog
          open={confirmDialog.open}
          onClose={() => setConfirmDialog({ open: false, type: null })}
          title={`Restore ${report.targetType === 'listing' ? 'Listing' : 'Group'}?`}
          description={`This will restore the ${report.targetType} and make it publicly visible again.`}
          confirmText="RESTORE"
          severity="warning"
          onConfirm={handleRestore}
        />
      )}
    </>
  );
}
