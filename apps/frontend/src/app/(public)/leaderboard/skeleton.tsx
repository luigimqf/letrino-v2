import LeaderboardCardSkeleton from "@/features/leaderboard/components/Card/skeleton";
import DesktopPodiumSkeleton from "@/features/leaderboard/components/DesktopPodium/skeleton";
import MobilePodiumSkeleton from "@/features/leaderboard/components/MobilePodium/skeleton";

export default function LeaderboardSkeleton({ isDesktop }: { isDesktop: boolean }) {
  return (
    <div className="px-4 py-6 lg:px-8 overflow-auto">
      {/* Header Skeleton */}
      <div className="text-center mb-8 lg:mb-12">
        <div className="flex items-center justify-center mb-4">
          <div className="h-10 w-10 bg-muted rounded mr-3 animate-pulse" />
          <div className="h-8 w-48 bg-muted rounded animate-pulse" />
        </div>
        <div className="h-4 w-64 bg-muted rounded mx-auto animate-pulse" />
      </div>

      {isDesktop ? <DesktopPodiumSkeleton /> : <MobilePodiumSkeleton />}

      <div className="max-w-4xl mx-auto space-y-3 lg:space-y-4">
        {Array.from({ length: 7 }).map((_, index) => (
          <LeaderboardCardSkeleton key={index} />
        ))}
      </div>

      <div className="max-w-4xl mx-auto mt-6 lg:mt-8">
        <div className="text-center mb-4">
          <div className="h-6 w-32 bg-muted rounded mx-auto animate-pulse" />
        </div>
        <LeaderboardCardSkeleton />
      </div>
    </div>
  );
}
