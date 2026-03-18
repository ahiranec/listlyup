/**
 * Flow Header
 * Header with title, close button, and step indicator
 * Supports CREATE and EDIT modes with change detection
 */

import { X } from 'lucide-react';
import { StepIndicator } from './StepIndicator';
import type { PublishStep } from './types';

interface FlowHeaderProps {
  mode?: 'create' | 'edit';
  changeCount?: number;
  currentStep: PublishStep;
  completedSteps: PublishStep[];
  onClose: () => void;
  onStepClick?: (step: PublishStep) => void;
}

export function FlowHeader({ 
  mode = 'create',
  changeCount = 0,
  currentStep, 
  completedSteps, 
  onClose,
  onStepClick,
}: FlowHeaderProps) {
  return (
    <div className="border-b bg-white">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <h1 className="font-semibold">
            {mode === 'edit' ? 'Edit Listing' : 'New Listing'}
          </h1>
          {mode === 'edit' && changeCount > 0 && (
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
              {changeCount} change{changeCount > 1 ? 's' : ''}
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <StepIndicator 
        mode={mode}
        currentStep={currentStep} 
        completedSteps={completedSteps}
        onStepClick={onStepClick}
      />
    </div>
  );
}