import React, { useState, useMemo } from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ModerationPanel } from '../panels/ModerationPanel';

interface Report {
  id: string;
  reporter: string;
  target: string;
  targetType: 'listing' | 'user' | 'group';
  reason: string;
  status: 'open' | 'resolved' | 'rejected';
  priority: 'normal' | 'high' | 'critical';
  createdAt: string;
  preview?: string;
  source?: string;
  aiSuggestion?: string;
}

const mockReports: Report[] = [
  {
    id: '1',
    reporter: 'John Doe',
    target: 'iPhone 15 Pro - Suspicious Listing',
    targetType: 'listing',
    reason: 'Spam / Fraud',
    status: 'open',
    priority: 'high',
    createdAt: '10 min ago',
    preview: 'This listing appears to be a scam...',
    source: 'User Report',
    aiSuggestion: 'High fraud risk detected',
  },
  {
    id: '2',
    reporter: 'Sarah Smith',
    target: 'User: Mike Seller',
    targetType: 'user',
    reason: 'Inappropriate Behavior',
    status: 'open',
    priority: 'normal',
    createdAt: '1 hour ago',
    preview: 'User sent harassing messages...',
    source: 'User Report',
    aiSuggestion: 'Review conversation history',
  },
  {
    id: '3',
    reporter: 'Admin Bot',
    target: 'Tech Group - NSFW Content',
    targetType: 'group',
    reason: 'Adult Content',
    status: 'open',
    priority: 'critical',
    createdAt: '5 min ago',
    preview: 'Group contains inappropriate images...',
    source: 'AI Moderation',
    aiSuggestion: 'Remove content immediately',
  },
];

const priorityConfig = {
  normal: { color: 'bg-gray-100 text-gray-700', label: 'Normal' },
  high: { color: 'bg-yellow-100 text-yellow-800', label: 'High' },
  critical: { color: 'bg-red-100 text-red-800', label: 'Critical' },
};

// SLA helper function
const getSLAStatus = (createdAt: string): {
  status: 'safe' | 'warning' | 'critical';
  label: string;
} => {
  // Mock implementation - in real app, calculate from actual timestamp
  const mockHours = Math.floor(Math.random() * 6);
  
  if (mockHours < 1) {
    return { status: 'safe', label: `${Math.floor(mockHours * 60)}m` };
  } else if (mockHours < 4) {
    return { status: 'warning', label: `${mockHours}h` };
  } else {
    return { status: 'critical', label: `${mockHours}h` };
  }
};

// Helper: Convert "X min/hour ago" to timestamp for sorting
const parseTimeAgo = (timeStr: string): number => {
  const match = timeStr.match(/(\d+)\s*(min|hour|day)/);
  if (!match) return Date.now();
  
  const value = parseInt(match[1]);
  const unit = match[2];
  
  const now = Date.now();
  if (unit === 'min') return now - value * 60 * 1000;
  if (unit === 'hour') return now - value * 60 * 60 * 1000;
  if (unit === 'day') return now - value * 24 * 60 * 60 * 1000;
  return now;
};

type SortColumn = 'priority' | 'created' | 'sla' | 'reason';
type SortDirection = 'asc' | 'desc';

export function ModerationModule() {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('open');
  const [sortBy, setSortBy] = useState<SortColumn>('priority');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  // Handle column sort
  const handleSort = (column: SortColumn) => {
    if (sortBy === column) {
      // Toggle direction
      setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc');
    } else {
      // New column, start with DESC
      setSortBy(column);
      setSortDirection('desc');
    }
  };

  // Filter and sort reports
  const processedReports = useMemo(() => {
    // First, filter
    let filtered = mockReports.filter(
      (r) => filterStatus === 'all' || r.status === filterStatus
    );

    // Then, sort
    const sorted = [...filtered].sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'priority': {
          const priorityOrder = { critical: 0, high: 1, normal: 2 };
          comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
          break;
        }

        case 'created': {
          const timeA = parseTimeAgo(a.createdAt);
          const timeB = parseTimeAgo(b.createdAt);
          comparison = timeA - timeB;
          break;
        }

        case 'sla': {
          // For SLA, we sort by time elapsed (less time = more urgent)
          const timeA = parseTimeAgo(a.createdAt);
          const timeB = parseTimeAgo(b.createdAt);
          comparison = timeB - timeA; // Reverse: older = more urgent
          break;
        }

        case 'reason': {
          comparison = a.reason.localeCompare(b.reason);
          break;
        }
      }

      return sortDirection === 'desc' ? -comparison : comparison;
    });

    return sorted;
  }, [filterStatus, sortBy, sortDirection]);

  // Sortable header component
  const SortableHeader = ({ 
    column, 
    children 
  }: { 
    column: SortColumn; 
    children: React.ReactNode 
  }) => {
    const isActive = sortBy === column;
    const arrow = isActive ? (sortDirection === 'desc' ? ' ↓' : ' ↑') : '';
    
    return (
      <TableHead
        onClick={() => handleSort(column)}
        className={`cursor-pointer select-none transition-colors hover:text-gray-900 ${
          isActive ? 'text-gray-900 font-medium' : 'text-gray-700'
        }`}
      >
        {children}{arrow}
      </TableHead>
    );
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Moderation Queue</h1>
        <p className="text-gray-500 mt-1">Review and resolve reported content</p>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input placeholder="Search reports..." className="pl-10" />
        </div>
        
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
            <SelectItem value="all">All</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" />
          More Filters
        </Button>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Reporter</TableHead>
              <TableHead>Target</TableHead>
              <SortableHeader column="reason">Reason</SortableHeader>
              <SortableHeader column="priority">Priority</SortableHeader>
              <SortableHeader column="created">Created</SortableHeader>
              <SortableHeader column="sla">SLA</SortableHeader>
              <TableHead>Preview</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {processedReports.map((report) => {
              const priority = priorityConfig[report.priority];
              const slaStatus = getSLAStatus(report.createdAt);
              return (
                <TableRow
                  key={report.id}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => setSelectedReport(report)}
                >
                  <TableCell className="font-medium text-gray-900">
                    {report.reporter}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-gray-900">{report.target}</div>
                      <Badge variant="secondary" className="mt-1">
                        {report.targetType}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600">{report.reason}</TableCell>
                  <TableCell>
                    <Badge className={priority.color} variant="secondary">
                      {priority.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-500">{report.createdAt}</TableCell>
                  <TableCell>
                    <Badge
                      className={`${
                        slaStatus.status === 'safe'
                          ? 'bg-green-100 text-green-800'
                          : slaStatus.status === 'warning'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                      variant="secondary"
                    >
                      {slaStatus.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500 max-w-xs truncate">
                    {report.preview}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Moderation Detail Panel */}
      {selectedReport && (
        <ModerationPanel
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
        />
      )}
    </div>
  );
}