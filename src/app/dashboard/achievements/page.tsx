'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { getUnlockedAchievements } from '@/lib/firebase/firestore';
import { Card, CardContent } from '@/components/ui/card';
import {
  Trophy,
  Lock,
  Star,
  Flame,
  Zap,
  Target,
  BookOpen,
  Award,
  Crown,
  Medal,
  Sparkles,
} from 'lucide-react';

// 전체 업적 목록
const ALL_ACHIEVEMENTS = [
  // 학습 업적
  {
    code: 'first_problem',
    name: '첫 발걸음',
    description: '첫 번째 문제를 풀었습니다',
    icon: Star,
    rarity: 'common',
    xpReward: 10,
  },
  {
    code: 'ten_problems',
    name: '열 걸음',
    description: '10개의 문제를 풀었습니다',
    icon: Target,
    rarity: 'common',
    xpReward: 30,
  },
  {
    code: 'fifty_problems',
    name: '꾸준함의 시작',
    description: '50개의 문제를 풀었습니다',
    icon: Target,
    rarity: 'uncommon',
    xpReward: 50,
  },
  {
    code: 'hundred_problems',
    name: '백문불여일견',
    description: '100개의 문제를 풀었습니다',
    icon: Medal,
    rarity: 'rare',
    xpReward: 100,
  },
  {
    code: 'five_hundred_problems',
    name: '수학의 달인',
    description: '500개의 문제를 풀었습니다',
    icon: Trophy,
    rarity: 'epic',
    xpReward: 300,
  },
  {
    code: 'thousand_problems',
    name: '레전드',
    description: '1000개의 문제를 풀었습니다',
    icon: Crown,
    rarity: 'legendary',
    xpReward: 500,
  },

  // 연속 정답 업적
  {
    code: 'streak_5',
    name: '연속 5',
    description: '5문제 연속 정답',
    icon: Flame,
    rarity: 'common',
    xpReward: 20,
  },
  {
    code: 'streak_10',
    name: '연속 10',
    description: '10문제 연속 정답',
    icon: Flame,
    rarity: 'uncommon',
    xpReward: 50,
  },
  {
    code: 'streak_20',
    name: '불꽃 연속',
    description: '20문제 연속 정답',
    icon: Flame,
    rarity: 'rare',
    xpReward: 100,
  },
  {
    code: 'streak_50',
    name: '불타는 천재',
    description: '50문제 연속 정답',
    icon: Flame,
    rarity: 'epic',
    xpReward: 250,
  },

  // 일일 학습 업적
  {
    code: 'daily_goal',
    name: '오늘의 목표',
    description: '일일 목표를 처음 달성했습니다',
    icon: Target,
    rarity: 'common',
    xpReward: 25,
  },
  {
    code: 'week_streak',
    name: '7일 연속',
    description: '7일 연속 학습',
    icon: Sparkles,
    rarity: 'uncommon',
    xpReward: 70,
  },
  {
    code: 'month_streak',
    name: '30일의 기적',
    description: '30일 연속 학습',
    icon: Award,
    rarity: 'epic',
    xpReward: 300,
  },
  {
    code: 'hundred_day_streak',
    name: '100일의 여정',
    description: '100일 연속 학습',
    icon: Crown,
    rarity: 'legendary',
    xpReward: 1000,
  },

  // 레벨 업적
  {
    code: 'level_5',
    name: '성장하는 학생',
    description: '레벨 5 달성',
    icon: Zap,
    rarity: 'common',
    xpReward: 50,
  },
  {
    code: 'level_10',
    name: '중급 학습자',
    description: '레벨 10 달성',
    icon: Zap,
    rarity: 'uncommon',
    xpReward: 100,
  },
  {
    code: 'level_25',
    name: '수학 고수',
    description: '레벨 25 달성',
    icon: Zap,
    rarity: 'rare',
    xpReward: 250,
  },
  {
    code: 'level_50',
    name: '마스터',
    description: '레벨 50 달성',
    icon: Crown,
    rarity: 'epic',
    xpReward: 500,
  },

  // 개념 학습 업적
  {
    code: 'first_concept',
    name: '지식의 시작',
    description: '첫 번째 개념을 완료했습니다',
    icon: BookOpen,
    rarity: 'common',
    xpReward: 15,
  },
  {
    code: 'ten_concepts',
    name: '탐구자',
    description: '10개의 개념을 완료했습니다',
    icon: BookOpen,
    rarity: 'uncommon',
    xpReward: 75,
  },
  {
    code: 'mastery_100',
    name: '완벽한 이해',
    description: '개념 이해도 100% 달성',
    icon: Star,
    rarity: 'rare',
    xpReward: 100,
  },

  // 특별 업적
  {
    code: 'perfect_diagnosis',
    name: '완벽한 진단',
    description: '진단 테스트 만점',
    icon: Trophy,
    rarity: 'epic',
    xpReward: 200,
  },
  {
    code: 'speed_demon',
    name: '스피드 스타',
    description: '10초 이내에 문제 해결',
    icon: Zap,
    rarity: 'uncommon',
    xpReward: 30,
  },
  {
    code: 'night_owl',
    name: '밤의 학자',
    description: '밤 10시 이후 학습',
    icon: Star,
    rarity: 'common',
    xpReward: 10,
  },
  {
    code: 'early_bird',
    name: '아침형 학생',
    description: '오전 7시 이전 학습',
    icon: Sparkles,
    rarity: 'common',
    xpReward: 10,
  },
];

const RARITY_COLORS = {
  common: { bg: 'bg-gray-100', text: 'text-gray-600', border: 'border-gray-300', label: '일반' },
  uncommon: { bg: 'bg-green-100', text: 'text-green-600', border: 'border-green-300', label: '고급' },
  rare: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-300', label: '희귀' },
  epic: { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-300', label: '영웅' },
  legendary: { bg: 'bg-yellow-100', text: 'text-yellow-600', border: 'border-yellow-300', label: '전설' },
};

interface UnlockedAchievement {
  id: string;
  code: string;
  unlockedAt: { seconds: number };
}

export default function AchievementsPage() {
  const { user } = useAuth();
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');

  useEffect(() => {
    async function loadAchievements() {
      if (!user) return;
      try {
        const achievements = await getUnlockedAchievements(user.uid) as UnlockedAchievement[];
        setUnlockedAchievements(achievements.map((a) => a.code || a.id));
      } catch (error) {
        console.error('업적 로드 오류:', error);
      } finally {
        setLoading(false);
      }
    }
    loadAchievements();
  }, [user]);

  const filteredAchievements = ALL_ACHIEVEMENTS.filter((a) => {
    const isUnlocked = unlockedAchievements.includes(a.code);
    if (filter === 'unlocked') return isUnlocked;
    if (filter === 'locked') return !isUnlocked;
    return true;
  });

  const unlockedCount = unlockedAchievements.length;
  const totalCount = ALL_ACHIEVEMENTS.length;

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold mb-2">업적</h1>
        <p className="text-gray-600">
          다양한 도전을 완료하고 업적을 수집하세요!
        </p>
      </motion.div>

      {/* 통계 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">획득한 업적</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {unlockedCount} <span className="text-lg text-gray-400">/ {totalCount}</span>
                </p>
              </div>
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                <Trophy className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="mt-4 h-2 bg-yellow-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(unlockedCount / totalCount) * 100}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-yellow-400 to-orange-500"
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* 필터 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex gap-2"
      >
        {[
          { key: 'all', label: '전체' },
          { key: 'unlocked', label: '획득' },
          { key: 'locked', label: '미획득' },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key as 'all' | 'unlocked' | 'locked')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === f.key
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </motion.div>

      {/* 업적 목록 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gray-200" />
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-2/3 mb-2" />
                    <div className="h-3 bg-gray-200 rounded w-full" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          filteredAchievements.map((achievement, index) => {
            const isUnlocked = unlockedAchievements.includes(achievement.code);
            const rarity = RARITY_COLORS[achievement.rarity as keyof typeof RARITY_COLORS];
            const Icon = achievement.icon;

            return (
              <motion.div
                key={achievement.code}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  className={`transition-all ${
                    isUnlocked
                      ? `border-2 ${rarity.border} ${rarity.bg}`
                      : 'border-gray-200 bg-gray-50 opacity-60'
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                          isUnlocked
                            ? `${rarity.bg} ${rarity.text}`
                            : 'bg-gray-200 text-gray-400'
                        }`}
                      >
                        {isUnlocked ? (
                          <Icon className="w-7 h-7" />
                        ) : (
                          <Lock className="w-7 h-7" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={`font-semibold ${isUnlocked ? '' : 'text-gray-500'}`}>
                            {achievement.name}
                          </h3>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              isUnlocked ? `${rarity.bg} ${rarity.text}` : 'bg-gray-200 text-gray-500'
                            }`}
                          >
                            {rarity.label}
                          </span>
                        </div>
                        <p className={`text-sm ${isUnlocked ? 'text-gray-600' : 'text-gray-400'}`}>
                          {achievement.description}
                        </p>
                        <p className={`text-sm mt-1 ${isUnlocked ? 'text-yellow-600' : 'text-gray-400'}`}>
                          +{achievement.xpReward} XP
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
