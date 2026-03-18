import React from 'react';
import { Users, Shield, Flag, AlertTriangle, FileWarning, AlertOctagon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AdminModule } from '../SuperAdminDashboard';

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'warning' | 'danger';
}

function KPICard({ title, value, subtitle, icon, onClick, variant = 'default' }: KPICardProps) {
  const variantClasses = {
    default: 'hover:border-blue-200 hover:bg-blue-50',
    warning: 'hover:border-yellow-200 hover:bg-yellow-50 border-yellow-100',
    danger: 'hover:border-red-200 hover:bg-red-50 border-red-100',
  };

  return (
    <Card
      className={`cursor-pointer transition-all ${variantClasses[variant]}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick?.();
        }
      }}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-gray-900">{value}</div>
        {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
      </CardContent>
    </Card>
  );
}

interface OverviewModuleProps {
  onNavigate: (module: AdminModule) => void;
}

export function OverviewModule({ onNavigate }: OverviewModuleProps) {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">Monitor platform health and critical metrics</p>
      </div>

      {/* KPI Grid - MVP Canonical */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Total Users"
          value="1,234"
          subtitle="↑ 12% from last month"
          icon={<Users className="w-5 h-5 text-blue-600" />}
          onClick={() => onNavigate('users')}
        />
        
        <KPICard
          title="Active Staff"
          value="8"
          subtitle="2 admins, 6 moderators"
          icon={<Shield className="w-5 h-5 text-green-600" />}
          onClick={() => onNavigate('users')}
        />
        
        <KPICard
          title="Pending Reports"
          value="12"
          subtitle="3 flagged as priority"
          icon={<AlertTriangle className="w-5 h-5 text-yellow-600" />}
          onClick={() => onNavigate('moderation')}
          variant="warning"
        />
        
        <KPICard
          title="Active Feature Flags"
          value="4/4"
          subtitle="All MVP flags enabled"
          icon={<Flag className="w-5 h-5 text-purple-600" />}
          onClick={() => onNavigate('configuration')}
        />
      </div>

      {/* Critical Alerts - MVP Canonical */}
      <div className="space-y-4 mb-8">
        <h2 className="text-xl font-semibold text-gray-900">Critical Alerts</h2>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 text-gray-500">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm">All systems operational</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Open Cases - MVP Canonical */}
      <div className="space-y-4 mb-8">
        <h2 className="text-xl font-semibold text-gray-900">Open Cases</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <KPICard
            title="Open Cases"
            value="12"
            subtitle="Requiring attention"
            icon={<FileWarning className="w-5 h-5 text-orange-600" />}
            onClick={() => onNavigate('moderation')}
            variant="warning"
          />
          
          <KPICard
            title="High Priority Cases"
            value="3"
            subtitle="Urgent resolution needed"
            icon={<AlertOctagon className="w-5 h-5 text-red-600" />}
            onClick={() => onNavigate('moderation')}
            variant="danger"
          />
        </div>
      </div>
    </div>
  );
}

function CheckCircle({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      strokeWidth="2"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
