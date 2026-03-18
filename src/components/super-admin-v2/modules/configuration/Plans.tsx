import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlanPanel } from '../../panels/PlanPanel';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface Plan {
  id: string;
  name: string;
  active: boolean;
  userCount: number;
  isStaffOnly?: boolean;
  description?: string;
  isMvpOperational: boolean;
}

// MVP CANONICAL: Only Free is operativo real
const mvpPlans: Plan[] = [
  { 
    id: '1', 
    name: 'Free', 
    active: true, 
    userCount: 1024, 
    isStaffOnly: false,
    isMvpOperational: true,
    description: 'MVP operational plan - all users start here'
  },
];

// Future-ready plans (not exposed in MVP UI, but can be configured for future)
const futurePlans: Plan[] = [
  { 
    id: '2', 
    name: 'Pro', 
    active: false, 
    userCount: 0, 
    isStaffOnly: false,
    isMvpOperational: false,
    description: 'Future plan - not operational in MVP'
  },
  { 
    id: '3', 
    name: 'Enterprise', 
    active: false, 
    userCount: 0, 
    isStaffOnly: false,
    isMvpOperational: false,
    description: 'Future plan - not operational in MVP'
  },
  {
    id: '4',
    name: 'Internal',
    active: true,
    userCount: 8,
    isStaffOnly: true,
    isMvpOperational: false,
    description: 'Staff-only testing plan for beta features',
  },
];

export function Plans() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [showFuturePlans, setShowFuturePlans] = useState(false);
  
  // MVP mode: only show operational plans
  const [plans] = useState<Plan[]>(mvpPlans);
  const allPlans = showFuturePlans ? [...mvpPlans, ...futurePlans] : mvpPlans;

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Plans (MVP)</h2>
            <p className="text-sm text-gray-500 mt-1">
              Only Free plan is operational in MVP
            </p>
          </div>
          <Button 
            variant="outline"
            onClick={() => setShowFuturePlans(!showFuturePlans)}
          >
            {showFuturePlans ? 'Hide' : 'Show'} Future Plans
          </Button>
        </div>

        {/* MVP Compliance Banner */}
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-green-900">
                  ✅ MVP Mode: Free Plan Only
                </p>
                <p className="text-xs text-green-700 mt-1">
                  All users are on the Free plan. Future plans (Pro, Enterprise) are not operational in MVP.
                  Internal plan is for staff testing only.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allPlans.map((plan) => (
            <Card
              key={plan.id}
              className={cn(
                'cursor-pointer transition-all hover:shadow-md',
                selectedPlan?.id === plan.id && 'ring-2 ring-blue-500',
                !plan.isMvpOperational && 'opacity-60'
              )}
              onClick={() => setSelectedPlan(plan)}
            >
              <CardContent className="p-6">
                {/* Plan Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                    {plan.isStaffOnly && (
                      <Badge
                        variant="outline"
                        className="bg-purple-50 text-purple-700 border-purple-200"
                      >
                        STAFF
                      </Badge>
                    )}
                    {plan.isMvpOperational && (
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200"
                      >
                        MVP
                      </Badge>
                    )}
                    {!plan.isMvpOperational && plan.name !== 'Internal' && (
                      <Badge
                        variant="outline"
                        className="bg-gray-50 text-gray-500 border-gray-200"
                      >
                        FUTURE
                      </Badge>
                    )}
                  </div>
                  <Badge
                    variant="secondary"
                    className={
                      plan.active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-600'
                    }
                  >
                    {plan.active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>

                {/* Plan Stats */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Users</span>
                    <span className="font-semibold text-gray-900">{plan.userCount}</span>
                  </div>
                  {plan.description && (
                    <p className="text-xs text-gray-500 mt-2">{plan.description}</p>
                  )}
                </div>

                {/* Action */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPlan(plan);
                    }}
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Plan Statistics */}
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-900">1</div>
                <div className="text-xs text-gray-500 mt-1">MVP Operational Plan</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {mvpPlans[0].userCount}
                </div>
                <div className="text-xs text-gray-500 mt-1">Free Plan Users</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {futurePlans.find(p => p.name === 'Internal')?.userCount || 0}
                </div>
                <div className="text-xs text-gray-500 mt-1">Staff Users</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Info Box */}
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <p className="text-xs text-blue-800">
              <strong>ⓘ MVP Notice:</strong> Only the Free plan is fully operational in MVP. Pro and Enterprise plans are configured but not active for regular users. Internal plan is for staff testing only.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Plan Detail Panel */}
      {selectedPlan && (
        <PlanPanel
          plan={selectedPlan}
          onClose={() => setSelectedPlan(null)}
          onToggleStatus={() => {
            if (selectedPlan.name === 'Free') {
              toast.error('Cannot deactivate the Free plan - it\'s the MVP operational plan');
            } else {
              toast.info('Plan status toggled (future feature)');
            }
          }}
        />
      )}
    </>
  );
}
