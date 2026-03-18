import { Flag, AlertCircle, X, Shield, User, MessageSquare, CheckCircle2, ChevronLeft, Ban } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "../ui/sheet";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Checkbox } from "../ui/checkbox";
import { Textarea } from "../ui/textarea";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from "../ui/alert-dialog";
import { useState } from "react";
import { toast } from "sonner@2.0.3";

interface ReportGroupSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  group?: {
    id?: string;
    name: string;
    description?: string;
  };
  groupName?: string;
}

interface ReportOption {
  id: string;
  label: string;
  description: string;
  icon: any;
}

const REPORT_OPTIONS: ReportOption[] = [
  {
    id: "harassment",
    label: "Harassment or Bullying",
    description: "Members being targeted, bullied, or harassed",
    icon: AlertCircle
  },
  {
    id: "inappropriate",
    label: "Inappropriate Content",
    description: "Offensive, adult, or prohibited content being shared",
    icon: Flag
  },
  {
    id: "misleading",
    label: "Fake or Misleading",
    description: "False information, scams, or deceptive practices",
    icon: X
  },
  {
    id: "safety",
    label: "Safety Concern",
    description: "Dangerous, illegal, or harmful activities",
    icon: Shield
  },
  {
    id: "spam",
    label: "Spam or Bot Activity",
    description: "Automated spam, excessive promotion, or bot accounts",
    icon: MessageSquare
  },
  {
    id: "hate-speech",
    label: "Hate Speech or Discrimination",
    description: "Content promoting hatred, discrimination, or violence",
    icon: Ban
  },
  {
    id: "fake-account",
    label: "Fake or Impersonation",
    description: "Group impersonating others or using fake identity",
    icon: User
  }
];

export function ReportGroupSheet({ open, onOpenChange, group, groupName }: ReportGroupSheetProps) {
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Use group name from either prop
  const displayName = group?.name || groupName || "this group";

  const handleToggleReason = (reasonId: string) => {
    setSelectedReasons(prev => 
      prev.includes(reasonId) 
        ? prev.filter(id => id !== reasonId)
        : [...prev, reasonId]
    );
  };

  const handleSubmit = () => {
    if (selectedReasons.length === 0) return;
    
    console.log("Group report submitted:", { reasons: selectedReasons, details: additionalDetails });
    
    // Cerrar sheet y mostrar confirmación
    onOpenChange(false);
    setShowConfirmation(true);
    
    // Reset form
    setSelectedReasons([]);
    setAdditionalDetails("");
    
    toast.success("Report submitted. We'll review it shortly.");
  };

  const handleCancel = () => {
    onOpenChange(false);
    setSelectedReasons([]);
    setAdditionalDetails("");
  };

  const isValid = selectedReasons.length > 0;

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="bottom" className="h-[90vh] p-0">
          {/* Accessibility Header - Hidden */}
          <SheetHeader className="sr-only">
            <SheetTitle>Report Group</SheetTitle>
            <SheetDescription>
              Help us keep the community safe by reporting any issues with this group
            </SheetDescription>
          </SheetHeader>

          {/* Header con back button */}
          <div className="sticky top-0 bg-white border-b z-10">
            <div className="flex items-center h-14 px-4">
              <button
                onClick={handleCancel}
                className="icon-button hover:bg-muted transition-fast"
                aria-label="Go back"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex-1 text-center pr-10">
                <h2 className="text-sm text-muted-foreground uppercase tracking-wide">Group Page</h2>
              </div>
            </div>
            
            {/* Title + Subtitle */}
            <div className="px-4 pb-4 pt-2">
              <div className="flex items-center gap-2 mb-2">
                <Flag className="w-5 h-5 text-red-600" />
                <h3 className="text-lg">Report Group</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Help us understand what's wrong with "{displayName}"
              </p>
            </div>
          </div>
          
          <ScrollArea className="h-[calc(90vh-240px)]">
            <div className="px-4 py-4 space-y-3">
              {/* Report Options */}
              {REPORT_OPTIONS.map((option) => {
                const Icon = option.icon;
                const isSelected = selectedReasons.includes(option.id);
                
                return (
                  <div
                    key={option.id}
                    onClick={() => handleToggleReason(option.id)}
                    className={`w-full flex items-start gap-3 p-4 rounded-lg border transition-all cursor-pointer ${
                      isSelected 
                        ? 'border-red-600 bg-red-50' 
                        : 'border-gray-200 hover:border-red-200 hover:bg-red-50/50'
                    }`}
                  >
                    <Checkbox 
                      checked={isSelected}
                      className="mt-0.5 pointer-events-none"
                      aria-label={option.label}
                    />
                    <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${isSelected ? 'text-red-600' : 'text-muted-foreground'}`} />
                    <div className="flex-1">
                      <div className={isSelected ? 'text-red-900' : ''}>{option.label}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {option.description}
                      </div>
                    </div>
                  </div>
                );
              })}

              <Separator className="my-4" />

              {/* Additional Details - Always visible */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Additional details <span className="text-muted-foreground">(optional)</span>
                </label>
                <Textarea
                  value={additionalDetails}
                  onChange={(e) => setAdditionalDetails(e.target.value)}
                  placeholder="Provide any additional context that might help us review this report..."
                  className="min-h-[100px] resize-none"
                  maxLength={500}
                />
                <p className="text-xs text-muted-foreground text-right">
                  {additionalDetails.length}/500
                </p>
              </div>

              <Separator className="my-4" />
              
              {/* Info Box */}
              <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                <p className="text-sm font-medium">What happens next?</p>
                <p className="text-xs text-muted-foreground">
                  Our team will review your report within 24-48 hours. We may contact you for additional information. All reports are confidential.
                </p>
              </div>
            </div>
          </ScrollArea>

          {/* Footer - Sticky Bottom */}
          <div className="sticky bottom-0 bg-white border-t p-4 space-y-2">
            <button
              onClick={handleSubmit}
              disabled={!isValid}
              className={`touch-target w-full rounded-lg transition-base flex items-center justify-center gap-2 ${
                isValid
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              Submit Report
              {isValid && <CheckCircle2 className="w-4 h-4" />}
            </button>
            <button
              onClick={handleCancel}
              className="w-full py-2 text-sm text-muted-foreground hover:text-foreground transition-fast"
            >
              Cancel
            </button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Confirmation Modal */}
      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <AlertDialogTitle className="text-center">Report Submitted</AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              Thank you for helping keep our community safe. We'll review your report and take appropriate action.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowConfirmation(false)} className="w-full">
              Done
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}