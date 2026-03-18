import React from 'react';
import { BarChart3, Users, Shield, Settings, FileText, LogOut, ArrowLeft } from 'lucide-react';
import { AdminModule } from '../SuperAdminDashboard';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeModule: AdminModule;
  onModuleChange: (module: AdminModule) => void;
  onLogout?: () => void;
  userName?: string;
  onBackToApp?: () => void;
}

const modules = [
  { id: 'overview' as const, icon: BarChart3, label: 'Overview' },
  { id: 'users' as const, icon: Users, label: 'Users' },
  { id: 'moderation' as const, icon: Shield, label: 'Moderation' },
  { id: 'configuration' as const, icon: Settings, label: 'Configuration' },
  { id: 'audit' as const, icon: FileText, label: 'Audit Log' },
];

export function Sidebar({ activeModule, onModuleChange, onLogout, userName, onBackToApp }: SidebarProps) {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Platform Badge - Persistent */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900">ListlyUp</p>
            <p className="text-xs text-gray-500">PUBLIC MODE</p>
          </div>
        </div>
      </div>

      {/* Back to App Link */}
      {onBackToApp && (
        <div className="px-4 pt-4 pb-3 border-b border-gray-100">
          <button
            onClick={onBackToApp}
            className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a la App</span>
          </button>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {modules.map((module) => {
            const Icon = module.icon;
            const isActive = activeModule === module.id;

            return (
              <li key={module.id}>
                <button
                  onClick={() => onModuleChange(module.id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  )}
                  aria-label={module.label}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className="w-5 h-5" />
                  <span>{module.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer Info */}
      <div className="p-4 border-t border-gray-200 space-y-3">
        {/* User Info */}
        {userName && (
          <div className="flex items-center gap-2 px-2 py-1.5 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
              {userName.split(' ').map(n => n[0]).join('').substring(0, 2)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-900 truncate">{userName}</p>
              <p className="text-xs text-gray-500">Super Admin</p>
            </div>
          </div>
        )}

        {/* Logout Button */}
        {onLogout && (
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        )}

        {/* Version */}
        <div className="px-2">
          <p className="text-xs text-gray-500">Superadmin Dashboard</p>
          <p className="text-xs text-gray-400">v1.0.0</p>
        </div>
      </div>
    </aside>
  );
}