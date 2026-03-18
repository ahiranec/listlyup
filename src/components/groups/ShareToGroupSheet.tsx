import { useState } from "react";
import { Users2, Search, CheckCircle2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "../ui/sheet";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { toast } from "sonner@2.0.3";

interface Group {
  id: string;
  name: string;
  location: string;
  memberCount: number;
}

// Mock groups - Replace with real data
const MOCK_GROUPS: Group[] = [
  {
    id: "1",
    name: "Vecinos Valparaíso",
    location: "Valparaíso",
    memberCount: 24,
  },
  {
    id: "2",
    name: "Ciclistas Chile",
    location: "Santiago",
    memberCount: 156,
  },
  {
    id: "3",
    name: "Compra/Venta Viña",
    location: "Viña del Mar",
    memberCount: 89,
  },
  {
    id: "4",
    name: "Vecinos Las Condes",
    location: "Santiago",
    memberCount: 42,
  },
];

interface ShareToGroupSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productTitle: string;
  productId: string;
}

export function ShareToGroupSheet({
  open,
  onOpenChange,
  productTitle,
  productId,
}: ShareToGroupSheetProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

  const filteredGroups = MOCK_GROUPS.filter((group) =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleGroup = (groupId: string) => {
    setSelectedGroups((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId]
    );
  };

  const handleShare = () => {
    if (selectedGroups.length === 0) {
      toast.error("Please select at least one group");
      return;
    }

    // TODO: Implement actual sharing logic with backend
    const groupNames = selectedGroups
      .map((id) => MOCK_GROUPS.find((g) => g.id === id)?.name)
      .filter(Boolean);

    if (selectedGroups.length === 1) {
      toast.success(`Shared to ${groupNames[0]}`);
    } else {
      toast.success(`Shared to ${selectedGroups.length} groups`);
    }

    // Reset and close
    setSelectedGroups([]);
    setSearchQuery("");
    onOpenChange(false);
  };

  const handleClose = () => {
    setSelectedGroups([]);
    setSearchQuery("");
    onOpenChange(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent side="bottom" className="h-[75vh] flex flex-col p-0 rounded-t-xl">
        {/* Header */}
        <SheetHeader className="px-6 pt-6 pb-4 border-b flex-shrink-0">
          <SheetTitle className="flex items-center gap-2">
            <Users2 className="w-5 h-5" />
            Share to Group
          </SheetTitle>
          <SheetDescription className="line-clamp-1">
            Share "{productTitle}" with your groups
          </SheetDescription>
        </SheetHeader>

        {/* Search */}
        <div className="px-6 pt-4 flex-shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search groups..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-10"
            />
          </div>
        </div>

        {/* Groups List */}
        <ScrollArea className="flex-1 px-6 py-4">
          <div className="space-y-2">
            {filteredGroups.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Users2 className="w-12 h-12 mx-auto mb-3 opacity-40" />
                <p>No groups found</p>
              </div>
            ) : (
              filteredGroups.map((group) => {
                const isSelected = selectedGroups.includes(group.id);
                return (
                  <button
                    key={group.id}
                    onClick={() => handleToggleGroup(group.id)}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors text-left"
                  >
                    {/* Checkbox */}
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => handleToggleGroup(group.id)}
                      className="flex-shrink-0"
                    />

                    {/* Avatar */}
                    <Avatar className="w-10 h-10 flex-shrink-0">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {getInitials(group.name)}
                      </AvatarFallback>
                    </Avatar>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{group.name}</p>
                      <p className="text-xs text-muted-foreground">
                        📍 {group.location} · {group.memberCount} members
                      </p>
                    </div>

                    {/* Selected Indicator */}
                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    )}
                  </button>
                );
              })
            )}
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="px-6 pt-4 pb-6 border-t flex-shrink-0">
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleClose}
              className="flex-1 h-11"
            >
              Cancel
            </Button>
            <Button
              onClick={handleShare}
              disabled={selectedGroups.length === 0}
              className="flex-1 h-11"
            >
              Share {selectedGroups.length > 0 && `(${selectedGroups.length})`}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
