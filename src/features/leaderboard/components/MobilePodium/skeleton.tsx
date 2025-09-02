import LeaderboardCardSkeleton from "../Card/skeleton";

export default function MobilePodiumSkeleton() {
  return (
    <div className="mb-8 max-w-md mx-auto">
      <div className="mb-6">
        <LeaderboardCardSkeleton isPodium />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <LeaderboardCardSkeleton isPodium />
        <LeaderboardCardSkeleton isPodium />
      </div>
    </div>
  );
}
