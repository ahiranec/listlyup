/**
 * CompletionChecklist Component
 * Shows publishing setup completeness
 */

import { CheckCircle, Circle } from 'lucide-react';
import { PublishingCompleteness, calculateCompletenessScore } from '../types';

interface CompletionChecklistProps {
  completeness: PublishingCompleteness;
  variant?: 'summary' | 'detailed';
}

export function CompletionChecklist({ 
  completeness, 
  variant = 'summary' 
}: CompletionChecklistProps) {
  const score = calculateCompletenessScore(completeness);
  const isComplete = score === 5;

  if (variant === 'summary') {
    return (
      <div className={`flex items-center gap-2 text-sm ${isComplete ? 'text-green-700' : 'text-amber-700'}`}>
        {isComplete ? (
          <>
            <CheckCircle className="w-4 h-4" />
            <span className="font-medium">Publishing setup complete</span>
          </>
        ) : (
          <>
            <Circle className="w-4 h-4" />
            <span className="font-medium">Publishing setup: {score}/5</span>
          </>
        )}
      </div>
    );
  }

  // Detailed variant
  const items = [
    { key: 'contact', label: 'Default contact methods', completed: completeness.contact },
    { key: 'delivery', label: 'Default delivery options', completed: completeness.delivery },
    { key: 'visibility', label: 'Default visibility', completed: completeness.visibility },
    { key: 'currency', label: 'Default currency', completed: completeness.currency },
    { key: 'address', label: 'Default address', completed: completeness.address },
  ];

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.key} className="flex items-center gap-2 text-sm">
          {item.completed ? (
            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
          ) : (
            <Circle className="w-4 h-4 text-gray-400 flex-shrink-0" />
          )}
          <span className={item.completed ? 'text-foreground' : 'text-muted-foreground'}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
