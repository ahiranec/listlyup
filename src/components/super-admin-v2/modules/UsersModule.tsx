import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { UserPanel } from '../panels/UserPanel';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'admin' | 'moderator' | 'staff' | 'user';
  status: 'active' | 'suspended' | 'banned';
  plan: string;
  sessions: number;
  lastActive: string;
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Admin',
    email: 'john@listlyup.com',
    role: 'super_admin',
    status: 'active',
    plan: 'N/A',
    sessions: 2,
    lastActive: '5 min ago',
  },
  {
    id: '2',
    name: 'Sarah Moderator',
    email: 'sarah@listlyup.com',
    role: 'moderator',
    status: 'active',
    plan: 'N/A',
    sessions: 1,
    lastActive: '1 hour ago',
  },
  {
    id: '3',
    name: 'Mike User',
    email: 'mike@example.com',
    role: 'user',
    status: 'active',
    plan: 'Pro',
    sessions: 3,
    lastActive: 'Online',
  },
  {
    id: '4',
    name: 'Jane Suspended',
    email: 'jane@example.com',
    role: 'user',
    status: 'suspended',
    plan: 'Free',
    sessions: 0,
    lastActive: '2 days ago',
  },
];

const statusConfig = {
  active: { color: 'bg-green-100 text-green-800', label: 'Active' },
  suspended: { color: 'bg-yellow-100 text-yellow-800', label: 'Suspended' },
  banned: { color: 'bg-red-100 text-red-800', label: 'Banned' },
};

const roleColors = {
  super_admin: 'bg-purple-100 text-purple-800',
  admin: 'bg-blue-100 text-blue-800',
  moderator: 'bg-cyan-100 text-cyan-800',
  staff: 'bg-gray-100 text-gray-800',
  user: 'bg-gray-100 text-gray-600',
};

export function UsersModule() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Users</h1>
        <p className="text-gray-500 mt-1">Manage user accounts, roles, and permissions</p>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search users by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" />
          Filters
        </Button>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Sessions</TableHead>
              <TableHead>Last Active</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockUsers.map((user) => {
              const statusBadge = statusConfig[user.status];
              return (
                <TableRow
                  key={user.id}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => setSelectedUser(user)}
                >
                  <TableCell>
                    <div>
                      <div className="font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={roleColors[user.role]} variant="secondary">
                      {user.role.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          user.status === 'active'
                            ? 'bg-green-500'
                            : user.status === 'suspended'
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                        }`}
                      />
                      <Badge className={statusBadge.color} variant="secondary">
                        {statusBadge.label}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600">{user.plan}</TableCell>
                  <TableCell className="text-gray-600">
                    {user.sessions} {user.sessions === 1 ? 'session' : 'sessions'}
                  </TableCell>
                  <TableCell className="text-gray-500">{user.lastActive}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* User Detail Panel */}
      {selectedUser && (
        <UserPanel user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  );
}
