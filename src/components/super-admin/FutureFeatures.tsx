/**
 * Future Features Component
 * List of features coming with Supabase
 */

import { FUTURE_FEATURES } from './constants';

export function FutureFeatures() {
  return (
    <div className="space-y-3">
      <h3 className="font-medium">Coming with Supabase:</h3>
      <ul className="text-sm text-muted-foreground space-y-2 ml-4">
        {FUTURE_FEATURES.map((feature, index) => (
          <li key={index}>• {feature}</li>
        ))}
      </ul>
    </div>
  );
}
