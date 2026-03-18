/**
 * Events Hub Page - Event Management Hub
 * Mobile-first design optimized for iPhone
 * Premium Design 2025
 * 
 * Manage event hubs (containers that group listings around an event flyer) with tabs:
 * - Active: Currently running event hubs
 * - Upcoming: Future event hubs
 * - Drafts: Unfinished event hubs
 * - Past: Ended event hubs
 */

import { useState, useMemo } from 'react';
import { ArrowLeft, Plus, Search, Calendar, MapPin, Users } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { motion, AnimatePresence } from 'motion/react';

interface EventHub {
  id: string;
  title: string;
  flyerImage: string;
  eventDate: string;
  eventTime?: string;
  location: string;
  status: 'active' | 'upcoming' | 'draft' | 'past' | 'paused' | 'cancelled';
  visibility: 'public' | 'groups' | 'private';
  listingsCount: number;
  attendeesCount?: number;
}

interface EventsHubPageProps {
  onBack: () => void;
  onCreateEventHub: () => void;
  onEventHubClick: (eventHubId: string) => void;
}

export function EventsHubPage({ onBack, onCreateEventHub, onEventHubClick }: EventsHubPageProps) {
  const [activeTab, setActiveTab] = useState<'active' | 'upcoming' | 'drafts' | 'past'>('active');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const mockEventHubs: EventHub[] = [
    {
      id: 'hub-1',
      title: 'Tech Meetup Santiago - Dec 2025',
      flyerImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
      eventDate: '2025-12-25',
      eventTime: '18:00',
      location: 'Santiago, RM',
      status: 'active',
      visibility: 'public',
      listingsCount: 12,
      attendeesCount: 45,
    },
    {
      id: 'hub-2',
      title: 'Art Exhibition - Viña del Mar',
      flyerImage: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=400',
      eventDate: '2025-12-28',
      eventTime: '10:00',
      location: 'Viña del Mar, V',
      status: 'active',
      visibility: 'groups',
      listingsCount: 8,
      attendeesCount: 30,
    },
    {
      id: 'hub-3',
      title: 'New Year Party 2026',
      flyerImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400',
      eventDate: '2025-12-31',
      eventTime: '21:00',
      location: 'Valparaíso, V',
      status: 'upcoming',
      visibility: 'public',
      listingsCount: 0,
    },
    {
      id: 'hub-4',
      title: 'Summer Festival Draft',
      flyerImage: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400',
      eventDate: '2026-01-15',
      location: 'Concón, V',
      status: 'draft',
      visibility: 'public',
      listingsCount: 0,
    },
    {
      id: 'hub-5',
      title: 'Music Concert - September',
      flyerImage: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400',
      eventDate: '2025-09-20',
      eventTime: '20:00',
      location: 'Santiago, RM',
      status: 'past',
      visibility: 'public',
      listingsCount: 24,
      attendeesCount: 120,
    },
  ];

  // Filter event hubs
  const filteredEventHubs = useMemo(() => {
    const filtered = mockEventHubs.filter(hub => {
      // Tab filter
      if (hub.status !== activeTab) return false;

      // Search filter
      if (searchQuery && !hub.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      return true;
    });

    return filtered;
  }, [activeTab, searchQuery]);

  const getVisibilityIcon = (visibility: EventHub['visibility']) => {
    if (visibility === 'public') return '🌍';
    if (visibility === 'groups') return '👥';
    return '🔒';
  };

  const formatEventDate = (date: string, time?: string) => {
    const eventDate = new Date(date);
    const formatted = eventDate.toLocaleDateString('en', { 
      month: 'short', 
      day: 'numeric',
      year: eventDate.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined,
    });
    
    if (time) {
      return `${formatted} · ${time}`;
    }
    
    return formatted;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-[480px] lg:max-w-[1024px] mx-auto">
      {/* Status bar removed - PWA/WebView mobile */}

      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center justify-between h-14 px-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="h-9 w-9 p-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <h1 className="font-semibold">Events Hub</h1>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onCreateEventHub}
            className="h-9 w-9 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border overflow-x-auto">
          {(['active', 'upcoming', 'drafts', 'past'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium transition-colors relative whitespace-nowrap ${
                activeTab === tab
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {activeTab === tab && (
                <motion.div
                  layoutId="events-tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                />
              )}
            </button>
          ))}
        </div>
      </header>

      {/* Search Bar */}
      <div className="p-4 border-b border-border bg-background sticky top-[113px] z-40">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 overflow-auto pb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="p-4 space-y-3"
          >
            {filteredEventHubs.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {searchQuery ? 'No events found' : `No ${activeTab} events`}
                </p>
                {activeTab === 'active' && !searchQuery && (
                  <Button onClick={onCreateEventHub} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Event Hub
                  </Button>
                )}
              </div>
            ) : (
              filteredEventHubs.map((hub, index) => (
                <motion.button
                  key={hub.id}
                  onClick={() => onEventHubClick(hub.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="w-full bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-primary/30 hover:shadow-md transition-all text-left"
                >
                  {/* Flyer Image */}
                  <div className="relative h-40">
                    <img
                      src={hub.flyerImage}
                      alt={hub.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Status Badge Overlay */}
                    <div className="absolute top-2 right-2">
                      <Badge variant={hub.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                        {hub.status === 'active' && '✅ Live'}
                        {hub.status === 'upcoming' && '📅 Upcoming'}
                        {hub.status === 'draft' && '📝 Draft'}
                        {hub.status === 'past' && '🏁 Ended'}
                      </Badge>
                    </div>
                    {/* Visibility Badge */}
                    <div className="absolute top-2 left-2">
                      <Badge variant="secondary" className="text-xs">
                        {getVisibilityIcon(hub.visibility)}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-3">
                    {/* Title */}
                    <h3 className="font-semibold text-sm mb-2 line-clamp-2">
                      {hub.title}
                    </h3>

                    {/* Date & Location */}
                    <div className="space-y-1.5 mb-3">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5 shrink-0" />
                        <span>{formatEventDate(hub.eventDate, hub.eventTime)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span>{hub.location}</span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>📦 {hub.listingsCount} listings</span>
                        {hub.attendeesCount !== undefined && (
                          <>
                            <span>•</span>
                            <span>👥 {hub.attendeesCount} going</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default EventsHubPage;