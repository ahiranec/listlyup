/**
 * ActionQuickSheet Component
 * Sheet reutilizable para acciones con 1-3 inputs
 */

import { useState } from 'react';
import { ResponsiveModal } from '../shared/ResponsiveModal';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import type { ActionDefinition, ActionEntity, QuickSheetField } from '../../actions/types';

interface ActionQuickSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  action: ActionDefinition;
  entity: ActionEntity;
  onSubmit: (data: Record<string, any>) => void;
}

export function ActionQuickSheet({
  open,
  onOpenChange,
  action,
  entity,
  onSubmit,
}: ActionQuickSheetProps) {
  const fields = action.quickSheetFields || [];
  
  // Initialize form data with default values
  const initialData = fields.reduce((acc, field) => {
    acc[field.name] = field.defaultValue || '';
    return acc;
  }, {} as Record<string, any>);
  
  const [formData, setFormData] = useState(initialData);

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // Validate required fields
    const hasRequiredFields = fields
      .filter((f) => f.required)
      .every((f) => formData[f.name]);

    if (!hasRequiredFields) {
      return;
    }

    onSubmit(formData);
    onOpenChange(false);
    
    // Reset form
    setFormData(initialData);
  };

  const renderField = (field: QuickSheetField) => {
    switch (field.type) {
      case 'select':
        return (
          <Select
            value={formData[field.name]}
            onValueChange={(value) => handleChange(field.name, value)}
          >
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder || `Select ${field.label}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'textarea':
        return (
          <Textarea
            value={formData[field.name]}
            onChange={(e) => handleChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            rows={4}
          />
        );

      case 'number':
        return (
          <Input
            type="number"
            value={formData[field.name]}
            onChange={(e) => handleChange(field.name, e.target.value)}
            placeholder={field.placeholder}
          />
        );

      case 'date':
        return (
          <Input
            type="date"
            value={formData[field.name]}
            onChange={(e) => handleChange(field.name, e.target.value)}
          />
        );

      default:
        return (
          <Input
            type="text"
            value={formData[field.name]}
            onChange={(e) => handleChange(field.name, e.target.value)}
            placeholder={field.placeholder}
          />
        );
    }
  };

  const sheetTitle = action.quickSheetTitle || action.label;
  const sheetDescription =
    action.confirmDescription || `Fill in the details to ${action.label.toLowerCase()}`;

  return (
    <ResponsiveModal
      open={open}
      onOpenChange={onOpenChange}
      title={sheetTitle}
      description={sheetDescription}
      desktopMaxWidth="max-w-md"
      mobileHeight="h-[70vh]"
    >
      {/* Mobile: fill the sheet (header top, fields scroll, footer pinned bottom).
          Desktop (lg): natural compact height inside the centered dialog. */}
      <div className="flex flex-col flex-1 min-h-0 lg:flex-none p-6">
        {/* Header */}
        <div className="mb-5 space-y-1">
          <h2 className="text-lg font-semibold leading-snug">{sheetTitle}</h2>
          <p className="text-sm text-muted-foreground">{sheetDescription}</p>
        </div>

        {/* Fields */}
        <div className="flex-1 min-h-0 overflow-y-auto space-y-4">
          {fields.map((field) => (
            <div key={field.name} className="space-y-2">
              <Label htmlFor={field.name}>
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </Label>
              {renderField(field)}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex gap-2 pt-6">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="flex-1">
            {action.confirmLabel || action.label}
          </Button>
        </div>
      </div>
    </ResponsiveModal>
  );
}
