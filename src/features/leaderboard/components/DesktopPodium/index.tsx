import { Award, Medal, Trophy } from "lucide-react";
import { PlayerRank } from "../../types";
import LeaderboardCard from "../Card";

export default function DesktopPodium({ podiumUsers }: { podiumUsers: PlayerRank[] }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 mb-8 lg:mb-12 max-w-6xl mx-auto">
      {podiumUsers[1] && (
        <div className="col-start-1">
          <LeaderboardCard
            user={podiumUsers[1]}
            rank={2}
            isPodium={true}
            icon={<Medal className="h-5 w-5 lg:h-6 lg:w-6 text-muted-foreground" />}
          />
        </div>
      )}

      {podiumUsers[0] && (
        <div className="col-start-2 transform lg:scale-110 lg:-mt-4">
          <LeaderboardCard
            user={podiumUsers[0]}
            rank={1}
            isPodium={true}
            icon={<Trophy className="h-5 w-5 lg:h-6 lg:w-6 text-yellow-500" />}
          />
        </div>
      )}

      {podiumUsers[2] && (
        <div className="col-start-3">
          <LeaderboardCard
            user={podiumUsers[2]}
            rank={3}
            isPodium={true}
            icon={<Award className="h-5 w-5 lg:h-6 lg:w-6 text-amber-600" />}
          />
        </div>
      )}
    </div>
  );
}
