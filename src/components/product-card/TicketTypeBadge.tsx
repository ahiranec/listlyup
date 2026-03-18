/**
 * Ticket Type Badge Component
 * Displays ticket type for events (Free, Paid)
 */

import { Ticket, DollarSign } from 'lucide-react';

interface TicketTypeBadgeProps {
  ticketType?: 'free' | 'paid';
}

export function TicketTypeBadge({ ticketType }: TicketTypeBadgeProps) {
  if (!ticketType) return null;

  const getIcon = () => {
    switch (ticketType) {
      case 'free':
        return <Ticket className="w-2.5 h-2.5" />;
      case 'paid':
        return <DollarSign className="w-2.5 h-2.5" />;
    }
  };

  const getLabel = () => {
    switch (ticketType) {
      case 'free':
        return 'Free';
      case 'paid':
        return 'Paid';
    }
  };

  const getColor = () => {
    switch (ticketType) {
      case 'free':
        return 'bg-green-50 text-green-700 ring-green-200';
      case 'paid':
        return 'bg-amber-50 text-amber-700 ring-amber-200';
    }
  };

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 text-[10px] rounded-full font-medium backdrop-blur-md shadow-lg ring-1 ring-inset ${getColor()}`}>
      {getIcon()}
      <span>{getLabel()}</span>
    </span>
  );
}
