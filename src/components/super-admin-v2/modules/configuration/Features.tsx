import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { FeatureFlagPanel } from '../../panels/FeatureFlagPanel';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import {
  type FeatureFlag,
  syncToLocalStorage,
  loadSuperAdminFeatures,
} from '@/data/featureMappingService';

// MVP CANONICAL FEATURE FLAGS (ONLY 4)
const mvpFeatureFlags: FeatureFlag[] = [
  {
    id: 'voice_input',
    name: 'Voice Input',
    category: 'content',
    description: 'Voice-to-text for descriptions and messages',
    globalEnabled: true,
    rolloutPercentage: 100,
    dependencies: [],
    planOverrides: { free: true, plus: true, pro: true, enterprise: true, internal: true },
    userOverrides: [],
    forcedOn: false,
  },
  {
    id: 'ai_publish_assistant',
    name: 'AI Publishing Assistant',
    category: 'content',
    description: 'AI suggestions for titles, prices, categories, and tags while publishing',
    globalEnabled: true,
    rolloutPercentage: 100,
    dependencies: ['AI Provider'],
    planOverrides: { free: true, plus: true, pro: true, enterprise: true, internal: true },
    userOverrides: [],
    forcedOn: false,
  },
  {
    id: 'ai_moderation',
    name: 'AI Moderation',
    category: 'moderation',
    description: 'AI-assisted moderation suggestions (classification, prioritization)',
    globalEnabled: true,
    rolloutPercentage: 100,
    dependencies: ['AI Provider', 'Moderation Engine'],
    planOverrides: { free: false, plus: false, pro: false, enterprise: true, internal: true },
    userOverrides: [],
    forcedOn: false,
  },
  {
    id: 'map_provider',
    name: 'Maps Provider',
    category: 'infrastructure',
    description: 'Geographic maps and location services',
    globalEnabled: true,
    rolloutPercentage: 100,
    dependencies: ['Maps Provider'],
    planOverrides: { free: true, plus: true, pro: true, enterprise: true, internal: true },
    userOverrides: [],
    forcedOn: false,
  },
];

export function Features() {
  const [selectedFlag, setSelectedFlag] = useState<FeatureFlag | null>(null);
  
  // Load MVP flags from localStorage (with fallback to mvpFeatureFlags)
  const [features, setFeatures] = useState<FeatureFlag[]>(() => {
    const saved = loadSuperAdminFeatures();
    if (saved && saved.length > 0) {
      // Filter to only keep MVP canonical flags
      const mvpIds = mvpFeatureFlags.map(f => f.id);
      const filteredSaved = saved.filter(f => mvpIds.includes(f.id));
      
      if (filteredSaved.length === 4) {
        console.log('[FEATURES] Loaded MVP flags from localStorage:', filteredSaved.length);
        return filteredSaved;
      }
    }
    console.log('[FEATURES] Using default MVP feature flags:', mvpFeatureFlags.length);
    return mvpFeatureFlags;
  });
  
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Auto-sync to localStorage whenever features change
  useEffect(() => {
    if (features.length > 0) {
      syncToLocalStorage(features);
      console.log('[FEATURES] Auto-synced MVP flags to localStorage and SmartFeatures');
    }
  }, [features]);

  const toggleCategory = (category: string) => {
    const newCollapsed = new Set(collapsedCategories);
    if (newCollapsed.has(category)) {
      newCollapsed.delete(category);
    } else {
      newCollapsed.add(category);
    }
    setCollapsedCategories(newCollapsed);
  };

  // Toggle global enabled for a feature
  const toggleFeatureGlobal = (featureId: string) => {
    setFeatures((prev) =>
      prev.map((f) =>
        f.id === featureId ? { ...f, globalEnabled: !f.globalEnabled } : f
      )
    );
    const feature = features.find((f) => f.id === featureId);
    if (feature) {
      toast.success(
        `"${feature.name}" ${!feature.globalEnabled ? 'enabled' : 'disabled'} globally`
      );
      console.log('[AUDIT LOG] Feature global toggle:', {
        featureId,
        enabled: !feature.globalEnabled,
      });
    }
  };

  // Toggle plan override for a feature
  const toggleFeaturePlan = (
    featureId: string,
    plan: 'free' | 'plus' | 'pro' | 'enterprise' | 'internal'
  ) => {
    setFeatures((prev) =>
      prev.map((f) =>
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
    const feature = features.find((f) => f.id === featureId);
    if (feature) {
      const planName = plan.charAt(0).toUpperCase() + plan.slice(1);
      toast.success(
        `"${feature.name}" ${!feature.planOverrides[plan] ? 'enabled' : 'disabled'} for ${planName}`
      );
      console.log('[AUDIT LOG] Feature plan override:', {
        featureId,
        plan,
        enabled: !feature.planOverrides[plan],
      });
    }
  };

  // Filter features
  const filteredFeatures = features.filter((feature) => {
    const matchesSearch = feature.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      filterCategory === 'all' || feature.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = {
    content: {
      label: 'Content',
      count: filteredFeatures.filter((f) => f.category === 'content').length,
    },
    moderation: {
      label: 'Moderation',
      count: filteredFeatures.filter((f) => f.category === 'moderation').length,
    },
    infrastructure: {
      label: 'Infrastructure',
      count: filteredFeatures.filter((f) => f.category === 'infrastructure').length,
    },
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Feature Flags (MVP)</h2>
            <p className="text-sm text-gray-500 mt-1">
              MVP canonical feature flags (4 total)
            </p>
          </div>
        </div>

        {/* Search & Filter */}
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search features..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="content">Content</SelectItem>
                  <SelectItem value="moderation">Moderation</SelectItem>
                  <SelectItem value="infrastructure">Infrastructure</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* MVP Compliance Banner */}
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-green-900">
                  ✅ MVP Feature Flags Only
                </p>
                <p className="text-xs text-green-700 mt-1">
                  Only 4 canonical MVP feature flags are enabled. Toggle checkboxes to control feature availability per plan.
                  <br />
                  <strong>Note:</strong> Free plan is the only operativo real in MVP.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features List */}
        <Card>
          <CardContent className="p-4">
            <div className="space-y-4">
              {Object.entries(categories).map(([categoryId, category]) => {
                const isCollapsed = collapsedCategories.has(categoryId);
                const categoryFeatures = filteredFeatures.filter(
                  (f) => f.category === categoryId
                );

                if (categoryFeatures.length === 0) return null;

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
                                  <div className="flex items-center gap-2">
                                    <div
                                      className={cn(
                                        'w-2 h-2 rounded-full',
                                        feature.globalEnabled
                                          ? 'bg-green-500'
                                          : 'bg-gray-300'
                                      )}
                                    />
                                    <div className="text-sm font-medium text-gray-900">
                                      {feature.name}
                                    </div>
                                  </div>
                                </td>
                                <td
                                  className="px-3 py-3 text-center"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Checkbox
                                    checked={feature.globalEnabled}
                                    onCheckedChange={() =>
                                      toggleFeatureGlobal(feature.id)
                                    }
                                  />
                                </td>
                                <td
                                  className="px-3 py-3 text-center"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Checkbox
                                    checked={feature.planOverrides.free}
                                    onCheckedChange={() =>
                                      toggleFeaturePlan(feature.id, 'free')
                                    }
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
                <strong>ⓘ MVP Mode:</strong> Only 4 canonical feature flags are active. The green dot indicates globally enabled features. Click a feature row to view detailed settings.
              </p>
            </div>

            {/* MVP Feature Statistics */}
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-gray-900">{features.length}</div>
                  <div className="text-xs text-gray-500 mt-1">MVP Features</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {features.filter(f => f.globalEnabled).length}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Globally Enabled</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    {features.filter(f => f.planOverrides.free).length}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Free Plan Enabled</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feature Flag Detail Panel */}
      {selectedFlag && (
        <FeatureFlagPanel
          feature={selectedFlag}
          onClose={() => setSelectedFlag(null)}
          onDelete={() => {
            toast.error('Cannot delete MVP canonical feature flags');
          }}
        />
      )}
    </>
  );
}
