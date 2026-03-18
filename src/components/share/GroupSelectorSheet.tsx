import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '../ui/sheet';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { ScrollArea } from '../ui/scroll-area';
import { Badge } from '../ui/badge';
import { toast } from 'sonner@2.0.3';

interface GroupSelectorSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onShare: (groupIds: string[]) => void;
}

// Mock groups data
const mockGroups = [
  { id: '1', name: 'Tech Deals Chile', memberCount: 1243, privacy: 'public' as const, type: 'Electronics' },
  { id: '2', name: 'Marketplace Santiago', memberCount: 856, privacy: 'public' as const, type: 'General' },
  { id: '3', name: 'Compra/Venta Local', memberCount: 432, privacy: 'private' as const, type: 'General' },
  { id: '4', name: 'Vintage Finds', memberCount: 289, privacy: 'public' as const, type: 'Fashion' },
  { id: '5', name: 'Gaming Community', memberCount: 567, privacy: 'public' as const, type: 'Gaming' },
];

export default function GroupSelectorSheet({ open, onOpenChange, onShare }: GroupSelectorSheetProps) {
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  
  const handleShare = () => {
    if (selectedGroups.length === 0) return;
    
    onShare(selectedGroups);
    toast.success(`Shared to ${selectedGroups.length} group${selectedGroups.length !== 1 ? 's' : ''}`);
    setSelectedGroups([]);
    onOpenChange(false);
  };
  
  const toggleGroup = (groupId: string) => {
    if (selectedGroups.includes(groupId)) {
      setSelectedGroups(selectedGroups.filter(id => id !== groupId));
    } else {
      setSelectedGroups([...selectedGroups, groupId]);
    }
  };
  
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] bg-gray-50/40">
        {/* Accessibility headers */}
        <SheetHeader className="sr-only">
          <SheetTitle>Share to Groups</SheetTitle>
          <SheetDescription>
            Select groups to share this listing with
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex flex-col h-full">
          <h2 className="text-lg font-semibold mb-4">Share to Groups</h2>
          
          <ScrollArea className="flex-1 -mx-4 px-4">
            <div className="space-y-2 pb-4">
              {mockGroups.map((group) => (
                <div 
                  key={group.id} 
                  className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100 hover:border-blue-200 transition-colors"
                >
                  <Checkbox
                    checked={selectedGroups.includes(group.id)}
                    onCheckedChange={() => toggleGroup(group.id)}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{group.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-xs text-gray-500">
                        {group.memberCount.toLocaleString()} members
                      </p>
                      <Badge 
                        variant={group.privacy === 'public' ? 'secondary' : 'outline'}
                        className="text-xs h-4 px-1"
                      >
                        {group.privacy}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          <Button 
            onClick={handleShare}
            disabled={selectedGroups.length === 0}
            className="mt-4 w-full"
          >
            Share to {selectedGroups.length} group{selectedGroups.length !== 1 ? 's' : ''}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}