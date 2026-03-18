/**
 * Pricing Model Badge Component
 * Displays pricing model for services and rentals
 * Supports: Hourly, Fixed, Quote, Session, Daily, Monthly
 */

import { Clock, DollarSign, MessageSquare, Users, Calendar, CalendarDays } from 'lucide-react';

interface PricingModelBadgeProps {
  pricingModel?: 'hourly' | 'fixed' | 'quote' | 'session' | 'daily' | 'monthly';
  size?: 'default' | 'compact';
}

export function PricingModelBadge({ pricingModel, size = 'default' }: PricingModelBadgeProps) {
  if (!pricingModel) return null;

  // Size-specific classes
  const sizeClasses = size === 'compact' 
    ? 'px-1.5 py-0.5 text-[9px]' 
    : 'px-2 py-1 text-[10px]';
  
  const iconSize = size === 'compact' ? 'w-2 h-2' : 'w-2.5 h-2.5';

  const getIcon = () => {
    switch (pricingModel) {
      case 'fixed':
        return <DollarSign className={iconSize} />;
      case 'quote':
        return <MessageSquare className={iconSize} />;
      case 'session':
        return <Users className={iconSize} />;
      case 'hourly':
        return <Clock className={iconSize} />;
      case 'daily':
        return <Calendar className={iconSize} />;
      case 'monthly':
        return <CalendarDays className={iconSize} />;
    }
  };

  const getLabel = () => {
    switch (pricingModel) {
      case 'fixed':
        return 'Fixed';
      case 'quote':
        return 'Quote';
      case 'session':
        return 'Session';
      case 'hourly':
        return 'Hourly';
      case 'daily':
        return 'Daily';
      case 'monthly':
        return 'Monthly';
    }
  };

  const getColor = () => {
    switch (pricingModel) {
      case 'fixed':
        return 'bg-blue-50 text-blue-700 ring-blue-200';
      case 'quote':
        return 'bg-purple-50 text-purple-700 ring-purple-200';
      case 'session':
        return 'bg-gray-50 text-gray-700 ring-gray-200';
      case 'hourly':
        return 'bg-cyan-50 text-cyan-700 ring-cyan-200';
      case 'daily':
        return 'bg-green-50 text-green-700 ring-green-200';
      case 'monthly':
        return 'bg-orange-50 text-orange-700 ring-orange-200';
    }
  };

  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-medium backdrop-blur-md shadow-lg ring-1 ring-inset ${getColor()} ${sizeClasses}`}>
      {getIcon()}
      <span>{getLabel()}</span>
    </span>
  );
}