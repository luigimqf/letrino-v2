import { LeaderboardUser } from '../../types';
import { User } from 'lucide-react';

interface UserRankCardProps {
  user: LeaderboardUser;
}

export default function UserRankCard({ user }: UserRankCardProps) {
  return (
    <div className="p-6 rounded-xl bg-gradient-to-r from-primary/10 to-primary/20 border border-primary/30 backdrop-blur-sm">
      <div className="flex items-center space-x-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg">
          #{user.position}
        </div>

        <div className="relative w-16 h-16 rounded-full overflow-hidden ring-4 ring-primary/50">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={`Avatar de ${user.username}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <User className="h-8 w-8 text-muted-foreground" />
            </div>
          )}
        </div>

        <div className="flex-1">
          <h3 className="text-xl font-bold text-foreground mb-1">
            {user.username}
          </h3>
          <div className="flex items-center space-x-4 text-sm">
            <span className="text-primary font-semibold">
              {user.score.toLocaleString()} pts
            </span>
            {user.winRate && (
              <span className="text-muted-foreground">
                {user.winRate}% vitórias
              </span>
            )}
          </div>
        </div>

        <div className="text-right">
          <div className="text-2xl font-bold text-foreground">
            {user.score.toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground">
            pontos
          </div>
        </div>
      </div>
    </div>
  );
}