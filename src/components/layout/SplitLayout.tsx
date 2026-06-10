import { ReactNode } from 'react';

export interface SplitLayoutProps {
  left: ReactNode;
  right: ReactNode;
  leftRatio?: '1/3' | '1/2' | '2/3';
  mobileReverse?: boolean; // If true, right content shows on top in mobile
  className?: string;
}

const ratioClasses = {
  '1/3': 'lg:w-1/3',
  '1/2': 'lg:w-1/2',
  '2/3': 'lg:w-2/3',
};

const rightRatioClasses = {
  '1/3': 'lg:w-2/3',
  '1/2': 'lg:w-1/2',
  '2/3': 'lg:w-1/3',
};

/**
 * SplitLayout
 * 
 * A dual-pane layout providing a side-by-side experience on desktop,
 * and stacking vertically on mobile.
 * 
 * Best used for: Map on right / List on left, or visual preview on left / form on right.
 */
export function SplitLayout({ 
  left, 
  right, 
  leftRatio = '1/2', 
  mobileReverse = false,
  className = '' 
}: SplitLayoutProps) {
  return (
    <div className={`flex flex-col ${mobileReverse ? 'flex-col-reverse' : ''} lg:flex-row h-full w-full overflow-hidden ${className}`}>
      {/* Left Pane */}
      <div className={`w-full h-1/2 lg:h-full ${ratioClasses[leftRatio]} flex flex-col relative`}>
        {left}
      </div>

      {/* Right Pane */}
      <div className={`w-full h-1/2 lg:h-full ${rightRatioClasses[leftRatio]} flex flex-col relative`}>
        {right}
      </div>
    </div>
  );
}
