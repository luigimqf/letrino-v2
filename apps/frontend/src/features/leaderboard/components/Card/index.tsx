/* eslint-disable @next/next/no-img-element */
import { ReactNode } from "react";
import { PlayerRank } from "../../types";

interface LeaderboardCardProps {
  user: PlayerRank;
  rank: number;
  isPodium: boolean;
  icon?: ReactNode;
}

export default function LeaderboardCard({ user, rank, isPodium, icon }: LeaderboardCardProps) {
  const getPodiumStyle = () => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-yellow-400/50";
      case 2:
        return "bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400/50";
      case 3:
        return "bg-gradient-to-r from-amber-600/20 to-amber-700/20 border-amber-600/50";
      default:
        return "bg-card border-border";
    }
  };

  const getRankStyle = () => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white";
      case 2:
        return "bg-gradient-to-r from-gray-400 to-gray-500 text-white";
      case 3:
        return "bg-gradient-to-r from-amber-600 to-amber-700 text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  if (isPodium) {
    return (
      <div
        className={`
        p-4 lg:p-6 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:scale-105 shadow-2xl
        ${getPodiumStyle()}
      `}
      >
        <div className="flex justify-center mb-3 lg:mb-4">{icon}</div>

        <div className="text-center space-y-3 lg:space-y-4">
          <div className="flex justify-center">
            <div className="relative w-16 h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden ring-4 ring-primary/30">
              <img
                src={user.avatar ?? ""}
                alt={`Avatar de ${user.username}`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div
            className={`
            inline-flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-full font-bold text-base lg:text-lg mx-auto
            ${getRankStyle()}
          `}
          >
            #{rank}
          </div>

          <div>
            <h3 className="text-lg lg:text-xl font-bold text-foreground mb-2 truncate">
              {user.username}
            </h3>
            <div className="space-y-1">
              <div className="text-xl lg:text-2xl font-bold text-foreground">
                {user.score.toLocaleString()}
              </div>
              <div className="text-xs lg:text-sm text-muted-foreground">pontos</div>
              <div className="text-xs lg:text-sm text-muted-foreground">
                {user.winRate}% vitórias
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`
      p-4 lg:p-6 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:shadow-xl
      ${getPodiumStyle()}
    `}
    >
      <div className="flex items-center space-x-3 lg:space-x-4">
        <div
          className={`
          flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-full font-bold text-base lg:text-lg shrink-0
          ${getRankStyle()}
        `}
        >
          #{rank}
        </div>

        <div className="relative w-12 h-12 lg:w-16 lg:h-16 rounded-full overflow-hidden ring-4 ring-primary/30 shrink-0">
          <img
            src={user.avatar ?? ""}
            alt={`Avatar de ${user.username}`}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg lg:text-xl font-bold text-foreground mb-1 truncate">
            {user.username}
          </h3>
          <div className="flex items-center space-x-2 lg:space-x-4 text-xs lg:text-sm">
            <span className="text-primary font-semibold">{user.score.toLocaleString()} pts</span>
            <span className="text-muted-foreground">{user.winRate}% vitórias</span>
          </div>
        </div>

        <div className="text-right shrink-0">
          <div className="text-lg lg:text-2xl font-bold text-foreground">
            {user.score.toLocaleString()}
          </div>
          <div className="text-xs lg:text-sm text-muted-foreground">pontos</div>
        </div>
      </div>
    </div>
  );
}
