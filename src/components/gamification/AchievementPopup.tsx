'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Trophy, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Achievement {
  code: string;
  name: string;
  description: string;
  rarity: 'COMMON' | 'UNCOMMON' | 'RARE' | 'EPIC' | 'LEGENDARY';
  xpReward: number;
  coinReward?: number;
}

interface AchievementPopupProps {
  achievement: Achievement | null;
  onClose: () => void;
}

const rarityConfig = {
  COMMON: {
    bg: 'from-gray-500 to-gray-600',
    border: 'border-gray-400',
    text: '일반',
    icon: '⭐',
  },
  UNCOMMON: {
    bg: 'from-green-500 to-emerald-600',
    border: 'border-green-400',
    text: '고급',
    icon: '💚',
  },
  RARE: {
    bg: 'from-blue-500 to-indigo-600',
    border: 'border-blue-400',
    text: '희귀',
    icon: '💎',
  },
  EPIC: {
    bg: 'from-purple-500 to-violet-600',
    border: 'border-purple-400',
    text: '영웅',
    icon: '🔮',
  },
  LEGENDARY: {
    bg: 'from-yellow-400 via-orange-500 to-red-500',
    border: 'border-yellow-400',
    text: '전설',
    icon: '👑',
  },
};

export function AchievementPopup({ achievement, onClose }: AchievementPopupProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (achievement) {
      setIsVisible(true);

      // 전설 등급은 더 화려한 효과
      if (achievement.rarity === 'LEGENDARY') {
        confetti({
          particleCount: 200,
          spread: 100,
          origin: { y: 0.5 },
          colors: ['#ffd700', '#ffaa00', '#ff6600'],
        });
      } else if (achievement.rarity === 'EPIC') {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#9b59b6', '#8e44ad', '#6c3483'],
        });
      }

      // 자동 닫기
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [achievement, onClose]);

  if (!achievement) return null;

  const config = rarityConfig[achievement.rarity];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.8 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50"
        >
          <div
            className={`
              relative p-6 rounded-2xl shadow-2xl border-2 ${config.border}
              bg-gradient-to-br ${config.bg} text-white
              min-w-[300px] max-w-[400px]
            `}
          >
            {/* 반짝이 효과 */}
            <Sparkles className="absolute top-2 right-2 w-6 h-6 animate-pulse" />
            <Sparkles className="absolute bottom-2 left-2 w-4 h-4 animate-pulse" style={{ animationDelay: '100ms' }} />

            {/* 콘텐츠 */}
            <div className="text-center">
              <motion.div
                initial={{ rotate: -180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                className="inline-block mb-4"
              >
                <div className="w-20 h-20 mx-auto bg-white/20 rounded-full flex items-center justify-center">
                  <Trophy className="w-12 h-12" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-sm font-medium opacity-80 mb-1">
                  {config.icon} {config.text} 업적 달성!
                </p>
                <h3 className="text-2xl font-bold mb-2">{achievement.name}</h3>
                <p className="text-sm opacity-90 mb-4">{achievement.description}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="flex justify-center gap-4"
              >
                <div className="bg-white/20 px-4 py-2 rounded-lg">
                  <span className="mr-1">⭐</span>
                  <span className="font-bold">+{achievement.xpReward} XP</span>
                </div>
                {achievement.coinReward && achievement.coinReward > 0 && (
                  <div className="bg-white/20 px-4 py-2 rounded-lg">
                    <span className="mr-1">🪙</span>
                    <span className="font-bold">+{achievement.coinReward}</span>
                  </div>
                )}
              </motion.div>
            </div>

            {/* 닫기 버튼 */}
            <button
              onClick={() => {
                setIsVisible(false);
                setTimeout(onClose, 300);
              }}
              className="absolute top-2 right-10 text-white/60 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
