import React, { useState } from 'react';
import { Search, ChevronDown, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';

interface AuditEntry {
  id: string;
  action: string;
  actor: string;
  target?: string;
  timestamp: string;
  metadata?: Record<string, any>;
  changes?: {
    before: Record<string, any>;
    after: Record<string, any>;
  };
}

const mockAuditLog: AuditEntry[] = [
  {
    id: '1',
    action: 'user_role_changed',
    actor: 'Admin John',
    target: 'User: Mike Smith',
    timestamp: '2 min ago',
    changes: {
      before: { role: 'user' },
      after: { role: 'moderator' },
    },
  },
  {
    id: '2',
    action: 'infrastructure_provider_switched',
    actor: 'Super Admin Sarah',
    target: 'Email Service',
    timestamp: '1 hour ago',
    changes: {
      before: { provider: 'SendGrid' },
      after: { provider: 'Resend' },
    },
    metadata: {
      deploymentId: 'dpl_abc123',
      deploymentUrl: 'https://vercel.com/deployments/abc123',
    },
  },
  {
    id: '3',
    action: 'platform_freeze_enabled',
    actor: 'Super Admin Sarah',
    target: 'Publishing',
    timestamp: '3 hours ago',
    changes: {
      before: { freezePublishing: false },
      after: { freezePublishing: true },
    },
  },
  {
    id: '4',
    action: 'user_banned',
    actor: 'Moderator Jane',
    target: 'User: Spam Account',
    timestamp: '5 hours ago',
    changes: {
      before: { status: 'active' },
      after: { status: 'banned' },
    },
  },
];

const actionLabels: Record<string, { label: string; color: string }> = {
  user_role_changed: { label: 'Role Changed', color: 'bg-blue-100 text-blue-800' },
  infrastructure_provider_switched: {
    label: 'Provider Switched',
    color: 'bg-purple-100 text-purple-800',
  },
  platform_freeze_enabled: { label: 'Freeze Enabled', color: 'bg-yellow-100 text-yellow-800' },
  user_banned: { label: 'User Banned', color: 'bg-red-100 text-red-800' },
};

export function AuditLogModule() {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [filterAction, setFilterAction] = useState<string>('all');

  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Audit Log</h1>
        <p className="text-gray-500 mt-1">
          Comprehensive record of all administrative actions
        </p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input placeholder="Search audit log..." className="pl-10" />
        </div>

        <Select value={filterAction} onValueChange={setFilterAction}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Action" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Actions</SelectItem>
            <SelectItem value="user_role_changed">Role Changes</SelectItem>
            <SelectItem value="infrastructure_provider_switched">
              Provider Switches
            </SelectItem>
            <SelectItem value="platform_freeze_enabled">Freeze Actions</SelectItem>
            <SelectItem value="user_banned">User Bans</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="7days">
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24hours">Last 24 hours</SelectItem>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="all">All time</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Audit Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Actor</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAuditLog
                .filter((entry) => filterAction === 'all' || entry.action === filterAction)
                .flatMap((entry) => {
                  const isExpanded = expandedRows.has(entry.id);
                  const actionConfig = actionLabels[entry.action] || {
                    label: entry.action,
                    color: 'bg-gray-100 text-gray-800',
                  };

                  const rows = [
                    <TableRow
                      key={entry.id}
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => toggleRow(entry.id)}
                    >
                      <TableCell>
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge className={actionConfig.color} variant="secondary">
                          {actionConfig.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium text-gray-900">
                        {entry.actor}
                      </TableCell>
                      <TableCell className="text-gray-600">{entry.target || '—'}</TableCell>
                      <TableCell className="text-gray-500">{entry.timestamp}</TableCell>
                    </TableRow>
                  ];

                  // Add expanded row if needed
                  if (isExpanded && entry.changes) {
                    rows.push(
                      <TableRow key={`${entry.id}-details`}>
                        <TableCell colSpan={5} className="bg-gray-50">
                          <div className="p-4">
                            <h4 className="text-sm font-semibold text-gray-900 mb-3">
                              Changes
                            </h4>
                            <div className="grid grid-cols-2 gap-4">
                              {/* Before */}
                              <div>
                                <p className="text-xs font-medium text-gray-500 mb-2">
                                  BEFORE
                                </p>
                                <pre className="bg-red-50 border border-red-200 rounded-lg p-3 text-xs font-mono text-red-900">
                                  {JSON.stringify(entry.changes.before, null, 2)}
                                </pre>
                              </div>

                              {/* After */}
                              <div>
                                <p className="text-xs font-medium text-gray-500 mb-2">
                                  AFTER
                                </p>
                                <pre className="bg-green-50 border border-green-200 rounded-lg p-3 text-xs font-mono text-green-900">
                                  {JSON.stringify(entry.changes.after, null, 2)}
                                </pre>
                              </div>
                            </div>

                            {/* Metadata */}
                            {entry.metadata && (
                              <div className="mt-4 pt-4 border-t border-gray-200">
                                <p className="text-xs font-medium text-gray-500 mb-2">
                                  METADATA
                                </p>
                                <pre className="bg-gray-100 border border-gray-200 rounded-lg p-3 text-xs font-mono text-gray-900">
                                  {JSON.stringify(entry.metadata, null, 2)}
                                </pre>
                              </div>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  }

                  return rows;
                })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}