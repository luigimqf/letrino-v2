'use client';

import { useState, useEffect } from 'react';
import { Trophy, Medal, Award } from 'lucide-react';
import LeaderboardCard from '@/features/leaderboard/components/Card';
import UserRankCard from '@/features/leaderboard/components/UserRank';
import { LeaderboardResponse } from '@/features/leaderboard/types';

const mockData: LeaderboardResponse = {
  success: true,
  data: {
    leaderboard: [
      {
        avatar: "https://api.dicebear.com/9.x/fun-emoji/svg?seed=Champion",
        username: "ProGamer2024",
        score: 1250,
        position: 1,
        winRate: 87
      },
      {
        avatar: "https://api.dicebear.com/9.x/fun-emoji/svg?seed=Silver",
        username: "QuizMaster",
        score: 1180,
        position: 2,
        winRate: 82
      },
      {
        avatar: "https://api.dicebear.com/9.x/fun-emoji/svg?seed=Bronze",
        username: "WordWizard",
        score: 1045,
        position: 3,
        winRate: 79
      },
      {
        avatar: "https://api.dicebear.com/9.x/fun-emoji/svg?seed=Player4",
        username: "LetterLegend",
        score: 920,
        position: 4,
        winRate: 75
      },
      {
        avatar: "https://api.dicebear.com/9.x/fun-emoji/svg?seed=Player5",
        username: "AlphabetAce",
        score: 865,
        position: 5,
        winRate: 71
      },
      {
        avatar: "https://api.dicebear.com/9.x/fun-emoji/svg?seed=Player6",
        username: "VocabVanguard",
        score: 790,
        position: 6,
        winRate: 68
      },
      {
        avatar: "https://api.dicebear.com/9.x/fun-emoji/svg?seed=Player7",
        username: "PuzzlePro",
        score: 745,
        position: 7,
        winRate: 65
      },
      {
        avatar: "https://api.dicebear.com/9.x/fun-emoji/svg?seed=Player8",
        username: "GameGuru",
        score: 680,
        position: 8,
        winRate: 62
      },
      {
        avatar: "https://api.dicebear.com/9.x/fun-emoji/svg?seed=Player9",
        username: "BrainBooster",
        score: 635,
        position: 9,
        winRate: 59
      },
      {
        avatar: "https://api.dicebear.com/9.x/fun-emoji/svg?seed=Player10",
        username: "ThinkTank",
        score: 590,
        position: 10,
        winRate: 56
      }
    ],
    user: {
      avatar: "https://api.dicebear.com/9.x/fun-emoji/svg?seed=CurrentUser",
      username: "VoceProprio",
      score: 425,
      position: 23,
      winRate: 48
    }
  },
  message: null
};

export default function LeaderboardPage() {
  const [data, setData] = useState<LeaderboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setData(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      setError(null);
      
      setTimeout(() => {
        setData(mockData);
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError('Erro de conexão');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-accent-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ops! Algo deu errado</h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <button 
            onClick={fetchLeaderboard}
            className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 lg:px-8">
      <div className="text-center mb-8 lg:mb-12">
        <div className="flex items-center justify-center mb-4">
          <Trophy className="h-10 w-10 lg:h-12 lg:w-12 text-accent-400 mr-3" />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Leaderboard
          </h1>
        </div>
        <p className="text-gray-300 text-base lg:text-lg">
          Os melhores jogadores do momento
        </p>
      </div>

      {data?.data.leaderboard.length && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 mb-8 lg:mb-12 max-w-6xl mx-auto">
          {data.data.leaderboard[1] && (
            <div className="order-2 lg:order-1">
              <LeaderboardCard 
                user={data.data.leaderboard[1]} 
                rank={2}
                isPodium={true}
                icon={<Medal className="h-5 w-5 lg:h-6 lg:w-6 text-gray-400" />}
              />
            </div>
          )}
          
          {data.data.leaderboard[0] && (
            <div className="order-1 lg:order-2 transform lg:scale-110 lg:-mt-4">
              <LeaderboardCard 
                user={data.data.leaderboard[0]} 
                rank={1}
                isPodium={true}
                icon={<Trophy className="h-5 w-5 lg:h-6 lg:w-6 text-yellow-400" />}
              />
            </div>
          )}
          
          {data.data.leaderboard[2] && (
            <div className="order-3 lg:order-3">
              <LeaderboardCard 
                user={data.data.leaderboard[2]} 
                rank={3}
                isPodium={true}
                icon={<Award className="h-5 w-5 lg:h-6 lg:w-6 text-amber-600" />}
              />
            </div>
          )}
        </div>
      )}

      <div className="max-w-4xl mx-auto space-y-3 lg:space-y-4">
        {data?.data.leaderboard.slice(3).map((user, index) => (
          <LeaderboardCard 
            key={user.username} 
            user={user} 
            rank={index + 4}
            isPodium={false}
          />
        ))}
      </div>

      {data?.data.user && (
        <div className="max-w-4xl mx-auto mt-6 lg:mt-8">
          <div className="text-center mb-4">
            <h3 className="text-lg lg:text-xl font-semibold text-white">Sua Posição</h3>
          </div>
          <UserRankCard user={data.data.user} />
        </div>
      )}
    </div>
  );
}