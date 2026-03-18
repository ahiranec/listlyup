import React, { useState } from 'react';
import { X, Search, AlertTriangle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ConfirmationDialog } from '../shared/ConfirmationDialog';
import { toast } from 'sonner';
import { type FeatureFlag } from '@/data/featureMappingService';

interface FeatureFlagPanelProps {
  feature: FeatureFlag;
  onClose: () => void;
  onDelete?: (featureId: string) => void;
}

export function FeatureFlagPanel({ feature, onClose, onDelete }: FeatureFlagPanelProps) {
  const [globalEnabled, setGlobalEnabled] = useState(feature.globalEnabled);
  const [rollout, setRollout] = useState([feature.rolloutPercentage]);
  const [searchQuery, setSearchQuery] = useState('');
  const [planOverrides, setPlanOverrides] = useState(feature.planOverrides);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  // Editable fields for Overview tab
  const [featureName, setFeatureName] = useState(feature.name);
  const [description, setDescription] = useState(feature.description);
  const [category, setCategory] = useState<'content' | 'social' | 'commerce'>(feature.category as any);
  const [selectedDependencies, setSelectedDependencies] = useState<string[]>(feature.dependencies || []);

  // Available services from Infrastructure (mock - in real app, fetch from API)
  const availableServices = [
    'AI Provider',
    'Email Service',
    'Payment Gateway',
    'SMS Service',
    'Moderation Engine',
  ];

  const handleGlobalToggle = (checked: boolean) => {
    setGlobalEnabled(checked);
    toast.success(`Feature "${feature.name}" ${checked ? 'enabled' : 'disabled'} globally`);
    console.log('[AUDIT LOG] Feature flag global toggle:', {
      featureId: feature.id,
      enabled: checked,
    });
    // In real app: API call + audit log entry (flag_update)
  };

  const handleRolloutChange = (value: number[]) => {
    setRollout(value);
    toast.success(`Rollout updated to ${value[0]}%`);
    console.log('[AUDIT LOG] Feature flag rollout updated:', {
      featureId: feature.id,
      rollout: value[0],
    });
    // In real app: API call + audit log entry
  };

  const handlePlanOverrideToggle = (plan: 'free' | 'plus' | 'pro' | 'enterprise' | 'internal', checked: boolean) => {
    setPlanOverrides(prev => ({
      ...prev,
      [plan]: checked,
    }));
    toast.success(`${plan.charAt(0).toUpperCase() + plan.slice(1)} plan ${checked ? 'enabled' : 'disabled'}`);
    console.log('[AUDIT LOG] Plan override updated:', {
      featureId: feature.id,
      plan,
      enabled: checked,
    });
    // In real app: API call + audit log entry
  };

  const handleAddUserOverride = () => {
    toast.success('User override added');
    // In real app: API call to add user override
  };

  const handleRemoveUserOverride = (userId: string) => {
    toast.success('User override removed');
    console.log('[AUDIT LOG] User override removed:', {
      featureId: feature.id,
      userId,
    });
    // In real app: API call to remove override
  };

  const handleDeleteFeature = () => {
    if (onDelete) {
      onDelete(feature.id);
    }
    toast.success(`Feature "${feature.name}" deleted`);
    console.log('[AUDIT LOG] Feature deleted:', {
      featureId: feature.id,
    });
    // In real app: API call + audit log entry
    onClose();
  };

  const handleToggleDependency = (serviceName: string) => {
    setSelectedDependencies((prev) => {
      if (prev.includes(serviceName)) {
        const updated = prev.filter((dep) => dep !== serviceName);
        toast.success(`Dependency "${serviceName}" removed`);
        console.log('[AUDIT LOG] Dependency removed:', {
          featureId: feature.id,
          dependency: serviceName,
        });
        return updated;
      } else {
        const updated = [...prev, serviceName];
        toast.success(`Dependency "${serviceName}" added`);
        console.log('[AUDIT LOG] Dependency added:', {
          featureId: feature.id,
          dependency: serviceName,
        });
        return updated;
      }
    });
    // In real app: API call to update dependencies
  };

  const handleSaveOverview = () => {
    toast.success('Feature overview updated');
    console.log('[AUDIT LOG] Feature overview updated:', {
      featureId: feature.id,
      name: featureName,
      description,
      category,
      dependencies: selectedDependencies,
    });
    // In real app: API call to update feature
  };

  const hasDependencies = selectedDependencies.length > 0;
  const dependenciesActive = true; // Mock - in real app, check actual status

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
            <h2 className="text-xl font-semibold text-gray-900">{feature.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary">{feature.category}</Badge>
              {globalEnabled ? (
                <Badge className="bg-green-100 text-green-800">Enabled</Badge>
              ) : (
                <Badge className="bg-gray-100 text-gray-800">Disabled</Badge>
              )}
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Dependency Warning */}
        {hasDependencies && !dependenciesActive && (
          <div className="bg-yellow-50 border-b border-yellow-200 px-6 py-3">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-900">
                  Missing Dependencies
                </p>
                <p className="text-xs text-yellow-700 mt-1">
                  This feature requires: {feature.dependencies?.join(', ')}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <Tabs defaultValue="overview" className="p-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="rollout">Rollout</TabsTrigger>
            <TabsTrigger value="overrides">Overrides</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardContent className="pt-6 space-y-6">
                {/* Feature Name */}
                <div>
                  <Label htmlFor="feature-name" className="text-sm font-medium text-gray-900">
                    Feature Name *
                  </Label>
                  <Input
                    id="feature-name"
                    value={featureName}
                    onChange={(e) => setFeatureName(e.target.value)}
                    placeholder="e.g., AI Content Tagging"
                    className="mt-1"
                  />
                </div>

                {/* Description */}
                <div>
                  <Label htmlFor="description" className="text-sm font-medium text-gray-900">
                    Description *
                  </Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe what this feature does..."
                    rows={3}
                    className="mt-1"
                  />
                </div>

                {/* Category */}
                <div>
                  <Label htmlFor="category" className="text-sm font-medium text-gray-900">
                    Category *
                  </Label>
                  <Select value={category} onValueChange={(value: any) => setCategory(value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="content">Content</SelectItem>
                      <SelectItem value="social">Social</SelectItem>
                      <SelectItem value="commerce">Commerce</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Dependencies */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <Label className="text-sm font-medium text-gray-900">
                      Infrastructure Dependencies
                    </Label>
                    <span className="text-xs text-gray-500">
                      {selectedDependencies.length} selected
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">
                    Select which infrastructure services this feature requires to function
                  </p>

                  <div className="space-y-2 p-3 bg-gray-50 rounded-lg max-h-64 overflow-y-auto">
                    {availableServices.map((service) => {
                      const isSelected = selectedDependencies.includes(service);
                      return (
                        <div
                          key={service}
                          className="flex items-center justify-between p-2 bg-white rounded border border-gray-200 hover:border-gray-300 transition-colors"
                        >
                          <Label htmlFor={`dep-${service}`} className="cursor-pointer flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-gray-900">
                                {service}
                              </span>
                              {isSelected && (
                                <Badge variant="outline" className="text-xs">
                                  Required
                                </Badge>
                              )}
                            </div>
                          </Label>
                          <Checkbox
                            id={`dep-${service}`}
                            checked={isSelected}
                            onCheckedChange={() => handleToggleDependency(service)}
                          />
                        </div>
                      );
                    })}
                  </div>

                  {selectedDependencies.length > 0 && (
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                      <p className="text-xs text-blue-800">
                        <strong>ⓘ Selected Dependencies:</strong> {selectedDependencies.join(', ')}
                      </p>
                    </div>
                  )}
                </div>

                {/* Save Button */}
                <div className="pt-4 border-t border-gray-200">
                  <Button onClick={handleSaveOverview} className="w-full">
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rollout Tab */}
          <TabsContent value="rollout" className="space-y-4">
            <Card>
              <CardContent className="pt-6 space-y-6">
                {/* Global Toggle */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium text-gray-900">
                      Global Status
                    </Label>
                    <p className="text-xs text-gray-500 mt-1">
                      Enable or disable feature platform-wide
                    </p>
                  </div>
                  <Switch checked={globalEnabled} onCheckedChange={handleGlobalToggle} />
                </div>

                {/* Rollout Percentage */}
                <div className="pt-4 border-t border-gray-200">
                  <Label className="text-sm font-medium text-gray-900">
                    Rollout Percentage: {rollout[0]}%
                  </Label>
                  <p className="text-xs text-gray-500 mt-1 mb-4">
                    Gradually enable feature for percentage of eligible users
                  </p>
                  <Slider
                    value={rollout}
                    onValueChange={handleRolloutChange}
                    max={100}
                    step={5}
                    className="mt-2"
                  />
                  <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-blue-800">
                    <strong>ⓘ Info:</strong> Rollout percentage applies after plan and user
                    overrides are evaluated
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Overrides Tab */}
          <TabsContent value="overrides" className="space-y-4">
            <Card>
              <CardContent className="pt-6 space-y-6">
                {/* Plan Overrides */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Plan Overrides</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="free-plan">Free Plan</Label>
                      <Checkbox
                        id="free-plan"
                        checked={planOverrides.free}
                        onCheckedChange={(checked) => handlePlanOverrideToggle('free', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="plus-plan">Plus Plan</Label>
                      <Checkbox
                        id="plus-plan"
                        checked={planOverrides.plus}
                        onCheckedChange={(checked) => handlePlanOverrideToggle('plus', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="pro-plan">Pro Plan</Label>
                      <Checkbox
                        id="pro-plan"
                        checked={planOverrides.pro}
                        onCheckedChange={(checked) => handlePlanOverrideToggle('pro', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="enterprise-plan">Enterprise Plan</Label>
                      <Checkbox
                        id="enterprise-plan"
                        checked={planOverrides.enterprise}
                        onCheckedChange={(checked) => handlePlanOverrideToggle('enterprise', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="internal-plan">Internal Plan</Label>
                      <Checkbox
                        id="internal-plan"
                        checked={planOverrides.internal}
                        onCheckedChange={(checked) => handlePlanOverrideToggle('internal', checked)}
                      />
                    </div>
                  </div>
                </div>

                {/* User Overrides */}
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">User Overrides</h3>
                  
                  {/* Search User */}
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search user by name or email..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  {/* Override List */}
                  {feature.userOverrides.length > 0 ? (
                    <div className="space-y-2">
                      {feature.userOverrides.map((override) => (
                        <div
                          key={override.userId}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {override.userName}
                            </p>
                            <p className="text-xs text-gray-500">{override.email}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge
                              className={
                                override.enabled
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }
                            >
                              {override.enabled ? 'Enabled' : 'Disabled'}
                            </Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveUserOverride(override.userId)}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500 text-sm">
                      No user overrides configured
                    </div>
                  )}

                  <Button
                    variant="outline"
                    className="w-full mt-4"
                    onClick={handleAddUserOverride}
                  >
                    + Add User Override
                  </Button>
                </div>

                <div className="pt-4 border-t border-gray-200 p-3 bg-yellow-50 rounded-lg">
                  <p className="text-xs text-yellow-800">
                    <strong>⚠️ Note:</strong> User overrides take precedence over plan settings
                    and rollout percentage
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Delete Button */}
        <div className="px-6 py-4 border-t border-gray-200">
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setDeleteDialogOpen(true)}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Feature
          </Button>
        </div>

        {/* Delete Confirmation Dialog */}
        <ConfirmationDialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          title="Delete Feature?"
          description={`Are you sure you want to delete "${feature.name}"? This action cannot be undone.`}
          severity="critical"
          confirmText="DELETE"
          onConfirm={handleDeleteFeature}
        />
      </div>
    </>
  );
}