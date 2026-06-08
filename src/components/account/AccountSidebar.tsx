import { Bell, Settings, User, BarChart3, Star, Package, Users, MapPin, HelpCircle, LogOut } from 'lucide-react';

export interface AccountSectionItem {
  key: string;
  label: string;
  icon: typeof Bell;
}

/** The account/menu sections shown in the desktop sidebar (mirrors MenuSheet). */
export const ACCOUNT_SECTIONS: AccountSectionItem[] = [
  { key: 'action-center', label: 'Action Center', icon: Bell },
  { key: 'settings', label: 'Settings', icon: Settings },
  { key: 'profile', label: 'My Profile', icon: User },
  { key: 'statistics', label: 'My Statistics', icon: BarChart3 },
  { key: 'saved-items', label: 'Favorites', icon: Star },
  { key: 'my-listings', label: 'My Listings', icon: Package },
  { key: 'groups', label: 'My Groups', icon: Users },
  { key: 'my-trail', label: 'My Trail', icon: MapPin },
  { key: 'help-support', label: 'Help & Support', icon: HelpCircle },
];

interface AccountSidebarProps {
  activeSection: string;
  onSelect: (key: string) => void;
  user?: { name?: string; plan?: string; avatarUrl?: string };
  onLogout?: () => void;
}

export function AccountSidebar({ activeSection, onSelect, user, onLogout }: AccountSidebarProps) {
  return (
    <div className="flex flex-col h-full p-3 gap-1">
      {/* Profile header */}
      <div className="flex items-center gap-3 px-2 py-3 mb-1">
        {user?.avatarUrl ? (
          <img src={user.avatarUrl} alt={user?.name || ''} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
        ) : (
          <div className="w-10 h-10 rounded-full bg-muted flex-shrink-0" />
        )}
        <div className="min-w-0">
          <p className="font-medium truncate text-sm">{user?.name || 'Guest'}</p>
          <p className="text-xs text-muted-foreground capitalize">{user?.plan || 'free'}</p>
        </div>
      </div>

      {/* Section navigation */}
      <nav className="flex flex-col gap-0.5 flex-1">
        {ACCOUNT_SECTIONS.map((s) => {
          const Icon = s.icon;
          const active = s.key === activeSection;
          return (
            <button
              key={s.key}
              onClick={() => onSelect(s.key)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-left transition-colors ${
                active
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-foreground hover:bg-muted'
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{s.label}</span>
            </button>
          );
        })}
      </nav>

      {onLogout && (
        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors mt-1"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          <span>Logout</span>
        </button>
      )}
    </div>
  );
}
