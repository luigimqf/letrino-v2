import LeaderboardCardSkeleton from "../Card/skeleton";

export default function DesktopPodiumSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 mb-8 lg:mb-12 max-w-6xl mx-auto">
      <div className="col-start-1">
        <LeaderboardCardSkeleton isPodium />
      </div>
      <div className="col-start-2 transform lg:scale-110 lg:-mt-4">
        <LeaderboardCardSkeleton isPodium />
      </div>
      <div className="col-start-3">
        <LeaderboardCardSkeleton isPodium />
      </div>
    </div>
  );
}
