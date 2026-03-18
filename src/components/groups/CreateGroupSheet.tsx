import { useState } from "react";
import { ImagePlus, Globe, Link2, ShieldCheck } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "../ui/sheet";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { toast } from "sonner@2.0.3";
import { cn } from "../ui/utils";

interface CreateGroupSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete?: () => void;
}

type GroupTypeOption = "public" | "private-link" | "private-approval";

export function CreateGroupSheet({ open, onOpenChange, onComplete }: CreateGroupSheetProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [groupType, setGroupType] = useState<GroupTypeOption>("public");

  const handleCreate = () => {
    if (!name.trim()) {
      toast.error("Please enter a group name");
      return;
    }

    if (!location.trim()) {
      toast.error("Please enter a location");
      return;
    }

    toast.success(`Group "${name}" created successfully!`);
    onOpenChange(false);
    
    // Reset form
    setName("");
    setDescription("");
    setLocation("");
    setAvatarUrl("");
    setGroupType("public");

    // Notify parent of completion
    if (onComplete) {
      onComplete();
    }
  };

  const getInitials = (name: string) => {
    if (!name) return "GR";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const groupTypeOptions = [
    {
      id: "public" as GroupTypeOption,
      label: "Public",
      description: "Anyone can find and join",
      icon: Globe,
      disabled: false,
    },
    {
      id: "private-link" as GroupTypeOption,
      label: "Private (link access)",
      description: "Only people with the link can join",
      icon: Link2,
      disabled: false,
    },
    {
      id: "private-approval" as GroupTypeOption,
      label: "Private (approval)",
      description: "Coming Soon",
      icon: ShieldCheck,
      disabled: true,
    },
  ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] flex flex-col p-0 rounded-t-xl">
        <SheetHeader className="px-6 pt-6 pb-4 border-b">
          <SheetTitle>Create New Group</SheetTitle>
          <SheetDescription>
            Create a group to connect with people in your community
          </SheetDescription>
        </SheetHeader>

        {/* Form */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="space-y-6">
            {/* Avatar */}
            <div className="flex flex-col items-center gap-3">
              <Avatar className="w-24 h-24">
                <AvatarImage src={avatarUrl} alt={name || "Group"} />
                <AvatarFallback className="bg-primary/10 text-primary text-xl">
                  {getInitials(name)}
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm" className="gap-2">
                <ImagePlus className="w-4 h-4" />
                Upload Photo
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Optional - Add a group photo
              </p>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="group-name">
                Group Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="group-name"
                placeholder="e.g., Vecinos Valparaíso"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={50}
              />
              <p className="text-xs text-muted-foreground">
                {name.length}/50 characters
              </p>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="group-description">Description</Label>
              <Textarea
                id="group-description"
                placeholder="Tell people what this group is about..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={200}
                rows={4}
              />
              <p className="text-xs text-muted-foreground">
                {description.length}/200 characters
              </p>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="group-location">
                Location <span className="text-destructive">*</span>
              </Label>
              <Input
                id="group-location"
                placeholder="e.g., Valparaíso"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            {/* Group Type */}
            <div className="space-y-3">
              <Label>
                Group Type <span className="text-destructive">*</span>
              </Label>
              <div className="space-y-2">
                {groupTypeOptions.map((option) => {
                  const Icon = option.icon;
                  const isSelected = groupType === option.id;
                  const isDisabled = option.disabled;

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => !isDisabled && setGroupType(option.id)}
                      disabled={isDisabled}
                      className={cn(
                        "w-full p-4 rounded-lg border-2 transition-all text-left",
                        isDisabled && "opacity-50 cursor-not-allowed",
                        !isDisabled && "hover:border-primary/40 cursor-pointer",
                        isSelected && !isDisabled
                          ? "border-primary bg-primary/5"
                          : "border-border bg-card"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                            isSelected && !isDisabled
                              ? "bg-primary/10"
                              : "bg-muted"
                          )}
                        >
                          <Icon
                            className={cn(
                              "w-5 h-5",
                              isSelected && !isDisabled
                                ? "text-primary"
                                : "text-muted-foreground"
                            )}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3
                              className={cn(
                                "font-medium",
                                isSelected && !isDisabled
                                  ? "text-primary"
                                  : "text-foreground"
                              )}
                            >
                              {option.label}
                            </h3>
                            {isDisabled && (
                              <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                                Coming Soon
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-0.5">
                            {option.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <SheetFooter className="sticky bottom-0 pt-4 pb-6 px-6 border-t bg-background">
          <div className="flex gap-3 w-full">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              className="flex-1"
            >
              Create Group
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}