/**
 * ProductCardSkeleton - Loading state with shimmer effect
 * Matches the exact height and structure of ProductCard
 */
export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-white to-gray-50/30 rounded-xl border border-gray-200/60 overflow-hidden">
      {/* Image Skeleton */}
      <div className="relative h-[180px] sm:h-[220px] bg-gray-200 overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
      </div>

      {/* Content Skeleton */}
      <div className="flex flex-col gap-2.5 px-[var(--space-md)] py-[var(--space-md)] sm:px-[var(--space-lg)] sm:py-[var(--space-lg)]">
        {/* Title Lines */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded-md w-full relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          </div>
          <div className="h-4 bg-gray-200 rounded-md w-3/4 relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          </div>
        </div>

        {/* Info Lines */}
        <div className="space-y-1.5">
          <div className="h-3.5 bg-gray-200 rounded-md w-2/3 relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          </div>
          <div className="h-3.5 bg-gray-200 rounded-md w-1/2 relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          </div>
        </div>

        {/* Badge Skeleton */}
        <div className="h-6 bg-gray-200 rounded-full w-24 relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
        </div>
      </div>

      {/* Button Skeleton */}
      <div className="mt-auto px-[var(--space-md)] pb-[var(--space-md)] sm:px-[var(--space-lg)] sm:pb-[var(--space-lg)]">
        <div className="h-10 bg-gray-200 rounded-lg w-full relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
        </div>
      </div>
    </div>
  );
}