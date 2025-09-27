export default function LeaderboardCardSkeleton({ isPodium = false }: { isPodium?: boolean }) {
  return (
    <div className={`bg-card border border-border rounded-lg p-4 ${isPodium ? "lg:p-6" : ""}`}>
      <div className="flex items-center space-x-4">
        {/* Rank/Icon Skeleton */}
        <div className="flex-shrink-0">
          <div className="h-6 w-6 bg-muted rounded animate-pulse" />
        </div>

        {/* Avatar Skeleton */}
        <div className="flex-shrink-0">
          <div
            className={`bg-muted rounded-full animate-pulse ${isPodium ? "h-12 w-12 lg:h-16 lg:w-16" : "h-10 w-10"}`}
          />
        </div>

        {/* User Info Skeleton */}
        <div className="flex-1 min-w-0">
          <div
            className={`bg-muted rounded animate-pulse mb-2 ${isPodium ? "h-5 w-24 lg:h-6 lg:w-32" : "h-4 w-20"}`}
          />
          <div className="h-3 w-16 bg-muted rounded animate-pulse" />
        </div>

        {/* Stats Skeleton */}
        <div className="flex-shrink-0 text-right">
          <div
            className={`bg-muted rounded animate-pulse mb-1 ${isPodium ? "h-6 w-16 lg:h-7 lg:w-20" : "h-5 w-14"}`}
          />
          <div className="h-3 w-12 bg-muted rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}
