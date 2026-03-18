/**
 * Trail Detail Sheet - Transaction Detail View
 * Premium Design 2025
 * 
 * Shows detailed information about a specific transaction:
 * - Summary (participants + item)
 * - Timeline of events
 * - Actions (View details, Chat, Mark completed, Report)
 */

import { X, User, Package, MessageCircle, CheckCircle, AlertTriangle, MapPin } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '../ui/sheet';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface TrailDetailSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trailId: string;
  status?: 'pending' | 'in-progress' | 'completed' | 'cancelled'; // ✅ PHASE 3.5: Add status prop
  onViewProduct: () => void;
  onOpenChat: () => void;
  onMarkCompleted?: () => void; // ✅ PHASE 3.5: Add mark completed handler
}

export function TrailDetailSheet({
  open,
  onOpenChange,
  trailId,
  status: propStatus,
  onViewProduct,
  onOpenChat,
  onMarkCompleted,
}: TrailDetailSheetProps) {
  // Mock data (in real app, fetch based on trailId)
  const trail = {
    id: trailId,
    type: 'bought' as const,
    productTitle: 'Mouse Logitech MX Master 3',
    productImage: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
    price: '$50',
    status: propStatus || ('in-progress' as const), // ✅ PHASE 3.5: Use prop or default
    date: '2025-12-18',
    deliveryMethod: 'pickup' as const,
    seller: {
      name: 'Carlos Mendoza',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
      rating: 4.8,
    },
    buyer: {
      name: 'Ana García',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
    },
    pickupLocation: 'Viña del Mar, V Región',
    timeline: [
      { event: 'Transaction initiated', date: '2025-12-18 14:30', icon: 'start' },
      { event: 'Payment confirmed', date: '2025-12-18 14:35', icon: 'payment' },
      { event: 'Pickup scheduled', date: '2025-12-18 15:00', icon: 'schedule' },
      { event: 'Pending completion', date: '', icon: 'pending' },
    ],
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="bottom" 
        className="h-[85vh] max-w-[480px] mx-auto p-0 rounded-t-3xl"
      >
        {/* Accessibility headers */}
        <SheetTitle className="sr-only">Transaction Details</SheetTitle>
        <SheetDescription className="sr-only">
          View transaction summary, timeline and available actions
        </SheetDescription>

        {/* Header */}
        <div className="sticky top-0 z-10 bg-background border-b border-border p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Transaction Details</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="h-8 w-8 p-0"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Status Badge */}
          <Badge variant="secondary" className="text-xs">
            {trail.status === 'in-progress' && '🔵 In Progress'}
            {trail.status === 'completed' && '✅ Completed'}
            {trail.status === 'pending' && '⏳ Pending'}
            {trail.status === 'cancelled' && '❌ Cancelled'}
          </Badge>
        </div>

        {/* Content */}
        <div className="overflow-auto h-[calc(100%-180px)] px-4 py-4 space-y-6">
          {/* Summary Section */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
              Summary
            </h3>

            {/* Product Card */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-3 mb-3">
              <div className="flex gap-3">
                <img
                  src={trail.productImage}
                  alt={trail.productTitle}
                  className="w-16 h-16 rounded-lg object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm mb-1">{trail.productTitle}</p>
                  <p className="text-lg font-semibold text-primary">{trail.price}</p>
                </div>
              </div>
            </div>

            {/* Participants */}
            <div className="space-y-2">
              {/* Seller */}
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={trail.seller.avatar} />
                  <AvatarFallback>{getInitials(trail.seller.name)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Seller</p>
                  <p className="text-sm font-medium">{trail.seller.name}</p>
                  <p className="text-xs text-amber-600">⭐ {trail.seller.rating}</p>
                </div>
              </div>

              {/* Buyer */}
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={trail.buyer.avatar} />
                  <AvatarFallback>{getInitials(trail.buyer.name)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Buyer</p>
                  <p className="text-sm font-medium">{trail.buyer.name}</p>
                </div>
              </div>
            </div>

            {/* Delivery Info */}
            {trail.deliveryMethod === 'pickup' && (
              <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-xl">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs font-medium text-blue-900 mb-0.5">Pickup Location</p>
                    <p className="text-xs text-blue-700">{trail.pickupLocation}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Timeline Section */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
              Timeline
            </h3>
            <div className="space-y-3">
              {trail.timeline.map((event, index) => (
                <div key={index} className="flex gap-3">
                  {/* Icon */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    event.date ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    {event.icon === 'start' && <Package className="w-4 h-4 text-green-600" />}
                    {event.icon === 'payment' && <CheckCircle className="w-4 h-4 text-green-600" />}
                    {event.icon === 'schedule' && <MapPin className="w-4 h-4 text-green-600" />}
                    {event.icon === 'pending' && <AlertTriangle className="w-4 h-4 text-gray-400" />}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{event.event}</p>
                    {event.date && (
                      <p className="text-xs text-muted-foreground">{event.date}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions Footer */}
        <div className="sticky bottom-0 bg-background border-t border-border p-4 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              onClick={onViewProduct}
              className="h-10"
            >
              <Package className="w-4 h-4 mr-2" />
              View Product
            </Button>
            <Button
              variant="outline"
              onClick={onOpenChat}
              className="h-10"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat
            </Button>
          </div>
          
          {trail.status === 'in-progress' && (
            <Button className="w-full h-11" onClick={onMarkCompleted}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Mark as Completed
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default TrailDetailSheet;