import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface Plan {
  id: string;
  name: string;
  active: boolean;
  userCount: number;
}

interface PlanPanelProps {
  plan: Plan;
  onClose: () => void;
}

export function PlanPanel({ plan, onClose }: PlanPanelProps) {
  const handleViewUsers = () => {
    toast.info(`User list by plan coming soon. Navigate to Users module and filter by "${plan.name}" plan.`);
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
            <h2 className="text-xl font-semibold text-gray-900">Plan: {plan.name}</h2>
            <p className="text-sm text-gray-500">{plan.userCount} users</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="capabilities" className="p-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="capabilities">Capabilities</TabsTrigger>
            <TabsTrigger value="limits">Limits</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          {/* Capabilities Tab */}
          <TabsContent value="capabilities" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium text-gray-900 mb-4">Feature Flags</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="ai-tagging" className="text-sm font-normal">
                      AI Content Tagging
                    </Label>
                    <Checkbox id="ai-tagging" checked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="groups" className="text-sm font-normal">
                      Groups
                    </Label>
                    <Checkbox id="groups" checked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="messaging" className="text-sm font-normal">
                      Direct Messaging
                    </Label>
                    <Checkbox id="messaging" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="analytics" className="text-sm font-normal">
                      Advanced Analytics
                    </Label>
                    <Checkbox id="analytics" checked />
                  </div>
                </div>

                <div className="mt-6 p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-blue-800">
                    <strong>ⓘ Info:</strong> Changes here update feature flag plan assignments
                    globally
                  </p>
                </div>

                <Button className="w-full mt-4">Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Limits Tab */}
          <TabsContent value="limits" className="space-y-4">
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <Label htmlFor="listings">Listings (Hard Limit)</Label>
                  <Input id="listings" type="number" defaultValue="50" className="mt-2" />
                  <p className="text-xs text-gray-500 mt-1">
                    User cannot exceed this limit
                  </p>
                </div>

                <div>
                  <Label htmlFor="storage">Storage GB (Soft Limit)</Label>
                  <Input id="storage" type="number" defaultValue="1" className="mt-2" />
                  <p className="text-xs text-gray-500 mt-1">
                    User gets warning but can exceed
                  </p>
                </div>

                <div>
                  <Label htmlFor="groups">Groups (Hard Limit)</Label>
                  <Input id="groups" type="number" defaultValue="3" className="mt-2" />
                  <p className="text-xs text-gray-500 mt-1">
                    User cannot exceed this limit
                  </p>
                </div>

                <Button className="w-full mt-4">Save Limits</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-medium text-gray-900">Total Users</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{plan.userCount}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleViewUsers}>
                    View All Users
                  </Button>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    Click "View All Users" to see users filtered by this plan
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}