'use client';

import { motion } from 'framer-motion';
import { LEVEL_CONFIG } from '@/lib/constants/gamification';

interface XPProgressBarProps {
  currentXP: number;
  currentLevel: number;
  showDetails?: boolean;
}

export function XPProgressBar({ currentXP, currentLevel, showDetails = true }: XPProgressBarProps) {
  const currentThreshold = LEVEL_CONFIG.levelThresholds[currentLevel - 1] || 0;
  const nextThreshold = LEVEL_CONFIG.levelThresholds[currentLevel] || currentThreshold + 100;

  const xpInCurrentLevel = currentXP - currentThreshold;
  const xpNeededForNext = nextThreshold - currentThreshold;
  const progressPercent = Math.min((xpInCurrentLevel / xpNeededForNext) * 100, 100);

  // 현재 칭호 가져오기
  const getCurrentTitle = () => {
    const titleLevels = Object.keys(LEVEL_CONFIG.titles)
      .map(Number)
      .filter((l) => l <= currentLevel)
      .sort((a, b) => b - a);

    return titleLevels.length > 0
      ? LEVEL_CONFIG.titles[titleLevels[0]]
      : LEVEL_CONFIG.titles[1];
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold shadow-lg"
          >
            {currentLevel}
          </motion.div>
          <div>
            <p className="font-medium text-gray-800 dark:text-gray-200">
              레벨 {currentLevel}
            </p>
            {showDetails && (
              <p className="text-sm text-gray-500">
                {getCurrentTitle()}
              </p>
            )}
          </div>
        </div>
        {showDetails && (
          <div className="text-right">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {xpInCurrentLevel.toLocaleString()} / {xpNeededForNext.toLocaleString()} XP
            </p>
            <p className="text-xs text-gray-500">
              다음 레벨까지 {(xpNeededForNext - xpInCurrentLevel).toLocaleString()} XP
            </p>
          </div>
        )}
      </div>

      <div className="relative h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full"
        />
        {/* 반짝이 효과 */}
        <motion.div
          animate={{ x: [-100, 300] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
        />
      </div>
    </div>
  );
}
