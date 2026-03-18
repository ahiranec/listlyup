import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { PlanPanel } from '../../panels/PlanPanel';
import { FeatureFlagPanel } from '../../panels/FeatureFlagPanel';
import { CreatePlanDialog } from '../../shared/CreatePlanDialog';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface Plan {
  id: string;
  name: string;
  active: boolean;
  userCount: number;
  isStaffOnly?: boolean;
  description?: string;
}

interface FeatureFlag {
  id: string;
  name: string;
  category: 'content' | 'social' | 'commerce';
  description: string;
  globalEnabled: boolean;
  rolloutPercentage: number;
  dependencies?: string[];
  planOverrides: {
    free: boolean;
    pro: boolean;
    enterprise: boolean;
    internal: boolean;
  };
  userOverrides: Array<{
    userId: string;
    userName: string;
    email: string;
    enabled: boolean;
  }>;
}

const mockPlans: Plan[] = [
  { id: '1', name: 'Free', active: true, userCount: 1024, isStaffOnly: false },
  { id: '2', name: 'Pro', active: true, userCount: 185, isStaffOnly: false },
  { id: '3', name: 'Enterprise', active: true, userCount: 25, isStaffOnly: false },
  {
    id: '4',
    name: 'Internal',
    active: true,
    userCount: 8,
    isStaffOnly: true,
    description: 'Staff-only testing plan for beta features',
  },
];

const mockFeatures: FeatureFlag[] = [
  {
    id: 'ai_tagging',
    name: 'AI Content Tagging',
    category: 'content',
    description: 'Automatically tag and categorize content using AI',
    globalEnabled: true,
    rolloutPercentage: 100,
    dependencies: ['AI Provider'],
    planOverrides: { free: false, pro: true, enterprise: true, internal: true },
    userOverrides: [
      {
        userId: '1',
        userName: 'Beta Tester',
        email: 'beta@example.com',
        enabled: true,
      },
    ],
  },
  {
    id: 'auto_moderate',
    name: 'Auto Moderation',
    category: 'content',
    description: 'Automatically flag inappropriate content',
    globalEnabled: false,
    rolloutPercentage: 50,
    dependencies: ['AI Provider', 'Moderation Engine'],
    planOverrides: { free: false, pro: false, enterprise: true, internal: true },
    userOverrides: [],
  },
  {
    id: 'groups',
    name: 'Groups',
    category: 'social',
    description: 'Allow users to create and manage groups',
    globalEnabled: true,
    rolloutPercentage: 100,
    dependencies: [],
    planOverrides: { free: false, pro: true, enterprise: true, internal: true },
    userOverrides: [],
  },
  {
    id: 'messaging',
    name: 'Direct Messaging',
    category: 'social',
    description: 'Enable direct messaging between users',
    globalEnabled: true,
    rolloutPercentage: 100,
    dependencies: [],
    planOverrides: { free: false, pro: false, enterprise: true, internal: true },
    userOverrides: [],
  },
  {
    id: 'advanced_analytics',
    name: 'Advanced Analytics',
    category: 'commerce',
    description: 'Detailed analytics and insights dashboard',
    globalEnabled: true,
    rolloutPercentage: 100,
    dependencies: [],
    planOverrides: { free: false, pro: true, enterprise: true, internal: true },
    userOverrides: [],
  },
  {
    id: 'experimental_ui',
    name: 'New UI Components (Beta)',
    category: 'content',
    description: 'Experimental new user interface components - staff testing only',
    globalEnabled: false,
    rolloutPercentage: 0,
    dependencies: [],
    planOverrides: { free: false, pro: false, enterprise: false, internal: true },
    userOverrides: [],
  },
];

export function PlansFeatures() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [selectedFlag, setSelectedFlag] = useState<FeatureFlag | null>(null);
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set());
  const [createPlanOpen, setCreatePlanOpen] = useState(false);
  const [plans, setPlans] = useState<Plan[]>(mockPlans);
  const [features, setFeatures] = useState<FeatureFlag[]>(mockFeatures);

  const toggleCategory = (category: string) => {
    const newCollapsed = new Set(collapsedCategories);
    if (newCollapsed.has(category)) {
      newCollapsed.delete(category);
    } else {
      newCollapsed.add(category);
    }
    setCollapsedCategories(newCollapsed);
  };

  const togglePlanActive = (planId: string) => {
    setPlans((prev) =>
      prev.map((p) =>
        p.id === planId ? { ...p, active: !p.active } : p
      )
    );
    const plan = plans.find((p) => p.id === planId);
    if (plan) {
      toast.success(`Plan "${plan.name}" ${!plan.active ? 'activated' : 'deactivated'}`);
      console.log('[AUDIT LOG] Plan toggled:', { planId, active: !plan.active });
      // In real app: API call + audit log entry
    }
  };

  // Toggle global enabled for a feature
  const toggleFeatureGlobal = (featureId: string) => {
    setFeatures(prev =>
      prev.map(f =>
        f.id === featureId ? { ...f, globalEnabled: !f.globalEnabled } : f
      )
    );
    const feature = features.find(f => f.id === featureId);
    if (feature) {
      toast.success(`"${feature.name}" ${!feature.globalEnabled ? 'enabled' : 'disabled'} globally`);
      console.log('[AUDIT LOG] Feature global toggle:', {
        featureId,
        enabled: !feature.globalEnabled,
      });
    }
  };

  // Toggle plan override for a feature
  const toggleFeaturePlan = (featureId: string, plan: 'free' | 'pro' | 'enterprise' | 'internal') => {
    setFeatures(prev =>
      prev.map(f =>
        f.id === featureId
          ? {
              ...f,
              planOverrides: {
                ...f.planOverrides,
                [plan]: !f.planOverrides[plan],
              },
            }
          : f
      )
    );
    const feature = features.find(f => f.id === featureId);
    if (feature) {
      const planName = plan.charAt(0).toUpperCase() + plan.slice(1);
      toast.success(`"${feature.name}" ${!feature.planOverrides[plan] ? 'enabled' : 'disabled'} for ${planName}`);
      console.log('[AUDIT LOG] Feature plan override:', {
        featureId,
        plan,
        enabled: !feature.planOverrides[plan],
      });
    }
  };

  // Add new feature
  const addNewFeature = () => {
    const newFeature: FeatureFlag = {
      id: `feature_${Date.now()}`,
      name: 'New Feature',
      category: 'content',
      description: 'Description of new feature',
      globalEnabled: false,
      rolloutPercentage: 0,
      planOverrides: { free: false, pro: false, enterprise: false, internal: false },
      userOverrides: [],
    };
    setFeatures(prev => [...prev, newFeature]);
    toast.success('New feature added');
    console.log('[AUDIT LOG] Feature created:', { featureId: newFeature.id });
    setSelectedFlag(newFeature);
  };

  // Delete feature
  const deleteFeature = (featureId: string) => {
    const feature = features.find(f => f.id === featureId);
    if (feature) {
      setFeatures(prev => prev.filter(f => f.id !== featureId));
      toast.success(`"${feature.name}" deleted`);
      console.log('[AUDIT LOG] Feature deleted:', { featureId });
      if (selectedFlag?.id === featureId) {
        setSelectedFlag(null);
      }
    }
  };

  const categories = {
    content: { label: 'Content', count: features.filter(f => f.category === 'content').length },
    social: { label: 'Social', count: features.filter(f => f.category === 'social').length },
    commerce: { label: 'Commerce', count: features.filter(f => f.category === 'commerce').length },
  };

  return (
    <>
      <div className="grid grid-cols-12 gap-6">
        {/* Plans List - Left Column */}
        <div className="col-span-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Plans</h3>
                <Button size="sm" variant="outline" onClick={() => setCreatePlanOpen(true)}>
                  + New Plan
                </Button>
              </div>

              <div className="space-y-2">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    className={cn(
                      'p-3 rounded-lg border transition-colors',
                      selectedPlan?.id === plan.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    )}
                  >
                    <button
                      onClick={() => setSelectedPlan(plan)}
                      className="w-full text-left"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">{plan.name}</span>
                          {plan.isStaffOnly && (
                            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                              STAFF
                            </Badge>
                          )}
                        </div>
                        <Badge
                          variant="secondary"
                          className={plan.active ? 'bg-green-100 text-green-800' : 'bg-gray-100'}
                        >
                          {plan.active ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500">{plan.userCount} users</p>
                      {plan.description && (
                        <p className="text-xs text-gray-400 mt-1">{plan.description}</p>
                      )}
                    </button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full mt-2 text-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePlanActive(plan.id);
                      }}
                    >
                      {plan.active ? 'Deactivate' : 'Activate'}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Feature Grid - Right Column */}
        <div className="col-span-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Feature Flags</h3>
                <Button size="sm" variant="outline" onClick={addNewFeature}>
                  + New Feature
                </Button>
              </div>

              <div className="space-y-4">
                {Object.entries(categories).map(([categoryId, category]) => {
                  const isCollapsed = collapsedCategories.has(categoryId);
                  const categoryFeatures = features.filter(
                    (f) => f.category === categoryId
                  );

                  return (
                    <div key={categoryId} className="border border-gray-200 rounded-lg">
                      {/* Category Header */}
                      <button
                        onClick={() => toggleCategory(categoryId)}
                        className="w-full flex items-center justify-between p-3 hover:bg-gray-50"
                      >
                        <div className="flex items-center gap-2">
                          {isCollapsed ? (
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                          )}
                          <span className="font-medium text-gray-900">
                            {category.label}
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            {category.count}
                          </Badge>
                        </div>
                      </button>

                      {/* Category Features */}
                      {!isCollapsed && (
                        <div className="border-t border-gray-200">
                          <table className="w-full">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="text-left text-xs font-medium text-gray-500 px-3 py-2">
                                  Feature
                                </th>
                                <th className="text-center text-xs font-medium text-gray-500 px-3 py-2 w-20">
                                  Global
                                </th>
                                <th className="text-center text-xs font-medium text-gray-500 px-3 py-2 w-20">
                                  Free
                                </th>
                                <th className="text-center text-xs font-medium text-gray-500 px-3 py-2 w-20">
                                  Pro
                                </th>
                                <th className="text-center text-xs font-medium text-gray-500 px-3 py-2 w-20">
                                  Ent
                                </th>
                                <th className="text-center text-xs font-medium text-gray-500 px-3 py-2 w-20">
                                  Int
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {categoryFeatures.map((feature) => (
                                <tr 
                                  key={feature.id} 
                                  className="hover:bg-gray-50 cursor-pointer"
                                  onClick={() => setSelectedFlag(feature)}
                                >
                                  <td className="px-3 py-3">
                                    <div className="text-sm font-medium text-gray-900">
                                      {feature.name}
                                    </div>
                                  </td>
                                  <td className="px-3 py-3 text-center" onClick={(e) => e.stopPropagation()}>
                                    <Checkbox 
                                      checked={feature.globalEnabled} 
                                      onCheckedChange={() => toggleFeatureGlobal(feature.id)} 
                                    />
                                  </td>
                                  <td className="px-3 py-3 text-center" onClick={(e) => e.stopPropagation()}>
                                    <Checkbox 
                                      checked={feature.planOverrides.free} 
                                      onCheckedChange={() => toggleFeaturePlan(feature.id, 'free')} 
                                    />
                                  </td>
                                  <td className="px-3 py-3 text-center" onClick={(e) => e.stopPropagation()}>
                                    <Checkbox 
                                      checked={feature.planOverrides.pro} 
                                      onCheckedChange={() => toggleFeaturePlan(feature.id, 'pro')} 
                                    />
                                  </td>
                                  <td className="px-3 py-3 text-center" onClick={(e) => e.stopPropagation()}>
                                    <Checkbox 
                                      checked={feature.planOverrides.enterprise} 
                                      onCheckedChange={() => toggleFeaturePlan(feature.id, 'enterprise')} 
                                    />
                                  </td>
                                  <td className="px-3 py-3 text-center" onClick={(e) => e.stopPropagation()}>
                                    <Checkbox 
                                      checked={feature.planOverrides.internal} 
                                      onCheckedChange={() => toggleFeaturePlan(feature.id, 'internal')} 
                                    />
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-800">
                  <strong>ⓘ Tip:</strong> Click a feature checkbox to toggle plan assignment.
                  Global toggle enables/disables the feature platform-wide.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Plan Detail Panel */}
        {selectedPlan && (
          <PlanPanel plan={selectedPlan} onClose={() => setSelectedPlan(null)} />
        )}

        {/* Feature Flag Detail Panel */}
        {selectedFlag && (
          <FeatureFlagPanel
            feature={selectedFlag}
            onClose={() => setSelectedFlag(null)}
            onDelete={deleteFeature}
          />
        )}
      </div>
      <CreatePlanDialog open={createPlanOpen} onClose={() => setCreatePlanOpen(false)} />
    </>
  );
}