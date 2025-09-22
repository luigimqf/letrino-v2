"use client";

import LeaderboardCard from "@/features/leaderboard/components/Card";
import DesktopPodium from "@/features/leaderboard/components/DesktopPodium";
import MobilePodium from "@/features/leaderboard/components/MobilePodium";
import { useLeaderboard } from "@/features/leaderboard/services/queries";
import { useMediaQuery } from "@/shared/hooks/useMediaQuery";
import { Trophy } from "lucide-react";
import LeaderboardSkeleton from "./skeleton";

export default function LeaderboardPage() {
  const { isDesktop } = useMediaQuery();
  const { data, isLoading, isError, error } = useLeaderboard();

  if (isLoading) {
    return <LeaderboardSkeleton isDesktop={isDesktop} />;
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Ops! Algo deu errado</h2>
          <p className="text-muted-foreground mb-6">{error?.message}</p>
        </div>
      </div>
    );
  }

  const leaderboard = data?.data?.leaderboard || [];
  const podiumUsers = leaderboard.slice(0, 3) || [];
  const otherUsers = leaderboard.slice(3) || [];

  if (leaderboard.length === 0) {
    return (
      <div className="px-4 py-6 lg:px-8">
        <div className="text-center mb-8 lg:mb-12">
          <div className="flex items-center justify-center mb-4">
            <Trophy className="h-10 w-10 text-primary mr-3" />
            <h1 className="text-3xl font-bold text-foreground">Leaderboard</h1>
          </div>
          <p className="text-muted-foreground text-sm">Os melhores jogadores do momento</p>
        </div>

        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Trophy className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Ainda não há dados disponíveis
            </h2>
            <p className="text-muted-foreground">Seja o primeiro a aparecer no leaderboard!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 lg:px-8 overflow-auto">
      <div className="text-center mb-8 lg:mb-12">
        <div className="flex items-center justify-center mb-4">
          <Trophy className="h-10 w-10 text-primary mr-3" />
          <h1 className="text-3xl font-bold text-foreground">Leaderboard</h1>
        </div>
        <p className="text-muted-foreground text-sm">Os melhores jogadores do momento</p>
      </div>

      {podiumUsers.length &&
        (isDesktop ? (
          <DesktopPodium podiumUsers={podiumUsers} />
        ) : (
          <MobilePodium podiumUsers={podiumUsers} />
        ))}

      <div className="max-w-4xl mx-auto space-y-3 lg:space-y-4">
        {otherUsers.map((user, index) => (
          <LeaderboardCard key={user.username} user={user} rank={index + 4} isPodium={false} />
        ))}
      </div>

      {data?.data?.user && (
        <div className="max-w-4xl mx-auto mt-6 lg:mt-8">
          <div className="text-center mb-4">
            <h3 className="text-lg lg:text-xl font-semibold text-foreground">Sua Posição</h3>
          </div>
          <LeaderboardCard isPodium={false} user={data.data.user} rank={data.data.user.position} />
        </div>
      )}
    </div>
  );
}
