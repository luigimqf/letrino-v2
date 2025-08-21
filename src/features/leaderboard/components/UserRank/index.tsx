import { User } from 'lucide-react';
import { LeaderboardUser } from '../../types';

interface UserRankCardProps {
  user: LeaderboardUser;
}

export default function UserRankCard({ user }: UserRankCardProps) {
  return (
    <div className="p-6 rounded-xl bg-gradient-to-r from-accent-500/20 to-accent-600/20 border border-accent-400/50 backdrop-blur-sm">
      <div className="flex items-center space-x-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent-500 text-white font-bold text-lg">
          #{user.position}
        </div>

        <div className="relative w-16 h-16 rounded-full overflow-hidden ring-4 ring-accent-400/50">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={`Avatar de ${user.username}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-primary-700 flex items-center justify-center">
              <User className="h-8 w-8 text-gray-400" />
            </div>
          )}
        </div>

        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-1">
            {user.username}
          </h3>
          <div className="flex items-center space-x-4 text-sm">
            <span className="text-accent-400 font-semibold">
              {user.score.toLocaleString()} pts
            </span>
            {user.winRate && (
              <span className="text-gray-300">
                {user.winRate}% vitórias
              </span>
            )}
          </div>
        </div>

        <div className="text-right">
          <div className="text-2xl font-bold text-white">
            {user.score.toLocaleString()}
          </div>
          <div className="text-sm text-gray-400">
            pontos
          </div>
        </div>
      </div>
    </div>
  );
}