import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ConfirmationDialog } from '../shared/ConfirmationDialog';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  plan: string;
  sessions: number;
  lastActive: string;
}

interface UserPanelProps {
  user: User;
  onClose: () => void;
}

// Mock function to check super admin count - in real app, this would be an API call
const checkSuperAdminCount = (): number => {
  // Mock: returns 1 to simulate "last super admin" scenario for testing
  // In production, this would query the actual count
  return 1;
};

export function UserPanel({ user, onClose }: UserPanelProps) {
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    type: 'role' | 'suspend' | 'ban' | 'logout' | 'role_blocked' | 'reactivate' | 'impersonate' | null;
  }>({ open: false, type: null });
  const [pendingRole, setPendingRole] = useState<string | null>(null);

  const handleRoleChange = (newRole: string) => {
    // Check if user is currently super_admin and trying to change
    if (user.role === 'super_admin' && newRole !== 'super_admin') {
      const superAdminCount = checkSuperAdminCount();
      
      if (superAdminCount <= 1) {
        // Block the change - show error dialog
        setConfirmDialog({ open: true, type: 'role_blocked' });
        return;
      }
    }
    
    // Proceed with normal role change confirmation
    setPendingRole(newRole);
    setConfirmDialog({ open: true, type: 'role' });
  };

  const handleConfirmRoleChange = () => {
    if (pendingRole) {
      toast.success(`User role changed to ${pendingRole}`);
      // In real app: API call + audit log entry
      console.log('[AUDIT LOG] User role changed:', {
        userId: user.id,
        oldRole: user.role,
        newRole: pendingRole,
      });
      setConfirmDialog({ open: false, type: null });
      setPendingRole(null);
    }
  };

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
            <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="summary" className="p-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="roles">Roles</TabsTrigger>
            <TabsTrigger value="plan">Plan</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="sanctions">Sanctions</TabsTrigger>
          </TabsList>

          {/* Summary Tab */}
          <TabsContent value="summary" className="space-y-4">
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">User ID</p>
                    <p className="font-medium text-gray-900">{user.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <Badge
                      className={
                        user.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }
                      variant="secondary"
                    >
                      {user.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Last Active</p>
                    <p className="font-medium text-gray-900">{user.lastActive}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Active Sessions</p>
                    <p className="font-medium text-gray-900">{user.sessions}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* MVP Canonical: Moderation Summary */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium text-gray-900 mb-4">Moderation Summary</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Reports Received</p>
                    <p className="text-2xl font-bold text-gray-900">0</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Warnings Issued</p>
                    <p className="text-2xl font-bold text-yellow-600">0</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Moderation Actions</p>
                    <p className="text-2xl font-bold text-gray-900">0</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Risk Level</p>
                    <Badge
                      className="bg-green-100 text-green-800"
                      variant="secondary"
                    >
                      Low
                    </Badge>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-blue-800">
                    <strong>ⓘ MVP:</strong> Moderation metrics help assess user behavior and risk. High risk users may require additional monitoring.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Roles Tab */}
          <TabsContent value="roles" className="space-y-4">
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Current Role
                  </label>
                  <Select defaultValue={user.role} onValueChange={handleRoleChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="staff">Staff</SelectItem>
                      <SelectItem value="moderator">Moderator</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="super_admin">Super Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h3 className="font-medium text-gray-900 mb-2">Permissions</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• View platform content</li>
                    <li>• Create and manage own listings</li>
                    <li>• Participate in groups</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Plan Tab */}
          <TabsContent value="plan" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Current Plan
                  </label>
                  <Select defaultValue={user.plan.toLowerCase()}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="free">Free</SelectItem>
                      <SelectItem value="pro">Pro</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Active Sessions</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Chrome on Windows
                        </p>
                        <p className="text-xs text-gray-500">IP: 192.168.1.1</p>
                      </div>
                      <Badge variant="secondary">Active now</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Mobile on iOS
                        </p>
                        <p className="text-xs text-gray-500">IP: 10.0.0.5</p>
                      </div>
                      <Badge variant="secondary">5 min ago</Badge>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setConfirmDialog({ open: true, type: 'logout' })}
                  >
                    Force Logout from All Devices
                  </Button>
                  
                  {/* Impersonate User - Super Admin only */}
                  <Button
                    variant="outline"
                    className="w-full text-purple-700 border-purple-300 hover:bg-purple-50"
                    onClick={() => setConfirmDialog({ open: true, type: 'impersonate' })}
                  >
                    Impersonate User (Support)
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sanctions Tab */}
          <TabsContent value="sanctions" className="space-y-4">
            <Card>
              <CardContent className="pt-6 space-y-3">
                {/* Reactivate button - show only if user is suspended or banned */}
                {(user.status === 'suspended' || user.status === 'banned') && (
                  <Button
                    variant="outline"
                    className="w-full justify-start text-green-700 border-green-300 hover:bg-green-50"
                    onClick={() => setConfirmDialog({ open: true, type: 'reactivate' })}
                  >
                    Reactivate Account
                  </Button>
                )}
                
                <Button
                  variant="outline"
                  className="w-full justify-start text-yellow-700 border-yellow-300 hover:bg-yellow-50"
                  onClick={() => setConfirmDialog({ open: true, type: 'suspend' })}
                >
                  Suspend Account
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-red-700 border-red-300 hover:bg-red-50"
                  onClick={() => setConfirmDialog({ open: true, type: 'ban' })}
                >
                  Ban Account Permanently
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Confirmation Dialogs */}
      {confirmDialog.type === 'role' && (
        <ConfirmationDialog
          open={confirmDialog.open}
          onClose={() => setConfirmDialog({ open: false, type: null })}
          title="Grant Super Admin Access?"
          description="This user will have FULL SYSTEM ACCESS including ability to delete content, change settings, and access all user data."
          confirmText="CONFIRM"
          severity="critical"
          onConfirm={handleConfirmRoleChange}
        />
      )}
      {confirmDialog.type === 'role_blocked' && (
        <ConfirmationDialog
          open={confirmDialog.open}
          onClose={() => setConfirmDialog({ open: false, type: null })}
          title="Cannot Revoke Super Admin Access"
          description="This is the last super admin account. Revoking this role would leave the system without a super admin."
          confirmText="OK"
          severity="warning"
        />
      )}
      {confirmDialog.type === 'reactivate' && (
        <ConfirmationDialog
          open={confirmDialog.open}
          onClose={() => setConfirmDialog({ open: false, type: null })}
          title="Reactivate Account?"
          description="This will restore the user's account to active status and grant full access to the platform."
          confirmText="REACTIVATE"
          severity="warning"
          onConfirm={() => {
            toast.success('User account reactivated');
            console.log('[AUDIT LOG] User reactivated:', { userId: user.id });
            setConfirmDialog({ open: false, type: null });
          }}
        />
      )}
      {confirmDialog.type === 'impersonate' && (
        <ConfirmationDialog
          open={confirmDialog.open}
          onClose={() => setConfirmDialog({ open: false, type: null })}
          title="Impersonate User?"
          description={`⚠️ You are entering a SUPPORT SESSION as "${user.name}". A persistent badge will show at all times. All actions will be logged. This is for bug reproduction and support ONLY.`}
          confirmText="START IMPERSONATION"
          severity="critical"
          onConfirm={() => {
            toast.success(`Now impersonating ${user.name}. Badge visible in header.`);
            console.log('[AUDIT LOG] User impersonation started:', { 
              adminId: 'current_admin_id',
              targetUserId: user.id,
              targetUserName: user.name,
              timestamp: new Date().toISOString()
            });
            setConfirmDialog({ open: false, type: null });
            // In real app: Set global state for impersonation banner
          }}
        />
      )}
      {confirmDialog.type === 'suspend' && (
        <ConfirmationDialog
          open={confirmDialog.open}
          onClose={() => setConfirmDialog({ open: false, type: null })}
          title="Suspend Account?"
          description={`Suspending "${user.name}" will immediately revoke access to the platform. They will not be able to log in or use any features until reactivated.`}
          confirmText="SUSPEND"
          severity="critical"
          onConfirm={() => {
            toast.success(`User "${user.name}" suspended successfully`);
            console.log('[AUDIT LOG] User suspended:', {
              userId: user.id,
              userName: user.name,
              email: user.email,
              previousStatus: user.status,
              newStatus: 'suspended',
              timestamp: new Date().toISOString()
            });
            setConfirmDialog({ open: false, type: null });
            // In real app: API call to update user.status = 'suspended'
          }}
        />
      )}
      {confirmDialog.type === 'ban' && (
        <ConfirmationDialog
          open={confirmDialog.open}
          onClose={() => setConfirmDialog({ open: false, type: null })}
          title="Ban Account Permanently?"
          description={`⚠️ PERMANENT ACTION: Banning "${user.name}" will permanently revoke all access. This action is logged and should only be used for severe violations of terms of service.`}
          confirmText="BAN PERMANENTLY"
          severity="critical"
          onConfirm={() => {
            toast.success(`User "${user.name}" banned permanently`);
            console.log('[AUDIT LOG] User banned permanently:', {
              userId: user.id,
              userName: user.name,
              email: user.email,
              previousStatus: user.status,
              newStatus: 'banned',
              timestamp: new Date().toISOString(),
              adminNote: 'Permanent ban - severe ToS violation'
            });
            setConfirmDialog({ open: false, type: null });
            // In real app: API call to update user.status = 'banned' + revoke all sessions
          }}
        />
      )}
      {confirmDialog.type === 'logout' && (
        <ConfirmationDialog
          open={confirmDialog.open}
          onClose={() => setConfirmDialog({ open: false, type: null })}
          title="Force Logout from All Devices?"
          description={`This will immediately revoke all active sessions for "${user.name}". They will need to log in again on all devices.`}
          confirmText="FORCE LOGOUT"
          severity="warning"
          onConfirm={() => {
            toast.success(`All sessions revoked for ${user.name}`);
            console.log('[AUDIT LOG] Force logout all sessions:', {
              userId: user.id,
              userName: user.name,
              sessionsRevoked: user.sessions,
              timestamp: new Date().toISOString()
            });
            setConfirmDialog({ open: false, type: null });
            // In real app: API call to DELETE all sessions for user_id
          }}
        />
      )}
    </>
  );
}