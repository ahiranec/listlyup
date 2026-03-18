import React from 'react';
import { ConfigSubnav } from '../SuperAdminDashboard';
import { PlatformConfig } from './configuration/PlatformConfig';
import { Plans } from './configuration/Plans';
import { Features } from './configuration/Features';
import { Infrastructure } from './configuration/Infrastructure';
import { cn } from '@/lib/utils';

interface ConfigurationModuleProps {
  activeSubnav: ConfigSubnav;
  onSubnavChange: (subnav: ConfigSubnav) => void;
  freezeStates?: {
    registrations: boolean;
    publishing: boolean;
    groupCreation: boolean;
  };
  onFreezeStatesChange?: (states: {
    registrations: boolean;
    publishing: boolean;
    groupCreation: boolean;
  }) => void;
}

const subnavs = [
  { id: 'platform' as const, label: 'Platform' },
  { id: 'plans' as const, label: 'Plans' },
  { id: 'features' as const, label: 'Features' },
  { id: 'infrastructure' as const, label: 'Infrastructure' },
];

export function ConfigurationModule({
  activeSubnav,
  onSubnavChange,
  freezeStates,
  onFreezeStatesChange,
}: ConfigurationModuleProps) {
  const renderContent = () => {
    switch (activeSubnav) {
      case 'platform':
        return <PlatformConfig freezeStates={freezeStates} onFreezeStatesChange={onFreezeStatesChange} />;
      case 'plans':
        return <Plans />;
      case 'features':
        return <Features />;
      case 'infrastructure':
        return <Infrastructure />;
      default:
        return <PlatformConfig freezeStates={freezeStates} onFreezeStatesChange={onFreezeStatesChange} />;
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Configuration</h1>
        <p className="text-gray-500 mt-1">Manage platform settings and features</p>
      </div>

      {/* Subnav */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex gap-8">
          {subnavs.map((subnav) => (
            <button
              key={subnav.id}
              onClick={() => onSubnavChange(subnav.id)}
              className={cn(
                'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                activeSubnav === subnav.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              )}
            >
              {subnav.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      {renderContent()}
    </div>
  );
}