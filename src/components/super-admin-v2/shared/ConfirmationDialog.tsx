import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

type Severity = 'critical' | 'high' | 'medium' | 'warning';

interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
  description: string;
  severity: Severity;
  confirmText?: string;
  checkboxes?: string[];
}

export function ConfirmationDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  severity,
  confirmText,
  checkboxes = [],
}: ConfirmationDialogProps) {
  const [typeValue, setTypeValue] = useState('');
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    new Array(checkboxes.length).fill(false)
  );

  const isCritical = severity === 'critical';
  const isHigh = severity === 'high';
  const isWarning = severity === 'warning';
  const allChecked = checkboxes.length === 0 || checkedItems.every((v) => v);
  const typeMatches = !confirmText || typeValue === confirmText;
  const canConfirm = isWarning ? true : (allChecked && typeMatches);

  const handleConfirm = () => {
    if (canConfirm) {
      onConfirm?.();
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            {(isCritical || isWarning) && (
              <AlertTriangle className={`w-6 h-6 ${isCritical ? 'text-red-600' : 'text-yellow-600'}`} />
            )}
            <DialogTitle className={isCritical ? 'text-red-900' : isWarning ? 'text-yellow-900' : ''}>
              {title}
            </DialogTitle>
          </div>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {!isWarning && (
          <div className="space-y-4 py-4">
            {/* Checkboxes for HIGH severity */}
            {isHigh && checkboxes.length > 0 && (
              <div className="space-y-3">
                {checkboxes.map((label, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Checkbox
                      id={`check-${index}`}
                      checked={checkedItems[index]}
                      onCheckedChange={(checked) => {
                        const newChecked = [...checkedItems];
                        newChecked[index] = checked === true;
                        setCheckedItems(newChecked);
                      }}
                    />
                    <label
                      htmlFor={`check-${index}`}
                      className="text-sm text-gray-700 cursor-pointer leading-tight"
                    >
                      {label}
                    </label>
                  </div>
                ))}
              </div>
            )}

            {/* Type-to-confirm for CRITICAL severity */}
            {isCritical && confirmText && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">
                  Type "{confirmText}" to confirm:
                </p>
                <Input
                  value={typeValue}
                  onChange={(e) => setTypeValue(e.target.value)}
                  placeholder={confirmText}
                  className={typeMatches ? 'border-green-300' : ''}
                />
              </div>
            )}
          </div>
        )}

        <DialogFooter>
          {isWarning ? (
            <Button onClick={onClose}>OK</Button>
          ) : (
            <>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                variant={isCritical ? 'destructive' : 'default'}
                onClick={handleConfirm}
                disabled={!canConfirm}
              >
                Confirm
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}