/**
 * Step Indicator for Publish Flow
 * Shows progress through the 5-step wizard
 * Supports jump navigation in EDIT mode
 */

import { Check } from 'lucide-react';
import { motion } from 'motion/react';
import { PUBLISH_STEPS, type PublishStep } from './types';

interface StepIndicatorProps {
  mode?: 'create' | 'edit';
  currentStep: PublishStep;
  completedSteps: PublishStep[];
  onStepClick?: (step: PublishStep) => void;
}

export function StepIndicator({ 
  mode = 'create',
  currentStep, 
  completedSteps,
  onStepClick,
}: StepIndicatorProps) {
  const currentStepOrder = PUBLISH_STEPS.find(s => s.id === currentStep)?.order || 1;
  
  const handleStepClick = (step: PublishStep) => {
    // Only allow clicking in edit mode and on completed steps
    const isClickable = mode === 'edit' && completedSteps.includes(step);
    if (isClickable && onStepClick) {
      onStepClick(step);
    }
  };
  
  return (
    <div className="px-4 py-3 bg-white border-b">
      <div className="flex items-center justify-between max-w-md mx-auto">
        {PUBLISH_STEPS.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id);
          const isCurrent = step.id === currentStep;
          const isAccessible = step.order <= currentStepOrder;
          const isClickable = mode === 'edit' && isCompleted && !isCurrent;
          
          return (
            <div key={step.id} className="flex items-center flex-1">
              {/* Step Circle */}
              <div className="relative flex flex-col items-center">
                <button
                  onClick={() => handleStepClick(step.id)}
                  disabled={!isClickable}
                  className={`
                    relative focus:outline-none
                    ${isClickable ? 'cursor-pointer hover:scale-110' : 'cursor-default'}
                    transition-transform
                  `}
                  title={isClickable ? `Jump to ${step.title}` : undefined}
                >
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ 
                      scale: isCurrent ? 1.1 : 1,
                    }}
                    className={`
                      w-8 h-8 rounded-full flex items-center justify-center
                      transition-all duration-300 relative z-10
                      ${isCompleted 
                        ? 'bg-primary text-white' 
                        : isCurrent 
                          ? 'bg-primary text-white ring-4 ring-primary/20' 
                          : isAccessible
                            ? 'bg-gray-200 text-gray-600'
                            : 'bg-gray-100 text-gray-400'
                      }
                    `}
                  >
                    {isCompleted ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <span className="text-xs font-semibold">{step.order}</span>
                    )}
                  </motion.div>
                </button>
                
                {/* Step Label (only on current) */}
                {isCurrent && (
                  <motion.span
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-11 text-xs font-medium text-primary whitespace-nowrap"
                  >
                    {step.title}
                  </motion.span>
                )}
                
                {/* Clickable hint on hover (edit mode only) */}
                {isClickable && (
                  <span className="absolute top-11 text-xs text-muted-foreground opacity-0 hover:opacity-100 whitespace-nowrap pointer-events-none">
                    {step.title}
                  </span>
                )}
              </div>
              
              {/* Connector Line */}
              {index < PUBLISH_STEPS.length - 1 && (
                <div className="flex-1 h-0.5 mx-1 relative">
                  <div className="absolute inset-0 bg-gray-200" />
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ 
                      scaleX: isCompleted ? 1 : 0 
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-primary origin-left"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}