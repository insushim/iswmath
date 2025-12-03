'use client';

import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';
import { STREAK_MESSAGES } from '@/lib/constants/gamification';

interface StreakCounterProps {
  streak: number;
  longestStreak: number;
  showDetails?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function StreakCounter({
  streak,
  longestStreak,
  showDetails = true,
  size = 'md',
}: StreakCounterProps) {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const getStreakMessage = () => {
    const milestones = Object.keys(STREAK_MESSAGES)
      .map(Number)
      .filter((m) => m <= streak)
      .sort((a, b) => b - a);

    return milestones.length > 0 ? STREAK_MESSAGES[milestones[0]] : null;
  };

  const getFlameColor = () => {
    if (streak >= 100) return 'text-purple-500';
    if (streak >= 30) return 'text-red-500';
    if (streak >= 7) return 'text-orange-500';
    return 'text-yellow-500';
  };

  const isRecordStreak = streak === longestStreak && streak > 0;

  return (
    <div className={`flex flex-col items-center ${sizeClasses[size]}`}>
      <div className="flex items-center gap-2">
        <motion.div
          animate={streak > 0 ? { scale: [1, 1.2, 1] } : {}}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <Flame className={`${iconSizes[size]} ${getFlameColor()}`} />
        </motion.div>
        <span className="font-bold">{streak}일</span>
        {isRecordStreak && streak > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-xs bg-yellow-400 text-yellow-900 px-1.5 py-0.5 rounded-full font-medium"
          >
            신기록!
          </motion.span>
        )}
      </div>

      {showDetails && (
        <>
          {streak > 0 && getStreakMessage() && (
            <p className="text-xs text-gray-500 mt-1 text-center">
              {getStreakMessage()}
            </p>
          )}

          {longestStreak > streak && (
            <p className="text-xs text-gray-400 mt-0.5">
              최고 기록: {longestStreak}일
            </p>
          )}
        </>
      )}
    </div>
  );
}
