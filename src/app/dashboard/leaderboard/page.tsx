'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { getLeaderboard, getUserRank } from '@/lib/firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Trophy,
  Medal,
  Crown,
  Star,
  User,
  Flame,
  Zap,
} from 'lucide-react';

interface LeaderboardUser {
  id: string;
  rank: number;
  name: string;
  totalXP: number;
  currentLevel: number;
  streak: number;
  photoURL?: string;
}

export default function LeaderboardPage() {
  const { user, profile } = useAuth();
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [userRank, setUserRank] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'all' | 'weekly' | 'monthly'>('all');

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const [data, rank] = await Promise.all([
          getLeaderboard(50),
          user ? getUserRank(user.uid) : null,
        ]);
        setLeaderboard(data as LeaderboardUser[]);
        setUserRank(rank);
      } catch (error) {
        console.error('리더보드 로드 오류:', error);
      } finally {
        setLoading(false);
      }
    }
    loadLeaderboard();
  }, [user]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="text-gray-500 font-bold">{rank}</span>;
    }
  };

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-300';
      case 2:
        return 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-300';
      case 3:
        return 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-300';
      default:
        return 'bg-white border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold mb-2">리더보드</h1>
        <p className="text-gray-600">
          최고의 학습자들과 경쟁하세요!
        </p>
      </motion.div>

      {/* 내 순위 */}
      {user && profile?.role === 'student' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
                    {profile?.name?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <p className="text-blue-100 text-sm">나의 순위</p>
                    <p className="text-3xl font-bold">
                      {userRank ? `#${userRank}` : '-'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 text-yellow-300 mb-1">
                    <Zap className="w-5 h-5" />
                    <span className="text-xl font-bold">{profile?.totalXP || 0} XP</span>
                  </div>
                  <div className="flex items-center gap-2 text-orange-300">
                    <Flame className="w-4 h-4" />
                    <span>{profile?.streak || 0}일 연속</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* 기간 필터 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex gap-2"
      >
        {[
          { key: 'all', label: '전체' },
          { key: 'monthly', label: '이번 달' },
          { key: 'weekly', label: '이번 주' },
        ].map((range) => (
          <button
            key={range.key}
            onClick={() => setTimeRange(range.key as 'all' | 'weekly' | 'monthly')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              timeRange === range.key
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {range.label}
          </button>
        ))}
      </motion.div>

      {/* 상위 3명 */}
      {!loading && leaderboard.length >= 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-3 gap-4"
        >
          {/* 2등 */}
          <div className="flex flex-col items-center pt-8">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-white text-2xl font-bold">
                {leaderboard[1]?.name?.charAt(0) || '?'}
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <Medal className="w-5 h-5 text-gray-600" />
              </div>
            </div>
            <p className="mt-3 font-semibold truncate max-w-full">{leaderboard[1]?.name}</p>
            <p className="text-sm text-gray-500">{leaderboard[1]?.totalXP || 0} XP</p>
          </div>

          {/* 1등 */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg"
              >
                {leaderboard[0]?.name?.charAt(0) || '?'}
              </motion.div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <Crown className="w-6 h-6 text-yellow-500" />
              </div>
            </div>
            <p className="mt-3 font-bold text-lg truncate max-w-full">{leaderboard[0]?.name}</p>
            <p className="text-yellow-600 font-semibold">{leaderboard[0]?.totalXP || 0} XP</p>
          </div>

          {/* 3등 */}
          <div className="flex flex-col items-center pt-12">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white text-xl font-bold">
                {leaderboard[2]?.name?.charAt(0) || '?'}
              </div>
              <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-amber-100 rounded-full flex items-center justify-center">
                <Medal className="w-4 h-4 text-amber-600" />
              </div>
            </div>
            <p className="mt-3 font-semibold truncate max-w-full">{leaderboard[2]?.name}</p>
            <p className="text-sm text-gray-500">{leaderboard[2]?.totalXP || 0} XP</p>
          </div>
        </motion.div>
      )}

      {/* 전체 순위 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              전체 순위
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="animate-pulse flex items-center gap-4 p-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full" />
                    <div className="w-12 h-12 bg-gray-200 rounded-full" />
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
                      <div className="h-3 bg-gray-200 rounded w-1/4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : leaderboard.length > 0 ? (
              <div className="space-y-2">
                {leaderboard.map((player, index) => {
                  const isCurrentUser = user && player.id === user.uid;

                  return (
                    <motion.div
                      key={player.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className={`flex items-center gap-4 p-3 rounded-xl border-2 ${getRankStyle(player.rank)} ${
                        isCurrentUser ? 'ring-2 ring-blue-400' : ''
                      }`}
                    >
                      <div className="w-8 flex justify-center">
                        {getRankIcon(player.rank)}
                      </div>
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
                        {player.name?.charAt(0) || 'U'}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">
                            {player.name}
                            {isCurrentUser && (
                              <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                                나
                              </span>
                            )}
                          </p>
                          <span className="text-sm text-gray-500">
                            Lv.{player.currentLevel || 1}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Zap className="w-4 h-4 text-yellow-500" />
                            {player.totalXP || 0} XP
                          </span>
                          {player.streak > 0 && (
                            <span className="flex items-center gap-1">
                              <Flame className="w-4 h-4 text-orange-500" />
                              {player.streak}일
                            </span>
                          )}
                        </div>
                      </div>
                      {player.rank <= 3 && (
                        <div className="text-right">
                          <Star className={`w-5 h-5 ${
                            player.rank === 1 ? 'text-yellow-500' :
                            player.rank === 2 ? 'text-gray-400' : 'text-amber-500'
                          } fill-current`} />
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <User className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>아직 순위 데이터가 없습니다.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
