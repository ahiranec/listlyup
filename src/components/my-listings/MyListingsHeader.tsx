import { ChevronLeft } from "lucide-react";
import { Button } from "../ui/button";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";

interface MyListingsHeaderProps {
  onBack: () => void;
  counts: {
    all: number;
    active: number;
    paused: number;
    messages: number;
    reported: number;
    expiring: number;
  };
  selectedTab: "all" | "paused" | "messages" | "reported" | "expiring";
  onTabChange: (tab: "all" | "paused" | "messages" | "reported" | "expiring") => void;
}

export function MyListingsHeader({
  onBack,
  counts,
  selectedTab,
  onTabChange,
}: MyListingsHeaderProps) {
  return (
    <div className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="flex items-center gap-3 px-4 py-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="flex-shrink-0"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="font-semibold">My Listings</h1>
          <p className="text-xs text-muted-foreground">
            {counts.all} total · {counts.active} active
            {counts.paused > 0 && ` · ${counts.paused} paused`}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 pb-3 overflow-x-auto">
        <Tabs value={selectedTab} onValueChange={(v) => onTabChange(v as any)}>
          <TabsList className="w-full justify-start h-10 gap-0.5">
            <TabsTrigger value="all" className="text-xs gap-1 px-2 sm:px-3">
              All
              {counts.all > 0 && <span className="hidden sm:inline">({counts.all})</span>}
            </TabsTrigger>
            <TabsTrigger value="paused" className="text-xs gap-1 px-2 sm:px-3">
              Paused
              {counts.paused > 0 && <span className="hidden sm:inline">({counts.paused})</span>}
            </TabsTrigger>
            <TabsTrigger value="messages" className="text-xs gap-1 px-2 sm:px-3 relative">
              Messages
              {counts.messages > 0 && (
                <Badge variant="destructive" className="ml-1 h-4 min-w-[16px] px-1 text-[10px]">
                  {counts.messages}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="reported" className="text-xs gap-1 px-2 sm:px-3 relative">
              Reported
              {counts.reported > 0 && (
                <Badge variant="destructive" className="ml-1 h-4 min-w-[16px] px-1 text-[10px]">
                  {counts.reported}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="expiring" className="text-xs gap-1 px-2 sm:px-3 relative">
              Expiring
              {counts.expiring > 0 && (
                <Badge variant="destructive" className="ml-1 h-4 min-w-[16px] px-1 text-[10px]">
                  {counts.expiring}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}