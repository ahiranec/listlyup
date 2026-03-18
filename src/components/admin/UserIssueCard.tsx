/**
 * User Issue Card Component
 * For Admin Dashboard
 * 
 * Displays user issues requiring admin attention
 * Types: verification, appeal, account-access, dispute
 * 
 * Features:
 * - Issue type icons and labels
 * - Priority badges (High/Medium/Low) with soft colors
 * - Subject and description display
 * - Action buttons based on issue type
 * 
 * @example
 * <UserIssueCard
 *   issueType="verification"
 *   user="@maria_silva"
 *   subject="ID Verification Rejected - Request Review"
 *   description="User claims ID photo was clear but got rejected by automated system..."
 *   priority="High"
 *   time="3h ago"
 * />
 */

import { ShieldAlert, UserCheck, Lock, Scale, Clock, User } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { toast } from 'sonner@2.0.3';

interface UserIssueCardProps {
  issueType: 'verification' | 'appeal' | 'account-access' | 'dispute';
  user: string;
  subject: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  time: string;
  onReview?: () => void;
  onResolve?: () => void;
  onContact?: () => void;
}

export function UserIssueCard({
  issueType,
  user,
  subject,
  description,
  priority,
  time,
  onReview,
  onResolve,
  onContact,
}: UserIssueCardProps) {
  const handleReview = () => {
    if (onReview) {
      onReview();
    } else {
      toast.success('Opening user issue details...');
    }
  };

  const handleResolve = () => {
    if (onResolve) {
      onResolve();
    } else {
      toast.success('Issue marked as resolved');
    }
  };

  const handleContact = () => {
    if (onContact) {
      onContact();
    } else {
      toast.info(`Opening conversation with ${user}...`);
    }
  };

  // Issue type configuration
  const issueTypeConfig = {
    verification: {
      icon: UserCheck,
      label: 'Verification',
      color: 'text-blue-400 dark:text-blue-500',
    },
    appeal: {
      icon: ShieldAlert,
      label: 'Appeal',
      color: 'text-red-400 dark:text-red-500',
    },
    'account-access': {
      icon: Lock,
      label: 'Account Access',
      color: 'text-amber-400 dark:text-amber-500',
    },
    dispute: {
      icon: Scale,
      label: 'Dispute',
      color: 'text-purple-400 dark:text-purple-500',
    },
  };

  // Priority colors (soft palette)
  const priorityStyles = {
    High: 'bg-red-300 text-red-900 dark:bg-red-900/40 dark:text-red-200',
    Medium: 'bg-amber-300 text-amber-900 dark:bg-amber-900/40 dark:text-amber-200',
    Low: 'bg-blue-300 text-blue-900 dark:bg-blue-900/40 dark:text-blue-200',
  };

  const config = issueTypeConfig[issueType];
  const IconComponent = config.icon;

  return (
    <div className="p-3 bg-card border border-border rounded-lg hover:border-border/80 transition-colors">
      {/* Header */}
      <div className="flex items-start gap-2 mb-2">
        <IconComponent className={`w-4 h-4 mt-0.5 flex-shrink-0 ${config.color}`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Badge className={`text-[10px] px-1.5 py-0 h-4 ${priorityStyles[priority]}`}>
              {priority.toUpperCase()}
            </Badge>
            <span className={`text-[10px] ${config.color}`}>
              {config.label}
            </span>
          </div>
          <p className="text-xs font-medium text-foreground/90 mb-1 line-clamp-2">
            {subject}
          </p>
        </div>
      </div>

      {/* User */}
      <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground mb-2 pl-6">
        <User className="w-3 h-3" />
        <span>{user}</span>
        <span>·</span>
        <Clock className="w-3 h-3" />
        <span>{time}</span>
      </div>

      {/* Description */}
      <div className="mb-2 pl-6">
        <p className="text-[11px] text-foreground/70 leading-snug line-clamp-2">
          {description}
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          variant="default"
          size="sm"
          onClick={handleReview}
          className="flex-1 h-7 text-xs"
        >
          Review
        </Button>
        {issueType === 'verification' && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleResolve}
            className="h-7 text-xs px-3"
          >
            Approve
          </Button>
        )}
        {issueType === 'appeal' && (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={handleResolve}
              className="h-7 text-xs px-3"
            >
              Restore
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleContact}
              className="h-7 text-xs px-3"
            >
              Contact
            </Button>
          </>
        )}
        {issueType === 'dispute' && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleContact}
            className="h-7 text-xs px-3"
          >
            Mediate
          </Button>
        )}
        {issueType === 'account-access' && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleResolve}
            className="h-7 text-xs px-3"
          >
            Reset
          </Button>
        )}
      </div>
    </div>
  );
}
