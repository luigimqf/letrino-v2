"use client";

import StatCard from "@/features/auth/components/StatCard";
import { useUserStatistics } from "@/features/auth/services/queries";
import { Statistics } from "@/features/auth/types";
import { useMediaQuery } from "@/shared/hooks/useMediaQuery";
import { RootState } from "@/shared/store";
import { BarChart3, Star, Target, TrendingUp, Trophy, User, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const DEFAULT_STATISTIC: Statistics = {
  gamesPlayed: 0,
  gamesWon: 0,
  winStreak: 0,
  bestWinStreak: 0,
  score: 0,
  winPercentage: 0,
};

export default function UserStatisticPage() {
  const { isDesktop } = useMediaQuery();
  const { data: statisticResult, isLoading } = useUserStatistics();
  const { user } = useSelector((state: RootState) => state.auth);
  const [userStatistic, setUserStatistic] = useState(DEFAULT_STATISTIC);

  useEffect(() => {
    if (!isLoading && !statisticResult?.data) {
      toast.error("Erro ao carregar estatísticas do usuário");
      return;
    }
    setUserStatistic(statisticResult?.data ?? DEFAULT_STATISTIC);
  }, [statisticResult, isLoading]);

  if (isLoading) {
    return <UserStatisticSkeleton isDesktop={isDesktop} />;
  }

  return (
    <div className="px-4 py-6 lg:px-8 min-h-screen bg-background overflow-auto">
      <div className="text-center mb-8 lg:mb-12">
        <div className="flex items-center justify-center mb-4">
          <User className="h-10 w-10 text-primary mr-3" />
          <h1 className="text-3xl font-bold text-foreground">Meu Perfil</h1>
        </div>
        <p className="text-muted-foreground text-sm">Suas estatísticas e conquistas</p>
      </div>

      <div className="max-w-4xl mx-auto mb-8">
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center text-foreground mb-2">{user?.username}</h2>
          <div className="text-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
              <Trophy className="h-4 w-4 mr-1" />
              {userStatistic.score} pontos
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className={`grid gap-4 ${isDesktop ? "grid-cols-3" : "grid-cols-1"} mb-8`}>
          <StatCard
            icon={<Target className="h-6 w-6" />}
            title="Jogos Jogados"
            value={userStatistic.gamesPlayed.toString()}
            subtitle="Total de partidas"
            color="text-blue-500"
            bgColor="bg-blue-500/10"
          />

          <StatCard
            icon={<Trophy className="h-6 w-6" />}
            title="Jogos Ganhos"
            value={userStatistic.gamesWon.toString()}
            subtitle="Vitórias conquistadas"
            color="text-green-500"
            bgColor="bg-green-500/10"
          />

          <StatCard
            icon={<BarChart3 className="h-6 w-6" />}
            title="Taxa de Vitória"
            value={`${userStatistic.winPercentage}%`}
            subtitle="Porcentagem de sucesso"
            color="text-purple-500"
            bgColor="bg-purple-500/10"
          />
        </div>

        <div className={`grid gap-4 ${isDesktop ? "grid-cols-3" : "grid-cols-1"}`}>
          <StatCard
            icon={<TrendingUp className="h-6 w-6" />}
            title="Sequência Atual"
            value={userStatistic.winStreak.toString()}
            subtitle="Vitórias seguidas"
            color="text-orange-500"
            bgColor="bg-orange-500/10"
          />

          <StatCard
            icon={<Zap className="h-6 w-6" />}
            title="Melhor Sequência"
            value={userStatistic.bestWinStreak.toString()}
            subtitle="Recorde pessoal"
            color="text-yellow-500"
            bgColor="bg-yellow-500/10"
          />

          <StatCard
            icon={<Star className="h-6 w-6" />}
            title="Pontuação Total"
            value={userStatistic.score.toLocaleString()}
            subtitle="Pontos acumulados"
            color="text-pink-500"
            bgColor="bg-pink-500/10"
          />
        </div>
      </div>
    </div>
  );
}

function UserStatisticSkeleton({ isDesktop }: { isDesktop: boolean }) {
  return (
    <div className="px-4 py-6 lg:px-8 min-h-screen bg-background overflow-auto">
      <div className="text-center mb-8 lg:mb-12">
        <div className="flex items-center justify-center mb-4">
          <div className="h-10 w-10 bg-muted rounded mr-3 animate-pulse" />
          <div className="h-8 w-40 bg-muted rounded animate-pulse" />
        </div>
        <div className="h-4 w-56 bg-muted rounded mx-auto animate-pulse" />
      </div>

      <div className="max-w-4xl mx-auto mb-8">
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-muted rounded-full animate-pulse" />
          </div>
          <div className="h-8 w-32 bg-muted rounded mx-auto mb-2 animate-pulse" />
          <div className="flex justify-center">
            <div className="h-6 w-24 bg-muted rounded-full animate-pulse" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className={`grid gap-4 ${isDesktop ? "grid-cols-3" : "grid-cols-1"} mb-8`}>
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </div>

        <div className={`grid gap-4 ${isDesktop ? "grid-cols-3" : "grid-cols-1"}`}>
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </div>
      </div>
    </div>
  );
}

function StatCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <div className="flex items-center mb-4">
        {/* Icon Skeleton */}
        <div className="w-12 h-12 bg-muted rounded-lg mr-4 animate-pulse" />

        <div className="flex-1">
          {/* Title Skeleton */}
          <div className="h-5 w-24 bg-muted rounded mb-2 animate-pulse" />
          {/* Subtitle Skeleton */}
          <div className="h-3 w-32 bg-muted rounded animate-pulse" />
        </div>
      </div>

      {/* Value Skeleton */}
      <div className="h-8 w-16 bg-muted rounded animate-pulse" />
    </div>
  );
}
