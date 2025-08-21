'use client';

import { Trophy, Medal, Award } from 'lucide-react';
import LeaderboardCard from '@/features/leaderboard/components/Card';
import UserRankCard from '@/features/leaderboard/components/UserRank';
import { useLeaderboard } from '@/features/leaderboard/services/queries';

export default function LeaderboardPage() {
  const {data, isLoading, isSuccess, error} = useLeaderboard();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isSuccess) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Ops! Algo deu errado</h2>
          <p className="text-muted-foreground mb-6">{error?.message}</p>
        </div>
      </div>
    );
  }

  const podiumUsers = data?.data?.leaderboard.slice(0, 3) || [];
  const otherUsers = data?.data?.leaderboard.slice(3) || [];

  return (
    <div className="px-4 py-6 lg:px-8 overflow-auto">
      <div className="text-center mb-8 lg:mb-12">
        <div className="flex items-center justify-center mb-4">
          <Trophy className="h-10 w-10 text-primary mr-3" />
          <h1 className="text-3xl font-bold text-foreground">
            Leaderboard
          </h1>
        </div>
        <p className="text-muted-foreground text-sm">
          Os melhores jogadores do momento
        </p>
      </div>

      {podiumUsers.length && (
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
      )}

      <div className="max-w-4xl mx-auto space-y-3 lg:space-y-4">
        {otherUsers.map((user, index) => (
          <LeaderboardCard 
            key={user.username} 
            user={user} 
            rank={index + 4}
            isPodium={false}
          />
        ))}
      </div>

      {data?.data?.user && (
        <div className="max-w-4xl mx-auto mt-6 lg:mt-8">
          <div className="text-center mb-4">
            <h3 className="text-lg lg:text-xl font-semibold text-foreground">Sua Posição</h3>
          </div>
          <UserRankCard user={data.data.user} />
        </div>
      )}
    </div>
  );
}