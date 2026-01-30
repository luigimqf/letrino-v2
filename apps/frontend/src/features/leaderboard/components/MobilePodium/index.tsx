import { Award, Medal, Trophy } from "lucide-react";
import { PlayerRank } from "../../types";
import LeaderboardCard from "../Card";

export default function MobilePodium({ podiumUsers }: { podiumUsers: PlayerRank[] }) {
  return (
    <div className="mb-8 max-w-md mx-auto">
      {podiumUsers[0] && (
        <div className="mb-6">
          <LeaderboardCard
            user={podiumUsers[0]}
            rank={1}
            isPodium={true}
            icon={<Trophy className="h-5 w-5 text-yellow-500" />}
          />
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        {podiumUsers[1] && (
          <LeaderboardCard
            user={podiumUsers[1]}
            rank={2}
            isPodium={true}
            icon={<Medal className="h-4 w-4 text-slate-400" />}
          />
        )}

        {podiumUsers[2] && (
          <LeaderboardCard
            user={podiumUsers[2]}
            rank={3}
            isPodium={true}
            icon={<Award className="h-4 w-4 text-amber-600" />}
          />
        )}
      </div>
    </div>
  );
}
