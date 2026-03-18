import React, { useState } from 'react';
import { Sidebar } from './layout/Sidebar';
import { OverviewModule } from './modules/OverviewModule';
import { UsersModule } from './modules/UsersModule';
import { ModerationModule } from './modules/ModerationModule';
import { ConfigurationModule } from './modules/ConfigurationModule';
import { AuditLogModule } from './modules/AuditLogModule';
import { FreezeBanner } from './shared/FreezeBanner';
import { DeploymentStatusBanner } from './shared/DeploymentStatusBanner';

export type AdminModule = 'overview' | 'users' | 'moderation' | 'configuration' | 'audit';
export type ConfigSubnav = 'platform' | 'plans' | 'features' | 'infrastructure';

interface SuperAdminDashboardProps {
  onLogout?: () => void;
  userName?: string;
  onBackToApp?: () => void;
}

export function SuperAdminDashboard({ onLogout, userName, onBackToApp }: SuperAdminDashboardProps) {
  const [activeModule, setActiveModule] = useState<AdminModule>('overview');
  const [activeSubnav, setActiveSubnav] = useState<ConfigSubnav>('platform');

  // Freeze states - lifted from PlatformConfig to enable global banner
  const [freezeStates, setFreezeStates] = useState({
    registrations: false,
    publishing: false,
    groupCreation: false,
  });

  // Mock deployment status
  const [deploymentStatus] = useState<{
    active: boolean;
    technology?: string;
    status?: 'deploying' | 'success' | 'failed';
  }>({
    active: false,
  });

  const hasActiveFreeze = Object.values(freezeStates).some((v) => v);

  const renderModule = () => {
    switch (activeModule) {
      case 'overview':
        return <OverviewModule onNavigate={setActiveModule} />;
      case 'users':
        return <UsersModule />;
      case 'moderation':
        return <ModerationModule />;
      case 'configuration':
        return (
          <ConfigurationModule
            activeSubnav={activeSubnav}
            onSubnavChange={setActiveSubnav}
            freezeStates={freezeStates}
            onFreezeStatesChange={setFreezeStates}
          />
        );
      case 'audit':
        return <AuditLogModule />;
      default:
        return <OverviewModule onNavigate={setActiveModule} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        activeModule={activeModule} 
        onModuleChange={setActiveModule}
        onLogout={onLogout}
        userName={userName}
        onBackToApp={onBackToApp}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Global Freeze Banner */}
        {hasActiveFreeze && <FreezeBanner freezeStates={freezeStates} />}

        {/* Deployment Status Banner */}
        {deploymentStatus.active && (
          <DeploymentStatusBanner
            technology={deploymentStatus.technology!}
            status={deploymentStatus.status!}
          />
        )}

        {/* Module Content */}
        <main className="flex-1 overflow-auto">{renderModule()}</main>
      </div>
    </div>
  );
}

export default SuperAdminDashboard;